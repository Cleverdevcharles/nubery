import React from 'react'
import Header from './landing/Header'
import Footer from './landing/Footer'
import Head from 'next/head'
import { useRouter } from 'next/router'

function Layout({ children }) {
  const { pathname } = useRouter()

  return (
    <div>
      <Head>
        <title>
          {pathname === '/'
            ? 'Nubery'
            : `Nubery | ${
                pathname.charAt(1).toUpperCase() +
                pathname
                  .slice(2)
                  .replace(/[^a-zA-Z0-9-_]/g, ' ')
                  .replace('slug', ' ')
                  .replace('-', ' | ')
              }`}
        </title>
        <meta name="description" content="stardard" />
        <link rel="icon" href="/favicon.jpg" />
      </Head>
      <Header />
      {children}
      {pathname.indexOf('instructor') > -1 || pathname.indexOf('user') > -1 || pathname.indexOf('admin') > -1 ? null : <Footer />}
    </div>
  )
}

export default Layout
