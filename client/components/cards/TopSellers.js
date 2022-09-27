import Link from 'next/link'
import { currencyFormatter } from '../../utils/helpers'
import Card from './Card'
import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { Context } from '../../context'

const { Meta } = Card

const TopSellers = ({ course }) => {
  const [students, setStudents] = useState(0)
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
          {course.map((c) => (
            <Link href={`/course/${c.slug}`} key={c._id}>
              <div>
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
        </>
      )}
    </>
  )
}

export default TopSellers
