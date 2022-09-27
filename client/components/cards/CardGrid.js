import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import axios from 'axios'
import Card from './Card'
import { Context } from '../../context'

const CardGrid = ({ course }) => {
  // const [students, setStudents] = useState(0)
  // const { name, instructor, price, oldPrice, image, slug, paid, category, subs, language, courseLevel } = course

  const {
    state: { user },
    dispatch,
  } = useContext(Context)

  // useEffect(() => {
  //   if (course) studentCount()
  // }, [course])

  // const studentCount = async () => {
  //   const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/instructor/student-count`, {
  //     courseId: course._id,
  //   })
  //   console.log("CourseID2: ", course)
  //   setStudents(data.length)
  // }
  return (
    <>
      {course && (
        <>
          <div className="container my-12 mx-auto px-4 md:px-5">
            <div className="flex flex-wrap -mx-1 lg:-mx-2">
              {course.map((c) => (
                <Link href={`/course/${c.slug}`}>
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
                      // numOfReview={numOfReview}
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

export default CardGrid
