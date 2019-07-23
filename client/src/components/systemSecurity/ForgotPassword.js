import React, { Component } from 'react';
import { Link }             from 'react-router-dom';
import InputMask            from 'react-input-mask';
import swal                 from 'sweetalert';
import $                    from "jquery";
import axios                from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import './SignUp.css';

class ForgotPassword extends Component {
  constructor(){
    super();
    this.state ={
      email  : '',
    }
  }
  componentDidMount(){
    var x = this.props.match.params;
    // console.log('x',x);
  }
  forgotpassword(event){
    // console.log('forgotpassword');
    event.preventDefault();
    var email = this.refs.enterEmail.value;
    localStorage.setItem("mailId",email);
    var emailData = {
        "emailID" : email
    }

    axios
      .post('/user/forgotpwd',emailData)
      .then((response)=> {
        // console.log("-------emailData frgt pwd------>>",response);
        var data = response.data;
        if(data.message=="OTP Sent and User Updated"){
          this.props.history.push('/confirm-otp/forgot');
        }
      })
      .catch(function (error){
      });
  }

  inputEffect(event){
    event.preventDefault();
    if($(event.target).val() != ""){
      $(event.target).addClass("has-content");
    }else{
      $(event.target).removeClass("has-content");
    }
  }

  render(){
    var winHeight = window.innerHeight;
    var divHeight = winHeight/4.5+'px';

  return(
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 signUpWrapper">
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 signUpLeftWrap" style={{"height": winHeight}}>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <img src="/images/maatslogo.png" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 logoImg" alt="Loading..."/>
            <div className="OESSubTitle2">Abacus Online Exam System</div>
          </div>
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
              <div className="FormWrapper col-lg-12 col-md-12 col-sm-12 col-xs-12 forPassWrap">
                <form id="forgotPassword" onSubmit={this.forgotpassword.bind(this)}>
                  <div className="text-left col-lg-12 col-md-12 col-sm-12 col-xs-12 otpHeader">
                    <span>Enter registerd Email Id </span>
                  </div>
                  <div className="form-group col-lg-12 col-md-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 pdleftclr veribtm">
                    <div className="input-effect input-group col-lg-12">
                      <input type="email" className="effect-21  form-control loginInputs" ref="enterEmail" name="enterEmail" onBlur={this.inputEffect.bind(this)} aria-label="Email Id" aria-describedby="basic-addon1" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" title="Please add '.' and enter only 2 or 3 characters following '.'!" required/>
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
}export default ForgotPassword;