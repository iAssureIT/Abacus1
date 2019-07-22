import React, {Component} from 'react';
import {browserHistory}   from 'react-router';
import { Link }           from 'react-router-dom';
import { withRouter }     from 'react-router-dom';
import { Redirect }       from 'react-router-dom';
import { history }        from 'react-router';
import $                  from "jquery";
import SystemWarning      from './SystemWarning.js';
import axios              from 'axios';
import '../css/common.css';

class StudentHeader extends (Component){
  constructor() {
   super();
    this.state = {
      loggedIn    : false,
      studentName : '',
      studentRegStatus : ''
    }
  }

  componentWillMount(){
    const token = localStorage.getItem("token");
    const studentName = localStorage.getItem("userFirstName");
    if(token!==null){
      // console.log("Header Token = ",token);
      this.setState({
        loggedIn : true,
        studentName : studentName
      })
    }

    axios
      .get('/studentmaster/details/'+localStorage.getItem("user_ID"))
      .then((response)=> {
        if(response.data==null){
          this.setState({
            studentRegStatus : "Not registered"
          },()=>{
            console.log("-------stuDataa------>>",this.state.studentRegStatus);
          })
        }else{
          this.setState({
            studentRegStatus : "Registered"
          })
        }
      })
      .catch(function (error){
        
      });

    // console.log("localstorage",localstorage)
    // if ( !$('body').hasClass('adminLte')) {
    //   var adminLte = document.createElement("script");
    //   adminLte.type="text/javascript";
    //   adminLte.src = "/js/adminLte.js";
    //   $("body").append(adminLte);
    // }
  }
    
 //  componentWillUnmount(){
 //    $("script[src='/js/adminLte.js']").remove();
 //    $("link[href='/css/dashboard.css']").remove();
 //  }
  




  // handleClick(event) {
  //     event.preventDefault();
  //     // this.setState({
  //     //   loggedIn : false
  //     // })
  //     // this.props.history.push("/login");
  //     var token = localStorage.removeItem("token");
  //     if(token!==null){
  //     console.log("Header Token = ",token);
  //     this.setState({
  //       loggedIn : true
  //     })
  //     browserHistory.push("/login");
      
  //     // browserHistory.replace("/login");
  //     // this.props.history.push("/login");
  //     // history.push('/login')
  //   }
  // }
    // handleLogout = async event => {
  //   await Auth.signOut();

  //   this.userHasAuthenticated(false);

  //   this.props.history.push("/login");
  // }
  logout(){
    var token = localStorage.removeItem("token");
    // localStorage.removeItem("justOnce");
    localStorage.clear();    
      // if(token !== null){
        console.log("Header Token = ",token);
        this.setState({
          loggedIn : false,          
        },()=>{
          this.props.systemlogout(true)
        })
        // browserHistory.push("/login");
        this.props.history.push("/");
      // }
  }

 //  studentLogin(){
 //    if(Roles.userIsInRole(Meteor.userId(), ['Student'])) {
 //        return 
 //    }else{
 //      return 
 //              {/*<li>
 //                <a href="/admin/company-info" data-toggle="control-sidebar">
 //                  <i className="fa fa-gears" />
 //                </a>
 //              </li>*/}
 //    }
 //  }

  studentLoginPhoto(){
      // var userData = Meteor.users.findOne({"_id":Meteor.userId()});
      // if(userData){
      //   var profileData = userData.profile;
      //   if(profileData){
      //     if(profileData.userProfile){
      //       return profileData.userProfile;
      //     }else{
      //       return '/images/user.png';
      //     }
      //   }
      // } else{
        return '/images/user.png';
      // }
  }

 //  getUploadImgPercentagee(){
 //    var uploadProgressPercent = Session.get("imageprogresss");
 //    // console.log('uploadProgressPercent :',uploadProgressPercent);
 //    if(uploadProgressPercent){
 //        var percentVal = parseInt(uploadProgressPercent);
 //        if(percentVal){
            
 //            var styleC = {
 //                display:"inline-block",
 //            }
 //            var styleCBar = {
 //                display:"inline-block",
 //            }
 //        }
 //        if(!percentVal){
 //            var percentVal = 0;

 //            var styleC = {
 //                width:0 + "%",
 //                display:"none",
 //            }
 //            var styleCBar = {
 //                display:"none",
 //            }
            
 //        }
 //        if(percentVal == 100){
 //            var percentVal = 0;

 //            var styleC = {
 //                width:0 + "%",
 //                display:"none",
 //                height:"8px",
 //            }
 //            var styleCBar = {
 //                display:"none",
 //                marginTop:117,
 //                height:"8px",
 //            }
           
 //        }
  
 //        return (
          
 //                <span style={styleCBar}>
 //                  <img src='/images/loading.gif' className="img-circle progressDashboard" style= {styleC}/>  
 //                </span>  
 //        );
 //      }
 //  }
  

 //  uploadStudentImage(event){
 //      event.preventDefault();
 //      let self = this;
 //      if (event.currentTarget.files && event.currentTarget.files[0]) {
 //      var file = event.currentTarget.files[0];

 //        if (file) {
 //          addStudentImgsToS3Function(file,self);
 //        }
 //      }
 //    }


     showSignout(e){
      e.preventDefault();
      $('.dropdown-menu').toggle();
     }

     closepopup(e){
      $('#popup').css("display","none");
      if(this.state.studentRegStatus=="Registered"){
        this.props.history.push('/CreateStudReg')
      }else{
         this.props.history.push('/dashboard')
      }
     }

  render(){
    {console.log("loggedIn status header = ", this.state.loggedIn)}
    if(this.state.loggedIn===false){
      return <redirect to="/login"/>
    }else{

    return(
    <div>
      <header className="main-header">
          {/* Logo */}
          <Link to="javascript:void(0)" className="logo navbar-fixed-top">
            {/* mini logo for sidebar mini 50x50 pixels */}
            <span className="logo-mini">
            <img src="/images/maatslogoSmall.png" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 dashboardLogoOESSmall" />
            </span>
            {/* logo for regular state and mobile devices */}
            <Link to="/dashboard">
              <span className="logo-lg">
                  <img src="/images/maatslogo.png" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 dashboardLogoOES" />
              </span>
            </Link>

          </Link>
          {/* Header Navbar: style can be found in header.less */}
          <nav className="navbar navbar-static-top noPadCust bgnavbar nav1 studentnavbar navbar-fixed-top">
            {/* Sidebar toggle button*/}
            <Link to="javascript:void(0)" className="sidebar-toggle" data-toggle="push-menu" role="button">
              <span className="sr-only">
                Toggle navigation
              </span>
            </Link>
            <img src="/images/2.png" className="cloud col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
            {/* Navbar Right Menu */}
            <div className="navbar-custom-menu c11">
              
              <ul className="nav navbar-nav">
                
                {/* Notifications: style can be found in dropdown.less */}
                {/*<li className="dropdown notifications-menu">
                  <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown">
                    <i className="fa fa-bell-o" />
                    <span className="label label-warning">0</span>
                  </a>
                  <ul className="dropdown-menu">
                    <li className="header">You have 10 notifications</li>
                    <li>
                      {/* inner menu: contains the actual data 
                      <ul className="menu">
                        <li>
                          <a href="javascript:void(0)">
                            <i className="fa fa-users text-aqua" /> welcome
                          </a>
                        </li>*/}
                        {/*<li>
                          <a href="javascript:void(0)">
                            <i className="fa fa-warning text-yellow" /> Very long description here that may not fit into the
                            page and may cause design problems
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0)">
                            <i className="fa fa-users text-red" /> 5 new members joined
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0)">
                            <i className="fa fa-shopping-cart text-green" /> 25 sales made
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0)">
                            <i className="fa fa-user text-red" /> You changed your username
                          </a>
                        </li>*/}
                      {/*</ul>
                    </li>
                    <li className="footer">
                      <a href="javascript:void(0)">View all</a>
                    </li>
                  </ul>
                </li>*/}
                {/* Tasks: style can be found in dropdown.less */}
                
                {/* User Account: style can be found in dropdown.less */}
              {/*  <li>
                  {
                  this.props.browserStatus == 'InValidBrowser'?
                  <SystemWarning />
                  :
                  null
                }

                </li>*/}
                <li className="dropdown user c11 user-menu" data-dismiss="modal">
                  <Link to="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown" onClick={this.showSignout.bind(this)}>
                    <img src={this.studentLoginPhoto()} className="user-image"  />
                    <span className="hidden-xs"> {this.state.studentName} </span>
                  </Link>
                  <ul className="dropdown-menu" id="popup">
                    {/* User image */}
                    <li className="user-header">
                      <img src={this.studentLoginPhoto()} className="img-circle" />
                      {/*this.getUploadImgPercentagee()*/}
                      <span>
                      <Link to="javascript:void(0)">
                        <span className="changeimgwrap">Change</span>
                      </Link>
                        <input type="file" className="chooseImgArap" accept="file/*" /*onChange={this.uploadStudentImage.bind(this)}*//>
                      </span>
                      <p>{this.state.studentName}</p>
                    </li>
                    {/* Menu Body */}
                    
                    {/* Menu Footer*/}
                    <li className="user-footer">
                      <div className="pull-left">
                        <Link to="#" className="btn btn-default btn-flat" onClick={this.closepopup.bind(this)}>My Registration</Link>
                      </div>
                      <div className="pull-right">
                        <Link to="/login">
                          <button className="btn btn-default btn-flat" onClick={this.logout.bind(this)}>Sign out</button>
                        </Link>
                      </div>
                    </li>
                  </ul>
                </li>


                {/* Control Sidebar Toggle Button */}
                {/*this.studentLogin()*/}
              </ul>
            </div>
          </nav>


          <div id="SustemInfoModal" className="modal fade" role="dialog">
            <div className="modal-dialog">           
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <h3 className="modal-title">Minimum System Requirements for the best performance : </h3>
                </div>
                <div className="modal-body">
                  <p><h4>You are using System : </h4><span className="greyText">&nbsp;{/*this.props.platformInfo*/}</span></p>
                   <p><h4>You are using Browser :</h4><span className="greyText">&nbsp;{/*this.props.browserNameAndVersion.length>1?this.props.browserNameAndVersion:"IE/Safari"*/}</span></p>
                    <p><h4>For smoothly performance of this application Minimum System Requirement is as follows :</h4> 
                      <ol>
                        <li><h4>System :</h4> <span className="greyText">Windows(Version More than 8)/ Linux/ Mac </span></li>
                        <li><h4>Browser : </h4><span className="greyText">Google Chrome (Version More than 51)/ Linux/ Mac </span></li>
                      </ol>
                    </p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>

        </header>
      </div>
    );
    }
  }
}export default withRouter(StudentHeader);