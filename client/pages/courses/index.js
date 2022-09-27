import React, {useState, useEffect} from 'react'
import RecentlyAdded from '../../components/cards/RecentlyAdded'
import axios from 'axios'
import { useRouter } from 'next/router'
import Card from '../../components/cards/Card'
import CardGrid from '../../components/cards/CardGrid'
import {Pagination} from 'antd'

const Index = ({ courses }) => {
  const [total, setTotal] = useState("")
  const [page, setPage] = useState(1)
  const [coursePerPage, setCoursePerPage] = useState(8)
  const [limit, setLimit] = useState(8)
  const { pathname } = useRouter()
  const router = useRouter()

  const {query} = router

  useEffect(()  => {
    if(query.page) {
      let p = Number(query.page) >= 1 ? query.page : 1;
      setPage(Number(p))
    }
  }, [query])

  const indexOfLastPage = page + coursePerPage;
  const indexOfFirstPage = indexOfLastPage - coursePerPage;
  const currentCourses = courses[0].slice(indexOfFirstPage, indexOfLastPage)


  useEffect(()  => {
    setTotal(courses[0].length)
  }, [])


  const onShowSizeChange = (current, pageSize) => {
    setCoursePerPage(pageSize);
  }
  const itemRender = (current, type,  originalElement) => {
    if(type === "prev") {
      return <div className="pag-arrow pag-arrow-left">
      <a style={{cursor: "pointer"}} >
        <svg
          className="align-self-center"
          width="18"
          height="16"
          viewBox="0 0 18 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.25 8H0.75"
            stroke="#FF6636"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M7.5 1.25L0.75 8L7.5 14.75"
            stroke="#FF6636"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </a>
    </div>
    }
    if(type === "next") {
      return <div className="pag-arrow pag-arrow-right" style={{marginLeft: "0px"}}>
      <a style={{cursor: "pointer"}}>
        <svg
          className="align-self-center"
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
      </a>
    </div>
    }
    return originalElement
  }

  const handlePage = (pageIndex) => {
    // e.preventDefault()
    if(pathname === "/") return;
    let p = pageIndex >= 1 ? pageIndex : 1;

    setPage(Number(p))
    router.replace(`?page=${p}&size=${limit}`)
}
  

  // const handlePagination = (pageIndex) => {
    // if(pathname === "/") return;
    // let p = pageIndex >= 1 ? pageIndex : 1;
   
  //   router.replace(`?page=${p}&size=${limit}`)
  // }

  // const handlePeerPage = (limitNumber) => {
  //   if(pathname === "/") return;
  //   router.replace(`?page=${1}&size=${limitNumber}`)
  // }

  return (
    <div>
      <div className="course-section section-padding">
        <div className="container">
          <div className="top-action-header-section">
            <div className="bottom-action-header">
              <div className="search-result">

                <div>
                {currentCourses.map((course) => (
                  <div key={course._id}>
                    {course.length < 1 && <p>No Course found</p>}
                  </div>
                  ))}
                {courses[0].name ===
                    new URLSearchParams(pathname.search).get('search')
                      ? courses[0].length + 'Courses found for' + ' ' + courses[0].name
                      : courses[0].length >= 1 ? courses[0].length + ' ' + 
                      'Courses Available' : courses[0].length + ' ' + 'Course Available'
                }
                  </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
                {courses.map((course) => (
                  <div key={course._id}>
                    <CardGrid course={course} />
                  </div>
                ))}

              {courses[0].length > 8 && (
              <div className="pag text-center mt-2">
                <div className="pag-content">
                  <Pagination 
                  onChange={handlePage}
                  pageSize={coursePerPage}
                  total={total}
                  current={page}
                  onShowSizeChange={onShowSizeChange}
                  itemRender={itemRender}
                />
                </div>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index

export async function getServerSideProps({query: p}) {
  if(p.search == undefined){
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/courses?page=${p.page}&size=${p.size}`)

    return {
      props: {
        courses: [data],
      },
    }
  }else{
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/courses?name=${p.search}`)
    return {
      props: {
        courses: [data],
      },
    }
  }
 
}
