import React, {Component} from 'react';
import {render} from 'react-dom';

import { FlowRouter }   from 'meteor/ostrio:flow-router-extra';
import {withTracker} from 'meteor/react-meteor-data';
import '/imports/student/api/competitionRegisterOrder.js';
import {StudentMaster} from '/imports/student/api/studentMaster.js';
import {ExamMaster} from '/imports/studentMainExam/api/examMaster.js';
class PaymentResponse extends Component{

  	constructor(){
		super();
		this.state = {
		    status      : FlowRouter.getQueryParam('status'),
		    billnumbers : FlowRouter.getQueryParam('billnumbers'),
		    checksum    : FlowRouter.getQueryParam('checksum'),
			id 			: FlowRouter.getQueryParam('id'),
		}
	}

	componentDidMount(){

		if(FlowRouter.getQueryParam('status') == 'paid'){
          	Meteor.call("updateOnlineDetailsToOrder",Meteor.userId(),FlowRouter.getParam('compId'),this.state.status,this.state.id,this.state.billnumbers,
			          		function(err,result){
			          			// console.log("in update function");
				                if(result){

				                    console.log("response result",result);
				                    FlowRouter.go("/payment-success/"+FlowRouter.getParam('compId'));
				              	}else{
				                    FlowRouter.go("/payment-success/"+FlowRouter.getParam('compId'));

				              	}
			        		}
        			   );
	    }else{
	    	FlowRouter.go("/payment-failure");
	    }
  	}

  	componentWillUnmount(){

  	}

	render(){
		return(
			<div>
			</div>
			
		)
	}
}
export default PaymentResponse;