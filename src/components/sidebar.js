import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import env from "react-dotenv";
import './style.css'
function Sidebar(){
  let navigate = useNavigate()
    
    const params = window.location.pathname
    async function chkUser(){
       const data = new FormData()
       data.append("token",localStorage.getItem("token"))
       var chk = await fetch(`${env.REACT_APP_BASE_URL}/user/userCheck`,{method:"POST",body:data})
       var resMsg = await chk.json()
       if(!resMsg.message){
        navigate('/login')
       } 
    }
    useEffect(()=>{
      var token = localStorage.getItem("token")
      if(token == null){
        navigate('/login')
      } else {
        chkUser()
      }
    },[])
    return(
      <div className="col-sm-3">
        <div className="sidebar">
          <div>
              <div className={params == '/' ? "d-flex p-2 nav-active" : "d-flex p-2"}>
                <i class="fa-solid fa-gauge txt-white mt-2"></i>
                <Link to={'/'} className="lnk txt-white ms-3">Dashboard</Link>
              </div>
              <div className={params == '/adminConfiguration' ? "d-flex p-2 nav-active" : "d-flex p-2"}>
                <i class="fa-solid fa-lock txt-white mt-2"></i>
                <Link to={'/adminConfiguration'} className="lnk txt-white ms-3">Admin Configuration</Link>
              </div>
              <div className={params == '/projects' ? "d-flex p-2 nav-active" : "d-flex p-2"}>
                <i class="fa-solid fa-diagram-project txt-white mt-2"></i>
                <Link to={'/projects'} className="lnk txt-white ms-3">Projects</Link>
              </div>
              <div className={params == '/refund' ? "d-flex p-2 nav-active" : "d-flex p-2"}>
                <i class="fa-solid fa-diagram-project txt-white mt-2"></i>
                <Link to={'/refund'} className="lnk txt-white ms-3">Refund</Link>
              </div>
              <div className={params == '/donation' ? "d-flex p-2 nav-active" : "d-flex p-2"}>
                <i class="fa-solid fa-diagram-project txt-white mt-2"></i>
                <Link to={'/donation'} className="lnk txt-white ms-3">Donation</Link>
              </div>
              <div className={params == '/log' ? "d-flex p-2 nav-active" : "d-flex p-2"}>
                <i class="fa-solid fa-diagram-project txt-white mt-2"></i>
                <Link to={'/log'} className="lnk txt-white ms-3">Transaction Log</Link>
              </div>
              <div className="d-flex p-2">
                <i class="fa-solid fa-right-from-bracket txt-white mt-2"></i>
                <p type="button" onClick={()=>{
                  localStorage.removeItem("token")
                  navigate('/login')
                }} to={'/projects'} className="lnk txt-white ms-3">Logout</p>
              </div>
          </div>
        </div>
      </div>
    )
}
export default Sidebar;