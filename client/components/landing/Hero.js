import React, { useContext } from 'react'
import Image from 'next/image'
import { Context } from '../../context'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Hero = () => {
  const { state } = useContext(Context)
  const { user } = state
  return (
    <div className="hero-section">
      <div className="container">
        <div className="row st_screenfix">
          <div className="col-xl-5 col-lg-6 d-flex align-items-center">
            <div className="hero-content">
              <h1>Learn with expert anytime anywhere</h1>
              <p>
                Our mision is to help people to find the best course online and
                learn with expert anytime, anywhere.
              </p>
              {user === null ? (
                <Link href="/signup">
                  <a className="button button--lg cursor-poniter text-white">
                    Create Account
                  </a>
                </Link>
              ) : null}
            </div>
          </div>
          <div className="col-xl-7 col-lg-6">
            <div className="hero-thumb">
              <img src="/images/hero-thumb.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
