import React, { Component } from 'react';
import { BrowserRouter as Router,Link,Route,Switch } from 'react-router-dom';
import InputMask from 'react-input-mask';
import swal from 'sweetalert';
import $ from "jquery";

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css';

 class SignUp extends Component {

 	usersignup(event){
 		event.preventDefault();
        document.getElementById("signUpBtn").value = 'We are processing. Please Wait...';            

        const formValues = {
            'firstname' 	  : this.refs.firstname.value,
            'lastname' 		  : this.refs.lastname.value,
            'signupEmail' 	  : this.refs.signupEmail.value,
            'mobNumber' 	  : this.refs.mobNumber.value,
            'signupPassword'  : this.refs.signupPassword.value,
            }
            
        var firstname                = this.refs.firstname.value;
        var passwordVar              = this.refs.signupPassword.value;
        var signupConfirmPasswordVar = this.refs.signupConfirmPassword.value;
        var mobile                   = this.refs.mobNumber.value;
        var email                    = this.refs.signupEmail.value;
 		
 		
            if (passwordVar === signupConfirmPasswordVar) {

                return (passwordVar.length >= 6) ? (true, console.log("formValues= ",formValues)) :
                (
	                document.getElementById("signUpBtn").value = 'Sign Up',
	                swal({
	                title : "Password should be at least 6 Characters Long",
	                text  : "Please try again or create an Account",
	                timer: 1700,
	                showConfirmButton: true,
	            	// type  : "error"
	                })
                )
                
            } else {
                document.getElementById("signUpBtn").value = 'Sign Up';
                return swal({
                title  : 'Passwords does not match',
                text   : 'Please Try Again',
                showConfirmButton: true,
                type   : 'error'
                }); //End of error swal
            } //End of else
        
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
				<div className="col-lg-6 offset-lg-2 col-md-6 offset-md-2 col-sm-12 offset-sm-2 formbg1 signupPadding signUpFormWrap loginOesWrap loginforms1" style={{"height": winHeight}}>

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
								   <InputMask mask="9999-999-999" maskChar=" " pattern="^(0|[0-9-+\s]*)$" title="Please enter numbers!" className="form-control  spotylTextbox oesSignUpForm" ref="mobNumber" name="mobNumber" id="mobNumber" required/>
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
					   		<div className="form-group form-group1 col-lg-6 col-md-6 col-xs-6 col-sm-6 inputContent textpd">
					   			<span className="blocking-span">
								   <input type="password" className="form-control Pass   oesSignUpForm confirmbtm" ref="signupPassword" name="signupPassword" required/>
								<span className="floating-label"><i className="fa fa-lock" aria-hidden="true"></i> Password {/*(min 6 char)*/}</span>					   			
							</span>
						    </div>

					   		<div className="form-group form-group1 col-lg-6 col-md-6 col-xs-6 col-sm-6 inputContent textpd1">
					   			<span className="blocking-span">

								   <input type="password" className="form-control Pass   oesSignUpForm confirmbtm" ref="signupConfirmPassword" name="signupConfirmPassword" required/>
								<span className="floating-label1 lbfloatpass"><i className="fa fa-lock" aria-hidden="true"></i> Confirm Password</span>					   			
							</span>

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
