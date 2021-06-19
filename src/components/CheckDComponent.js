import React,{ useEffect, useState} from 'react';
import axios from 'axios';
import {Card} from 'reactstrap';
import SlotComponent from './SlotComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import {useHistory} from 'react-router-dom';

function CheckD({match}){
    const districtName = match.params.id
    console.log("dis :",match.params)
    const stateName = match.params.name
    const url="https://intense-inlet-79769.herokuapp.com/status/distrcitFind"
    const [error,setError] = useState(null);
    const [selectedDate,setSelectedDate] = useState("")
    const [isLoaded,setIsLoaded]= useState(false);
    const [items,setItems] = useState([]);
    const history = useHistory();
    const RenderCenters=({center})=>{
        var len = center.length;
        var slotinfo
        var date = center[0].date;
        if(center[len-1].total==0){
            slotinfo="No Slots"
            return(
                <Card className="xx" >
                    <div className="row colD" >
                        <div className="col-6">
                            <p>{date} </p>
                        </div>
                        <div className="col-4">
                            <p >{slotinfo}</p>
                        </div>
                        <div className="col-2">
                            <p><FontAwesomeIcon  icon={faAngleRight} /></p>
                        </div>
                    </div> 
                </Card>
            )
        }
        else{
            slotinfo=center[len-1].total
            return(
                <Card className="yy" onClick={()=>setSelectedDate(center)}>
                    <div className="row">
                        <div className="col-6">
                            <p>{date} </p>
                        </div>
                        <div className="col-4 colG">
                            <p>{slotinfo} Slots</p>
                        </div>
                        <div className="col-2">
                            <p><FontAwesomeIcon  icon={faAngleRight} /></p>
                        </div>
                    </div>  
                </Card>
            )
        }
    }
    
    useEffect(() => {
        console.log("in useeffect 1")
        
        axios.post(url,{districtName:districtName, stateName:stateName}).
        then(res=>{
           console.log("in useeffect",res.data)
           setIsLoaded(true);
           setItems(res.data);
        },(error)=>{
            //console.log(error);
            setIsLoaded(true);
            setError(error);
        });
    },[])

    if(error){
        return <div>Error:{error.message}</div>
    }
    else if(!isLoaded){
        return(
            <div>
                <progress></progress>
            </div>
        )
    }
    else{
        if(items!=null){
            //console.log(items[1].sessions.date) 
               const centers = items.map(item =>{
                   return(
   
                       <div key={item.id} className="col-12 m-1">
                           
                           <RenderCenters center={item}></RenderCenters>
   
                       </div>
                   )
               })
               if(selectedDate==''){
                   const centerSty={
                       position: 'relative',
                       right:'110px'
                   }
                   
                   const changeUrl=()=>{
                       history.push("/getVaxxedClient/home");
                   }
                   return(
                       <div className="col-12 col-md-12 md-1">
                       <div style={centerSty}>
                          <button className="btn" onClick={changeUrl}><h2><FontAwesomeIcon  icon={faArrowLeft} /></h2> </button>
                       </div>
                       <div>
                           <h1>Available</h1>
                           <ul>{centers}</ul>
                       </div>
                      
                   </div>
               )}
               else{
                   return(
                       <div className="col-10 col-md-10 md-1">
                         <SlotComponent center={selectedDate}/>
                       </div>
                       )
               }
           }   else{
               return(
                   <div>getlost</div>
               )
           }
    }
}
export default CheckD;