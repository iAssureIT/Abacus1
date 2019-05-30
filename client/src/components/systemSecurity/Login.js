import React, { Component } from 'react';
import { BrowserRouter as Router,Link,Route,Switch } from 'react-router-dom';
// import {browserHistory} from 'react-router-dom';
import { Redirect } from 'react-router'
import InputMask from 'react-input-mask';

import 'font-awesome/css/font-awesome.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css';

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3006';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';

class Login extends Component {

  constructor(){
      super();
        this.state = {           
           loggedIn : false,
           auth: {
                email: 'oshin@gmail.com',
                password: 'oshin123'
            }
        }
    }

  userlogin(e){
    e.preventDefault();
    console.log("in login mode",this.state.auth);
   
    // return (
    //       <Redirect to="/login" />
    //     );
    axios.post('/user/login',this.state.auth,)
            .then((response)=> {
                console.log("-------userData------>>",response);
                // this.setState({
                //   practiceExamReport : response.data
                // });
                localStorage.setItem("token",response.data.token);
                // browserHistory.replace('/');
                this.props.history.push("/");
                // direct.setState({loggedIn:response.data.token})
            })
            .catch(function (error) {
                console.log(error);
            });



  }

  render(){
    var winHeight = window.innerHeight;
    console.log("winHeight =",winHeight);
    var divHeight = winHeight/4.5+'px';
    console.log("divHeight =",divHeight);
    // console.log('window inner height: ', window.innerHeight);

    return(
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 signUpWrapper">
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 signUpLeftWrap" style={{"height": winHeight}}>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <img src="/images/maatslogo.png" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 logoImg"/>
            <div className="OESSubTitle2">Abacus Online Exam System</div>
          </div>
          {/*<img src="/images/signUpBanner.gif" className="signUpBanner col-lg-9 col-md-9"/>*/}
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 signUpRighttWrap"  style={{"height": winHeight}}>
          <div className="div1 col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{"height": divHeight}}>
          </div>
          <div className="div2 col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{"height": divHeight}}>
          </div>
          <div className="div3 col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{"height": divHeight}}>
          </div>
          <div className="div4 col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{"height": divHeight}}>
          </div>
          <div className="div5 col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{"height": divHeight}}>
          </div>
          <div className="div6 col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{"height": divHeight}}>
          </div>
          <div className="div7 col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{"height": divHeight}}>
          </div>
          <div className="div8 col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{"height": divHeight}}>
          </div>
          <div className="div1 col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{"height": divHeight}}>
          </div>
          <div className="div2 col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{"height": divHeight}}>
          </div>
        </div>
        <div className="col-lg-6 col-lg-offset-2 col-md-6 col-md-offset-2 col-sm-12 col-sm-offset-2 formbg1 signupPadding signUpFormWrap loginOesWrap loginforms1" style={{"height": winHeight}}>
          <div className="divLoginInWrap">
            <form id="login" onSubmit={this.userlogin.bind(this)}>
              <h3 className="signInNameTitle"><span className="bordbt">SIGN IN</span></h3>
              <div className="col-lg-12 col-md-12 col-sm-12 ">
                <div className="inputContent">
                  <span className="blocking-span">
                    <input type="email"  className=/*this.state.loginusername?"col-lg-12 col-md-12 col-sm-12 oesSignUpForm tmsLoginTextBox has-content":*/"col-lg-12 col-md-12 col-sm-12 oesSignUpForm tmsLoginTextBox" /*onChange={this.handleChange}*/ ref="loginusername" id="loginusername" name="loginusername" placeholder="" required/>
                    <span className="floating-label"><i className="fa fa-envelope signupIconFont" aria-hidden="true"/>Email</span>   
                  </span>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="inputContent ">
                  <span className="blocking-span">
                    <input type="password" className=/*this.state.loginusername?"col-lg-12 col-md-12 col-sm-12 oesSignUpForm tmsLoginTextBox has-content":*/"col-lg-12 col-md-12 col-sm-12 oesSignUpForm tmsLoginTextBox" /*onChange={this.handleChange}*/ ref="loginPassword" id="loginPassword" name="loginPassword" required/>
                    <span className="floating-label"><i className="fa fa-lock signupIconFont" aria-hidden="true"/> Password</span>   
                  </span>
                  <div className="rrnShowHideDiv">
                  </div>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12">
                <input id="logInBtn" type="submit" className="col-lg-12 col-md-12 col-xs-12 col-sm-12 UMloginbutton hvr-sweep-to-right" value="Login"/>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls">
                <div className="col-lg-5 col-md-6 col-sm-6 ">
                  <Link to='/signup' className="UMGreyy UMcreateacc col-lg-12 col-md-12 col-xs-12 col-sm-12"> Sign Up</Link>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 offset-lg-1 customFl">
                  <Link to='/forgot-pwd' className="UMGreyy UMcreateacc col-lg-12 col-md-12 col-xs-12 col-sm-12">
                    Forgot Password?
                  </Link>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 pdcls">
                <div className="col-lg-12 col-md-12 col-sm-12 ">
                  <Link to='/verify-email' className="UMGreyy forgotpass emailverify col-lg-12 col-md-12 col-xs-12 col-sm-12">
                    OTP Verification
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;