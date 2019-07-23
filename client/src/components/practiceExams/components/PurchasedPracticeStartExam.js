import React, {Component} from 'react';
import axios                from 'axios';
import $                  from 'jquery';
import moment         from 'moment';


class PurchasedPracticeStartExam extends Component {
    constructor(props){
    super(props);
    this.state = ({
    showButton:true,
    "BtnIndex":'',
    "PckgIndex":'',
    showstartExamBtn : true,
    'defaultBtnTime': '00:05',
    packageID : "",
   
    });

}
    componentDidMount(){
      const studentID = localStorage.getItem("user_ID");
      this.setState({
        packageID : this.props.match.params.packageId,
      })


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
          this.setState({
            // purchasedpackage :response.data[0].instruction
          });
        })
        .catch(function(error){
          console.log(error);
        })

      axios
        .get('/packagequestionpapermaster/'+studentID)
        .then((response)=>{
          this.setState({
            PackageQPMData  :response.data,
          },()=>{
            var arr=[];
            var packageId=[];
            for (var i = response.data.length - 1; i >= 0; i--) {
              var packageId = arr.push(response.data[i].noOfAttempts.length)
            }
            this.setState({
              attemptOfpracticetest : Math.max(...arr)
            })
          })
        })
        .catch(function(error){
          console.log(error);
        })   

  }
  componentWillUnmount(){
      $("script[src='/js/adminLte.js']").remove();
      $("link[href='/css/dashboard.css']").remove();
  }

  startPracticeExam(event){
    event.preventDefault();
    var btnIndex = event.target.getAttribute('data-index');
    var pckgIndex = event.target.getAttribute('data-text');
    var orderId = event.target.getAttribute('data-id');
    const studentID     = localStorage.getItem("user_ID");
    this.setState({
       BtnIndex:btnIndex,
       PckgIndexPckgIndex:pckgIndex,
     });
    this.setState({
      showButton:false,
      showstartExamBtn:false,
    });
    var practiceExamId = event.target.value;
    var inputData = {
        quepaperID  : practiceExamId, //qpid
        packageID   : pckgIndex, //urlPackageId
        index       : parseInt(btnIndex), //BtnIndex
        orderId     : orderId, //orderId
        studentID   : studentID,
        todayDate   : moment(new Date()).format("MMM Do YY"), //convert today date into moment().format("MMM Do YY") format
    }

     axios
          .post('/purchasedpackage/startpracticeexam/'+practiceExamId+'/'+studentID)
          .then((response)=> {
            this.setState({
              startpracticeexam : response.data,
            });
          var id = response.data.ID;

          axios
              .post('/packagequestionpapermaster',inputData)
              .then((response)=> {
                  var responseData = response.data;
               
              })
              .catch(function (error) {
                  console.log(error);
                
              })

            this.props.history.push('/practiceExam/'+id+'/'+orderId+'/'+pckgIndex+'/'+btnIndex);
          })
          .catch(function (error) {
              console.log(error);
          });

    
  }

  gotoPreviousExam(event){
    var id = $(event.target).attr('id');
  }

  ExamComplete(event){
      var id = $(event.target).attr('id');
      
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

  render(){
  if(this.state.showstartExamBtn){
  return(
    <div>
      <div className="CountIncrement">0</div>
      <div className="CountDecreBackArrow">0</div>
            <div className="content-wrapper">
                <section className="content-header">
                 <h1>Start Purchased Practice Exam</h1>
                </section>
                <section className="content viewContent">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                      <div className="box">
                       {
                         

                                          !this.props.lastExamId ?
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
                                                        <form>
                                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 IagreeExamWrapC paddingleftzero paddingrightzero">
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 examTable paddingleftzero paddingrightzero">
                                                              <table className="table">
                                                                <thead>
                                                                <tr className="tableHeader">
                                                                  <th className="col-lg-2 col-md-2"> Package Details </th>
                                                                  <th className="col-lg-2 col-md-2"> Paper Name </th>
                                                                  <th colSpan={this.state.attemptOfpracticetest}> No. of Attempts : Press start button to start your exam </th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {this.state.PackageQPMData?
                                                                      this.state.PackageQPMData.map((questionPaper,indexx)=>{

                                                                        if(questionPaper.packageId==this.state.packageID){
                                                                    return (<tr className="" key={indexx}>
                                                                    <td className="col-lg-2 col-md-2 qpTestTitle purchasedlabel">{questionPaper.packageName},{questionPaper.category}/{questionPaper.subCategory}</td>
                                                                    <td className="col-lg-2 col-md-2 qpTestTitle purchasedlabel">{questionPaper.questionPaperName}</td>
                                                                    
                                                                      
                                                                    {questionPaper.noOfAttempts.map((dat,indexxx)=>{
                                                                      return dat.status==true?                             
                                                                        <td className="col-lg-2 col-md-2 attemptedTd" key={indexxx}>
                                                                          <div className="col-lg-12 col-md-12 qpTestTitle qpTestDate tdWhiteText">Attempted on : {dat.attemptedAt}</div>
                                                                        </td>
                                                                      :
                                                                      dat.status==false?
                                                                        <td className="col-lg-2 col-md-2" key={indexxx}>
                                                                        <button type="submit" className="btn btn-primary startBtnPE" name="PracticeExamName" ref="PracticeExamName" data-index={indexxx} data-text={questionPaper.packageId} data-id={questionPaper.order_id} onClick={this.startPracticeExam.bind(this)}value={questionPaper.questionPaper_id}>Attempt</button>
                                                                        </td>
                                                                        :
                                                                      <td className="col-lg-1 col-md-2" key={indexxx}><div className="col-lg-12 col-md-12 qpTestTitle qpTestDate">NA</div></td>
                                                                      })
                                                                     }
                                                                   
                                                                    </tr>)
                                                                    }else{
                                                                    return (null)}


                                                                    })

                                                                      :null
                                                                    }
                                                                    </tbody>
                                                              </table>    
                                                            </div>
                                                          </div>
                                                        </form>
                                                      </div>
                                                    </div>
                     

                                                : this.state.showButton ?
                                                  <div className=" box-header with-border boxMinHeight  studDataNotExist">
                                                    <h3 className="col-lg-12 col-md-12 col-sm-12"> Oops! It seems that you didn't complete your last exam. Do you wish to continue ? </h3>
                                                    <div>
                                                      <button className="btn btn-primary yesContinueBtn col-lg-2 col-lg-offset-4 col-md-2 col-md-offset-4 col-lg-sm col-sm-offset-4 " id={this.props.lastExamId} onClick={this.gotoPreviousExam.bind(this)}>Yes, continue</button> &nbsp;&nbsp;&nbsp;&nbsp;
                                                      <button className="btn btn-danger notContinueBtn col-lg-2 col-md-2  " id={this.props.lastExamId} onClick={this.ExamComplete.bind(this)}>No</button>
                                                  </div>
                                                  </div>
                                                  :
                                                  <div className="box-header with-border boxMinHeight  studDataNotExist loadingImgWrap">
                                                    <div>
                                                      Loading please wait...!!!
                                                    </div>
                                                    <img src="/images/preloader.gif"/>
                                                  </div>
                                             

                      
                      }
                    </div>
                    </div>
                  </div>
                </section>
            </div>
          </div>
          );
          }else{
            return(
            <div>    
              <div className="content-wrapper">
                <section className="content-header">
                 
                  <h1>Start Practice Exam </h1>
                 
                </section>
                <section className="content viewContent">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                      <div className="box">
                  <div className="box-header with-border boxMinHeight  studDataNotExist">
                      <div className="examLoadingTimeDiv">
                  {this.tryPELoadingAgainforBtn()}
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
  }
  export default PurchasedPracticeStartExam;
