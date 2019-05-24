import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import Login 					from './components/systemSecurity/Login.js';
import ConfirmOtp  				from './components/systemSecurity/ConfirmOtp.js';
import ForgotPassword 			from './components/systemSecurity/ForgotPassword.js';
import ResetPassword 			from './components/systemSecurity/ResetPassword.js';
import SignUp 					from './components/systemSecurity/SignUp.js';
import VerifyEmail 				from './components/systemSecurity/VerifyEmail.js';
import PurchasedPackage 		from './components/packageManagement/PurchasedPackage.js';
import Certificate 				from './components/admin/certificate/components/Certificate.js';
import ParticipationCertificate from './components/admin/certificate/components/ParticipationCertificate.js';
import StudentResetPassword 	from './components/admin/myAccount/components/ChangePassword.js';
import MyOrder 					from './components/admin/myAccount/components/MyOrders.js';
import CreateStudentRegistration from './components/admin/myAccount/components/CreateStudentRegistration.js';

// import content		from './components/common/layouts/CommonLayout.js';

/***************************Temparary files******************************/
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import StudentProfile	from './components/common/StudentProfile.js';
import StudentHeader	from './components/common/StudentHeader.js';
import StudentSidebar	from './components/common/StudentSidebar.js';
import Footer			from './components/common/Footer.js';
/***************************Temparary files******************************/

function App() {
  return (
  	<Router>	
	    <div className="App">
	  		{/*<Route path="/" 			exact strict component={ Login } />
	  		<Route path="/login" 		exact strict component={ Login } />
	  		<Route path="/signup" 		exact strict component={ SignUp } />
	  		<Route path="/forgot-pwd" 	exact strict component={ ForgotPassword } />
	  		<Route path="/reset-pwd" 	exact strict component={ ResetPassword } />
	  		<Route path="/verify-email" exact strict component={ VerifyEmail } />
	  		<Route path="/confirm-otp" 	exact strict component={ ConfirmOtp } />*/}
	  		{/*content*/}
	  		<div className="hold-transition skin-blue sidebar-mini">
			    <div className="wrapper">
			        <StudentHeader/>
			        <div className="container-fluid">
				        <div className="row">
				            <StudentSidebar/>
				            <div className="container-fluid main-container nullPadding">
				              	<div className="col-lg-10 marg-left nullPadding">
				                	<Certificate/>
				              	</div>
				              	<Footer/>
				            </div>
				        </div>
			        </div>
			    </div>
			</div>
		</div> 
  	</Router>
  );
}

export default App;
