import React from 'react';
import '../css/common.css';
import { Link } from 'react-router-dom';


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
      this.setState({
        loggedIn : true
      })
    } 
  }
  
  render(){
    if(this.state.loggedIn===false){
      return <redirect to="/login"/>
    }
 
    return(
      <div>
        <footer className="main-footer">
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
