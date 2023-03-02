import React, { useEffect, useState } from 'react';
import env from "react-dotenv";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function TopDonatedProject() {
  
  const [projectName,setProjectName] = useState([])
  const [amounts,setAmounts] = useState([])
  
  const data = {
    labels: projectName,
    datasets: [
      {
        label: 'Donation amount',
        data: amounts,
        backgroundColor: [
          '#07de40',
          '#07dafa',
          '#cd07fa',
          '#f7a705',
          '#f70511',
          '#0eebbe',
        ],
        borderWidth: 0,
      },
    ],
    options: {
      animation: false
  }
  };
  const config = {
    data:data,
    options: {
      animation: {
          duration: 0
      }
  }
  };
  useEffect(()=>{
    fetch(`${env.REACT_APP_BASE_URL}/stat/fetchTopDonatedProject/`,{
        method:"GET"
    })
    .then(res=> res.json())
    .then(res=> {
        setProjectName(res.resMsg.projects)
        setAmounts(res.resMsg.amounts)
    }) 
    .catch(err=> console.log(err))
  },[])  
  return ( 
    <div style={{height:"300px",width:"100%",textAlign:'center'}}>
      <Pie data={data}/>
    </div>
  );

}
