import React, {Component} from 'react';
import { Link }           from 'react-router-dom';
import $                  from "jquery";
import axios              from 'axios';
import moment             from 'moment';
import '../css/MyAccount.css';

class MyOrder extends Component{

constructor(){
  super();
    this.state = {
        competitionId       : this.props.match.params.compId,
        reciptdata          : "",
        facilityPermission  : 'waitingforResult',
        competitonFee       : "",
        competitionregisterorderData: [],
        packageordermastersData: [],
    }
}

componentWillMount(){

}

componentDidMount(){

  const studentId = localStorage.getItem("user_ID");

    axios
        .get('/competitionregisterorder/'+studentId)
        .then((response)=> {
            console.log("-------competitionregisterorder------>>",response.data);
            this.setState({
              competitionregisterorderData : response.data,
            });
        })
        .catch(function (error) {
            console.log(error);
        });

    axios
        .get('/packageordermasters/'+studentId)
        .then((response)=> {
            console.log("-------packageordermasters------>>",response.data);
            this.setState({
              packageordermastersData : response.data,
            });
        })
        .catch(function (error) {
            console.log(error);
        });  
}

componentWillUnmount(){
}

viewreceipt(event){
  var receiptid = $(event.currentTarget).attr('recipt-link');
  // console.log("receiptid==>>",receiptid);
  // FlowRouter.go('/payment-success/' + receiptid);
  this.props.history.push('/payment-success/' + receiptid);
}

render(){
return(
<div>
  <div className="content-wrapper">
    <section className="content-header">
      <h1> My Order</h1>
    </section>
    <section className="content viewContent">
      <div className="row">
          <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
            <div className="box">
            <div className="box-header with-border boxMinHeight">
              <section className="NotificationContent">
                <div className="box-body">
                  <div className="col-lg-12">
                    <section className="NotificationContent">
                      <div className="box-body">
                      {
                        this.state.competitionregisterorderData.length>0 || this.state.packageordermastersData.length>0?
                        <div>
                        {this.state.competitionregisterorderData.map((myorder,index)=>{  
                       return(<div className="col-lg-8 col-lg-offset-2 col-sm-12 col-xs-12 col-md-8 col-md-offset-2 borderdetails " key={index}>
                                <div className="col-lg-12 col-md-12 col-sm-12 compReceipt">Competiton Receipt</div>
                              <div className="col-lg-12 col-sm-12 col-xs-12 col-md-12 payrecreg ">
                                <div className="col-lg-6 col-md-6 col-sm-6 payrecreg">
                                  <div className="col-lg-6 col-md-6 col-sm-6"><h4>Tansaction Id</h4></div>                                  
                                  <div className="col-lg-6 col-md-6 col-sm-6 payrecreg1"><h4>: {myorder.transactionId}</h4></div>                                  
                                  <div className="col-lg-6 col-md-6 col-sm-6"><h4>Amount </h4></div>                                  
                                  <div className="col-lg-6 col-md-6 col-sm-6 payrecreg1"><h4>: {myorder.competitionOriginalFees}</h4></div>                                  
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                  <div className="col-lg-6 col-md-6 col-sm-6"><h4>Date</h4></div>                                  
                                  <div className="col-lg-6 col-md-6 col-sm-6"> <h4>: {moment(myorder.paymentDate).format('DD/MM/YYYY')}</h4></div>                                  
                                  <div className="col-lg-12 col-md-12 col-sm-12"><h4 className="receiptBtn"><Link to={`payment-success/${myorder.competitionId}`}>View Receipt </Link></h4></div>                                  
                                </div>
                              </div> 
                            </div>)  
                             })}
                        {
                           this.state.packageordermastersData.map((myorder,index)=>{ 
                            return(<div className="col-lg-8 col-lg-offset-2 col-sm-12 col-xs-12 col-md-8 col-md-offset-2 borderdetails " key={index}>
                            <div className="col-lg-12 col-md-12 col-sm-12 packageReceipt">Package Receipt</div>
                                    <div className="col-lg-12 col-sm-12 col-xs-12 col-md-12 payrecreg ">
                                    <div className="col-lg-6 col-md-6 col-sm-6 payrecreg">
                                      <div className="col-lg-6 col-md-6 col-sm-6"><h4>Tansaction Id</h4></div>                                  
                                      <div className="col-lg-6 col-md-6 col-sm-6 payrecreg1"><h4>: {myorder.transactionId}</h4></div>                                  
                                      <div className="col-lg-6 col-md-6 col-sm-6"><h4>Amount </h4></div>                                  
                                      <div className="col-lg-6 col-md-6 col-sm-6 payrecreg1"><h4>: {myorder.amount}</h4></div>                                  
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                      <div className="col-lg-6 col-md-6 col-sm-6"><h4>Date</h4></div>                                  
                                      <div className="col-lg-6 col-md-6 col-sm-6"> <h4>: {moment(myorder.paymentDate).format('DD/MM/YYYY')}</h4></div>                                  
                                      <div className="col-lg-12 col-md-12 col-sm-12"><h4 className="receiptBtn"><Link to={`packagePayment-success/${myorder._id}`} >View Receipt </Link></h4></div>                                  
                                    </div>
                              </div> 
                            </div>)
                             })
                         }
                          </div>
                          :
                          <div className="box-header with-border boxMinHeight  studDataNotExist loadingImgWrap">
                            <div>
                              You have not yet purchased any exam or package...!!! 
                            </div>
                          </div>
                        }
                      </div>
                  </section>
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
);
}
}export default MyOrder;