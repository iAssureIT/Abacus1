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
      loggedIn          : false,
      studentName       : '',
      studentRegStatus  : '',
      userProfile       : ''
    }
  }

  // componentWillUpdate(){
  //   axios
  //     .get('/studentmaster/sinfo/'+localStorage.getItem("user_ID"))
  //     .then((response)=>{
  //       if(response.data){
  //         this.setState({
  //           userProfile : response.data.userProfile,          
  //         })
  //       }else{
  //         this.setState({
  //           userProfile : '/images/user.png',          
  //         })
  //       }
  //     })
  //     .catch(function (error) {
  //         console.log(error);
  //     });}
  componentWillMount(){
    const token = localStorage.getItem("token");
    const studentName = localStorage.getItem("userFirstName");
    if(token!==null){
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
          })
        }else{
          this.setState({
            studentRegStatus : "Registered"
          })
        }
      })
      .catch(function (error){
      });

    
  }
    
 
  logout(){
    var token = localStorage.removeItem("token");
    localStorage.clear(); 
        this.setState({
          loggedIn : false,          
        },()=>{
          this.props.systemlogout(true)
        })
        this.props.history.push("/");
  }

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
    if(this.state.loggedIn===false){
      return <redirect to="/login"/>
    }else{

    return(
    <div>
      <header className="main-header">
          <Link to="javascript:void(0)" className="logo navbar-fixed-top">
            <span className="logo-mini">
            <img src="/images/maatslogoSmall.png" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 dashboardLogoOESSmall" />
            </span>
            <Link to="/dashboard">
              <span className="logo-lg">
                  <img src="/images/maatslogo.png" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 dashboardLogoOES" />
              </span>
            </Link>
          </Link>
          <nav className="navbar navbar-static-top noPadCust bgnavbar nav1 studentnavbar navbar-fixed-top">
           
            <Link to="javascript:void(0)" className="sidebar-toggle" data-toggle="push-menu" role="button">
              <span className="sr-only">
                Toggle navigation
              </span>
            </Link>
            <img src="/images/2.png" className="cloud col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
       
            <div className="navbar-custom-menu c11">
              <ul className="nav navbar-nav">
                <li className="dropdown user c11 user-menu" data-dismiss="modal">
                  <Link to="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown" onClick={this.showSignout.bind(this)}>
                    <img src={this.state.userProfile} className="user-image"  />
                    <span className="hidden-xs"> {this.state.studentName} </span>
                  </Link>
                  <ul className="dropdown-menu" id="popup">
                    <li className="user-header">
                      <img src={this.state.userProfile} className="img-circle" />
                      <span>
                      <Link to="javascript:void(0)">
                        <span className="changeimgwrap">Change</span>
                      </Link>
                        <input type="file" className="chooseImgArap" accept="file/*" /*onChange={this.uploadStudentImage.bind(this)}*//>
                      </span>
                      <p>{this.state.studentName}</p>
                    </li>
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