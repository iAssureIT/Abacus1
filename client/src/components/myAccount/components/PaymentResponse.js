import React, {Component} from 'react';
import {render} from 'react-dom';
import axios              from 'axios';
import queryString from 'query-string';
import moment from 'moment';


class PaymentResponse extends Component{

  	constructor(){
		super();		
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
	  		console.log("status",billnumbers);
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

  	render(){
		return(
			<div>
			</div>
			
		)
	}
}
export default PaymentResponse;