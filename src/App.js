import { Component } from 'react';
import About from './components/AboutComponent';
import {Navbar, NavbarBrand} from 'reactstrap';
import './App.css';
import Main from './components/MainComponent';
import Certificate from './components/CertificateComponent';
import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CheckA from './components/CheckAComponent';
import CheckD from './components/CheckDComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { CardImg} from 'reactstrap'
class App extends Component{
  render(){
    
    return (
      <Router>
      <div className="App" id="page-container">
        <Navbar dark color='primary'>
          <div className="container" >
            <NavbarBrand className="brand" href="/getVaxxedClient" ><CardImg className="logo" src='assets/images/logo.png' alt="logo"/></NavbarBrand>
          <ul className="nav-links">
            <Link to="/getVaxxedClient">
             <li className="pad">Home</li>
            </Link>
            <Link to="/getVaxxedClient/certificate">
              <li className="pad">Certificate</li>
            </Link>
          </ul>
          </div>
        </Navbar>
        <div>
          <div className="row">
            <div className="col-xs-0 col-sm-0 col-md-6 col-lg-6">
              <About/>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 ">
      <Switch>
      <Route path="/getVaxxedClient/" exact component={Main} />
              <Route path="/getVaxxedClient/certificate"  exact component={Certificate}/>
              <Route path="/getVaxxedClient/home/:id/:name" exact component={CheckD}></Route>
              <Route path="/getVaxxedClient/home/:id" exact component={CheckA}></Route>
              <Route path="/getVaxxedClient/home"  component={Main}/>
      </Switch>
            </div>
          </div>
        </div>
        {/* <section id="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center" >
            <p>Developers</p>
          </div>
        </div>
        <div className="row">
          <div class="col-md-6 text-center">
            <p>Paridhi Shah : frontend</p>
            <p><a href="https://www.linkedin.com/in/paridhi-shah-50b33b1ab/" target="new"><FontAwesomeIcon  icon={faLinkedin} /></a></p>
          </div>
          <div class="col-md-6 text-center">
            <p>S Rudresh : Backend</p>
            <p><a href="https://www.linkedin.com/in/rudy17/" target="new"><FontAwesomeIcon  icon={faLinkedin} /></a></p>
          </div>
        </div>
      </div>
    </section> */}

<div className="footer-dark">
        <footer className="primary">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-md-3 item">
                        <h3>Services</h3>
                        <ul>
                            <li><a href="#">Check Slot availability</a></li>
                            <li><a href="#">Download Certificate</a></li>
                            <li><a href="#">Book slots(Coming Soon)</a></li>
                        </ul>
                    </div>
                    <div className="col-sm-6 col-md-3 item text">
                        <h3>About Team</h3>
                        <div className="row">
                        <div class="col-md-6 text-center">
                          <p>Paridhi Shah</p>
                          <p><a href="https://www.linkedin.com/in/paridhi-shah-50b33b1ab/" target="new"><FontAwesomeIcon  icon={faLinkedin} /></a></p>
                        </div>
                        <div class="col-md-6 text-center">
                          <p>S Rudresh</p>
                          <p><a href="https://www.linkedin.com/in/rudy17/" target="new"><FontAwesomeIcon  icon={faLinkedin} /></a></p>
                        </div>
                    </div>
                    </div>
                    <div className="col-md-6 item text">
                        <h3>getVAXXED</h3>
                        <p>A project created for learing and and testing if this can be a third sem project team XD</p>
                    </div>
                </div>
                <p className="copyright">getVAXXED © 2021</p>
            </div>
        </footer>
    </div>










      </div>
      </Router>
      
    );
  }
}

export default App;
