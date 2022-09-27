import React, { useState, useContext } from 'react'
import { Context } from '../../context'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Search from '../forms/Search'
import axios from 'axios'

const Header = () => {
  const [keyword, setKeyword] = useState('')

  const { state, dispatch } = useContext(Context)
  const { user, cart } = state

  const router = useRouter()

  const logout = async () => {
    var result = window.confirm('Want to logout?')
    if (result) {
      dispatch({ type: 'LOGOUT' })
      window.localStorage.removeItem('user')
      const { data } = await axios.get(`/api/logout`)
      toast(data.message)
      router.push('/')
    }
  }

  const dashboard = () => {
    if (user && user.role && user.role.includes('Instructor')) {
      router.push('/instructor/dashboard')
    } else if (user && user.role && user.role.includes('Instructor')) {
      router.push('/admin/dashboard')
    } else {
      router.push('/user/dashboard')
    }
  }

  return (
    <div>
      <div className="offcanves-menu">
        <div className="mobile-header">
          <div className="mobile-logo">
            <Link href="/">
              <img src="/images/logo.jpg" alt="brand-logo" />
            </Link>
          </div>
          <span className="close">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 6L18.7279 18.7279"
                stroke="#1D2026"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.00006 19L18.728 6.27208"
                stroke="#1D2026"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        <div className="search-field-wrap mobile-search">
          <Search keyword={keyword} setKeyword={setKeyword} />
        </div>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/courses">Browse Courses</Link>
          </li>
          {/* <li><Link href="/about">About</Link></li>
      <li><Link href="/contact">Contact</Link></li> */}
          {user !== null ? (
            <li>
              <Link href="/user/become-instructor">Become an Instructor</Link>
            </li>
          ) : (
            <li>
              <Link href="/how-to-become-instructor">Become an Instructor</Link>
            </li>
          )}
        </ul>

        <h3>ACCOUNTS</h3>
        {user !== null ? (
          <ul>
            <li>
              <a onClick={dashboard} className="cursor-pointer">
                Dashboard
              </a>
            </li>
            <li>
              <a onClick={logout} className="cursor-pointer">
                Log Out
              </a>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <a href="/signup" rel="noreferrer" className="cursor-pointer">
                Create Account
              </a>
            </li>
            <li>
              <a href="/signin" rel="noreferrer" className="cursor-pointer">
                Log In
              </a>
            </li>
          </ul>
        )}

        <div className="mobile-user-wrap">
          <div className="mobile-use-left">
            <div className="mobile-user-thumb">
              {user && (
                <a>
                  <img
                    src={
                      !user.image ? '/images/profile.png' : user.image.Location
                    }
                    alt=""
                  />
                </a>
              )}
            </div>
            <div className="mobile-user-data">
              <a>
                <h5>{user && user.name}</h5>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="offcanvas-overlay"></div>
      <header className="header-section">
        <div className="header-top">
          <div className="responsive-logo">
            <Link href="/">
              <img src="/images/logo.jpg" alt="brand-logo" />
            </Link>
          </div>
          <div className="main-menu">
            <ul>
              <li>
                <Link className="active" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/courses">Courses</Link>
              </li>
              {/* <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li> */}
              {(user && user.role && user.role.includes('Instructor')) ||
              (user && user.role && user.role.includes('Admin')) ? null : (
                <li>
                  {user !== null ? (
                    <a href="/user/become-instructor">Teach on Nubery</a>
                  ) : (
                    <a href="/how-to-become-instructor">Teach on Nubery</a>
                  )}
                </li>
              )}
            </ul>
          </div>

          <div className="menu-bar">
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 5.54468H21"
                stroke="#1D2026"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 12.5447H21"
                stroke="#1D2026"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 19.5447H21"
                stroke="#1D2026"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">
            <div className="header-bottom-left-wrap">
              <div className="main-logo">
                <Link href="/">
                  <img src="/images/logo.jpg" alt="brand-logo" />
                </Link>
              </div>

              <div className="search-field-wrap">
                <Search keyword={keyword} setKeyword={setKeyword} />
              </div>
            </div>
          </div>
          <div className="header-bottom-right">
            {user === null ? (
              <div className="header-btn-wrap">
                <Link href="/signup">
                  <a className="header-btn orange-btn cursor-poniter">
                    Create Account
                  </a>
                </Link>
                <Link href="/signin">
                  <a className="header-btn div-orange-btn cursor-pointer">
                    Log In
                  </a>
                </Link>
              </div>
            ) : (
              <>
                <div className="header-btn-wrap">
                  <a
                    onClick={dashboard}
                    className="header-btn orange-btn cursor-pointer"
                  >
                    Dashboard
                  </a>
                  <a
                    className="header-btn div-orange-btn cursor-pointer"
                    onClick={logout}
                    href="#"
                  >
                    Log Out
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header
