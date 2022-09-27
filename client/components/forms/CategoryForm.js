import React from 'react'

const CategoryForm = ({ handleSubmit, name, setName }) => (
  <form onSubmit={handleSubmit}>
    <label>Name</label>
    <div className="form-group">
      <input
        type="text"
        style={{ width: '100%' }}
        className="form-control"
        onChange={(e) => setName(e.target.value)}
        value={name}
        autoFocus
      />
      <br />
      <button
        className="text-white bg-brightRed 
       hover:bg-brightRedLight focus:ring-4 
       focus:outline-none focus:ring-brightRedLight font-medium 
       rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mr-1 text-center 
       items-end dark:bg-brightRed dark:hover:bg-brightRedLight 
       dark:focus:ring-brightRed"
      >
        Save
      </button>
    </div>
  </form>
)

export default CategoryForm
