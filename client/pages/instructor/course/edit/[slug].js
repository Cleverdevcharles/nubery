import { useState, useEffect } from 'react'
import axios from 'axios'
import InstructorRoute from '../../../../components/routes/InstructorRoute'
import UpdateCourseForm from '../../../../components/forms/UpdateCourseForm'
import Resizer from 'react-image-file-resizer'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { List, Avatar, Modal } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import UpdateLessonForm from '../../../../components/forms/UpdateLessonForm'
import { getCategories, getCategorySubs } from '../../../../functions/category'
import Sidenav from '../../../../components/dashboardLayout/Sidenav'

const { Item } = List

const CourseEdit = () => {
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
  const [subOptions, setSubOptions] = useState([])
  const [showSub, setShowSub] = useState(false)
  const [image, setImage] = useState({})
  const [preview, setPreview] = useState('')
  const [uploadButtonText, setUploadButtonText] = useState('Upload Image')
  const [activePage, setActivePage] = useState('My Created Courses')

  // state for lessons update
  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = useState({})
  const [uploadVideoButtonText, setUploadVideoButtonText] = useState(
    'Upload Video',
  )
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)

  // router
  const router = useRouter()
  const { slug } = router.query

  useEffect(() => {
    loadCourse()
  }, [slug])

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data }))

  const loadCourse = async () => {
    const { data } = await axios.get(
      `/api/course/${slug}`,
    )
    console.log(data)
    if (data) setValues(data)
    if (data && data.image) setImage(data.image)
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

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
    try {
      // console.log(values);
      const { data } = await axios.put(
        `/api/course/${slug}`,
        {
          ...values,
          image,
        },
      )
      toast('Course updated!')
      // router.push("/instructor");
    } catch (err) {
      toast(err.response.data)
    }
  }

  const handleDrag = (e, index) => {
    // console.log("ON DRAG => ", index);
    e.dataTransfer.setData('itemIndex', index)
  }

  const handleDrop = async (e, index) => {
    // console.log("ON DROP => ", index);

    const movingItemIndex = e.dataTransfer.getData('itemIndex')
    const targetItemIndex = index
    let allLessons = values.lessons

    let movingItem = allLessons[movingItemIndex] // clicked/dragged item to re-order
    allLessons.splice(movingItemIndex, 1) // remove 1 item from the given index
    allLessons.splice(targetItemIndex, 0, movingItem) // push item after target item index

    setValues({ ...values, lessons: [...allLessons] })
    // save the new lessons order in db
    const { data } = await axios.put(
      `/api/course/${slug}`,
      {
        ...values,
        image,
      },
    )
    // console.log("LESSONS REARRANGED RES => ", data);
    toast('Lessons rearranged successfully')
  }

  const handleDelete = async (index) => {
    const answer = window.confirm('Are you sure you want to delete?')
    if (!answer) return
    let allLessons = values.lessons
    const removed = allLessons.splice(index, 1)
    // console.log("removed", removed[0]._id);
    setValues({ ...values, lessons: allLessons })
    // send request to server
    const { data } = await axios.put(
      `/api/course/${slug}/${removed[0]._id}`,
    )
    // console.log('LESSON DELETED =>', data)
  }

  /**
   * lesson update functions
   */

  const handleVideo = async (e) => {
    // remove previous video
    if (current.video && current.video.Location) {
      const res = await axios.post(
        `/api/course/video-remove/${values.instructor._id}`,
        current.video,
      )
      // console.log('REMOVED ===>', res)
    }
    // upload
    const file = e.target.files[0]
    setUploadVideoButtonText(file.name)
    setUploading(true)
    // send video as form data
    const videoData = new FormData()
    videoData.append('video', file)
    videoData.append('courseId', values._id)
    // save progress bar and send video as form data to backend
    const { data } = await axios.post(
      `/api/course/video-upload/${values.instructor._id}`,
      videoData,
      {
        onUploadProgress: (e) =>
          setProgress(Math.round((100 * e.loaded) / e.total)),
      },
    )
    console.log(data)

    let media = new Audio(videoFile)
    media.onloadedmetadata = function () {
      media.duration
      // this would give duration of the video/audio file
      if (media.duration > 1200) {
        toast.error(`Video upload failed. 
          The video is ${(media.duration / 60).toFixed(2)} mintues long.
          Please upload a maximum of 20mintues video.
          `)
        setTimeout(() => {
          window.location.reload()
        }, 5500)
        setUploading(false)

        return
      }
      toast(
        `Video accepted with ${(media.duration / 60).toFixed(2)} mintues long`,
      )
      setUploading(false)
    }
    setCurrent({ ...current, video: data })
    setUploading(false)
  }

  const handleUpdateLesson = async (e) => {
    // console.log("handle update lesson");
    e.preventDefault()
    const { data } = await axios.put(
      `/api/course/lesson/${slug}/${current._id}`,
      current,
    )
    setUploadVideoButtonText('Upload Video')
    setVisible(false)
    // update ui
    if (data.ok) {
      let arr = values.lessons
      const index = arr.findIndex((el) => el._id === current._id)
      arr[index] = current
      setValues({ ...values, lessons: arr })
      toast('Lesson updated')
    }
  }

  const handleCategoryChange = (e) => {
    e.preventDefault()
    setValues({ ...values, subs: [], category: e.target.value })
    getCategorySubs(e.target.value).then((res) => {
      setSubOptions(res.data)
    })
    setShowSub(true)
  }

  return (
    <InstructorRoute>
      <div className="h-screen grid md:grid-cols-custom-sidenav-layout">
        <Sidenav activePage={activePage} setActivePage={setActivePage} />

        <div className="flex flex-col">
          <div className="text-xl font-bold text-gray-600 border-b-2 border-brightRedLight pt-6 pb-2 px-6">
            Update Course
          </div>
          <div className="flex-1 my-6 mx-5">
            <div className="row">
              <div
                className="pt-3 pb-3 col-xl-8 col-lg-12 col-md-12 col-sm-12"
                style={{ marginLeft: '-50px' }}
              >
                <UpdateCourseForm
                  handleSubmit={handleSubmit}
                  handleImageRemove={handleImageRemove}
                  handleImage={handleImage}
                  handleChange={handleChange}
                  values={values}
                  setValues={setValues}
                  preview={preview}
                  uploadButtonText={uploadButtonText}
                  handleCategoryChange={handleCategoryChange}
                  subOptions={subOptions}
                  showSub={showSub}
                  editPage={true}
                />
              </div>
              <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 pt-3 pb-3 my-5">
                <div className="row">
                  <div className="col lesson-list">
                    <h4>
                      {values && values.lessons && values.lessons.length}{' '}
                      Lessons
                    </h4>
                    <List
                      onDragOver={(e) => e.preventDefault()}
                      itemLayout="horizontal"
                      dataSource={values && values.lessons}
                      renderItem={(item, index) => (
                        <Item
                          draggable
                          onDragStart={(e) => handleDrag(e, index)}
                          onDrop={(e) => handleDrop(e, index)}
                        >
                          <Item.Meta
                            onClick={() => {
                              setVisible(true)
                              setCurrent(item)
                            }}
                            avatar={<Avatar>{index + 1}</Avatar>}
                            title={item.title}
                          ></Item.Meta>

                          <DeleteOutlined
                            onClick={() => handleDelete(index)}
                            className="text-danger float-right"
                          />
                        </Item>
                      )}
                    ></List>
                  </div>

                  <Modal
                    title="Update lesson"
                    centered
                    visible={visible}
                    onCancel={() => setVisible(false)}
                    footer={null}
                  >
                    <UpdateLessonForm
                      current={current}
                      setCurrent={setCurrent}
                      handleVideo={handleVideo}
                      handleUpdateLesson={handleUpdateLesson}
                      uploadVideoButtonText={uploadVideoButtonText}
                      progress={progress}
                      uploading={uploading}
                    />
                    {/* <pre>{JSON.stringify(current, null, 4)}</pre> */}
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </InstructorRoute>
  )
}

export default CourseEdit
