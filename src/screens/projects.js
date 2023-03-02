import { useEffect, useState } from "react";
import Sidebar from '../components/sidebar'
import env from "react-dotenv";
import Navbar from "../components/navbar";
import Loading from "../modals/loading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Projects(){
    

    const [proList,setproList] = useState([])
    const [update,setUpdate] = useState(0);
    const [sort,setSort] = useState('ASC')
    const [searchterm,setSearchterm] = useState('')  
    const [tody,setToday] = useState('')
    const [loading,setLoading] = useState(false)
    const [pAdd,setpAdd] = useState('')
    const [cAdd,setcAdd] = useState('')
    const [dAdd,setdAdd] = useState('')

    function formatDate(date){
       var fdate = new Date(date);
       var year = fdate.getFullYear(); 

       var month = fdate.getMonth();
       var day = fdate.getDate();

       if(month < 10){
        month = '0'+month
       }

       if(day < 10){
        day = '0'+day
       }

       var today = day+'/'+month+'/'+year;
       return today;
    }

    async function getAllAdd(){
        async function platform(){
          const setplatform = await fetch(`${env.REACT_APP_BASE_URL}/wallet/getActiveAddress?type=platformAddress`,{method:"GET"})
          const pres = await setplatform.json();
          setpAdd(pres.data.address.address)
        }
        async function charity(){
          const setcharity = await fetch(`${env.REACT_APP_BASE_URL}/wallet/getActiveAddress?type=charityAddress`,{method:"GET"})
          const cres = await setcharity.json();
          setcAdd(cres.data.address.address)
        }
        async function donar(){
          const setdonar = await fetch(`${env.REACT_APP_BASE_URL}/wallet/getActiveAddress?type=donarAddress`,{method:"GET"})
          const dres = await setdonar.json();
          setdAdd(dres.data.address.address)
        }
        platform()
        charity()
        donar()
      }

    async function _withDraw(projectAdd,amount){ 
        setLoading(true)
        const data = new FormData()
        data.append("projectAdd",projectAdd)
        data.append("amount",amount)
        fetch(`${env.REACT_APP_BASE_URL}/wallet/withDraw`,{ 
          method:"POST",
          body:data
        })
        .then(res=> res.json()) 
        .then(res=> {
            setLoading(false)
            setUpdate(update+1)
            if(res.resMsg.status){
              toast.success(res.resMsg.msg)
            } else {
              toast.warn(res.resMsg.msg,{
                autoClose: 1000000,
              })
            }
            
        })
        .catch(err=> console.log(err))
      }


    useEffect(()=>{
        var tody = new Date();
        setToday(tody.toISOString())
        getAllAdd()
        fetch(`${env.REACT_APP_BASE_URL}/project/fetchProject?sort=${sort}`,{
            method:"GET"
        })
        .then(res=> res.json()) 
        .then(res=> {
            setproList(res.responseMsg.msg)
        })
        .catch(err=> console.log(err))
    },[update])
    return(
        <div> 
            <ToastContainer />
            {loading ? <Loading/> : <></>}
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
                                }} className="form-control w-75" placeholder="Search by Project name , Project Address, Owner"/>
                                <i type="button" onClick={()=>{
                                if(sort == "ASC"){
                                    setSort("DESC")
                                } else {
                                    setSort("ASC")
                                }

                                setUpdate(update+1)
                                }} class="fa-solid fa-sort m-2"></i>
                                
                            </div>
                    </div>
                    <div className="container" style={{width:'100%',overflow:'auto'}}>
                        <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Project Name</th>
                            <th scope="col">Project Address</th>
                            <th scope="col">Start Date</th>
                            <th scope="col">Target</th>
                            <th scope="col">Donated Amount</th>
                            <th scope="col">Creator Name</th>
                            <th scope="col">Creator Address</th>
                            <th scope="col">Remaining Balance</th>
                            <th scope="col">End Date</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {proList.filter(item=>{
                                if(item.name.toLowerCase().includes(searchterm.toLocaleLowerCase())){
                                    return item;
                                }
                                if(item.owner.toLowerCase().includes(searchterm.toLocaleLowerCase())){
                                    return item;
                                }
                                if(item.projectAddress.toLowerCase().includes(searchterm.toLocaleLowerCase())){
                                    return item; 
                                }
                            }).map(item=>(
                            <tr>
                                <th scope="row">{item.mainId}</th>
                                <td>{item.name}</td>
                                <td>{item.projectAddress}</td>
                                <td>{formatDate(item.startDate)}</td>
                                <td>{item.target}</td>
                                <td>{item.currentAmount}</td>
                                <td>{item.creatorName}</td>
                                <td>{item.creatorAddress} {item.withdrawStatus}</td>
                                <td>{Number(item.target)-Number(item.currentAmount)}</td>
                                <td>{formatDate(item.endDate)}</td>
                                <td>
                                    <button onClick={()=>{
                                        _withDraw(item.projectAddress,item.currentAmount) 

                                    }} className="btn btn-info" disabled={item.withdrawStatus == 1 ? true : false}>Withdraw</button>
                                </td>
                            </tr>
                            ))}
                            
                        </tbody>
                        </table>
                    </div>
              </div>
                
            </div>
            </div>
            </div>

        </div>
    )
}
export default Projects;