
# Sain Inu Frontend

We have developed a front end interface which can connect with smart contract's function and pass data to it. 


## Installation

Install frontend packages with npm. Go to saint_inu/frontend and hit

```bash
  npm install
  npm start
```
    
## Import json files


```javascript
import TokenArtifact from "../contracts/Token.json";
import contractAddress from "../contracts/contract-address.json";
```


## Connect javascript with json files


```javascript
  const _provider = new ethers.providers.Web3Provider(window.ethereum);
   const _token = new ethers.Contract(
      contractAddress.Token,
      TokenArtifact.abi,
      _provider.getSigner(0)  
    );
```





## Connect Metamask

```javascript
async function connectToMetamask() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const accounts = await provider.send("eth_requestAccounts", []);
    setSelectedAddress(accounts[0])
  }
```

## Creating project

```javascript
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
```

```javascript
This code connect with our smart contract function, to create a project and it also receive the project address for the newly created project. and send this info to backend server by calling postNewProject(pAdd) function, 
``` 

```javascript
function postNewProject(pAdd){
    const data = new FormData()
    data.append('name',name)
    data.append("title",title)
    data.append('projectAddress',pAdd)
    data.append('target',targetAmount)
    data.append("owner",'Mr x') 
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
//This code send our newly created project info to backend server, 
``` 




## Donate Function

```javascript
async function _transferTokens(to, amount) {
    try {
      const tx = await _token.donate(to,{value:ethers.utils.parseEther(amount.toString())}); 
      setTxBeingSent(tx.hash)
      const receipt = await tx.wait();
      if (receipt.status === 0) {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
        return;
      }
      console.error(error);
    } finally {
      setTxBeingSent(undefined)
    }
  }
``` 

```javascript
This code connect with our smart contract function, ethers.utils.parseEther(amount.toString()) is the amount user want to donate, 'to' is the address where donation will be sent
``` 


## Withdraw Function

```javascript
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
```

```
This request is sent to backend endpoint . pAdd stands for platform address, cAdd stands for charity address, dAdd stands for donar address
```


## Refund Top Donar Function

```javascript
   async function _RefundTopDonar(){
    setLoading(true)
    const reqserver = await fetch(`${env.REACT_APP_BASE_URL}/wallet/RefundTopDonar?keyword=${projectAdd}`,{method:"GET"})
    const getres = await reqserver.json()
    alert(getres.message)
    setLoading(false)
  }
```

```
This request is sent to backend endpoint , it receives a parameters which contain project address. Backend server sort top donar for this project and refund amount to that address
```

 