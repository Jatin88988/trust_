import React, { useState } from 'react'
import { Avatar } from '@material-ui/core';
import './css/post.css'
import { Button } from '@mui/material';
import { ArrowDownwardOutlined, ArrowUpwardOutlined } from '@material-ui/icons';
import CloseIcon from "@material-ui/icons/Close";
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import ReactTimeAgo from 'react-time-ago'
import axios from 'axios';
import ReactHtmlParser from 'html-react-parser'
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../feature/userSlice";

function LastSeen({date}) {
    return(
        <div>
            <ReactTimeAgo date={date} locale="en-US" timeStyle="round" />
        </div>
    )
}
function Post({post}) {
    const[isModalopen, setIsModalopen]=useState(false);
    const [answer, setAnswer]=useState(" ")
    const Close=(<CloseIcon />);
    const user= useSelector(selectUser);
    const handleQuill=(value)=>{
        setAnswer(value)
    }
    console.log(answer)
    const handleSubmit=async()=>{
        if(post?._id && answer!==" "){
            const config={
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const body={
                answer: answer,
                questionId: post?._id,
                user: user,
            }
            await axios.post('/api/answers', body, config).then((res)=>{
                console.log(res.data)
                alert('Answer added successfully')
                setIsModalopen(false);
                window.location.href='/'
            }).catch((e)=>{
                console.log(e)
            })
        }
    }
  return (
    <div className='post'>
        <div className='post__info'>
            <Avatar src={post?.user?.photo} />
            <h4>{post?.user?.userName}</h4>
            <small><LastSeen date={post?.createdAt} /></small>
        </div>
        <div className='post__body'>
            <div className='post__question'>
            <p>{post?.questionName}</p>
            <button onClick={()=> setIsModalopen(true)} className='post__btnAnswer'>Answer</button>
            <Modal
            open={isModalopen}
            closeIcon={Close}
            onClose={()=> setIsModalopen(false)}
            closeOnEsc
            center
            closeOnOverlayClick={false}
            style={{
              overlay:{
                height:"auto",
              }
            }}>
                <div className='modal__question'>
                    <h1>{post?.questionName}</h1>
                    <p>asked by {" "}<span className='name'>{post?.user?.userName}</span>{" "}on{" "}<span className='name'>{new Date(post?.createdAt).toLocaleString()}</span>
                    </p>
                </div>
                <div className="modal__answer">
                    <ReactQuill value={answer} onChange={handleQuill} placeholder="Answer" />
                </div>
                <div className='modal__buttons'>
                <button className='cancel' onClick={()=> setIsModalopen(false)}>
                  Cancel
                </button>
                <button onClick={handleSubmit} type="submit" className='add' >
                  Add answer
                </button>
                </div>
            </Modal>
            </div>
            {
               post.questionUrl !=="" && <img src={post.questionUrl} alt ='url' />
            }
        </div>
        {/* <div className='post__footer'>
            <div className='post__footerAction'>
                <ArrowUpwardOutlined />
                <ArrowDownwardOutlined />
            </div>
        </div> */}
            <p style={{
                color: "rgba(0,0,0,0.50)",
                fontSize: "20px",
                fontWeight:"bold",
                margin:"10px 0px"
            }}>{post?.allAnswers.length} Answers(s)</p>
            <div style={{
                margin: "5px 0px 0px 0px",
                padding:"5px 0px 0px 20px",
                borderTop:"1px solid gray"
            }} className='post_answer'>
                
                    {
                        post?.allAnswers.map((_a)=>(
                            <>
                            <div style={{
                    display:"flex",
                    flexDirection:"column",
                    width:"95%",
                    padding:"10px 5px",
                    borderTop:"1px solid gray"
                }} className='post-answer-container'>
                            <div style={{
                        display:"flex",
                        alignItems:"center",
                        marginBottom:"10px",
                        fontSize:"25px",
                        fontWeight:"600",
                        color:"#888",
                    }} className='post-answered'>
                        <Avatar src={_a?.user?.photo} />
                        <div style={{
                            margin:"0px 10px",
                        }} className='post-info'>
                            <p>
                            {_a?.user?.userName}
                            </p><span><LastSeen date={_a?.createdAt}/>
                            </span>
                    </div>
                </div>
                <div className='post-answer'>{ReactHtmlParser(_a?.answer)}</div>
                </div></>
                        ))
                    }
                    
           
        </div>
    </div>
  )
}

export default Post