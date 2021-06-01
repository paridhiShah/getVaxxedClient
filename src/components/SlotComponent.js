import {Card,CardBody,CardTitle} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import '../css/Slot.css';

function RenderCenters(center){
    var slots = center.center.slots
    if(slots==0){
        slots="No"
        return(
            <Card>
            <div className="row">
            <div className="col-7 xx ">
                <p>{center.center.name} </p>
            </div>
            <div className="col-4 colDisable ">
            
                <p>{slots}</p>
                <p>Slots</p>
                
            </div>
        </div>
        </Card>
    )
    }
    else{
        return(
            <Card onClick={()=>"location.href='https://www.cowin.gov.in/home';" }>
            <div className="row">
            <div className="col-7  ">
                <p>{center.center.name} </p>
            </div>
            <div className="col-4 colGreen ">
            <a href='https://www.cowin.gov.in/home' target="new">
                <p>{slots}</p>
                <p>Slots</p>
                <div className="row">
                    <h6>Book in Cowin</h6>
                </div>
            </a>
            </div>
        </div>
        </Card>
    )
    }
}




function Slot({center}){
    console.log(center) 
    if(center!=null){
        const len = center.length;
       
           const centers = center.map((item,i) =>{
            if(len!=i+1){
                return(
    
                    <div key={item.id} className="col-12 m-1">
                        
                        <RenderCenters center={item}></RenderCenters>
 
                    </div>
                )
            }
            else{
                return(
                    <div>
                        <br></br>
                    </div>
                )
            }
           
        })

           return(
            <div className="col-12 md-1">
              
                <h1>Available</h1>
                <ul>{centers}</ul>
               
            </div>
           )
}
}
export default Slot