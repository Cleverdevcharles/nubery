import React, { useState, useEffect, useContext } from 'react'
import { toast } from 'react-toastify'
import {
  createCategory,
  getCategories,
  removeCategory,
} from '../../../functions/category'
import Link from 'next/link'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import CategoryForm from '../../../components/forms/CategoryForm'
import LocalSearch from '../../../components/forms/LocalSearch'
import { Context } from '../../../context'
import { useRouter } from 'next/router'
import AdminRoute from '../../../components/routes/AdminRoute'
import Sidenav from '../../../components/dashboardLayout/Sidenav'

const CreateCategory = () => {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [activePage, setActivePage] = useState('Create Category')
 
  // step 1
  const [keyword, setKeyword] = useState('')
  const router = useRouter()

  
  const {
    state: { user },
  } = useContext(Context)
  
  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data))

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(name);
    setLoading(true)
    if (!name) {
      setLoading(false)
      toast.error(`Name of category is requried`)
      return
    }
    createCategory({ name }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false)
        setName('')
        toast.success(`"${res.data.name}" is created`)
        loadCategories()
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
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false)
          toast.error(`${res.data.name} deleted`)
          loadCategories()
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
        Create A New Category
      </div>
      <div className="flex-1 my-6 ">
        <div className="container" style={{ width: '800px' }}>
          <div className="row">
            <div>
              {loading ? (
                <h4 className="text-danger">Loading..</h4>
              ) : (
                <>
                  <CategoryForm
                    handleSubmit={handleSubmit}
                    name={name}
                    setName={setName}
                  />
                  <br />
                  {/* step 2 and step 3 */}
                  <LocalSearch keyword={keyword} setKeyword={setKeyword} />

                  {/* step 5 */}
                  {categories &&
                    categories.filter(searched(keyword)).map((c) => (
                      <div className="alert alert-secondary" key={c._id}>
                        {c.name}
                        <span
                          onClick={() => handleRemove(c.slug)}
                          className="btn btn-sm float-right"
                          style={{ fontSize: '20px' }}
                        >
                          <DeleteOutlined className="text-danger" />
                        </span>
                        <Link href={`/admin/category/edit/${c.slug}`}>
                          <span
                            className="btn btn-sm float-right"
                            style={{ fontSize: '20px' }}
                          >
                            <EditOutlined className="text-drak" />
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

export default CreateCategory
