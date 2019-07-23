import React, {Component} from 'react';
import {render} from 'react-dom';
import { FlowRouter }   from 'meteor/ostrio:flow-router-extra';
import {withTracker} from 'meteor/react-meteor-data';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {Session} from 'meteor/session';
import {StudentMaster} from '/imports/student/api/studentMaster.js';
import {TempImageNetSpeed} from '/imports/s3/api/ClientImageCall.js';

export default class TestNetspeed extends TrackerReact(Component)  {
	constructor(props){
		super(props);
		this.state={
          	// 'tab'       : 0,
          	
    		downloadSpeed :'',
    		uploadSpeed   :'',

    		speedBps:'',
    		speedKbps:'',
    		speedMbps:'',
			}
		}
	
	componentDidMount(){
		if ( !$('body').hasClass('adminLte')) {
		  var adminLte = document.createElement("script");
		  adminLte.type="text/javascript";
		  adminLte.src = "/js/adminLte.js";
		  $("body").append(adminLte);
		}
		// var speedTest = require('speedtest-net');
		
		Meteor.call("calculateNetspeed",(err,res)=>{
		  if(err){
		  }else{ 
		  }
		});

		Meteor.call("getInternetSpeedParams",(err,res)=>{
		  if(err){
		  }else{
		  	if(res){
		  		this.setState({
		  			downloadSpeed :res.download,
    				uploadSpeed   :res.upload,
		  		});
		  	}		   
		  }
		});	
	}

	componentWillUnmount(){
    	$("script[src='/js/adminLte.js']").remove();
    	$("link[href='/css/dashboard.css']").remove();
  	}
  
	render(){
		window.scroll(0,0);
		return(
			<div>
			    <div className="content-wrapper">
			    <section className="content-header">
		            <h1 className="stud"></h1>
		         </section>			         
			      <section className="content viewContent">
			        <div className="row">
			          <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
			            <div className="box"> 
			            	<div className="box-header with-border boxMinHeight">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					            	<div className="col-lg-12 webCamStyle">
									    <div className="text-center">
									    	 <div className="box-header with-border boxMinHeight   loadingImgWrap">
								            	{this.state.downloadSpeed && this.state.uploadSpeed ?
								            		<div className="col-lg-12  col-md-12 col-sm-12 col-xs-12 netspeedtext">
								            			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center"><h2 className="speedtextcolor"> Internet Speed :</h2></div>
												 		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 speedContent">
													 		<h3 className="col-lg-6 col-md-6 col-xs-12 col-sm-12 speedtextcolor"><i className="fa fa-download" aria-hidden="true"></i>&nbsp;Download Speed : {this.state.downloadSpeed}&nbsp; &nbsp;Mbps </h3>
													 		<h3 className="col-lg-6 col-md-6 col-xs-12 col-sm-12 speedtextcolor"><i className="fa fa-upload" aria-hidden="true"></i>&nbsp;Upload Speed : {this.state.uploadSpeed}&nbsp; &nbsp;Mbps</h3>
													 		
												 		</div>
													</div>
													:
													<div  className="col-lg-12  col-md-12 col-sm-12 col-xs-12  speedtextcolor"><img className="netspeedgif" src="/images/netspeed2.gif"/></div>
												}
							            	</div>									       
									    </div>
									</div>
								</div>
							</div>
						</div>
					  </div>
					</div>
				  </section>
				</div>
			</div>
			);
	}
}



