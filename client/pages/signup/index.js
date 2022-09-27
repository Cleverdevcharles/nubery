import { useState, useEffect, useContext } from 'react'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'
import { SyncOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Context } from '../../context'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    state: { user },
  } = useContext(Context)

  const router = useRouter()

  useEffect(() => {
    if (user !== null) router.push('/')
  }, [user])

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

  const signupValidator = () => {
    const strongRegexSpecialCharacter = /^(.*\W).*$/
    const strongRegexHighercase = new RegExp('^(?=.*[A-Z])')
    const strongRegexLowercase = new RegExp('^(?=.*[a-z])')
    const strongRegexNumber = new RegExp('^(?=.*[0-9])')
    if (!name && !email && !password && !confirmPassword) {
      setLoading(false)
      return toast.error('Please fill out all fields.')
    }
    if (!name) {
      setLoading(false)
      return toast.error('Your full name is required.')
    }
    if (!email) {
      setLoading(false)
      return toast.error('Your eamil address is required.')
    }
    if (email) {
      if (!validateEmail(email)) {
        setLoading(false)
        return toast.error('Invalid email address.')
      }
    }
    if (!password) {
      setLoading(false)
      return toast.error('Your password is required.')
    }
    if (!password) {
      if (confirmPassword) {
        setLoading(false)
        return toast.error('Your password is required.')
      }
    }
    if (password) {
      if (password.length < 6) {
        setLoading(false)
        return toast.error('Password should be minimum of 6 characters long.')
      }
      if (password.length > 64) {
        setLoading(false)
        return toast.error('Password should be maximum of 64 characters long.')
      }
      if (!strongRegexHighercase.test(password)) {
        setLoading(false)
        return toast.error('Password must contain at least an uppercase.')
      }
      if (!strongRegexLowercase.test(password)) {
        setLoading(false)
        return toast.error('Password must contain at least a lowercase.')
      }
      if (!strongRegexNumber.test(password)) {
        setLoading(false)
        return toast.error('Password must contain at least one number.')
      }
      if (!strongRegexSpecialCharacter.test(password)) {
        setLoading(false)
        return toast.error(
          'Password must contain at least one special character.',
        )
      }
      if (!confirmPassword) {
        setLoading(false)
        return toast.error('Please confirm your password.')
      }
      if (password !== confirmPassword) {
        setLoading(false)
        return toast.error('Your password do not match.')
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (signupValidator()) return null

    try {
      setLoading(true)
      const { data } = await axios.post(
        `/api/register`,
        {
          name,
          email,
          password,
        },
      )
      // console.log("REGISTER RESPONSE", data);
      toast('Registration successful. Please login.')
      setName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setLoading(false)
    } catch (err) {
      setLoading(false)
      toast(err.response.data)
    }
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <>
      <form
        style={{ marginTop: '-70px' }}
        onSubmit={handleSubmit}
        className="bg-grey-lighter min-h-screen flex flex-col"
      >
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Sign up</h1>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="name"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                <EyeIcon
                  className={
                    showPassword
                      ? 'block h-6 text-gray-700'
                      : 'hidden h-6 text-gray-700'
                  }
                  onClick={handleShowPassword}
                />
                <EyeOffIcon
                  className={
                    showPassword
                      ? 'hidden h-6 text-gray-700'
                      : 'block h-6 text-gray-700'
                  }
                  onClick={handleShowPassword}
                />
              </div>
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                <EyeIcon
                  className={
                    showConfirmPassword
                      ? 'block h-6 text-gray-700'
                      : 'hidden h-6 text-gray-700'
                  }
                  onClick={handleShowConfirmPassword}
                />
                <EyeOffIcon
                  className={
                    showConfirmPassword
                      ? 'hidden h-6 text-gray-700'
                      : 'block h-6 text-gray-700'
                  }
                  onClick={handleShowConfirmPassword}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-brightRed text-white hover:bg-brightRedLight focus:outline-none my-1"
            >
              {loading ? <SyncOutlined spin /> : 'Create Account'}
            </button>

            <div className="text-center text-sm text-grey-dark mt-4">
              By signing up, you agree to the{' '}
              <a
                className="no-underline border-b border-grey-dark text-brightRed"
                href="#"
                target="_blank"
                rel="noreferrer"
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                className="no-underline border-b border-grey-dark text-brightRed"
                href="#"
                target="_blank"
                rel="noreferrer"
              >
                Privacy Policy
              </a>
            </div>
          </div>

          <div className="text-grey-dark mt-6">
            Already have an account?{' '}
            <span className="no-underline border-b border-blue font-bold text-brightRed ml-1">
              <Link href="/signin">Log in</Link>
            </span>
          </div>
        </div>
      </form>
    </>
  )
}

export default Signup
