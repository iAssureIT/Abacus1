import React, {Component} from 'react';
import {render} from 'react-dom';
import axios              from 'axios';
import queryString from 'query-string';
import moment from 'moment';
// import { FlowRouter }   from 'meteor/ostrio:flow-router-extra';
// import {withTracker} from 'meteor/react-meteor-data';
// import '/imports/student/api/competitionRegisterOrder.js';
// import {StudentMaster} from '/imports/student/api/studentMaster.js';
// import {ExamMaster} from '/imports/studentMainExam/api/examMaster.js';

class PaymentResponse extends Component{

  	constructor(){
		super();
		// this.state = {
		//     status      : FlowRouter.getQueryParam('status'),
		//     billnumbers : FlowRouter.getQueryParam('billnumbers'),
		//     checksum    : FlowRouter.getQueryParam('checksum'),
		// 	id 			: FlowRouter.getQueryParam('id'),
		// }
	}

	componentDidMount(){

		var paramValues = queryString.parse(this.props.location.search);
  		if(paramValues){
  			var billnumbers = paramValues.billnumbers;
  			var checksum = paramValues.checksum;
  			var id = paramValues.id;
  			var status = paramValues.status;
	  		const studentId = localStorage.getItem("user_ID");
	  		var compId = this.props.match.params.compId;		

			if(status == 'paid'){
				axios
				.post('/competitionregisterorder/updateOrder/'+studentId+'/'+compId+'/'+status+'/'+id+'/'+billnumbers)


				.then((response)=>{
					console.log('payment responseeeee =-----> ',response);

					// if(response.data){
					this.props.history.push('/payment-success/'+this.props.match.params.compId);
					// 	window.location.replace(response.data);
					// }
					
				})
				.catch(function(error){
					console.log("error",error);
				});

	          	// Meteor.call("updateOnlineDetailsToOrder",studentId,compId,status,id,billnumbers,
				        //   		function(err,result){
				        //   			// console.log("in update function");
					       //          if(result){

					       //              console.log("response result",result);
					       //              FlowRouter.go("/payment-success/"+FlowRouter.getParam('compId'));
					       //        	}else{
					       //              FlowRouter.go("/payment-success/"+FlowRouter.getParam('compId'));

					       //        	}
				        // 		}
	        			//    );

		    }else{
		    	// FlowRouter.go("/payment-failure");
		    }

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