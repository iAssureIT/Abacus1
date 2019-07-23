import React, {Component} 	from 'react';
import {render} 			from 'react-dom';
import {Link} 				from 'react-router-dom';
import swal 				from 'sweetalert';
import $ 					from "jquery";
import axios 				from 'axios';
import moment				from 'moment';

var returnList = [{
	_id : '',
	competitionName : '',
	competitionDate : '',
	startTime : '',
	endTime : '',
	studentPaymentStatus : '',
	examDate : '',
	lastInCompExamIdStatus : '',
	examDataStatus : '',
	competitionStatus : '',
	examStartStatus : '',
	competitionFees : '',
	timeStatus : '',
	examYear : '',
	competitionFees :'',
	examId : ''
	// PayDate : '',
	// currentExamDate : '',
}];
class MultipleCompetition extends (Component)  {

	constructor(props){
		super(props);
		this.state={
			'defaultTime':'00:15',
			'defaultBtnTime':'00:15',
			showButton:true,
			showstartbtn: true,
			facilityPermission : 'waitingforResult',
			todayDate : moment(new Date()).format('L'),
			competitionData: [], 
			studentRegStatus : "Registered",
			
		}
		
	}
	componentDidMount(){
		clearInterval(localStorage.getItem("MainExaminterval"));
		localStorage.removeItem("MainExaminterval");		
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
																					competitionData :competitions
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
		event.preventDefault();
		navigator.getMedia = ( 
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);
		navigator.getMedia({video: true}, function() {
		  	const studentId = localStorage.getItem("user_ID");
				var compId = $(event.target).attr('data-id');
				axios
			        .post('/startexamcategorywise/'+compId+'/'+studentId)
			        .then((response)=>{						
						this.props.history.push('/startExam/'+response.data);
			        })
			        .catch(function(error){
			          	console.log(error);
			        })

		}, function() {
		    swal("As per company's rule, Student will be not allowed to attempt the final exam without camera","","warning");
		});
		
	}

	

	


	render(){
			return(
				<div>
			        {/* Content Wrapper. Contains page content */}
			        <div className="content-wrapper">			         
			          <section className="content viewContent">
			            <div className="row">
			              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
			                <div className="box">
			                {this.state.studentRegStatus=="Registered"?
			                  <div className="box-header with-border boxMinHeight">
			                   <div className="box-header with-border">
					            <h3 className="box-title">Register for competition</h3>
					            </div>
								<div className="col-lg-12  col-md-12 col-sm-12 col-xs-12 onlineSXWrap">
									
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 categoryTable">
					              		<table className="table table-striped formTable tab-Table">
										    <thead className="tableHeader">
										        <tr>
										            <th className="col-lg-1">Sr.No</th>
										            <th className="col-lg-3">Competition Name </th>										           
										            <th className="col-lg-2">Competition Date </th>										           
										            <th className="col-lg-2">Competition Time </th>										           
										            <th className="col-lg-4">Status </th>
										        </tr>
										    </thead>
										    {this.state.competitionData/*.length>0*/ ?
											    <tbody >
											     	{this.state.competitionData.map((competitionInfo,index)=>{
											     		

											    return (<tr key={index}>
											     			<td>{index+1}</td>
											     			<td>{competitionInfo.competitionName}</td>
											     			<td>{moment(competitionInfo.competitionDate).format("DD/MM/YYYY")}</td>
											     			<td>{competitionInfo.startTime}- {competitionInfo.endTime}</td>		
																 {competitionInfo.studentPaymentStatus=="paid" ?												            				
												            					this.state.todayDate < competitionInfo.examDate ?
																					<td >												
																						<div className="fontstyle">You have Paid {competitionInfo.competitionFees} Rs.</div>												
																					
																					</td>
																				:
																				
																				!competitionInfo.lastInCompExamIdStatus?
																				
																					competitionInfo.examDataStatus=="Completed"?
																						<td >
																																		
																							<a href="/pastExamReports"> <button type="submit" className="btn startexambtn1">Result</button></a>												
																						</td>
																					:
																					competitionInfo.competitionStatus=="start"?
																								competitionInfo.examStartStatus=="start"?
																									<td >
																									
																										<button type="submit" data-id={competitionInfo._id} onClick={this.startExam.bind(this)} className="btn startexambtn1"><Link to={"/iAgreeAndStartExam/"+competitionInfo._id} className="startexambtn1"> Start Exam </Link></button>
																									
																									</td>
																									:	
																									<td >
																										<div className="fontstyle">Your exam not started yet.</div>															
																									</td>
																							:

																							this.state.todayDate>competitionInfo.examDate?
																								competitionInfo.examDataStatus=="Completed"?
																								<div className="fontstyle" >												
																									<a href="/pastExamReports"> <button type="submit" className="btn startexambtn1">Result</button></a>												
																								</div>
																								:
																								<td >												
																									<div className="fontstyle">You have Paid {competitionInfo.competitionFees} Rs.</div>												
																								</td>
																							:
																							<td >
																							
																								<div className="fontstyle">Competition not started yet</div>
																							
																							</td>
																				:

																					competitionInfo.examDataStatus=="InComplete"?
																						this.state.showButton ?
																						<td >
																							<a> <button type="submit"  className="btn startexambtn1" data-text={competitionInfo._id} id={competitionInfo.examId} onClick={this.gotoPreviousMainExam.bind(this)}>Continue Exam </button></a>
																							{/*<a> <button type="submit"  className="btn startexambtn1" id={competitionInfo.examId} onClick={this.MainExamComplete.bind(this)}>Discontinue Exam </button></a>*/}
																						</td> 

																						:
																						<td >
																							<div>
																							 	{this.tryLoadingAgain()} 
																							</div>
																						</td>
																					:
																					<td >												
																							<a href="/pastExamReports"> <button type="submit" className="btn startexambtn1">Result</button></a>												
																					</td>

												            			:
												            			competitionInfo.timeStatus=="valid" && competitionInfo.examYear=="NotAccept" ?
												            				<td >										
																				<a href={`/competitionDetails/${competitionInfo._id}`} title="Click to register"><button className="btn startexambtn1">Register for Competition</button></a>
																			</td>

												            			:
																			competitionInfo.timeStatus=="invalid" || competitionInfo.examYear=="NotAccept" ?
																				<td >
																					<div className="fontstyle">Competition has finished</div>
																				</td>
																			:
												            					            			
																			<td >										
																				<a href={`/competitionDetails/${competitionInfo._id}`} title="Click to register"><button className="btn startexambtn1">Register for Competition</button></a>
																			</td>
																		}	     			
											     		</tr>)


															
											     		})
											     }
											    </tbody>
										    :
										    	<tbody className="OESDataNotAvailable">
									    			<tr>
									    				<td colSpan="5">"Competition will coming soon"</td>
									    			</tr>
									    		</tbody>
								    		}
										</table>
									</div>
								</div>
							  </div>

							  :
							  <div >
								<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
									<div className="box-header with-border boxMinHeight  studDataNotExist whitebackground">

									 	Please Fill Registration Form <a href="/CreateStudReg"> Click Here </a> to Register.
									</div>
								</div>							
							</div>
						}
						    </div>
						  </div>
						</div>
					  </section>
					</div>
				</div>
			);
			
	}
} export default MultipleCompetition;
