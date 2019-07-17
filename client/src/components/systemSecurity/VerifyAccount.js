import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';
import $ from 'jquery';
import swal from 'sweetalert';
import axios        from 'axios';
import 'font-awesome/css/font-awesome.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css';

class VerifyMobileAOS extends Component {

  constructor(){
    super();
    this.state ={
      "mobileNumber": "",
      "subscription" : {
        // user             : Meteor.subscribe("userfunction"), 
      }
    }
  }

  componentWillMount(){
      
      this.setState({
        mobileNumber : localStorage.getItem('mobileNumber'),
      },()=>{
        console.log("in verify otp ---->",this.state.mobileNumber)
    })
    } 

  VerifyMobileAOS(event){
    event.preventDefault();
    var mobileVerifyAOS = this.refs.mobileVerifyAOS.value;
    localStorage.getItem('mobileNumber',mobileVerifyAOS);

    this.props.history.push("/confirm-otp");

    // var otpData =  {
    //                     mobileNumber       : this.state.mobileNumber,
    //                     otp                 : parseInt(mobileVerifyAOS)
    //                 }

    //  axios
    //   .post('/user/mobileverification',otpData,)
    //   .then((response)=> {
    //       console.log("-------userData--in verify otp---->>",response);
    //       var responseData = response.data;
    //       if(responseData.message=="User Verified"){
    //        swal("Great","OTP Verified Successfully","success");
    //        this.props.history.push("/");
    //       }
    //       else if(responseData.message=="User already verified"){
    //           swal("User already verified","","success");
    //           this.props.history.push("/");
    //       }
    //   })
    //   .catch(function (error) {
    //       console.log(error);
        
    //   })

     // Meteor.call('addVerifyOTP', mobileVerifyAOS, function(error,result){
     //    if(error){
     //      swal(error);
     //    }else{
     //      var result = result;
     //      if(result =="alreadyVerified"){
     //        swal("Your account already verified","","warning");
     //        FlowRouter.go("/");
     //      }else if(result != "MobNumNotExists"){
     //        if(result){
     //          var profileData = result.profile;
     //          var userId = result._id;
     //          var emailotp = Math.floor(100000 + Math.random() * 900000);
     //           Meteor.call('addOTP', userId , emailotp, function(error,result){
     //                  if(error){
     //                    console.log(error);
     //                  }else{
                        
     //                    FlowRouter.go('/otpFirstVarification/'+userId);
     //                  Meteor.call("sendSMSMsg",profileData.firstname,mobileVerifyAOS,emailotp); //Send otp through sms
     //                }
     //          });
     //          }
     //        }else{
     //          swal("Wrong Mobile Number" ,"Enter mobile number that you used for creating Account","warning");
     //        }
        
     //    }
     //  });
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
    // console.log('window inner height: ', window.innerHeight);

    return(
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 signUpWrapper">
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 signUpLeftWrap" style={{"height": winHeight}}>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <img src="/images/maatslogo.png" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 logoImg" alt="Loading..."/>
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
          <div className="divVerifyEmailWrap">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 forgotpwd verifypd">
              <form id="OTPMobMail" onSubmit={this.VerifyMobileAOS.bind(this)}>
                <h3 className="signInNameTitle"><span className="bordbt">VERIFY ACCOUNT</span></h3>
                <div className="text-center col-lg-12 col-md-12 col-sm-12 col-xs-12 otpHeader">
                    <span>Enter Mobile Number that you used for creating Account </span>
                </div>
                <div className="form-group col-lg-12 col-md-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 pdleftclr veribtm">
                  <div className="input-effect input-group">
                    <InputMask mask="9999-999-999" maskChar=" " name="mobileVerifyAOS" ref="mobileVerifyAOS" /*onChange={this.handleChange}*/ className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 inputText"  pattern="^(0|[0-9-+]*)$" title="Enter Mobile Numbers!" autoComplete="off" required/>
                    <span className="input-group-addon glyphi-custommm"><i className="fa fa-phone-square" aria-hidden="true"></i></span>
                    <span className="focus-border">
                      <i></i>
                    </span>
                  </div>
                </div>
             
                <div className="submitButtonWrapper col-lg-12 col-md-12 col-sm-12 col-xs-12 pdleftclr">
                  <button type="submit" className="btn btn-info submitBtn col-lg-12 col-md-12 col-sm-12 col-xs-12 UMloginbutton">Submit</button>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 pdcls">
                  <Link to='/' className="UMGrey signInbtn pdleftclr col-lg-12 col-md-12 col-sm-12 col-xs-12">Sign In</Link>   
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default VerifyMobileAOS;