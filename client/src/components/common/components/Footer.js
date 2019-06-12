import React from 'react';
import '../css/common.css';
import { Link } from 'react-router-dom';

// import 'font-awesome/css/font-awesome.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

export default class Footer extends React.Component{
  constructor(props) {
   super(props);
   this.state={
        loggedIn : false
   }
  }
  componentDidMount(){

    const token = localStorage.getItem("token");
    if(token!==null){
      console.log("Footer Token = ",token);
      this.setState({
        loggedIn : true
      })
    }
  //   if ( !$('body').hasClass('adminLte')) {
  //     var adminLte = document.createElement("script");
  //     adminLte.type="text/javascript";
  //     adminLte.src = "/js/adminLte.js";
  //     $("body").append(adminLte);
  //   }
  }
    
  // componentWillUnmount(){
  //   $("script[src='/js/adminLte.js']").remove();
  //   $("link[href='/css/dashboard.css']").remove();
  // }
  render(){
    {console.log("loggedIn status footer = ", this.state.loggedIn)}
    if(this.state.loggedIn===false){
      return <redirect to="/login"/>
    }
    /*if(location.pathname == "/franchise/companyinfo"){  
        var mainfootershow =  "main-footer";
      // var divwrap = "col-lg-11 col-lg-offset-0 ";
      
    }else if(location.pathname == "/initial-company-setting"){
     
        var mainfootershow =  "main-footer1";
      
    }else{
        // var mainfootershow =  "main-footer";
        var mainfootershow =  "main-footer";
      
    }*/
    return(
      <div>
         <footer className="main-footer"/*mainfootershow*/>
        <div className="pull-right col-lg-12">
        </div>
        <strong>Copyright © 2019 <Link to="" className="footclr">Online Abacus</Link></strong> All rights
        reserved.
        <div className="iAssureITNM col-lg-12 ">
        <strong>Design & Developed by <Link to="http://iassureit.com">iAssure International Technology Pvt Ltd</Link></strong>
        </div>
      </footer>
      </div>
    );
  }
}
