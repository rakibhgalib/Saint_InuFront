import { useState } from "react"
import Navbar from "../components/navbar"
import Sidebar from "../components/sidebar"
import env from "react-dotenv";

function Uppass(){

    const [oldpass,setoldpass] = useState('')
    const [newpass,setnewpass] = useState('')
    const [rnewpass,setrnewpass] = useState('')

    function changePass(){
        const data = new FormData()
        data.append("oldpass",oldpass)
        data.append("newpass",newpass)

        fetch(`${env.REACT_APP_BASE_URL}/user/updatePass`,{
            method:"POST",
            body: data
        })
        .then(res=> res.json())
        .then(res=> {
           alert(res.message)
        })
        .catch(err=> console.log(err))
    }
    return(
        <div>
            <div className="containerFill">
              <div className="container p-5">
                    <center>
                      <img src={'https://assets.coingecko.com/coins/images/19724/large/saint_inu.png?1648269236'} width="150"/>
                    </center>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Old password</label>
                        <input name="email" onChange={(e)=>{
                            setoldpass(e.target.value)
                        }} type="password" class="form-control"/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">New Password</label>
                        <input name="password" onChange={(e)=>{
                            setnewpass(e.target.value)
                        }} type="password" class="form-control"/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Re type New Password</label>
                        <input name="password" onChange={(e)=>{
                            setrnewpass(e.target.value)
                        }} type="password" class="form-control"/>
                    </div> 

                    <button type="submit" onClick={()=>{
                        changePass()
                    }} class="btn btn-primary w-100">Change Password</button>

                    
              </div>   
            </div>

        </div>
    )
}

export default Uppass