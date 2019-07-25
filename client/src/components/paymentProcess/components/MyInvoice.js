import React,{Component}  	from 'react';
import html2canvas 			    from 'html2canvas';
import axios                from 'axios';
import * as jsPDF 			    from 'jspdf';
import swal                 from 'sweetalert';
import $                    from "jquery";
import '../css/invoice.css';
import moment from 'moment';

//create pdf 
function createPDF(){
  var outerInvoiceBlock = $('#outerInvoiceBlock'),
  cache_width = outerInvoiceBlock.width(),
  a4  =[850,  2000];  // for a4 size paper width and height
  getCanvas().then(function(canvas){
  var img = canvas.toDataURL("image/png"),
  doc = new jsPDF({
          unit:'px', 
          format:'a4'
        }); 
        var width = doc.internal.pageSize.width;  
        var height = doc.internal.pageSize.height - 300;
        doc.addImage(img, 'JPEG',0,0,width,height);
        doc.save('Invoice.pdf');
        outerInvoiceBlock.width(cache_width);
 });
}
 
// create canvas object
function getCanvas(){
  var outerInvoiceBlock = $('#outerInvoiceBlock'),
  cache_width = outerInvoiceBlock.width(),
  a4  =[850,  2000];  // for a4 size paper width and height
 // outerInvoiceBlock.width(cache_width).css('max-width','none');
 return html2canvas(outerInvoiceBlock,{
     imageTimeout:2000,
     removeContainer:true
    }); 
}

class MyInvoice extends Component{
  constructor(){
    super();
    this.state ={
      invoiceNo       : '',
      serviceId       : '',
      serviceName     : '',
      serviceRate     : '',
      serviceDuration : '',
      userName        : '',
      userId          : '',
      companyName     : '',
      companyAddress  : '',
      companyCity     : '',
      companyState    : '',
      companyCountry  : '',
      companyPincode  : '',
      id              : '', 
      date            : '',
      rate            : '', 
      totalPrice      : '', 
      orderMasterData : [],
      invoice         : [],
      tax             : [],
      serviceArray    : [{'serviceName': 'packageData','serviceRate':200,'totalQty':222}],
    };
  }

  componentDidMount(){ 
    $('html, body').scrollTop(0);
    var orderId= this.props.match.params.orderId;
    console.log("packageId",orderId);

      axios
        .get('/packageordermasters/fetchTotal/'+orderId)
        .then((response)=>{
          console.log("packagemanagementmasters fetchTotal= ",response.data);
          var orderMasterData   =  [];
          var data   =  response.data;
          var order   =  orderMasterData.push(data);

          this.setState({
              orderMasterData   :  response.data.data,
              totalPrice        : response.data.message
          },()=>{
            localStorage.setItem('totalPrice',this.state.totalPrice);
          });
        })
        .catch(function(error){
          console.log(error);
        })

      axios
        .get('/packageordermasters/invoice/1768'/*+invoice_ID*/)
        .then((response)=>{
          console.log("invoice = ",response.data);
         
        })
        .catch(function(error){
          console.log(error);
        })

  }
	
  componentWillUnmount(){
    	
  }
  
  cancelinvoice(event){
    // event.preventDefault();
    // var path = "/ServiceRequiredData/"+this.props.invoice.serviceId+"-"+this.props.invoice.serviceName+"-"+this.props.order._id;
    // // 
    // FlowRouter.go(path);
  }



  confirm(event){ 
    event.preventDefault();
    var data = {
      mobileNumber : "7721976455",
      packageTotal : this.state.totalPrice,
      OrderId      : this.props.match.params.orderId
    }
    axios
      .post('/quickwalletmasters/payment/',data)


      .then((response)=>{
        console.log('package payment res =-----> ',response);

        if(response.data){
        
          window.location.replace(response.data);
        }
        
      })
      .catch(function(error){
        console.log("error",error);
      });
		// Meteor.call('paymentGatewayforPackageBuy',FlowRouter.getParam('id'),(error,result)=>{
		// 	if(error){
		// 	console.log('error');
		// 	}else{
		// 		window.location = result;
		// 		}
		// 	});
  }

  formatRupees(num){
    // console.log("num :"+num);
    var p = num.toFixed(2).split(".");
    return p[0].split("").reverse().reduce(function(acc, num, i, orig) {
        return  num=="-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
  }

  totalAmount(){ 
     var totalTax = 0;
     if (this.props.invoice.data) {
      if (this.props.invoice.data.length > 0) {
        var dataLength = this.props.invoice.data.length;
      }else{
        var dataLength = 1;
      }
     }else{
        var dataLength = 1;
     }
	   if (this.props.invoice.tax) {
	    if (this.props.invoice.tax.length > 0) {
	      var taxPrice              = parseFloat(this.props.invoice.tax[0].applicableTax);
	     }else{
	      var taxPrice              = 1;
	     }
	   }else{
	      var taxPrice              = 1;
	     }
	    var rate                  = parseFloat(this.props.invoice.serviceRate) * parseFloat(dataLength);
	    var taxAmt                = (parseFloat(taxPrice) / 100) *  parseFloat(rate);
	    var totalAmount           = parseFloat(taxAmt) + parseFloat(rate);
	    var totalAmt              = this.formatRupees(totalAmount);
	    return totalAmt;
  }

  printDocument(event){
    event.preventDefault();
       createPDF();
  }

  taxAmt(applicableTax){
    var taxPrice = parseFloat(applicableTax);
    // var rate     = parseFloat(this.props.invoice.serviceRate) * parseFloat(this.props.invoice.data.length);
    var taxAmt   = (parseFloat(taxPrice) / 100);
    // var taxAmt   = (parseFloat(taxPrice) / 100) *  parseFloat(rate);
    return taxAmt;
  } 

  rate(){
    //  var rate = parseFloat(this.props.invoice.serviceRate) * parseFloat(this.props.invoice.data.length);
    //  return rate;
  }
  getUserName(){
     axios
        .get('/studentmaster/details/'+localStorage.getItem("user_ID"))
        .then((response)=> {
          console.log("student details = ",response.data);
          var studentFullName = response.data.studentFullName
          return studentFullName;          
        })
        .catch(function (error){
          console.log(error);
        });
  	// var buyerData = StudentMaster.findOne({"studentId":Meteor.userId()});
  	// if(buyerData){
  	// 	var studentName = buyerData.studentFullName;
  	// }
  	// return studentName;
  }
  
  render(){
    // if(!this.props.loading){
    //   if(this.props.orderMasterData){ 
      return(
      	<div>
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <section className="content-header">
            <h1>My Invoice</h1>
          </section>
          {/* Main content */}
          <section className="content viewContent">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                <div className="box">
                  <div className="box-header with-border boxMinHeight">
		        <div className="outerServiceBlock col-lg-12 col-md-12 col-sm-12 col-xs-12" >
		          <div className="servieInnerBlock col-lg-12 col-md-12 col-sm-12 col-xs-12" id="outerInvoiceBlock">
		            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >
		              <div>
		                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 headerinvoice">
		                    <span className="col-lg-5 col-lg-offset-1 col-md-5 col-md-offset-1 col-sm-6 col-xs-7 invoicetitle">INVOICE</span>
		                    <span className="col-lg-1 col-md-1 col-sm-1 col-xs-1 mailtitle"></span>
		                    <span className="col-lg-4 col-md-4 col-sm-4 col-xs-4 addresstitle"> <br /></span>
		                    {/*<span className="col-lg-1 mailtitle downloadPdf"><i className="fa fa-file-pdf-o pull-right" title="Download as pdf" onClick={this.printDocument.bind(this)}></i></span>*/}
		                  </div>
		                  
		                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 invoicebill">
		                    <div className="col-lg-3 col-lg-offset-1 col-md-3 col-md-offset-1 col-sm-3 col-sm-offset-1 col-xs-12 clientbilled">
		                      <div className="billedto date">Billed To</div>
		                      <div className=""> {this.getUserName()}</div>
		                      <div className="clientdetails">
		                      </div>
		                    </div>
		                    <div className="col-lg-7 col-lg-offset-1 col-md-7 col-md-offset-1 col-sm-7 col-sm-offset-1 col-xs-12 clientaddress">
		                    	<div className="col-lg-6 col-md-6   textCenterInvoice">
			                      <div className="invoicenumber date">Invoice Number <br /></div>
			                      <div className="">{this.state.orderMasterData.invoiceId}</div>
		                        </div>
		                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 textCenterInvoice">            
			                      <div className="dateofissue date">Invoice Date <br /></div>
			                      <div className=""> {moment(this.state.orderMasterData.createdAt).format("DD/MM/YYYY")}</div>
		                      </div>
		                    </div>
		                    {/*<div className="col-lg-3 col-lg-offset-1 col-md-4 col-md-offset-2 invoicecount">
		                      <div className="invoicetotle">Invoice Total<br /></div>
		                      <div className=" money"><i className="fa fa-rupee"></i>{this.formatRupees(100)}</div>
		        
		                    </div>*/}

		                  </div>


		                  <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-12 dash dashFirst"></div>

		                  <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-12 table1">
		                    <table>
		                      <thead className="">
		                        <tr className="tablehead1">
		                          <th className="col-lg-8 col-md-8 col-sm-8 col-xs-8 serviceNm">Package Name </th>
		                          <th className="col-lg-2 col-md-2 col-sm-2 col-xs-2 amtcount">Unit Cost </th>
		                          <th className="col-lg-2 col-md-2 col-sm-2 col-xs-2 invoiceQuantity">Qty </th>
		                          <th className="col-lg-3 col-md-3 col-sm-3 col-xs-3 amtcount">Amount </th>
		                        </tr>
		                      </thead>
		                      {/*<tbody>
                            {
		                          this.state.orderMasterData ? 
		                           this.state.orderMasterData.map((packageData,index)=>{
		                            return(
		                              <tr key ={index} className="firstrow">
		                                <td className="col-lg-8 col-md-8 col-sm-8 col-xs-8">{packageData.packageName}<br />
  		                                <span className="textCSN">{packageData.category}, sub-Category:{packageData.subCategory} , Number of Paper: {packageData.NoOfPracticeTest}</span> 
  		                              </td>
  		                              <td className="col-lg-2 col-md-2 col-sm-2 col-xs-2 amtcount"><i className="fa fa-rupee"></i>{packageData.packagePrice}</td>
  		                              <td className="col-lg-2 col-md-2 col-sm-2 col-xs-2 invoiceQuantity">1</td>
  		                              <td className="col-lg-2 col-md-2 col-sm-2 col-xs-2 invoiceQuantity"><i className="fa fa-rupee"></i>{packageData.packagePrice * 1} </td>
		                              </tr>
		                            )
		                           })
		                          :
		                          null
		                        }
		                      </tbody>*/}
		                    </table>
		                   
		                    <hr className="hrhide"></hr>
		                 
		                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight">
		                    <div className="pull-right text-right noPadLeftRight col-lg-6 col-md-6 col-sm-6 col-xs-12">
		                      <span className="subtotal  text-right col-lg-7 col-md-7 col-sm-7 col-xs-12 noPadLeftRight">Invoice Total </span>
		                      <span className="subtotlecount  text-right col-lg-4 col-md-4 col-sm-4 col-xs-4 noPadLeftRight"><i className="fa fa-rupee"></i>{this.state.totalPrice}</span>
		                      {/* <span className="subtotlecount  text-right col-lg-4 noPadLeftRight"><i className="fa fa-rupee"></i>{this.formatRupees(this.props.invoice.totalAmount)}</span> */}
		                    </div>  
		                  </div>
		                 </div>
		                 
		                 
		                  <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12 outerButtonDiv">
		                    <a href="/PackageList">
		                    <button type="submit" className="col-lg-3 col-md-4 col-xs-12 col-sm-12 col-xs-12 btn ServiceProcessButtons pull-left" onClick={this.cancelinvoice.bind(this)}>Cancel</button>
		                    </a>
		                    <button type="submit" className="col-lg-3 col-md-4 col-xs-12 col-sm-12 col-xs-12 btn ServiceProcessButtons pull-right" onClick={this.confirm.bind(this)}>Make Payment</button>
		                   </div>
		                
		                 
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
    //  }else{
    //   return(<span>Data not available</span>);
    //  }
    // }else{
    //   return(<span>Loading... Please Wait</span>);
    // }
  } 
}
 
export default MyInvoice;
// export default  MyInvoiceContainer = withTracker(({params}) => {
// 	var orderId = FlowRouter.getParam("id");
// 	const postHandle  = Meteor.subscribe('singleOrder',orderId);
// 	const loading = !postHandle.ready();
// 	var orderMasterData = PackageOrderMaster.findOne({"_id":orderId})||{}; 
// 	if(orderMasterData.packages){
// 			var packageTotal = orderMasterData.packages.reduce((addprice,elem)=>{
// 				return  addprice + elem.packagePrice;
// 			},0);
// 	}
// 	return{
// 		loading,
// 		orderMasterData,
// 		packageTotal,
// 	}
// })(MyInvoice);