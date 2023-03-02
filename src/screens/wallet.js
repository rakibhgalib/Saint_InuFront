import { useState } from "react";
import env from "react-dotenv";

function CreatenewWallet(){
    const [msg,setMsg] = useState('')
    const [address,setAddress] = useState('')
    const [phrase,setPhrase] = useState('')
    const [privateKey,setPrivateKey] = useState('')
    function newWallet(){
        fetch(`${env.REACT_APP_BASE_URL}/wallet/newWallet`,{
            method:"POST"
        })
        .then(res=> res.json())
        .then(res=> {
            setMsg(res.msg)
            setAddress(res.address)
            setPhrase(res.phrase)
            setPrivateKey(res.privateKey)
        })
        .catch(err=> console.log(err))
    } 


    return(
        <div className="container">
          <button className="btn btn-info w-100" onClick={()=>{
            newWallet()
          }}>Create New Wallet</button>


          <div>
            <p>{msg}</p>
            <p>{address != '' ? 'Address : '+address : ''}</p>
            <p>{phrase != '' ? 'Phrase : '+phrase : ''}</p>
            <p>{privateKey != '' ? 'PrivateKey : '+privateKey : ''}</p>
          </div>
        </div>
    )
}
export default CreatenewWallet;