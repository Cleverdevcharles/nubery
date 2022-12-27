import { useContext, useState, useEffect } from 'react'
import { Context } from '../../context'
import { Button } from 'antd'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {
  SettingOutlined,
  SyncOutlined,
  UserSwitchOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
import { toast } from 'react-toastify'
import UserRoute from '../../components/routes/UserRoute'

const BecomeInstructor = () => {
  // state
  const [loading, setLoading] = useState(false)
  const {
    state: { user },
  } = useContext(Context)
  const router = useRouter()

  // useEffect(() => {
  //   if (!user) {
  //     router.push('/')
  //     return null
  //   }
  // }, [])

  const becomeInstructor = () => {
    // console.log("become instructor");
    setLoading(true)
    axios
      .post(`/api/make-instructor`)
      .then((res) => {
        console.log(res)
        window.location.href = res.data
      })
      .catch((err) => {
        console.log(err.response.status)
        toast('Stripe onboarding failed. Try again.')
        setLoading(false)
      })
  }

  // useEffect(() => {
  //   if (!user) {
  //     router.push('/')
  //     return null
  //   }
  // }, [])

  return (
    <UserRoute>
      <div className="bredadcrumb-section">
        <div className="container">
          <div className="breadcrumb-menu">
            <h3>Become an Instructor</h3>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="#">/</Link>
              </li>
              <li>
                <Link href="/user/become-instructor">Become an Instructor</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container" style={{ height: '55vh', marginTop: '100px' }}>
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            <div className="pt-4">
              <UserSwitchOutlined className="display-1 pb-3" />
              <br />
              <h1>Setup payout to publish courses on Nubery</h1>
              <h2 className="lead" style={{ color: 'orange' }}>
                Nubery partners with stripe to transfer earnings to your bank
                account
              </h2>
              <button
                onClick={becomeInstructor}
                disabled={
                  (user && user.role && user.role.includes('Instructor')) ||
                  loading
                }
                style={{ fontSize: '20px' }}
                className="w-full text-center py-3 rounded bg-brightRed text-white hover:bg-brightRedLight focus:outline-none my-1"
              >
                {loading ? <SyncOutlined spin /> : 'Payout Setup'}
              </button>
              <p className="lead">
                You will be redirected to stripe to complete onboarding process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </UserRoute>
  )
}

export default BecomeInstructor
