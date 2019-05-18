import React, {Component}   from 'react';

export default CommonLayout = ({content})=>(
	
   	<div className="main-layout hold-transition skin-blue sidebar-mini">
	    <div className="wrapper">
	        <StudentHeader/>
	        <div className="container-fluid">
		        <div className="row">
		            <StudentSidebar/>
		            <div className="container-fluid main-container">
		              <div className="row">
		                {content}
		                <Footer/>
		              </div>
		            </div>
		        </div>
	        </div>
	    </div>
	</div>
); 
