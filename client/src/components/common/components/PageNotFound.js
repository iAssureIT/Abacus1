import React from 'react';

class PageNotFound extends React.Component{
  
  componentDidMount(){
  //   if ( !$('body').hasClass('adminLte')) {
  //     var adminLte = document.createElement("script");
  //     adminLte.type="text/javascript";
  //     adminLte.src = "/js/adminLte.js";
  //     $("body").append(adminLte);
  //   }
  }
    
  componentWillUnmount(){
    // $("script[src='/js/adminLte.js']").remove();
    // $("link[href='/css/dashboard.css']").remove();
  }
  render(){
    return(
      <div>
        <img src="https://cdn-images-1.medium.com/max/1200/1*wcdgdC4ACqyq8bxmgaHh3w.png" width="100%"/>
      </div>
    );
  }
}
export default PageNotFound;
