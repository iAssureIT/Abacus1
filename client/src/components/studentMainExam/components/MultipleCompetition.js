import React, {Component} 	from 'react';
import {render} 			from 'react-dom';
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
			// competitionData: [{
			// 	_id : '',
			// 	competitionName : '',
			// 	competitionDate : '',
			// 	startTime : '',
			// 	endTime : '',
			// 	studentPaymentStatus : '',
			// 	examDate : '',
			// 	lastInCompExamIdStatus : '',
			// 	examDataStatus : '',
			// 	competitionStatus : '',
			// 	examStartStatus : '',
			// 	competitionFees : '',
			// 	timeStatus : '',
			// 	examYear : '',
			// 	competitionFees :'',
			// 	examId : ''
			// 	// PayDate : '',
			// 	// currentExamDate : '',
			// }],
		}
		
	}
	componentDidMount(){
		var i = 0;
		const studentId = localStorage.getItem("user_ID")/*"E6BRdJtHMF9a6p7KF"*/;
		var array=[];
		if(studentId){
			var k = 0;
			axios
				.get('/studentmaster/details/'+studentId)
				.then((student)=>{
					console.log('student ',student);
					const data = { 
							"todaydate" 	: new Date(),
							"subCategory"	: student.data.subCategory,
					};
					if(data){
						console.log('todatdate ',data);
						axios
							.post('/exammasters/listmainexam' , data)
							.then((myexamlist)=>{
								console.log('myexamlist ',myexamlist.data);
								// this.setState({
								// 	competitionData : myexamlist.data
								// });
								var allCompetitions = myexamlist.data;
								axios
										// .get('/competitionregisterorder/mainexam/2aWJfCyAeadLrvZ29')
										.get('/competitionregisterorder/mainexam/'+studentId)
										.then((response)=>{
											console.log('response=-----> ',response.data);
											var studentCompetitions = response.data;
											for(k = 0 ; k < studentCompetitions.length; k++){
												var index = allCompetitions.findIndex((data)=>{
													return data._id == studentCompetitions[k].competitionId
												});
												if(index > -1){
													// console.log('index ',index);
													allCompetitions[index].studentPaymentStatus = "paid";
													var compData = allCompetitions[index];
													axios
															.get('/myexammasters/participation/'+studentCompetitions[k].competitionId+'/'+studentId+'/'+index)
															.then((myexamres)=>{
																console.log("myexamres---->",myexamres);
																var myexamresData = myexamres.data;
																if(myexamresData.data.length > 0){
																if(allCompetitions[myexamresData.index]){
																	allCompetitions[myexamresData.index].examDataStatus = myexamresData.data[0].examStatus;
																	allCompetitions[myexamresData.index].examId  = myexamresData.data[0]._id;
																}
																	// array.push(allCompetitions[myexamresData.index]);

																}
																// console.log('in array ',array);
																// this.setState({
																// 	competitionData :array
																// 	// competitionData :allCompetitions
																// },()=>{
																// 	// console.log("in callback---->",this.state.competitionData[0].examDataStatus);
																// });

															})
															.catch(function(error){
																console.log("error",error);
															});
												}//end of index
																// console.log("all comp---array->",array);


											};//end of for
											// console.log('k ',k);
											// console.log('allCompetitions ',allCompetitions);
											if(k >= studentCompetitions.length){
												var dataArray = this.state.competitionData;
												dataArray = [...allCompetitions,...dataArray]
												console.log('in array ',dataArray);
												this.setState({
													competitionData :allCompetitions
												},()=>{
													console.log("in callback---->",this.state.competitionData[1].examDataStatus);
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
				})
				.catch(function(error){
					console.log("error",error);
				});
		}
	}
	componentWillUnmount(){
    	$("script[src='/js/adminLte.js']").remove();
    	$("link[href='/css/dashboard.css']").remove();
  	}

	startExam(event){
		event.preventDefault();
		navigator.getMedia = ( 
		// navigator.getUserMedia || // use the proper vendor prefix
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);
		navigator.getMedia({video: true}, function() {
		  // console.log("webcam is available");
		//   Meteor.call("StartExamCategoryWise",(error,result)=>{
		// 	if(error){
		// 		swal(error);
		// 	}else{
		// 		var id = result;
		// 		// console.log("id",id);
		// 		if(id){
		// 			// Meteor.call("updateMyExamFee",id); 
		// 			// location.reload();
		// 			FlowRouter.go('/startExam/'+id);
		// 		}else{
		// 			swal("Please start exam again","This is happened due to bad internet connection","warning");
		// 		}
		// 	}
		// });

		}, function() {
		    swal("As per company's rule, Student will be not allowed to attempt the final exam without camera","","warning");
		});
		
	}

	gotoPreviousMainExam(event){
	// 	var id = $(event.target).attr('id');
	// 	var compId = $(event.target).attr('data-text');
	// 	navigator.getMedia = ( 
	// 	// navigator.getUserMedia || // use the proper vendor prefix
 //        navigator.webkitGetUserMedia ||
 //        navigator.mozGetUserMedia ||
 //        navigator.msGetUserMedia);
	// 	navigator.getMedia({video: true}, function() {
	// 	  // console.log("webcam is available");
	// 	  FlowRouter.go("/startExam/"+id);
	// 	  }, function() {
	// 	  	FlowRouter.go('/iAgreeAndStartExam/'+compId);
	// 	    swal("As per our rule, you will be not allowed to attempt exam without camera","","warning");
	// 	});
	// 	// FlowRouter.go("/startExam/"+id);
	}

	MainExamComplete(event){
	// 	var id = $(event.target).attr('id');
	// 	swal({
	// 		  title              : 'Are you sure?',
	// 		  text               : 'You will not be able to attempt this exam!',
	// 		  type               : 'warning',
	// 		  showCancelButton   : true,
	// 		  confirmButtonColor : '#dd6b55',
	// 		  cancelButtonColor  : '#d44',
	// 		  confirmButtonText  : 'Yes',
	// 		  cancelButtonText   : 'No',
	// 		  closeOnConfirm     : false
	// 		}, function() {
	// 		Meteor.call("ExamFinished",id,(error,result)=>{
	// 			if(error){

	// 			}else{
	// 				FlowRouter.go("/iAgreeAndStartExam");
	// 				Meteor.call("removeTempCurMEStudData");
	// 			}
	// 		});

	// 	});
	// }

	// // this function is assuming due to bab internet or internet is not available this function will execute
	// tryLoadingAgain(){
	// 	 examTime = this.state.defaultTime;
	// 	var LoadingInterval = setInterval(function() {
		
	// 	if(examTime){
	// 	  var timer = examTime.split(':');
	// 	  var minutes = parseInt(timer[0], 10);
	// 	  var seconds = parseInt(timer[1], 10);
	// 	  --seconds;
	// 	  minutes = (seconds < 0) ? --minutes : minutes;
	// 	  if (minutes < 0){
	// 	  	clearInterval(LoadingInterval);
	// 		$('.examLoadingTimeDiv').html("Please check your internet connection or refresh your exam window");

	// 	  }else{
	// 	  	 seconds = (seconds < 0) ? 59 : seconds;
	// 		  seconds = (seconds < 10) ? '0' + seconds : seconds;

	// 		  minutes = (minutes < 10) ?  minutes : minutes;
	// 		 $('.examLoadingTimeDiv').html("Exam is loading... Please Wait");
	// 		  examTime = minutes + ':' + seconds;
	// 		}
	// 	}

	// 	}, 1000);
		
	// }

	// // this function is assuming due to bab internet or internet is not available this function will execute
	// tryLoadingAgainforBtn(){
	// 	 examTime = this.state.defaultBtnTime;
	// 	var LoadingInterval = setInterval(function() {
		
	// 	if(examTime){
	// 	  var timer = examTime.split(':');
	// 	  var minutes = parseInt(timer[0], 10);
	// 	  var seconds = parseInt(timer[1], 10);
	// 	  --seconds;
	// 	  minutes = (seconds < 0) ? --minutes : minutes;
	// 	  if (minutes < 0){
	// 	  	clearInterval(LoadingInterval);
	// 		$('.examLoadingTimeDiv').html("Please check your internet connection or refresh your exam window");

	// 	  }else{
	// 	  	 seconds = (seconds < 0) ? 59 : seconds;
	// 		  seconds = (seconds < 10) ? '0' + seconds : seconds;

	// 		  minutes = (minutes < 10) ?  minutes : minutes;
	// 		 $('.examLoadingTimeDiv').html("Exam is loading... Please Wait");
	// 		  examTime = minutes + ':' + seconds;
	// 		}
	// 	}

	// 	}, 1000);
		
	}
	


	render(){
		// console.log("competitionData render",this.state.competitionData);
			return(
				<div>
			        {/* Content Wrapper. Contains page content */}
			        <div className="content-wrapper">			         
			          <section className="content viewContent">
			            <div className="row">
			              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
			                <div className="box">
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
										            <th className="col-lg-4"> Status </th>
										            
										        </tr>
										    </thead>
										    {this.state.competitionData/*.length>0*/ ?
											    <tbody >
											     	{this.state.competitionData.map((competitionInfo,index)=>{
											     		// var comp = competitionInfo;
											     		// console.log("this.props.competitionInfo---->",competitionInfo);

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
																									{"qqqq"+competitionInfo.examDataStatus}
																										<a href={"/iAgreeAndStartExam/"+competitionInfo._id}> <button type="submit" onClick={this.startExam.bind(this)} className="btn startexambtn1">Start Exam </button></a>
																									
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
						    </div>
						  </div>
						</div>
					  </section>
					</div>
				</div>
			);
			/*}else{
				return(<div className="col-lg-12 col-md-12 col-sm-12 waitingResLoadingWrap">
				   <img className=" loaderImageSize1" src="/images/loading1.gif" alt="loading"/>
				</div>);
			}
		 }else if (this.state.facilityPermission == false ){
			  	return (<div>{FlowRouter.go('/noAccesss')}</div>);
		  }else if(this.state.facilityPermission == "waitingforResult"){
		  	return(<div className="col-lg-12 col-md-12 col-sm-12 waitingResLoadingWrap">
			   <img className="loaderImageSize1" src="/images/loading1.gif" alt="loading"/>
			</div>);
		  }else{ 
		  return (<div className="col-lg-12 col-md-12 col-sm-12 waitingResLoadingWrap">
				   <h3>You dont have access. Please <a href="/admin/AssignPermissionstoModules/ShowAll">click here </a> to assign permission</h3>
				</div>);
		}*/
	}
} export default MultipleCompetition;

// export default MultipleCompetitionContainer = withTracker(props =>{	
// 	clearInterval(Session.get("MainExaminterval"));
// 	const postHandle    = Meteor.subscribe("LoginInStudent",Meteor.userId());
// 	const LoadingTest   = !postHandle.ready();
// 	const postHandle3   = Meteor.subscribe("showLoginStudInCompleteExam");
// 	const loadingTest3  = !postHandle3.ready();
// 	// const postHandle2   = Meteor.subscribe("instruction_ME");
// 	// const loadingTest2  = !postHandle2.ready();
// 	var studentData     = StudentMaster.findOne({"studentId":Meteor.userId()})||{};
// 	var PostHandle      = Meteor.subscribe("latestCompetition");
// 	var loading         = !PostHandle.ready();
// 	var today           = new Date();
// 	var todayDate       = moment(today).format('L');
// 	var currentTime     = moment(today).format('LT');

// 	var competitionData = ExamMaster.find({},{sort:{"competitionDate":-1}}).fetch()||{};

// 	for(i=0;i<competitionData.length;i++){
// 		if(competitionData[i] && studentData){
// 			competitionData[i].examDate = moment(competitionData[i].competitionDate).format('L');
// 			competitionData[i].EXAMDate = moment(competitionData[i].examDate).format("DD/MM/YYYY");
// 			competitionData[i].viewStatus = competitionData[i].competitionView;
// 			var ExamStartTime = moment(currentTime, 'h:mma');
// 			var ExamEndTime   = moment(competitionData[i].endTime, 'h:mma');

// 			if(today.getTime()<(competitionData[i].competitionDate).getTime()){
// 				competitionData[i].examYear = "Accept";
// 			}else{
// 				competitionData[i].examYear = "NotAccept";
// 			}

// 			if(todayDate>competitionData[i].examDate){
// 				competitionData[i].examTimeStatus = "OldExam";
// 			}else if(todayDate<=competitionData[i].examDate){
// 				competitionData[i].examTimeStatus = "NewExam";
// 			}
// 			if(todayDate==competitionData[i].examDate && ExamStartTime>ExamEndTime){
// 				competitionData[i].timeStatus = "invalid";
// 			}else if(todayDate==competitionData[i].examDate && ExamStartTime<ExamEndTime){
// 				competitionData[i].timeStatus = "valid";
// 			}else{
// 				competitionData[i].timeStatus = "nextCompetition";
// 			}
// 			// console.log("competitionData[i].timeStatu",competitionData[2].competitionName,competitionData[2].timeStatus,competitionData[2].examYear);
// 			var studentCategory = competitionData[i].competitionExams;
			
// 			if(todayDate<=competitionData[i].examDate){
// 					competitionData[i].nextExamStatus = "Present"
// 				}else{
// 					competitionData[i].nextExamStatus = "Absent"
// 				}
// 		}
// 		competitionData[i].PayDate         = moment(competitionData[i].createdAt).format('MMM Do YYYY');
// 		competitionData[i].currentExamDate = moment(competitionData[i].examDate).format("DD/MM/YYYY");

// 		// console.log("studentCategory",studentCategory);
// 		if(studentCategory){
// 			var index                = studentCategory.findIndex(data => data.subCategory == studentData.subCategory);
// 			var categoryWiseExamData = studentCategory[index];
// 			if(categoryWiseExamData){
// 				competitionData[i].examStartStatus = categoryWiseExamData.examStatus;
// 			}
			
// 		}
		
// 		var PostHandleCROrder        = Meteor.subscribe("latestCRONew",competitionData[i]._id);
// 		var loadingCRO               = !PostHandleCROrder.ready();
// 		var isStudentRegisterForComp = CompetitionRegisterOrder.findOne({"studentId":Meteor.userId(),"competitionId":competitionData[i]._id,"status":"paid"})||{};
// 		// console.log("isStudentRegisterForComp",isStudentRegisterForComp);
// 		if(isStudentRegisterForComp && isStudentRegisterForComp._id){

// 			competitionData[i].studentPaymentStatus="paid";
// 			var PostHandleMyExam = Meteor.subscribe("showSinglePaperNew",isStudentRegisterForComp.competitionId);
// 			var loadingMyExam    = !PostHandleMyExam.ready();
// 			var examData         = MyExamMaster.findOne({"competitionId":isStudentRegisterForComp.competitionId,"StudentId":Meteor.userId()})||{};
// 		// console.log("examData",examData);
// 			if(examData){
// 				competitionData[i].examDataStatus = examData.examStatus;
// 				competitionData[i].examId         = examData._id;
// 			}
// 		}else{
// 			competitionData[i].studentPaymentStatus = "unPaid";
// 		}
// 		// var ME_Instruction = InstructionMaster.findOne({"instructionFor" : "Main Exam"})||{};
// 		var LastIncompleteExam = MyExamMaster.findOne({"StudentId":Meteor.userId(),"competitionId":isStudentRegisterForComp.competitionId,"examStatus" : "InComplete"})||{};
// 		if(LastIncompleteExam){
// 			var lastInCompExamId                      = LastIncompleteExam._id;
// 			competitionData[i].lastInCompExamIdStatus = lastInCompExamId;

// 		}else{
// 			lastInCompExamId = '';
// 			competitionData[i].lastInCompExamIdStatus='';
// 		}
// 	}
// 	// console.log("competitionData",competitionData);

// 	return {
		
// 		// ME_Instruction,
// 		// lastInCompExamId,
// 		loadingCRO,
// 		loadingMyExam,
// 		LoadingTest,
// 		// loadingTest2,
// 		loadingTest3,
// 		isStudentRegisterForComp,
// 		competitionData,
// 		// PayDate,
// 		todayDate,
// 		currentTime,
// 		studentData,
// 		loading,
// 		categoryWiseExamData,
// 		examData,
// 		// examDate,
// 		// nextExamStatus,
// 		// currentExamDate,
// 		// examTimeStatus,
// 		// timeStatus
// 	}

// })(MultipleCompetition);