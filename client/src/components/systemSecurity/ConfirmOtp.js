import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import $ from "jquery";
import axios        from 'axios';
import './SignUp.css';

 class ConfirmOtp extends Component {
    constructor(props){
      super(props);
      this.state ={
        "mobileNumber" : "",
        "email"        : "",
      }
    }

    componentWillMount(){
      this.setState({
        mobileNumber : localStorage.getItem('mobileNumber'),
      },()=>{
        // console.log("in c otp---->",localStorage.getItem('mailId'))
      })
    }  

    confirmOTP(event){
      // console.log('confirm otp');
      event.preventDefault();
       var otpData;
      var url = this.props.location.pathname;
      if(url== "/confirm-otp/forgot"){
         otpData =  {
                        email               : localStorage.getItem('mailId'),
                        otp                 : parseInt(this.refs.emailotp.value)
                    }
      }else{
        otpData =  {
                        mobileNumber        : this.state.mobileNumber,
                        otp                 : parseInt(this.refs.emailotp.value)
                    }
      }    

      if(url== "/confirm-otp/forgot"){
        axios
          .post('/user/checkotp',otpData,)
          .then((response)=> {
              // console.log("-------userData--in checkotp---->>",response);
              var responseData = response.data;
              if(responseData.message=="Success"){
               swal("Great","OTP Verified Successfully","success");
               this.props.history.push("/reset-pwd");
              }
              else if(responseData.message=="Failed"){
                  swal("OTP not verified","Please try again","error");
                  this.props.history.push("/");
              }
          })
          .catch(function (error) {
              console.log(error);
            
          })
      }else{
            // console.log("-------userData--in confirm otp---->>",otpData);
        axios
          .post('/user/mobileverification',otpData,)
          .then((response)=> {
              // console.log("-------userData--in confirm otp---->>",response);
              var responseData = response.data;
              if(responseData.message=="User Verified"){
               swal("Great","OTP Verified Successfully","success");
               this.props.history.push("/");
              }
              else if(responseData.message=="User already verified"){
                  swal("User already verified","","success");
                  this.props.history.push("/");
              }
          })
          .catch(function (error) {
              console.log(error);
          })
        }
    }

    inputEffect(event){
      event.preventDefault();
      if($(event.target).val() != ""){
        $(event.target).addClass("has-content");
      }else{
        $(event.target).removeClass("has-content");
      }
    }

    resendOtp(event){
      event.preventDefault();
      var element = document.getElementById("resendOtpBtn");
      element.classList.add("btn-success");
      element.classList.remove("resendOtpColor");

      var data = {
          mobNumber : localStorage.getItem('mobileNumber'),
          firstname : localStorage.getItem('firstname'),
      }
      axios
        .post('/user/resendotp',data)
        .then((response)=> {
            // console.log("-------resend otp ---->>",response);
            var responseData = response.data;
            if(responseData == "OTP updated"){
             swal("Great","OTP resend Successfully","success");         
            }
            else{
              swal("Something went wrong","","error");              
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    }

  render(){
    if(this.props.location.pathname == "/confirm-otp/forgot"){
      var mobileEmail = 'Email Id';
      var resendOtp ='';
    }else{
      var resendOtpWrap = "resendOtpWrap resendOtpWrapcss";
      var mobileEmail = 'Mobile Number';
      var resendOtp = <span onClick={this.resendOtp.bind(this)}>Resend OTP</span>;
    }
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
          <div className="divConfirmOtpModalWrap">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" className="firstverification">
              <div className="text-center col-lg-12 col-md-12 col-sm-12 col-xs-12 otpHeader">
                <span>We have sent you a Verification Code to your registered <b>{mobileEmail}</b>.<br/><br/></span>
              </div>
              <form id="OTPMobMail" onSubmit={this.confirmOTP.bind(this)}>
                <div className="col-lg-12 col-md-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 veriemail">
                  <div className="text-left col-lg-12 col-md-12 col-sm-12 col-xs-12 otpHeader">
                    <span>Enter six digit verification code:<br/></span>
                  </div>
                  <div className="input-effect input-group veribtm1">
                    <input type="text" className="effect-21 form-control loginInputs" ref="emailotp" name="emailotp" onBlur={this.inputEffect.bind(this)} aria-describedby="basic-addon1" title="Please enter numbers only!" maxLength="6" pattern="(0|[0-9]*)" required/>
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
                <div id="resendOtpBtn" className={"col-lg-4 col-md-4 col-sm-4 col-xs-4 resendOtpColor "+resendOtpWrap}>
                  {resendOtp}
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