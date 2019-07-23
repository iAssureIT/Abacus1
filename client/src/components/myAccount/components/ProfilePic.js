import React, {Component} from 'react';
import {render} 		  from 'react-dom';

import '../css/MyAccount.css';

class ProfilePic extends (Component)  {
	constructor(props){
		super(props);
		this.state={

		}
	}

	componentDidMount() {

  	}

  	componentWillMount(){

  	}

	componentWillUnmount(){
		
	}
  	
  	componentWillReceiveProps(nextProps){
  		console.log('nextProps img=>',nextProps.img);
		this.setState({
		});
  	}

	render(){
		console.log('img=>',this.props.img);
		return( <div className="col-lg-12">
					<img className="col-lg-2 col-md-12 col-sm-12 ClientImgWrap1 displayLogoOne img-responsive" /*src={this.props.img?this.props.img :"../images/loading.gif"}*//>
				</div>);
	}
}
export default ProfilePic;