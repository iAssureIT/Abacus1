import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
/***************************Temparary files******************************/
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import StudentProfile	from './components/common/components/StudentProfile.js';
import StudentHeader	from './components/common/components/StudentHeader.js';
import StudentSidebar	from './components/common/components/StudentSidebar.js';
import Footer			from './components/common/components/Footer.js';
/***************************Temparary files******************************/
// Section: 1 - SystemSecurity ******************************************************
import Login 					from './components/systemSecurity/Login.js';
import ConfirmOtp  				from './components/systemSecurity/ConfirmOtp.js';
import ForgotPassword 			from './components/systemSecurity/ForgotPassword.js';
import ResetPassword 			from './components/systemSecurity/ResetPassword.js';
import SignUp 					from './components/systemSecurity/SignUp.js';
import VerifyEmail 				from './components/systemSecurity/VerifyEmail.js';
// import CommonPage 				from './components/layouts/CommonLayout.js';
// Section: 2 - MainExam ***************************************************
import MultipleCompetition 		from './components/studentMainExam/components/MultipleCompetition.js';
import PastExamReports 			from './components/studentMainExam/components/PastExamReports.js';
import CompetitionResultReport 	from './components/studentMainExam/components/CompetitionResultReport.js';
// Section: 3 - PackageManagement ***************************************************
import PackageList				from './components/packageManagement/components/PackageList.js';
import PurchasedPackage 		from './components/packageManagement/components/PurchasedPackage.js';
// Section: 4 - PracticeExam**********************************************************
import StartPracticeExam 		from './components/practiceExams/components/StartPracticeExam.js';
import PracticeExamReports 		from './components/practiceExams/components/PracticeExamReports.js';
// Section: 5 - Certificate**********************************************************
import Certificate 				from './components/certificate/components/Certificate.js';
import ParticipationCertificate from './components/certificate/components/ParticipationCertificate.js';
// Section: 6 - MyAccount ***********************************************************
import StudentResetPassword 	from './components/myAccount/components/ChangePassword.js';
import CreateStudentRegistration from './components/myAccount/components/CreateStudentRegistration.js';
import MyOrder 					from './components/myAccount/components/MyOrders.js';
// import content				from './components/common/layouts/CommonLayout.js';

const LoginPage = () => (
	<div>
	    <Route path="/" 				exact strict component={ Login } />
	    <Route path="/login" 			exact strict component={ Login } />
  		<Route path="/signup" 			exact strict component={ SignUp } />
  		<Route path="/forgot-pwd" 		exact strict component={ ForgotPassword } />
  		<Route path="/reset-pwd" 		exact strict component={ ResetPassword } />
  		<Route path="/verify-email" 	exact strict component={ VerifyEmail } />
  		<Route path="/confirm-otp" 		exact strict component={ ConfirmOtp } />
	</div>
);
const CommonPage = () => (
	<div className="hold-transition skin-blue sidebar-mini">
	    <div className="wrapper">
	        <StudentHeader/>
	        <div className="container-fluid">
		        <div className="row">
		            <StudentSidebar/>
		            <div className="container-fluid main-container nullPadding">
		              	<div className="col-lg-10 marg-left nullPadding">
					  		<Route path="/dashboard" 		exact strict component={ StudentProfile } />
					  		
					  		<Route path="/PurchasedPkg" 	exact strict component={ PurchasedPackage } />
					  		<Route path="/PackageList" 		exact strict component={ PackageList } />

					  		<Route path="/StartPracticeExam"exact strict component={ StartPracticeExam } />
					  		<Route path="/PractExamReports" exact strict component={ PracticeExamReports } />
					  		
					  		<Route path="/Certificate" 		exact strict component={ Certificate } />
					  		<Route path="/ParticipCert" 	exact strict component={ ParticipationCertificate } />

					  		<Route path="/StudResetPwd" 	exact strict component={ StudentResetPassword } />
					  		<Route path="/MyOrder" 			exact strict component={ MyOrder } />
					  		<Route path="/CreateStudReg"	exact strict component={ CreateStudentRegistration } />

					  		<Route path="/MultipleComp"		exact strict component={ MultipleCompetition } />
					  		<Route path="/PastExamReports"	exact strict component={ PastExamReports } />
					  		<Route path="/CompResultReport"	exact strict component={ CompetitionResultReport } />
						</div>
		            </div>
		            <Footer/>
		        </div>
	        </div>
	    </div>
	</div>
);

function App() {
  return (
  	<Router>
	    <div className="App">
	    <switch>
	  		<Route component={ LoginPage } />
	  		<Route component={ CommonPage } />
	    </switch>
		</div> 
  	</Router>
  );
}

export default App;