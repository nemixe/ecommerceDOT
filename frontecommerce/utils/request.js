import axios from 'axios'

const axioshelper = axios.create({
  baseURL: 'http://localhost:8000'
})

export const post = async (endpoint, data) => {
  return await axioshelper.post(endpoint, data, {
    headers: { "Content-Type": "application/json" }
  })
}

export const get = async (endpoint, jwt = null) => {
  const headers = jwt ? {
    headers: { Authorization: `Bearer ${jwt}` }
  } : null
  return await axioshelper.get(endpoint, headers)
}
