import React, {Component} from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router,Link,Route,Switch } from 'react-router-dom';
import '../css/common.css';

// import { FlowRouter }   from 'meteor/ostrio:flow-router-extra';
// import {withTracker} from 'meteor/react-meteor-data';
// // import TrackerReact from 'meteor/ultimatejs:tracker-react';

// import {StudentMaster} from '/imports/student/api/studentMaster.js';
// import {MyExamMaster} from '/imports/student/api/myExamMaster.js';
// import StudentRegistrationforCompetition from '/imports/student/components/StudentRegistrationforCompetition.jsx';
// import PracticeStartExamForDashboard from '/imports/studentMainExam/components/PracticeStartExamForDashboard';
// // import PracticeStartExamForDashboard from '/imports/admin/forms/exam/PracticeStartExamForDashboard';
// import {PackageManagementMaster} from '/imports/admin/packageManagement/api/packageManagementMaster.js';
// import {PackageOrderMaster} from '/imports/paymentProcess/api/packageOrderMaster.js';
// import {PackageQuestionPaperMaster} from '/imports/paymentProcess/api/packageQuestionPaperMaster.js';
// import {NotificationMaster} from '/imports/admin/notification/apiNotificationMaster.js';
// import { SiteDowntime }   from '/imports/admin/notification/apiNotificationMaster.js';
// import TimeAgo from 'react-timeago';
// import ReactQuill from 'react-quill'; 
// import 'react-quill/dist/quill.snow.css';
// import  renderHTML from 'react-render-html';
// import  { Quill, Mixin, Toolbar } from 'react-quill'; 


class StudentProfile extends Component{

	// constructor(){
	//   super();
	//     this.state = {
	//         content         : '',
	//         loginTime       : '',
	//     }
	//     this.handleChange = this.handleChange.bind(this);
	// }
	
	// handleChange(event){
	//     const target = event.target;
	//     const name   = target.name;
	//     this.setState({
	//       [name]: event.target.value,
	//     });
 //  	}

	// componentWillMount(){
 //    	$('.sidebar').css({display:'block',background: '#222d32'});
 // 	 }

	// componentDidMount(){
	// 	if ( !$('body').hasClass('adminLte')) {
	// 	  var adminLte = document.createElement("script");
	// 	  adminLte.type="text/javascript";
	// 	  adminLte.src = "/js/adminLte.js";
	// 	  $("body").append(adminLte);
	// 	}
	// 	var studData = StudentMaster.findOne({"studentId":Meteor.userId()});


	// 	// console.log("navigator.appName------>",navigator.appName);
	// 	// console.log("navigator.appCodeName------>",navigator.appCodeName);
	// 	// console.log("navigator.platform------>",navigator.platform);

	// 	// console.log("navigator.window------>",window.navigator);
	// 	// Meteor.setTimeout(function() {
	// 	// 				    $('#showNotice').modal('show');
	// 	// 					}, 300);

	// 	 Meteor.call("getNotificationStatus",(err,res)=>{
 //          if(err){ 
 //          }else{ 
 //          	var resArray=res;        	
          
 //          	if(resArray.length>0 && resArray[0]._id){

 //          		if(studData){
	// 			if(studData.notificationStatus=="Unread"){
	// 				Meteor.setTimeout(function() {
	// 			    $('#showstatus').modal('show');
	// 				}, 300);
	// 			}else{
	// 				Meteor.setTimeout(function() {
	// 			    $('#showstatus').modal('hide');
	// 				}, 300);
	// 			}
	// 		}	

 //          	}
 //          	else{
	// 				Meteor.setTimeout(function() {
	// 			    	$('#showstatus').modal('hide');
	// 				}, 300);

	// 			}
            
 //          }
 //        });	

 //        // this.countdownTimeStart();	
 //        // this.setState({
 //        // 	loginTime:new Date().getTime(),
 //        // },()=>{this.countdownTimeStart()})	;		
			
 //  	}

 // //  	countdownTimeStart(){
	// // 	var countDownDate = this.state.loginTime;
	// // 	var countdwn=0;
	// // 	var x = setInterval(function() {
	// // 	    // Get todays date and time
	// // 	    var now = new Date().getMinutes();
	// // 	    var distance = countDownDate - now;	
	// // 	    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	// // 	    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	// // 	    var seconds = Math.floor((distance % (1000 * 60)) / 1000);   
		 
	// // 	    countdwn=countdwn+1;
	// // 	    if(countdwn==10){
	// // 	        clearInterval(x);		    	
	// // 	    	Meteor.logout();
	// // 	    	FlowRouter.go("/");
	// // 	    }
	// // 	}, 60000);
	// // }

 //  	updateStudentNotifctn(){
 //  		 Meteor.call("updateStudentNotificationStatusToRead",(err,res)=>{
 //          if(err){
 //          }else{            
 //          }
 //        });
 //  	}

 //  	updateStudentTimeStatus(){
 //  		 Meteor.call("updateStudentDownTimeStatusStatusToRead",(err,res)=>{
 //          if(err){
 //          }else{            
 //          }
 //        });
 //  	}
  	
 //  	componentWillUnmount(){
 //    	$("script[src='/js/adminLte.js']").remove();
 //    	$("link[href='/css/dashboard.css']").remove();
 //  	}

	render(){
		/* window.scroll(0,0);
		if(!this.props.loadingTest){
			if(this.props.studentData.studentId){
				var bgimg = 'bgmyprofile'}else{ var bgimg=''}
				if(this.props.downtimestatus._id && this.props.studentData.downTimeStatus=="Unread"){
					Meteor.setTimeout(function() {
				    $('#showNotice').modal('show');
					}, 300);
				}else{
					
					Meteor.setTimeout(function() {
				    $('#showNotice').modal('hide');
					}, 300);
				}
				*/
		return(
			<div>
			{/*<div className="container-fluid cfcustom">
		        <div className="content-wrapper marg-left0">
				  <section className="content-header1">*/}
				    {/*<h1>Start Purchased Practice Exam</h1>*/}
				    
				  {/*</section>*/}
		          <section className={"content viewContent bgmyprofile"/*+bgimg*/}>
		           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
					{/*this.props.packageOrderData.length>0?*/
						<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 profileSection12">									
							<div className="col-lg-10 col-lg-offset-1 zeropadding">
								<div className="col-lg-10 col-lg-offset-1 ">
									<div className="examlinks1 col-lg-12 pckgtitle1">
										<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 floatLeft nullPadding">Package Purchased</div> 											
										<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 floatLeft nullPadding"><blink><Link to="/PackageList" className="testtitle examlinks col-lg-12 col-md-12 col-xs-12 col-sm-12 pdcls" title="Click here to buy more packages">&nbsp; Buy New Packages</Link></blink></div>											
									</div>
								</div>
								<div className="col-lg-10 col-lg-offset-1 scrollbar">
										{/*this.props.packageOrderData.map((data1,index)=>*//*{*/
											/*return (
												<div key={index}>
													{

														// data1.packages?
														// data1.packages.map((data2,index2)=>{
															return (<div className="col-lg-6 col-md-6 col-sm-12 outerboxpadding" key={index2}><div className="smallboxpckg1" > 
																    	<div className="col-lg-12 col-md-12 smallfont paddingnone">{data2.packageName}</div>
																    		<a className="startlink" title="Click here to start exam" href={`/startPurchasedPracticeExam/${data2.packageId}`}>Start</a>
																		</div>
															    	</div>
															    	);
															// })
															// :
															// <div>Packages Not Available</div>
													
												}
											    </div>);*/
										/*})*/}
								</div>
							</div>
						</div>	
					}
						
					<div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 ">
							<div className="profileSection3"></div>
							<div className="bgmonkey bgmonkeyspace">
								<div className="col-lg-12 col-md-12 studProfileTit3">Reports</div>
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 categoryTable">
					              		<table className="table table-striped formTable formtabml">
										    <thead className="tableHeader1">
										        <tr>
										            <th className="col-lg-5 pdhead ">Exam Name </th>
										            <th className="col-lg-1 tab-Table pdhead"> Catg </th>
										            <th className="col-lg-1 tab-Table pdhead">  Marks </th>
										        </tr>
										    </thead>
										{/*this.props.mainExamReport!=0 ?*/
										    <tbody className="myAllTableReport reportbdscroll">
										     	{/*this.props.mainExamReport.map((Exams,index)=>*//*{*/
										     	/*return <tr key={index}>
										     			<td className="col-lg-5 pdhead tabletxtwrap">{Exams.competitionName}</td>
										     			<td className="col-lg-1 tab-Table pdhead">{Exams.category}</td>
										     			<td className="col-lg-1 tab-Table pdhead">{Exams.totalScore}</td>
										     		</tr>*/
										     		/*})*/
										     }
										    </tbody>
										// :
									 //    	<tbody className="OESDataNotAvailable reportbdscroll">
								  //   			<tr>
								  //   				<td colSpan="9">"Reports are Not Yet Available."</td>
								  //   			</tr>
								  //   		</tbody>
							    		}
										</table>
									</div>
								</div>

						</div>
					</div>
				  </section>
				</div>
			/*</div>
		</div>*/
	)}
}export default StudentProfile;
// export default StudentProfileContainer = withTracker(props=>{
// 	var id = Meteor.userId();
// 	const postHandle              = Meteor.subscribe('LoginInStudent',id);
// 	const loadingTest             = !postHandle.ready();
// 	var studentData               = StudentMaster.findOne({"studentId":id})||{};

// 	var myExamHandle              = Meteor.subscribe("showAllStudExams",Meteor.userId());
// 	var loadingTestExam           = !myExamHandle.ready();
// 	var mainExamReport            = MyExamMaster.find({"StudentId":Meteor.userId()},{fields:{"competitionName":1,"category":1,"totalScore":1}}).fetch()||{};	

// 	const postPackageHandle       = Meteor.subscribe('packageManagementData');
//     const packageloading          = !postPackageHandle.ready();
//     const packageData             = PackageManagementMaster.find({},{sort: {createdAt: 1}}).fetch();
	
// 	const postPackageOrderHandle  = Meteor.subscribe('showLoginStuddntOrders');
//     const packageloading1         = !postPackageOrderHandle.ready();
//     const packageOrderData        = PackageOrderMaster.find({"buyerId":Meteor.userId(),"status":"paid"},{sort: {paymentDate: -1},fields:{"packages":1}}).fetch()||{};

// 	const postHandle1             = Meteor.subscribe('NotificationMasterstatus');
// 	const loading1                = !postHandle1.ready();
// 	const Notificationstatus      = NotificationMaster.find({}).fetch();
	
// 	const postHandle2             = Meteor.subscribe('SiteDowntimeInfo');
// 	const loading2                = !postHandle2.ready();
// 	const downtimestatus     	  =  SiteDowntime.findOne({"timeStatus":"Broadcasted"})||{};
	
//     if(packageData){
//     	var totalPackagesCount    = packageData.length;
//     	// var totalPackagesCount    = packageData.length;
//     }

//  	return{
// 		studentData,
// 		mainExamReport,
// 		loadingTest,
// 		totalPackagesCount,
// 		packageData,
// 		packageOrderData,
// 		Notificationstatus,
// 		loading1,
// 		loading2,
// 		downtimestatus
		
// 	}
// })(StudentProfile);