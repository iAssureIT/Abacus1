import React, {Component} from 'react';
import axios from 'axios';

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
		var id = localStorage.getItem("user_ID");
		var competitionId = this.props.match.params.compId;
		axios
			.get('/exammasters/examInfo/' + competitionId + '/' + id)
			.then((response)=>{
				var competitionData 	=	response.data.competitionData;
				var competitionExams 	=	response.data.CompetitionExamData;
				var studentMasterData  	=	response.data.studentMasterData;
				if(competitionData && competitionExams){
					this.setState({
						competitionData 	:competitionData,
						competitionExams    : competitionExams,
						dateformat 			:response.data.dateformat,
					},()=>{
						if(this.state.competitionExams){
							this.setState({
								data : true
							})
						}else{
							this.setState({
								data : false
							})
						} 
					})
				}
				if(studentMasterData){
					this.setState({
						studentMasterData 	:studentMasterData,						
					})
				}
			})
			.catch(function(error){
				console.log("error",error);
			});
  	}

  	componentWillUnmount(){
    	
  	}

  	confirmPayment(event){
  		event.preventDefault();
		const studentID 	= localStorage.getItem("user_ID");
  		var competitionFees = this.refs.competitionFees.value;
  		var comp_id 		= this.refs.comp_id.value;
  		var QPId 			= this.refs.QPId.value;
  		var url  = window.location.origin;
  		var studentId = localStorage.getItem('user_ID');
		var data  = {
				    "url" : url,                	
					}
  		axios
			.post('/quickwalletmasters/exampurchase/'+studentId+'/'+comp_id+'/'+competitionFees,data)
			.then((response)=>{
				if(response.data){				
					window.location.replace(response.data);
				}
				
			})
			.catch(function(error){
				console.log("error",error);
			});
  	}

	render(){
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
											<input type="hidden" ref="QPId" name="QPId" value={this.state.competitionExams.questionPaperId}/>
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
	}
}
export default CompetitionDetailsforPayment;
