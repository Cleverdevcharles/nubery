import React, { useState, useEffect, useContext } from 'react'
import { toast } from 'react-toastify'
import { getCategory, updateCategory } from '../../../../functions/category'
import CategoryForm from '../../../../components/forms/CategoryForm'
import { Context } from '../../../../context'
import { useRouter } from 'next/router'
import AdminRoute from '../../../../components/routes/AdminRoute'
import Sidenav from '../../../../components/dashboardLayout/Sidenav'


const EditCategory = () => {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [activePage, setActivePage] = useState('Create Category')

  const router = useRouter()
  const { slug } = router.query

  const {
    state: { user },
  } = useContext(Context)

  useEffect(() => {
    loadCategory()
  }, [slug])

  const loadCategory = () => {
    getCategory(slug).then((c) => {
      const cat = slug.replaceAll('-', ' ').split(' ')

      for (let i = 0; i < cat.length; i++) {
        cat[i] = cat[i][0].toUpperCase() + cat[i].substr(1)
      }

      setName(cat.join(' '))
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(name);
    setLoading(true)
    if (!name) {
      setLoading(false)
      toast.error(`Sub-category name is required.`)
      return
    }
    updateCategory(slug, { name }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false)
        setName('')
        toast.success(`"${res.data.name}" is updated`)
        router.push('/admin/category/create')
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
        Update Category
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

export default EditCategory
