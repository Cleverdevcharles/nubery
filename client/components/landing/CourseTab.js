import React from 'react'
import Tabs from '../customs/Tabs'
import TabsP from '../customs/TabsP'

const CourseTab = () => {
  return (
    <div className="ml-7 mt-20">
      <h3 className="text-4xl font-bold mb-3">A broad selection of courses</h3>
      <p className="mb-6">
        Choose from 100,000+ courses, new courses publishes every week
      </p>
      <TabsP />
      {/* <Tabs /> */}
    </div>
  )
}

export default CourseTab
