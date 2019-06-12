import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {browserHistory} from 'react-router';
import InputMask from 'react-input-mask';
import swal from 'sweetalert';
import $ from "jquery";

import 'font-awesome/css/font-awesome.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css';

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3006';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';

 class SignUp extends Component {

 	constructor(){
      super();
        this.state = {           
           loggedIn : false,
           auth:{
                firstname       : '',
                lastname        : '',
                mobNumber       : '',
                email           : '',
                password        : '',
                signupPassword  : '',
            }
        }
    }

 	usersignup(event){
 		event.preventDefault();
 			console.log("-------this.state.auth------>>",this.state.auth);
 			var auth={
	                firstname       : this.refs.firstname.value,
	                lastname        : this.refs.lastname.value,
	                mobNumber       : this.refs.mobNumber.value,
	                email           : this.refs.signupEmail.value,
	                password        : this.refs.signupPassword.value,
	                signupPassword  : this.refs.signupConfirmPassword.value,
	            }
 			console.log("-------auth------>>",auth);

        document.getElementById("signUpBtn").value = 'We are processing. Please Wait...';            
            
        var firstname                = this.refs.firstname.value;
        var mobile                   = this.refs.mobNumber.value;
        var email                    = this.refs.signupEmail.value;
        var passwordVar              = this.refs.signupPassword.value;
        var signupConfirmPasswordVar = this.refs.signupConfirmPassword.value;
 		
            if (passwordVar === signupConfirmPasswordVar) {

                return (passwordVar.length >= 6) ? 
                	(true, 
                	 console.log("formValues= ",auth),
		             document.getElementById("signUpBtn").value = 'Sign Up',
      				// browserHistory.push("/"),


                	 axios
                	 	.post('/user/signup',auth,)
			            .then((response)=> {
			                console.log("-------userData------>>",response);
		            		swal("Great","Information submitted successfully and OTP is sent to your registered Email ID and Mobile no","success");
			                this.props.history.push("/confirm-otp");
			                // this.setState({
			                //   practiceExamReport : reconfirm-otpsponse.data
			                // });
			                // localStorage.setItem("token",response.data.token);
			                // direct.setState({loggedIn:response.data.token})
			            })
			            .catch(function (error) {
			                console.log(error);
        					swal("Something went wrong","Information not submitted, please try again","error");
			            })
                	 ) 
                :
	                (
		                document.getElementById("signUpBtn").value = 'Sign Up',
		                swal("Password should be at least 6 Characters Long","Please try again or create an Account","warning")       
	                )
                
            } else {
                document.getElementById("signUpBtn").value = 'Sign Up';
		        return swal("Passwords does not match","Please Try Again","warning")
            }
        
 	}
 	acceptcondition(event){
	    var conditionaccept = event.target.value;
	    console.log("condition",conditionaccept);
	    if(conditionaccept=="acceptedconditions"){
	        $(".acceptinput").removeAttr('disabled');
	        // if(this.state.roletype=="Student"){
	        //     document.getElementById("lastname").removeAttribute("required");
	        // }else{
	        //     null;
	        // }
	    } else{
	        $(".acceptinput").addAttr('disabled');
	    }
    }

    showModal(){
        // if(this.state.roletype){
        //     $(".modalbg").css("display","block");
        // }else{
        //      swal("Please select student or franchise","","warning");
        // }
         $(".modalbg").css("display","block");
    }
    componentDidMount(){

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
						<form id="signUpUser" onSubmit={this.usersignup.bind(this)}>
	                    	<h3 className="signUpNameTitle2"><span className="bordbt">SIGN UP</span></h3>
							<div className="col-lg-12 col-md-12 signUpInnerWrapperOES signupfrm">
								<div className="form-group form-group1 col-lg-6 col-md-6 col-xs-6 col-sm-6 inputContent textpd">
							   		<span className="blocking-span">
									   <input type="text" title="Only alphabets are allowed!" /*onKeyUp={this.validateText.bind(this)}*/ className="form-control spotylTextbox oesSignUpForm" id="firstname" ref="firstname" name="firstname" pattern="[a-zA-Z]+"  required/>
							    		<span className="floating-label">
								    		<i className="fa fa-user-circle-o signupIconFont" aria-hidden="true"/> 
								    		First Name
							    		</span>					   			
									</span>
								</div>
							    <div className="form-group form-group1 col-lg-6 col-md-6 col-xs-6 col-sm-6 inputContent textpd1">
									<span className="blocking-span">   
										<input type="text" title="Please enter alphabets only!" /*onKeyUp={this.validateText1.bind(this)}*/ className="form-control spotylTextbox oesSignUpForm" id="lastname" ref="lastname" name="lastname" pattern="[a-zA-Z]+"  required/>
								    	<span className="floating-label1 lbfloatpass">
								    		<i className="fa fa-user-circle-o signupIconFont" aria-hidden="true"/> 
								    		Last Name
								    	</span>					   			
									</span>
							    </div>
							    <div className="form-group form-group1 col-lg-12 col-md-12 col-xs-12 col-sm-12 inputContent">
									<span className="blocking-span">   
									   <InputMask mask="9999-999-999" maskChar=" " pattern="^(0|[0-9-+]*)$" title="Please enter numbers!" className="form-control  spotylTextbox oesSignUpForm" ref="mobNumber" name="mobNumber" id="mobNumber" required/>
									   <span className="floating-label">
									   <i className="fa fa-mobile signupIconFont" aria-hidden="true"></i>Mobile Number</span>					   			
								    </span>
							    </div>
						   		<div className="form-group form-group1 col-lg-12 col-md-12 col-xs-12 col-sm-12 inputContent">
									<span className="blocking-span">   
									  <input type="email" title="Please match email format!" className="form-control signupsetting  spotylTextbox oesSignUpForm" ref="signupEmail" name="signupEmail" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$" required/>
							    		<span className="floating-label"><i className="fa fa-envelope-o signupIconFont" aria-hidden="true"></i>Email ID</span>					   			
									</span>
							    </div>
						   		<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 inputContent marBtm">
								    <div className="form-group form-group1 fltlft input-group col-lg-6 col-md-6 col-xs-6 col-sm-6 inputContent">
							   			<span className="blocking-span">
											<input type="password" className="form-control pass oesSignUpForm confirmbtm inputTextPass" ref="signupConfirmPassword" name="signupConfirmPassword" required/>
											<span className="floating-label1 lbfloatpass"><i className="fa fa-lock" aria-hidden="true"></i> Password</span>					   			
										</span>
										<span className="input-group-addon customCls customCls1 glyphi-custommm">
											<i className="fa fa-eye Pass showPwd" aria-hidden="true" onClick={this.showSignPass.bind(this)}></i>
											<i className="fa fa-eye-slash Pass hidePwd" aria-hidden="true" onClick={this.hideSignPass.bind(this)}></i>
										</span>
					                    <span className="focus-border">
					                    	<i></i>
					                    </span>
									</div>
							   		<div className="input-group textpdEye fltlft col-lg-6 col-md-6 col-xs-6 col-sm-6 inputContent">
							   			<span className="blocking-span">
											<input type="password" className="form-control pass oesSignUpForm confirmbtm inputTextPass" ref="signupConfirmPassword" name="signupConfirmPassword" required/>
											<span className="floating-label1 lbfloatpass"><i className="fa fa-lock" aria-hidden="true"></i> Confirm Password</span>					   			
										</span>
										<span className="input-group-addon customCls glyphi-custommm">
											<i className="fa fa-eye Pass showPwd" aria-hidden="true" onClick={this.showSignPass.bind(this)}></i>
											<i className="fa fa-eye-slash Pass hidePwd" aria-hidden="true" onClick={this.hideSignPass.bind(this)}></i>
										</span>
					                    <span className="focus-border">
					                    	<i></i>
					                    </span>
									</div>
								</div>
							    <div className="form-group form-group1 col-lg-12 col-md-12 col-xs-12 col-sm-12 inputContent termspad">
					                <input  id="idacceptcondition" type="checkbox"  value="acceptedconditions" onClick={this.acceptcondition.bind(this)}/><Link to='#openModal' className="form-checkbox UMGrey1 modalbutton fontbold terms1" onClick={this.showModal.bind(this)}>&nbsp;I agree to the<span className="under"> terms & conditions</span><label className="requiredsign">*</label></Link>
					                <span className="checkmark1"></span>
					            </div>
		                        <div id="openModal" className="modalbg">
		                            <div className="dialog">
		                                <Link to='#close' title="Close" /*onClick={this.hideModal.bind(this)}*/ className="modalclose">X</Link>
		                                <h2 className="modaltext">Terms & Conditions</h2>
		                                <p className="modaltext modalpara modalparascroll">{/*this.state.termsCondition?this.state.termsCondition.instruction:null*/}</p>
		                            </div>
		                        </div>

								<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 form-group1 rrnRegisterBtn">
							    	<input id="signUpBtn" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 acceptinput UMloginbutton UMloginbutton1 hvr-sweep-to-right" type="submit" value="Sign Up" disabled/>
							    </div>		   

						    	<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 pdcls">
							    	<Link to='/' className="UMGrey signInbtn1 col-lg-12 col-md-12 col-sm-12 col-xs-12 mrleftsign">Sign In</Link> 	
						    	</div>
						    </div> 
					  	</form>
				  	</div>
				</div>
			</div>
		);
	}


}
export default SignUp;
