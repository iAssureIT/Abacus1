import React, {Component} from 'react';
import axios from 'axios';

// import {ExamMaster} from '/imports/studentMainExam/api/examMaster.js';
// import {StudentMaster} from '/imports/student/api/studentMaster.js';
// import {InstructionMaster} from '/imports/admin/forms/instructions/api/instructionMaster.js';

class CompetitionDetailsforPayment extends Component{
	constructor(props) {
	    super();
	    this.state = {
	    	competitionData 	: [],
	    	competitionExams 	: [],
	    	studentMasterData 	: [],
	    	dateformat 			: '',
	    	data 				: false,
	    }
	}
	componentDidMount(){
		// if ( !$('body').hasClass('adminLte')) {
		//   var adminLte = document.createElement("script");
		//   adminLte.type="text/javascript";
		//   adminLte.src = "/js/adminLte.js";
		//   $("body").append(adminLte);
		// }


		var id = localStorage.getItem("user_ID");

		var competitionId = this.props.match.params.compId;
		
		axios
			.get('/exammasters/exampurchase/'+competitionId+'/'+id)
			.then((response)=>{
				var competitionData 	=	response.data.competitionData;
				var competitionExams 	=	response.data.competitionData.competitionExams;
				var studentMasterData  	=	response.data.studentMasterData;
				for (var i = 0; competitionExams.length > i ; i++) {
					console.log(studentMasterData.category ,"==", competitionExams[i].category ,"&&", studentMasterData.subCategory ,"==",competitionExams[i].subCategory)

					if (studentMasterData.category == competitionExams[i].category && studentMasterData.subCategory == competitionExams[i].subCategory) {
						this.setState({
							competitionExams 	:competitionExams[i],
							data 				:true,
						})
					}else {
						this.setState({
							competitionExams 	:[],
							data 				:false,
						})
					}
				}
				this.setState({
					competitionData 	:competitionData,
					studentMasterData 	:studentMasterData,
					dateformat 			:response.data.dateformat,
				})
					console.log("competitionData= ",this.state.competitionData)
					console.log("competitionExams= ",this.state.competitionExams)
					console.log("studentMasterData= ",this.state.studentMasterData)
					console.log("dateformat= ",this.state.dateformat)
				
			})
			.catch(function(error){
				console.log("error",error);
			});
  	}

  	componentWillUnmount(){
    	// $("script[src='/js/adminLte.js']").remove();
    	// $("link[href='/css/dashboard.css']").remove();
  	}

  	confirmPayment(event){
  		event.preventDefault();

		const studentID 	= localStorage.getItem("user_ID");
  		var competitionFees = this.refs.competitionFees.value;
  		var comp_id 		= this.refs.comp_id.value;
  		var QPId 			= this.refs.QPId.value;

  		// var url  = window.location.protocol+window.location.hostname;
  		var url  = window.location.origin;
  		var studentId = localStorage.getItem('user_ID');
		var data  = {
				    "url" : url,                	
					}
				// console.log('formValues = ',formValues);
		console.log("url ----->",url,studentId,comp_id);

  		axios
			.post('/quickwalletmasters/exampurchase/'+studentId+'/'+comp_id+'/'+competitionFees,data)

			.then((response)=>{
				console.log('payment res = ',response.data);
				this.setState({
                    // window.location = response;
				});
			})
			.catch(function(error){
				console.log("error",error);
			});
  	}

	render(){
		// if(!this.props.loading && !this.props.loadingComp) {
		return(
			<div>
		        {/* Content Wrapper. Contains page content */}
		        <div className="content-wrapper">
		          {/* Content Header (Page header) */}
		          <section className="content-header">
		            <h1>Competition Details</h1>
		          </section>
		          {/* Main content */}
		          <section className="content viewContent">
		            <div className="row">
		              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
		                <div className="box">
		                  <div className="box-header with-border boxMinHeight">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		                  	{this.state.data == true ?
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 outerexambox">
								<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 rfoac">
		       						<h2 className="abacustitle">Registration for Online Abacus Competition</h2>
			       				</div>
		       					<div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 outerbox">
									<div className="col-lg-12 col-md-3 col-sm-6 col-xs-12 imgLogoWrapReg">
				       						<img src="/images/maatslogo.png" className="img-responsive"/>
				       				</div>
			       					<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
				       					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 rfoac">
				       						<h4 className="abacussubtitle blue">{this.state.competitionData.competitionName}</h4>
				       					</div>
			       					</div>
			       					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  examdetailbox">	
										<div className="col-lg-12 col-md-12 col-sm- col-xs-12">
											<div className="col-lg-offset-3 col-md-offset-3 col-lg-9 col-md-9 col-sm- col-xs-12 examdetailsubtitles examtitles">Exam Date &nbsp;&nbsp;&nbsp;: &nbsp;{this.state.dateformat}</div>
										</div>
										<div className="col-lg-12 col-md-12 col-sm- col-xs-12">
											<div className="col-lg-offset-3 col-md-offset-3 col-lg-9 col-md-9 col-sm- col-xs-12 examdetailsubtitles examtitles">
											Exam Time &nbsp;&nbsp;&nbsp;: &nbsp;{this.state.competitionData.startTime}&nbsp; TO&nbsp;&nbsp;{this.state.competitionData.endTime}
											</div>
										</div>
										<div className="col-lg-12 col-md-12 col-sm- col-xs-12">
											<div className="col-lg-offset-3 col-md-offset-3 col-lg-9 col-md-9 col-sm- col-xs-12 examdetailsubtitles1 examtitles">Category &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;{this.state.competitionExams.category}</div>
										</div>
										<div className="col-lg-12 col-md-12 col-sm- col-xs-12">
											<div className="col-lg-offset-3 col-md-offset-3 col-lg-9 col-md-9 col-sm- col-xs-12 examdetailsubtitles1 examtitles">Exam Duration &nbsp;:&nbsp;{this.state.competitionExams.examDuration} (Minutes)</div>
										</div>
										<div className="col-lg-12 col-md-12 col-sm- col-xs-12">
											<div className="col-lg-offset-3 col-md-offset-3 col-lg-9 col-md-9 col-sm- col-xs-12 examdetailsubtitles1 green">Competition Fees :&nbsp; <i className="fa fa-inr" aria-hidden="true"></i>&nbsp;{this.state.competitionData.competitionFees}</div>
											<input type="hidden" ref="competitionFees" name="competitionFees" value={this.state.competitionData.competitionFees}/>
											<input type="hidden" ref="comp_id" name="comp_id" value={this.state.competitionData._id}/>
											<input type="hidden" ref="QPId" name="QPId" value=""/*this.state.competitionExams.questionPaperId*//>
										</div>
									</div>
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 rfoac">
										<button className="btn btn-primary paybtn"  onClick={this.confirmPayment.bind(this)}>Pay &nbsp; <i className="fa fa-inr" aria-hidden="true"></i>&nbsp;{this.state.competitionData.competitionFees} to Register</button>
									</div>
									</div>
								</div>
							:
								<div className="nopadLeft text-center col-lg-12 col-md-12 col-sm-12 col-xs-12 noEarning MarginBottom20 noDataInvoiceList">Competition not created for your category({this.state.studentMasterData.category}/{this.state.studentMasterData.subCategory}).</div>
							}
						 	</div>
						  </div>
					    </div>
					  </div>
					</div>
				  </section>
				</div>
			</div>
			);
		// }else{
		// 	return(
		// 		<div>Loading... Please wait</div>
		// 	);
		// }
	}
}
export default CompetitionDetailsforPayment;
// export default CompetitionDetailsContainer = withTracker(props=>{
// 	const postHandle 	= Meteor.subscribe("LoginInStudent",Meteor.userId());
// 	const loading 		= !postHandle.ready();
// 	var studentMasterData = StudentMaster.findOne({"studentId":Meteor.userId()});
	

// 	var compId 			= FlowRouter.getParam('compId');
// 	var postHandleComp 	= Meteor.subscribe("singleCompetition",compId);
// 	var loadingComp    	= !postHandleComp.ready();
// 	var competitionData = ExamMaster.findOne({"_id":compId})||{};

	
// 	var dateformat = moment(competitionData.competitionDate).format('MMM Do YYYY');
// 	if(competitionData){
// 		var CompetitionExamData = competitionData.competitionExams;
// 		// console.log("CompetitionExamData",CompetitionExamData);
// 		}
// 		if(CompetitionExamData){
// 			var arrIndex = CompetitionExamData.findIndex(function(object,index){ return object.category == studentMasterData.category && object.subCategory == studentMasterData.subCategory});
// 			 CompetitionExamData = competitionData.competitionExams[arrIndex];

// 	}
// 	return{
// 		loading,
// 		competitionData,
// 		CompetitionExamData,
// 		dateformat,
// 		studentMasterData
// 	}
// })(CompetitionDetailsforPayment);