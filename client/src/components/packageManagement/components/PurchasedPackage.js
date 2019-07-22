import React, { Component }   from 'react';
import axios                  from 'axios';
import $                      from 'jquery';
// import InputMask from 'react-input-mask';

import '../css/PackageList.css';
import 'font-awesome/css/font-awesome.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

class PurchasedPackage extends Component {
    constructor(props){
      super(props);
      this.state = ({
                  showButton          :true,
                  "BtnIndex"          :'',
                  "PckgIndex"         :'',
                  instruction         :'',
                  'blnk'              :'',
                  showstartExamBtn    : true,
                  'defaultBtnTime'    : '00:05',
                  facilityPermission  : 'waitingforResult',
                  packageId           : '',
                  pckgData            : [],
                  lastExamId          : '',
                  PackageQPMData      : [],
                  practiceQPData      : [],
                  attemptOfpracticetest   : '',

                  });
    }
    componentDidMount(){
      const studentID = localStorage.getItem("user_ID");
      axios
        .get('/instructions/Practice Exam')
        .then((response)=>{
          this.setState({
            instruction :response.data[0].instruction
          });
        })
        .catch(function(error){
          console.log(error);
        })

      axios
        .get('/mypracticeexammasters/incompleteexam/'+studentID)
        .then((response)=>{
          console.log("incompleteexam = ",response.data)
          this.setState({
            lastExamId :response.data[0]._id, 
          });
        })
        .catch(function(error){
          console.log(error);
        })

      axios
        .get('/packagequestionpapermaster/'+studentID)
        .then((response)=>{
          // console.log("PackageQPMData = ",response.data)
          var arr=[];
          var packageId=[];
          for (var i = response.data.length - 1; i >= 0; i--) {
            var packageId = arr.push(response.data[i].noOfAttempts.length)
          }
          var mathMax = Math.max(...arr);
          for (var i = 0 ; response.data.length > i ; i++) {
            var attempt = response.data[i].noOfAttempts.length;
            var nullAttempt = mathMax - attempt;
            var obj={"status":"--"};    
            for (var j = 0 ; nullAttempt > j ; j++) {
              var array = response.data[i].noOfAttempts;
              var NA = response.data[i].noOfAttempts.push(obj)
            }
          }
          console.log("NewArray======== ",response.data)
          console.log("math.max = ",Math.max(...arr))
          this.setState({
            PackageQPMData        : response.data,
            attemptOfpracticetest : Math.max(...arr)
          })
        })
        .catch(function(error){ 
          console.log(error);
        })   

      // axios
      //   .get('/studentmaster/details/'+localStorage.getItem("user_ID"))
      //   .then((response)=> {
      //     axios
      //       .get('/questionpapermasters/'+response.data.category+'/'+response.data.subCategory)
      //       .then((response)=> {
      //         console.log("practiceQPData = ",response.data);
      //         this.setState({
      //           practiceQPData : response.data,
      //         });
      //       })
      //       .catch(function (error) {
      //           console.log(error);
      //       });
      //   })
      //   .catch(function (error){});
    }
    componentWillUnmount(){
        // $("script[src='/js/adminLte.js']").remove();
        // $("link[href='/css/dashboard.css']").remove();
    }
    componentWillReceiveProps(nextProps){
        if(!nextProps.loading){ 
            if(nextProps.packageReport){
              this.setState({
                    PackageData          : nextProps.packageReport.packages,
                })
        }   
        
      }
    }
    componentWillMount(){

    }

    startPracticeExam(event){
      event.preventDefault();
      const studentID     = localStorage.getItem("user_ID");
      var btnIndex        = event.target.getAttribute('data-index');
      var pckgIndex       = event.target.getAttribute('data-text');
      var orderId         = event.target.getAttribute('data-id');
      var practiceExamId  = event.target.value;

      this.setState({
         BtnIndex:btnIndex,
         PckgIndex:pckgIndex,
       });
      this.setState({
        showButton:false,
        showstartExamBtn:false,
      });

      axios
          .post('/purchasedpackage/startpracticeexam/'+practiceExamId+'/'+studentID)
          .then((response)=> {
            console.log("startpracticeexam = ",response.data);
            this.setState({
              startpracticeexam : response.data,
            });
          var id = response.data.ID;
          this.props.history.push('/practiceExam/'+id+'/'+orderId+'/'+pckgIndex+'/'+btnIndex);
          })
          .catch(function (error) {
              console.log(error);
          });
    }

    gotoPreviousExam(event){
      var id        = $(event.target).attr('id');
      this.props.history.push("/practiceExam/"+id);
    }

    ExamComplete(event){
      var id = $(event.target).attr('id');
      axios
          .post('/mypracticeexammasters/finishexam/'+id)
          .then((response)=> {
            console.log("finishexam = ",response.data);
            this.props.history.push("/PracticeStartExam");
          })
          .catch(function (error) {
              console.log(error);
          });
    }

    tryPELoadingAgainforBtn(){
      var examTime = this.state.defaultBtnTime;
      var LoadingInterval = setInterval(function() {
        if(examTime){
          var timer = examTime.split(':');
          var minutes = parseInt(timer[0], 10);
          var seconds = parseInt(timer[1], 10);
          --seconds;
          minutes = (seconds < 0) ? --minutes : minutes;
          if (minutes < 0){
          clearInterval(LoadingInterval);
          $('.examLoadingTimeDiv').html("Please check your internet connection or refresh your exam window");

          }else{
          seconds = (seconds < 0) ? 59 : seconds;
          seconds = (seconds < 10) ? '0' + seconds : seconds;
          minutes = (minutes < 10) ?  minutes : minutes;

          $('.examLoadingTimeDiv').html("Exam is loading... Please Wait");
            examTime = minutes + ':' + seconds;
          }
        }

      }, 1000);

    }

    getArray = (length) =>{
        // console.log("array length = ",length);
        var a = new Array(length);
        a.fill('-');
        // console.log("test = ",a);
        return a;
    }

    render(){
    // if(this.state.facilityPermission != 'waitingforResult' && this.state.facilityPermission == true){
    //       $('.sidebar').css({display:'block',background: '#222d32'});
    // if(this.state.PackageData){
    // if(this.state.showstartExamBtn){
    return(
      <div>
        {/*<div className="CountIncrement">0</div>
        <div className="CountDecreBackArrow">0</div>*/}
              <div className="content-wrapper">
                  <section className="content-header">
                   <h1>Start Purchased Practice Exam</h1>
                  </section>
                  <section className="content viewContent">
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                        <div className="box">
                         {
                          // !this.props.LoadingTest3 ?
                          // this.props.status !=''?
                          // !this.props.loadingTest4 ?
                          !this.state.lastExamId ?
                          // this.state.practiceQPData.length !=0 ?
                          <div className="box-header with-border boxMinHeight ">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ExamInstructionWrap ">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                Instructions for Practice Exam :
                              </div>
                              </div>
                              <div className="col-lg-12 col-md-11 col-sm-12 col-xs-12 instructionList instructionWrap">
                              {this.state.instruction}
                              </div>
                                <blink className="col-lg-12 col-md-12 col-xs-12 col-sm-12"><a href="/PackageList" className="testtitle examlinks col-lg-12 col-md-12 col-xs-12 col-sm-12 pdcls" title="Click here to buy more packages">&nbsp; Purchase New Packages</a></blink>                      
                              <form>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 IagreeExamWrapC">
                                  { this.state.PackageQPMData.length !== 0 ? 
                                      <div className="table-responsive col-lg-12">
                                        <table className="table table-striped  table-hover myTable table-bordered todaysSalesReportForpdf reportTables" id="yearlyStudRegReport">
                                          <thead>
                                            <tr className="tableHeader myAllTable">
                                              <th className="col-lg-2"> Package Details </th>
                                              <th className="col-lg-2"> Paper Name </th>
                                              <th colSpan={this.state.attemptOfpracticetest}> No. of Attempts : Press start button to start your exam </th>
                                            </tr>
                                          </thead>
                                          <tbody className="myTableData ">
                                          {this.state.PackageQPMData.map((questionPaper,indexx)=>{
                                            return (<tr className="" key={indexx}>
                                                      <td className="col-lg-2 col-md-2 qpTestTitle purchasedlabel">{questionPaper.packageName},{questionPaper.category}/{questionPaper.subCategory}</td>
                                                      <td className="col-lg-2 col-md-2 qpTestTitle purchasedlabel">{questionPaper.questionPaperName}</td>
                                                      {
                                                        questionPaper.noOfAttempts.map((dat,indexxx)=>{
                                                        return dat.status==true?
                                                          <td className="col-lg-2 col-md-2 attemptedTd" key={indexxx}>
                                                            <div className="col-lg-12 col-md-12 qpTestTitle qpTestDate tdWhiteText">Attempted on : {dat.attemptedAt}</div>
                                                          </td>
                                                        :
                                                        dat.status==false?
                                                          <td className="col-lg-1 col-md-2" key={indexxx}>
                                                            <button type="submit" className="btn btn-primary startBtnPE" name="PracticeExamName" ref="PracticeExamName" data-index={indexxx} data-text={questionPaper.packageId} data-id={questionPaper.order_id} onClick={this.startPracticeExam.bind(this)} value={questionPaper.questionPaper_id} title="Click here to start exam">Attempt</button>
                                                          </td>
                                                          :
                                                          <td className="col-lg-1 col-md-2" key={indexxx}><div className="col-lg-12 col-md-12 qpTestTitle noPadd text-center qpTestDate">NA</div></td>
                                                        })
                                                      }
                                                    </tr>
                                                    )
                                            })
                                          }
                                          </tbody>
                                        </table>
                                      </div>
                                      :null
                                      
                                    }
                                </div>
                              </form>
                            </div>
                          </div>
                        : 
                          this.state.showButton ?
                            <div className=" box-header with-border boxMinHeight  studDataNotExist">
                              <h3 className="col-lg-12 col-md-12 col-sm-12"> Oops! It seems that you didn't complete your last exam. Do you wish to continue ? </h3>
                              <div>
                                <button className="btn btn-primary yesContinueBtn col-lg-2 col-lg-offset-4 col-md-2 col-md-offset-4 col-lg-sm col-sm-offset-4 " id={this.state.lastExamId} onClick={this.gotoPreviousExam.bind(this)}>Yes, continue</button> &nbsp;&nbsp;&nbsp;&nbsp;
                                <button className="btn btn-danger notContinueBtn col-lg-2 col-md-2  " id={this.state.lastExamId} onClick={this.ExamComplete.bind(this)}>No</button>
                            </div>
                            </div>
                          :
                            <div className="box-header with-border boxMinHeight  studDataNotExist loadingImgWrap">
                              <div>
                                Loading please wait...!!!
                              </div>
                              {/*<img src="/images/preloader.gif"/>*/}
                            </div>
                            
                        }
                      </div>
                      </div>
                    </div>
                  </section>
              </div>
            </div>
          )
        //     );
        //     }else{
        //       return(
        //       <div>    
        //         <div className="content-wrapper">
        //           <section className="content-header">
        //             {!this.props.examMasterData ?
        //             <h1>Start Main Exam </h1>
        //             :
        //             <h1>Start Main Exam</h1>
        //             }
        //           </section>
        //           <section className="content viewContent">
        //             <div className="row">
        //               <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
        //                 <div className="box">
        //             <div className="box-header with-border boxMinHeight  studDataNotExist">
        //                 <div className="examLoadingTimeDiv">
        //             {this.tryPELoadingAgainforBtn()}
        //             </div>
        //             </div>
        //             </div>
        //               </div>
        //             </div>
        //           </section>
        //         </div>
        //       </div>
        //       );
        //     } 
        //     }else{
        //        return(
        //         <div> 
        //           <div className="content-wrapper">
        //             <section className="content-header">
        //               <h1>Package List</h1>
        //             </section>
        //               <section className="content viewContent">
        //                   <div className="row">
        //                     <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
        //                       <div className="box">
        //                         <div className="box-header with-border boxMinHeight">
        //                           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noCertificateMsg">Packages Not Purchased Yet...!!!</div>
        //                         </div>
        //                      </div>
        //                     </div>
        //                   </div>
        //               </section>
        //           </div>
        //         </div>
             
        //       );

        //     } 
        //     }else if (this.state.facilityPermission == false ){
        //       return (<div>{FlowRouter.go('/noAccesss')}</div>);
        //   }else if(this.state.facilityPermission == "waitingforResult"){
        //     return(<div className="col-lg-12 col-md-12 col-sm-12 waitingResLoadingWrap">
        //      <img className="loaderImageSize1" src="/images/loading1.gif" alt="loading"/>
        //   </div>);
        //   }else{ 
        //   return (<div className="col-lg-12 col-md-12 col-sm-12 waitingResLoadingWrap"><h3>You don't have access.</h3></div>);
        // }    
        //   }
      }
} export default PurchasedPackage;
// export default IAgreeAndStartExamContainer = withTracker(props=>{

// var urlPackageId= FlowRouter.getParam("packageId");
// clearInterval(Session.get("interval"));

// const postHandle   = Meteor.subscribe("LoginInStudent",Meteor.userId());
// const LoadingTest  = !postHandle.ready();
// var studentData    = StudentMaster.findOne({"studentId":Meteor.userId()})||{};

// var buyerID = Meteor.userId();
// // var myPackageHandle = Meteor.subscribe("allPackageOrder");
// var myPackageHandle = Meteor.subscribe("allPackageOrderStudentwise",buyerID);
// var loadingData     = !myPackageHandle.ready(); 
// var packageReport  = PackageOrderMaster.findOne({"buyerId":buyerID,"status":"paid"});
// // console.log("packageReport",packageReport);

// const postHandle2  = Meteor.subscribe("instruction_PE");
// const loadingTest2 = !postHandle2.ready();
// var PE_Instruction    = InstructionMaster.findOne({"instructionFor" : "Practice Exam"})||{};

// // var postHandle3    = Meteor.subscribe("quesPaperPracticeExam");
// var   LoadingTest3    = !postHandle.ready();
// const postHandle4     =  Meteor.subscribe('InCompletedExam');

// const loadingTest4    = !postHandle4.ready();
// const postHandle6     =  Meteor.subscribe('LoginStudTodaysExam',moment().format("DD/MM/YYYY"));

// const loadingTest6    = !postHandle6.ready();
// const postHandle5     =  Meteor.subscribe('loginUserPackageQP',Meteor.userId());
// const loadingTest5    = !postHandle5.ready();

// // const postHandlePackage   = Meteor.subscribe("packageManagementData");
// // const LoadingPackage  = !postHandlePackage.ready();

// if(studentData.studentEmail){
//   var postHandle3    = Meteor.subscribe("quesPaperPracticeExamSingle",studentData.category,studentData.subCategory);
//   var practiceQPData =  QuestionPaperMaster.find({"category":studentData.category, "subCategory":studentData.subCategory, "examType" : "Practice Exam","isDraft":"","paperStatus" : "Assigned"}).fetch();
//   // console.log("practiceQPData",practiceQPData);
//   var myPracticeExamMasterData = MyPracticeExamMaster.findOne({"StudentId":Meteor.userId(),"examStatus":"InCompleted"})||{};
//   var myPEMSEStatus = MyPracticeExamMaster.find({"StudentId":Meteor.userId(),"date":moment().format("DD/MM/YYYY")}).fetch();
//   var PackageQPMData = PackageQuestionPaperMaster.find({"buyerId":Meteor.userId()},{fields:{"companyId":0,"franchiseId":0,"studentFullName":0,"buyerId":0}}).fetch();
//   var attemptArray=[];
//   if(PackageQPMData && PackageQPMData.length> 0 ){
//     for(var i = 0;i<PackageQPMData.length;i++){
//       var idd=PackageQPMData[i].packageId;
//       var  postHandlePackage   = Meteor.subscribe("packageManagementDataPackageIdwise",idd);
//       var  LoadingPackage  = !postHandlePackage.ready();
//       var pckgData = PackageManagementMaster.findOne({"_id":idd});
//       // console.log("pckgData",pckgData);

//       if(pckgData){
//        PackageQPMData[i].AttemptOfPracticeTest = parseInt(pckgData.AttemptOfPracticeTest);
//        attemptArray.push(parseInt(pckgData.AttemptOfPracticeTest));
//       }
//     }
//   }
//   var  sorted = attemptArray.slice().sort(function(a, b) {
//     return a - b;
//   });
//    var maxAttempt  = sorted[sorted.length - 1];
//    var blankCount=[];
//     if(PackageQPMData && PackageQPMData.length> 0 ){
//     for(var i = 0;i<PackageQPMData.length;i++){
//       blankCount.push(maxAttempt-PackageQPMData[i].AttemptOfPracticeTest);
       
//     }
//   }
//   for(i=0;i<blankCount.length;i++){
//     var cnt=blankCount[i];   
//     for(z=0;z<=cnt;z++){
//       var obj={"status":"--"};    
    
//      if(PackageQPMData && PackageQPMData.length> 0 ){
//         for(var i = 0;i<PackageQPMData.length;i++){
//            // PackageQPMData[i].noOfAttempts.push(obj);
//            if(PackageQPMData[i].noOfAttempts.length<maxAttempt){
//             PackageQPMData[i].noOfAttempts.push(obj);
//            }else{
//                null
//            }
//         }
//       }
//     }
//     obj='';
//   }

//   if(myPracticeExamMasterData){
//     var lastExamId = myPracticeExamMasterData._id;
//   }else{
//     var lastExamId = '';
//   }
// }else{
//   var status = '';
// }




// return {
// LoadingTest,
// loadingTest2,
// LoadingTest3,
// loadingTest4,
// practiceQPData,
// status,
// PE_Instruction,
// lastExamId,
// PackageQPMData,
// myPEMSEStatus,
// LoadingPackage,
// urlPackageId,
// packageReport,
// maxAttempt,
// blankCount,

// }

// })(PurchasedPackage);
