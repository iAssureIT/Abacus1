import React, { Component } from 'react';
import { BrowserRouter as Router,Link,Route,Switch } from 'react-router-dom';
import InputMask from 'react-input-mask';

import 'font-awesome/css/font-awesome.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css';

 class ConfirmOtp extends Component {




  render(){
    // if(location.pathname=='/forgotOTPVarification/'+FlowRouter.getParam("mailId")){
       // var mobileEmail = 'Email Id';
       // var resendOtp ='';
    // }else{
    //   var resendOtpWrap = "resendOtpWrap resendOtpWrapcss";
    //    var mobileEmail = 'Mobile Number';
    //    var resendOtp = <span onClick={this.resendOtp.bind(this)}>Resend OTP</span>;
    // }

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

           <div className="divConfirmOtpModalWrap">

              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" className="firstverification">
                <div className="text-center col-lg-12 col-md-12 col-sm-12 col-xs-12 otpHeader">
                  <span>We have sent you a Verification Code to your registered <b>{/*mobileEmail*/}</b>.<br/>
                  Enter six digit verification code below.</span>
                </div>
                <form id="OTPMobMail" /*onSubmit={this.confirmOTP.bind(this)}*/>
                  <div className="col-lg-12 col-md-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 veriemail">

                    <div className="input-effect input-group veribtm">
                  
                      <input type="text" className="effect-21 form-control loginInputs " ref="emailotp" name="emailotp"  /*onBlur={this.inputEffect.bind(this)} */ aria-describedby="basic-addon1" title="Please enter numbers only!" maxLength="6" pattern="^[0-9]*$" required/>
                       <span className="input-group-addon glyphi-custommm"><i className="fa fa-key" aria-hidden="true"></i></span>
                      <span className="focus-border">
                        <i></i>
                      </span>
                    </div>
                  </div>
                  <div className="submitButtonWrapper col-lg-12 col-md-12 col-sm-12 col-xs-12 veriemail">
                    <button type="submit" className="btn btn-info submitBtn col-lg-12 col-md-12 col-sm-12 col-xs-12 UMloginbutton">Submit</button>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 pdcls">
                    <Link to='/' className="UMGrey signInbtn veriemailmr veriemail col-lg-12">Sign In</Link>  
                  </div>
                   <div id="resendOtpBtn" className="col-lg-4 col-md-4 col-sm-4 col-xs-4 resendOtpColor "/*+resendOtpWrap*/>
                    {/*resendOtp*/}
                   </div>
                </form>
                </div>
              </div>

        </div>
      </div>
    );
  }


}
export default ConfirmOtp;