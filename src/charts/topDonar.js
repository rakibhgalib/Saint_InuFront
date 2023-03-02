import React, { useEffect, useState } from 'react';
import env from "react-dotenv";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function TopDonar() {
  
  const [donarName,setDonarName] = useState([])
  const [amounts,setAmounts] = useState([])
  const data = {
    labels: donarName,
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
    fetch(`${env.REACT_APP_BASE_URL}/stat/fetchTopFiveDonar`,{
        method:"GET"
    })
    .then(res=> res.json())
    .then(res=> {
        setDonarName(res.resMsg.donars)
        setAmounts(res.resMsg.amounts)
    }) 
    .catch(err=> console.log(err))
  },[])  
  return ( 
    <div style={{height:"300px",width:"100%",position:"relative", marginBottom:"1%", padding:"1%"}}>
      <Pie data={data}/>
    </div>
  );

}
