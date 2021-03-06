import React, { Component } from 'react';
import $ 					from "jquery";
import html2canvas 			from 'html2canvas';
import * as jsPDF 			from 'jspdf';
import axios 				from 'axios';

import '../css/CertificateCss.css';

class ParticipationCertificate extends (Component) {

	constructor(props) {
		super(props);
		this.state = {
	       facilityPermission 	: 'waitingforResult',
	       allCompetitions 		: [],
	       competitionStatus 	: true,
	       examData 			: '',

	    }
		this.printDocument=this.printDocument.bind(this);
		this.createPDF=this.createPDF.bind(this);
		this.getCanvas=this.getCanvas.bind(this);
	}

	componentWillMount(){
 		
	}
  	
	componentDidMount() {

	axios.get('/exammasters',)
        .then((response)=> {
            this.setState({
	 			allCompetitions : response.data
	 		});
        })
        .catch(function (error) {
            console.log(error);
        });
	}

	

	getCompetitionId(s){
		const studentID = localStorage.getItem("user_ID");
		var competitionId = $("#selectId option:selected").attr("id");
		var index = $("#selectId option:selected").attr("data-index");
		if(competitionId){
			$('.certicateCompWrap').addClass('addTransitionCCW');
			axios
				.get('/myexammasters/participation/'+competitionId+'/'+studentID+'/'+index)
	            .then((response)=>{
	            	this.setState({
			 			examData : response.data.data[0],
			 			competitionStatus : false,
			 		});
	            })
	            .catch(function (error) {
	                console.log(error);
	            });
		}
	}

	hideBtnShowList(event){
		$('.certicateCompWrap').removeClass('addTransitionCCW');
		$('.addMoreCerthideBtn').removeClass('addMoreCertBtn');
		$('.certicateCompWrap').css('margin-top',0.5% 'position','absolute');
	}

	printDocument(event){
	    event.preventDefault();
	    this.createPDF();
	}

	
	createPDF(){
	    alert("Please wait till document download.","success");	
	    var outerInvoiceBlock = $('.certificateWrappers'),
	    cache_width = outerInvoiceBlock.width();
	    this.getCanvas(cache_width);
	}

	

	getCanvas(cachewidth){
	    html2canvas($('.certificateWrappers').get(0)).then( function (canvas) {
	    var certificateWrappers = $('.certificateWrappers');
	      var img = canvas.toDataURL("image/png");
	      if(canvas.width > canvas.height){
	         var doc = new jsPDF('landscape','mm','a4',[canvas.width, canvas.height]);
	      }else{
	          doc = new jsPDF('p', 'mm','a4',[canvas.height, canvas.width]);
	      }
	          doc.setFontSize(16); 
	          var width           = doc.internal.pageSize.getWidth(); 
	          var height          = doc.internal.pageSize.getHeight();
	          var position = 0;
	          doc.addImage(img, 'PNG', 0, position, width, height);
	          doc.save('ParticipationCertificate.pdf');
	          certificateWrappers.width(cachewidth);
	    });
	  }

   
	render() {
		
		
       return (
       		<div>
		        <div className="content-wrapper">
			        <section className="content-header">
			            <h1>My Exam Certificate</h1>
			        </section>
		            <section className="content viewContent">
		                <div className="row">
		                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
		                		<div className="box">
		                 			<div className="box-header with-border boxMinHeight">
		                 				<div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-12 certicateCompWrap ">
											<span className="blocking-span"> 
												<select type="text" name="competitionId" ref="competitionId"  id="selectId" onClick={this.getCompetitionId.bind(this)} /*onChange={this.handleChange}*/ className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 inputText" autoComplete="off" title="Please select Category" required>
													<option value="">-- Select Competition for certificate --</option>
													{this.state.allCompetitions.map((competition,index)=>{
														return(<option key={index} className="findIndex" data-index={index} id={competition._id}>{competition.competitionName}</option>)
													  })
													}
												</select>
												<span className="floating-label floating-label-Date">Select Competition</span>					   								   			
											</span>
										</div>
										<div className="col-lg-12 col-md-12 col-sm-12 addMoreCerthideBtn" onClick={this.hideBtnShowList.bind(this)}>
											<button className="btn btn-primary" >Get more Certificates</button>
										</div>
										{!this.state.examData=="" ?
					                  		
					                  	 			<div>
					                  	 				<div id="fader"></div>
						                 				<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 studCCWrap">
				        									{/*<button className="faEvent btn pull-right" title="Click to print certificate" onClick={this.getPrint.bind(this)}><i className="fa fa-print fa-2x" aria-hidden="true"></i></button>*/}
						                        			<button id="downloadLink" className="faEvent btn pull-right certDlS partCert" title="Click to dowload certificate PDF" onClick={this.printDocument.bind(this)}><i className="fa fa-download fa-2x" aria-hidden="true"></i></button>
						                        		</div>
														<div className="certificateWrappers col-lg-12 col-md-8 col-sm-12 col-xs-12 ">
															<div className="col-lg-12 col-md-12 col-sm-4 col-xs-4 certifywrapper">
																<div className="col-lg-12 col-md-12 col-sm-4 col-xs-4 certiTitleWrapper">
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
																		<div className="UMuppercase certificateTitle col-lg-12">MENTAL ARITHMETIC & ABACUS</div>
																	</div>
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 certiTitle">	
																		<div className="UMuppercase certificateTitle2 col-lg-12">ALL INDIA TALENT SEARCH PVT. LTD.</div>	
																	</div>	
																</div>
																<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
																	<h3 className="UMuppercase certiSubTitleParticipate col-lg-12">BRINGING EXCELLENCE TO THE TOP</h3>
																</div>
																<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
																	<h5 className="col-lg-12 regesNo">Regd No. U80904PN2014PTC151064</h5>
																</div>
																<div className="col-lg-12 col-md-12 col-sm-4 col-xs-4 certificateTxtImgWrapper ">
																	<h1 className="certiPartTitle col-lg-10 col-lg-offset-1 ">Participation Certificate</h1>
																</div>
																<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
																	<p className="certificatePara col-lg-10 col-lg-offset-1 col-md-12 col-sm-4 col-xs-4">This is to certify that</p>
																</div>
																<div className="col-lg-12 col-md-12 col-sm-4 col-xs-4 txtAlgnC">
																	<span className="certificateName col-lg-12 col-md-12 col-sm-4 col-xs-4">{this.state.examData.fullName}</span>
																</div>
														
																<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
																	<p className="certifyLastLine">has participated in {this.state.examData.competitionName} of</p>
																</div>
																<div className="col-lg-8 col-lg-offset-2 col-md-8 col-sm-4 col-xs-12">
																	<p className="certifyLastTxtLine2">ABACUS and MENTAL ARITHMETIC PROGRAMME</p>
																</div>
																<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
																		<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
																			<img src="/images/_ceo_sign.png" className="img-responsive certifySignImg" alt="Loading..."/>
																			<h3 className="ceoTXt">CEO</h3>
																		</div>
																		<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
																			<img src="/images/_director.png" className="img-responsive certifySignImg" alt="Loading..."/>
																			<h3 className="ceoTXt">Director</h3>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
											
							       		:
							       			!this.state.competitionStatus ?
							       				!this.state.examData ?
													<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noCertificateMsg">Oops! You are not eligible to get the certificate.</div>
												:
													null
							       			:
							       				null
							       		}

									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>					

	    );

	} 

}export default ParticipationCertificate;



