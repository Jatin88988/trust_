import React, { useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { Search } from '@material-ui/icons';
import { Button } from '@mui/material';
import "./css/theader.css";
import { Avatar, Input } from '@material-ui/core';
import CloseIcon from "@material-ui/icons/Close";
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { auth } from "../firebase";
import axios from 'axios'
import { signOut } from 'firebase/auth';
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../feature/userSlice";

function Trustheader() {

  const[isModalopen, setIsModalopen]=useState(false);
  const[inputUrl, setInputUrl]=useState("");
  const [question, setQuestion]= useState("");
  const Close=(<CloseIcon />);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleSubmit=async()=>{
    if (question !== ""){

      const config={
        headers: {
          "Content-Type":"application/json"
        }
      }


      const body={
        questionName: question,
        questionUrl: inputUrl,
        user: user
      }
      await axios.post('/api/questions', body, config).then((res)=>{
        console.log(res.data);
        alert(res.data.message);
        window.location.href="/";
      }).catch((e)=>{
        console.log(e)
        alert('Error in adding question')
      });
    }
  }

  const handleLogout =()=>{
    if(window.confirm('Are you sure?')) {
      signOut(auth)
      .then(()=>{
        dispatch(logout())
        console.log("Logged out")
      })
      .catch(()=>{
        console.log("Error in logging out")
      });
    }
  }
  return (
    <div className="tHeader">
      <div className="tHeader-content">
        <div className="tHeader_logo">
          <img src='' alt=''/>
          </div>
            <div classname='tHeader_icon'><HomeIcon /></div>
          {/* <div className='tHeader_input'>
            <Search/>
            <input text="text" placeholder='Search' />
          </div> */}
          <div className='tHeader_Rem'>
            <span onClick={handleLogout}>
              <Avatar src={user?.photo} />
              </span>
            
          </div>
          <div>
            <Button onClick={()=> setIsModalopen(true)} >Add Question</Button>
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
            }}
            >
              <div className="modal__title">
              <h5>Add Question</h5>
              <h5>Share Link</h5>
            </div>
              <div className='modal__info'>
                <Avatar src={user?.photo} className='avatar'/>
              </div>
              <div className='modal__Field'>
                <Input 
                  value = {question}
                  onChange ={(e) => setQuestion(e.target.value)}
                  type="text" placeholder="Question"/>
                <div style={
                  {
                    display:"flex",
                    flexDirection:"column"
                  }
                }>
                  <input 
                  type="text"
                  value={inputUrl}
                  onChange={(e)=> setInputUrl(e.target.value)}
                  style={{
                    margin:"5px 0px",
                    border:"1px solid gray",
                    padding:"10px",
                    outline:"1px solid black",
                  }}
                  placeholder='Link for the picture (OPTIONAL)' />
                  {
                    inputUrl !== "" && <img style={{
                      height:"40 vh",
                      objectFit:"contain",
                    }} src={inputUrl} alt='displayimage' />
                  }
                </div>
              </div>
              <div className='modal__buttons'>
                <button className='cancel' onClick={()=> setIsModalopen(false)}>
                  Cancel
                </button>
                <button onClick={handleSubmit} type="submit" className='add' >
                  Submit
                </button>
              </div>
            </Modal>
          </div>
        
      </div>
    </div>
  )
}

export default Trustheader