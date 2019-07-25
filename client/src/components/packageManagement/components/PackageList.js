import React, { Component } from 'react';
import { Link }             from 'react-router-dom';
import $                    from "jquery";
import axios                from "axios";
import swal                 from "sweetalert";

class PackageList extends Component  {
  constructor(props){
    super(props);
    this.state={
      post               : [],
      orderId            : '',
      studentRegStatus   : '',
    }
  }

  componentDidMount(){
    axios
      .get('/packagemanagementmasters')
      .then((response)=>{
        this.setState({
          post :response.data,
        });
      })
      .catch(function(error){
        console.log(error);
      })

      window.addEventListener('scroll', this.handleScroll);
      $(".seleectQueInput").each(function(){});
    }
  componentWillMount(){
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

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll);
  }

  addPackages(event){
    var studentId = localStorage.getItem('user_ID');
    var packageId = event.target.getAttribute('id');
    var orderId   = this.props.match.params.orderId ? this.props.match.params.orderId : "-";

    console.log("dt------>",studentId,packageId,orderId);
   //abacusapi.iassureit.com/packageordermasters/createorder/5d35633a88f89161193802a4/2pAMfuWigYxZNbW6D/ZdQp8DmsGL2Yj5uTE
    axios
      .post('/packageordermasters/createorder/'+studentId+'/'+orderId+'/'+packageId)
      .then((response)=>{
        console.log("updatepackage = ====>",response.data);
        var orderId = response.data;
        // this.props.history.push('/PackageList/'+orderId);
        this.setState({
          postman : response.data,
          orderId : packageId,
        });
      })
      .catch(function(error){
        console.log(error);
      })
  }

  buyPackages(event){
    var id = this.props.match.params;
    var orderId = this.state.orderId;
    axios
      .get('/packageordermasters/'+id)
      .then((response)=>{
        if(response.data=="packagesAdded"){
          this.props.history.push('/MyInvoice/'+orderId);
        }else if(response.data=="notAdded"){
            swal("Please Select Package","","warning");
          }else{
            swal("Please Select Package","","warning");
          }

        })
      .catch(function(error){
        console.log(error);
      })
     
  }

    handleScroll(event){
        var winHeight = $(window).height();
        var element = $(".packagebox .showBox");
        var x = 1;
          if(element){
          element.each(function(){
            var elm = $(this);
            var winTop =  $(window).scrollTop();
            var topCoord = elm.offset().top;
            if(winTop > (topCoord - (winHeight*0.95)) ){
              $(this).addClass('effect'+x);
              x++;
              if(x == 5){
                x = 1;
              }
            }
          });
        }
    }
    showDesc(event){
      event.preventDefault();
      var id =$(event.currentTarget).attr("data-target");
      $(id).css("display","block")
    }

  render(){
    return(
      <div>
        <div className="content-wrapper">
                <section className="content-header">
                    <h1>Package List</h1>
                </section>
                    <section className="content viewContent">
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                        <div className="box">
                        {this.state.studentRegStatus ?
                          (this.state.studentRegStatus=="Registered")?
                          <div className="box-header with-border boxMinHeight">
                            <div className="box-header with-border textboxborder">
                            <h4 className="reportTitle">Select packages </h4>
                            </div>
                            <div className="box-body packageboxbody  examPageWrapbtn">
                              <div className="packagebox col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                {
                                  this.state.post.length>0?
                                  this.state.post.map((Data,index)=>{
                                  return index<8?
                                    <div key={index} className="col-lg-3 col-md-4 col-xs-12 col-sm-6">
                                      <div  className="singlepackagebox  col-lg-12 col-md-12 col-xs-12 col-sm-12">
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                            <div className="checkbox checkbox-success pull-right">
                                                <input type="checkbox" className="seleectQueInput" id={Data._id}  value={Data._id} name="packageId" onClick={this.addPackages.bind(this)} />
                                                <label></label>
                                            </div>
                                          </div>                                         
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  whitetext boldtextofcost pckgtitle">{Data.packageName}</div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  whitetext boldtextofcost">
                                            <label title="Click here to see description" className="docLabel docLabelhover" data-toggle="modal" data-target={'#'+index} onClick={this.showDesc.bind(this)}><blink>Description</blink></label>
                                          </div>
                                           <div id={index} className="modal fade" role="dialog">
                                            <div className="modal-dialog">
                                              <div className="modal-content documentModal">
                                                <div className="modal-header">
                                                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                    <h4 className="modal-title">{Data.packageName}</h4>
                                                </div>
                                                <div className="modal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 modalbodyHeight">
                                                    <h5 className="modal-title">Description :</h5>
                                                     {Data.Description.length>0?
                                                      <p className="docImageView packageDescPara">{Data.Description}</p>
                                                      :
                                                      <p className="docImageView packageDescParaRed">Description not added for this package.</p>
                                                    }
                                                  </div>
                                                </div>  
                                                <div className="modal-footer">
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pckginfo">
                                          <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12 packagefontsize pckginfobox minhtpkg"> <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center pckginfoboxtext">Category Name </div> <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center pckginfoboxtext"> {Data.categoryName} </div></div>
                                          <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12 packagefontsize pckginfobox1 minhtpkg"><div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center pckginfoboxtext1">Sub Category</div><div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center pckginfoboxtext1"> {Data.subCategory} </div></div>
                                          <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12 packagefontsize pckginfobox1 minhtpkg"><div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center pckginfoboxtext1">No. of Tests</div><div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center pckginfoboxtext1"> {Data.NoOfPracticeTest} </div></div>
                                          <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12 packagefontsize pckginfobox minhtpkg"><div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center pckginfoboxtext">No. of Attempts</div><div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center pckginfoboxtext"> {Data.AttemptOfPracticeTest} </div></div>
                                        </div>
                                      </div>
                                      <div className="packagelabel col-lg-12 col-md-12 col-xs-12 col-sm-12 ">
                                        <div className="whitetext col-lg-12 col-md-12 col-sm-12 col-xs-12  boldtextofcost"><h4><i className="fa fa-inr" aria-hidden="true"></i>&nbsp;&nbsp;{Data.PackagePrice}</h4></div>
                                      </div>
                                    </div>
                                    :
                                     <div key={index} className="col-lg-3 col-md-4 col-xs-12 col-sm-6 showBox">
                                      <div  className="singlepackagebox  col-lg-12 col-md-12 col-xs-12 col-sm-12">
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                            <div className="checkbox checkbox-success pull-right">
                                                <input type="checkbox" className="seleectQueInput" id={Data._id}  value={Data._id} name="packageId" onClick={this.addPackages.bind(this)} />
                                                <label></label>
                                            </div>
                                          </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  whitetext boldtextofcost pckgtitle"> {Data.packageName}</div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  whitetext boldtextofcost">
                                            <label title="Click here to see description" className="docLabel docLabelhover" data-toggle="modal" data-target={'#'+index} onClick={this.showDesc.bind(this)}><blink>Description</blink></label>
                                          </div>
                                           <div id={index} className="modal fade" role="dialog">
                                            <div className="modal-dialog">
                                              <div className="modal-content documentModal">
                                                <div className="modal-header">
                                                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                    <h4 className="modal-title">{Data.packageName}</h4>
                                                </div>
                                                <div className="modal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 modalbodyHeight">
                                                    <h5 className="modal-title">Description :</h5>
                                                     {Data.Description.length>0?
                                                      <p className="docImageView packageDescPara">{Data.Description}</p>
                                                      :
                                                      <p className="docImageView packageDescParaRed">Description not added for this package.</p>
                                                    }
                                                  </div>
                                                </div>  
                                                <div className="modal-footer">
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pckginfo">
                                          <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12 packagefontsize pckginfobox minhtpkg"> <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pckginfoboxtext">Category Name </div> <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pckginfoboxtext">{Data.categoryName}</div></div>
                                          <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12 packagefontsize pckginfobox1 minhtpkg"><div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pckginfoboxtext1">Sub Category</div><div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pckginfoboxtext1"> {Data.subCategory}</div></div>
                                          <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12 packagefontsize pckginfobox1 minhtpkg"><div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pckginfoboxtext1">No. of Tests</div><div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pckginfoboxtext1"> {Data.NoOfPracticeTest}</div></div>
                                          <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12 packagefontsize pckginfobox minhtpkg"><div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pckginfoboxtext">No. of Attempts</div><div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pckginfoboxtext"> {Data.AttemptOfPracticeTest}</div></div>
                                        </div>
                                      </div>
                                      <div className="packagelabel col-lg-12 col-md-12 col-xs-12 col-sm-12 ">
                                        <div className="whitetext col-lg-12 col-md-12 col-sm-12 col-xs-12 boldtextofcost"><h4><i className="fa fa-inr" aria-hidden="true"></i>&nbsp;&nbsp;{Data.PackagePrice}</h4></div>
                                      </div>
                                    </div>
                                  })
                                  :
                                  <div className="box-header with-border boxMinHeight  studDataNotExist">
                                    <div>
                                      Packages Not Added
                                    </div>
                                  </div>
                                }
                              </div>
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bypackagebtnWrap">
                                    <button className="btn bypackagebtn" onClick={this.buyPackages.bind(this)}>Buy Packages</button>
                                  </div>
                            </div>
                          </div>
                          :
                          <div className="box-header with-border boxMinHeight  studDataNotExist whitebackground">
                            <div className="col-lg-offset-2 col-lg-8 col-md-offset-2 col-md-8 col-sm-offset-1 col-sm-10 col-xs-12">
                              Please Fill Registration Form <Link to="/CreateStudReg"> Click Here </Link> to Register & purchase the packages.
                            </div>
                          </div>
                        :
                        <div>
                          <section className="content viewContent">
                            <div className="row">
                              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                                <div className="box">
                                  <div className="box-header with-border boxMinHeight  studDataNotExist">
                                    <div className="startExambox col-lg-offset-2 col-lg-8 col-md-offset-2 col-md-8 col-sm-offset-1 col-sm-10 col-xs-12">
                                      <div className="fontstyle">Loading please wait...!!!</div> 
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                        </div>
                        }
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
            </div>
          )
  }
  } export default PackageList;
  