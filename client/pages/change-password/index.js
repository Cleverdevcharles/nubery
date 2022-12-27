import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { SyncOutlined } from '@ant-design/icons'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { Context } from '../../context'
import { useRouter } from 'next/router'

const ChangePassword = () => {
  // state
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)

  const handleShow = () => {
    setShow(!show)
  }
  // context
  const {
    state: { user },
  } = useContext(Context)
  // router
  const router = useRouter()

  // redirect if user is logged in
  // useEffect(() => {
  //   if (user == null) router.push("/");
  // }, [user]);

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const strongRegexSpecialCharacter = /^(.*\W).*$/
    const strongRegexHighercase = new RegExp('^(?=.*[A-Z])')
    const strongRegexLowercase = new RegExp('^(?=.*[a-z])')
    const strongRegexNumber = new RegExp('^(?=.*[0-9])')

    if (!email) {
      setLoading(false)
      return toast.error('Email is requried.')
    }

    if (email) {
      if (!validateEmail(email)) {
        setLoading(false)
        return toast.error('Invalid email address.')
      }
    }

    if (success && !code) {
      setLoading(false)
      return toast.error('Secret code is requried.')
    }

    if (success && !password) {
      setLoading(false)
      return toast.error('Password is requried.')
    }

    if (success && password) {
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
    }

    try {
      const { data } = await axios.post(`/api/forgot-password`, {
        email,
      })
      setSuccess(true)
      toast('Check your email for the secret code')
      setLoading(false)
    } catch (err) {
      setLoading(false)
      toast(err.response.data)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    // console.log(email, code, newPassword);
    // return;
    try {
      setLoading(true)
      const { data } = await axios.post(`/api/reset-password`, {
        email,
        code,
        newPassword,
      })
      setEmail('')
      setCode('')
      setNewPassword('')
      setLoading(false)
      toast('Great! Now you can login with your new password')
      router.push('/signin')
    } catch (err) {
      setLoading(false)
      toast(err.response.data)
    }
  }

  return (
    <>
      <div style={{ height: '80vh', marginTop: '150px' }}>
        <form
          onSubmit={success ? handleResetPassword : handleSubmit}
          className="bg-grey-lighter my-10 flex flex-c0l"
        >
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center">Change Password</h1>

              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {success && (
                <>
                  <input
                    type="text"
                    name="code"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter secret code"
                  />
                  <div className="relative">
                    <input
                      type={show ? 'text' : 'password'}
                      className="block border border-grey-light w-full p-3 rounded mb-4"
                      name="newPassword"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                      <EyeIcon
                        className={
                          show
                            ? 'block h-6 text-gray-700'
                            : 'hidden h-6 text-gray-700'
                        }
                        onClick={handleShow}
                      />
                      <EyeOffIcon
                        className={
                          show
                            ? 'hidden h-6 text-gray-700'
                            : 'block h-6 text-gray-700'
                        }
                        onClick={handleShow}
                      />
                    </div>
                  </div>
                </>
              )}
              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-brightRed text-white hover:bg-brightRedLight focus:outline-none my-1"
              >
                {loading ? <SyncOutlined spin /> : 'Submit'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default ChangePassword
