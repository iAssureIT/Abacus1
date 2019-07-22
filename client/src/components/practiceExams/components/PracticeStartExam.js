import React, {Component} 	from 'react';
import { Link } 			from 'react-router-dom';
import $ 					from 'jquery';
import axios				from 'axios';

import '../css/PracticeExam.css';

class PracticeStartExam extends Component {
	constructor(props){
		super(props);
		this.state = ({
			showButton 			: true,
			showstartExamBtn 	: true,
			'defaultBtnTime' 	: '00:05',
			facilityPermission  : 'waitingforResult',
			instruction 		: 'Loading Instructions',
			practiceQPData 		: "",
			mypracticeexamstatus : [],
		});
	}

	componentWillMount(){

		const studentID = localStorage.getItem("user_ID");
		
		axios
			.get('/instructions/Practice Exam')
			.then((response)=>{
				this.setState({
					instruction :response.data[0].instruction
				});
			})
			.catch(function(error){
                console.log(error);
			})
		axios
			.get('/studentmaster/details/'+studentID)
			.then((response)=>{
				// console.log("A/A1 = ",response.data.category);

			axios
		    	.get('/questionpapermasters/'+response.data.category+'/'+response.data.subCategory)
	            .then((response)=> {
					// console.log("A/A1 = ",response.data);
	                this.setState({
			 			practiceQPData : response.data,
			 		},()=>{
			 			this.getStatus();
			 		});
	            })
	            .catch(function (error) {
	                console.log(error);
	            });

			})
			.catch(function(error){
                console.log(error);
			})
	}

	getStatus(){
		const studentID = localStorage.getItem("user_ID");
		var array 		= [];
		var paperArray 		= [];
		var obj;
		var updateData;

		var qpData = this.state.practiceQPData;
					// console.log("qpData qpData = ",qpData);
		 			if(qpData){	
		 				qpData.map((item,ind)=>{

		 					axios
								.get('/mypracticeexammasters/'+item._id+'/'+studentID)
								.then((response)=>{

									var examAttempt = response.data;
									// updateData = qpData.find((data)=>{
									// 	return data._id == item._id
									// })

									// item.status = 

									console.log("updateData----->",updateData);
									console.log("examAttempt----->",examAttempt);
									// console.log("my prac tice = ",examAttempt,item._id);

									if(examAttempt.length>0){

									array.push({
										ind : ind,
										pId : item._id,
										status : "Completed",
									});

									item.status = "Completed";

									}else{
										// data.freeExamStatus = "Not Completed"
									array.push({
										ind: ind,
										pId : item._id,
										status : "InComplete",
									});

									item.status = "InComplete";
								
									}
									this.setState({
										mypracticeexamstatus :array,
									},()=>{

									});
								})
								.catch(function(error){

								})


		 				})


		 				// for(var i=0;i<qpData.length;i++){
							// 		console.log("qpData tice = ",qpData[i]);

		 				// 	var data = qpData[i];
		 				// 	id = data._id;
		 				// 	if(id){
							// 		console.log("my ids= ",id);

					 	// 	axios
							// 	.get('/mypracticeexammasters/'+id+'/'+studentID)
							// 	.then((response)=>{

							// 		var examAttempt = response.data;
							// 		console.log("my prac tice = ",examAttempt,id);

							// 		if(examAttempt.length>0){

							// 		array.push({
							// 			ind : i,
							// 			pId : id,
							// 			status : "Completed",
							// 		});
							// 		}else{
							// 			// data.freeExamStatus = "Not Completed"
							// 		array.push({
							// 			ind: i,
							// 			pId : id,
							// 			status : "InComplete",
							// 		});
							// 		}
							// 		this.setState({
							// 			mypracticeexamstatus :array,
							// 		});
							// 	})
							// 	.catch(function(error){

							// 	})
							// }

							// data.freeExamStatus = "InCompleted"

		 				
		 			}

		 		

		 			this.setState({
		 				practiceQPData : qpData
		 			})


	}
	// componentWillMount(){
 //  // 		 Meteor.call("isAuthenticated","PracticeExam","StartFreePracticeExam",(err,res)=>{
	// 	// 	if(err){
	// 	// 		console.log(err);
	// 	// 	}else{
	// 	// 		if(res==true){
	// 	//           this.setState({
	// 	//              facilityPermission : res,
	// 	//           });
	// 	//         }else if(res==false){
	// 	//           this.setState({
	// 	//              facilityPermission : res,
	// 	//           });
	// 	//         }
	// 	// 	}
	// 	// });
 //  	}
	componentWillUnmount(){
    	// $("script[src='/js/adminLte.js']").remove();
    	// $("link[href='/css/dashboard.css']").remove();
  	}
	startPracticeExam(event){
		event.preventDefault();
		const studentID = localStorage.getItem("user_ID");
		this.setState({
						showButton		:false,
						showstartExamBtn:false,
					});
		var practiceExamId = event.target.value;
		// console.log("practiceExamId = ",practiceExamId);
		// this.props.history.push('/practiceExam/'+practiceExamId);

 		axios
			.post('/purchasedpackage/startpracticeexam/'+practiceExamId+'/'+studentID)
			// .get('/mypracticeexammasters/'+practiceExamId+'/'+studentID)
			.then((response)=>{

				this.props.history.push('/practiceExam/'+response.data.ID);
				// console.log("response start practiceeee ------= =========>",response);

				this.setState({
					mypracticeexammasters :response.data
				});

			})
			.catch(function(error){

			})

		// Meteor.call("checkExamISsolveToday",practiceExamId,(error,result)=>{
		// 	if(error){

		// 	}else{
		// 		// console.log("result",result);
		// 		if(result=="exist"){
		// 			this.setState({showstartExamBtn: true});
		// 			swal("Sorry !!!"+'\n'+"You have already attempted this exam.","Every exam has only one attempt in a day, You can attempt this exam on next day","warning");
		// 		}else{
		// 			Meteor.call("StartPracticeExam",practiceExamId,(error,result)=>{
		// 				if(error){
		// 					swal(error);
		// 				}else{
		// 					var id = result;
		// 					if(id){ 
		// 						FlowRouter.go('/practiceExam/'+id);
		// 					}
		// 				}
		// 			});
		// 		}
		// 	}

		// });
		
	}
	gotoPreviousExam(event){
		var id = $(event.target).attr('id');
		// FlowRouter.go("/practiceExam/"+id);
	}
	ExamComplete(event){
		var id = $(event.target).attr('id');
		// Meteor.call("practiceExamFinished",id,(error,result)=>{
		// 	if(error){

		// 	}else{
		// 		FlowRouter.go("/startPracticeExam");
		// 	}
		// });
	}
	// this function is assuming due to bab internet or internet is not available this function will execute
	tryPELoadingAgainforBtn(){
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
		// if(this.state.facilityPermission != 'waitingforResult' && this.state.facilityPermission == true){
		// 	$('.sidebar').css({display:'block',background: '#222d32'});
		//  if(this.state.showstartExamBtn){
			console.log("this.state.practiceQPData",this.state.practiceQPData);
		var statusArray= this.state.mypracticeexamstatus;
			// console.log("this.state.statusArray",statusArray);

		return(
			
			<div>
				<div className="CountIncrement">0</div>
					<div className="CountDecreBackArrow">0</div>
				        {/* Content Wrapper. Contains page content */}
				        <div className="content-wrapper">
				          {/* Content Header (Page header) */}
				          <section className="content-header">
				           	<h1>Start Practice Exam</h1> 
				          </section>
				          {/* Main content */}
				          <section className="content viewContent">
				            <div className="row">
				              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
				                <div className="box">

					                {/*!this.props.LoadingTest3 ?
					                  
					                	this.props.status =="paid" ?

					                		!this.props.loadingTest4 ?

					                			!this.props.lastExamId ?*/
					                 
					                				this.state.practiceQPData.length != 0 ?
										                <div className="box-header with-border boxMinHeight ">
															<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
																<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ExamInstructionWrap ">
																	<div className="col-lg-12 col-md-12 col-sm-12 col-sxs-12">
																		Instructions for Practice Exam : 
																	</div>
																</div>
																<div className="col-lg-12 col-md-11 col-sm-12 col-xs-12 instructionList instructionWrap">
																	{this.state.instruction}
																</div>
																<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 IagreeExamWrapC">
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 examTable">
															    	{this.state.practiceQPData.map((questionPaper,index)=>{
															    		
															    		return  <div className="col-lg-6 col-md-6 col-sm-6 col-lg-offset-3 col-md-offset-3 qpRow" key={index}>  
																		    		<div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 qpTestTitle"> {questionPaper.quePaperTitle}</div>
																		    		{	
																		    			(questionPaper.status=="Completed")?
																			    		<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
																			    			<Link to="/PractExamReports"><button type="submit" className="btn startexambtn leftpaddingzero" value={questionPaper._id} title="Click here to start exam">Result</button></Link>
																			    		</div>
																			    		:
																			    		<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
																			    			<button type="submit" className="btn btn-primary startBtnPE" name="PracticeExamName" ref="PracticeExamName" onClick={this.startPracticeExam.bind(this)} value={questionPaper._id}>Start</button>
																			    		</div>
																		    		
																			    	}
																		    	</div>
															    		})
															    	}															    
																	</div>
																</div>
															</div>
														</div>
									  				:
													  	<div className=" box-header with-border boxMinHeight  studDataNotExist">
										                	<div>
															 	Practice Exam not yet scheduled.
															</div>
									                    </div>
					    //                 		: 
					    //                 			this.state.showButton ? 
									//                   	<div className=" box-header with-border boxMinHeight  studDataNotExist">
									// 				  		<h3 className="col-lg-12 col-md-12 col-sm-12">It seems that you didn't complete your last exam. Do you wish to continue ? </h3>
									// 	                	<div>
									// 						 	<button className="btn btn-primary yesContinueBtn col-lg-2 col-lg-offset-4 col-md-2 col-md-offset-4 col-lg-sm col-sm-offset-4 " id={this.props.lastExamId} onClick={this.gotoPreviousExam.bind(this)}>Yes, continue</button> &nbsp;&nbsp;&nbsp;&nbsp;
									// 						 	<button className="btn btn-danger notContinueBtn col-lg-2 col-md-2  " id={this.props.lastExamId} onClick={this.ExamComplete.bind(this)}>No</button>
									// 						</div>
									//                    </div>
					    //                				: 
									//                   	<div className="box-header with-border boxMinHeight  studDataNotExist loadingImgWrap">
									// 		            	<div>
									// 						 	Loading please wait...!!! 
									// 						</div>
									// 					 	<img src="/images/preloader.gif"/>
									// 		            </div>
													  	
									//  		:
									// 		 	<div className="box-header with-border boxMinHeight  studDataNotExist loadingImgWrap">
									//             	<div>
									// 				 	Loading please wait...!!! 
									// 				</div>
									//             </div>
						                
									//   	:
									// 	  	<div className=" box-header with-border boxMinHeight  studDataNotExist">
							  //               	<div>
									// 			 	Complimentary free exams are available only after you registered for competition. 
									// 			</div>
									// 			<div>
									// 			 	<a className="blueLabel" href="/MultipleComp"> Click Here </a> to Register for competitions.
									// 			</div>
						   //                  </div>
									// :
									// 	<div className="box-header with-border boxMinHeight  studDataNotExist loadingImgWrap">
							  //           	<div>
									// 		 	Loading please wait...!!! 
									// 		</div>
									// 	 	<img src="/images/preloader.gif"/>
							  //           </div>
									}
								</div>
							  </div>
							</div>
						  </section>
						</div>
			</div>
		);
		// }else{
		// 	return(
		// 		<div>
		// 	        {/* Content Wrapper. Contains page content */}
		// 	        <div className="content-wrapper">
		// 	          {/* Content Header (Page header) */}
		// 	          <section className="content-header">
		// 	            {!this.props.examMasterData ? 
		// 	            	<h1>Start Practice Exam </h1> 
		// 	            	: 
		// 	            	<h1>Start Practice Exam</h1>
		// 	            }
		// 	          </section>
		// 	          {/* Main content */}
		// 	          <section className="content viewContent">
		// 	            <div className="row">
		// 	              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
		// 	                <div className="box">
		// 					<div className="box-header with-border boxMinHeight  studDataNotExist">
		// 					    <div className="examLoadingTimeDiv">
		// 							{this.tryPELoadingAgainforBtn()}
		// 						</div>
		// 					</div>
		// 					</div>
		// 				  </div>
		// 				</div>
		// 			  </section>
		// 			</div>
		// 		</div>
		// 	);
		// }
		// }else if (this.state.facilityPermission == false ){
		// 	  	return (<div>{this.props.history.push('/noAccesss')}</div>);
		//   }else if(this.state.facilityPermission == "waitingforResult"){
		//   	return(<div className="col-lg-12 col-md-12 col-sm-12 waitingResLoadingWrap">
		// 	   <img className="loaderImageSize1" src="/images/loading1.gif" alt="loading"/>
		// 	</div>);
		//   }else{ 
		//   return (<div className="col-lg-12 col-md-12 col-sm-12 waitingResLoadingWrap"><h3>You don't have access.</h3></div>);
		// }
	}
}
export default PracticeStartExam;
// export default IAgreeAndStartExamContainer = withTracker(props=>{
	
// 	clearInterval(Session.get("interval"));
// 	const postHandle   = Meteor.subscribe("LoginInStudent",Meteor.userId());
// 	const LoadingTest  = !postHandle.ready();
// 	var studentData    = StudentMaster.findOne({"studentId":Meteor.userId()})||{};
// 	const postHandle2  = Meteor.subscribe("instruction_PE");
// 	const loadingTest2 = !postHandle2.ready();
// 	var postHandle3    = Meteor.subscribe("quesPaperPracticeExam");
// 	var LoadingTest3   = !postHandle.ready();
// 	const postHandle4     =  Meteor.subscribe('InCompletedExam');
// 	const loadingTest4    = !postHandle4.ready();

// 	const postHandleCompletedExam            =  Meteor.subscribe('CompletedExam',Meteor.userId());
// 	var LoadingTestpostHandleCompletedExam   = !postHandleCompletedExam.ready();

// 	const postHandle6     =  Meteor.subscribe('LoginStudTodaysExam',moment().format("DD/MM/YYYY"));
// 	const loadingTest6    = !postHandle6.ready();
// 	const postHandle5     =  Meteor.subscribe('loginUserPackageQP',Meteor.userId());
// 	const loadingTest5    = !postHandle5.ready();
// 	var PE_Instruction    = InstructionMaster.findOne({"instructionFor" : "Practice Exam"})||{};

// 	var PostHandleOrder = Meteor.subscribe("showAllCompRegOrder");
// 	var loadingOrder = !PostHandleOrder.ready();
// 	var isStudentRegisterForExam = CompetitionRegisterOrder.findOne({"studentId":Meteor.userId(),"status":"paid"})||{};


// 	const postHandleInCompletedExamStatus            =  Meteor.subscribe('showStudentInCompleteExam');
// 	var   LoadingTestpostHandleCompletedExam         = !postHandleInCompletedExamStatus.ready();

// 	var isStudentRegisterForMultipleExam = CompetitionRegisterOrder.find({"studentId":Meteor.userId(),"status":"paid"},{fields:{"competitionId":1}}).fetch()||{};
// 	if(isStudentRegisterForMultipleExam){
// 		var MultipleExamLength=isStudentRegisterForMultipleExam.length;
// 		if(MultipleExamLength>0){
// 			for(j=0;j<MultipleExamLength;j++){
	
// 				var MainExamAttemptedData = MyExamMaster.find({"StudentId":Meteor.userId(),"examStatus" : "InCompleted"},{fields:{"examStatus":1}}).fetch()||{}

// 			}
// 		}
// 	}
	
// 	if(MainExamAttemptedData){
// 		if(MainExamAttemptedData.length>0){
// 			var showFreeTest="Show";
// 		}else{
// 			var showFreeTest="Hide";
// 		}
// 	}
// 	var PostHandlePaidStudentStatus          = Meteor.subscribe("singleStudent");
// 	var loadingPaidStudentStatus             = !PostHandlePaidStudentStatus.ready();

// 	var studentInfo=StudentMaster.findOne({"studentId":Meteor.userId()},{fields:{"competitionPaymentStatus":1}})||{};
// 	 if(studentInfo){
// 	 	if(studentInfo.competitionPaymentStatus=="paid"){
// 	 		var studentPaid="Yes";
// 	 	}else{
// 	 		var studentPaid="No";
// 	 	}
// 	 }
// 		if(studentData.studentEmail && (showFreeTest=="Show" || studentPaid=="Yes")){
// 		var status = "paid";
// 			var practiceQPData =  QuestionPaperMaster.find({"category":studentData.category, "subCategory":studentData.subCategory, "examType" : "Practice Exam","isDraft":"","paperStatus" : "Assigned"}).fetch();
// 			if(practiceQPData.length>0){
// 				var practiceQPDataLength=practiceQPData.length;
// 				for(k=0;k<practiceQPDataLength;k++){
// 					var paperData = MyPracticeExamMaster.findOne({"StudentId":Meteor.userId(),"examPaperId":practiceQPData[k]._id},{fields:{"examStatus":1}})||{};
// 					if(paperData){
// 						if(paperData.examStatus=="Completed"){
// 							practiceQPData[k].freeExamStatus="Completed";
// 						}else{
// 							practiceQPData[k].freeExamStatus="InCompleted";
// 						}
// 					}
// 				}
// 			}

// 			var myPracticeExamMasterData = MyPracticeExamMaster.findOne({"StudentId":Meteor.userId(),"examStatus":"InCompleted"})||{};
// 			var myPEMSEStatus = MyPracticeExamMaster.find({"StudentId":Meteor.userId(),"date":moment().format("DD/MM/YYYY")}).fetch();
		
// 			var PackageQPMData = PackageQuestionPaperMaster.find({"buyerId":Meteor.userId()}).fetch();
// 			if(myPracticeExamMasterData){
// 				var lastExamId = myPracticeExamMasterData._id;
// 			}else{
// 				var lastExamId = '';
// 			}
// 	}else{
// 		var status = '';
// 		var practiceQPData = [];
// 	}
	
// 	return {
// 		LoadingTest,
// 		loadingTest2,
// 		LoadingTest3,
// 		loadingTest4,
// 		practiceQPData,
// 		status,
// 		PE_Instruction,
// 		lastExamId,
// 		PackageQPMData,
// 		myPEMSEStatus
// 	}

// })(PracticePracticeStartExamStartExam);
