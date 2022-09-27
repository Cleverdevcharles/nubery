import React, { useContext, useState } from 'react'
import { Context } from '../../context'
import { useRouter } from 'next/router'

const Search = () => {
  const { state, dispatch } = useContext(Context)
  const [search, setSearch] = useState('')

  const text = search
  const router = useRouter()

  const handleChange = (e) => {
    setSearch(e.target.value)
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: text },
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    router.push(`/courses?search=${text}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Search Field  */}
      <div className="form-searchbox">
        <span className="icon" onClick={handleSubmit}>
          <img src="/images/svg-icon/search.svg" alt="" />
        </span>

        <input
          onChange={handleChange}
          type="search"
          value={text}
          placeholder="What do you want to learn?"
        />
      </div>
    </form>
  )
}

export default Search
