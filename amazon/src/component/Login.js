import React, { useState,useEffect } from 'react'
import '../Styles/Login.css'
import {Link,useHistory} from 'react-router-dom'
import {auth} from '../firebase/firebase'
const Login = () => {
    const history=useHistory();
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const signIn=e=>{
        e.preventDefault();
        //firebase login
        auth.signInWithEmailAndPassword(email,password).then((auth)=>{
            console.log(auth)
            history.push('/')
        }).catch(err=>{
            alert(err.message)
        })
    }
    const register=e=>{
        e.preventDefault();
        //firabase register
        auth.createUserWithEmailAndPassword(email,password).then(
            (auth)=>{
                //successfull creation 
                if(auth){
                    history.push('/');
                }

            }
        ).catch(err=>alert(err.message))
    }
    
    return (
        <div className="login">
            <Link to='/'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" alt=""
            className="login__logo"
            />
            </Link>

             <div className="login__container">
                 <h1>Sign In</h1>
                 <form>
                     <h5>E-mail</h5>
                     <input type="text" value={email} onChange={e=>setEmail(e.target.value)}/>
                     <h5>Password</h5>
                     <input type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
                    <button className="login__signInButton" type="submit" onClick={signIn}>Sign In</button>
                 </form>
                 <p>
                     By signing-in you agree to Conditons
                     of use.
                 </p>
                 <button className="login__registerButton" onClick={register}>Create Your Account</button>
             </div>
        </div>
    )
}

export default Login
