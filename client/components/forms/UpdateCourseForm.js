import { Select, Button, Avatar, Badge } from 'antd'

const { Option } = Select

const UpdateCourseForm = ({
  handleSubmit,
  handleImage,
  handleChange,
  values,
  setValues,
  preview,
  uploadButtonText,
  handleCategoryChange,
  subOptions,
  showSub,
  handleImageRemove = (f) => f,
  editPage = true,
}) => {
  const children = []
  for (let i = 5; i <= 100.99; i++) {
    children.push(<Option key={i.toFixed(2)}>${i.toFixed(2)}</Option>)
  }
  const {
    name,
    description,
    paid,
    categories,
    category,
    subs,
    image,
    courseAchievement,
    courseLevel,
    downloadableResourses,
    language,
    loading,
    uploading,
  } = values

  return (
    <div className="container" style={{ width: '800px' }}>
      {values && (
        <form onSubmit={handleSubmit}>
          <div className="form-group my-5">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group my-5">
            <textarea
              name="description"
              cols="7"
              rows="7"
              value={description}
              placeholder="Describe your course..."
              className="form-control"
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-group my-5">
            <textarea
              name="courseAchievement"
              cols="7"
              rows="7"
              value={courseAchievement}
              placeholder="What will your student achievement in this course..."
              className="form-control"
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="row my-5">
            <label>Course Price Option</label>
            <div className={paid == true ? 'col-4' : 'col-12'}>
              <div className="form-group">
                <Select
                  style={{ width: '100%' }}
                  size="large"
                  value={paid}
                  onChange={(v) => setValues({ ...values, paid: v, price: 0 })}
                >
                  <Option value={true}>Paid</Option>
                  <Option value={false}>Free</Option>
                </Select>
              </div>
            </div>

            {paid && (
              <div className="col-4" style={{ marginTop: '-20px' }}>
                <label>Select Price</label>
                <Select
                  style={{ width: '100%' }}
                  defaultValue="$0"
                  onChange={(v) => setValues({ ...values, price: v })}
                  tokenSeparators={[,]}
                  size="large"
                >
                  {children}
                </Select>
              </div>
            )}

            {paid && (
              <div className="col-4" style={{ marginTop: '-20px' }}>
                <label>Select Old Price (Optional)</label>
                <Select
                  style={{ width: '100%' }}
                  defaultValue="$0"
                  onChange={(v) => setValues({ ...values, oldPrice: v })}
                  tokenSeparators={[,]}
                  size="large"
                >
                  {children}
                </Select>
              </div>
            )}
          </div>

          <label>Category</label>
          <div className="form-group">
            <select
              name="category"
              className="form-control"
              onChange={handleCategoryChange}
            >
              <option>Please select</option>
              {categories &&
                categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          {showSub && (
            <div className="mt-5">
              <label>Sub Categories</label>
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select"
                value={subs}
                onChange={(value) => setValues({ ...values, subs: value })}
              >
                {subOptions.length &&
                  subOptions.map((s) => (
                    <Option key={s._id} value={s._id}>
                      {s.name}
                    </Option>
                  ))}
              </Select>
            </div>
          )}
          <label className="mt-5">Communication Language</label>
          <div className="form-group">
            <input
              type="text"
              name="language"
              className="form-control"
              placeholder="What communication language are you using for this course?"
              value={language}
              onChange={handleChange}
            />
          </div>

          <label className="mt-5">Course Level</label>
          <div className="form-group">
            <input
              type="text"
              name="courseLevel"
              className="form-control"
              placeholder="Beginner, Advance or Form Beginner to Advance?"
              value={courseLevel}
              onChange={handleChange}
            />
          </div>

          <label className="mt-5">Downloadable Resourse (Optional)</label>
          <div className="form-group mb-5">
            <input
              type="text"
              name="downloadableResourses"
              className="form-control"
              placeholder="Provide a zip link for course download.."
              value={downloadableResourses}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="col">
              <div className="form-group">
                <label className="btn btn-outline-secondary btn-block text-left">
                  {uploadButtonText}
                  <input
                    type="file"
                    name="image"
                    onChange={handleImage}
                    accept="image/*"
                    hidden
                  />
                </label>
              </div>
            </div>

            {preview && (
              <Badge count="X" onClick={handleImageRemove} className="pointer m-3 border">
                <Avatar width={500} src={preview} />
              </Badge>
            )}

            {editPage && image && <Avatar width={500} src={image.Location} />}
          </div>

          <div className="row my-5">
            <div className="col">
              <button
                onClick={handleSubmit}
                disabled={loading || uploading}
                className="text-white bg-brightRed 
                hover:bg-brightRedLight focus:ring-4 
                focus:outline-none focus:ring-brightRedLight font-medium 
                rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mr-1 text-center 
                items-end dark:bg-brightRed dark:hover:bg-brightRedLight 
                dark:focus:ring-brightRed"
                loading={values.loading}
                shape="round"
              >
                {loading ? 'Saving...' : 'Save & Continue'}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

export default UpdateCourseForm
