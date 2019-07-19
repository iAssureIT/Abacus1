import React, {Component} 	from 'react';
import Webcam 				from 'react-webcam';
import axios 				from 'axios';
import swal 				from 'sweetalert';
import { Link } 			from 'react-router-dom';
import moment 				from 'moment';
import S3FileUpload 		from 'react-s3';
import $ 					from 'jquery';

// import 'bootstrap/dist/js/bootstrap.min.js';
declare var jQuery: any;

class StartExam extends (Component)  {
	constructor(props){
		super(props);
		// console.log('this.props.id',this.props.id);
		this.state={
			'screenshot'		: null,
          	'tab'       		: 0,
          	'qIndex'    		: 0,
			config   			: '',
			'myIndex'   		: '',
			'backarraowcnt' 	: '',
			noOfQuestion 		: '',
			totalMarks 			: '',
			competitionName		: '',
			questionArrayFromTC : [],
			'defaultTime'  		: '02:15',
			examStatus 			: "",
			examStatus1			: "",
		}
		axios
	        .get('/projectsettings')
	        .then((response)=>{
				const config = {
							        bucketName 		: response.data.bucket,
							        dirName  		: 'photos',
							        region 			: response.data.region,
							        accessKeyId 	: response.data.key,
							        secretAccessKey : response.data.secret,
							    }
							    
				this.setState({
					config : config
				})
	        })
	        .catch(function(error){
	          	console.log(error);
	        })
	}

	componentWillMount(){

		navigator.getMedia = ( 
		// navigator.getUserMedia || // use the proper vendor prefix
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);
		navigator.getMedia({video: true}, function() {
		  // console.log("webcam is available");
		  
		  }, function() {
		  	this.props.history.push('/iAgreeAndStartExam');
		    swal("As per company's rule, Student will be not allowed to attempt the final exam without camera","","warning");
		});

		const studentId = localStorage.getItem("user_ID")/*"E6BRdJtHMF9a6p7KF"*/;
		var compId = this.props.match.params.compId;
		var examId = this.props.match.params.examId;
		$("#0").addClass('active');
				console.log('compId',compId);
				console.log('examId',examId);
		
		axios
	        .get('/myexammasters/participation/'+compId+'/'+studentId+'/0')
	        .then((response)=>{
				console.log('participation Info =',response.data);
				var responseData = response.data;
				var i = parseInt(response.data.data.length)- 1;
				
				this.showMainExamTime(responseData.data[i].examSolvingTime,responseData.data[i]._id);
				console.log(responseData.data[i].examSolvingTime,' = ',responseData.data[i]._id);
				
				this.setState({
					competitionName : responseData.data[i].competitionName 
				},()=>{})
				// this.props.history.push('/startExam/'+response.data);
	        })
	        .catch(function(error){
	          	console.log(error);
	          	$('.startExamBtn').css('display','Block');
				$('.wrProcessing').css('display','none');
	        })
	    axios
	        .get('/myexammasters/getmainexamquestions/'+examId+'/'+studentId)
	        .then((response)=>{	      
	          	var examStatus1 = response.data.examStatus;

// this function is taking screenshot and save it to myExamMaster
		if(examStatus1!=='Completed'){
		this.screenshotInterval = setInterval(()=>{
			const screenshot = this.webcam.getScreenshot();
			if(screenshot) {
			    var byteString;
			    if (screenshot.split(',')[0].indexOf('base64') >= 0)
			        byteString = atob(screenshot.split(',')[1]);
			    else
			        byteString = unescape(screenshot.split(',')[1]);
			    // separate out the mime component
			    var mimeString = screenshot.split(',')[0].split(':')[1].split(';')[0];
			    // write the bytes of the string to a typed array
			    var ia = new Uint8Array(byteString.length);
			    for (var i = 0; i < byteString.length; i++) {
			        ia[i] = byteString.charCodeAt(i);
			    }
			    var blob = new Blob([ia], {type:mimeString});
			    var x = Math.floor((Math.random() * 1000000000) + 10);
			    var imgFile = new File([blob], x+"studentImage.png");
			    console.log("file-->",imgFile);
			        var file=imgFile;
			        var documentType=examId;
			        if(file){       
			        var fileName  = file.name;    
	                    if (file,documentType) { 
	                    	console.log('Screenshot Captured');
	                    	S3FileUpload
							    .uploadFile(file,this.state.config)
							    .then((Data)=>{
							    	console.log("Data = ",Data);
							    	var input = {
							                        examId : examId,
							                        link   : Data.location,
							                    }
							    	axios
								        .post('/myexammasters/saveimgs',input)
								        .then((response)=>{
											console.log('Image uploded Successfully',response.data);
											console.log('Image uploded Successfully');
										})
								        .catch(function(error){
								          	console.log(error);
								        })
							    })
							    .catch((error)=>{
							    	console.log(error);
							    })
	      			    }
			  		}   
		    }
		},10000);
	  }


	    })
	        .catch(function(error){
	          	console.log(error);
	        })
	}

	componentDidMount(){

		const studentId = localStorage.getItem("user_ID")/*"E6BRdJtHMF9a6p7KF"*/;
		var examId = this.props.match.params.examId;
		axios
	        .get('/myexammasters/getmainexamquestions/'+examId+'/'+studentId)
	        .then((response)=>{
				console.log('get Questions =',response.data);
				this.setState({
					noOfQuestion 		: response.data.noOfQuestion,
					totalMarks 			: response.data.totalMarks,
					questionArrayFromTC : response.data.questionArrayFromTC,
					examStatus 			: response.data.examStatus,
				},()=>{console.log("examStatus",this.state.examStatus)})
	        })
	        .catch(function(error){
	          	console.log(error);
	        })

		axios
			.get('/myexammasters/getmainexamlastvisitedquestion/'+examId)
			.then((response)=>{
				console.log("Last visited Q  = ",response.data.lastVisitedQuestion);
				console.log("Last visited Q answer = ",response.data.lastVisitedQAnswer);
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
	}

	componentWillUnmount(){
    	// $("script[src='/js/adminLte.js']").remove();
    	// $("link[href='/css/dashboard.css']").remove();
  	}
	
// this function execute when student click on any option

	getAnswerbyStud(event){
		var checkedStatus 	= event.target.checked;
		var index 			= event.target.getAttribute('data-qNum');
		var studAnswer 		= event.target.getAttribute('id');
		var correctAnswer 	= event.target.getAttribute('data-right');
		var examTime 		= $('.countdownWrap').text();
		var examId 			= this.props.match.params.examId;
		var nextQues		= parseInt(index) + 1;

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

		console.log("index = ",index," | studAnswer = ",studAnswer," | examTime = ",examTime," | examId = ",examId, " | Answer = ",answer);

		$('#ind'+(this.state.qIndex)).hide();
		$('.carousel-control-right').click();
		$('.carousel-control-left').click();		
		
		axios
			.post('/myexammasters/updateexamtimeAndstudenanswer',formValues)
			.then((response)=>{
				console.log("updateexamtimeAndstudenanswer = ",response.data);
				jQuery('#mySlideShow').carousel(nextQues);
				this.fillcolorwhenanswer(index,studAnswer);
			})
			.catch(function(error){
				console.log("Error while selected answer = ", error);
				alert( 'Please check internet connection. Previous question was not solved', 'danger');
			})
	}

// after question solve question number will get filled by green color

	fillcolorwhenanswer(getqNum,studAnswer){
		$('#qn'+getqNum).addClass("greenClor");
	}
	componentDidUpdate(){
		$('.Yes').addClass("greenClor");
	}
	RUSureWantTofinsh(event){
		var examId = this.props.match.params.examId;
		var examTime = $('.countdownWrap').text();

		axios
			.post('/myexammasters/exammarksupdate/'+examId+'/'+examTime)
			.then((response)=>{
				console.log("exammarksupdate = ",response.data);
				this.props.history.push("/mainExamResult/"+examId);
				clearInterval(this.screenshotInterval);
				localStorage.removeItem("screenshot")
			})
			.catch(function(error){
				console.log("RUSureWantTofinsh = ", error)
			})
	}
//--------------------- this function show clock ----------------//
	showMainExamTime(examTime,id){
	//--------------- execute function after 1 seconds. -------------------
			var examId = this.props.match.params.examId;
			var intervalMain = setInterval(function() { 
			localStorage.setItem("MainExaminterval",intervalMain);
			  var timer = examTime.split(':');
			  var minutes = parseInt(timer[0], 10);
			  var seconds = parseInt(timer[1], 10);
			  --seconds;
			  minutes = (seconds < 0) ? --minutes : minutes;
			  if (minutes < 0){
			  	clearInterval(intervalMain);
				var getExamTime = $('.countdownWrap').text();
				clearInterval(this.screenshotInterval);
				localStorage.removeItem("screenshot")
				axios
					.post('/myexammasters/exammarksupdate/'+examId+'/'+getExamTime)
					.then((response)=>{
						console.log("exammarksupdate = ",response.data);
						this.props.history.push("/mainExamResult/"+examId);
					})
					.catch(function(error){
						console.log("RUSureWantTofinsh = ", error)
					})
			  	
			  }else{
				  seconds = (seconds < 0) ? 59 : seconds;
				  seconds = (seconds < 10) ? '0' + seconds : seconds;
				  minutes = (minutes < 10) ?  minutes : minutes;
				  $('.countdown').html(minutes + ':' + seconds);
				  examTime = minutes + ':' + seconds;
			}

			}, 1000);
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
		window.scroll(0,0);
	if(this.state.questionArrayFromTC){			
	  if(this.state.questionArrayFromTC.length>1){
		return(	
		  <div>
			<div className="CountIncrement">0</div>
		        {/* Content Wrapper. Contains page content */}
		        <div className="content-wrapper content-wrapperexampaper  content-wrapperexampaper1">
		          {/* Content Header (Page header) */}
		          <section className="content-header1"></section>
		           <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 pull-right webCamStyle">
			          {this.state.examStatus !="Completed" && this.state.examStatus != "notExist"?
			          <div className="innerWebCam">
			            <div className="drawSquare pull-right"></div>
			            <Webcam className="videoSizeDisplay" autoPlay="true"
			              audio={false}
			              height={100}
			              width={100}
			              ref={node => this.webcam = node}
			            />
			            </div>
			            :
			            null
			        }
			        </div>
		          {/* Main content */}
		          <section className="content viewContent">
		            <div className="row">
		        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
		            <div className="box">
		                <div>
		                   	{this.state.examStatus !=="Completed" && this.state.examStatus !== "notExist"?
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">

							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 colpadding">

								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 examDetailsWrap marginAuto">
								    <div className="pull-right marg150">
										<div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 examDetailsWrap1"><div className="maxWidth">{this.state.competitionName}</div></div>
										<div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 examDetailsWrap2">Total Questions : {this.state.noOfQuestion}</div>
										<div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 examDetailsWrap3">Total Marks :  {this.state.totalMarks}</div>

										<div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 countdownWrapDiv">
											<span className=" countdown countdownWrap"></span>
										</div>
									</div>		
								</div>		
							</div>
								
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 recordWrap">&nbsp;&nbsp;&nbsp;Recording... </div>
								<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 colpadding paddingTop">
									<img src="/images/leftboy.png" className="examstdHeight"/>
								</div>
								
							<div id="mySlideShow" className="col-lg-8 col-md-8 col-sm-8 col-xs-8 carousel slide " data-ride="carousel" data-interval="false">
					  
									<ol id="configuration_sidebar_content" className="carousel-indicators oesCarouselIndicator">
										{ this.state.questionArrayFromTC.map( (slides,index)=>{
											console.log("slides-->",slides,this.state.questionArrayFromTC.length)
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
											
											if(index <this.state.questionArrayFromTC.length-1){
												// console.log(this.state.questionArrayFromTC.length-1,"&&",index)

											return (
													<li data-target="#mySlideShow" key={index} data-slide-to={index} name={index} className={activeStatus+" A-"+index+' '+slides.attempted} id={"qn"+slides.questionNumber}>{index+1}</li>
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
										{ this.state.questionArrayFromTC.map( (slides,index)=>{
									  // console.log("this.state.questionArrayFromTC",this.state.questionArrayFromTC)
											if(index == this.state.qIndex){
												var activeStatus = 'active';
											}else{
												var activeStatus = '';
												var hideSlideDetail = "hideSlidDetails";
											}
											
											if(index <this.state.questionArrayFromTC.length-1){
												//--------- align question verrtical  -------------//
												var questionArr = slides.question;
												// console.log("questionArr------> ",questionArr);
												if(questionArr){
													var questionArray =[];
													for(var i=0; i<questionArr.length; i++){
														// if(questionArr[i].length)
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
											return (
												    <div className={"item itemCustomT "+ activeStatus} key={index}>
												      
												      <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-12 sliderTitles">
												      	<div className="col-lg-7 col-lg-offset-2 col-md-offset-2 col-sm-6 col-sm-offset-2 col-md-6 col-xs-9 questionTitWrapp">Question No. <span className="questionTitsubWrap">{index+1} :</span> </div>
														<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 questionTitsubWrap">{questionArray}</div>
												      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 questionAnsWrapp2">
												      	Answers : 
												      </div>
												      	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 answerWrapSlide">
												      	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 answerOption">
													      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 answerBottom">
													      	<label className="col-lg-8 col-md-8 col-sm-8 col-xs-8 containerr">
															  <input type="radio" name="questionOption" id="A" className={"A-"+index} data-qNum={slides.questionNumber} data-right={slides.correctAnswer} onClick={this.getAnswerbyStud.bind(this)} />
															  <span className="checkmarkk"></span>
															  <span className=" quesAnswerOpt">{slides.A}</span>
															</label>
													      	
													   	   </div>
													   	  
													      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 answerBottom">
													      	<label className="col-lg-8 col-md-8 col-sm-8 col-xs-8 containerr">
															  <input type="radio" name="questionOption" id="B" className={"B-"+index} data-qNum={slides.questionNumber} data-right={slides.correctAnswer} onClick={this.getAnswerbyStud.bind(this)} />
															  <span className="checkmarkk"></span>
															  <span className=" quesAnswerOpt">{slides.B}</span>
															</label>
													      	 
													      </div>
												      
													      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 answerBottom">
													      	<label className="col-lg-8 col-md-8 col-sm-8 col-xs-8 containerr">
															  <input type="radio" name="questionOption" id="C" className={"C-"+index} data-qNum={slides.questionNumber} data-right={slides.correctAnswer} onClick={this.getAnswerbyStud.bind(this)} />
															  <span className="checkmarkk"></span>
															  <span className=" quesAnswerOpt">{slides.C}</span>
															</label>
													      	 
													      </div>
													      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-8 answerBottom">
													      	<label className="col-lg-8 col-md-8 col-sm-8 col-xs-8 containerr">
															  <input type="radio" name="questionOption" id="D" className={"D-"+index} data-qNum={slides.questionNumber} data-right={slides.correctAnswer} onClick={this.getAnswerbyStud.bind(this)} />
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
												
												return (<div className={"item "+ activeStatus} key={index}>
												      	
												      <div className="col-lg-9 col-lg-offset-2 col-md-9 col-md-offset-2 col-sm-9  col-sm-offset-2 col-xs-12 sliderTitles finishSlideWrap">
														<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
														      <div className="col-lg-12 col-md-12 col-sm-12 finishText">
														      	{/*slides.finishText*/}You are about to finish the Exam.
														      </div>
														</div>
														<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
														      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 answerBottom finishsubText">
														      	{/*slides.finishSubtext*/}Please click on below button to finish the Exam.
														      </div>
														</div>
														<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
														    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 finishBttn">
																<button className="showNextWindowButtow btn btn-primary" onClick={this.RUSureWantTofinsh.bind(this)}>Finish Exam{/*slides.finish_button*/}</button>
															</div>
														</div>
													  </div>
													</div>
												);
												
											}
										  }) 
										}

										
									  </div>
									  
									  <a className="left carousel-control controlRL" href="#mySlideShow" data-slide="prev">
									    <span className="glyphicon glyphicon-chevron-left"></span>
									    <span className="sr-only">Previous</span>
									  </a>
									  <a className="right carousel-control carousel-control-right controlRL" href="#mySlideShow" data-slide="next">
									    <span className="glyphicon glyphicon-chevron-right"></span>
									    <span className="sr-only">Next</span>
									  </a>
									</div>
									<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 colpadding paddingTop">
									<img src="/images/rightgal.png" className="examstdHeight"/>
								</div>

								
							</div>
							: 
							<div className="box-header with-border boxMinHeight studDataNotExistC">
										<div className="startExambox col-lg-offset-2 col-lg-8 col-md-offset-2 col-md-8 col-sm-offset-1 col-sm-10 col-xs-12">
											<div className="fontstyle"> You Have finished your exam... Thank You !!!</div> 
										</div>
									</div>

						}
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 showNextButtonWrap">
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
							 <h3 className="examFinishedStatus examLoadingTimeDiv"> {this.tryLoadingAgain()} </h3>
							 {/*<img src="/images/preloader.gif"/>*/}
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
			
		        <div className="content-wrapper ">
		          <section className="content-header">
		            <h1>Answer Sheet</h1>
		          </section>
		          <section className="content viewContent">
		            <div className="row">
		              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
		                <div className="box">
		                  <div className="box-header with-border boxMinHeight loadingImgWrap">
							 <h3 className="examFinishedStatus examLoadingTimeDiv"> {this.tryLoadingAgain()} </h3>
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
	}
}
export default StartExam;
// export default withTracker(props=>{
// 	var id = FlowRouter.getParam("id");
// 	const postHandle1     =  Meteor.subscribe('showSingleAnsPaper',id);
// 	const loadingTest1    = !postHandle1.ready();
	
// 	var answerData        = MyExamMaster.findOne({"_id":id,"StudentId":Meteor.userId()})||{};
// 	if(answerData){
// 		var examStatus        = answerData.examStatus;
// 		var examName          = answerData.examName;
// 		var examTime          = answerData.examSolvingTime;
// 	}else{var examStatus = "notExist";}
// 	return{
// 		id,
// 		examName,
// 		examStatus,
// 		examTime,
// 		loadingTest1,
// 		answerData
// 	};
// })(StartExam);
