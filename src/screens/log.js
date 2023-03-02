import env from "react-dotenv";
import { useEffect, useState } from "react"
import Navbar from "../components/navbar"
import Sidebar from "../components/sidebar"

function Log(){
     
    const [loglist,setLoglist] = useState([])
    const [searchterm,setSearchterm] = useState('')
    const [sort,setSort] = useState('ASC')
    async function fetchLog(){
        const reqserver = await fetch(`${env.REACT_APP_BASE_URL}/wallet/fetchLog`,{method:"GET"})
        const getres = await reqserver.json()
        setLoglist(getres.message)
    }

    useEffect(()=>{
        fetchLog();
    },[])
    return(
       <div>
         <div className="containerFill">
            <div className="row">
                <Sidebar/>
                <div className="col-sm-9">
                    <Navbar/>
                    <div class="midcontainer">
                        
                        <p style={{fontSize:25}}>Transaction Log</p>
                        <ol class="list-group list-group-numbered">
                        {loglist.map((item,index)=>(
                                <li class="list-group-item d-flex justify-content-between align-items-start">
                                <div class="ms-2 me-auto">
                                    <div class="fw-bold">Send To ( {item.sendTo} )</div>
                                    Status <b>{item.status == 1 ? 'Success' : 'Failed'}</b>
                                    <div><small>{item.date}</small></div> 
                                </div>
                                <span class="badge bg-primary rounded-pill">{item.amount}</span>
                                </li>
                        ))}
                        </ol>
                    </div>
                </div>
            </div>
         </div>
       </div>
    )
}
export default Log