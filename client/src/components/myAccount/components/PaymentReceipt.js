import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';
import queryString from 'query-string';
	
class PaymentReceipt extends Component{

	constructor(props){
		super();
		this.state ={
	    	orderreceipt : "",	    	
	    	receiptType:"",
		}
	}

	componentDidMount(){
		// var paramValues = queryString.parse(this.props.location.search);

		// console.log("paramValues--->".paramValues);
  	}

  	componentWillMount(){
  		
  		const studentId = localStorage.getItem("user_ID");
  		if(this.props.match.path=="/payment-success/:compId"){
	  		axios
		        .get('/competitionregisterorder/'+studentId+'/'+this.props.match.params.compId)
		        .then((response)=> {
		            console.log("-------competitionregisterorder-receipt----->>",response.data);
		            this.setState({
		              orderreceipt : response.data,
		              receiptType : "Competition Receipt"
		            });
		        })
		        .catch(function (error) {
		            console.log(error);
		        });
  		}else{
	  		axios
		        .get('/packageordermasters/'+studentId+'/'+this.props.match.params.Id)
		        .then((response)=> {
		            // console.log("-------packageordermastersreceipt-receipt----->>",response.data);
		            this.setState({
		              orderreceipt : response.data,
		              receiptType : "Package Receipt"
		            });
		        })
		        .catch(function (error) {
		            console.log(error);
		        });

  		}
  	}

  	componentWillUnmount(){

  	}

	render(){
		console.log("in payment sucess")
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
													<div className="col-lg-12 col-md-12 receiptType">{this.state.receiptType}</div>
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
														<h4>{this.state.orderreceipt.status}</h4>
														</div>
													</div>
													<div className="col-lg-12">
														<div className="col-lg-6 box-headerpayment examdetailsubtitles">
															<h4>Amount Paid :</h4>
														</div>
														<div className="col-lg-6 box-headerrec ">
															<h4><i className="fa fa-rupee"></i>
															{this.state.receiptType=="Competition Receipt"?this.state.orderreceipt.competitionFees:this.state.orderreceipt.amount}
															</h4>
														</div>
													</div>
													<div className="col-lg-12 status">
														<div className="col-lg-6 box-headerpayment examdetailsubtitles">
															<h4>Tansaction ID :</h4>
														</div>
														<div className="col-lg-6 box-headerrec ">
															<h4> {this.state.orderreceipt.transactionId} </h4>
														</div>
													</div>
													<div className="col-lg-12 status">
														<div className="col-lg-6 box-headerpayment examdetailsubtitles">
															<h4>Bill Number : </h4>
														</div>
														<div className="col-lg-6 box-headerrec">
															<h4>{this.state.orderreceipt.billnumbers}  </h4>
														</div>
													</div>
													<div className="col-lg-12 status">
														<div className="col-lg-6 box-headerpayment examdetailsubtitles">
															<h4>Payment Date & Time : </h4>
														</div>
														<div className="col-lg-6 box-headerrec ">
															<h4>{moment(this.state.orderreceipt.paymentDate).format('DD/MM/YYYY')}, {moment(this.state.orderreceipt.paymentDate).format('LT')}</h4>
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