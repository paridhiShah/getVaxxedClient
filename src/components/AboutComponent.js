import React,{Component} from 'react';
import { Card, CardImg, CardTitle, CardText, CardImgOverlay } from 'reactstrap'
import '../css/About.css';
class About extends Component{
    

    render(){
        return(
            <div className="About">
               
                <div>
                <Card>
                <CardImg className="d-none d-sm-none d-md-block d-lg-block" src='assets/images/bg.jpg' alt="bg"/>
                <CardImgOverlay>
                    <div className="container" >
                    {/* <CardTitle>getVAXXED</CardTitle>
                    <CardText>Problem in booking slots?</CardText>
                    <CardText>We are the solution!</CardText> */}
                    </div>
                </CardImgOverlay>
                </Card>
                </div>
            </div>

        );
    }
}

export default About;