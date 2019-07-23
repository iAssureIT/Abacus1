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

			axios
		    	.get('/questionpapermasters/'+response.data.category+'/'+response.data.subCategory)
	            .then((response)=> {
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
		var paperArray 	= [];
		var obj;
		var updateData;

		var qpData = this.state.practiceQPData;
		 			if(qpData){	
		 				qpData.map((item,ind)=>{
		 					axios
								.get('/mypracticeexammasters/'+item._id+'/'+studentID)
								.then((response)=>{
									var examAttempt = response.data;
									if(examAttempt.length>0){

									array.push({
										ind : ind,
										pId : item._id,
										status : "Completed",
									});

									item.status = "Completed";

									}else{
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
		 			}
		 			this.setState({
		 				practiceQPData : qpData
		 			})

	}
	
	startPracticeExam(event){
		event.preventDefault();
		const studentID = localStorage.getItem("user_ID");
		this.setState({
						showButton		:false,
						showstartExamBtn:false,
					});
		var practiceExamId = event.target.value;
 		axios
			.post('/purchasedpackage/startpracticeexam/'+practiceExamId+'/'+studentID)
			
			.then((response)=>{

				this.props.history.push('/practiceExam/'+response.data.ID);
				
				this.setState({
					mypracticeexammasters :response.data
				});

			})
			.catch(function(error){

			})
		
	}
	gotoPreviousExam(event){
		var id = $(event.target).attr('id');
	}
	ExamComplete(event){
		var id = $(event.target).attr('id');
		
	}
	
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
		var statusArray= this.state.mypracticeexamstatus;
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

					                {
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
					  
									}
								</div>
							  </div>
							</div>
						  </section>
						</div>
			</div>
		);
		
	}
}
export default PracticeStartExam;

