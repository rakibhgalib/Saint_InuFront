function Loading(){
    return(
        <div>
         <div className="loader">
            <center>
             <img src={require('../assets/loading.gif')} width="200" style={{marginTop:200}}/>
            </center>
         </div>
        </div>
    )
}
export default Loading;