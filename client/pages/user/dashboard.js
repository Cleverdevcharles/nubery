import { useState, useEffect, useContext } from 'react'
import UserRoute from '../../components/routes/UserRoute'
import { useRouter } from 'next/router'
import Sidenav from '../../components/dashboardLayout/Sidenav'
import axios from 'axios'
import { Avatar, Tooltip } from 'antd'
import Link from 'next/link'
import { SyncOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { Context } from '../../context'
import Pagination  from "rc-pagination";

const UserIndex = () => {
  const [activePage, setActivePage] = useState('Courses')
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const [perPage, setPerPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);

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
      const { data } = await axios.get(`/api/user-courses`)
      setCourses(data)
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }
  
  const PerPageChange = (value) => {
      setSize(value);
      const newPerPage = Math.ceil(courses.length / value);
      if (current > newPerPage) {
          setCurrent(newPerPage);
      }
  }
  
  const getData = (current, pageSize) => {
      // Normally you should get the data from the server
      return courses.slice((current - 1) * pageSize, current * pageSize);
  };
  
  const PaginationChange = (page, pageSize) => {
      setCurrent(page);
      setSize(pageSize)
  }
  
  const PrevNextArrow = (current, type, originalElement) => {
      if (type === 'prev') {
          return <button><i className="fa fa-angle-double-left"></i></button>;
      }
      if (type === 'next') {
          return <button><i className="fa fa-angle-double-right"></i></button>;
      }
      return originalElement;
  }
  

  return (
    <UserRoute>
      <div className="h-screen grid md:grid-cols-custom-sidenav-layout">
        <Sidenav activePage={activePage} setActivePage={setActivePage} />
        <div className="flex-1 my-6 mx-5">
          <div className="text-xl font-bold text-gray-600 border-b-2 border-brightRedLight pt-6 pb-2 px-6">
            My Courses/Learning
          </div>
          <div className="mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card">
                    <div className="card-body p-0">
                        
                        <div className="table-filter-info">
                            
                            <Pagination
                                className="pagination-data"
                                showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total}`}
                                onChange={PaginationChange}
                                total={courses.length}
                                current={current}
                                pageSize={size}
                                showSizeChanger={false}
                                itemRender={PrevNextArrow}
                                onShowSizeChange={PerPageChange}
                            />
                        </div>
                        <div className="table-responsive">
                            <table className="table table-text-small mb-0">
                                <thead className="thead-primary table-sorting">
                                    <tr>
                                        <th>#</th>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Instructor</th>
                                        <th>Email</th>
                                        <th>Contact</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { courses &&
                                        getData(current, size).map((data, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                      <Avatar
                                                        size={80}
                                                        shape="square"
                                                        src={data.image ? data.image.Location : '/course.png'}
                                                      />
                                                    </td>
                                                    <td>
                                                      <Link
                                                        href={`/user/course/${data.slug}`}
                                                        className="pointer"
                                                      >
                                                        <a>
                                                          <h3 className="mt-2 text-primary">{data.name}</h3>
                                                        </a>
                                                      </Link>
                                                    </td>
                                                    <td>
                                                    <p>
                                                      {data.lessons.length} lessons (By{' '}
                                                      {data.instructor.name})
                                                    </p>
                                                    </td>
                                                    <td>
                                                      <Link href={`/user/course/${data.slug}`}>
                                                        <a>
                                                          <PlayCircleOutlined
                                                            className="h2 pointer text-primary"
                                                            style={{ marginTop: '-100px' }}
                                                          />
                                                        </a>
                                                      </Link>
                                                    </td>
                                                    <td>
                                                    <a href={`mailto:${data.instructor.email}`}>
                                                          {data.instructor.email}
                                                        </a>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                      <div className="table-filter-info">
                            
                            <Pagination
                                className="pagination-data"
                                showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total}`}
                                onChange={PaginationChange}
                                total={courses.length}
                                current={current}
                                pageSize={size}
                                showSizeChanger={false}
                                itemRender={PrevNextArrow}
                                onShowSizeChange={PerPageChange}
                            />
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
          
        
        </div>
      </div>
    </UserRoute>
  )
}

export default UserIndex


