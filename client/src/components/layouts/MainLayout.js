import React ,{ Component }		from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
/***************************Temparary files******************************/
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import StudentProfile			from '../../components/common/components/StudentProfile.js';
import StudentHeader			from '../../components/common/components/StudentHeader.js';
import StudentSidebar			from '../../components/common/components/StudentSidebar.js';
import Footer					from '../../components/common/components/Footer.js';
import PageNotFound				from '../../components/common/components/PageNotFound.js';
// Section: 1 - SystemSecurity *************************************************************
import Login 					from '../../components/systemSecurity/Login.js';
import ConfirmOtp  				from '../../components/systemSecurity/ConfirmOtp.js';
import ForgotPassword 			from '../../components/systemSecurity/ForgotPassword.js';
import ResetPassword 			from '../../components/systemSecurity/ResetPassword.js';
import SignUp 					from '../../components/systemSecurity/SignUp.js';
import VerifyMobileAOS 			from '../../components/systemSecurity/VerifyAccount.js';
// Section: 2 - MainExam ********************************************************************
import MultipleCompetition 		from '../../components/studentMainExam/components/MultipleCompetition.js';
import IAgreeAndStartExam 		from '../../components/studentMainExam/components/IAgreeAndStartExam.js';
import StartExam 				from '../../components/studentMainExam/components/StartExam.js';
import ExamResult 				from '../../components/studentMainExam/components/ExamResult.js';
import PastExamReports 			from '../../components/studentMainExam/components/PastExamReports.js';
import CompetitionResultReport 	from '../../components/studentMainExam/components/CompetitionResultReport.js';
// Section: 3 - PackageManagement ***************************************************
import PackageList				from '../../components/packageManagement/components/PackageList.js';
import PurchasedPackage 		from '../../components/packageManagement/components/PurchasedPackage.js';
// Section: 4 - PracticeExam**********************************************************
import StartPracticeExam 		from '../../components/practiceExams/components/StartPracticeExam.js';
import PracticeExamResult 		from '../../components/practiceExams/components/PracticeExamResult.js';
import PracticeStartExam 		from '../../components/practiceExams/components/PracticeStartExam.js';
import PurchasedPracticeStartExam 		from '../../components/practiceExams/components/PurchasedPracticeStartExam.js';
import PracticeExamReports 		from '../../components/practiceExams/components/PracticeExamReports.js';
// Section: 5 - Certificate**********************************************************
import Certificate 					from '../../components/certificate/components/Certificate.js';
import ParticipationCertificate 	from '../../components/certificate/components/ParticipationCertificate.js';
// Section: 6 - MyAccounCompetitionDetailsforPaymentt ***********************************************************
import StudentResetPassword 		from '../../components/myAccount/components/ChangePassword.js';
import CreateStudentRegistration 	from '../../components/myAccount/components/CreateStudentRegistration.js';
import MyOrder 						from '../../components/myAccount/components/MyOrders.js';
import PaymentReceipt 				from '../../components/myAccount/components/PaymentReceipt.js';
import CompetitionDetailsforPayment from '../../components/myAccount/components/CompetitionDetailsforPayment.js';
// Section: 7 - paymentProcess ***********************************************************
import MyInvoice 					from '../../components/paymentProcess/components/MyInvoice.js';

class MainLayout extends Component{
  
  constructor(props) {
    super();
    this.state = {
    	loggedIn : false,
    	logout 	 : true
    }
    this.updateState = this.updateState.bind(this);
    console.log("in constructor");
  }
   
  componentWillMount(){
    var token = localStorage.getItem("token");
      if(token!=null){
      console.log("in componentDidMount");
      this.setState({
        loggedIn : true,
        logout   : false
      })
    //   // browserHistory.push("/login");
    //   // this.props.history.push("/login");
    }
	}

  updateState(data){
    this.setState({
      // "loggedIn" : false,
      "logout": data,
    },()=>{
    	if (this.state.logout) {
    		this.setState({
    			"loggedIn" : false
    		})
    	}else{
    		this.setState({
    			"loggedIn" : true
    		})
    	}
    })
  }

  componentDidUpdate() {
	  console.log("in did update layout");
	}

  render(){
   
    console.log("local stoarage = ",localStorage.getItem("token"));
   if(localStorage.getItem("token")){
      return(
  		<Router>
		    <Switch>
		  		<div className="hold-transition skin-blue sidebar-mini">
				    <div className="wrapper">
				        <StudentHeader systemlogout={this.updateState}/>
				        <div className="container-fluid">
					        <div className="row">
					            <StudentSidebar/>
						            <div className="container-fluid main-container nullPadding">
						              	<div className="col-lg-10 marg-left nullPadding">
							              	<Switch>
										  		<Route path="/dashboard" 				exact strict component={ StudentProfile }/>
										  		
										  		<Route path="/PurchasedPkg" 			exact strict component={ PurchasedPackage } />
										  		<Route path="/PackageList" 				exact strict component={ PackageList } />
										  		<Route path="/PackageList/:orderId" 	exact strict component={ PackageList } />

										  		<Route path="/practiceExam/:id/:orderId/:packageId/:btnIndex" 	exact strict component={ StartPracticeExam } />
										  		<Route path="/practiceExam/:id" 								exact strict component={ StartPracticeExam } />
										  		<Route path="/PracticeExamResult/:id"							exact strict component={ PracticeExamResult } />
										  		<Route path="/PracticeStartExam"								exact strict component={ PracticeStartExam } />
										  		<Route path="/startPurchasedPracticeExam"						exact strict component={ PurchasedPracticeStartExam } />
										  		<Route path="/startPurchasedPracticeExam/:packageId"			exact strict component={ PurchasedPracticeStartExam } />
										  		<Route path="/startPurchasedPracticeExam/:id"					exact strict component={ PurchasedPracticeStartExam } />
										  		<Route path="/PractExamReports" 								exact strict component={ PracticeExamReports } />
										  		
										  		<Route path="/Certificate" 					exact strict component={ Certificate } />
										  		<Route path="/ParticipCert" 				exact strict component={ ParticipationCertificate } />

										  		<Route path="/StudResetPwd" 				exact strict component={ StudentResetPassword } />
										  		<Route path="/MyOrder" 						exact strict component={ MyOrder } />
										  		<Route path="/CreateStudReg"				exact strict component={ CreateStudentRegistration } />

										  		<Route path="/MultipleComp"					exact strict component={ MultipleCompetition } />
										  		<Route path="/IAgreeAndStartExam/:compId"	exact strict component={ IAgreeAndStartExam } />
										  		<Route path="/StartExam/:compId/:examId"	exact strict component={ StartExam } />
										  		<Route path="/mainExamResult/:examId"		exact strict component={ ExamResult } />
										  		<Route path="/PastExamReports"				exact strict component={ PastExamReports } />
										  		<Route path="/CompResultReport"				exact strict component={ CompetitionResultReport } />
										  		<Route path="/competitionDetails/:compId"	exact strict component={ CompetitionDetailsforPayment } />
										  		
										  		<Route path="/payment-success/:compId"	exact strict component={ PaymentReceipt } />
										  		<Route path="/packagePayment-success/:Id"	exact strict component={ PaymentReceipt } />
										  		<Route path="/MyInvoice"				exact strict component={ MyInvoice } />
										  		<Route path="/MyInvoice/:orderId"		exact strict component={ MyInvoice } />
										  		
							  					<Route component={ PageNotFound } />
							              	</Switch>
										</div>
						            </div>
					            <Footer/>
					        </div>
				        </div>
				    </div>
				</div>
			</Switch>
		</Router>
	  );
	}else{
		return(
			<Router>
			  	<Switch>
			  		<div>
					   	<Route path="/" 									exact strict component={ Login } />
					    <Route path="/login" 								exact strict component={ Login } />
				  		<Route path="/signup" 								exact strict component={ SignUp } />
				  		<Route path="/forgot-pwd" 							exact strict component={ ForgotPassword } />
				  		<Route path="/reset-pwd" 							exact strict component={ ResetPassword } />
				  		<Route path="/reset-pwd/:id" 							exact strict component={ ResetPassword } />
				  		<Route path="/verify-account" 						exact strict component={ VerifyMobileAOS } />
				  		<Route path="/otpFirstVarification/:mailId" 		exact strict component={ ConfirmOtp } />
				  		<Route path="/otpVarification/:mailId" 				exact strict component={ ConfirmOtp } />
				  		
				  		<Route path="/confirm-otp" 		exact strict component={ ConfirmOtp } />
				  		<Route path="/confirm-otp/forgot" 		exact strict component={ ConfirmOtp } />
					</div>
			    </Switch> 
  			</Router>
  		);
	}
  }
}
export default MainLayout;