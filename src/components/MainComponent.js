import axios from 'axios';
import {Component} from 'react';

import {Link} from 'react-router-dom';
import '../css/Main.css';
import '../fonts/Assistant-VariableFont_wght.ttf'; 

class Main extends Component{
  
    constructor(props){
        super(props);
        this.state={
            district:[],
            states:[],
            showForm:false,
            value:'', //pincode
            showDistrict:false,
            dis:''
            
           
        };
        this.handleChange = this.handleChange.bind(this);
        this.onStateSelect = this.onStateSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        if(this.showForm)
            this.setState({value: event.target.value});
        if(this.showDistrict){
            this.setState({value:event.target.value})
            console.log("ochagnge",this.state.value)
        }
        }

    handleSubmit(event){
        event.preventDefault();
        this.setState({
            dis:event.target.value
        })
        console.log("in submit", this.state.value)
    }


    componentDidMount(){
        axios.get("https://intense-inlet-79769.herokuapp.com/status/states").
        then(res=>{
                console.log(res.data.states)
                this.setState({states: res.data.states}, () => {
                })
            },(error)=>{
                console.log(error);
            })
    }
    


    showDistrict=()=>{
        var states=this.state.states
       var district = this.state.district
        if(states){
            return(
                <div className="form-group"> 
                <br></br>
                    <form onSubmit={this.handleSubmit}>
                    <input  list="states" type="text" placeholder="State" class="form-control" onSelect={this.onStateSelect} onChange={this.handleChange}  required/>
                    <datalist id="states"  >
                        {states.map((option) => (
                        <option value={option.state_name}  >{option.state_name}</option>
                        ))}
                     </datalist >
                    
                     <br></br>
         
                    <input onSelect={this.handleSubmit} list="district" type="text" placeholder="District" class="form-control" required/>
                    <datalist id="district"  >
                        {district.map((option) => (
                            <option value={option.district_name}  >{option.district_name}</option>
                            ))}
                     </datalist >
                     
                            <hr></hr>
                    <Link to={`/getVaxxedClient/home/${this.state.dis}/${this.state.value}`}>
                            <button 
                            
                            type="submit" className="btn btn-warning" >Search Slots</button>
                        </Link>
                    </form>
                </div>
                    
            )
        }
        else{
            
            return(
                <div>Data wasn't loaded please check via pincode</div>
            )
        }
    }

    onStateSelect =()=>{
        var state = this.state.value
        console.log("onselected stae:",state)
        axios.post("/status/districtNames", {stateName:state}).
        then(res=>{
                console.log(res.data.districts)
                this.setState({district : res.data.districts}, () => {
                })
            },(error)=>{
                console.log(error);
            })
            return(
                
                <div></div>
            )
    }

    showForm=()=>{ 
        return(
            <div>
                <form id="add-pin" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <br></br>
                        <div className="form-group">                
                        <input 
                        type="number" 
                        className="form-control" 
                        placeholder="Pincode" 
                        value={this.state.value}
                        onChange={this.handleChange} required
                        ></input>
                    
                        <hr></hr>
                        </div>
                        <div>
                        <Link to={`/getVaxxedClient/home/${this.state.value}`}>
                            <button 
                            variant="contained"
                            disabled={(this.state.value.length!==6)} type="submit" className="btn btn-danger" >Search Slots</button>
                        </Link>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }




    render(){
        return(
                <div className="container">
                <div>
                <h3>getVAXXED</h3>
                <p>Search for vaccination slots. Get notified when available on Whatsapp</p>
                <div className="row">
                    <div className="col">
                        <button className="btn btn-outline-warning btn-block " onClick={()=>this.setState({showDistrict:true ,showForm:false})}>District</button>
                    </div>
                    <div className="col">
                        <button className="btn btn-outline-danger btn-blocks " onClick={()=>this.setState({showForm:true, showDistrict:false})}>Pincode</button>
                    </div>
                    
                </div>
                {this.state.showForm? this.showForm():null}
                {this.state.showDistrict? this.showDistrict():null}
                
                </div>
                
                </div>
            )}
        
}
export default Main; 
