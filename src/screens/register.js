import env from "react-dotenv";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  

function Register(){
    let navigate = useNavigate()
    const [signInfo,setSignInfo] = useState({
        userName:'',
        email:'',
        password:''
    });


    const changeHandler = e => {
        setSignInfo({...signInfo, [e.target.name]: e.target.value})
     }
    function Signinuser(){
        const formData = new FormData()
        formData.append("userName",signInfo.userName)
        formData.append("email",signInfo.email)
        formData.append("password",signInfo.password)  
        fetch('http://localhost:5000/user/signUp',{
            method:"POST",
            body: formData
        })
        .then(res=> res.json())
        .then(res=> {
            if(res.res){
                localStorage.setItem("token",res.token)
                navigate('/') 
            } else {
                toast.warn(res.message)
            }
        })
        .catch(err=> console.log(err))
    }  

   
    return(
        <div>
            <ToastContainer/>
            <div className="card logSinBox mx-auto" style={{marginTop:100}}>
              <div className="container p-5">
                    <center>
                      <img src={'https://assets.coingecko.com/coins/images/19724/large/saint_inu.png?1648269236'} width="150"/>
                    </center>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">User Name</label>
                        <input name="userName" onChange={(e)=>{
                            changeHandler(e)
                        }} type="text" class="form-control"/>
                    </div>

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
                        Signinuser();
                    }} class="btn btn-primary w-100">Sign In</button>

                    <center>
                      <Link to={'/login'}>Login</Link>
                    </center>
              </div>   
            </div>
        </div>
    )
}
export default Register;