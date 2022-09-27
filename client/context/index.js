import { useReducer, createContext, useEffect } from 'react'
import axios from 'axios'
import { useRouter, userRouter } from 'next/router'

let cartState = []

// load cart items from local storage
if (typeof window !== 'undefined') {
  if (localStorage.getItem('cart')) {
    cartState = JSON.parse(localStorage.getItem('cart'))
  } else {
    cartState = []
  }
}
// initial state
let initialState = {
  user: null,
  cart: cartState,
  text: '',
}

// create context
const Context = createContext()

// root reducer
const rootReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload }
    case 'LOGOUT':
      return { ...state, user: null }
    case 'ADD_TO_CART':
      return { ...state, cart: action.payload }
    case 'SEARCH_QUERY':
      return { ...state, text: action.payload }
    default:
      return state
  }
}

// context provider
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState)

  // router
  const router = useRouter()

  useEffect(() => {
    dispatch({
      type: 'LOGIN',
      payload: JSON.parse(window.localStorage.getItem('user')),
    })
  }, [])

  axios.interceptors.response.use(
    function (response) {
      // any status code that lie within the range of 2XX cause this function
      // to trigger
      return response
    },
    function (error) {
      // any status codes that falls outside the range of 2xx cause this function
      // to trigger
      let res = error.response
      if (
        res &&
        res.status === 401 &&
        res.config &&
        !res.config.__isRetryRequest
      ) {
        return new Promise((resolve, reject) => {
          axios
            .get(`${process.env.NEXT_PUBLIC_API}/logout`)
            .then((data) => {
              console.log('/401 error > logout', res)
              dispatch({ type: 'LOGOUT' })
              window.localStorage.removeItem('user')
              router.push('/signin')
            })
            .catch((err) => {
              console.log('AXIOS INTERCEPTORS ERR', err)
              reject(error)
            })
        })
      }
      return Promise.reject(error)
    },
  )

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/csrf-token`,
      )
      axios.defaults.headers['X-CSRF-Token'] = data.getCsrfToken
    }
    getCsrfToken()
  }, [])

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}

export { Context, Provider }
