import { useEffect, useState } from "react"
import env from "react-dotenv";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
function Navbar(){
    let navigate = useNavigate()
    const [uname,setUname] = useState('')
    async function chkUser(){
        const data = new FormData()
        data.append("token",localStorage.getItem("token"))
 
        var chk = await fetch(`${env.REACT_APP_BASE_URL}/user/userCheck`,{method:"POST",body:data})
        var resMsg = await chk.json()
        if(resMsg.message){
           setUname(resMsg.uname)
        }
     }

    useEffect(()=>{
        chkUser()
    },[])
    return(
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <Link to={'/'} className="lnk">
              <img class="navbar-brand" src={'https://assets.coingecko.com/coins/images/19724/large/saint_inu.png?1648269236'} width="50"/>
            </Link>
            
            <div className="nameBox" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <i class="fa-solid fa-user-tie" style={{'fontSize':20}}></i>
              <span className="m-2">{uname}</span>
            </div>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <i class="fa-solid fa-gauge txt-white mt-2"></i>
                        <Link to={'/'} className="lnk txt-white ms-3">Dashboard</Link>
                    </li>
                    <li class="nav-item">
                      <i class="fa-solid fa-lock txt-white mt-2"></i>
                      <Link to={'/adminConfiguration'} className="lnk txt-white ms-3">Admin Configuration</Link>
                    </li>
                    <li class="nav-item">
                      <i class="fa-solid fa-diagram-project txt-white mt-2"></i>
                      <Link to={'/projects'} className="lnk txt-white ms-3">Projects</Link>
                    </li>
                    <li class="d-flex nav-item">
                        <i class="fa-solid fa-right-from-bracket txt-white mt-2"></i>
                        <p type="button" onClick={()=>{
                        localStorage.removeItem("token")
                        navigate('/login')
                        }} to={'/projects'} className="lnk txt-white ms-3">Logout</p>
                    </li>
                    
                </ul> 
            </div>



        </div>
        </nav>
    )
}
export default Navbar;