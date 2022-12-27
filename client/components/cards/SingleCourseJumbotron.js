import React from 'react'
import { currencyFormatter } from '../../utils/helpers'

const SingleCourseJumbotron = ({ course }) => {
  // destructure
  // const {
  //   name,
  //   description,
  //   instructor,
  //   updatedAt,
  //   category,
  //   paid,
  //   price,
  // } = course

  return (
    <>
      {course && (
         course.map((c) => (
          <>
          {c &&
          <div className="bg-darkBlue" key={c._id}>
          <div className="container p-20 pt-6 text-white space-y-4">
            <a href="#" className="text-brightRed font-semibold">
              {  c.category[0].name}
            </a>

            <h3 className="font-bold text-4xl text-white">
              {  c.name}
            </h3>
            <p className="text-white">
              { c.description.substring(0, 160)}
              ...
            </p>
            <p className="text-white">
              Created by{' '}
              <a href="#" className="text-brightRed underline">
                {  c.instructor.name}
              </a>
            </p>
            <h4 className="text-light">
              {  c.paid
                ? currencyFormatter({
                    amount:   c.price,
                    currency: 'usd',
                  })
                : 'Free'}
            </h4>
            <p className="text-white">
              Last udpated{' '}
              {new Date(  c.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
          }
          </>
        ))
              )}
    </>
  )
}

export default SingleCourseJumbotron
