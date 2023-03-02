import env from "react-dotenv";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  

function Login(){
    let navigate = useNavigate()
    const [loginInfo,setLoginInfo] = useState({
        email:'',
        password:''
    });


    const changeHandler = e => {
        setLoginInfo({...loginInfo, [e.target.name]: e.target.value})
     }
    function Loginuser(){
        const formData = new FormData()
        formData.append("email",loginInfo.email)
        formData.append("password",loginInfo.password) 
        fetch(`${env.REACT_APP_BASE_URL}/user/loginUser`,{
            method:"POST",
            body: formData
        })
        .then(res=> res.json())
        .then(res=> {
            if(res.resMsg.status){
                localStorage.setItem("token",res.resMsg.authToken)
                navigate('/')
            } else {
                toast.warn(res.resMsg.msg) 
            }
        })
        .catch(err=> console.log(err))
    }  
    
    async function chkUser(){
        const data = new FormData()
        data.append("token",localStorage.getItem("token"))
 
        var chk = await fetch(`${env.REACT_APP_BASE_URL}/user/userCheck`,{method:"POST",body:data})
        var resMsg = await chk.json()
        console.log(resMsg)
        if(resMsg.message){
         navigate('/')
        } 
     }

    useEffect(()=>{
        var token = localStorage.getItem("token")
        if(token == null){
        } else {
            chkUser()
        }
    },[])
   
    return(
        <div>
            <ToastContainer />
            <div className="card logSinBox mx-auto" style={{marginTop:100}}>
              <div className="container p-5">
                    <center>
                      <img src={'https://assets.coingecko.com/coins/images/19724/large/saint_inu.png?1648269236'} width="150"/>
                    </center>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input name="email" onChange={(e)=>{
                            changeHandler(e)
                        }} type="email" class="form-control"/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input name="password" onChange={(e)=>{
                            changeHandler(e)
                        }} type="password" class="form-control"/>
                    </div>
                    <button type="submit" onClick={()=>{
                        Loginuser()
                    }} class="btn btn-primary w-100">Submit</button>

                    <center>
                      <Link to={'/register'}>Create New Account</Link>
                    </center>
              </div>   
            </div>
        </div>
    )
}
export default Login;