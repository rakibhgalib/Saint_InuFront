import { useState } from "react";
import env from "react-dotenv";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AdminConModal({update,setUpdate}){


    const [platformAddress,setPlatformAddress] = useState('')
    const [charityAddress,setCharityAddress] = useState('')
    const [donarAddress,setDonarAddress] = useState('')


    function postAdminConfiguration(){
        const data = new FormData()
        data.append("platformAddress",platformAddress)   
        data.append("charityAddress",charityAddress)
        data.append("donarAddress",donarAddress)
        fetch(`${env.REACT_APP_BASE_URL}/user/adminconfigaration`,{ 
            method:"POST",
            body:data
        })
        .then(res=> res.json())
        .then(res=> {
            if(res.responseMsg.msg == "Data saved"){
                setPlatformAddress('')
                setCharityAddress('')
                setDonarAddress('')
                document.getElementById("frm").reset();
                setUpdate(update+1)
                toast.success(res.responseMsg.msg)
            } else {
                toast.warn(res.responseMsg.msg)
            }
        })
        .catch(err=> console.log(err))
    }
    return(
        <>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">New Admin Configuration</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                    <form id="frm">
                    <div class="mb-3">
                        <label class="form-label">Platform Address</label>
                        <input onChange={(e)=>{
                            setPlatformAddress(e.target.value)
                        }} type="text" class="form-control"/>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Charity Address</label>
                        <input onChange={(e)=>{
                            setCharityAddress(e.target.value)
                        }} type="text" class="form-control"/>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Donar Address</label>
                        <input onChange={(e)=>{
                            setDonarAddress(e.target.value)
                        }} type="text" class="form-control"/>
                    </div>
                    </form>
                    
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button onClick={()=>{
                    postAdminConfiguration()
                }} type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
        </>
    )
}
export default AdminConModal;