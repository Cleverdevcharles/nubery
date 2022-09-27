import Link from 'next/link'
import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import Card from './Card'
import { Context } from '../../context'

const TopRated = ({ course }) => {
  // const [students, setStudents] = useState(0)
  // const { name, instructor, price, image, slug, paid, category } = course

  const {
    state: { user },
    dispatch,
  } = useContext(Context)

  // useEffect(() => {
  //   if (course) studentCount()
  // }, [course])

  // const studentCount = async () => {
  //   const { data } = await axios.post(`/api/instructor/student-count`, {
  //     courseId: course._id,
  //   })
  //   setStudents(data.length)
  // }

  return (
    <>
      {course && (
        <>
          <div className="container my-12 mx-auto px-4 md:px-5">
            <div className="flex flex-wrap -mx-1 lg:-mx-2">
              {course.map((c) => (
                <Link href={`/course/${c.slug}`} key={c._id}>
                  <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                    <Card
                      key={c.name}
                      imgSrc={c.image.Location}
                      title={c.name}
                      category={c.category[0].name}
                      subCategory={c.subs[0].name}
                      paid={c.paid}
                      slug={c.slug}
                      language={c.language}
                      courseLevel={c.courseLevel}
                      instructorPicture={c.instructor.image.Location}
                      instructorName={c.instructor.name}
                      price={c.price}
                      oldPrice={c.oldPrice}
                      // numOfReview={c.numOfReview}
                      // students={students}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default TopRated
