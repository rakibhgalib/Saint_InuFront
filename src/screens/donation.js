import env from "react-dotenv";
import { useEffect, useState } from "react"
import Navbar from "../components/navbar"
import Sidebar from "../components/sidebar"

function Donation(){
    
    const [projectAdd,setProjectAdd] = useState([])
    const [searchterm,setSearchterm] = useState('')
    const [sort,setSort] = useState('ASC')
    async function fetchDonation(){
        const reqserver = await fetch(`${env.REACT_APP_BASE_URL}/project/fetchAllDonation`,{method:"GET"})
        const getres = await reqserver.json()
        console.log(getres)
        setProjectAdd(getres.message)
    }

    useEffect(()=>{
        fetchDonation() 
    },[])
    return(
       <div>
         <div className="containerFill">
            <div className="row">
                <Sidebar/>
                <div className="col-sm-9">
                    <Navbar/>
                    <div class="midcontainer">
                        {/* <div className="d-flex srcBox justify-content-between">
                            <select onChange={(e)=>{
                                setSearchterm(e.target.value)
                            }} className="form-control w-50">
                               <option>Select Project</option>
                            </select>
                            <i type="button" onClick={()=>{
                               if(sort == "ASC"){
                                setSort("DESC")
                               } else {
                                setSort("ASC")
                               }
                            }} class="fa-solid fa-sort m-2"></i>
                        </div> */}

                        
                        <p style={{fontSize:25}}>List Of Donation</p>
                        <ol class="list-group list-group-numbered">
                        {projectAdd.map((item,index)=>(
                                <li class="list-group-item d-flex justify-content-between align-items-start">
                                <div class="ms-2 me-auto">
                                    <div class="fw-bold">{item.donarName == '' ? 'Private' : item.donarName}</div>
                                    {item.projectId}
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
export default Donation