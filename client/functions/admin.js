import axios from 'axios'

export const getOrders = async (authtoken) =>
  await axios.get(`${process.env.NEXT_PUBLIC_API}/admin/orders`, {
    headers: {
      authtoken,
    },
  })

export const changeStatus = async (orderId, orderStatus, authtoken) =>
  await axios.put(
    `${process.env.NEXT_PUBLIC_API}/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: {
        authtoken,
      },
    },
  )
