import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import { ethers } from "ethers"; 
import { TopDonar } from "../charts/topDonar";
import { TopDonatedProject } from "../charts/topDonatedProject";
import TokenArtifact from "../contracts/Token.json";
import contractAddress from "../contracts/contract-address.json";
import env from "react-dotenv";
function Dashboard(){
   
   const [totalProject,setTotalProject] = useState(0) 
   const [doneProject,setDoneProject] = useState(0) 
   const _provider = new ethers.providers.Web3Provider(window.ethereum);
   const _token = new ethers.Contract(
      contractAddress.Token,
      TokenArtifact.abi,
      _provider.getSigner(0)  
    );
   async function numOfProjects(){
      try{                    
        const request = await fetch(`${env.REACT_APP_BASE_URL}/project/projectStat`,{method:"GET"})
        const res = await request.json()
        setTotalProject(res.responseMsg.totalProject);
        setDoneProject(res.responseMsg.doneProject)
      } catch(error){
        console.log(error)
      }
    }
    useEffect(()=>{
      numOfProjects()
    },[])
    return(
        <div>

           <div className="containerFill">
           <div className="row">   
             
               <Sidebar/>
             
             <div className="col-sm-9">
               <Navbar/>
               <div className="container midcontainer">
                
                <div className="row">
                     <div className="col-sm-6">
                        <div className="card p-3 text-center">
                           <div className="d-flex justify-content-center">
                              <h3>Top Donar</h3>
                           </div>
                           <TopDonar/>
                        </div> 
                     </div>
                     <div className="col-sm-6">
                        <div className="card p-3 text-center">
                           <div className="d-flex justify-content-center">
                              <h3>Top Donated Projects</h3>
                           </div>
                           <TopDonatedProject/>
                        </div>
                     </div>
                </div>
                

                 <br/>
                 <div className="row">
                    <div className="col-sm-6">
                      <div className="dbox bg-2">
                        <img src={require('../assets/rocket.png')} style={{width:50}} className="m-2"/>
                        <p>Total Project {totalProject}</p>
                      </div> 
                    </div>

                    <div className="col-sm-6">
                      <div className="dbox bg-2">
                        <img src={require('../assets/rocket.png')} style={{width:50}} className="m-2"/>
                        <p>Completed Project {doneProject}</p>
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
export default Dashboard;