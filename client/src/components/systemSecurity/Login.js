import React, { Component } from 'react';
import { Link}              from 'react-router-dom';
// import {browserHistory}     from 'react-router-dom';
import { Redirect }         from 'react-router';
import swal                 from 'sweetalert';
import $                    from "jquery";
import axios                from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css';

class Login extends Component {

  constructor(){
      super();
        this.state = {           
            loggedIn : false,
            auth: {
                email           : '',
                password        : '',
            }
        }
  }
  componentDidMount(){
    
  }
  userlogin(event){
    event.preventDefault();
    // console.log("in login mode",this.state.auth);
        var auth= {
          email       : this.refs.loginusername.value,
          password    : this.refs.loginpassword.value,
        }
/**************************************Alternate*******************************************/
      axios
        .post('/user/login',auth)
        .then((response)=> {
          localStorage.setItem("token",response.data.token);
          localStorage.setItem("userFirstName",response.data.userFirstName);

          localStorage.setItem("user_ID",response.data.user_ID);
          if(response.data==null){

            swal("Invalid Email or Password","Please Enter valid email and password","warning");
          }else{
            this.setState({
              loggedIn : true,
            },()=>{
              console.log("loggedIn state = ", this.state.loggedIn);
              this.props.history.push("/dashboard");
              window.location.reload();
            })        
          }
        })
        .catch(function (error){
          console.log(error);
          if(localStorage!==null){
            swal("Invalid Email or Password","Please Enter valid email and password","warning");
          }
        });

/**************************************Alternate*******************************************/
// axios
//         .post('/user/login',auth)
//         .then((response)=> {
         
//         })
//         .catch(function (error) {
//             console.log(error);
//            // console.log("-------userData------>>",response);
//            var response="tfcyhgvhujbkhuibuygvjb";
//           // userFirstName: "Dnyaneshwar"
//           // user_ID: "5d0a2bfd84f7f33c69e3868d"
//           localStorage.setItem("token",response);
//           console.log("localStorage =",localStorage);

//             this.props.history.push("/dashboard");
          
//         });
/**************************************Alternate*******************************************/

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
  render(){
    var winHeight = window.innerHeight;
    var divHeight = winHeight/4.5+'px';
      console.log("-------------------------------",this.props.systemlogin);
    
    // if(this.state.loggedIn===true){
    //   return <div></div>
    // }

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
          <div className="divLoginInWrap">
            <form id="login" onSubmit={this.userlogin.bind(this)}>
              <h3 className="signInNameTitle signT"><span className="bordbt">SIGN IN</span></h3>
              <div className="col-lg-12 col-md-12 col-sm-12 ">
                <div className="inputContent">
                  <span className="blocking-span">
                    <input type="email"  className={this.state.loginusername?"col-lg-12 col-md-12 col-sm-12 oesSignUpForm tmsLoginTextBox has-content":"col-lg-12 col-md-12 col-sm-12 oesSignUpForm tmsLoginTextBox"} onChange={this.handleChange} ref="loginusername" id="loginusername" name="loginusername" placeholder="" required/>
                    <span className="floating-label"><i className="fa fa-envelope signupIconFont" aria-hidden="true"/>Email ID</span>   
                  </span>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 marBtm30">
                <div className="form-group form-group1 fltlft input-group col-lg-12 col-md-12 col-sm-12 inputContent ">     
                  <span className="blocking-span">
                    <input type="password" className="form-control pass oesSignUpForm confirmbtm inputTextPass" ref="loginpassword" name="loginpassword" required/>
                    <span className="floating-label1 lbfloatpass"><i className="fa fa-lock" aria-hidden="true"></i> Password</span>                 
                  </span>
                <span className="input-group-addon customCls customCls1 glyphi-custommm">
                  <i className="fa fa-eye-slash Pass showPwd" aria-hidden="true" onClick={this.showSignPass.bind(this)}></i>
                  <i className="fa fa-eye Pass hidePwd" aria-hidden="true" onClick={this.hideSignPass.bind(this)}></i>
                </span>
                  <span className="focus-border">
                    <i></i>
                  </span>
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
                  <Link to='/verify-account' className="UMGreyy forgotpass emailverify col-lg-12 col-md-12 col-xs-12 col-sm-12">
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




