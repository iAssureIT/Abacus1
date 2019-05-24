import React, {Component}   from 'react';

import StudentProfile	from './components/common/StudentProfile.js';
import StudentHeader	from './components/common/StudentHeader.js';
import StudentSidebar	from './components/common/StudentSidebar.js';
import Footer			from './components/common/Footer.js';

export default CommonLayout = ({content})=>(
	
   	<div className="hold-transition skin-blue sidebar-mini">
	    <div className="wrapper">
	        <StudentHeader/>
	        <div className="container-fluid">
		        <div className="row">
		            <StudentSidebar/>
		            <div className="container-fluid main-container nullPadding">
		              	<div className="col-lg-10 marg-left nullPadding">
		                	<StudentProfile/>
		              	</div>
		              	<Footer/>
		            </div>
		        </div>
	        </div>
	    </div>
	</div>
); 
