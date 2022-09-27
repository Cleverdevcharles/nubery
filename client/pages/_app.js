import React from 'react'
import '../styles/globals.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'antd/dist/antd.css'
import '../public/css/main.css'
import { Provider } from '../context'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Layout>
        <ToastContainer position="top-center" />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
