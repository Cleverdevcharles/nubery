import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import SingleCourseJumbotron from '../../components/cards/SingleCourseJumbotron'
import PreviewModal from '../../components/modal/PreviewModal'
import SingleCourseLessons from '../../components/cards/SingleCourseLessons'
import { Context } from '../../context'
import { toast } from 'react-toastify'
import { loadStripe } from '@stripe/stripe-js'
import LearnSummary from '../../components/cards/LearnSummary'
import CourseDescription from './../../components/cards/CourseDescription'

const SingleCourse = ({ course }) => {
  // state
  const [showModal, setShowModal] = useState(false)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [enrolled, setEnrolled] = useState({})
  // context
  const {
    state: { user },
  } = useContext(Context)

  useEffect(() => {
    if (user && course) checkEnrollment()
  }, [user && course])

  const checkEnrollment = async () => {
    const { data } = await axios.get(
      `/api/check-enrollment/${
        course && course[0]._id
      }`,
    )
    // console.log('CHECK ENROLLMENT', data)
    setEnrolled(data)
  }

  const router = useRouter()
  const { slug } = router.query

  const handlePaidEnrollment = async () => {
    // console.log("handle paid enrollment");
    try {
      setLoading(true)
      // check if user is logged in
      if (!user) router.push('/signin')
      // check if already enrolled
      if (enrolled.status)
        return router.push(`/user/course/${enrolled.course.slug}`)
      const { data } = await axios.post(
        `/api/paid-enrollment/${
          course && course[0]._id
        }`,
      )
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)
      stripe.redirectToCheckout({ sessionId: data })
    } catch (err) {
      toast('Enrollment failed, try again.')
      console.log(err)
      setLoading(false)
    }
  }

  const handleFreeEnrollment = async (e) => {
    // console.log("handle free enrollment");
    e.preventDefault()
    try {
      // check if user is logged in
      if (!user) router.push('/signin')
      // check if already enrolled
      if (enrolled.status)
        return router.push(`/user/course/${enrolled.course.slug}`)
      setLoading(true)
      const { data } = await axios.post(
        `/api/free-enrollment/${
          course && course[0]._id
        }`,
      )
      toast(data.message)
      setLoading(false)
      router.push(`/user/course/${data.course && course[0].slug}`)
    } catch (err) {
      toast('Enrollment failed. Try again.')
      console.log(err)
      setLoading(false)
    }
  }

  return (
    <>
      {/* <pre>{JSON.stringify(course && course[0], null, 4)}</pre> */}
      <SingleCourseJumbotron
        course={course}
        showModal={showModal}
        setShowModal={setShowModal}
        preview={preview}
        setPreview={setPreview}
        user={user}
        loading={loading}
        handlePaidEnrollment={handlePaidEnrollment}
        handleFreeEnrollment={handleFreeEnrollment}
        enrolled={enrolled}
        setEnrolled={setEnrolled}
      />

      {/* What you will learn selection */}
      <LearnSummary
        course={course}
        showModal={showModal}
        setShowModal={setShowModal}
        setPreview={setPreview}
        loading={loading}
        user={user}
        handlePaidEnrollment={handlePaidEnrollment}
        handleFreeEnrollment={handleFreeEnrollment}
        enrolled={enrolled}
        setEnrolled={setEnrolled}
      />

      <div className="row px-3 mx-0 md:mx-20 pb-20">
        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 py-5 ">
          {/* Course Description */}
          <CourseDescription course={course} />
        </div>

        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 py-5">
          {course && course[0].lessons && (
            <SingleCourseLessons
              lessons={course.lessons}
              setPreview={setPreview}
              showModal={showModal}
              setShowModal={setShowModal}
              course={course}
            />
          )}
        </div>
      </div>
      <PreviewModal
        showModal={showModal}
        setShowModal={setShowModal}
        preview={preview}
        course={course}
      />
    </>
  )
}

export async function getServerSideProps({ query }) {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/course/${query.slug}`,
  )
  return {
    props: {
      course: [data],
    },
  }
}

export default SingleCourse
