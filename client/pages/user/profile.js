import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import Sidenav from '../../components/dashboardLayout/Sidenav'
import { Context } from '../../context'
import Resizer from 'react-image-file-resizer'
import UserRoute from '../../components/routes/UserRoute'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { Badge, Avatar } from 'antd'
import axios from 'axios'

const Profile = () => {
  const [activePage, setActivePage] = useState('Profile')
  const [values, setValues] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    loading: false,
  })

  const [image, setImage] = useState({})
  const [preview, setPreview] = useState('')
  const [uploadButtonText, setUploadButtonText] = useState('Upload Image')
  const {
    state: { user },
  } = useContext(Context)
  // router
  const router = useRouter()
  const { slug } = router.query
  const {
    name,
    email,
    currentPassword,
    newPassword,
    confirmNewPassword,
    loading,
    uploading,
  } = values

  useEffect(() => {
    loadCurrentUser()
  }, [slug, user])

  const loadCurrentUser = () => {
    if (user) setValues(user)
    if (user && user.image) setImage(user.image.Location)
    if (user && user.image) setPreview(user.image.Location)
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
          `/api/upload-image`,
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

  const handleImageRemove = async () => {
    try {
      // console.log(values);
      setValues({ ...values, loading: true })
      const res = await axios.post(
        `/api/remove-image`,
        { image },
      )
      setImage({})
      setPreview('')
      // setUploadButtonText("Upload Image");
      setValues({ ...values, loading: false })
    } catch (err) {
      // console.log(err);
      setValues({ ...values, loading: false })
      // toast("Image upload failed. Try later.");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // console.log(values);
      setValues({ ...values, loading: true })

      const { data } = await axios.put(
        `/api/update-account`,
        {
          name,
          email,
          image,
        },
      )
      toast('Profile updated!')
      window.localStorage.removeItem('user')
      window.localStorage.setItem('user', JSON.stringify(data))
      setTimeout(() => {
        window.location.reload()
      }, 5500)
      setValues({ ...values, loading: false })

      // router.push("/instructor");
    } catch (err) {
      toast(err.response.data)
      setValues({ ...values, loading: false })
    }
  }

  return (
    <UserRoute>
      <div className="h-screen grid md:grid-cols-custom-sidenav-layout">
        <Sidenav activePage={activePage} setActivePage={setActivePage} />
        <div className="flex flex-col">
          <div className="text-xl font-bold text-gray-600 border-b-2 border-brightRedLight pt-6 pb-2 px-6">
            Profile
          </div>
          <div className="flex-1 my-6 mx-5">
            <div className="container mx-auto flex-1 flex flex-col items-center justify-center px-5">
              <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                <form onSubmit={handleSubmit}>
                  <h4 className="font-bold text-lg mb-4">Basic</h4>
                  <div className="mb-6">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-dark"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Full Name"
                      value={name}
                      onChange={handleChange}
                      className="text-dark border-1 border-orange-500 focus:bg-orange-100 pt-3 pb-3  text-sm rounded-lg focus:ring-brightRedLight focus:border-brightRedLight block w-full p-2.5   dark:text-white dark:focus:ring-brightRedLight dark:focus:border-brightRedLight"
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-dark"
                    >
                      Email
                    </label>
                    <div className="relative flex w-full flex-wrap items-stretch ">
                      <input
                        type="text"
                        id="email"
                        disabled
                        name="email"
                        placeholder="email address"
                        value={email}
                        className="text-dark border-1 border-orange-500 focus:bg-orange-100 mb-3  pt-3 pb-3   text-sm rounded-lg focus:ring-brightRedLight focus:border-brightRedLight block w-full p-2.5   dark:text-white dark:focus:ring-brightRedLight dark:focus:border-brightRedLight"
                      />
                    </div>
                  </div>
                  <div className="flex mt-8">
                    <div className="rounded-lg shadow-xl bg-gray-50 lg:w-full">
                      <div className="m-4">
                        <label className="inline-block mb-2 text-gray-500">
                          Upload Profile Image Image(jpg,png,svg,jpeg)
                        </label>
                        <div className="flex items-center justify-center w-full">
                          <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:">
                            <div className="flex flex-col items-center justify-center pt-7">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                Select a photo
                              </p>
                            </div>
                            <input
                              type="file"
                              name="image"
                              onChange={handleImage}
                              accept="image/*"
                              className="opacity-0"
                              hidden
                            />
                          </label>
                        </div>

                        <div
                          className="mt-1 text-sm text-dark"
                          id="user_avatar_help"
                        >
                          A profile picture is useful to confirm your are logged
                          into your account
                        </div>
                      </div>
                      {preview && (
                        <Badge
                          count="X"
                          onClick={handleImageRemove}
                          className="pointer"
                        >
                          <Avatar
                            style={{ width: 200, height: 200 }}
                            src={preview}
                          />
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <button
                      type="submit"
                      disabled={uploading ? true : false}
                      className="text-white bg-brightRed mt-3 hover:bg-brightRedLight mb-6 focus:ring-4 focus:outline-none focus:ring-brightRedLight font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mr-1 text-center items-end dark:bg-brightRed dark:hover:bg-brightRedLight dark:focus:ring-brightRed"
                    >
                      {loading ? 'Updating...' : 'Update Profile'}
                    </button>
                    <a
                      href="/change-password"
                      className="text-white bg-brightRed hover:bg-brightRedLight mb-6 focus:ring-4 focus:outline-none focus:ring-brightRedLight font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mr-1 text-center items-end dark:bg-brightRed dark:hover:bg-brightRedLight dark:focus:ring-brightRed"
                    >
                      Change Password
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserRoute>
  )
}

export default Profile
