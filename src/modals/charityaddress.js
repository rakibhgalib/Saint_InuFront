import { useState } from "react";
import env from "react-dotenv";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Charity({update,setUpdate}){


    const [address,setAddress] = useState('')
    const [percentage,setPercentage] = useState('')
    

    function postCharityAddress(){

        if(address == ''){
            toast.warn('Address is empty');
            return false;
        } 

        if(percentage == ''){
            toast.warn('Percentage is empty')
            return false;
        }
        const data = new FormData()
        data.append("address",address)   
        data.append("percentage",percentage)
        fetch(`${env.REACT_APP_BASE_URL}/admin/charityaddress`,{ 
            method:"POST",
            body:data
        })
        .then(res=> res.json())
        .then(res=> {
            if(res.resMsg){
                toast.success(res.message)
                document.getElementById("frm").reset();
                setUpdate(update+1)
            } else {
                toast.warn(res.message)
            }
        })
        .catch(err=> console.log(err))
    }
    return(
        <>
        <ToastContainer/>
        <div class="modal fade" id="charityModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">New Admin Configuration</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                    <form id="frm">
                    <div class="mb-3">
                        <label class="form-label">Charity Address</label>
                        <input onChange={(e)=>{
                            setAddress(e.target.value) 
                        }} type="text" class="form-control"/>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Percentage</label>
                        <input onChange={(e)=>{
                            setPercentage(e.target.value)
                        }} type="text" class="form-control"/>
                    </div>
                    </form>
                    
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button onClick={()=>{
                    postCharityAddress()
                }} type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
        </>
    )
}
export default Charity;