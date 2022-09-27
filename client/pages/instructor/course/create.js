import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import InstructorRoute from '../../../components/routes/InstructorRoute'
import CourseCreateForm from '../../../components/forms/CourseCreateForm'
import Resizer from 'react-image-file-resizer'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { Context } from '../../../context'
import { getCategories, getCategorySubs } from '../../../functions/category'
import Sidenav from '../../../components/dashboardLayout/Sidenav'

const CourseCreate = () => {
  // state
  const [values, setValues] = useState({
    name: '',
    description: '',
    courseAchievement: '',
    language: '',
    price: '',
    oldPrice: '',
    courseLevel: '',
    downloadableResourses: '',
    uploading: false,
    paid: true,
    categories: [],
    category: '',
    subs: [],
    loading: false,
  })
  const [image, setImage] = useState({})
  const [preview, setPreview] = useState('')
  const [uploadButtonText, setUploadButtonText] = useState('Upload Image')
  const [subOptions, setSubOptions] = useState([])
  const [showSub, setShowSub] = useState(false)
  const [activePage, setActivePage] = useState('Create Course')

  // router
  const router = useRouter()
  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = () => {
    getCategories().then((c) => {
      setValues({ ...values, categories: c.data })
    })
  }
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const {
    state: { user },
    dispatch,
  } = useContext(Context)

  const handleImage = (e) => {
    let file = e.target.files[0]
    setPreview(window.URL.createObjectURL(file))
    setUploadButtonText(file.name)
    setValues({ ...values, loading: true })
    // resize
    Resizer.imageFileResizer(file, 720, 500, 'JPEG', 100, 0, async (uri) => {
      try {
        let { data } = await axios.post(
          `/api/course/upload-image`,
          {
            image: uri,
          },
        )
        console.log('IMAGE UPLOADED', data)
        // set image in the state
        setImage(data)
        setValues({ ...values, loading: false })
      } catch (err) {
        console.log(err)
        setValues({ ...values, loading: false })
        toast('Image upload failed. Try later.')
      }
    })
  }

  const handleCategoryChange = (e) => {
    e.preventDefault()
    setValues({ ...values, subs: [], category: e.target.value })
    getCategorySubs(e.target.value).then((res) => {
      setSubOptions(res.data)
    })
    setShowSub(true)
  }

  const handleImageRemove = async () => {
    try {
      // console.log(values);
      setValues({ ...values, loading: true })
      const res = await axios.post(
        `/api/course/remove-image`,
        { image },
      )
      setImage({})
      setPreview('')
      setUploadButtonText('Upload Image')
      setValues({ ...values, loading: false })
    } catch (err) {
      console.log(err)
      setValues({ ...values, loading: false })
      toast('Removing Image failed. Try later.')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!values.name) {
      toast.error('Course title is required!!!')
      return
    }
    if (!values.description) {
      toast.error('Course description is required!!!')
      return
    }
    if (!values.courseAchievement) {
      toast.error('Course achievement is required!!!')
      return
    }
    if (values.paid && !values.price) {
      toast.error('Course price is required!!!')
      return
    }
    if (!values.language) {
      toast.error('Course communication language is required!!!')
      return
    }

    if (!values.courseLevel) {
      toast.error('Course level is required!!!')
      return
    }
    if (!values.category) {
      toast.error('Course category is required!!!')
      return
    }

    try {
      // console.log(values);
      const { data } = await axios.post(
        `/api/course`,
        {
          ...values,
          image,
        },
      )
      toast('Great! Now you can start adding lessons')
      router.push('/instructor/courses')
    } catch (err) {
      toast(err.response.data)
    }
  }

  return (
    <InstructorRoute>
      <div className="h-screen grid md:grid-cols-custom-sidenav-layout">
        <Sidenav activePage={activePage} setActivePage={setActivePage} />
        <div className="flex flex-col">
          <div className="text-xl font-bold text-gray-600 border-b-2 border-brightRedLight pt-6 pb-2 px-6">
            Create New Course
          </div>
          <div className="flex-1 my-6 mx-5">
            <CourseCreateForm
              handleSubmit={handleSubmit}
              handleImage={handleImage}
              handleChange={handleChange}
              values={values}
              setValues={setValues}
              preview={preview}
              uploadButtonText={uploadButtonText}
              handleImageRemove={handleImageRemove}
              handleCategoryChange={handleCategoryChange}
              subOptions={subOptions}
              showSub={showSub}
            />
          </div>
        </div>
      </div>
    </InstructorRoute>
  )
}

export default CourseCreate
