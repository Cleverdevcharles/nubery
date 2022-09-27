import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import InstructorRoute from '../../../components/routes/InstructorRoute'
import { Avatar, Tooltip } from 'antd'
import Link from 'next/link'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { Context } from '../../../context'
import Sidenav from '../../../components/dashboardLayout/Sidenav'

const MyCreatedCourse = () => {
  const [courses, setCourses] = useState([])
  const [activePage, setActivePage] = useState('My Created Courses')

  const {
    state: { user },
  } = useContext(Context)

  useEffect(() => {
    loadCourses()
  }, [])

  const loadCourses = async () => {
    const { data } = await axios.get(
      `/api/instructor-courses`,
    )
    setCourses(data)
  }

  return (
    <InstructorRoute>
      <div className="h-screen grid md:grid-cols-custom-sidenav-layout">
        <Sidenav activePage={activePage} setActivePage={setActivePage} />

        <div className="flex flex-col">
          <div className="text-xl font-bold text-gray-600 border-b-2 border-brightRedLight pt-6 pb-2 px-6">
            My Created Courses
          </div>
          <div className="flex-1 my-6 mx-5">
            {courses &&
              courses.map((course) => (
                <div key={course._id} className="media pt-2">
                  <Avatar
                    size={80}
                    src={course.image ? course.image.Location : '/course.png'}
                  />

                  <div className="media-body pl-2">
                    <div className="row">
                      <div className="col">
                        <Link
                          href={`/instructor/course/view/${course.slug}`}
                          className="pointer"
                        >
                          <a className="mt-2 text-primary">
                            <h5 className="pt-2">{course.name}</h5>
                          </a>
                        </Link>
                        <p style={{ marginTop: '-10px' }}>
                          {course.lessons.length} Lessons
                        </p>

                        {course.lessons.length < 5 ? (
                          <p
                            className="text-danger my-2"
                            style={{ marginTop: '-15px', fontSize: '16px' }}
                          >
                            At least 5 lessons are required to publish a course
                          </p>
                        ) : course.published ? (
                          <p className="text-success">
                            Your course is live in the marketplace
                          </p>
                        ) : (
                          <p className="text-success">
                            Your course is ready to be published
                          </p>
                        )}
                      </div>

                      <div className="col-md-3 mt-3 text-center">
                        {course.published ? (
                          <Tooltip title="Published">
                            <CheckCircleOutlined className="h5 pointer text-success" />
                          </Tooltip>
                        ) : (
                          <Tooltip title="Unpublished">
                            <CloseCircleOutlined className="h5 pointer text-warning" />
                          </Tooltip>
                        )}
                      </div>
                      <hr />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </InstructorRoute>
  )
}

export default MyCreatedCourse
