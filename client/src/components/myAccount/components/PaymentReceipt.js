import React, {Component} from 'react';

	
class PaymentReceipt extends Component{

	constructor(){
		super();
		this.state ={
	    
		}
	}

	componentDidMount(){
		// if ( !$('body').hasClass('adminLte')) {
		//   var adminLte = document.createElement("script");
		//   adminLte.type="text/javascript";
		//   adminLte.src = "/js/adminLte.js";
		//   $("body").append(adminLte);
		// }
		// Meteor.call("setCompetitionPaymentStatus",(err,res)=>{
  //         if(err){
  //         }else{
           
  //         }
  //       });
  	}

  	componentWillUnmount(){
    	// $("script[src='/js/adminLte.js']").remove();
    	// $("link[href='/css/dashboard.css']").remove();
  	}

	render(){
		return(
			<div>
		        <div className="content-wrapper">
		            <section className="content-header">
		                <h1> Payment Receipt</h1>
		            </section>
		            <section className="content viewContent">
		                <div className="row">
		                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
		                		<div className="box">
		                  			<div className="box-header with-border boxMinHeight">
								       	<section className="NotificationContent">
								            <div className="box-body">
												<div className="col-lg-10 col-lg-offset-1 col-sm-12 col-xs-12 col-md-10 col-md-offset-1 borderdetails ">
													<div className="col-lg-12 col-md-12 receiptType">Student{/*this.props.receiptType*/}</div>
													<div className="col-lg-12 status ">
														<div className="box-header box-title paymentthnx">
															<h3>Thank You! </h3><br />
																Your Payment has been successfully received with the following details.
																Please note your transaction Id for
																any queries relating to this request.
														</div>
														<div className="col-lg-6 status box-headerpayment">
															<h4>Status :</h4>
														</div>
														<div className="col-lg-6 box-headerrec ">
															<h4>Paid{/*this.props.competitionregorder.status*/}</h4>
														</div>
													</div>
													<div className="col-lg-12">
														
														<div className="col-lg-6 box-headerpayment examdetailsubtitles">
															<h4>Amount Paid :</h4>
														</div>
														<div className="col-lg-6 box-headerrec ">
															<h4><i className="fa fa-rupee"></i>1000/-{/*this.props.competitionregorder.competitionFees*/}</h4>
														</div>
													</div>
													<div className="col-lg-12 status">
														
														<div className="col-lg-6 box-headerpayment examdetailsubtitles">
															<h4>Tansaction ID :</h4>
														</div>
														<div className="col-lg-6 box-headerrec ">
															<h4> 895644873115{/*this.props.competitionregorder.transactionId*/} </h4>
														</div>
													</div>
													<div className="col-lg-12 status">
														<div className="col-lg-6 box-headerpayment examdetailsubtitles">
															<h4>Bill Number : </h4>
														</div>
														<div className="col-lg-6 box-headerrec">
															<h4>gTfhsjdhfj25648826{/*this.props.competitionregorder.billnumbers*/}  </h4>
														</div>
													</div>
													<div className="col-lg-12 status">
														<div className="col-lg-6 box-headerpayment examdetailsubtitles">
															<h4>Payment Date & Time : </h4>
														</div>
														<div className="col-lg-6 box-headerrec ">
															<h4>25/04/2019{/*moment(this.props.competitionregorder.paymentDate).format('DD/MM/YYYY')*/}, {/*this.props.competitionPaymentTime*/} 04:15 pm </h4>
														</div>
													</div>
												</div>
								            </div>
										</section>
									</div>
					  			</div>
							</div>
				  		</div>
					</section>
			  	</div>
			</div>
		)
	}
}
export default PaymentReceipt;
// export default PaymentReceipt = withTracker(props=>{
// 	var id 					  = 	FlowRouter.getParam("compId");
// 	const postHandle1             = 	Meteor.subscribe('showAllCompRegOrder');
// 	const loading1                = 	!postHandle1.ready();
// 	// console.log(loading1);
//     const competitionregorder     = 	CompetitionRegisterOrder.findOne({"competitionId": id,"studentId":Meteor.userId()})||{};
// 	var receiptType = "Competition Receipt";

// 	if(competitionregorder){
// 		var competitionPayTime=competitionregorder.paymentDate;
// 		if(competitionPayTime){
// 			var competitionPaymentTime = moment(competitionPayTime).format('LT');
// 		}
// 	}



// 	return{
// 		competitionregorder,
// 		loading1,
// 		receiptType,
// 		competitionPaymentTime
// 	}
// })(PaymentReceipt);