import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import InstructorRoute from '../../../components/routes/InstructorRoute'
import CourseCreateForm from '../../../components/forms/CourseCreateForm'
import Resizer from 'react-image-file-resizer'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { Context } from '../../../context'
import LocalSearch from '../../../components/forms/LocalSearch'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { createSub, getSub, removeSub, getSubs } from '../../../functions/sub'
import { getCategories } from '../../../functions/category'
import CategoryForm from '../../../components/forms/CategoryForm'
import Link from 'next/link'
import AdminRoute from '../../../components/routes/AdminRoute'
import Sidenav from '../../../components/dashboardLayout/Sidenav'

const CreateSub = () => {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('')
  const [subs, setSubs] = useState([])
  const [activePage, setActivePage] = useState('Create Subcategory')

  // step 1
  const [keyword, setKeyword] = useState('')


  const {
    state: { user },
  } = useContext(Context)
  
  useEffect(() => {
    loadCategories()
    loadSubs()
  }, [])

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data))

  const loadSubs = () => getSubs().then((s) => setSubs(s.data))

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(name);
    setLoading(true)
    if (!category) {
      toast(`Please select parent category.`)
      setLoading(false)
      return
    }
    if (!name) {
      toast(`Sub category name is requried.`)
      setLoading(false)
      return
    }
    createSub({ name, parent: category }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false)
        setName('')
        toast.success(`"${res.data.name}" is created`)
        loadSubs()
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        if (err.response.status === 400) toast.error(err.response.data)
      })
  }

  const handleRemove = async (slug) => {
    // let answer = window.confirm("Delete?");
    // console.log(answer, slug);
    if (window.confirm('Delete?')) {
      setLoading(true)
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false)
          toast.error(`${res.data.name} deleted`)
          loadSubs()
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false)
            toast.error(err.response.data)
          }
        })
    }
  }

  // step 4
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)

  return (
    <AdminRoute>
    <div className="h-screen grid md:grid-cols-custom-sidenav-layout">
        <Sidenav activePage={activePage} setActivePage={setActivePage} />
          
    <div className="flex flex-col">
      <div className="text-xl font-bold text-gray-600 border-b-2 border-brightRedLight pt-6 pb-2 px-6">
        Create A New Sub-Category
      </div>
      <div className="flex-1 my-6 ">
        <div className="container" style={{ width: '800px' }}>
          <div className="row">
            <div className="col">
              {loading ? (
                <h4 className="text-danger">Loading..</h4>
              ) : (
                <>
                  <label>Parent category</label>
                  <div className="form-group">
                    <select
                      name="category"
                      className="form-control"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option>Please select</option>
                      {categories.length > 0 &&
                        categories.map((c) => (
                          <option key={c._id} value={c._id}>
                            {c.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <br />
                  <CategoryForm
                    handleSubmit={handleSubmit}
                    name={name}
                    setName={setName}
                  />
                  <br />
                  {/* step 2 and step 3 */}
                  <LocalSearch keyword={keyword} setKeyword={setKeyword} />

                  {/* step 5 */}
                  {subs.filter(searched(keyword)).map((s) => (
                    <div className="alert alert-secondary" key={s._id}>
                      {s.name}
                      <span
                        onClick={() => handleRemove(s.slug)}
                        className="btn btn-sm float-right"
                        style={{ fontSize: '20px' }}
                      >
                        <DeleteOutlined className="text-danger" />
                      </span>
                      <Link href={`/admin/sub/edit/${s.slug}`}>
                        <span
                          className="btn btn-sm float-right"
                          style={{ fontSize: '20px' }}
                        >
                          <EditOutlined className="text-dark" />
                        </span>
                      </Link>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
        </div>
        </AdminRoute>
  )
}

export default CreateSub
