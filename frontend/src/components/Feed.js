import React, { useEffect, useState } from 'react'
import Trustbox from './Trustbox'
import './css/feed.css'
import Post from './Post'
import axios from 'axios'

function Feed() {
  const [posts, setPosts] = useState([])
  useEffect(()=>{
    axios.get('/api/questions').then((res)=>{
      console.log(res.data.reverse())
      setPosts(res.data)
    }).catch((e)=>{
      console.log(e)
    })
  },[])
  return (
    <div className='feed'>
        <Trustbox />
        {
          posts.map((post, index)=>(<Post key={index} post = {post} />))
        }
        {/* <Post /> */}
    </div>
  )
}

export default Feed