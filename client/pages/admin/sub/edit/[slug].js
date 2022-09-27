import React, { useState, useEffect, useContext } from 'react'
import { toast } from 'react-toastify'
import { getCategories } from '../../../../functions/category'
import { updateSub, getSub } from '../../../../functions/sub'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import CategoryForm from '../../../../components/forms/CategoryForm'
import { Context } from '../../../../context'
import { useRouter } from 'next/router'
import AdminRoute from '../../../../components/routes/AdminRoute'
import Sidenav from '../../../../components/dashboardLayout/Sidenav'

const EditSub = () => {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [parent, setParent] = useState('')
  const [activePage, setActivePage] = useState('Create Subcategory')

  const router = useRouter()
  const { slug } = router.query

  const {
    state: { user },
  } = useContext(Context)

  useEffect(() => {
    loadCategories()
  }, [])
  useEffect(() => {
    loadSub()
  }, [slug])
  useEffect(() => {
    loadCategories()
  }, [slug])

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data))

  const loadSub = () =>
    getSub(slug).then((s) => {
      const sub = slug.replaceAll('-', ' ').split(' ')

      for (let i = 0; i < sub.length; i++) {
        sub[i] = sub[i][0].toUpperCase() + sub[i].substr(1)
      }

      setName(sub.join(' '))
      setParent(s.data.parent)
    })

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    // console.log(name);
    if (!parent) {
      setLoading(false)
      toast.error(`Please Select parent category.`)
      return
    }
    if (!name) {
      setLoading(false)
      toast.error(`Sub-category name is required.`)
      return
    }
    updateSub(slug, { name, parent }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false)
        setName('')
        toast.success(`"${res.data.name}" is updated`)
        router.push('/admin/sub/create')
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        toast(err.response.data)
      })
  }

  return (
    <AdminRoute>
      <div className="h-screen grid md:grid-cols-custom-sidenav-layout">
    <Sidenav activePage={activePage} setActivePage={setActivePage} />

    <div className="flex flex-col">
      <div className="text-xl font-bold text-gray-600 border-b-2 border-brightRedLight pt-6 pb-2 px-6">
        Update Sub-Category
      </div>
      <div className="flex-1 my-6 ">
        <div
          className="container"
          style={{ width: '800px', height: '50vh', marginTop: '100px' }}
        >
          <div className="row">
            <div className="col">
              {loading ? (
                <center className="text-danger" style={{ fontSize: '20px' }}>
                  Loading..
                </center>
              ) : (
                <>
                  <label>Parent Category</label>
                  <div className="form-group">
                    <select
                      name="category"
                      className="form-control"
                      onChange={(e) => setParent(e.target.value)}
                    >
                      <option>Please select</option>
                      {categories.length > 0 &&
                        categories.map((c) => (
                          <option
                            key={c._id}
                            value={c._id}
                            selected={c._id === parent}
                          >
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
                    editPage={true}
                  />
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

export default EditSub
