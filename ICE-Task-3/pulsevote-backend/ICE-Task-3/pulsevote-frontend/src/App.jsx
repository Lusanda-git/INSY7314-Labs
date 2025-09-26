import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:5000/test')
      .then(res => setData(res.data.message))
      .catch(err => console.error(err))
  }, [])

  return (
    <>
      <h2>Welcome to PulseVote</h2>
      <p>{data}</p>
    </>
  )
}

export default App
