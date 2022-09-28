import axios from 'axios'

export const updateUser = async (authtoken) => {
  return await axios.post(
    `/api/update-user`,
    {},
    {
      headers: {
        authtoken,
      },
    },
  )
}

export const currentUser = async (authtoken) => {
  return await axios.post(
    `/api/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    },
  )
}

export const currentAdmin = async (authtoken) => {
  return await axios.post(
    `/api/current-admin`,
    {},
    {
      headers: {
        authtoken,
      },
    },
  )
}
