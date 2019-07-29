import React, { Component } from 'react';
import {render} 			from 'react-dom';
import swal 				from 'sweetalert';
import $ 					from "jquery";
import { Link } 			from 'react-router-dom';
import axios 				from 'axios';
import moment 				from 'moment';
import Webcam 				from 'react-webcam';

import '../css/common.css';
import CompetitionDetailsforPayment from '../../../components/myAccount/components/CompetitionDetailsforPayment.js';

class StudentRegistrationforCompetition extends Component  {

	constructor(){
	  super();
	    this.state = {
	    	'defaultTime'			: '00:15',
			'defaultBtnTime'		: '00:15',
			showButton 				: true,
			showstartbtn 			: true,
			todayDate 				: moment().format('DD/MM/YYYY'),
			facilityPermission 		: 'waitingforResult',
	    	studentmasterdetails 	: [],
	    	competitionData 	 	: [],
	    }
	}
		componentDidMount(){
		var i = 0;
		const studentId = localStorage.getItem("user_ID");
		var array=[];
		var competitions 		= [];
		var studentCompetitions = [];
		var today           = new Date();
		var todayDate       = moment(today).format('L');
		var currentTime     = moment(today).format('LT');
		if(studentId){
			var k = 0;			
			axios
				.get('/studentmaster/details/'+studentId)
				.then((studentdata)=>{
						var studentData = studentdata.data;
						if(studentData==null){
							this.setState({
					  			studentRegStatus : "Not registered"
					  		})
						}else{
							this.setState({
					  			studentRegStatus : "Registered"
					  		})
							axios
								.get('/exammasters/list')
								.then((competitionData)=>{
										var competitionData = competitionData.data;
										if(competitionData){
											if(currentTime){
												for(i=0;i<competitionData.length;i++){
													if(competitionData[i] && studentData){
														competitionData[i].examDate = moment(competitionData[i].competitionDate).format('L');
														competitionData[i].EXAMDate = moment(competitionData[i].examDate).format("DD/MM/YYYY");
														competitionData[i].viewStatus = competitionData[i].competitionView;
														var ExamStartTime = moment(currentTime, 'h:mma');
														var ExamEndTime   = moment(competitionData[i].endTime, 'h:mma');
														if(today.getTime()<new Date(competitionData[i].competitionDate).getTime()){
															competitionData[i].examYear = "Accept";
														}else{
															competitionData[i].examYear = "NotAccept";
														}
														if(todayDate>competitionData[i].examDate){
															competitionData[i].examTimeStatus = "OldExam";
														}else if(todayDate<=competitionData[i].examDate){
															competitionData[i].examTimeStatus = "NewExam";
														}
														if(todayDate==competitionData[i].examDate && ExamStartTime>ExamEndTime){
															competitionData[i].timeStatus = "invalid";
														}else if(todayDate==competitionData[i].examDate && ExamStartTime<ExamEndTime){
															competitionData[i].timeStatus = "valid";
														}else{
															competitionData[i].timeStatus = "nextCompetition";
														}
														var studentCategory = competitionData[i].competitionExams;
														if(todayDate<=competitionData[i].examDate){
																competitionData[i].nextExamStatus = "Present"
														}else{
															competitionData[i].nextExamStatus = "Absent"
														}
														if(studentCategory){
															var index                = studentCategory.findIndex(data => data.subCategory == studentData.subCategory);
															var categoryWiseExamData = studentCategory[index];
															if(categoryWiseExamData){
																competitionData[i].examStartStatus = categoryWiseExamData.examStatus;
															}
														}
														competitions.push({
															'_id'                   : competitionData[i]._id,
															'competitionName'       : competitionData[i].competitionName,
															'competitionDate'       : competitionData[i].competitionDate,
															'startTime'             : competitionData[i].startTime,
															'endTime'               : competitionData[i].endTime,
															'examYear'              : competitionData[i].examYear,
															'examTimeStatus'        : competitionData[i].examTimeStatus,
															'timeStatus'            : competitionData[i].timeStatus,
															'nextExamStatus'        : competitionData[i].nextExamStatus,
															'examStartStatus'       : competitionData[i].examStartStatus,
															'competitionFees'       : competitionData[i].competitionFees,
															'competitionStatus'     : competitionData[i].competitionStatus,
															'examDate'              : competitionData[i].examDate,
															'studentPaymentStatus'  : 'unPaid',
															'lastInCompExamIdStatus' : '',
															'examDataStatus'        : '',
															'examId'                : '',
														});
													}//end of competitionData[i] && studentData
												}//end of for llo[]
												if(competitionData.length == competitions.length){	
													axios
															.get('/competitionregisterorder/mainexam/'+studentId)
															.then((competitionsList)=>{
																studentCompetitions = competitionsList.data;
																axios
																		.get('/myexammasters/dashboard/'+studentId)
																		.then((myexamres)=>{
																			var myexammasters = myexamres.data;
																			for(var sc = 0; sc < studentCompetitions.length; sc++){
																				var scindex = competitions.findIndex((data)=>{
																					return data._id == studentCompetitions[sc].competitionId
																				});
																				if(scindex > -1){
																					competitions[scindex].studentPaymentStatus = "paid";
																					var myemindex = myexammasters.findIndex((data)=>{
																									return data.competitionId == studentCompetitions[sc].competitionId
																								});
									

																					if(myemindex > -1){
																						competitions[scindex].examDataStatus = myexammasters[myemindex].examStatus;
																						competitions[scindex].examId = myexammasters[myemindex].examId;
																					}
																				}
																			}//end of for sc
																			if(sc >= studentCompetitions.length){
																				this.setState({
																					"competitionData" :competitions
																				});
																			}
																		})
																		.catch(function(error){
																			console.log("error",error);
																		});			
															})
															.catch(function(error){
																console.log("error",error);
															});							
												 }
											}//end of currentTime
										}
								})
								.catch(function(error){
									console.log("error",error);
								});
						}
				})
				.catch(function(error){
					console.log("error",error);
				});
		}
	}




	startExam(event){
		// event.preventDefault();
		navigator.getMedia = ( 
		// navigator.getUserMedia || // use the proper vendor prefix
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);
		navigator.getMedia({video: true}, function() {		

		}, function() {
		    swal("As per company's rule, Student will be not allowed to attempt the final exam without camera","","warning");
		});
		
	}

	gotoPreviousMainExam(event){
		var id = $(event.target).attr('id');
		var compId = $(event.target).attr('data-text');
		
	}

	MainExamComplete(event){
		var id = $(event.target).attr('id');
		swal({
			  title              : 'Are you sure?',
			  text               : 'You will not be able to attempt this exam!',
			  type               : 'warning',
			  showCancelButton   : true,
			  confirmButtonColor : '#dd6b55',
			  cancelButtonColor  : '#d44',
			  confirmButtonText  : 'Yes',
			  cancelButtonText   : 'No',
			  closeOnConfirm     : false
			}, function() {
			
		});
	}

// this function is assuming due to bab internet or internet is not available this function will execute
	tryLoadingAgain(){
		var examTime = this.state.defaultTime;
		var LoadingInterval = setInterval(function() {
		
			if(examTime){
			  	var timer = examTime.split(':');
			  	var minutes = parseInt(timer[0], 10);
			  	var seconds = parseInt(timer[1], 10);
			  	--seconds;
			  	minutes = (seconds < 0) ? --minutes : minutes;
			  	if(minutes < 0){
				  	clearInterval(LoadingInterval);
					$('.examLoadingTimeDiv').html("Please check your internet connection or refresh your exam window");
				}else{
				  	seconds = (seconds < 0) ? 59 : seconds;
					seconds = (seconds < 10) ? '0' + seconds : seconds;
					minutes = (minutes < 10) ?  minutes : minutes;
					$('.examLoadingTimeDiv').html("Exam is loading... Please Wait");
					examTime = minutes + ':' + seconds;
				}
			}
		}, 1000);
	}

// this function is assuming due to bab internet or internet is not available this function will execute
	tryLoadingAgainforBtn(){
		var examTime = this.state.defaultBtnTime;
		var LoadingInterval = setInterval(function() {
		
			if(examTime){
			  	var timer = examTime.split(':');
			  	var minutes = parseInt(timer[0], 10);
			  	var seconds = parseInt(timer[1], 10);
			  	--seconds;
			  	minutes = (seconds < 0) ? --minutes : minutes;
			  	if (minutes < 0){
				  	clearInterval(LoadingInterval);
					$('.examLoadingTimeDiv').html("Please check your internet connection or refresh your exam window");
			  	}else{
				  	seconds = (seconds < 0) ? 59 : seconds;
					seconds = (seconds < 10) ? '0' + seconds : seconds;
				  	minutes = (minutes < 10) ?  minutes : minutes;
				 	$('.examLoadingTimeDiv').html("Exam is loading... Please Wait");
				 	examTime = minutes + ':' + seconds;
				}
			}
		}, 1000);
	}

	
	render(){
		
			return(
			<div className="col-lg-12 col-md-12 col-sm-12">
				<div  className="col-lg-12  col-md-12 col-sm-12 practicetesttitle HO text-center">
					<div className="col-lg-12  col-md-12 studProfileTit23">
						<div className="col-lg-12  col-md-12">
							<i className="fa fa-file-text-o" aria-hidden="true"></i>&nbsp; Competition Details
						</div>
					</div>
					<div id="multiExamCarousel" className="carousel slide" data-ride="carousel">
						<Link className="col-lg-12 col-md-12 allExamlink" to="/MultipleComp" title="Click here to register for competitions"><button className="btn startexambtn1 startmultiexambtn1"><blink>List of competitions</blink></button></Link>
						<div className="crslDiv col-lg-10 col-lg-offset-1">
							<div className="carousel-inner">
								{this.state.competitionData.length>0 ?
									this.state.competitionData.map((competitionInfo,index)=>{	
									return(											
										<div className={index==0?"item active":"item"}  key={index}>
											<div className="fontstyle examtitlecolor"><b>{competitionInfo.competitionName}</b></div>
											<div className="fontstyle">On</div>
											<div className="fontstyle">{competitionInfo.EXAMDate}</div>
											<div className="fontstyle">{competitionInfo.startTime} To {competitionInfo.endTime}</div>
												{competitionInfo.studentPaymentStatus=="paid"?												            				
													this.state.todayDate < competitionInfo.examDate ?
														<div className="fontstyle" >												
															<div className="fontstyle">You have Paid {competitionInfo.competitionFees} Rs.</div>												
														</div>
													:
														!competitionInfo.lastInCompExamIdStatus?
															competitionInfo.examDataStatus=="Completed"?
																<div className="fontstyle" >												
																	<a href="/pastExamReports"> <button type="submit" className="btn startexambtn1 startmultiexambtn">Result</button></a>												
																</div>
															:
																competitionInfo.competitionStatus=="start"?
																	competitionInfo.examStartStatus=="start"?
																		<div className="fontstyle" >
																			<Link to={"/iAgreeAndStartExam/"+competitionInfo._id}> <button type="submit" onClick={this.startExam.bind(this)} className="btn startexambtn1 startmultiexambtn">Start Exam </button></Link>
																		</div>
																	:	
																		<div className="fontstyle" >
																			<div className="fontstyle">Your exam not started yet.</div>															
																		</div>
																:
																	this.props.todayDate>competitionInfo.examDate?
																		competitionInfo.examDataStatus=="Completed"?
																			<div className="fontstyle" >												
																				<a href="/pastExamReports"> <button type="submit" className="btn startexambtn1 startmultiexambtn">Result</button></a>												
																			</div>
																		:
																			<div className="fontstyle" >												
																				<div className="fontstyle">You have Paid {competitionInfo.competitionFees} Rs.</div>												
																			</div>
																	:
																		<div className="fontstyle" >																	
																			<div className="fontstyle">Competition not started yet</div>																	
																		</div>
														:
															competitionInfo.examDataStatus=="InComplete"?
																this.state.showButton ?
																	<div className="fontstyle" >
																		<a> <button type="submit"  className="btn startexambtn1 startmultiexambtn" data-text={competitionInfo._id} id={competitionInfo.examId} onClick={this.gotoPreviousMainExam.bind(this)}>Continue Exam </button></a>
																		{/*<a> <button type="submit"  className="btn startexambtn1 startmultiexambtn" id={competitionInfo.examId} onClick={this.MainExamComplete.bind(this)}>Discontinue Exam </button></a>*/}
																	</div> 
																:
																	<div className="fontstyle" >
																		<div className="fontstyle">Loading please wait...</div>
																	</div>
															:
																<div className="fontstyle" >												
																		<a href="/pastExamReports"> <button type="submit" className="btn startexambtn1 startmultiexambtn">Result</button></a>												
																</div>
												:
													competitionInfo.timeStatus=="valid" && competitionInfo.examYear=="NotAccept" ?
														<div className="fontstyle" >									
															<a href={`/competitionDetails/${competitionInfo._id}`} title="Click to register"><button className="btn startexambtn1 startmultiexambtn">Register for Competition</button></a>
														</div>
													:														            			
														competitionInfo.timeStatus=="invalid"  || competitionInfo.examYear=="NotAccept"?
															<div className="fontstyle" >
																<div className="fontstyle">Competition has finished</div>
															</div>
														:						            					            			
															<div className="fontstyle" >									
																<a href={`/competitionDetails/${competitionInfo._id}`} title="Click to register"><button className="btn startexambtn1 startmultiexambtn">Register for Competition</button></a>
															</div>
												}
										</div>)										
										})
								:
									<div className="fontstyle" >	
					    				<div>"Competition will coming soon"</div>
					    			</div>
								}
							</div>
						</div>
						<a className="left carousel-control multiExamLeft" href="#multiExamCarousel" data-slide="prev">
					      <span className="glyphicon glyphicon-chevron-left"></span>
					      <span className="sr-only">Pre</span>
					    </a>
					    <a className="right carousel-control multiExamLeft" href="#multiExamCarousel" data-slide="next">
					      <span className="glyphicon glyphicon-chevron-right"></span>
					      <span className="sr-only">Next</span>
					    </a>
					</div>
				</div>
			</div>
			);
		}
				
}export default StudentRegistrationforCompetition;
