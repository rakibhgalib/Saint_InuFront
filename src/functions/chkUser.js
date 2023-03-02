import env from "react-dotenv";
import { Link, useNavigate } from 'react-router-dom';
async function chkUser(){
    alert('hey')
    const data = new FormData()
    data.append("token",localStorage.getItem("token"))
 
    var chk = await fetch(`${env.REACT_APP_BASE_URL}/user/userCheck`,{method:"POST",body:data})
    var resMsg = await chk.json()
    if(resMsg.message){
      window.location = "/"
    } 
}
module.export = chkUser 