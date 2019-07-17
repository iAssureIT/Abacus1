import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';
import swal from 'sweetalert';
import $ from "jquery";
import axios                from 'axios';

import 'font-awesome/css/font-awesome.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css';

class ResetPassword extends Component {
  constructor(props){
      super();
        this.state = {           
                   }
  }


  showSignPass(){
    $('.showPwd').toggleClass('showPwd1');
    $('.hidePwd').toggleClass('hidePwd1');
    return $('.inputTextPass').attr('type', 'text');
  }
  hideSignPass(){
    $('.showPwd').toggleClass('showPwd1');
    $('.hidePwd').toggleClass('hidePwd1');
    return $('.inputTextPass').attr('type', 'password');
  }  
  showSignPassC(){
    $('.showPwdC').toggleClass('showPwd1C');
    $('.hidePwdC').toggleClass('hidePwd1C');
    return $('.inputTextPassC').attr('type', 'text');
  }
  hideSignPassC(){
    $('.showPwdC').toggleClass('showPwd1C');
    $('.hidePwdC').toggleClass('hidePwd1C');
    return $('.inputTextPassC').attr('type', 'password');
  }

  changepassword(event) {
    event.preventDefault();
    var password        = this.refs.resetPassword.value;
    var passwordConfirm = this.refs.resetPasswordConfirm.value;
    // var newID = Session.get('newID');
    var newID = this.props.match.params.id;
    if(newID){
      var resetPassword = newID;
    }else{
      var username = $('input[name="forgotEmail"]').val();
      // var userOtp = Meteor.users.findOne({"username":username});
      // if(userOtp){
        var resetPassword = "E6BRdJtHMF9a6p7KF";
      // }
    }

    var pwdData = {
              userID:"E6BRdJtHMF9a6p7KF",
              currentPwd: password,
              changedpwd: passwordConfirm,
    }
    // console.log(resetPassword + password + passwordConfirm);

    //Check password is at least 6 chars long
    // var isValidPassword = function(password, passwordConfirm) {
    //   if (password === passwordConfirm) {
    //     return password.length >= 6 ? true : swal({
    //       title: "Password should be at least 6 Characters Long",
    //       text: "Please try again",
    //       timer: 1700,
    //       showConfirmButton: false,
    //       type: "error"
    //     });
    //   }else{
    //     return swal({
    //       title: "Password doesn't Match",
    //       text: 'Please try Again',
    //       showConfirmButton: true,
    //       type: 'error'
    //     }); //End of error swal
    //   } //End of else
    // }

    // if (isValidPassword(password, passwordConfirm)) {
      // Meteor.call("resetPasswordUsingotp", resetPassword, password, function(err) {
      //   if (err) {
      //     console.log('We are sorry but something went Wrong.');
      //   }else {
                 
      //     Meteor.logout();
      //     FlowRouter.go('/');
      //     swal("Password has been Changed Successfully!!");
      //   }
      // });

      axios
      .post('/user/changepwd',pwdData)
      .then((response)=> {
          console.log("-------pwdData---->>",response);
          var responseData = response.data;
       
      })
      .catch(function (error) {
          console.log(error);
        
      })



    // }
    // return false;
  }

  render(){
    var winHeight = window.innerHeight;
    var divHeight = winHeight/4.5+'px';

    return(
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 signUpWrapper">
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 signUpLeftWrap" style={{"height": winHeight}}>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <img src="/images/maatslogo.png" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 logoImg"/>
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
          <div className="divResetPasswordWrap">
            <h3 className="resetpwdNameTitle"> <span className="bordbt">RESET PASSWORD</span></h3>
            <div className="FormWrapper1 col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <form id="resetPassword" onSubmit={this.changepassword.bind(this)}>
                <div className="form-group loginFormGroup pdleftclr veribtm col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="input-group">
                    <span className="input-group-addon addons glyphi-custommmLeft" id="basic-addon1"><i className="fa fa-lock" aria-hidden="true"></i></span>
                    <input type="password" className="form-control loginInputs inputTextPass" ref="resetPassword" name="resetPassword" placeholder="New Password" aria-label="Password" aria-describedby="basic-addon1" title="Password should be at least 6 characters long!" pattern=".{6,}" required/>
                    <span className="input-group-addon addons glyphi-custommm padBoth" id="basic-addon1">
                      <i className="fa fa-eye-slash Pass showPwd" aria-hidden="true" onClick={this.showSignPass.bind(this)}></i>
                      <i className="fa fa-eye Pass hidePwd" aria-hidden="true" onClick={this.hideSignPass.bind(this)}></i>
                    </span>
                  </div>
                </div>
                <div className="form-group loginFormGroup pdleftclr veribtm col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="input-group">
                    <span className="input-group-addon addons glyphi-custommmLeft" id="basic-addon1"><i className="fa fa-lock" aria-hidden="true"></i></span>
                    <input type="password" className="form-control loginInputs inputTextPassC" ref="resetPasswordConfirm" name="resetPasswordConfirm" placeholder="Confirm New Password" aria-label="Confirm Password" aria-describedby="basic-addon1" title="Password should be at least 6 characters long!" pattern=".{6,}" required/>
                    <span className="input-group-addon addons glyphi-custommm padBoth" id="basic-addon1">
                      <i className="fa fa-eye-slash Pass showPwdC" aria-hidden="true" onClick={this.showSignPassC.bind(this)}></i>
                      <i className="fa fa-eye Pass hidePwdC" aria-hidden="true" onClick={this.hideSignPassC.bind(this)}></i>
                    </span>
                  </div>
                </div>
                <div className="submitButtonWrapper pdleftclr col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <button type="submit" className="btn col-lg-12 col-md-12 col-sm-12 col-xs-12 submitBtn UMloginbutton">Reset Password</button>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 pdcls">
                   <Link to='/' className="UMGrey signInbtn col-lg-12 col-md-12 col-sm-12 col-xs-12">Sign In</Link>   
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ResetPassword;