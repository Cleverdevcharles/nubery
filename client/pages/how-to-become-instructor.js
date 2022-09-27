import Link from 'next/link'

const howToBecome_Instructor = () => {
  return (
    <>
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
                <Link href="/how-to-become-instructor">
                  Become an Instructor
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="contact-us-section become-instructor">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 order-lg-2">
              <div className="about-thumb responsive_bottom">
                <img src="/images/become-thumb.png" alt="" />
              </div>
            </div>
            <div className="col-lg-6 d-flex align-items-center">
              <div className="about-content become-instructor">
                <h2>Become an Instuctor</h2>
                <p>
                  Become an instructor & start teaching with 26k certified
                  instructors. Create a success story with 67.1k Students — Grow
                  yourself with 71 countries.
                </p>
                <Link href="/signup">
                  <span className="button button--lg cursor-pointer">
                    Get Started
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="counter-section become-instructor">
        <div id="etutor-counter"></div>
        <div className="container">
          <div className="counter-wrap">
            <div className="counter-item">
              <div className="counter-icon">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.2"
                    d="M13.75 25C18.2373 25 21.875 21.3623 21.875 16.875C21.875 12.3877 18.2373 8.75 13.75 8.75C9.26272 8.75 5.62503 12.3877 5.62503 16.875C5.62503 21.3623 9.26272 25 13.75 25Z"
                    fill="#FF6636"
                  />
                  <path
                    d="M13.75 25C18.2373 25 21.875 21.3623 21.875 16.875C21.875 12.3877 18.2373 8.75 13.75 8.75C9.26272 8.75 5.62503 12.3877 5.62503 16.875C5.62503 21.3623 9.26272 25 13.75 25Z"
                    stroke="#FF6636"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M24.2834 9.05256C25.4009 8.7377 26.573 8.66597 27.7206 8.84221C28.8682 9.01845 29.9646 9.43856 30.9362 10.0743C31.9077 10.7099 32.7318 11.5465 33.3528 12.5274C33.9739 13.5084 34.3775 14.6111 34.5365 15.7612C34.6955 16.9113 34.6062 18.0821 34.2746 19.1948C33.943 20.3075 33.3768 21.3362 32.6141 22.2116C31.8515 23.0871 30.9101 23.7889 29.8533 24.2699C28.7966 24.7508 27.6491 24.9998 26.488 24.9999"
                    stroke="#FF6636"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.49951 30.8432C3.76847 29.0382 5.45309 27.565 7.41115 26.548C9.36921 25.531 11.5432 25.0001 13.7496 25C15.9561 24.9999 18.1301 25.5307 20.0882 26.5476C22.0464 27.5644 23.7311 29.0375 25.0002 30.8424"
                    stroke="#FF6636"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M26.4877 25C28.6943 24.9984 30.8688 25.5285 32.8271 26.5455C34.7854 27.5625 36.4698 29.0364 37.7378 30.8424"
                    stroke="#FF6636"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="counter-data">
                <h2 className="counter-number">
                  <span
                    data-percentage="67.1"
                    className="etutor-counter"
                  ></span>
                  k
                </h2>
                <p>Students</p>
              </div>
            </div>
            <div className="counter-item">
              <div className="counter-icon">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.2"
                    d="M12.5 33.75H7.5C7.16848 33.75 6.85054 33.6183 6.61612 33.3839C6.3817 33.1495 6.25 32.8315 6.25 32.5V7.5C6.25 7.16848 6.3817 6.85054 6.61612 6.61612C6.85054 6.3817 7.16848 6.25 7.5 6.25H12.5V33.75Z"
                    fill="#564FFD"
                  />
                  <path
                    d="M17.5 17.5H27.5"
                    stroke="#564FFD"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.5 22.5H27.5"
                    stroke="#564FFD"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M32.5 6.25H7.5C6.80964 6.25 6.25 6.80964 6.25 7.5V32.5C6.25 33.1904 6.80964 33.75 7.5 33.75H32.5C33.1904 33.75 33.75 33.1904 33.75 32.5V7.5C33.75 6.80964 33.1904 6.25 32.5 6.25Z"
                    stroke="#564FFD"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.5 6.25V33.75"
                    stroke="#564FFD"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="counter-data">
                <h2 className="counter-number">
                  <span data-percentage="26" className="etutor-counter"></span>k
                </h2>
                <p>Certified Instructor</p>
              </div>
            </div>
            <div className="counter-item">
              <div className="counter-icon">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.2"
                    d="M8.50951 31.4905C7.07139 30.0524 8.02524 27.0331 7.29325 25.2639C6.53443 23.43 3.75 21.9539 3.75 19.9999C3.75 18.046 6.53445 16.57 7.29325 14.7361C8.02525 12.9669 7.07139 9.94764 8.50951 8.50951C9.94764 7.07139 12.9669 8.02524 14.7361 7.29325C16.57 6.53443 18.0461 3.75 20.0001 3.75C21.954 3.75 23.43 6.53445 25.2639 7.29325C27.0331 8.02525 30.0524 7.07139 31.4905 8.50951C32.9286 9.94764 31.9748 12.9669 32.7068 14.7361C33.4656 16.57 36.25 18.0461 36.25 20.0001C36.25 21.954 33.4656 23.43 32.7067 25.2639C31.9747 27.0331 32.9286 30.0524 31.4905 31.4905C30.0524 32.9286 27.0331 31.9748 25.2639 32.7068C23.43 33.4656 21.9539 36.25 19.9999 36.25C18.046 36.25 16.57 33.4656 14.7361 32.7067C12.9669 31.9747 9.94764 32.9286 8.50951 31.4905Z"
                    fill="#23BD33"
                  />
                  <path
                    d="M8.50951 31.4905C7.07139 30.0524 8.02524 27.0331 7.29325 25.2639C6.53443 23.43 3.75 21.9539 3.75 19.9999C3.75 18.046 6.53445 16.57 7.29325 14.7361C8.02525 12.9669 7.07139 9.94764 8.50951 8.50951C9.94764 7.07139 12.9669 8.02524 14.7361 7.29325C16.57 6.53443 18.0461 3.75 20.0001 3.75C21.954 3.75 23.43 6.53445 25.2639 7.29325C27.0331 8.02525 30.0524 7.07139 31.4905 8.50951C32.9286 9.94764 31.9748 12.9669 32.7068 14.7361C33.4656 16.57 36.25 18.0461 36.25 20.0001C36.25 21.954 33.4656 23.43 32.7067 25.2639C31.9747 27.0331 32.9286 30.0524 31.4905 31.4905C30.0524 32.9286 27.0331 31.9748 25.2639 32.7068C23.43 33.4656 21.9539 36.25 19.9999 36.25C18.046 36.25 16.57 33.4656 14.7361 32.7067C12.9669 31.9747 9.94764 32.9286 8.50951 31.4905Z"
                    stroke="#23BD33"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M26.875 16.25L17.7083 25L13.125 20.625"
                    stroke="#23BD33"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="counter-data">
                <h2 className="counter-number">
                  <span
                    data-percentage="99.9"
                    className="etutor-counter"
                  ></span>
                  %
                </h2>
                <p>Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="teaching-Etutor-section section-padding">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6">
              <div className="join-team-thumb-wrap">
                <img src="/images/monitor.png" alt="" />
              </div>
            </div>
            <div className="col-xl-5 col-lg-6">
              <div className="join-team-content become-instructor">
                <h2>Why you’ll start teaching on Nubery</h2>
                <p>
                  Praesent congue ornare nibh sed ullamcorper. Proin venenatis
                  tellus non turpis scelerisque, vitae auctor arcu ornare. Cras
                  vitae nulla a purus mollis venenatis.
                </p>
                <div className="checkbox-field">
                  <ul>
                    <li>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                          fill="#23BD33"
                          stroke="#23BD33"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M16.125 9.75L10.625 15L7.875 12.375"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <span>Tech your students as you want.</span>
                    </li>
                    <li>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                          fill="#23BD33"
                          stroke="#23BD33"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M16.125 9.75L10.625 15L7.875 12.375"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <span>Manage your course, payment in one place</span>
                    </li>
                    <li>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                          fill="#23BD33"
                          stroke="#23BD33"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M16.125 9.75L10.625 15L7.875 12.375"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <span>Chat with your students</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="become-successful-instructor section-padding">
        <div className="container">
          <div className="section-title">
            <h2>
              How you'll become
              <br />
              successful instructor
            </h2>
          </div>
          <div className="row">
            <div className="col-xl-3 col-lg-6 col-md-6">
              <div className="progress-content progress-content-color-5">
                <div className="progress-content-left bg-white pl-5">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.2"
                      d="M25 6H7C6.86868 6 6.73864 6.02586 6.61732 6.07612C6.49599 6.12637 6.38575 6.20003 6.29289 6.29289C6.20003 6.38575 6.12637 6.49599 6.07612 6.61732C6.02586 6.73864 6 6.86868 6 7V25C6 25.1313 6.02586 25.2614 6.07612 25.3827C6.12637 25.504 6.20003 25.6143 6.29289 25.7071C6.38575 25.8 6.49599 25.8736 6.61732 25.9239C6.73864 25.9741 6.86868 26 7 26H25C25.1313 26 25.2614 25.9741 25.3827 25.9239C25.504 25.8736 25.6143 25.8 25.7071 25.7071C25.8 25.6143 25.8736 25.504 25.9239 25.3827C25.9741 25.2614 26 25.1313 26 25V7C26 6.86868 25.9741 6.73864 25.9239 6.61732C25.8736 6.49599 25.8 6.38575 25.7071 6.29289C25.6143 6.20003 25.504 6.12637 25.3827 6.07612C25.2614 6.02586 25.1313 6 25 6ZM19.5 19.5H12.5V12.5H19.5V19.5Z"
                      fill="#564FFD"
                    ></path>
                    <path
                      d="M19.5 12.5H12.5V19.5H19.5V12.5Z"
                      stroke="#564FFD"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M25 6H7C6.44772 6 6 6.44772 6 7V25C6 25.5523 6.44772 26 7 26H25C25.5523 26 26 25.5523 26 25V7C26 6.44772 25.5523 6 25 6Z"
                      stroke="#564FFD"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M26 13H29"
                      stroke="#564FFD"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M26 19H29"
                      stroke="#564FFD"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M3 13H6"
                      stroke="#564FFD"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M3 19H6"
                      stroke="#564FFD"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M19 26V29"
                      stroke="#564FFD"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M13 26V29"
                      stroke="#564FFD"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M19 3V6"
                      stroke="#564FFD"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M13 3V6"
                      stroke="#564FFD"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
                <div className="progress-content-right">
                  <a>1. Apply to become instructor.</a>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6">
              <div className="progress-content progress-content-color-3">
                <div className="progress-content-left bg-white pl-5">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.2"
                      d="M33.75 7.5H6.25C5.91848 7.5 5.60054 7.6317 5.36612 7.86612C5.1317 8.10054 5 8.41848 5 8.75V31.25C5 31.5815 5.1317 31.8995 5.36612 32.1339C5.60054 32.3683 5.91848 32.5 6.25 32.5H33.75C34.0815 32.5 34.3995 32.3683 34.6339 32.1339C34.8683 31.8995 35 31.5815 35 31.25V8.75C35 8.41848 34.8683 8.10054 34.6339 7.86612C34.3995 7.6317 34.0815 7.5 33.75 7.5ZM14.3907 22.5C13.649 22.5 12.924 22.2801 12.3073 21.868C11.6906 21.456 11.21 20.8703 10.9261 20.1851C10.6423 19.4998 10.5681 18.7458 10.7128 18.0184C10.8574 17.291 11.2146 16.6228 11.739 16.0983C12.2635 15.5739 12.9317 15.2167 13.6591 15.0721C14.3865 14.9274 15.1405 15.0016 15.8258 15.2855C16.511 15.5693 17.0967 16.0499 17.5087 16.6666C17.9208 17.2833 18.1407 18.0083 18.1407 18.75C18.1407 19.2425 18.0437 19.7301 17.8552 20.1851C17.6668 20.64 17.3906 21.0534 17.0423 21.4017C16.6941 21.7499 16.2807 22.0261 15.8258 22.2146C15.3708 22.403 14.8832 22.5 14.3907 22.5Z"
                      fill="#E34444"
                    ></path>
                    <path
                      d="M23.75 17.5H30"
                      stroke="#E34444"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M23.75 22.5H30"
                      stroke="#E34444"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M14.3909 22.5C16.4619 22.5 18.1409 20.8211 18.1409 18.75C18.1409 16.6789 16.4619 15 14.3909 15C12.3198 15 10.6409 16.6789 10.6409 18.75C10.6409 20.8211 12.3198 22.5 14.3909 22.5Z"
                      stroke="#E34444"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M9.54785 26.2499C9.82528 25.1766 10.4514 24.2259 11.3279 23.5471C12.2044 22.8684 13.2816 22.5 14.3901 22.5C15.4987 22.5 16.5759 22.8682 17.4524 23.5469C18.329 24.2256 18.9552 25.1763 19.2327 26.2496"
                      stroke="#E34444"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M33.75 7.5H6.25C5.55964 7.5 5 8.05964 5 8.75V31.25C5 31.9404 5.55964 32.5 6.25 32.5H33.75C34.4404 32.5 35 31.9404 35 31.25V8.75C35 8.05964 34.4404 7.5 33.75 7.5Z"
                      stroke="#E34444"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
                <div className="progress-content-right">
                  <a>2. Setup &amp; edit your profile.</a>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6">
              <div className="progress-content progress-content-color-2">
                <div className="progress-content-left bg-white pl-5">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.2"
                      d="M20 5C17.0333 5 14.1332 5.87973 11.6665 7.52796C9.19972 9.17618 7.27713 11.5189 6.14181 14.2597C5.0065 17.0006 4.70945 20.0166 5.28823 22.9264C5.86701 25.8361 7.29562 28.5088 9.39341 30.6066C11.4912 32.7044 14.1639 34.133 17.0737 34.7118C19.9834 35.2906 22.9994 34.9935 25.7403 33.8582C28.4812 32.7229 30.8238 30.8003 32.4721 28.3336C34.1203 25.8668 35 22.9667 35 20C35 18.0302 34.612 16.0796 33.8582 14.2597C33.1044 12.4399 31.9995 10.7863 30.6066 9.39339C29.2137 8.00051 27.5602 6.89562 25.7403 6.1418C23.9204 5.38798 21.9698 4.99999 20 5ZM17.5 25V15L25 20L17.5 25Z"
                      fill="#FF6636"
                    ></path>
                    <path
                      d="M20 35C28.2843 35 35 28.2843 35 20C35 11.7157 28.2843 5 20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35Z"
                      stroke="#FF6636"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    ></path>
                    <path
                      d="M25 20L17.5 15V25L25 20Z"
                      stroke="#FF6636"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
                <div className="progress-content-right">
                  <a>3. Create your new course</a>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6">
              <div className="progress-content progress-content-color-1">
                <div className="progress-content-left bg-white pl-5">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.2"
                      d="M31.25 23.8833L25.5004 29.6328C25.3478 29.7855 25.1583 29.896 24.9502 29.9536C24.7422 30.0112 24.5228 30.014 24.3134 29.9616L15.2576 27.6977C15.0878 27.6552 14.9287 27.5776 14.7908 27.4697L6.25 20.7911L11.3397 11.2158L19.3585 8.87808C19.6449 8.79457 19.9518 8.81628 20.2237 8.93928L25.625 11.3833H22.3928C22.2286 11.3833 22.0661 11.4156 21.9144 11.4784C21.7628 11.5413 21.625 11.6333 21.5089 11.7494L15.3941 17.8642C15.2675 17.9908 15.1695 18.1432 15.1069 18.3109C15.0443 18.4787 15.0185 18.658 15.0312 18.8367C15.0438 19.0153 15.0948 19.1891 15.1805 19.3464C15.2662 19.5036 15.3847 19.6406 15.528 19.748L16.375 20.3833C17.2405 21.0324 18.2931 21.3833 19.375 21.3833C20.4569 21.3833 21.5095 21.0324 22.375 20.3833L24.375 18.8833L31.25 23.8833Z"
                      fill="#23BD33"
                    ></path>
                    <path
                      d="M37.6121 19.0277L33.75 20.9588L28.75 11.3835L32.6515 9.43275C32.9446 9.28619 33.2835 9.2606 33.5953 9.3615C33.9071 9.46239 34.1668 9.6817 34.3185 9.9722L38.1611 17.3311C38.238 17.4783 38.2847 17.6392 38.2987 17.8046C38.3126 17.9701 38.2935 18.1366 38.2424 18.2945C38.1913 18.4525 38.1092 18.5987 38.001 18.7245C37.8928 18.8504 37.7606 18.9535 37.6121 19.0277V19.0277Z"
                      stroke="#23BD33"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M6.25038 20.7908L2.38825 18.8598C2.23977 18.7855 2.10757 18.6825 1.99936 18.5566C1.89114 18.4307 1.80909 18.2845 1.75798 18.1266C1.70687 17.9686 1.68774 17.8021 1.70169 17.6367C1.71564 17.4713 1.7624 17.3103 1.83923 17.1631L5.68188 9.80423C5.83357 9.51374 6.09327 9.29443 6.40506 9.19353C6.71686 9.09264 7.05581 9.11822 7.34893 9.26478L11.2504 11.2155L6.25038 20.7908Z"
                      stroke="#23BD33"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M33.75 20.9604L31.25 23.8851L25.5004 29.6347C25.3478 29.7873 25.1583 29.8978 24.9502 29.9554C24.7422 30.0131 24.5228 30.0158 24.3134 29.9635L15.2576 27.6995C15.0878 27.6571 14.9287 27.5794 14.7908 27.4715L6.25 20.793"
                      stroke="#23BD33"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M31.2498 23.8828L24.3748 18.8828L22.3748 20.3828C21.5093 21.0319 20.4567 21.3828 19.3748 21.3828C18.293 21.3828 17.2403 21.0319 16.3748 20.3828L15.5278 19.7476C15.3846 19.6401 15.2661 19.5031 15.1803 19.3459C15.0946 19.1886 15.0437 19.0148 15.031 18.8362C15.0183 18.6575 15.0441 18.4783 15.1067 18.3105C15.1694 18.1427 15.2673 17.9903 15.3939 17.8637L21.5087 11.7489C21.6248 11.6329 21.7626 11.5408 21.9142 11.478C22.0659 11.4151 22.2284 11.3828 22.3926 11.3828H28.7498"
                      stroke="#23BD33"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M11.3396 11.2158L19.3583 8.87808C19.6448 8.79457 19.9517 8.81628 20.2235 8.93928L25.6249 11.3833"
                      stroke="#23BD33"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M17.5 33.2596L12.7907 32.0823C12.5996 32.0345 12.4225 31.9423 12.2738 31.813L8.75 28.75"
                      stroke="#23BD33"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
                <div className="progress-content-right">
                  <a>4. Start teaching &amp; earning</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="instructor-rules section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 order-lg-2">
              <div className="about-thumb responsive_bottom">
                <img
                  src="/images/union.png"
                  alt="instructor-banner"
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-lg-6 d-flex align-items-center">
              <div className="instructor-rules__info">
                <h2>
                  Instructor rules & <br className="d-none d-lg-block" />
                  regulations
                </h2>
                <p>
                  Sed auctor, nisl non elementum ornare, turpis orci consequat
                  arcu, at iaculis quam leo nec libero. Aenean mollis turpis
                  velit, id laoreet sem luctus in. Etiam et egestas lorem.
                </p>
                <ul>
                  <li>Sed ullamcorper libero quis condimentum pellentesque.</li>
                  <li>Nam leo tortor, tempus et felis non.</li>
                  <li>
                    Porttitor faucibus erat. Integer eget purus non massa
                    ultricies pretium ac sed eros.
                  </li>
                  <li>
                    Vestibulum ultrices commodo tellus. Etiam eu lectus sit amet
                    turpi.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="help-center-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6">
              <div className="join-team-thumb-wrap">
                <img src="/images/Union2.png" alt="" />
              </div>
            </div>
            <div className="col-xl-5 col-lg-6 offset-xl-1 d-flex align-items-center">
              <div className="join-team-content help-center-content">
                <h2>Don’t worry we’re always here to help you</h2>
                <p>
                  Mauris aliquet ornare tortor, ut mollis arcu luctus quis.
                  Phasellus nec augue malesuada, sagittis ligula vel, faucibus
                  metus. Nam viverra metus eget nunc dignissim.
                </p>
                <div className="course-list-section">
                  <ul>
                    <li>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.75 12H20.25"
                          stroke="#FF6636"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M13.5 5.25L20.25 12L13.5 18.75"
                          stroke="#FF6636"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      This course is for those who want to launch a Freelance
                      Web Design career.
                    </li>
                    <li>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.75 12H20.25"
                          stroke="#FF6636"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M13.5 5.25L20.25 12L13.5 18.75"
                          stroke="#FF6636"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      Those who are looking to reboot their work life and try a
                      new profession that.
                    </li>
                    <li>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.75 12H20.25"
                          stroke="#FF6636"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M13.5 5.25L20.25 12L13.5 18.75"
                          stroke="#FF6636"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      Nunc auctor consequat lorem, in posuere enim hendrerit
                      sed.
                    </li>
                    <li>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.75 12H20.25"
                          stroke="#FF6636"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M13.5 5.25L20.25 12L13.5 18.75"
                          stroke="#FF6636"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      Duis ornare enim ullamcorper congue.
                    </li>
                  </ul>
                </div>
                <div className="help-center-wrap">
                  <a className="help-center-icon" href="">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 5.25L12 13.5L3 5.25"
                        stroke="#FF6636"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 5.25H21V18C21 18.1989 20.921 18.3897 20.7803 18.5303C20.6397 18.671 20.4489 18.75 20.25 18.75H3.75C3.55109 18.75 3.36032 18.671 3.21967 18.5303C3.07902 18.3897 3 18.1989 3 18V5.25Z"
                        stroke="#FF6636"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10.3636 12L3.2312 18.538"
                        stroke="#FF6636"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M20.7687 18.5381L13.6362 12"
                        stroke="#FF6636"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                  <div className="help-center-data">
                    <p>Email us, anytime anywhere</p>
                    <a href="">help.Nubery@gamil.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default howToBecome_Instructor
