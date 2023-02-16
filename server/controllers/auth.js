import User from "../models/user";
import { hashPassword, comparePassword } from "../utils/auth";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import AWS from "aws-sdk";
import nodemailer from "nodemailer";

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
}

const SES = new AWS.SES(awsConfig)
const S3 = new AWS.S3(awsConfig)

export const uploadImage = async (req, res) => {
  // console.log(req.body);
  try {
    const { image } = req.body
    if (!image) return res.status(400).send('No image')

    // prepare the image
    const base64Data = new Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ''),
      'base64',
    )

    const type = image.split(';')[0].split('/')[1]

    // image params
    const params = {
      Bucket: 'nubery',
      Key: `${nanoid()}.${type}`,
      Body: base64Data,
      ACL: 'public-read',
      ContentEncoding: 'base64',
      ContentType: `image/${type}`,
    }

    // upload to s3
    S3.upload(params, (err, data) => {
      if (err) {
        console.log(err)
        return res.sendStatus(400)
      }
      console.log(data)
      res.send(data)
    })
  } catch (err) {
    console.log(err)
  }
}

export const removeImage = async (req, res) => {
  try {
    const { image } = req.body
    // image params
    const params = {
      Bucket: image.Bucket,
      Key: image.Key,
    }

    // send remove request to s3
    S3.deleteObject(params, (err, data) => {
      if (err) {
        console.log(err)
        res.sendStatus(400)
      }
      res.send({ ok: true })
    })
  } catch (err) {
    console.log(err)
  }
}

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    // validation
    if (!name) return res.status(400).send('Name is required')
    if (!password || password.length < 6) {
      return res
        .status(400)
        .send('Password is required and should be min 6 characters long')
    }
    let userExist = await User.findOne({ email }).exec()
    if (userExist) return res.status(400).send('Email is taken')

    // hash password
    const hashedPassword = await hashPassword(password)

    // register
    const user = new User({
      name,
      email,
      password: hashedPassword,
    })
    await user.save()
    return res.json({ ok: true })
  } catch (err) {
    console.log(err)
    return res.status(400).send('Error. Try again.')
  }
}

export const updateAccount = async (req, res) => {
  try {
    const { email } = req.body
    const updated = await User.findOneAndUpdate({ email }, req.body, {
      new: true,
    }).exec()

    res.json(updated)
  } catch (err) {
    console.log(err)
    return res.status(400).send(err.message)
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    // check if our db has user with that email
    const user = await User.findOne({ email }).exec()
    if (!user)
      return res.status(400).send('User with this email does not exist.')
    // check password
    const match = await comparePassword(password, user.password)
    if (!match) return res.status(400).send('Wrong password')

    // create signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })
    // return user and token to client, exclude hashed password
    user.password = undefined
    // send token in cookie
    res.cookie('token', token, {
      httpOnly: true,
      // secure: true, // only works on https
    })
    // send user as json response
    res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(400).send('Error. Try again.')
  }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie('token')
    return res.json({ message: 'Signout success' })
  } catch (err) {
    console.log(err)
  }
}

export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password').exec()
    // console.log('CURRENT_USER NOW', user)
    return res.json({ ok: true })
  } catch (err) {
    console.log(err)
  }
}

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body
    const shortCode = nanoid(6).toUpperCase()
    const user = await User.findOneAndUpdate(
      { email },
      { passwordResetCode: shortCode },
    )
    if (!user)
      return res.status(400).send('User with this email does not exist.')
    const stmp = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.PASSWORD,
      },
    })
    // prepare for email
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Reset Indoex Password',
      html: `
      <html>
        <h1>Reset password</h1>
        <p>Use this code to reset your password</p>
        <h2 style="color:red;">${shortCode}</h2>
        <i>nubery.net</i>
      </html>
      `
    }

    stmp.sendMail(mailOptions, (err, res) => {
      if (err) return err
      return res
    })
  } catch (err) {
    console.log(err)
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body
    const hashedPassword = await hashPassword(newPassword)

    const user = User.findOneAndUpdate(
      {
        email,
        passwordResetCode: code,
      },
      {
        password: hashedPassword,
        passwordResetCode: '',
      },
    ).exec()
    if (!code)
      return res
        .status(400)
        .send('Secret Code is required!! Check your email for the secret code.')

    res.json({ ok: true })
  } catch (err) {
    console.log(err)
    return res.status(400).send('Error! Try again.')
  }
}