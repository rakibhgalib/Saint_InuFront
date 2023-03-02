import { useEffect, useState } from "react";
import Sidebar from '../components/sidebar'
import AdminConModal from "../modals/adminConfiguration";
import Market from "../modals/marketaddress";
import Charity from "../modals/charityaddress";
import Editcharity from "../modals/editcharity";
import Navbar from "../components/navbar";
import env from "react-dotenv";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AdminConfigure(){
    

    const [update,setUpdate] = useState(0);
    const [searchterm,setSearchterm] = useState('')
    const [sort,setSort] = useState('ASC')   
    const [loading,setLoading] = useState(false)
    const [marketList,setMarketList] = useState([])
    const [charityList,setCharityList] = useState([])
    const [total,setTotal] = useState(0)
    const [delid,setDelid] = useState(0)
    const [proList,setproList] = useState([])
    const [projectid,setProjectid] = useState('')
    const [cset,setcset] = useState(0)


    const [donarp,setDonarp] = useState(0)
    const [sitep,setSitep] = useState(0)
    const [charityp,setCharityp] = useState(0)


    
        async function fetchMarketAddress(){
        try{
            const request = await fetch(`${env.REACT_APP_BASE_URL}/admin/fetchmarketAddress`,{method:"GET"})
            const res = await request.json()
            setMarketList(res.message);
            } catch(error){
                console.log(error)
            }
        }


        async function fetchCharityAddress(){
            try{
                const request = await fetch(`${env.REACT_APP_BASE_URL}/admin/fetchcharityaddress`,{method:"GET"})
                const res = await request.json()
                if(res.res) {
                    setCharityList(res.message[0]); 
                    setTotal(res.message[1][0].total)
                }
                
                } catch(error){
                    console.log(error)
                }
            }

            async function percentageconfigure(){
                try{
                    const request = await fetch(`${env.REACT_APP_BASE_URL}/admin/percentageconfigure`,{method:"GET"})
                    const res = await request.json()
                    if(res.resMsg) {
                        setDonarp(res.message[0].donar)
                        setCharityp(res.message[0].site)
                        setSitep(res.message[0].site)
                        setcset(res.isCset)
                    }
                    
                    } catch(error){
                        console.log(error)
                    }
                }
    
            async function updateCstatus(status,id,percentage){
                try{
                    const data = new FormData()
                    data.append("status",status)
                    data.append("id",id)
                    data.append("percentage",percentage)
                    const request = await fetch(`${env.REACT_APP_BASE_URL}/admin/updatecharityaddress`,{method:"POST",body:data})
                    const res = await request.json()
                        setUpdate(update+1)
                        if(res.message){
                        toast.success(res.alert)
                        } else {
                        toast.warn(res.alert)
                        }
                    } catch(error){
                        console.log(error)
                    }
                }


            async function updateMstatus(status,id){
                try{
                    const data = new FormData()
                    data.append("status",status) 
                    data.append("id",id)
                    const request = await fetch(`${env.REACT_APP_BASE_URL}/admin/updatemarketaddress`,{method:"POST",body:data})
                    const res = await request.json()
                        setUpdate(update+1)
                        if(res.message){
                           toast.success(res.alert)
                        } else {
                           toast.warn(res.alert)
                        }
                    } catch(error){
                        console.log(error)
                    }
                }

            async function Updatepercentageconfigure(){
                try{
                    const data = new FormData()
                    data.append("owner",donarp)
                    data.append("refund",charityp)
                    data.append("site",sitep)
                    data.append("projectid",projectid)
                    const request = await fetch(`${env.REACT_APP_BASE_URL}/admin/Updatepercentageconfigure`,{method:"POST",body:data})
                    const res = await request.json()
                    if(res.resMsg) {
                        toast.success(res.alert)   
                    } else {
                        toast.warn(res.alert)
                    }
                    
                    } catch(error){
                        console.log(error)
                    }
                }


            async function pConfigure(){
                const request = await fetch(`${env.REACT_APP_BASE_URL}/admin/pConfigure`,{method:"POST"})
                const res = await request.json()
                if(res.message){
                    toast.success(res.alert)
                } else {
                    toast.warn(res.alert)
                }
            }


           async function fetchProject(){
                fetch(`${env.REACT_APP_BASE_URL}/project/fetchProject?sort=${sort}`,{
                    method:"GET"
                })
                .then(res=> res.json()) 
                .then(res=> {
                    setproList(res.responseMsg.msg)
                })
                .catch(err=> console.log(err))
           }

        useEffect(()=>{
            fetchMarketAddress()
            fetchCharityAddress()
            // percentageconfigure()
            fetchProject()
        },[update]) 
    
    return(
        <div>
            <ToastContainer/>
            <Market update={update} setUpdate={setUpdate}/>
            <Charity update={update} setUpdate={setUpdate}/>
            <Editcharity delid={delid} update={update} setUpdate={setUpdate}/>
            <div className="containerFill">
            <div className="row">
            <Sidebar/>
            <div className="col-sm-9">
              <Navbar/>
              <div class="midcontainer">
                    <div className="container p-2" style={{marginTop:20}}>
                            <div className="d-flex srcBox justify-content-between">
                            <input type="text" onChange={(e)=>{
                                setSearchterm(e.target.value)
                            }} className="form-control w-50" placeholder="Search by Platform Address, Charity Address, Donar Address"/>
                            <i type="button" onClick={()=>{
                               if(sort == "ASC"){
                                setSort("DESC")
                               } else {
                                setSort("ASC")
                               }

                               setUpdate(update+1)
                            }} class="fa-solid fa-sort m-2"></i>
                            <button className="btn btn-info" data-bs-toggle="modal" data-bs-target="#charityModal" style={{fontSize:11}}>
                            <i class="fa-solid fa-plus"></i>Charity</button>

                            <button className="btn btn-info" data-bs-toggle="modal" data-bs-target="#marketModal" style={{fontSize:11}}>
                            <i class="fa-solid fa-plus"></i>Market</button>
                            </div>
                    </div>

                    {loading ? 
                        <center>
                            <img src={require('../assets/loading.gif')} width="50"/>
                        </center> : <></>}




                        <div className="container">
                        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-market" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Market Address</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-charity" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Charity</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-perchentage" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Percentage Configuration</button>
                            </li>
                        </ul>
                        </div>
                        <div class="tab-content" id="pills-tabContent">
                            <div class="tab-pane fade show active" id="pills-market" role="tabpanel" aria-labelledby="pills-home-tab">
                            <div className="container" style={{width:'100%',overflow:'auto'}}> 
                                <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Market Address</th>
                                        <th scope="col">Private Key</th>
                                        <th scope="col">Nemonic Phrase</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                    
                                    {marketList.map((item,index)=>(
                                    <tr>
                                        <td scope="col">{index+1}</td>
                                        <td scope="col">{item.address}</td>
                                        <td scope="col">{item.privateKey}</td>
                                        <td type="button" scope="col" data-bs-toggle="tooltip" data-bs-placement="top" title={item.phrase}>
                                        {item.phrase.substring(0,15)}...</td>
                                        <td scope="col">
                                                <div class="form-check form-switch">
                                                <input 
                                                onChange={()=>{
                                                    var status = item.status == 0 ? 1 : 0
                                                    updateMstatus(status,item.id)
                                                }}
                                                class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={item.status == 1 ? true : false}/>
                                                </div>
                                        </td>
                                    </tr>
                                    ))}
                                
                                </thead>
                                <tbody>
                                
                                </tbody>
                                </table>
                            </div>
                            </div>
                            <div class="tab-pane fade" id="pills-charity" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <div className="container" style={{width:'100%',overflow:'auto'}}>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Charity Address</th>
                                            <th scope="col">Percentage</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                        
                                        {charityList.map((item,index)=>(
                                        <tr>
                                            <td scope="col">{index+1}</td>
                                            <td scope="col">{item.address}</td>
                                            <td scope="col">{item.percentage}</td>
                                            <td>
                                                <div class="form-check form-switch">
                                                <input 
                                                onChange={()=>{
                                                    var status = item.status == 0 ? 1 : 0
                                                    updateCstatus(status,item.id,item.percentage)
                                                }}
                                                class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={item.status == 1 ? true : false}/>
                                                </div>
                                            </td>
                                            <td>
                                            <i type="button" onClick={()=>{
                                                setDelid(item.id)
                                            }} data-bs-toggle="modal" data-bs-target="#charityeditModal" className="fa fa-edit"></i></td>
                                        </tr>
                                        ))}
                                        
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>Total</td>
                                            <td>{total}</td>
                                        </tr>

                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td colSpan="2"><button onClick={()=> pConfigure()} className="btn btn-info w-100" disabled={total < 100 ? true : false}>Save</button></td>
                                            
                                        </tr>
                                    
                                    </thead>
                                    <tbody>
                                    
                                    </tbody>
                                </table>

                            </div>
                            </div>
                            <div class="tab-pane fade" id="pills-perchentage" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <div className="container" style={{width:'100%',overflow:'auto'}}>

                            <select onChange={(e)=>{
                               setProjectid(e.target.value)
                            }} className="form-control">
                                <option>Select Project</option>
                                {proList.map(item=>( 
                                    <option value={item.projectAddress}>{item.name} ({item.projectAddress.substring(0,10)}...)</option>
                                ))}
                            </select>
                            <ol class="list-group list-group-numbered">
                                <li class="list-group-item d-flex justify-content-between align-items-start">
                                    <div class="ms-2 me-auto">
                                    <div class="fw-bold">Owner</div>
                                    Percentage
                                    </div>
                                    
                                    <input value={donarp} onChange={(e)=>{
                                        setDonarp(e.target.value)
                                    }} type="number" className="form-control w-50" />
                                
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-start">
                                    <div class="ms-2 me-auto">
                                    <div class="fw-bold">Site</div>
                                    Percentage
                                    </div>
                                    <input value={sitep} onChange={(e)=>{
                                        setSitep(e.target.value)
                                    }} type="number" className="form-control w-50"/>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-start">
                                    <div class="ms-2 me-auto">
                                    <div class="fw-bold">Refund</div>
                                    Percentage
                                    </div>
                                    <input value={charityp} onChange={(e)=>{
                                        setCharityp(e.target.value) 
                                    }} type="number" className="form-control w-50"/>
                                </li>
                            </ol>


                            <button onClick={()=>{
                                Updatepercentageconfigure()
                            }} className="btn btn-info w-100">Update</button>

                            </div>
                            </div>
                        </div>
                    
                   

                    
              </div>
                
            </div>
            </div>
            </div>

        </div>
    )
}
export default AdminConfigure;