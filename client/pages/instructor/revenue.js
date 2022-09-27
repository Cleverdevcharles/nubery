import { useState, useEffect, useContext } from 'react'
import { Context } from '../../context'
import InstructorRoute from '../../components/routes/InstructorRoute'
import axios from 'axios'
import {
  DollarOutlined,
  SettingOutlined,
  SyncOutlined,
} from '@ant-design/icons'
import { stripeCurrencyFormatter } from '../../utils/helpers'
import Sidenav from '../../components/dashboardLayout/Sidenav'

const InstructorRevenue = () => {
  const [balance, setBalance] = useState({ pending: [] })
  const [loading, setLoading] = useState(false)
  const [activePage, setActivePage] = useState('Revenue')

  useEffect(() => {
    sendBalanceRequest()
  }, [])

  const sendBalanceRequest = async () => {
    const { data } = await axios.get(
      `/api/instructor/balance`,
    )
    setBalance(data)
  }

  const handlePayoutSettings = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `/api/instructor/payout-settings`,
      )
      window.location.href = data
    } catch (err) {
      setLoading(false)
      console.log(err)
      alert('Unable to access payout settings. Try later.')
    }
  }

  return (
    <InstructorRoute>
      <div className="h-screen grid md:grid-cols-custom-sidenav-layout">
        <Sidenav activePage={activePage} setActivePage={setActivePage} />
        <div className="flex flex-col">
          <div className="text-xl font-bold text-gray-600 border-b-2 border-brightRedLight pt-6 pb-2 px-6">
            Revenue
          </div>
          <div className="flex-1 my-6 mx-5">
            <div className="row pt-2">
              <div className="col-md-12 offset-md-2 bg-light p-5">
                <h2>
                  Revenue report{' '}
                  <DollarOutlined
                    className="float-right"
                    style={{ fontSize: '20px' }}
                  />{' '}
                </h2>
                <p>
                  You get paid directly from stripe to your bank account every
                  48 hour
                </p>
                <hr />
                <br />
                <br />
                <br />
                {/* {JSON.stringify(balance, null, 4)} */}
                <h4>
                  Pending balance
                  {balance.pending &&
                    balance.pending.map((bp) => (
                      <span key={bp._id} className="float-right">
                        {stripeCurrencyFormatter(bp)}
                      </span>
                    ))}
                </h4>
                <p>For last 48 hours</p>
                <br />
                <br />
                <br />
                <hr />
                <br />
                <br />
                <br />
                <h4>
                  Payouts{' '}
                  {!loading ? (
                    <SettingOutlined
                      className="float-right pointer"
                      onClick={handlePayoutSettings}
                      style={{ fontSize: '20px' }}
                    />
                  ) : (
                    <SyncOutlined spin className="float-right pointer" />
                  )}
                </h4>
                <p>
                  Update your stripe account details or view previous payouts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </InstructorRoute>
  )
}

export default InstructorRevenue
