import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
// import $ from "jquery";

/***************************Temparary files******************************/
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import StudentProfile	from '../common/components/StudentProfile.js';
import StudentHeader	from '../common/components/StudentHeader.js';
import StudentSidebar	from '../common/components/StudentSidebar.js';
import Footer			from '../common/components/Footer.js';
/***************************Temparary files******************************/

// Section: 2 - MainExam ***************************************************
import MultipleCompetition 		from '../studentMainExam/components/MultipleCompetition.js';
import PastExamReports 			from '../studentMainExam/components/PastExamReports.js';
import CompetitionResultReport 	from '../studentMainExam/components/CompetitionResultReport.js';
// Section: 3 - PackageManagement ***************************************************
import PackageList				from '../packageManagement/components/PackageList.js';
import PurchasedPackage 		from '../packageManagement/components/PurchasedPackage.js';
// Section: 4 - PracticeExam**********************************************************
import StartPracticeExam 		from '../practiceExams/components/StartPracticeExam.js';
import PracticeExamReports 		from '../practiceExams/components/PracticeExamReports.js';
// Section: 5 - Certificate**********************************************************
import Certificate 				from '../certificate/components/Certificate.js';
import ParticipationCertificate from '../certificate/components/ParticipationCertificate.js';
// Section: 6 - MyAccount ***********************************************************
import StudentResetPassword 	from '../myAccount/components/ChangePassword.js';
import CreateStudentRegistration from '../myAccount/components/CreateStudentRegistration.js';
import MyOrder 					from '../myAccount/components/MyOrders.js';
// import content		from './components/common/layouts/CommonLayout.js';

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

export default CommonPage;