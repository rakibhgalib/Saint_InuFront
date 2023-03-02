import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import { useState ,useEffect} from "react";
const readmePath = require("../screens/README.md");
 function Readme(){

    const [markdown,setMakdown] = useState('')
    useEffect(()=>{
        fetch(readmePath)
        .then(response => {
        return response.text()
        })
        .then(text => {
            setMakdown(text)
        }) 
    },[])
   return(
    <section>
      <h1>Sain Inu Frontend</h1>
      <hr/>
      <p>We have developed a front end interface which can connect with smart contract's function and pass data to it. </p>
      <h3>Installation</h3>
      <hr/>
       
  </section>
   );
 }

export default Readme;