import axios from 'axios'

export const createCourse = async (course, authtoken) =>
  await axios.post(`/api/course`, course, {
    headers: {
      authtoken,
    },
  })

export const getCoursesByCount = async (count) =>
  await axios.get(`/api/courses/${count}`)

export const removeCourse = async (slug, authtoken) =>
  await axios.delete(`/api/course/${slug}`, {
    headers: {
      authtoken,
    },
  })

export const getCourse = async (slug) => await axios.get(`/api/course/${slug}`)

export const updateCourse = async (slug, course, authtoken) =>
  await axios.put(`/api/course/${slug}`, course, {
    headers: {
      authtoken,
    },
  })

export const getCourses = async (sort, order, page) =>
  await axios.post(`/api/courses`, {
    sort,
    order,
    page,
  })

export const getCoursesCount = async () => await axios.get(`/api/courses/total`)

export const courseStar = async (courseId, star, authtoken) =>
  await axios.put(
    `/api/course/star/${courseId}`,
    { star },
    {
      headers: {
        authtoken,
      },
    },
  )

export const getRelated = async (courseId) =>
  await axios.get(`/api/course/related/${courseId}`)

export const fetchCoursesByFilter = async (arg) =>
  await axios.post(`/api/search/filters`, arg)
