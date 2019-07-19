import React, {Component} 					from 'react';
import {render} 							from 'react-dom';
import {Link} 								from 'react-router-dom';
import TimeAgo 								from 'react-timeago';
import renderHTML 							from 'react-render-html';
import PracticeStartExamForDashboard		from './PracticeStartExamForDashboard.js';
import StudentRegistrationforCompetition	from './StudentRegistrationforCompetition.js';
import axios 								from 'axios';
import $									from 'jquery';

import '../css/common.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/js/modal.js';
import 'bootstrap/js/tab.js';
declare var jQuery: any;

// import ReactQuill from 'react-quill'; 
// import 'react-quill/dist/quill.snow.css';
// import  { Quill, Mixin, Toolbar } from 'react-quill'; 


class StudentProfile extends Component{

	constructor(){
	  super();
	    this.state = {
	    	mainExamReport 	 		: [],
	    	Notificationstatus 	 	: [],
	    	packageordermasters	 	: [],
	    	packageData 			: [],
	    	studentID 				: '',
	        // content          	: '',
	        // loginTime        	: '',
	        loggedIn 				: false,
	        refreshcnt : 0, 
	        studentRegStatus        :"Registered",

	    }

    	// console.log("constructor loggedIn = ",this.state.loggedIn);
  
	    // this.handleChange = this.handleChange.bind(this);
	}
	
	// handleChange(event){
	//     const target = event.target;
	//     const name   = target.name;
	//     this.setState({
	//       [name]: event.target.value,
	//     });
 //  	}

	componentWillMount(){
 		axios
		  .get('/studentmaster/details/'+localStorage.getItem("user_ID"))
		  .then((response)=> {
		  	if(response.data==null){
		  		this.setState({
		  			studentRegStatus : "Not registered"
		  		})
		  	}else{
		  		this.setState({
		  			studentRegStatus : "Registered"
		  		})

		  	}
		    
		  })
		  .catch(function (error){
		    
		  });


    	axios
	    	.get('/notificationmasters/Broadcast')
            .then((response)=> {
                // console.log("-------Notificationstatus------>>",response.data);
                this.setState({
		 			Notificationstatus : response.data,
		 		});

          		var resArray = response.data;        	
          
	          	if(resArray.length>0 && resArray[0]._id){
                // console.log("-------in if------>>");
				$('#showstatus').css('display','block');
				$('#showstatus').css('overflow-y','auto');
    	 		$('#showstatus').addClass('fade in');

	          	}
	  

            })
            .catch(function (error) {
                console.log(error);
            });
 	}

	componentDidMount(){

		

		const token = localStorage.getItem("token");
		const studentID = localStorage.getItem("user_ID");


		this.setState({
			refreshcnt : 1
		})

	    // console.log("Dashboard Token = ",token);
	    if(token!==null){
	    console.log("Token Received");
	    	this.setState({
	    		loggedIn 	: true,
	    		studentID 	: studentID
	    	})
	    }

	    axios
	    	.get('myexammasters/dashboard/'+studentID)
            .then((response)=> {
                // console.log("-------dashboardReports------>>",response.data);
                this.setState({
		 			mainExamReport : response.data
		 		});
                // localStorage.setItem("token",response.data.token);
                // direct.setState({loggedIn:response.data.token})
            })
            .catch(function (error) {
                console.log(error);
            });

/****************************************package 1 column******************************************/
        axios
	    	.get('/packageordermasters/'+studentID/*WyQY35LEFitPcabP5*/)
            .then((response)=> {
                // console.log("-------packageordermasters------>>",response.data);
                this.setState({
		 			packageordermasters : response.data,
		 		});
                // localStorage.setItem("token",response.data.token);
                // direct.setState({loggedIn:response.data.token})
            })
            .catch(function (error) {
                console.log(error);
            });

        axios
	    	.get('/packagemanagementmasters')
            .then((response)=> {
                // console.log("-------packageData------>>",response.data);
                this.setState({
		 			packageData : response.data,
		 		});
                // localStorage.setItem("token",response.data.token);
                // direct.setState({loggedIn:response.data.token})
            })
            .catch(function (error) {
                console.log(error);
            });
/*******************************************************************************************/

	// 	if ( !$('body').hasClass('adminLte')) {
	// 	  var adminLte = document.createElement("script");
	// 	  adminLte.type="text/javascript";
	// 	  adminLte.src = "/js/adminLte.js";
	// 	  $("body").append(adminLte);
	// 	}
	// 	var studData = StudentMaster.findOne({"studentId":Meteor.userId()});

	// 	 Meteor.call("getNotificationStatus",(err,res)=>{
 //          if(err){ 
 //          }else{ 
 //          	var resArray=res;        	
          
 //          	if(resArray.length>0 && resArray[0]._id){

 //          		if(studData){
	// 			if(studData.notificationStatus=="Unread"){
	// 				Meteor.setTimeout(function() {
	// 			    $('#showstatus').modal('show');
	// 				}, 300);
	// 			}else{
	// 				Meteor.setTimeout(function() {
	// 			    $('#showstatus').modal('hide');
	// 				}, 300);
	// 			}
	// 		}	

 //          	}
 //          	else{
	// 				Meteor.setTimeout(function() {
	// 			    	$('#showstatus').modal('hide');
	// 				}, 300);

	// 			}
            
 //          }
 //        });	

 //        // this.countdownTimeStart();	
 //        // this.setState({
 //        // 	loginTime:new Date().getTime(),
 //        // },()=>{this.countdownTimeStart()})	;		
			
  	}

 // //  	countdownTimeStart(){
	// // 	var countDownDate = this.state.loginTime;
	// // 	var countdwn=0;
	// // 	var x = setInterval(function() {
	// // 	    // Get todays date and time
	// // 	    var now = new Date().getMinutes();
	// // 	    var distance = countDownDate - now;	
	// // 	    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	// // 	    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	// // 	    var seconds = Math.floor((distance % (1000 * 60)) / 1000);   
		 
	// // 	    countdwn=countdwn+1;
	// // 	    if(countdwn==10){
	// // 	        clearInterval(x);		    	
	// // 	    	Meteor.logout();
	// // 	    	FlowRouter.go("/");
	// // 	    }
	// // 	}, 60000);
	// // }

  	updateStudentNotifctn(){
  		// $('#showstatus').css('display','none');
    // 	  $('#showstatus').removeClass('fade in');
    	  // $('.modal-backdrop').hide();
  		 // Meteor.call("updateStudentNotificationStatusToRead",(err,res)=>{
          // if(err){
          // }else{            
          // }
        // });
  	}

  	updateStudentTimeStatus(){
  		// $('#showNotice').css('display','none');
    // 	  $('#showNotice').removeClass('fade in');
 //  		 Meteor.call("updateStudentDownTimeStatusStatusToRead",(err,res)=>{
 //          if(err){
 //          }else{            
 //          }
 //        });
  	}
  	
  	// componentWillUnmount(){
   //  	localStorage.removeItem("justOnce");
  	// }


 showPckgDescription(e){
 	// e.preventDefault();
 	var modalId = e.target.getAttribute('data-text'); 
 	$('#md'+modalId).css("display","block");
 	// $('#'+modalId).addClass("fade in");
 }

 closePckgDescription(e){
 	// e.preventDefault();
 	var modalId = e.target.getAttribute('data-text');
 	$('#md'+modalId).css("display","none");

 }

 render(){
		window.scroll(0,0);
		
			if(this.state.studentRegStatus=="Registered"){var bgimg = 'bgmyprofile'}else{ var bgimg=''}
			// if(this.state.downtimestatus._id && this.state.studentData.downTimeStatus=="Unread"){
			// 	setTimeout(()=>{
			//     jQuery('#showNotice').modal('show');
			// 	}, 300);
			// }else{
			// 	setTimeout(function() {
			//     jQuery('#showNotice').modal('hide');
			// 	}, 300);
			// }
				
	if(this.state.loggedIn===false){
			return <redirect to="/login"/>
	}else{
		return(
			(this.state.studentRegStatus=="Registered")?
				<div>			
		          	<section className={"content viewContent bgmyprofile"/*+bgimg*/}>
		           		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
							{this.state.packageordermasters.length>0?
								<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 profileSection12">									
									<div className="col-lg-10 col-lg-offset-1 zeropadding">
										<div className="col-lg-10 col-lg-offset-1 ">
											<div className="examlinks1 col-lg-12 pckgtitle1">
												<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 nullPadding">Package Purchased</div> 											
												<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 nullPadding"><blink><a href="/PackageList" className="testtitle examlinks col-lg-12 col-md-12 col-xs-12 col-sm-12 pdcls" title="Click here to buy more packages">&nbsp; Buy New Packages</a></blink></div>											
											</div>
										</div>
										<div className="col-lg-10 col-lg-offset-1 scrollbar">
											{this.state.packageordermasters.map((data1,index)=>{
												return (
													<div key={index}>
														{data1.packages?
															data1.packages.map((data2,index2)=>{
															return (<div className="col-lg-6 col-md-6 col-sm-12 outerboxpadding" key={index2}><div className="smallboxpckg1" > 
																    	<div className="col-lg-12 col-md-12 smallfont paddingnone">{data2.packageName}</div>
																    		<a className="startlink" title="Click here to start exam" href={`/startPurchasedPracticeExam/${data2.packageId}`}>Start</a>
																		</div>
															    	</div>
															    	);
															})
															:
															<div>Packages Not Available</div>
														}
													</div>)
												})
											}
										</div>
									</div>
								</div>
							:
								this.state.packageData.length>0?
								<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 profileSection12">
									<div className="col-lg-10 col-lg-offset-1 ">
										<div className="examlinks1 col-lg-12 pckgtitle1 boldfont"><div className="col-lg-6 col-md-6 col-xs-6 col-sm-6 nullPadding">Total Packages Available : {this.props.totalPackagesCount?this.props.totalPackagesCount:null}</div>
											<div className="col-lg-6 col-md-6 col-xs-6 col-sm-6 nullPadding"><a href="/PackageList" className="testtitle1 examlinks col-lg-12 col-md-12 col-xs-12 col-sm-12 " title="Click here to purchase packages"><blink>&nbsp; View & Buy Packages</blink></a></div>
										</div>
									</div>
									<div className="col-lg-10 col-lg-offset-1 zeropadding">
										<div className="col-lg-12 boxlistpadding">
											{this.state.packageData.map((data,index)=>{
												console.log("data = ",data);
								    			return data? 
								    				<div className="col-lg-6 col-md-6 col-sm-12 outerboxpadding" key={index}>
									    				<div className="col-lg-12 col-md-12 col-sm-12 smallboxpckg" > 
												    		<div className=" smallfont">{data.packageName}</div>
												    		
												    		<div className=" smallfont"> Attempt  : {data.AttemptOfPracticeTest} </div>
												    		<div className=" smallfont"> Rs. : {data.PackagePrice} </div>
												    		<div className=" smallfont"> Practice Test : {data.NoOfPracticeTest} </div>
												    		<div className="smallfont">
														        <label title="Click here to see description" className="docLabel docLabelhover" data-toggle="modal" data-text={index} data-target={'#md'+index} onClick={this.showPckgDescription.bind(this)}>Description</label>
														    </div>
												    	</div>
												    	<div id={"md"+index} className="modal" role="dialog">
													        <div className="modal-dialog">
														        <div className="modal-content documentModal dashboardPckgDesc">
														            <div className="modal-header">
														              	<button type="button" data-text={index} className="close" data-dismiss="modal" onClick={this.closePckgDescription.bind(this)}>&times;</button>
														                <h4 className="modal-title">Package Name : {data.packageName}</h4>
														            </div>
														            <div className="modal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">
														              	<div className=" modalbodyHeight col-lg-12 col-md-12 col-sm-12 col-xs-12">
														                	<h5 className="modal-title">Description :</h5>
															                {data.Description.length>0?
															                  <p className="docImageView packageDescPara">{data.Description}</p>
															                :
															                  <p className="docImageView packageDescParaRed">Description not added for this package.</p>
															                }
														              	</div>
														            </div>  
														            <div className="modal-footer"></div>
														        </div>
													        </div>
													    </div>
											    	</div>
											    :null
										    })
											}
										</div>
									</div>
								</div>
								: 
								<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 profileSection12">
									<div className="col-lg-10 col-lg-offset-1 ">
										<div className="examlinks1 col-lg-12 pckgtitle1 boldfont">Packages Not Added
										</div>
									</div>
								</div>
							}
					<div className="col-lg-5 col-md-4 col-sm-12 col-xs-12 profileSection22 studentdashboardtoppadding">	
						<StudentRegistrationforCompetition/>
						<PracticeStartExamForDashboard/>
					</div>	
					<div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 ">
							<div className="profileSection3"></div>
							<div className="bgmonkey bgmonkeyspace">
								<div className="col-lg-12 col-md-12 studProfileTit3">Reports</div>
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 categoryTable">
					              		<table className="table table-striped formTable formtabml">
										    <thead className="tableHeader1">
										        <tr>
										            <th className="col-lg-5 pdhead ">Exam Name </th>
										            <th className="col-lg-1 tab-Table pdhead"> Catg </th>
										            <th className="col-lg-1 tab-Table pdhead">  Marks </th>
										        </tr>
										    </thead>
										{this.state.mainExamReport!=0 ?
										    <tbody className="myAllTableReport reportbdscroll">
										     	{this.state.mainExamReport.map((Exams,index)=>{
										     	return <tr key={index}>
										     			<td className="col-lg-5 pdhead tabletxtwrap">{Exams.competitionName}</td>
										     			<td className="col-lg-1 tab-Table pdhead">{Exams.category}</td>
										     			<td className="col-lg-1 tab-Table pdhead">{Exams.totalScore}</td>
										     		</tr>
										     	})
										    	}
										    </tbody>
										:
									    	<tbody className="OESDataNotAvailable reportbdscroll">
								    			<tr>
								    				<td colSpan="9">"Reports are Not Yet Available."</td>
								    			</tr>
								    		</tbody>
							    		}
										</table>
									</div>
								</div>

								<div className="modal fade modalHide" id="showstatus" role="dialog">
	                                <div className="modal-dialog modal-lg" role="document">
	                                  <div className="modal-content modalContent col-lg-12 nopad">
	                                    <div className="modal-header userHeader notesheader">
			                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.updateStudentNotifctn.bind(this)}>
			                                  <span aria-hidden="true">&times;</span>
			                                </button>
	                               			<h4 className="modal-title" id="exampleModalLabel">Important Notice</h4>
	                              		</div>
	                                    <div className="modal-body">
	                                        <form className="newTemplateForm" >
	                                      <div className="row rowPadding">
	                                        <div className="">
	                                          <div className="form-group">
	                                          {/*!this.props.loading1 ?*/
	                                           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">  
	                                        	{
	                                        		this.state.Notificationstatus.map((notemsg,index)=>{  
	                                        			var textcontent = renderHTML(notemsg.content);				                           

	                                        			return(<ul className="" key={index}>

										                  <li>
										                  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
										                  		<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 createdatnotice">
										                    		<TimeAgo date= {notemsg.createdAt} />
										                    	</div>
										                  		<div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 createdatnotice notificationWrap">
																	{textcontent}
										                    	</div>
										                    </div>
										                  </li>
										                 
										                </ul>
										              )
	                                        		})
												}
	                                           </div>
	                                           // :
	                                           // <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">  
	                                           // 		Loading...
	                                           // </div>
	                                       }             
	                                          </div>  
	                                        </div>
	                                      </div>
	                                    </form>
	                                      </div>
	                                  	  <div className="modal-footer footerpadding ">
									        	<button type="button" className="btn btn-default col-lg-1 col-lg-offset-10" data-dismiss="modal" onClick={this.updateStudentNotifctn.bind(this)}>Got it</button>
									      </div>
	                                  </div>
	                                </div>
	                            </div>
		                        <div className="modal fade modalHide" id="showNotice" role="dialog">
	                                <div className="modal-dialog modal-lg" role="document">
	                                  <div className="modal-content modalContent col-lg-12 nopad showNoticeTop">
	                                    <div className="modal-header userHeader notesheader">
			                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.updateStudentTimeStatus.bind(this)}>
			                                  <span aria-hidden="true">&times;</span>
			                                </button>
	                               			<h4 className="modal-title" id="exampleModalLabel">Important Notice</h4>
	                              		</div>

	                                    <div className="modal-body">
	                                    <form className="newTemplateForm">
	                                      <div className="row rowPadding">
	                                        <div className="">
	                                          <div className="form-group">
	                                          {/*!this.props.loading2 ?*/
	                                           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
	                                        			<ul className="">

										                  <li>
										                  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
										                  		<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 createdatnotice">
										                    		System down{/*this.props.downtimestatus.text*/} 
										                    	</div>
										                  		
										                    	<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 createdatnotice">
																	On : 24/07/2019{/*this.props.downtimestatus.date*/}
										                    	</div>
										                    	<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 createdatnotice">
																	From : 01:00 pm{/*this.props.downtimestatus.startTime*/} to {/*this.props.downtimestatus.endTime*/}03:00 pm
										                    	</div>
										                    </div>

										                  </li>
										                 
										                </ul>
	                                        		
												
	                                           </div>
	                                           /*:
	                                           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">  
	                                           		Loading...
	                                           </div>*/
	                                       }             
	                                          </div>  
	                                        </div>
	                                      </div>

	                                    </form>

	                                      </div>
	                                  	  <div className="modal-footer footerpadding ">
									        	<button type="button" className="btn btn-default col-lg-1 col-lg-offset-10" data-dismiss="modal" onClick={this.updateStudentTimeStatus.bind(this)}>Got it</button>
									      </div>
	                                  </div>
		                                
	                                </div>
	                            </div>

						</div>
					</div>
				  </section>
				</div>
			:
				<div>
					<div>
						<div className="box-header with-border boxMinHeight  studDataNotExist whitebackground">
						 	Please Fill Registration Form <a href="/CreateStudReg"> Click Here </a> to Register.
						</div>
					</div>
				</div>
	  )}
	}
}export default StudentProfile;
