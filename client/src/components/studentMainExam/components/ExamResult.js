import React ,{ Component }	from 'react';
import $ 					from "jquery";
import moment 				from "moment";
import axios 				from 'axios';
// import './StartPracticeExamHeader';
import '../css/Exam.css';

class ExamResult extends(Component)  {
	constructor(props){
		super(props);
		this.state={
			'myIndex'      		: '',
			'backarraowcnt'		: '',
			percentage 			: '',
			mainExamResultData 	: [],
			'subscription'		: {},
			studImages 			: []
		}
	}
	componentDidMount(){
		var mainExamId = this.props.match.params.examId;

		axios
			.get('/myexammasters/examresult/'+mainExamId)
			.then((response)=>{
				console.log("Main Exam Result = ",response.data);
				this.setState({
					mainExamResultData  : response.data,
					percentage 		 	: response.data.percentage,
					studImages 			: response.data.studentImageArray
				})
			})
			.catch(function(error){
				console.log(error)
			})
	}
	componentWillUnmount(){
    	// $("script[src='/js/adminLte.js']").remove();
    	// $("link[href='/css/dashboard.css']").remove();
  	}
	
	render(){
	  if(this.state.mainExamResultData){
		return(
			<div>
			<div className="CountIncrement">0</div>
			<div className="CountDecreBackArrow">0</div>
		        {/* Content Wrapper. Contains page content */}
		        <div className="content-wrapper content-wrapperexampaper">
		     	  <section className="content-header1"></section>
		          <section className="content viewContent marg38">
		            <div className="row">
		              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
		                <div className="box">
		                {this.state.mainExamResultData !=="Not return Marks" ? 
		                  <div>
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<div className="col-lg-12 col-md-12 col-md-offset-3 examDetailsWrap">
									<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 examDetailsWrap1">{this.state.mainExamResultData.examName}</div>
									<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 examDetailsWrap2">Total Questions :{this.state.mainExamResultData.totalQuestion}</div>
									<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 examDetailsWrap3">Total Marks :{this.state.mainExamResultData.totalMarks}</div>
									<div className="col-lg-3  col-md-3 col-sm-3 col-xs-2"></div>
								</div>
								
							</div>
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 colpadding paddingTopBoard">
								<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 colpadding resultscreen">
									<img src="/images/leftsideimg.png" className=""/>
								</div>
								<div id="mySlideShowStartExam" className="col-lg-8 col-md-8 col-sm-8 col-xs-8 carousel slide " data-ride="carousel" data-interval="false">
									  <div className="carousel-inner">
									    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									    	{this.state.percentage >= 75 && this.state.percentage <=100 ?
												<h2 className="congrats">Excellent Work! </h2>
												:
												this.state.percentage >= 50 && this.state.percentage <=75 ?
													<h2 className="congrats">Good Job Done!</h2>
												:
												this.state.percentage >= 25 && this.state.percentage <=50 ?
													<h2 className="congrats">Need More Practice! </h2>
												:
												this.state.percentage >= 0 && this.state.percentage <=25 ?
													<span>
													<h2 className="congrats poorSec"> Sorry... Poor Job!! </h2>
													<h4 className="congrats">Best wishes for next exam! </h4>
													</span>
												:
													null
									    	}
									    </div>
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 examresultWrap">{moment().format('hh:mm a')} , {moment().format('DD MMM YYYY')} - {this.state.mainExamResultData.examType} Results</div>
										
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
											<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 congratsImgWrap congrats nopadding">
												{this.state.percentage >= 75 && this.state.percentage <=100 ?
												<img src="/images/congrats.gif" className="congratsImg"/>
												:
												this.state.percentage >= 50 && this.state.percentage <=75 ?
													<img src="/images/congrats.gif" className="congratsImg"/>
												:
												this.state.percentage >= 25 && this.state.percentage <=50 ?
													<img src="/images/needImprovement.gif" className="congratsImg"/>
												:
												this.state.percentage >= 0 && this.state.percentage <=25 ?
													<img src="/images/zeroMark.gif" className="congratsImg"/>
												:
													null
									    		}
											</div>
											<div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 resultSecWrap">
												<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
													<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 totalScore">
														Total Score : {this.state.mainExamResultData.totalScore}
													</div>
											   	</div>
												<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 markksWrap">
												
												
												</div>
											</div>
											<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 congratsImgWrap nopadding">
												
												{this.state.percentage >= 75 && this.state.percentage <=100 ?
												<img src="/images/congrats.gif" className="congratsImg"/>
												:
												this.state.percentage >= 50 && this.state.percentage <=75 ?
													<img src="/images/congrats.gif" className="congratsImg"/>
												:
												this.state.percentage >= 25 && this.state.percentage <=50 ?
													<img src="/images/needImprovement.gif" className="congratsImg"/>
												:
												this.state.percentage >= 0 && this.state.percentage <=25 ?
													<img src="/images/zeroMark.gif" className="congratsImg"/>
												:
													null
									    		}
									    	</div>
										</div>
										
									  </div>
									  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
											<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 studmarksSec">
												<div className="marksNameSec">Total Questions</div>
												<span className="marksSec1">{this.state.mainExamResultData.totalQuestion}</span>
											</div>
											<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 studmarksSec">
												<div className="marksNameSec">Attempted Questions</div>
												<span className="marksSec2">{this.state.mainExamResultData.attemptedQues}</span>
											</div>
											<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 studmarksSec">
												<div className="marksNameSec">Correct Answers</div>
												<span className="marksSec3">{this.state.mainExamResultData.correctAnswer}</span>
											</div>
											<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 studmarksSec">
												<div className="marksNameSec">Wrong Answers</div>
												<span className="marksSec4">{this.state.mainExamResultData.wrongAnswer}</span>
											</div>
							        	</div>									  
								</div>
								<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 colpadding">
									<img src="/images/rightsideimg.png"/>
								</div>
							</div>
							<div className="col-lg-2 col-md-2 col-sm-2 examDetailsWrap4 pull-right">{moment().format('hh:mm a')} <br/>{moment().format("DD-MM-YYYY")}</div>
								<div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3">
									{this.state.studImages ? this.state.studImages.map((images, index)=>{
										return <div key={index} className="col-lg-4 col-md-4 col-sm-4 imageWraper">
											<img src={images.studentImage} className="col-lg-12 col-md-12 img-thumbnail"/>
										</div>
										}) : null
									}
								</div>
						  	</div>
						:null
						}
						</div>
					</div>
				</div>
				  </section>
				</div>
			</div>
			);
		}else{
			return(
			<div>
				<div className="CountIncrement">0</div>
				<div className="CountDecreBackArrow">0</div>
		        {/* Content Wrapper. Contains page content */}
		        <div className="content-wrapper">
		          {/* Content Header (Page header) */}
		          <section className="content-header">
		            <h1>Exam Page</h1>
		          </section>
		          {/* Main content */}
		          <section className="content viewContent">
		            <div className="row">
		              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
		                <div className="box">
		                  <div className="box-header with-border boxMinHeight ">
		                  	<h1 className="col-lg-12 col-md-12 col-sm-12 examFinishedStatus">Loading... Please Wait </h1> 
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
}
export default ExamResult;



