import React from 'react';
import axios from 'axios';
import download from 'downloadjs'


//import { Document, Page, ReactPDF,PDF, Viewer } from 'react-pdf';
import '../css/Certificate.css';
import {
    Paper,
    TextField,
    MenuItem,
    Button,
    IconButton
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Otp from './OtpComponent';

function isNumeric(n) {
    return !isNaN(parseInt(n)) && isFinite(n);
}

export default class Certificate extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            code: '',
            pno: '',
            otpShow: false,
            phoneShow:true,
            refIdShow:false,
            otp: '',
            refId:undefined,
        };

        this.phoneHandle = this.phoneHandle.bind(this)
        this.otpHandle = this.phoneHandle.bind(this)
        this.refHandle = this.phoneHandle.bind(this)
     
    }
    
    phoneHandle(){
        console.log(this.state.otp.length)
        
        //phone handle
        if(this.state.otp.length==0 && typeof(this.state.refId)=='undefined' ){
            console.log("in phone handle")
            axios.post("https://getvaxxedd.herokuapp.com/status/certificate",{mobileNo:this.state.pno}).
        then(res=>{
                console.log(res.data)
                
            },(error)=>{
                console.log(error);
            })}
        
        
        
            //otphandle
        if(this.state.otp.length==6 && typeof(this.state.refId)=='undefined')
        {
        axios.post("https://getvaxxedd.herokuapp.com/status/certificate",{otp:this.state.otp}).
        then(pdfdata=>{
                console.log(pdfdata.data)
                var len = pdfdata.data.length;
                var bytes = new Uint8Array( len );
                for (var i = 0; i < len; i++){
                    bytes[i] = pdfdata.data.charCodeAt(i);
                }
                const renderPdf = bytes.buffer
                console.log(renderPdf)
                
            },(error)=>{
                console.log(error);
            })
        }
        

        
        
        //refhandle
        if(typeof(this.state.refId)!='undefined'){
            console.log("in ref handle",this.state.refId)
        // var fileName= this.state.refId
          
        //     return axios.post("/status/certificate",{id: this.state.refId},
        //        { headers: {
        //           Accept: 'application/json',
        //           'Content-Type': 'application/json',
        //           mode: 'no-cors'
        //         }}
        //       )
        //         .then(response => response.blob())
        //         .then(blob => {
        //           var url = window.URL.createObjectURL(blob)
        //           var a = document.createElement('a')
        //           a.href = url
        //           a.download = fileName
        //           a.click()
        //           a.remove()
        //           setTimeout(() => window.URL.revokeObjectURL(url), 100)
        //         })
        
        // pdfMake.vfs = pdfFonts.pdfMake.vfs;
        // axios.post("/status/certificate",{otp:this.state.refId}).
        //     then(pdfdata=>{
        //         console.log(pdfdata.data)
        //         var len = pdfdata.data.length;
        //         var bytes = new Uint8Array( len );
        //         for (var i = 0; i < len; i++){
        //             bytes[i] = pdfdata.data.charCodeAt(i);
        //         }
        //         const renderPdf = bytes.buffer
        //         console.log(renderPdf)
        //         const document = {content:[{text:renderPdf, fontStyle: 15, lineHeight: 2}]}
        //         pdfMake.createPdf(document).download();
        //     },(error)=>{
        //         console.log(error);
        //     })
                
            
            // pdfMake.vfs = pdfFonts.pdfMake.vfs;
            // axios.post("/status/certificate",{id: this.state.refId}).
            // then(response=>{
            //     const document = {content:[{text:response, fontStyle: 15, lineHeight: 2}]}
                
            //     pdfMake.createPdf(document).download();
            // })
            
            
            var file_name= this.state.refId
            console.log("in ref handle",this.state.refId)
            axios.post("https://getvaxxedd.herokuapp.com/status/certificate",{id: this.state.refId}
             ,{header: this.headers, responseTyoe : 'blob'})
             .then(response => {
                const content = response.headers['content-type'];
                download(response.data, file_name, content)
             }
            ,(error)=>{
                console.log(error);
            })
        }
    }


    otpShow=()=>{
        return(
        <div className="wrap">
            <Paper elevation={3} style={{ padding: 20, width: 300, marginBottom: 60}}>
            <h5>Enter the OTP</h5>
            <p>A One Time Password has been sent to your phone number for verification puposes.</p>
            <Otp otp={this.state.otp} setOtp={val => this.setState({otp: val})} />
            <div style={{display: 'flex', flexDirection: 'row', marginTop: 20}}>
            <Button 
                                variant="contained" 
                                disabled={ (this.state.otpShow && this.state.otp.length!==6)} 
                                color="secondary" 
                                style={{ 
                                    color: 'white', 
                                    marginLeft: 'auto', 
                                    textTransform: 'none'
                                }}
                                onClick={() => {
                                  
                                        this.phoneHandle()
                                        this.setState({otpShow: false, refIdShow:true, phoneShow:false});
                                    
                                }}>
                                Verify
                            </Button>
                            </div>
                            <p>By tapping Verify an SMS may be sent. Message & data rates may apply.</p>
        </Paper>
        
        </div>)
    }


    phoneShow=()=>{
        return(
        <div className="wrap">
           <Paper elevation={3} style={{ padding: 20, width: 300, marginBottom: 60}}>
           
            <h5>Enter your Phone Number</h5>
            <div style={{display: 'flex', flexDirection: 'row', marginLeft: 'auto', justifyContent: 'space-around'}}>
            <div>
            <TextField id="phone" label="Phone" color="secondary" value={this.state.pno} 
            onChange={e => {
                if((e.target.value[e.target.value.length-1]>='0' && e.target.value[e.target.value.length-1]<='9') || !e.target.value) {
                    this.setState({pno: e.target.value});
                }
            }}/>
            </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', marginTop: 20}}>
                            <Button 
                                variant="contained" 
                                disabled={(this.state.pno.length!==10) || !isNumeric(this.state.pno)} 
                                
                                color="secondary" 
                                style={{ 
                                    color: 'white', 
                                    marginLeft: 'auto', 
                                    textTransform: 'none'
                                }}
                                onClick={() => {
                                    this.phoneHandle()
                                    this.setState({otpShow: true,phoneShow:false})
                                }}>
                                Verify
                            </Button>
                </div>
                </Paper>
        </div>

    )}

    refIdShow=()=>{
        return(
        <div className="wrap">
            <Paper elevation={3} style={{ padding: 20, width: 300, marginBottom: 60}}>
            <h5>Enter your Reference Id</h5>
            <div>
            <div style={{display: 'flex', flexDirection: 'row', marginLeft: 'auto', justifyContent: 'space-around'}}>
            <TextField id="refId" label="Reference Id" color="secondary" value={this.state.refId} 
            onChange={e => {
                
                    this.setState({refId: e.target.value});
                
            }}/>
            </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', marginTop: 20}}>
                            <Button 
                                // disabled={(this.state.refId.length!==14) || !isNumeric(this.state.refId) } 
                                variant="contained" 
                                
                                color="secondary" 
                                style={{ 
                                    color: 'white', 
                                    marginLeft: 'auto', 
                                    textTransform: 'none'
                                }}
                                onClick={() => {
                                    //   this.setState({otpShow: true});
                                    this.phoneHandle()
                                }}>
                                Verify
                            </Button>
                </div>
                </Paper>

                
        </div>
    )}




    render(){
        const height = this.state.height-45;
        console.log("phone",this.state.pno)
        console.log(this.state.otp)
        return(
            <div>
                
                {this.state.otpShow? this.otpShow():null}
                {this.state.phoneShow? this.phoneShow():null}
                {this.state.refIdShow?this.refIdShow():null}
            </div>
        );
    }
}
