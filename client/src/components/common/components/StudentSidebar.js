import React,{Component} from 'react';
import { Link } from 'react-router-dom';

// import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { render } from 'react-dom';
// import swal from 'sweetalert';
import $ from "jquery";

import 'font-awesome/css/font-awesome.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/common.css';

class StudentSidebar extends (Component){
  constructor() {
   super();
    this.state = {
      loggedIn : false
      // subscription :{
      //   "userData" : Meteor.subscribe("userData",Meteor.userId()), 
      // }
    }
  }

componentDidMount(){
  const token = localStorage.getItem("token");
    if(token!==null){
      console.log("Header Token = ",token);
      this.setState({
        loggedIn : true
      })
    }
  // if ( !$('body').hasClass('adminLte')) {
  //   var adminLte = document.createElement("script");
  //   adminLte.type="text/javascript";
  //   adminLte.src = "/js/adminLte.js";
  //   // $("body").append(adminLte);
  // }
}
componentWillMount(){
      $('.sidebar').css({display:'block',background: '#222d32'});
}

componentWillUnmount(){
  // $("script[src='/js/adminLte.js']").remove();
  // $("link[href='/css/dashboard.css']").remove();
}

//   removePersistantSessions(){
//       UserSession.delete("progressbarSession", Meteor.userId());
//       UserSession.delete("allProgressbarSession", Meteor.userId());
//   }

//   currentUser(){
//     var LoginUserData = Meteor.users.findOne({"_id":Meteor.userId()});
//     if(LoginUserData){
//       var profile = LoginUserData.profile;
//       if(profile){
//         var firstName = profile.firstname;
//       }
//       return firstName;
//     }

//   }
  clickLiTree(event){
    event.preventDefault();
    $(event.target).parent().addClass('activeLi');
    // var checkli = $(event.target).parent().siblings('li').removeClass('activeLi');
    console.log("I'm In.......");
}

  clickTree(event){
      event.preventDefault();
      console.log("I'm In clickTree");
      console.log('$(event.currentTarget)',$(event.currentTarget));
      $(event.currentTarget).addClass('activetree');
      $(event.currentTarget).siblings('li').removeClass('activetree');
      if($("#1,#2,#3,#4,#5").hasClass("menu-open")){
        $(event.currentTarget).removeClass('menu-open');
      }else{
        $(event.currentTarget).addClass('menu-open');
      }
      $(event.currentTarget).siblings('li').removeClass('menu-open');
      $(event.currentTarget).siblings('li').children('.treeview-menu').css('display','none');
      $(event.currentTarget).siblings('li').children('.treeview-menu').children().removeClass('activeLi');
      $(event.currentTarget).children('.treeview-menu').slideToggle();
  }
 


  render(){
    {console.log("loggedIn status sidebar = ", this.state.loggedIn)}
    if(this.state.loggedIn===false){
      return <redirect to="/login"/>
    }
    return(
        <aside className="main-sidebar studentSidebar" /*onClick={this.removePersistantSessions.bind(this)}*/>
          <section className="sidebar">
            <div className="user-panel">
              <div className="pull-left image">
                <p></p>
              </div>
              <div className="pull-left info">
                <p></p>
                
              </div>
            </div>
            <div className="side1">
              <div className="div1 col-lg-12 col-md-12 col-sm-12 col-xs-12">
              </div>
              <div className="div2 col-lg-12 col-md-12 col-sm-12 col-xs-12">
              </div>
              <div className="div3 col-lg-12 col-md-12 col-sm-12 col-xs-12">
              </div>
              <div className="div4 col-lg-12 col-md-12 col-sm-12 col-xs-12">
              </div>
              <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">
              </div>
              <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">
              </div>
              <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">
              </div>
              <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">
              </div>
              <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">
              </div>
            </div>
            
            <ul className="sidebar-menu sidebar-menu1" data-widget="tree">
              <li className=""  onClick={this.clickTree.bind(this)}>
                <Link to="/dashboard" className="active">
                  <i className="fa fa-dashboard" />
                    <span>Dashboard</span>
                </Link>
              </li>
            





             <li id="1" className="treeview" onClick={this.clickTree.bind(this)}>
                <a href="javascript:void(0)">
                  <i className="fa fa-file-text" />
                  <span className="sptitle"> Main Exam</span>
                  <span className="pull-right-container">
                    <i className="fa fa-angle-left pull-right" />
                  </span>
                </a>
                <ul className="treeview-menu treeview-menu1">

                  <li onClick={this.clickLiTree.bind(this)}>
                    <Link to="/MultipleComp">
                      <i className="fa fa-circle-o" /> Start Main Exam 
                    </Link>
                  </li>
                 <li onClick={this.clickLiTree.bind(this)}>
                    <Link to="/PastExamReports">
                      <i className="fa fa-circle-o" /> Main Exam Reports 
                    </Link>
                  </li>
                  <li onClick={this.clickLiTree.bind(this)}>
                    <Link to="/CompResultReport">
                      <i className="fa fa-circle-o" /> Competition Result View
                    </Link>
                  </li>
                </ul>
              </li>






               <li id="2" className="treeview" onClick={this.clickTree.bind(this)}>
                <a href="javascript:void(0)">
                  <i className="fa fa-book" />
                  <span className="sptitle"> Practice Packages</span>
                  <span className="pull-right-container">
                    <i className="fa fa-angle-left pull-right" />
                  </span>
                </a>
                <ul className="treeview-menu treeview-menu1">

                  <li onClick={this.clickLiTree.bind(this)}>
                    <Link to="/PackageList">
                      <i className="fa fa-circle-o" /> Purchase New Package 
                    </Link>
                  </li>
                  <li onClick={this.clickLiTree.bind(this)}>
                    <Link to="/PurchasedPkg">
                      <i className="fa fa-circle-o" /> My Packages List
                    </Link>
                  </li>
                </ul>
              </li>






              <li id="3" className="treeview" onClick={this.clickTree.bind(this)}>
                <a href="javascript:void(0)">
                  <i className="fa fa-sticky-note-o" />
                  <span className="sptitle"> Practice Exam</span>
                  <span className="pull-right-container">
                    <i className="fa fa-angle-left pull-right" />
                  </span>
                </a>
                <ul className="treeview-menu treeview-menu1">

                  <li onClick={this.clickLiTree.bind(this)}>
                    <Link to="/StartPracticeExam">
                      <i className="fa fa-circle-o" /> Start Free Practice Exam 
                    </Link>
                  </li>
                   <li onClick={this.clickLiTree.bind(this)}>
                    <Link to="/PurchasedPkg">
                      <i className="fa fa-circle-o" /> Start Purchased Exam 
                    </Link>
                  </li>

                  <li onClick={this.clickLiTree.bind(this)}>
                    <Link to="/PractExamReports">
                      <i className="fa fa-circle-o" /> Practice Exam Reports 
                    </Link>
                  </li>
                </ul>
              </li>







              <li id="4" className="treeview" onClick={this.clickTree.bind(this)}>
                <a href="javascript:void(0)">
                  <i className="fa fa-certificate" />
                  <span>Certificate</span>
                  <span className="pull-right-container">
                    <i className="fa fa-angle-left pull-right" />
                  </span>
                </a>
               <ul className="treeview-menu treeview-menu1">
                  <li onClick={this.clickLiTree.bind(this)}>
                  {!this.props.examData ?
                    <Link to="/Certificate">
                      <i className="fa fa-certificate" /> Certificate 
                    </Link>
                    :
                    null
                  }
                  </li>
                  
                  <li onClick={this.clickLiTree.bind(this)}>
                    <Link to="/ParticipCert">
                      <i className="fa fa-certificate" /> Participation Certificate 
                    </Link>
                  </li>
                </ul>
              </li>







              <li id="5" className="treeview" onClick={this.clickTree.bind(this)}>
                  <a href="javascript:void(0)">
                    <i className="fa fa-user" />
                    <span> My Account</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right" />
                    </span>
                  </a>
                  <ul className="treeview-menu treeview-menu1">
                    <li onClick={this.clickLiTree.bind(this)}>
                      <Link to="/StudResetPwd"/*`/myChangePassword/${Meteor.userId()}`*/>
                        <i className="fa fa-circle-o" />  Change Password 
                      </Link>
                    </li>
                    <li onClick={this.clickLiTree.bind(this)}>

                      <Link to="/CreateStudReg" >
                        <i className="fa fa-circle-o" />  Registration Form
                      </Link>
                    </li>
                    
                    <li onClick={this.clickLiTree.bind(this)}>
                      <Link to="/MyOrder">
                        <i className="fa fa-circle-o" /> My Order
                      </Link>
                    </li>
                  </ul>
              </li>  
           </ul>
          </section>
        </aside>
    );
  }
}export default StudentSidebar;
