import { useEffect, useState } from "react";
import { ethers } from "ethers"; 
import env from "react-dotenv";
import TokenArtifact from "../contracts/Token.json";
import contractAddress from "../contracts/contract-address.json";

function Dapp(){
  const [selectedAddress,setSelectedAddress] = useState('')
  const [txBeingSent,setTxBeingSent] = useState('')
  const [proList,setproList] = useState([])
  const [sort,setSort] = useState('ASC')
  const [projectAdd,setPojectAdd] = useState('')
  const [name,setName] = useState('')
  const [title,setTitle] = useState('')
  const [targetAmount,setTargetAmount] = useState(0)
  const [hash,setHash] = useState('')
  const [delHash,setDelHash] = useState('')
  const [totalProject,setTotalProject] = useState(0) 
  const [update,setUpdate] = useState(0)

  const [pAdd,setpAdd] = useState('')
  const [cAdd,setcAdd] = useState('')
  const [dAdd,setdAdd] = useState('')



  const [loading,setLoading] = useState('')


  const HARDHAT_NETWORK_ID = '1337';
  const ERROR_CODE_TX_REJECTED_BY_USER = 4001;   

  async function connectToMetamask() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const accounts = await provider.send("eth_requestAccounts", []);
    setSelectedAddress(accounts[0])
  }
   const _provider = new ethers.providers.Web3Provider(window.ethereum);
   const _token = new ethers.Contract(
      contractAddress.Token,
      TokenArtifact.abi,
      _provider.getSigner(0)  
    );
 
  function clearFeild(){
    setName('')
    setTargetAmount(0)
    setTitle('')
    setPojectAdd('')
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

  function fetchAllProject(){
    fetch(`${env.REACT_APP_BASE_URL}/project/fetchProject?sort=${sort}`,{
      method:"GET"
    })
    .then(res=> res.json()) 
    .then(res=> {
        setproList(res.responseMsg.msg)
    })
    .catch(err=> console.log(err))
  }

  function postNewProject(pAdd){ 
    const data = new FormData()
    data.append("mainId",23)
    data.append('name',name)
    data.append("title",title)     
    data.append('projectAddress',pAdd)
    data.append("startDate",'2023-03-10') 
    data.append('target',targetAmount)
    data.append("creatorName",'Mr x') 
    data.append("creatorAddress",selectedAddress) 
    data.append("endDate",'2023-03-10')
    
    fetch(`${env.REACT_APP_BASE_URL}/project/newProject`,{
      method:"POST",
      body:data
    })
    .then(res=> res.json()) 
    .then(res=> {
        alert(res.responseMsg.msg)
    })
    .catch(err=> console.log(err)) 
  }
  function donateToProject(to,amount){
    const data = new FormData()
    data.append("address",selectedAddress)
    data.append("projectId",projectAdd)
    data.append("amount",amount)
    data.append("donarName","Mr X")
    fetch(`${env.REACT_APP_BASE_URL}/project/donateToproject`,{ 
      method:"POST",
      body:data
    })
    .then(res=> res.json()) 
    .then(res=> {
        if(res.resMsg){
          _transferTokens(to,amount)
        } else {
          alert(res.message)
        }
    })
    .catch(err=> console.log(err)) 
  }
  async function _transferTokens(to, amount) {
    setLoading(true)
    try {
      const tx = await _token.donate(to,{value:ethers.utils.parseEther(amount.toString()),gasLimit: 4200000}); 
      setTxBeingSent(tx.hash)
      const receipt = await tx.wait();
      if (receipt.status === 0) {
        throw new Error("Transaction failed");
      }
      setLoading(false)
      clearFeild()
    } catch (error) {
      if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
        return;
      }
      console.error(error);
    } finally {
      setTxBeingSent(undefined)
    }
  } 
  async function _createProject(name,amount,title){
    setLoading(true)
    try{
      const tx = await _token.createProject(name,amount,title); 
      const receipt = await tx.wait();
      if (receipt.status === 0) {
        throw new Error("Something went wrong");
      }
      const pAdd = (await _token.getCreatorProjects(selectedAddress)).toString();
      if (receipt.status === 0) {
        throw new Error("Something went wrong");
      }
      setLoading(false)
      setUpdate(update+1);
      await postNewProject(pAdd)
      clearFeild()
      setHash(receipt.transactionHash)
    } catch (error){
      console.log(error)
    }
  }
  async function deleteProject(hash){
    try{
      const tx = await _token.deleteProject(hash);
      const receipt = await tx.wait();
      if (receipt.status === 0) {
        throw new Error("Something went wrong");
      }
      setUpdate(update+1);
    } catch(error){

    }
  }
  async function numOfProjects(){
    try{                    
      const tx = (await _token.totalProjects()).toString();
      setTotalProject(tx)
    } catch(error){
      console.log(error)
    }
  }
  async function _RefundTopDonar(){
    setLoading(true)
    const reqserver = await fetch(`${env.REACT_APP_BASE_URL}/wallet/RefundTopDonar?keyword=${projectAdd}`,{method:"GET"})
    const getres = await reqserver.json()
    alert(getres.message)
    setLoading(false)
  }
  async function _withDraw(){ 
    setLoading(true)
    const data = new FormData()
    data.append("pAdd",pAdd)
    data.append("cAdd",cAdd)
    data.append("dAdd",dAdd)
    data.append("camount",1)
    data.append("mamount",1)
    fetch(`${env.REACT_APP_BASE_URL}/wallet/withDraw`,{
      method:"POST",
      body:data
    })
    .then(res=> res.json()) 
    .then(res=> {
        setLoading(false)
        alert(res.resMsg.msg)
    })
    .catch(err=> console.log(err))
  }

  useEffect(()=>{
    getAllAdd()
    connectToMetamask();
  },[]) 

  useEffect(()=>{
    fetchAllProject();
    numOfProjects();
  },[update]) 

  return(
     <div className="container">
      {loading ? <div>
        <div className="loader">
          <center>
             <img src={require('../assets/loading.gif')} width="200" style={{marginTop:200}}/>
          </center>
        </div>
      </div> : <></>}

      <div className="card m-2 p-2" style={{width:600}}>
        <p style={{fontSize:20}}>Total Project {totalProject}</p>
      </div>
      <br/>
      <br/>



      <div className="card m-2 p-2 justify-content-center" style={{width:600}}>
        <small style={{fontSize:13}}>{hash != '' ? 'New Project Created : '+hash : ''}</small>
        <div class="row g-3 m-2">
          <div class="col-auto">
            <label for="staticEmail2">Project Name</label>
            <input value={name} name="name" onChange={(e)=>{
              setName(e.target.value)
            }} type="text" class="form-control"/>
          </div>
          <div class="col-auto">
            <label for="inputPassword2">Target Amount</label>
            <input value={targetAmount} name="targetAmount" onChange={(e)=>{
              setTargetAmount(e.target.value)
            }} type="text" class="form-control"/>
          </div>
          <div class="col-auto">
            <label for="inputPassword2">Project Title</label>
            <input value={title} name="title" onChange={(e)=>{
              setTitle(e.target.value)
            }} type="text" class="form-control"/>
          </div>
        </div> 

        <button className="btn btn-info w-100" onClick={()=>{
          _createProject(name,targetAmount,title);
        }}>Create Project</button>
      </div>
      <br/>
      <br/>

      <div className="card m-2 p-2 justify-content-center" style={{width:600}}>
        <div class="row m-2">
          <div>
            <label for="staticEmail2">Project hash</label>
            <input name="delHash" onChange={(e)=>{
              setDelHash(e.target.value)
            }} type="text" class="form-control"/>
          </div>
          
        </div> 

        <button className="btn btn-info w-100" onClick={()=>{
          deleteProject(delHash);
        }}>Delete Project</button>
      </div>
      <br/>
      <br/>

      



      <div className="card m-2 p-2 justify-content-center" style={{width:600}}>
        <select className="form-control" onChange={(e)=>{
          setPojectAdd(e.target.value);
        }}>
          <option>Select Project</option>
          {proList.map(item=>(
            <option>{item.projectAddress}</option>
          ))}
        </select> 

        <br/>
        <button className="btn btn-info w-100" onClick={()=>{
          // _transferTokens(projectAdd,1)
          donateToProject(projectAdd,5);
        }}>Donate Amount</button>
      </div>

      
      <div className="card m-2 p-2 justify-content-center" style={{width:600}}>
        <select onChange={(e)=>{
          setPojectAdd(e.target.value)
        }} className="form-control">
          <option>Select Project</option>
          {proList.map(item=>(
            <option>{item.projectAddress}</option>
          ))}
        </select> 
        <br/>
        <button className="btn btn-info w-100" onClick={()=>{
          _withDraw();
        }}>Withdraw Balance</button> 
      </div>
    

      <div className="card m-2 p-2 justify-content-center" style={{width:600}}>
        <select onChange={(e)=>{
          setPojectAdd(e.target.value)
        }} className="form-control">
          <option>Select Project</option>
          {proList.map(item=>(
            <option>{item.projectAddress}</option>
          ))}
        </select> 
        <br/>
        <button className="btn btn-info w-100" onClick={()=>{
          _RefundTopDonar()
        }}>Refund top donar</button>
      </div>

     </div>
  );
}
export default Dapp