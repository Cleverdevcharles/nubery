import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Card from './Card'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { Context } from '../../context'
import _ from 'lodash'

const RecentlyAdded = ({ course }) => {
  // const [students, setStudents] = useState(0)
  // const {
  //   name,
  //   courseLevel,
  //   language,
  //   numOfReview,
  //   instructor,
  //   price,
  //   image,
  //   slug,
  //   paid,
  //   category,
  //   description,
  // } = course

  const { state, dispatch } = useContext(Context)
  const { user, cart } = state

  // useEffect(() => {
  //   if (user !== null) course && studentCount()
  // }, [user])

  const handleAddToCart = () => {
    // create cart array
    let cart = []
    if (typeof window !== 'undefined') {
      // if cart is in local storage GET it
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      // push new product to cart
      cart.push({
        ...(course && course[0]),
        count: 1,
      })
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual)
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem('cart', JSON.stringify(unique))
      // show tooltip
      toast('Added')

      // add to cart state
      dispatch({
        type: 'ADD_TO_CART',
        payload: unique,
      })
      // show cart items in side drawer
      dispatch({
        type: 'SET_VISIBLE',
        payload: true,
      })
    }
  }

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

export default RecentlyAdded
