import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import env from "react-dotenv";
import Loading from "../modals/loading";

function Refund(){
    
    const [proList,setproList] = useState([])
    const [update,setUpdate] = useState(0);
    const [sort,setSort] = useState('ASC')
    const [projectAdd,setPojectAdd] = useState('')
    const [loading,setLoading] = useState(false)
    const [msg,setMsg] = useState('')
    const [topDonars,settopDonars] = useState([])

    
    useEffect(()=>{
        fetch(`${env.REACT_APP_BASE_URL}/project/fetchProject?sort=${sort}`,{
            method:"GET"
        })
        .then(res=> res.json()) 
        .then(res=> {
            setproList(res.responseMsg.msg)
        })
        .catch(err=> console.log(err))
    },[update])


    async function _FetchTopThreeDonar(pAdd){
        setLoading(true)
        const reqserver = await fetch(`${env.REACT_APP_BASE_URL}/project/fetchTopThreeDonar?keyword=${pAdd}`,{method:"GET"})
        const getres = await reqserver.json()
        
        if(getres.resMsg){
          settopDonars(getres.message) 
          setMsg('')
        } else {
            settopDonars([])
            setMsg('No Donars found for this project')
        }
        setLoading(false)
      }
    async function _RefundTopDonar(){
        setLoading(true)
        const reqserver = await fetch(`${env.REACT_APP_BASE_URL}/wallet/RefundTopDonar?keyword=${projectAdd}`,{method:"GET"})
        const getres = await reqserver.json()
        if(getres.resMsg){
           toast.success(getres.message)
        } else {
            toast.warn(getres.message)
        }
        setLoading(false)
      }

    return(
        <div>
        <ToastContainer />
        {loading ? <Loading/> : <></>}
            <div className="containerFill">
                <div className="row">
                    <Sidebar/>
                    <div className="col-sm-9">
                       <Navbar/>
                       <div className="row">
                           {/* <div className="col-sm-6">
                              <div className="card p-4">
                                <h3>WithDraw Fund</h3>
                                <select className="form-control" onChange={(e)=>{
                                    setPojectAdd(e.target.value);
                                    }}>
                                    <option>Select Project</option>
                                    {proList.map(item=>(
                                        <option>{item.projectAddress}</option>
                                    ))}
                                </select> 
                                <button onClick={()=>{
                                    _withDraw()
                                }} className="btn btn-info w-100 mt-3">WithDraw</button>
                              </div>
                           </div> */}
                           <div className="col-sm-12">
                            <div className="card p-4">
                                <h3>Refund Top Donar</h3>
                                    <select className="form-control" onChange={(e)=>{
                                         setPojectAdd(e.target.value)
                                        _FetchTopThreeDonar(e.target.value);
                                        }}>
                                        <option>Select Project</option>
                                        {proList.map(item=>(
                                            <option value={item.projectAddress}>{item.title} - ({item.projectAddress.substring(0,5)}...)</option>
                                        ))}
                                    </select> 

                                    <br/>
                                    {msg == '' ? <><small>These are top three donars for this project. But refunded amount will be transfered to top donar</small></> :
                                    <li class="list-group-item d-flex justify-content-between align-items-start">
                                          <div class="ms-2 me-auto">
                                            <div class="fw-bold">Sorry !</div>
                                            No donar found for this project
                                          </div>
                                          
                                    </li>}
                                    <ol class="list-group list-group-numbered">
                    
                                    {topDonars.map((item,index)=>(
                                        <li class="list-group-item d-flex justify-content-between align-items-start">
                                          <div class="ms-2 me-auto">
                                            <div class="fw-bold">{item.donarName == '' ? 'Private' : item.donarName}</div>
                                            {item.address}
                                          </div>
                                          {index == 0 ? <span class="badge bg-success rounded-pill">
                                            <i className="fa fa-check"></i>
                                          </span> : <></>}
                                        </li>
                                    ))}
                                    </ol>
                                    <button onClick={()=>{
                                        _RefundTopDonar();
                                    }} className="btn btn-info w-100 mt-3" disabled={topDonars.length == 0 ? true : false}>Refund</button>
                               </div>
                           </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Refund;