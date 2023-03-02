import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import env from 'react-dotenv';
function Editcharity({update,setUpdate,delid}){

    const [address,setAddress] = useState('')
    const [percentage,setPercentage] = useState('')
    

    function updateCharityAddress(){
        const data = new FormData()
        data.append("address",address)   
        data.append("percentage",percentage)
        data.append("id",delid)
        fetch(`${env.REACT_APP_BASE_URL}/admin/charityaddressUpdate`,{ 
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


    async function fetchCharity(){
        fetch(`${env.REACT_APP_BASE_URL}/admin/charityaddressById?id=${delid}`,{ 
            method:"GET",
        })
        .then(res=> res.json())
        .then(res=> {
            if(res.res){
                setAddress(res.message[0].address)
                setPercentage(res.message[0].percentage)
            }
        })
        .catch(err=> console.log(err)) 
    }


    useEffect(()=>{
        fetchCharity()
    },[delid])


    return(
      <>
        <ToastContainer/>
        <div class="modal fade" id="charityeditModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Edit Charity Address</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                    <form id="frm">
                    <div class="mb-3">
                        <label class="form-label">Charity Address</label>
                        <input onChange={(e)=>{
                            setAddress(e.target.value) 
                        }}  value={address} type="text" class="form-control"/>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Percentage</label>
                        <input onChange={(e)=>{
                            setPercentage(e.target.value)
                        }} value={percentage} type="text" class="form-control"/>
                    </div>
                    </form>
                    
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button onClick={()=>{
                    updateCharityAddress();
                }} type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}
export default Editcharity;