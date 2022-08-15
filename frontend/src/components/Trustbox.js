import { Avatar } from '@material-ui/core'
import React from 'react'
import './css/trustbox.css'
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../feature/userSlice";

function Trustbox() {
  const user = useSelector(selectUser);
  return (
    <div className='trustbox'>
        <div className='trustbox_info'>
            <Avatar src={user?.photo}/>
        </div>
        <div className='trustbox_trust'>
            <h5>What is your question?</h5>
        </div>
    </div>
  )
}

export default Trustbox