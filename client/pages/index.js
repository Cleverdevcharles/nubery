import dynamic from 'next/dynamic'
import TopSellers from '../components/cards/TopSellers'
import TopRated from '../components/cards/TopRated'
import RecentlyAdded from '../components/cards/RecentlyAdded'
import TopInstructors from '../components/cards/TopInstructors'
import Hero from '../components/landing/Hero'
import 'owl.carousel/dist/assets/owl.carousel.min.css'
import 'owl.carousel/dist/assets/owl.theme.default.min.css'
import axios from 'axios'
import { Context } from '../context'
import { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

var $ = require('jquery')
if (typeof window !== 'undefined') {
  window.$ = window.jQuery = require('jquery')
}

const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
})

export default function Home({ courses }) {
  const {
    state: { user },
  } = useContext(Context)

  const { pathname } = useRouter()

  const options = {
    responsive: {
      0: {
        items: 1,
        margin: 10,
      },
      450: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 4,
      },
    },
  }
  return (
    <div>
      <Hero />
      <div className="top-rated">
        <div className="section-title" style={{ marginTop: '50px' }}>
          <h2>Recently Added</h2>
        </div>
        <div className="m-5 p-3 pt-4 mt-5 shadow-lg shadow-indigo-500/40">
        <div className="row">
          <div className="col-12 pb-5">
            {courses.map((course) => (
              <div key={course._id}>
                <RecentlyAdded key={course._id} course={course} />
              </div>
            ))}
            {pathname !== '/' ? null : (
              <div className="footer-button text-center">
                <Link href="/courses">
                  <a className="button button--lg button-p-s button-i--r">
                    Browse all Course
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
      {/* <div className="top-rated">
        <div className="section-title" style={{ marginTop: '50px' }}>
          <h2>Top Rated</h2>
        </div>
        <div className="m-5 p-3 pt-4 mt-5 shadow-lg shadow-indigo-500/40">
            <div className="row">
              <div className="col-12">
              <OwlCarousel
                className="owl-theme"
                // loop
                dots={false}
                responsiveClass
                margin={20}
                responsive={options.responsive}
              >
                {courses.map((course) => (
                  <div key={course._id}>
                    <TopRated key={course._id} course={course} />
                  </div>
                ))}
              </OwlCarousel>
              </div>
            </div>
        </div>
      </div>
      <div className="top-sellers">
        <div className="section-title" style={{ marginTop: '50px' }}>
          <h2>Top Sellers</h2>
        </div>
        <div className="m-5 p-3 pt-4 mt-5 shadow-lg shadow-indigo-500/40">
          <OwlCarousel
            className="owl-theme"
            // loop
            dots={false}
            responsiveClass
            margin={20}
            responsive={options.responsive}
          >
            {courses.map((course) => (
              <TopSellers key={course._id} course={course} />
            ))}
          </OwlCarousel>
        </div>
      </div> */}

      <div className="cat-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-6">
              <div className="cta-left">
                <h4>Become an instructor</h4>
                <p>
                  Instructors from around the world teach millions of students
                  on Nubery. We provide the tools and skills to teach what you
                  love.
                </p>
                {user === null ? (
                  <Link href="/user/become-instructor">
                    <a className="default-btn btn-large bg-white icon-btn">
                      Teach on Nubery
                    </a>
                  </Link>
                ) : (
                  <Link href="/how-to-become-instructor">
                    <a className="default-btn btn-large bg-white icon-btn">
                      How to become an Instructor
                    </a>
                  </Link>
                )}
                <div className="cat-thumb">
                  <img src="/images/cta.png" alt="" />
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="cta-right">
                <h3>Your teaching & earning steps</h3>
                <ul>
                  <li>
                    <span className="color-1">1</span> Apply to become
                    instructor
                  </li>
                  <li>
                    <span className="color-2">2</span> Build & edit your profile
                  </li>
                  <li>
                    <span className="color-3">3</span> Create your new course
                  </li>
                  <li>
                    <span className="color-4">4</span> Start teaching & earning
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <TopInstructors /> */}
    </div>
  )
}

export async function getServerSideProps({query: p}) {
  if(p.search == undefined){
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/courses?page=1&size=12`)

    return {
      props: {
        courses: [data],
      },
    }
  }
}
