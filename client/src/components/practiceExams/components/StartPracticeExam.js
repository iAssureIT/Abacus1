import React, {Component} 	from 'react';
import { Link } 			from 'react-router-dom';
import $ 					from "jquery";
import axios 				from 'axios';
import moment 				from 'moment';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../css/PracticeExam.css';
declare var jQuery: any;

class StartPracticeExam extends (Component)  {
	constructor(props){
		super(props);
		this.state={
			questionArray	   : [],
			noOfQuestion       : '',
			totalMarks         : '',
			examStatus         : '',
			examTime           : '',
			examName           : '',
			myIndex            : '',
			'qIndex'           : 0,
			backarraowcnt      : '',
			defaultTime 	   : '10:00',
		}
		this.getTimefunction = this.getTimefunction.bind(this);	
		// this.goToNextPage    = this.goToNextPage.bind(this);	
	}

	componentWillMount(){

		const studentID = localStorage.getItem("user_ID");
		var practiceExamId = this.props.match.params.id;
		axios
			.get('/mypracticeexammasters/practiceExam/'+practiceExamId+'/'+studentID)
			.then((response)=>{
				this.getTimefunction(response.data.examTime,practiceExamId);
			})
			.catch(function(error){
				console.log(error)
			})
	}

	componentDidMount(){	

		var practiceExamId = this.props.match.params.id;			
		const studentID = localStorage.getItem("user_ID");

		axios
			.get('/mypracticeexammasters/practiceExam/'+practiceExamId+'/'+studentID)
			.then((response)=>{
				console.log("mypracticeexammasters = ",response.data);
				this.setState({
								noOfQuestion 		: response.data.totalQuestion,
								totalMarks 			: response.data.totalMarks,
								questionArray 		: response.data.answerArray,
								examStatus 			: response.data.examStatus,
								examTime 			: response.data.examTime,
								examName 			: response.data.examName,
							 });

			})
			.catch(function(error){
				console.log(error)
			})


				//======================================================
				// 		Here you write which options is prechecked.
				//======================================================

				var quesArray = this.state.questionArray;
				for(var i=0; i<quesArray.length; i++){
					quesArray[i].optionAcheck = false;
					quesArray[i].optionBcheck = false;
					quesArray[i].optionCcheck = false;
					quesArray[i].optionDcheck = false;

					if(quesArray[i].studAnswer !== ""){
						switch(quesArray[i].studAnswer){
							case "A" : quesArray[i].optionAcheck = "checked"; break;
							case "B" : quesArray[i].optionBcheck = "checked"; break;
							case "C" : quesArray[i].optionCcheck = "checked"; break;
							case "D" : quesArray[i].optionDcheck = "checked"; break;
						}
					}
				}

				if(i == quesArray.length){
					this.setState({
						questionArray : quesArray,
					});
				}


		axios
			.get('/mypracticeexammasters/practiceExam/'+practiceExamId)
			.then((response)=>{
				// console.log("visited Q  = ",response.data.lastVisitedQuestion);
				console.log("visited Q answer = ",response.data);
			// $('.'+response.data.lastVisitedQAnswer+'-'+response.data.lastVisitedQuestion).setAttr("checked", "checked");
				var nextQ = parseInt(response.data.lastVisitedQuestion) + 1
				if(!response.data.lastVisitedQuestion){
						this.setState(
						{
							qIndex: 0
						})
					}else{
						this.setState(
						{
							qIndex: nextQ
						})
					}


			})
			.catch(function(error){
				console.log(error)
			})


		// var exmId = FlowRouter.getParam("id");		
		// Meteor.call("getLastVisitedQuestion",exmId,(err,res)=>{
		// 	if(err){
		// 	}else{
		// 		if(res){
		// 			// console.log("last Visited----->",res.lastVisitedQAnswer);
		// 			if(!res.lastVisitedQuestion){
		// 				this.setState(
		// 				{
		// 					qIndex: 0
		// 				})
		// 			}else{
		// 				this.setState(
		// 				{
		// 					qIndex: res.lastVisitedQuestion+1
		// 				})
		// 			}
		// 		}
		// 	}
		// });	

		axios
			.get('/mypracticeexammasters/practiceExam/'+practiceExamId+'/'+studentID)
			.then((response)=>{
				console.log("mypracticeexammasters = ",response.data);
				this.setState({
								noOfQuestion 		: response.data.totalQuestion,
								totalMarks 			: response.data.totalMarks,
								questionArray 		: response.data.answerArray,
								examTime 			: response.data.examTime,
								examName 			: response.data.examName,
							 });
			})
			.catch(function(error){
				console.log(error)
			})


		// Meteor.call("getExamQuestions",FlowRouter.getParam('id'),(err,res)=>{
		// 	if(err){
		// 		cosnole.log(err);
		// 	}else{
		// 		// console.log(res);
		// 		this.setState({
		// 				noOfQuestion : res.noOfQuestion,
		// 				totalMarks : res.totalMarks,
		// 				questionArrayFromTC : res.questionArrayFromTC,
		// 				examTime : res.examTime,
		// 				examName : res.examName,
						
		// 			});
		// 	}
		// });
  
	}
	componentWillUnmount(){
    	// $("script[src='/js/adminLte.js']").remove();
    	// $("link[href='/css/dashboard.css']").remove();
  	}

	getPracticeAnswerbyStud(event){
		event.preventDefault();
		var checkedStatus = event.target.checked;
		var index  		  = event.target.getAttribute('data-qNum');
		var studAnswer    = event.target.getAttribute('id');
		var correctAnswer = event.target.getAttribute('data-right');
		var examTime 	  = $('.countdownWrap').text();
		var examId  	  = this.props.match.params.id;
		var nextQues	  = parseInt(index) + 1;

		if(studAnswer == correctAnswer){
			var answer = "Correct";
		}else{
			var answer = "Wrong";			
		}

		var formValues = {
			"examId"     : examId,
			"index"      : index,
			"studAnswer" : studAnswer,
			"examTime"   : examTime,
			"answer"     : answer,
		};

		console.log("getqNum = ",index," | studAnswer = ",studAnswer," | examTime = ",examTime," | examId = ",examId, " | Answer = ",answer);

		$('#ind'+(this.state.qIndex)).hide();
		$('.carousel-control-right').click();
		$('.carousel-control-left').click();		
		
		axios
			.post('/mypracticeexammasters',formValues)
			.then((response)=>{
				console.log("mypracticeexammasters1 = ",response.data);
				this.fillcolorwhenanswer(index,studAnswer);

				var quesArray = this.state.questionArray;
				switch(studAnswer){
					case "A" : quesArray[index].optionAcheck = "checked"; break;
					case "B" : quesArray[index].optionBcheck = "checked"; break;
					case "C" : quesArray[index].optionCcheck = "checked"; break;
					case "D" : quesArray[index].optionDcheck = "checked"; break;
				}

				this.setState({
					questionArray : quesArray,
				});


				jQuery('#mySlideShow').carousel(nextQues);
			})
			.catch(function(error){
				console.log("Error while selected answer = ", error)
			})
			// if(checkedStatus==true){
			// 	console.log("in check");	
			// 	jQuery('#mySlideShow').carousel({
			// 	    interval: 100
			// 	});
			// }
	}

	// after question solve question number will get filled by green color

	fillcolorwhenanswer(getqNum,studAnswer){
		$('#qn'+getqNum).addClass("greenClor");
	}

	componentDidUpdate(){
		$('.Yes').addClass("greenClor")
	}

	endExam(){
		console.log("end free exam");
		if(this.props.match.params.orderId && this.props.match.params.packageId && this.props.match.params.btnIndex){
		axios
			.post('/purchasedpackage/updatequespaper')
			.then((response)=>{
				console.log("updatequespaper = ",response.data);
				
			})
			.catch(function(error){
				console.log(error)
			})

			var quepaperID  = this.props.match.params.id;
            var orderId     = this.props.match.params.orderId?this.props.match.params.orderId:"";
            var packageID   = this.props.match.params.packageId?this.props.match.params.packageId:"";
            var index       = this.props.match.params.btnIndex?this.props.match.params.btnIndex:"";
            var studentID   = localStorage.getItem("user_ID");
	        var todayDate   = moment().format("MMM Do YY");
	        console.log("quepaperID= ",quepaperID," | orderId= ",orderId," | packageID= ",packageID," | index= ",index," | studentID= ",studentID," | todayDate= ",todayDate,)
	   		var values 		={
	                            quepaperID  : quepaperID,
	                            orderId     : orderId,
	                            packageID   : packageID,
	                            index       : index,
	                            studentID   : studentID,
	                            todayDate   : todayDate,
	                         }


        axios
			.post('/packagequestionpapermaster',values)
			.then((response)=>{
				console.log("updatequespaper = ",response.data);
				if("result" =="returnTrue"){
					this.props.history.push("/practiceExamResult/"+this.props.match.params.id);
				}
				else{
					this.props.history.push("/practiceExam/"+this.props.match.params.id);
				}					
			})
			.catch(function(error){
				console.log(error)
			})

		}else{

			axios
			.post('/mypracticeexammasters/finishexam/'+this.props.match.params.id)
			.then((response)=>{
				console.log("free paper response = ",response.data);
				this.props.history.push("/practiceExamResult/"+this.props.match.params.id)
			})
			.catch(function(error){
				console.log(error)
			})


		}
			

			
			
	}
	getTimefunction(examTime,id){
		if(examTime && id){
			clearInterval(interval);
			var interval = setInterval(()=>{
			// localstorage.setItem("interval",interval);
			  var timer = examTime.split(':');
			  var minutes = parseInt(timer[0], 10);
			  var seconds = parseInt(timer[1], 10);
			  --seconds;
			  minutes = (seconds < 0) ? --minutes : minutes;
			  if (minutes < 0){
			  		clearInterval(interval);
				  	// axios
			    //     	.post('/mypracticeexammasters/finishexam/'+id)
			    //     	.then((response)=>{console.log("finished practice exam");this.props.history.push("/practiceExamResult/"+id)})
			    //     	.catch(function (error) {console.log(error)})
			    this.endExam();
			  }else{
				  seconds = (seconds < 0) ? 59 : seconds;
				  seconds = (seconds < 10) ? '0' + seconds : seconds;
				  minutes = (minutes < 10) ?  minutes : minutes;
				  $('.countdown').html(minutes + ':' + seconds);
				  examTime = minutes + ':' + seconds;
				}
			}, 1000);
		}else{
			$('.countdown').html("No Internet");
		}

	}
	// routTimefunction(){
	// 	var id = this.props.match.params.id;

	// 	this.state.rout?
	// 	this.props.history.push("/practiceExamResult/"+id)
	// 	:null
	// }



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


		if(this.state.questionArray){
			if(this.state.examStatus!=="Completed"){	
				if(this.state.questionArray.length>1){				
				return(
					<div>
				        <div className="content-wrapper content-wrapperexampaper content-wrapperexampaperstudent">
					        <section className="content-header1"></section>
					        <section className="content viewContent">
					            <div className="row">
					                <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
							            <div>
							            	<div><br/>
											<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 colpadding">
												<div className="col-lg-12 col-md-12 examDetailsWrap marginAuto">
												    <div className="col-lg-3 col-md-3"></div>
													<div className="col-lg-3 col-md-3 col-sm-3 examDetailsWrap1">{this.state.examName}</div>
													<div className="col-lg-3 col-md-3 col-sm-3 examDetailsWrap2">Total Questions : {this.state.noOfQuestion}</div>
													<div className="col-lg-3 col-md-3 col-sm-3 examDetailsWrap3">Total Marks :  {this.state.totalMarks}</div>
													<div className="col-lg-1 col-md-1 col-sm-1 countdownWrapDiv">
														<span className=" countdown countdownWrap"></span>
													</div>
												</div>		
											</div>
							            	<div>
							              	<div className="CountIncrement">0</div>
											<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 colpadding paddingTopBoard">
												<div className="col-md-2 col-sm-2 col-xs-2 colpadding paddingTop">
													<img src="/images/leftboy.png" className="examstdHeight"/>

												</div>
												<div id="mySlideShow" ref={(ele)=> this.mySlideShow = ele} className="col-lg-8 col-md-8 col-sm-8 carousel mySlideShowbg1 slide" data-ride="carousel" data-interval="false">
									  
													<ol id="configuration_sidebar_content1" className="carousel-indicators oesCarouselIndicator">
															{ this.state.questionArray.map( (slides,index)=>{
																	if(this.state.qIndex!==0){
																		if(index == this.state.qIndex){
																			var activeStatus = 'active';
																		}else{
																			var activeStatus = '';
																			var hideSlideDetail = "hideSlidDetails";
																		}
																	}else{
																		if(index == 0){
																			var activeStatus = 'active';
																		}else{
																			var activeStatus = '';
																			var hideSlideDetail = "hideSlidDetails";
																		}

																	}
																if(index <this.state.questionArray.length-1){
																return (
																		<li data-target="#mySlideShow" key={index} data-slide-to={index} name={index} className={activeStatus, "A-"+index, slides.attempted} id={"qn"+slides.questionNumber} >{index+1}</li>
																	);
																}else{
																	return (
																		<li data-target="#mySlideShow" key={index} data-slide-to={index} name={index} className="examFinishBtnnn">Finish</li>
																		);
																}
															  }) 
															}
														</ol>

													<div className="carousel-inner">
														{ this.state.questionArray.map( (slides,index)=>{
															
															if(index == this.state.qIndex){
																var activeStatus = 'active';
															}else{
																var activeStatus = '';
																var hideSlideDetail = "hideSlidDetails";
															}
															
															if(index < this.state.questionArray.length-1){													
															//--------- align question verrtical  -------------//
																var questionArr = slides.question;
																if(questionArr){
																	var questionArray =[];
																	for(var i=0; i<questionArr.length; i++){
																		if((questionArr[i]%1)===0) {

																			questionArray.push(
																				<span className="quesDig" key={i}>{questionArr[i]} </span>
																			);
																		}else{
																			questionArray.push(
																				<span className="arithmeticOpe" key={i}>{questionArr[i]} <br/></span>
																			);
																		}
																	}

																}
															//--------- align question verrtical  -------------//
																													 
															return (														
																     <div id={"ind"+index} className={"item itemCustomT "+ activeStatus} key={index}>
																	      <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-12 sliderTitles">
																	      	<div className="col-lg-6 col-lg-offset-2 col-md-offset-2 col-sm-6 col-sm-offset-2 col-md-6 col-xs-9 questionTitWrapp">Question No. <span className="questionTitsubWrap">{index+1} :</span> </div>
																			<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 questionTitsubWrap">{questionArray}</div>
																	      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  questionAnsWrapp2">
																	      	Answers : 
																	      </div>
																	      	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 answerWrapSlide">
																	      	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 answerOption">
																		      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 answerBottom">
																		      	<label className="col-lg-8 col-md-8 col-sm-8 col-xs-8 containerr">
																				  <input type="radio" name="questionOption" id="A" className={"A-"+index} data-qNum={slides.questionNumber} data-right={slides.correctAnswer} onClick={this.getPracticeAnswerbyStud.bind(this)} checked={slides.optionAcheck}/>
																				  <span className="checkmarkk"></span>
																				  <span className=" quesAnswerOpt">{slides.A}</span>
																				</label>
																		   	   </div>
																		      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 answerBottom">
																		      	<label className="col-lg-8 col-md-8 col-sm-8 col-xs-8 containerr">
																				  <input type="radio" name="questionOption" id="B" className={"B-"+index} data-qNum={slides.questionNumber} data-right={slides.correctAnswer} onClick={this.getPracticeAnswerbyStud.bind(this)}  checked={slides.optionBcheck}/>
																				  <span className="checkmarkk"></span>
																				  <span className=" quesAnswerOpt">{slides.B}</span>
																				</label>
																		      </div>
																		      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 answerBottom">
																		      	<label className="col-lg-8 col-md-8 col-sm-8 col-xs-8 containerr">
																				  <input type="radio" name="questionOption" id="C" className={"C-"+index} data-qNum={slides.questionNumber} data-right={slides.correctAnswer} onClick={this.getPracticeAnswerbyStud.bind(this)}  checked={slides.optionCcheck}/>
																				  <span className="checkmarkk"></span>
																				  <span className=" quesAnswerOpt">{slides.C}</span>
																				</label>
																		      </div>
																		      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 answerBottom">
																		      	<label className="col-lg-8 col-md-8 col-sm-8 col-xs-8 containerr">
																				  <input type="radio" name="questionOption" id="D" className={"D-"+index} data-qNum={slides.questionNumber} data-right={slides.correctAnswer} onClick={this.getPracticeAnswerbyStud.bind(this)}  checked={slides.optionDcheck}/>
																				  <span className="checkmarkk"></span>
																				  <span className=" quesAnswerOpt">{slides.D}</span>
																				</label>
																		      </div>
																   		  </div> 
																		  </div>    
														      			</div>
																	  </div> 
																);
															}else{
																return (<div id={"ind"+index} className={"item "+ activeStatus} key={index}>
																      	
																      <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-12 sliderTitles finishSlideWrap">
																		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
																		      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 finishText">
																		      	{slides.finishText}
																		      </div>
																		</div>
																		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
																		      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 answerBottom finishsubText">
																		      	{slides.finishSubtext}
																		      </div>
																		</div>
																		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
																		    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 finishBttn">
																				<button className="showNextWindowButtow btn btn-primary" onClick={this.endExam.bind(this)}>finish Exam{slides.finish_button}</button>
																			</div>
																		</div>
																	  </div>
																	</div>
																);
															}
														  }) 
														}
													</div>
													<Link className="left carousel-control controlRL" to="#mySlideShow" data-slide="prev">
													    <span className="glyphicon glyphicon-chevron-left"></span>
													    <span className="sr-only">Previous</span>
													</Link>
													<Link className="right carousel-control carousel-control-right controlRL" to="#mySlideShow" data-slide="next" >
													    <span className="glyphicon glyphicon-chevron-right"></span>
													    <span className="sr-only">Next</span>
													</Link>
												</div>
												<div className="col-md-2 col-sm-2 col-xs-2 colpadding paddingTop">
												<img src="/images/rightgal.png" className="examstdHeight"/>
												</div>
											</div>
											<div className="col-lg-12 col-md-12 col-sm-12 showNextButtonWrap">
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
				}else{
					return (
						<div>			
					        <div className="content-wrapper">
					          	<section className="content-header">
					            	{/*<h1>Answer Sheet</h1>*/}
					          	</section>
						        <section className="content viewContent">
						            <div className="row">
						              	<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
						                	<div className="box">
						                  		<div className="box-header with-border boxMinHeight  loadingImgWrap">
												 	<h3 className="examFinishedStatus examLoadingTimeDiv"> Loading please wait... </h3>
												 	{/*<img src="/images/preloader.gif"/>*/}
			    									<img className="loaderImageSize1" src="/images/loading1.gif" alt="loading"/>
												</div>
											</div>
										</div>
									</div>
								</section>
							</div>
						</div>
					);
				}
			}else{
				return (
					<div>
				        <div className="content-wrapper">
				            <section className="content viewContent">
				            	<div className="row">
				             	   <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
				                        <div className="box">
				                    		<div className="box-header with-border boxMinHeight  studDataNotExist">
												<div className="startExambox col-lg-offset-2 col-lg-8 col-md-offset-2 col-md-8 col-sm-offset-1 col-sm-10 col-xs-12">
													<div className="fontstyle"> You Have finished your practice test... Thank You !!!</div> 
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
		}else{
			return (
				<div>
			        <div className="content-wrapper">
			            <section className="content viewContent">
			            	<div className="row">
			             	   <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
			                        <div className="box">
			                    		<div className="box-header with-border boxMinHeight  studDataNotExist">
											<div className="startExambox col-lg-offset-2 col-lg-8 col-md-offset-2 col-md-8 col-sm-offset-1 col-sm-10 col-xs-12">
												<div className="fontstyle"> Loading please wait...</div> 
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
} export default StartPracticeExam;
