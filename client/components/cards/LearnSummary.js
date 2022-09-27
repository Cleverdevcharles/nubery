import React from 'react'
import Image from 'next/image'
import ReactPlayer from 'react-player'
import { Button } from 'antd'
import { LoadingOutlined, SafetyOutlined } from '@ant-design/icons'
import { currencyFormatter } from '../../utils/helpers'

const LearnSummary = ({
  course,
  showModal,
  setShowModal,
  preview,
  setPreview,
  loading,
  user,
  handlePaidEnrollment,
  handleFreeEnrollment,
  enrolled,
  setEnrolled,
}) => {
  // const {
  //   name,
  //   lessons,
  //   image,
  //   paid,
  // } = course;

  return (
    <>
      {course && (

        <>
          {course.map((c) => (

          <div className="px-5 py-5 mx-0 md:mx-20" key={c._id}>
            <h4 className="font-bold text-2xl mb-3">What you'll learn</h4>
            <div className="col-12">
              <div className="row">
                <div className="col-md-8">
                  <div className="border p-4">
                    <ul className="columns-2 space-y-2">
                      <li>
                        <div className="flex">
                          <p className="wrap">
                            {  c.courseAchievement}
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <div className="py-5">
                      <h4 className="font-bold text-2xl">Other Info</h4>
                      <ul className="list-disc space-y-2 px-4">
                        <li>
                          <b>Price</b>:{' '}
                          {  c.paid
                            ? currencyFormatter({
                                amount:   c.price,
                                currency: 'usd',
                              })
                            : 'Free'}
                        </li>
                        <li>
                          <b>Communication Language</b>:{' '}
                          {  c.language}
                        </li>
                        <li>
                          <b>Who is this course made for?</b> -{' '}
                          {  c.courseLevel}
                        </li>
                        {user &&
                          enrolled.status &&
                          
                          
                           c.downloadableResourses && (
                            <li>
                              <b>Download Course</b>:
                              <a
                                href={`${
                                  
                                  
                                   c.downloadableResourses
                                }`}
                              >
                                {
                                  
                                   c.downloadableResourses}
                              </a>
                            </li>
                          )}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  {/* {JSON.stringify(  c.lessons[0])} */}
                  {/* show video preview or course image */}
                  {
                  
                   c.lessons.video &&
                  
                  
                   c.lessons.video.Location ? (
                    <div
                      onClick={() => {
                        setPreview(
                          
                            
                             c.lessons.video.Location,
                        )
                        setShowModal(!showModal)
                      }}
                    >
                      <ReactPlayer
                        className="react-player-div"
                        url={
                           c.lessons.video.Location
                        }
                        light={  c.image.Location}
                        width="100%"
                        height="225px"
                      />
                    </div>
                  ) : (
                    <>
                     <Image
                        layout="intrinsic"
                        className="absolute inset-0 w-full object-cover"
                        src={  c.image.Location}
                        alt={  c.name}
                        width={450}
                        height={300}
                      />
                    </>
                  )}
                  {/* enroll button */}
                  {loading ? (
                    <div className="d-flex justify-content-center mt-3">
                      <LoadingOutlined className="h1 text-danger" />
                    </div>
                  ) : (
                    <Button
                      className="mb-3 mt-3"
                      type="danger"
                      block
                      shape="round"
                      icon={<SafetyOutlined />}
                      size="large"
                      disabled={loading}
                      onClick={
                          c.paid
                          ? handlePaidEnrollment
                          : handleFreeEnrollment
                      }
                    >
                      {user
                        ? enrolled.status
                          ? 'Go to course'
                          : 'Enroll'
                        : 'Login to enroll'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
          ))}
        </>
      )}
    </>
  )
}

export default LearnSummary
