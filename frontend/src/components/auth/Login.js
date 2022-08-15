import React from 'react'
import './Login.css'
import {signInWithPopup} from 'firebase/auth'
import {auth, provider} from '../../firebase'
import { FormatColorTextTwoTone } from '@material-ui/icons'

function Login() {

    const handleSubmit=async()=>{
        await signInWithPopup(auth, provider).then((result)=>{
            console.log(result);
        }).catch((error)=>{
            console.log(error);
        })
    }
  return (<div className='login-container'>
    <div className='login-content'>
        <img src='https://img.freepik.com/premium-vector/psychologic-therapy-session-concept-with-human-head-silhouette-helping-hand-unravels-tangle-messy-thoughts-with-mental-disorder-anxiety-confusion-mind-stress_148087-413.jpg?w=2000' alt='logo' />
        <div>
            <h5>trustISE</h5>
        </div>
        <button onClick={handleSubmit} className='btn-login'>Login</button>
    </div>

    {/* <footer className='foot'>Contact us:</footer>
    <footer className='foot'>Email id: jatinkumarsingh97@gmail.com, ranahimanshu6020@gmail.com</footer> */}
  </div>
  );
}

export default Login;