import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import InstructorRoute from '../../../../components/routes/InstructorRoute'
import axios from 'axios'
import { Avatar, Tooltip, Button, Modal, List } from 'antd'
import {
  EditOutlined,
  CheckOutlined,
  UploadOutlined,
  QuestionOutlined,
  CloseOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons'
import ReactMarkdown from 'react-markdown'
import AddLessonForm from '../../../../components/forms/AddLessonForm'
import { toast } from 'react-toastify'
import Item from 'antd/lib/list/Item'
import Sidenav from '../../../../components/dashboardLayout/Sidenav'

const CourseView = () => {
  const [course, setCourse] = useState({})
  const [activePage, setActivePage] = useState('My Created Courses')

  // for lessons
  const [visible, setVisible] = useState(false)
  const [values, setValues] = useState({
    title: '',
    content: '',
    video: {},
  })
  const [uploading, setUploading] = useState(false)
  const [uploadButtonText, setUploadButtonText] = useState('Upload Video')
  const [progress, setProgress] = useState(0)
  const [preview, setPreview] = useState('')
  const [videoUrl, setVideoUrl] = useState('')

  // student count
  const [students, setStudents] = useState(0)

  const router = useRouter()
  const { slug } = router.query

  useEffect(() => {
    loadCourse()
  }, [slug])

  useEffect(() => {
    if (course) studentCount()
  }, [course])

  const loadCourse = async () => {
    const { data } = await axios.get(
      `/api/course/${slug}`,
    )

    setCourse(data)
  }

  const studentCount = async () => {
    const { data } = await axios.post(
      `/api/instructor/student-count`,
      {
        courseId: course._id,
      },
    )
    setStudents(data.length)
  }

  // FUNCTIONS FOR ADD LESSON
  const handleAddLesson = async (e) => {
    e.preventDefault()
    // console.log(values);
    if (!values.title && !values.content) {
      toast.error('Please fill out all fileds.')
      return
    }
    if (!values.title) {
      toast.error('Course title is required.')
      return
    }
    if (!values.content) {
      toast.error('Course content is required.')
      return
    }
    try {
      const { data } = await axios.post(
        `/api/course/lesson/${slug}/${course.instructor._id}`,
        values,
      )
      // console.log(data)
      setValues({ ...values, title: '', content: '', video: {} })
      setProgress(0)
      setUploadButtonText('Upload video')
      setVisible(false)
      setCourse(data)
      toast('Lesson added')
    } catch (err) {
      console.log(err)
      toast('Lesson add failed')
    }
  }

  const handleVideo = async (e) => {
    try {
      const file = e.target.files[0]
      setUploadButtonText(file.name)
      setUploading(true)

      const videoData = new FormData()
      videoData.append('video', file)

      // save progress bar and send video as form data to backend
      const { data } = await axios.post(
        `/api/course/video-upload/${course.instructor._id}`,
        videoData,
        {
          onUploadProgress: (e) => {
            setProgress(Math.round((100 * e.loaded) / e.total))
          },
        },
      )

      // once response is received
      setVideoUrl(data.Location)

      var videoFile = data.Location

      let media = new Audio(videoFile)
      media.onloadedmetadata = function () {
        media.duration
        // this would give duration of the video/audio file
        if (media.duration > 1200) {
          toast.error(`Video upload failed. 
          The video is ${(media.duration / 60).toFixed(2)} mintues long.
          Please upload a maximum of 20mintues video.
          `)
          setUploading(false)

          return
        }
        toast(
          `Video accepted with ${(media.duration / 60).toFixed(
            2,
          )} mintues long`,
        )
        setUploading(false)
      }

      setValues({ ...values, video: data })
    } catch (err) {
      console.log(err)
      setUploading(false)
      // toast('Video upload failed')
    }
  }

  const handleVideoRemove = async () => {
    try {
      setUploading(true)
      const { data } = await axios.post(
        `/api/course/video-remove/${course.instructor._id}`,
        values.video,
      )
      console.log(data)
      setValues({ ...values, video: {} })
      setUploading(false)
      setPreview('')
      setUploadButtonText('Upload another video')
    } catch (err) {
      console.log(err)
      setUploading(false)
      toast('Video remove failed')
    }
  }

  const handlePublish = async (e, courseId) => {
    try {
      let answer = window.confirm(
        'Once you publsih your course, it will be live in the marketplace for users to enroll',
      )
      if (!answer) return
      const { data } = await axios.put(
        `/api/course/publish/${courseId}`,
      )
      setCourse(data)
      toast('Congrats! Your course is live')
    } catch (err) {
      toast('Course publish failed. Try again')
    }
  }

  const handleUnpublish = async (e, courseId) => {
    try {
      let answer = window.confirm(
        'Once you unpublsih your course, it will no be available for users to enroll',
      )
      if (!answer) return
      const { data } = await axios.put(
        `/api/course/unpublish/${courseId}`,
      )
      setCourse(data)
      toast('Your course is unpublished')
    } catch (err) {
      toast('Course publish failed. Try again')
    }
  }

  // const videoEl = useRef(null);

  // const handleLoadedMetadata = () => {
  //   const video = videoEl.current;
  //   if (!video) return;

  // };

  return (
    <InstructorRoute>
      <div className="h-screen grid md:grid-cols-custom-sidenav-layout">
        <Sidenav activePage={activePage} setActivePage={setActivePage} />
        <div className="flex flex-col">
          <div className="text-xl font-bold text-gray-600 border-b-2 border-brightRedLight pt-6 pb-2 px-6">
            Course Details
          </div>
          <div className="flex-1 my-6 mx-5">
            <div className="container pt-3">
              {/* <video src={videoUrl} ref={videoEl} style={{display: "none"}} onLoadedMetadata={handleLoadedMetadata} /> */}
              {/* <pre>{JSON.stringify( course, null, 4)}</pre> */}
              {course && (
                <div className="container-fluid pt-1">
                  <div className="media pt-2">
                    {course.image && (
                      <Avatar
                        size={80}
                        src={
                          course.image ? course.image.Location : '/course.png'
                        }
                      />
                    )}

                    <div className="media-body pl-2">
                      <div className="row">
                        <div className="col">
                          <h5 className="mt-2 text-primary">{course.name}</h5>
                          <p style={{ marginTop: '-10px' }} className="py-3">
                            {course.lessons && course.lessons.length} Lessons
                          </p>
                          <p style={{ marginTop: '-15px', fontSize: '10px' }}>
                            Catgeory :{' '}
                            {course.category && course.category[0].name}
                            <br />
                            Sub-catgeory : {course.subs && course.subs[0].name}
                          </p>
                        </div>

                        <div className="d-flex pt-4">
                          <Tooltip title={`${students} Enrolled`}>
                            <UserSwitchOutlined className="h5 pointer text-info mr-4" />
                          </Tooltip>

                          <Tooltip title="Edit">
                            <EditOutlined
                              onClick={() =>
                                router.push(`/instructor/course/edit/${slug}`)
                              }
                              className="h5 pointer text-warning mr-4"
                            />
                          </Tooltip>

                          {course.lessons && course.lessons.length < 5 ? (
                            <Tooltip title="Min 5 lessons required to publish">
                              <QuestionOutlined className="h5 pointer text-danger" />
                            </Tooltip>
                          ) : course.published ? (
                            <Tooltip title="Unpublish">
                              <CloseOutlined
                                onClick={(e) => handleUnpublish(e, course._id)}
                                className="h5 pointer text-danger"
                              />
                            </Tooltip>
                          ) : (
                            <Tooltip title="Publish">
                              <CheckOutlined
                                onClick={(e) => handlePublish(e, course._id)}
                                className="h5 pointer text-success"
                              />
                            </Tooltip>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col">
                      <ReactMarkdown source={course.description} />
                    </div>
                  </div>
                  <div className="row mt-5">
                    <button
                      onClick={() => setVisible(true)}
                      className="col-md-6 offset-md-3 text-center
                text-white  focus:ring-4 
                focus:outline-none focus:ring-brightRedLight font-medium 
                rounded-lg text-sm  px-5 py-2.5 mr-1 text-center 
                items-end dark:bg-brightRed dark:hover:bg-brightRedLight 
                dark:focus:ring-brightRed
                "
                      shape="round"
                      icon={<UploadOutlined />}
                      size="large"
                    >
                      Add Lesson
                    </button>
                  </div>

                  <br />

                  <Modal
                    title="+ Add Lesson"
                    centered
                    visible={visible}
                    onCancel={() => setVisible(false)}
                    footer={null}
                  >
                    <AddLessonForm
                      values={values}
                      setValues={setValues}
                      handleAddLesson={handleAddLesson}
                      uploading={uploading}
                      uploadButtonText={uploadButtonText}
                      handleVideo={handleVideo}
                      preview={preview}
                      progress={progress}
                      handleVideoRemove={handleVideoRemove}
                    />
                  </Modal>

                  <div className="row pb-5">
                    <div className="col lesson-list">
                      <h4>{course.lessons && course.lessons.length} Lessons</h4>
                      <List
                        itemLayout="horizontal"
                        dataSource={course.lessons}
                        renderItem={(item, index) => (
                          <Item>
                            <Item.Meta
                              avatar={<Avatar>{index + 1}</Avatar>}
                              title={item.title}
                            ></Item.Meta>
                          </Item>
                        )}
                      ></List>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </InstructorRoute>
  )
}

export default CourseView
