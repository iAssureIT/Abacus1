import React, {Component} from 'react';
import {render} from 'react-dom';
import axios from 'axios';
import swal from 'sweetalert';
import $ from "jquery";
import { BrowserRouter as Router,Link,Route,Switch } from 'react-router-dom';

// import {withTracker} from 'meteor/react-meteor-data';
// import { FlowRouter }   from 'meteor/ostrio:flow-router-extra';
// import {QuestionPaperMaster} from '/imports/admin/forms/setQuestionPaper/api/questionPaperMaster.js';
// import {InstructionMaster} from '/imports/admin/forms/instructions/api/instructionMaster.js';
// import {PackageQuestionPaperMaster} from '/imports/paymentProcess/api/packageQuestionPaperMaster.js';
// import {CompetitionRegisterOrder} from '/imports/student/api/competitionRegisterOrder.js';
// import { MyExamMaster } from '/imports/student/api/myExamMaster.js';
// import {StudentMaster} from '/imports/student/api/studentMaster.js';
// import {MyPracticeExamMaster} from '/imports/student/api/myPracticeExamMaster.js';
import '../css/common.css';

class PracticeStartExamForDashboard extends Component {
	constructor(props){
		super(props);
		this.state = ({
			showButton:true,
			showstartExamBtn : true,
			'defaultBtnTime' : '00:05',
			practiceQPData 	 : [],
			freeExamStatus 	 : [],
			studentID 		 : '',
			myArray 		 : [],
			myArray1 		 : []
		});
	}

	componentDidMount(){
		var newStateArray = [];
		const studentID = localStorage.getItem("user_ID");
	    	this.setState({
	    		studentID 	: studentID
	    	})

        axios
	    	.get('/competitionregisterorder/'+studentID)
            .then((response)=> {
                // console.log("-------competitionregisterorder222------>>",response.data);
                this.setState({
		 			practiceQPData1 : response.data,
		 		});
                // localStorage.setItem("token",response.data.token);
                // direct.setState({loggedIn:response.data.token})
            })
            .catch(function (error) {
                console.log(error);
            });

        axios
	    	.get('/myexammasters/incomplete/'+studentID)
            .then((response)=> {
                // console.log("-------myexammasters333------>>",response.data);
                this.setState({
		 			Notificationstatus : response.data,
		 		});
                // localStorage.setItem("token",response.data.token);
                // direct.setState({loggedIn:response.data.token})
            })
            .catch(function (error) {
                console.log(error);
            });

        axios
	    	.get('/studentmaster/details/'+studentID/*WyQY35LEFitPcabP6*/)
            .then((response)=> {
                // console.log("-----Category/subCategory------>>",response.data.category+'/'+response.data.subCategory);          
	        axios
		    	.get('/questionpapermasters/'+response.data.category+'/'+response.data.subCategory)
	            .then((response)=> {
	                // console.log("-------questionpapermasters444------>>",response.data);
	                this.setState({
			 			practiceQPData : response.data,
			 		},()=>{
				        var paperdata = this.state.practiceQPData;
				        if(paperdata){

				        	for(var i=0;i<paperdata.length;i++){
				        		var paperId = paperdata[i]._id;
				        // console.log("-----"+i+"----out-->>",paperdata[i]);
						        axios
								    .get('/mypracticeexammasters/'+paperdata[i]._id+'/'+studentID)
						            .then((response)=> {
						                console.log("-------mypracticeexammasters"+i+"------>>",response.data);
						                if(response.data.length>0){
							                var count = 0;
							                for (var j = 0; j < response.data.length; j++) {
							                	if(response.data[j].examStatus=='Completed'){
							                		count++;
							                	}
							                }
							                if(count==response.data.length){
										 			var status = 'Completed'
							                }else{
										 			var status =  'Incomplete'
							                }
						                }else{
									 			var status =  'Incomplete'
						                }
										 newStateArray.push({
										 	paperId:paperId,
										 	status : status
										 });

						        		console.log('myArray = ',newStateArray);
										this.setState({
												myArray: newStateArray
											},()=>{

											}); 
						            })
						            .catch(function (error) {
						                console.log(error);
						            });
				        	}
				        }
			 		});
		     //        for(var i=0;i>response.data.length;i++){
				   //      console.log("-----"+i+"------>>",response.data[i]._id)
			    //     axios
					  //   .get('/mypracticeexammasters/'+response.data[i]._id+/*vh5EWGeJf34k54XjF*/'/'+studentID /*uKRhdd7qS6ctjgK6s*/)
			    //         .then((response)=> {
			    //             console.log("-------mypracticeexammasters"+i+"------>>",response.data);
			                
			    //             var newStateArray = [];
			    //             if(response.data.length>0){
				   //              var count = 0;
				   //              for (var j = 0; j < response.data.length; j++) {
				   //              	if(response.data[j].examStatus=='Completed'){
				   //              		count++;
				   //              	}
				   //              }
				   //              if(count==response.data.length){
							//  			var status = 'Completed'
				   //              }else{
							//  			var status =  'Incomplete'
				   //              }
			    //             }else{
						 // 			var status =  'Incomplete'
			    //             }
			    //             newStateArray.push(status);
							// this.setState({
							// 	myArray: newStateArray
							// });
			    //     	console.log('myArray = ',newStateArray);

			    //         })
			    //         .catch(function (error) {
			    //             console.log(error);
			    //         });
			    //     }
	            })
	            .catch(function (error) {
	                console.log(error);
	            });
	        })
            .catch(function (error) {
                console.log(error);
            });
        axios
	    	.get('/mypracticeexammasters/incompleteexam/'+studentID /*rRDPwPwKJrCRtyY9X*/)
            .then((response)=> {
                // console.log("-------mypracticeexammasters666------>>",response.data);
                this.setState({
		 			Notificationstatus : response.data,
		 		});
                // localStorage.setItem("token",response.data.token);
                // direct.setState({loggedIn:response.data.token})
            })
            .catch(function (error) {
                console.log(error);
            });

		// if ( !$('body').hasClass('adminLte')) {
		//   var adminLte = document.createElement("script");
		//   adminLte.type="text/javascript";
		//   adminLte.src = "/js/adminLte.js";
		//   $("body").append(adminLte);
		// }
	}
	componentWillUnmount(){
    	// $("script[src='/js/adminLte.js']").remove();
    	// $("link[href='/css/dashboard.css']").remove();
  	}
	
	render(){ 
// console.log('myArray111 = ',this.state.myArray);

	if(this.state.practiceQPData){
		return(
			<div className="col-lg-12">
		        <div >
		          <section >
		            <div >
		              <div >
		                <div >
		                 	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								
								<form>
									<div className="col-lg-11 col-md-11 col-lg-offset-1 col-md-offset-1 col-sm-12 col-xs-12 IagreeExamWrapC">
										
										<div className="col-lg-12 ">
											<div className="col-lg-12 partitionline">
												<div className="col-lg-12  col-md-12 studProfileTit21">
												<i className="fa fa-file-text-o" aria-hidden="true"></i>&nbsp; Free Practice Tests
												</div>
											</div>
										</div>

										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 examTable">
						              		
											    <div className="pEListTable pEListTableScroll">
											    {/*console.log("this.state.practiceQPData",this.state.practiceQPData)*/}
											    	{this.state.practiceQPData.length>0?								
											    		this.state.practiceQPData.map((questionPaper,index)=>{
											    			console.log("questionPaper---------->",questionPaper);
												    	return (<ul className="col-lg-12 freePPaper" key={index}>													    			
													    			<li className="testtitle testtitlepadding col-lg-9"><i className="fa fa-circle bullet" aria-hidden="true"></i>&nbsp;{questionPaper.quePaperTitle}</li>
													    			{
													    				(this.state.myArray.status=="Completed" && this.state.myArray.paperId==questionPaper._id)?
													    				<Link to="/PractExamReports"><li className="testtitle col-lg-3"><button type="submit" className="btn startexambtn" value={questionPaper._id} title="Click here to start exam">Result</button></li></Link>
													    				:
													    				<Link to="/PracticeStartExam"><li className="testtitle col-lg-3"><button type="submit" className="btn startexambtn" value={questionPaper._id} title="Click here to start exam">Start</button></li></Link>
													    			}
													     		</ul>)
											    		})
											    		:
											    		<div className="col-lg-12 practicetesttitle1 fontstyle">Free Practice Tests Will be available after registering for competition </div>
											    	}
											    </div>
										</div>
									</div>
								</form>
							</div>
						  </div>
						</div>
					  </div>
				  </section>
				</div>
			</div>
			);
		}else{
			return(
				<div>Loading...</div>
			    // <img className="loaderImageSize1" src="/images/loading1.gif" alt="loading"/>
			)
		}
		
			
		
	}
}export default PracticeStartExamForDashboard;
// export default IAgreeAndStartExamContainer = withTracker(props=>{
// 	const postHandle   = Meteor.subscribe("LoginInStudent",Meteor.userId());
// 	const LoadingTest  = !postHandle.ready();
// 	var studentData    = StudentMaster.findOne({"studentId":Meteor.userId()})||{};

// 	// var postHandle3    = Meteor.subscribe("assignedPracticePaper");
// 	// var LoadingTest3   = !postHandle3.ready();

// 	const postHandle4  =  Meteor.subscribe('InCompletedExam');
// 	const postHandleCompletedExam            =  Meteor.subscribe('CompletedExam',Meteor.userId());
// 	var LoadingTestpostHandleCompletedExam   = !postHandleCompletedExam.ready();
// 	const postHandleInCompletedExamStatus            =  Meteor.subscribe('showStudentInCompleteExam');
// 	var   LoadingTestpostHandleCompletedExam         = !postHandleInCompletedExamStatus.ready();
// 	var PostHandleOrder          = Meteor.subscribe("paidStudentData");
// 	var loadingOrder             = !PostHandleOrder.ready();
// 	var isStudentRegisterForExam = CompetitionRegisterOrder.findOne({"studentId":Meteor.userId(),"status":"paid"})||{};
// 	// console.log("isStudentRegisterForExam",isStudentRegisterForExam);
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
// 			var postHandle3    = Meteor.subscribe("assignedPracticePaperSingle",studentData.category,studentData.subCategory);
// 			var LoadingTest3   = !postHandle3.ready();
// 			var status = studentData.status;
// 			var practiceQPData           =  QuestionPaperMaster.find({"category":studentData.category, "subCategory":studentData.subCategory, "examType" : "Practice Exam","isDraft":"","paperStatus" : "Assigned"},{fields:{"quePaperTitle":1}}).fetch();
// 			// console.log("practiceQPData",practiceQPData);
// 			if(practiceQPData.length>0){
// 				var practiceQPDataLength=practiceQPData.length;
// 				for(k=0;k<practiceQPDataLength;k++){
// 			// console.log("paperData id",practiceQPData[k]._id);

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
// 			// console.log("practiceQPData",practiceQPData);
	
// 		}else{
// 			var status = '';
// 			var practiceQPData = [];
// 			var myPracticeExamMasterData = '';
// 		}

// 	return {
// 		LoadingTest,
// 		// loadingTest2,
// 		LoadingTest3,
// 		// loadingTest4,
// 		practiceQPData,
// 		status,	
// 		isStudentRegisterForExam,
// 	}

// })(PracticeStartExamForDashboard);
