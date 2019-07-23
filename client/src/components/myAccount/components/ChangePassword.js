import React, { Component } from 'react';
import $ from "jquery";
import axios from 'axios';
import swal from 'sweetalert';

import '../css/MyAccount.css';


class StudentResetPassword extends (Component) {
	constructor(){
		  super();
		    this.state = {
		    	 oldPassword   					: "",
		    	 resetPasswordPassword 			: "",
		    	 resetPasswordPasswordConfirm 	: "",
		       	 facilityPermission 			: 'waitingforResult',
		    }
		this.handleChange = this.handleChange.bind(this);
	}

	changepassword(event) {
	    event.preventDefault();
	    var resetPassword 	= this.props.match.params;
	    var oldPassword     = this.refs.oldPassword.value;
	    var password        = this.refs.resetPasswordPassword.value;
	    var passwordConfirm = this.refs.resetPasswordPasswordConfirm.value;
	    var email           = localStorage.getItem("mailId");
	   	
	   	var inpFields = {
              	emailID    :email,
              	changedpwd : passwordConfirm,
		    }
		if (password === passwordConfirm) {

        	if(password.length >= 6){  
        		// console.log("inpFields",inpFields);
		    axios
		        .post('/user/changepwd',inpFields)
		        .then((response)=> {
		            // console.log("-------changepwd---in stud--->>",response.data);
		            this.setState({
		              changepwd : response.data,
		            });
		           	swal("Your password has been updated!","","success"); 
		           	this.props.history.push('/dashboard');
		        })
		        .catch(function (error) {
		            console.log(error);
		            swal("Invalid current password.","","warning");
		        });

	        }else{	
	          	swal({
		            title: "password should be at least 6 characters long",
		            text: "Please try again",
		            timer: 1700,
		            showConfirmButton: false,
		            type: "error"
		        });
	      	}
       	}else{
	        swal({
	            title: 'Passwords does not match',
	            text: 'Please try again',
	            showConfirmButton: true,
	            type: 'error'
	        }); //End of error swal
        }
   }
	 
    handleChange(event){
	    const target = event.target;
	    const name   = target.name;
	    this.setState({
	      [name] : event.target.value,
	    });
  	}

	render() {
       return (
       		<div>
	        {/* Content Wrapper. Contains page content */}
	        <div className="content-wrapper">
	          {/* Content Header (Page header) */}
	          <section className="content-header">
	            <h1>User Management</h1>
	          </section>
	          {/* Main content */}
	          <section className="content viewContent">
	            <div className="row">
	              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
	                <div className="box">
	                  <div className="box-header with-border boxMinHeight">
	                  	<div className="box-header with-border">
			            	<h3 className="box-title">Change Password</h3>
			            </div>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-12 col-xs-12 onlineCPExamWrap">
							    <form onSubmit={this.changepassword.bind(this)} id="resetPasswordForm" method="post" className="resetpasswordWrapper col-lg-12 col-md-12 col-xs-12 col-sm-12">
							    	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 resetPassTitle"></div>
							    	<div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-12 ">
									    <span className="blocking-span">
										   <input type="password" className={this.state.oldPassword ? "UMnameOEs inputText col-lg-12 col-md-12 col-sm-12 has-content" : "UMnameOEs inputText col-lg-12 col-md-12 col-sm-12"} ref="oldPassword" name="oldPassword" onChange={this.handleChange} id="oldPassword"  required/>
										   <span className="floating-label" >Current Password</span>
									    </span>
								    </div>
							        <div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-12 ">
									   	<span className="blocking-span">
										   <input type="password" className={this.state.resetPasswordPassword ? "UMnameOEs inputText col-lg-12 col-md-12 col-sm-12 has-content" : "UMnameOEs inputText col-lg-12 col-md-12 col-sm-12"} ref="resetPasswordPassword" onChange={this.handleChange} name="resetPasswordPassword" id="resetPasswordPassword"  required/>
										   <span className="floating-label">New Password</span>
									    </span>
								    </div>
								    <div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-12">
									    <span className="blocking-span">
										   <input type="password" className={this.state.resetPasswordPasswordConfirm ? "UMnameOEs inputText col-lg-12 col-md-12 col-sm-12 has-content" : "UMnameOEs inputText col-lg-12 col-md-12 col-sm-12"} ref="resetPasswordPasswordConfirm" onChange={this.handleChange} name="resetPasswordPasswordConfirm" id="resetPasswordPasswordConfirm"  required/>
										   <span className="floating-label">Confirm New password</span>
									    </span>
								    </div>
							        <div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-12 ">
								    	<button  className="col-lg-12 col-md-4 col-xs-12 col-sm-12  col-xs-12 btn-submit resetpassBtn UMloginbutton hvr-sweep-to-right" type="submit" value="Change Password"> Change Password &nbsp; 
								    		<span><i className="fa fa-rocket" aria-hidden="true"></i></span> 
								    	</button>
						   			</div>	
							    </form>
							</div>
						</div>
					  </div>
				    </div>
			      </div>
			    </div>
			  </section>
			</div>
			</div>
	    );
	} 
}export default StudentResetPassword