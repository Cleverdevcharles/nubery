import { useState, useContext, useEffect } from 'react'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'
import axios from 'axios'
import { toast } from 'react-toastify'
import { SyncOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { Context } from '../../context'
import { useRouter } from 'next/router'

const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)

  // state
  const {
    state: { user },
    dispatch,
  } = useContext(Context)
  // const { user } = state;

  // router
  const router = useRouter()

  useEffect(() => {
    if (user !== null) router.push('/')
  }, [user])

  const handleShow = () => {
    setShow(!show)
  }

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

  const signinValidator = () => {
    if (!email && !password) {
      setLoading(false)
      return toast.error('Please fill out all fields.')
    }
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
    if (!password) {
      setLoading(false)
      return toast.error('Password is requried.')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (signinValidator()) {
      return null
    }
    try {
      setLoading(true)
      const { data } = await axios.post(
        `/api/login`,
        {
          email,
          password,
        },
      )
      // console.log("LOGIN RESPONSE", data);
      dispatch({
        type: 'LOGIN',
        payload: data,
      })
      // save in local storage
      window.localStorage.setItem('user', JSON.stringify(data))
      // redirect
      router.push('/')
      toast('Login Success')
      // setLoading(false);
    } catch (err) {
      toast(err.response.data)
      setLoading(false)
    }
  }

  return (
    <div className='sign-in'>
      <form
        onSubmit={handleSubmit}
        className="bg-grey-lighter my-10 flex flex-c0l"
      >
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Sign in</h1>

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
                type={show ? 'text' : 'password'}
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-brightRed text-white hover:bg-brightRedLight focus:outline-none my-1"
            >
              {loading ? <SyncOutlined spin /> : 'Login'}
            </button>
            <Link href="/forgot-password">Forgot Password?</Link>
          </div>

          <div className="mt-6 text-white">
            Do not have an account?{' '}
              <Link href="/signup">
                <span style={{cursor: "pointer"}} className="no-underline border-b border-blue font-bold text-white ml-1">
                    Sign Up
                </span>
              </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Signin
