import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import Login 			from './components/systemSecurity/Login.js';
import ConfirmOtp  		from './components/systemSecurity/ConfirmOtp.js';
import ForgotPassword 	from './components/systemSecurity/ForgotPassword.js';
import ResetPassword 	from './components/systemSecurity/ResetPassword.js';
import SignUp 			from './components/systemSecurity/SignUp.js';
import VerifyEmail 		from './components/systemSecurity/VerifyEmail.js';


function App() {
  return (
  	<Router>	
	    <div className="App">
	  		<Route path="/" 			exact strict component={ Login } />
	  		<Route path="/login" 		exact strict component={ Login } />
	  		<Route path="/signup" 		exact strict component={ SignUp } />
	  		<Route path="/forgot-pwd" 	exact strict component={ ForgotPassword } />
	  		<Route path="/reset-pwd" 	exact strict component={ ResetPassword } />
	  		<Route path="/verify-email" exact strict component={ VerifyEmail } />
	  		<Route path="/confirm-otp" 	exact strict component={ ConfirmOtp } />
	    </div>    
  	</Router>
  );
}

export default App;
