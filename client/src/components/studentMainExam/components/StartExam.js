import React, {Component} 	from 'react';
import Webcam 				from 'react-webcam';
import axios 				from 'axios';
import $ 					from 'jquery';
import swal 				from 'sweetalert';



class StartExam extends (Component)  {
	constructor(props){
		super(props);
		// console.log('this.props.id',this.props.id);
		this.state={
			'screenshot'		: null,
          	'tab'       		: 0,
          	'qIndex'    		: 0,
			'myIndex'   		: '',
			'backarraowcnt' 	: '',
			noOfQuestion 		: '',
			totalMarks 			: '',
			questionArrayFromTC : [],
			'defaultTime'  		: '02:15',
			examStatus : "",
			// 'subscription':{
			// 	'subscription':{
			//  	'myExamMasterData' :  Meteor.subscribe('showSingleAnsPaper',this.props.id),
			// }
			// }
		}		
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
				this.setState({
					examStatus : responseData.data[0].examStatus 
				},()=>{
					console.log("examStatus",this.state.examStatus);
				})
				// this.props.history.push('/startExam/'+response.data);

	        })
	        .catch(function(error){
	          	console.log(error);
	          	$('.startExamBtn').css('display','Block');
				$('.wrProcessing').css('display','none');
	        })
		// Meteor.call("getExamTimeData",examId,Meteor.userId(),(err,res)=>{
		// 	if(err){

		// 	}else{
		// 		if(res[0]=="data"){
		// 			this.showMainExamTime(res[1],examId);					
		// 		}
		// 	}
		// });

// this function is taking screenshot and save it to myExamMaster
		var link = this;
		// Meteor.setInterval(
		//   	function(){
		// 	  const screenshot = link.webcam.getScreenshot();
		// 	  if(screenshot) {
		// 		    var byteString;
		// 		    if (screenshot.split(',')[0].indexOf('base64') >= 0)
		// 		        byteString = atob(screenshot.split(',')[1]);
		// 		    else
		// 		        byteString = unescape(screenshot.split(',')[1]);

		// 		    // separate out the mime component
		// 		    var mimeString = screenshot.split(',')[0].split(':')[1].split(';')[0];

		// 		    // write the bytes of the string to a typed array
		// 		    var ia = new Uint8Array(byteString.length);
		// 		    for (var i = 0; i < byteString.length; i++) {
		// 		        ia[i] = byteString.charCodeAt(i);
		// 		    }
		// 		    var blob = new Blob([ia], {type:mimeString});
		// 		    var imgFile = new File([blob], "studentImage.png");
		// 		    console.log("fle-->",imgFile);
		// 		        var file=imgFile;
		// 		        var documentType=examId;
		// 		        if(file){       
		// 		        var fileName  = file.name;    
		//                     if (file,documentType) { 
		//                       addStudentExamAppearingImgsToS3Function(file,documentType);
		//       			    }
		// 		  }
		// 		}
		// 	}
		// ,60000);
			}

	componentDidMount(){
		if ( !$('body').hasClass('adminLte')) {
		  var adminLte = document.createElement("script");
		  adminLte.type="text/javascript";
		  adminLte.src = "/js/adminLte.js";
		  $("body").append(adminLte);
		}
		var id = this.props.match.params.id;

		// Meteor.call("getMainExamQuestions",id,(err,res)=>{
		// 	if(err){
		// 		console.log(err);
		// 	}else{
		// 		if(res){
		// 			// console.log('res',res);
		// 			this.setState({
		// 				noOfQuestion : res.noOfQuestion,
		// 				totalMarks : res.totalMarks,
		// 				questionArrayFromTC : res.questionArrayFromTC,
						
		// 			});
		// 		}else{
		// 			this.tryLoadingAgain();
		// 		}
		// 	}
		// });

		// Meteor.call("getMainExamLastVisitedQuestion",id,(err,res)=>{
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
	}

	componentWillUnmount(){
    	$("script[src='/js/adminLte.js']").remove();
    	$("link[href='/css/dashboard.css']").remove();
  	}
	
// this function execute when student click on any option

	getAnswerbyStud(event){
		var getqNum = event.target.getAttribute('data-qNum');
		var studAnswer = event.target.getAttribute('id');
		var examTime = $('.countdownWrap').text();
		var examId = this.props.match.params.id;
		var num = parseInt(getqNum);
		$('.carousel-control-right').click();
		// Meteor.call("updateExamTimeAndStudenAnswer",examId,getqNum,studAnswer,examTime,(err,res)=>{
		// 	if(err){

		// 	}else{
		// 		if(res==1){
		// 			this.fillcolorwhenanswer(getqNum,studAnswer);
		// 			
		// 			$('.carousel').carousel((num+1),{duration: 5000});
		// 		}else{
		// 			Bert.alert( 'Please check internet connection. Previous question was not solved', 'danger');
		// 		}
		// 	}
		// });
	}

// after question solve question number will get filled by green color

	fillcolorwhenanswer(getqNum,studAnswer){
		$('#'+getqNum).addClass("greenClor");
	}

	componentDidUpdate(){
		$('.Yes').addClass("greenClor");
		// -------------------- Left Right carousel show hide ----------------//
		// $('.carousel').carousel({
		// 	  wrap: false
		// 	}).on('slid.bs.carousel', function () {
		// 		curSlide = $('.active');
		// 	  if(curSlide.is( ':first-child' )) {
		// 		 $('.left').show();
		// 		 return;
		// 	  } else {
		// 		 $('.left').show();	  
		// 	  }
		// 	  if (curSlide.is( ':last-child' )) {
		// 		 $('.right').hide();
		// 		 return;
		// 	  } else {
		// 	  	$('.showNextWindowButtow').show();
		// 		 $('.right').show();	  
		// 	  }
		// });
	}

//--------------------- this function show clock ----------------//
	showMainExamTime(examTime,id){
	//--------------- execute function after 1 seconds. -------------------
			// var intervalMain = setInterval(function() { 
			// Session.set("MainExaminterval",intervalMain);
			//   var timer = examTime.split(':');
			//   var minutes = parseInt(timer[0], 10);
			//   var seconds = parseInt(timer[1], 10);
			//   --seconds;
			//   minutes = (seconds < 0) ? --minutes : minutes;
			//   if (minutes < 0){
			//   	clearInterval(intervalMain);
			// 	var getExamTime = $('.countdownWrap').text();
				// Meteor.call('ExamMarksUpdate',id,getExamTime,(err,res)=>{
				// 	if(err){
				// 		console.log(err);
				// 	}else{
				// 		//location.reload();
			 //  			FlowRouter.go("/examResult/"+id);
				// 	}
				// });
			  	
			//   }else{
			// 	  seconds = (seconds < 0) ? 59 : seconds;
			// 	  seconds = (seconds < 10) ? '0' + seconds : seconds;
			// 	  minutes = (minutes < 10) ?  minutes : minutes;
			// 	  $('.countdown').html(minutes + ':' + seconds);
			// 	  examTime = minutes + ':' + seconds;
			// }

			// }, 1000);
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

	RUSureWantTofinsh(event){
		var examId = this.props.match.params.id;
		var examTime = $('.countdownWrap').text();
		// Meteor.call('ExamMarksUpdate',examId,examTime,(err,result)=>{
		// 	if(err){
		// 		console.log(err);
		// 	}else{
		// 	 FlowRouter.go("/examResult/"+examId);

		// 	 Meteor.call("resetCompetitionPaymentStatus",(err,res)=>{
		// 		  if(err){
		// 		  }else{
				    
		// 		  }
		// 		});
		// 	}
		// });
	}

	render(){
		window.scroll(0,0);
		// if(!this.props.loadingTest1){			
		// if(this.state.questionArrayFromTC.length>1){
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
		                   	{this.state.examStatus !="Completed" && this.state.examStatus != "notExist"?
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">

							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 colpadding">

								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 examDetailsWrap marginAuto">
								    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6"></div>
									<div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 examDetailsWrap1">{/*this.props.answerData.competitionName*/}</div>
									<div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 examDetailsWrap2">Total Questions : {/*this.state.noOfQuestion*/}</div>
									<div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 examDetailsWrap3">Total Marks :  {/*this.state.totalMarks*/}</div>

									<div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 countdownWrapDiv">
										<span className=" countdown countdownWrap"></span>
									</div>
									</div>
											
								</div>
								
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 recordWrap"> Recording... </div>
								<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 colpadding paddingTop">
									<img src="/images/leftboy.png" className="examstdHeight"/>
								</div>
								
							<div id="mySlideShow" className="col-lg-8 col-md-8 col-sm-8 col-xs-8 carousel slide " data-ride="carousel" data-interval="false">
					  
									<ol id="configuration_sidebar_content" className="carousel-indicators oesCarouselIndicator">
										{ this.state.questionArrayFromTC.map( (slides,index)=>{
											if(this.state.qIndex!=0){
												if(index == 0){
													var activeStatus = '';
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
											return (
													<li data-target="#mySlideShow" key={index} data-slide-to={index} name={index} className={activeStatus+" A-"+index+' '+slides.attempted} id={slides.questionNumber}>{index+1}</li>
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
												      	<div className="col-lg-6 col-lg-offset-2 col-md-offset-2 col-sm-6 col-sm-offset-2 col-md-6 col-xs-9 questionTitWrapp">Question No. <span className="questionTitsubWrap">{index+1} :</span> </div>
														<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 questionTitsubWrap">{questionArray}</div>
												      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 questionAnsWrapp2">
												      	Answers : 
												      </div>
												      	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 answerWrapSlide">
												      	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 answerOption">
													      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 answerBottom">
													      	<label className="col-lg-8 col-md-8 col-sm-8 col-xs-8 containerr">
															  <input type="radio" name="questionOption" id="A" className={"A-"+index} data-qNum={slides.questionNumber} onClick={this.getAnswerbyStud.bind(this)} />
															  <span className="checkmarkk"></span>
															  <span className=" quesAnswerOpt">{slides.A}</span>
															</label>
													      	
													   	   </div>
													   	  
													      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 answerBottom">
													      	<label className="col-lg-8 col-md-8 col-sm-8 col-xs-8 containerr">
															  <input type="radio" name="questionOption" id="B" className={"B-"+index} data-qNum={slides.questionNumber} onClick={this.getAnswerbyStud.bind(this)} />
															  <span className="checkmarkk"></span>
															  <span className=" quesAnswerOpt">{slides.B}</span>
															</label>
													      	 
													      </div>
												      
													      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 answerBottom">
													      	<label className="col-lg-8 col-md-8 col-sm-8 col-xs-8 containerr">
															  <input type="radio" name="questionOption" id="C" className={"C-"+index} data-qNum={slides.questionNumber} onClick={this.getAnswerbyStud.bind(this)} />
															  <span className="checkmarkk"></span>
															  <span className=" quesAnswerOpt">{slides.C}</span>
															</label>
													      	 
													      </div>
													      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-8 answerBottom">
													      	<label className="col-lg-8 col-md-8 col-sm-8 col-xs-8 containerr">
															  <input type="radio" name="questionOption" id="D" className={"D-"+index} data-qNum={slides.questionNumber} onClick={this.getAnswerbyStud.bind(this)} />
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
														      	{slides.finishText}
														      </div>
														</div>
														<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
														      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 answerBottom finishsubText">
														      	{slides.finishSubtext}
														      </div>
														</div>
														<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
														    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 finishBttn">
																<button className="showNextWindowButtow btn btn-primary" onClick={this.RUSureWantTofinsh.bind(this)}>{slides.finish_button}</button>
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
							<div className="box-header with-border boxMinHeight  studDataNotExist">
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
		// }else{
		// 	return (
		// 		 <div>
			
		//         <div className="content-wrapper">
		//           <section className="content-header">
		//             {/*<h1>Answer Sheet</h1>*/}
		//           </section>
		//           <section className="content viewContent">
		//             <div className="row">
		//               <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
		//                 <div className="box">
		//                   <div className="box-header with-border boxMinHeight  loadingImgWrap">
		// 					 <h3 className="examFinishedStatus examLoadingTimeDiv"> {this.tryLoadingAgain()} </h3>
		// 					 {/*<img src="/images/preloader.gif"/>*/}
		// 					 </div>
		// 					  </div>
		// 					</div>
		// 				  </div>
			
		// 			  </section>
		// 			</div>
		// 		</div>
		// 		);
		// }
		// }else{
		// 	return (
		// 		<div>
			
		//         <div className="content-wrapper ">
		//           <section className="content-header">
		//             <h1>Answer Sheet</h1>
		//           </section>
		//           <section className="content viewContent">
		//             <div className="row">
		//               <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
		//                 <div className="box">
		//                   <div className="box-header with-border boxMinHeight  loadingImgWrap">
		// 					 <h3 className="examFinishedStatus examLoadingTimeDiv"> {this.tryLoadingAgain()} </h3>
		// 					 {/*<img src="/images/preloader.gif"/>*/}
		// 					 </div>
		// 					  </div>
		// 					</div>
		// 				  </div>
			
		// 			  </section>
		// 			</div>
		// 		</div>
		// 		);
		// }
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
