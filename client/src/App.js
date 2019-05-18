import React from 'react';
import ConfirmOtpModal from './components/systemSecurity/ConfirmOtpModal.js';
import ForgotPassword from './components/systemSecurity/ForgotPassword.js';
import Login from './components/systemSecurity/Login.js';
import ResetPassword from './components/systemSecurity/ResetPassword.js';
import SignUp from './components/systemSecurity/SignUp.js';
import VerifyEmail from './components/systemSecurity/VerifyEmail.js';

function App() {
  return (
    <div className="App">
      <VerifyEmail />
    </div>
  );
}

export default App;
