import React, { Component } from 'react';
import { BrowserRouter as Router,Link,Route,Switch } from 'react-router-dom';
import InputMask from 'react-input-mask';

import 'font-awesome/css/font-awesome.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css';

class ForgotPassword extends Component {




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
          <div className="divForgotPasswordWrap">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 forgotpwd verifypd">
              <h3 className="signInNameTitle"><span className="bordbt">VERIFY EMAIL</span> </h3>
              <div className="text-center col-lg-12 col-md-12 col-sm-12 col-xs-12 otpHeader">
                  <span>Enter Email Id that you used for creating Account </span>
              </div>
              <div className="FormWrapper col-lg-12 col-md-12 col-sm-12 col-xs-12 forPassWrap">
                <form id="forgotPassword" /*onSubmit={this.forgotpassword.bind(this)}*/>
                  <div className="form-group col-lg-12 col-md-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 pdleftclr veribtm">
                    <div className="input-effect input-group col-lg-12">
                      <input type="email" className="effect-21  form-control loginInputs" ref="forgotEmail" name="forgotEmail" /*onBlur={this.inputEffect.bind(this)}*/ aria-label="Email Id" aria-describedby="basic-addon1" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" title="Please add '.' and enter only 2 or 3 characters following '.'!" required/>
                      <span className="input-group-addon glyphi-custommm"><i className="fa fa-envelope" aria-hidden="true"></i></span>
                      <span className="focus-border">
                        <i></i>
                      </span>
                    </div>
                  </div>
                  <div className="submitButtonWrapper col-lg-12 col-md-12 col-sm-12 col-xs-12 pdleftclr">
                    <button type="submit" className="btn col-lg-12 col-md-12 col-sm-12 col-xs-12 submitBtn UMloginbutton">Send Verification Code</button>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 pdcls">
                    <Link to='/' className="UMGrey signInbtn col-lg-12 col-md-12 col-sm-12 col-xs-12">Sign In</Link>   
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ForgotPassword;