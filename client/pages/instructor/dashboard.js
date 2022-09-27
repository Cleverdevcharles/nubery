import { useState, useEffect, useContext } from 'react'
import InstructorRoute from '../../components/routes/InstructorRoute'
import { useRouter } from 'next/router'
import Sidenav from '../../components/dashboardLayout/Sidenav'
import axios from 'axios'
import { Avatar, Tooltip } from 'antd'
import Link from 'next/link'
import { SyncOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { Context } from '../../context'

const InstructorIndex = () => {
  const [activePage, setActivePage] = useState('Courses')
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadCourses()
  }, [])

  const router = useRouter()
  const {
    state: { user },
  } = useContext(Context)

  const loadCourses = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `/api/user-courses`,
      )
      setCourses(data)
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }
  return (
    <InstructorRoute>
      <div className="h-screen grid md:grid-cols-custom-sidenav-layout">
        <Sidenav activePage={activePage} setActivePage={setActivePage} />
        <div className="flex-1 my-6 mx-5">
          <div className="text-xl font-bold text-gray-600 border-b-2 border-brightRedLight pt-6 pb-2 px-6">
            My Courses/Learning
          </div>
          {courses &&
            courses.map((course) => (
              <div key={course._id} className="media pt-2 pb-2">
                <Avatar
                  size={80}
                  shape="square"
                  src={course.image ? course.image.Location : '/course.png'}
                />

                <div className="media-body pl-2 pb-3">
                  <div className="row">
                    <div className="col">
                      <Link
                        href={`/user/course/${course.slug}`}
                        className="pointer"
                      >
                        <a>
                          <h3 className="mt-2 text-primary">{course.name}</h3>
                        </a>
                      </Link>
                      <p>
                        {course.lessons.length} lessons (By{' '}
                        {course.instructor.name})
                      </p>
                    </div>
                    <div className="col-md-3 text-center">
                      <Link href={`/user/course/${course.slug}`}>
                        <a>
                          <PlayCircleOutlined
                            className="h2 pointer text-primary"
                            style={{ marginTop: '-100px' }}
                          />
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            ))}
        </div>
      </div>
    </InstructorRoute>
  )
}

export default InstructorIndex
