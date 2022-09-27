import React from 'react'

const CourseDescription = ({ course }) => {
  return (
    <div className="p-4">
      {course && (
        <>
        {course.map((c) => (
          <div key={c._id}>
            <h4 className="font-bold text-2xl mb-3">Course Description</h4>
            <div className="border p-4">{c.description}</div>
          </div>
        ))}
        </>
      )}
    </div>
  )
}

export default CourseDescription
