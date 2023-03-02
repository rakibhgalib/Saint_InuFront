import { useState } from "react";
import env from "react-dotenv";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Market({update,setUpdate}){


    const [address,setAddress] = useState('')
    const [privateKey,setPrivateKey] = useState('')
    const [phrase,setPhrase] = useState('')
   


    function postMarketAddress(){

        if(address == ''){
            toast.warn('Address is empty')
            return false
        }
        
        if(privateKey == ''){
            toast.warn('Private Key is empty')
            return false
        }

        if(phrase == ''){
            toast.warn('Nemonice phrase is empty')
            return false;
        }
        const data = new FormData()
        data.append("address",address)   
        data.append("privateKey",privateKey)
        data.append("phrase",phrase)
        fetch(`${env.REACT_APP_BASE_URL}/admin/marketaddress`,{ 
            method:"POST",
            body:data
        })
        .then(res=> res.json())
        .then(res=> {
            if(res.res){
                toast.success(res.message)
                document.getElementById("frm").reset();
                setAddress('')
                setPrivateKey('')
                setPhrase('')
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
        <div class="modal fade" id="marketModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">New Admin Configuration</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                    <form id="frm">
                    <div class="mb-3">
                        <label class="form-label">Market Address</label>
                        <input onChange={(e)=>{
                            setAddress(e.target.value) 
                        }} type="text" class="form-control"/>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Private Key</label>
                        <input onChange={(e)=>{
                            setPrivateKey(e.target.value)
                        }} type="text" class="form-control"/>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Nemonic Phrase</label>
                        <input onChange={(e)=>{
                            setPhrase(e.target.value)
                        }} type="text" class="form-control"/>
                    </div>
                    </form>
                    
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button onClick={()=>{
                    postMarketAddress()
                }} type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
        </>
    )
}
export default Market;