import React,{Component} from 'react';
import $ from "jquery";

class SystemWarning extends Component {
  
  constructor(props) {
   super(props);
    this.state = {
      
    }
  }
   
  

  hideShadow(){
    $('.modal-backdrop').hide();
  }

  render(){
    return(
      <div className="warningBx"> 
        <label data-toggle="modal" data-target="#SustemInfoModal" onClick={this.hideShadow.bind(this)}><blink>Warning</blink></label>
      </div>
    );
  }
}
export default SystemWarning;