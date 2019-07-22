import React, {Component} from 'react';
import {render} from 'react-dom';
import swal from 'sweetalert';
import $ from "jquery";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import axios from 'axios';


import '../css/Exam.css' ;

export default class CompetitionResultReport extends (Component) {	
	constructor(){
		super();
		this.state ={
			compStudDataCount 		: 0,
			dataRange 				: 100,
			competitionDeclared 	: '',
			limitRange 				: 100,
			startRange 				: 0,
			counter 				: 1,
			competitionId 			: '',
			categoryName  			: 'ALL',
			subCategory 			: 'All',
			studentNameCWTM 		: '',
			franchiseId 			: '',
			franchise 				: '',
			allCategoryWiseStudent	: [],
			allCompetitions  		: [],
			allFranchiseData 		: [],
			paginationArray  		: [],
			showAllCategories  		: [],
			singleCategory  		: [],
		}
		this.handleChange 	  = this.handleChange.bind(this);
		this.getFranchiseId   = this.getFranchiseId.bind(this);
		this.getSWTMTextValue = this.getSWTMTextValue.bind(this);
		this.showGridView 	  = this.showGridView.bind(this);
		this.showListView 	  = this.showListView.bind(this);
		this.getResultData 	  = this.getResultData.bind(this);
	}

	componentWillMount(){
		// this.paginationFunction();
	}

	componentDidMount(){
	 	axios
	 		.get('/exammasters',)
            .then((response)=> {
                console.log("-------examMasters------>>",response.data);
                this.setState({
		 			allCompetitions : response.data
		 		});
                // localStorage.setItem("token",response.data.token);
                // direct.setState({loggedIn:response.data.token})
            })
            .catch(function (error) {
                console.log(error);
            });
		axios
			.get('/categories/categoriesname',)
            .then((response)=> {
                console.log("-------Show Category------>>",response.data);
                this.setState({
		 			showAllCategories : response.data,
		 		});
                // localStorage.setItem("token",response.data.token);
                // direct.setState({loggedIn:response.data.token})
            })
            .catch(function (error) {
                console.log(error);
            });

	// 	Meteor.call("allFranchiseData",(err,res)=>{
	//  		this.setState({
	//  			allFranchiseData : res,
	//  		});
	// 	});
	}


	handleChange(event) {
	    const target = event.target;
	    const name = target.name;

	    this.setState({
	      [name]: event.target.value
	    });		
	}

	getFranchiseId(event){
		var franchiseId = $("#franchiseId option:selected").attr('id');
			this.setState({
				franchiseId : franchiseId,
		},()=>{/*this.studWiseTestMonthlyData()*/});
	}

	getCompetitionId(event){
		// Session.set('pageNumber',this.state.counter);
		var competitionId = $("#competitionId option:selected").attr("id");
		// Meteor.call("getCompetitionDeclareStatus",competitionId,
		// 	(err,res)=>{
		// 	if(err){
		// 		console.log(err);
		// 	}else{
		// 		if(res){
		// 			if(res.result=="Declared"){
		// 				this.setState({
		// 					competitionDeclared : true
		// 				})

		// 			}else{
		// 				this.setState({
		// 					competitionDeclared : false
		// 				})
		// 			}

		// 		}				
		// 	}
		// });
		this.setState({
			competitionId : competitionId,
		},()=>{this.getResultData();});
	}

  	getCategoryName(event){
		var categoryName = $(event.target).val();
		this.setState({
			categoryName : categoryName,
		},()=>{
			this.getResultData();
		});
		axios
			.get('/categories/'+categoryName)
            .then((response)=> {

                var	totalSubCatg = response.data.levels.length;
				if(totalSubCatg > 0){
					var subCatarray =[];
					for(var i=1; i<=totalSubCatg;i++){
						var subCat = categoryName+i;
						subCatarray.push(subCat);
					}
            	console.log("subCatarray response--->",subCatarray);
					this.setState({
						subCatarray : subCatarray,
					});
				}
            })
            .catch(function (error) {
                console.log(error);
            });
	}

	getSubCategoryName(event){
		var categorySubName = $(event.target).val();
		this.setState({
			subCategory : categorySubName,
			startRange:0,
			counter: 1,
		},()=>{this.getResultData();
		});		
	}


	getResultData(){

		axios
	 		.get('/myexammasters/'+this.state.categoryName+'/'+this.state.subCategory+'/'+this.state.competitionId+'/'+this.state.startRange+'/'+this.state.dataRange)
            .then((response)=> {
                console.log("-------res exam------>>",response.data);
                this.setState({
		 			allCategoryWiseStudent : response.data
		 		});
                // localStorage.setItem("token",response.data.token);
                // direct.setState({loggedIn:response.data.token})
            })
            .catch(function (error) {
                console.log(error);
            });


	}

	showhideSubCatDetails(event){		
		$('.categoryListDataStudC').toggleClass('categoryListDataStudCshow');
	}

	getSWTMTextValue(event){
		var studentName= $('.SearchStudentCWTMName').val();
		if(studentName){
			var RegExpBuildValue = this.buildRegExp(studentName);
			this.setState({
				studentNameCWTM : RegExpBuildValue,
			},()=>{this.studWiseTestMonthlyData()});
		}else{
			this.setState({
				studentNameCWTM : '',
			},()=>{this.studWiseTestMonthlyData()});
		}
	}

	showGridView(){
		$('#gridView').show();
		$('#listView').hide();
		$('#test-table-xls-button').hide();

	}
	showListView(){
		$('#listView').show();
		$('#test-table-xls-button').show();
		$('#gridView').hide();
	}

// 	currentMonth(){
// 		var monthSession = Session.get('selectedMonth');
// 		if(monthSession){
// 			var currentMonth = monthSession;
// 		}else{
// 			var today = moment().startOf('month');
// 			var yyyy = moment(today).format("YYYY");
// 		    var monthNum = moment(today).format("MM");
// 		    var currentMonth = yyyy+"-"+monthNum;
// 			Session.set("selectedMonth",currentMonth);
// 			}
// 		return currentMonth;
// 	}

// 	previousMonth(event){
// 		event.preventDefault();
// 		var selectedMonth = $("input#monthlyValue").val();
// 		var newMonthDt = moment(selectedMonth).subtract(1, 'months').format("YYYY-MM-DD");
// 		var newMonthNumber = moment(newMonthDt).format("MM");
// 		//Construct the WeekNumber string as 'YYYY-MM'
// 		var yearNum=moment(newMonthDt).format("YYYY");
// 		var newMonth = yearNum+"-"+newMonthNumber;

// 		Session.set('selectedMonth', newMonth);
// 		this.studWiseTestMonthlyData();
// 	}

// 	nextMonth(event){
// 		event.preventDefault();
// 		var selectedMonth = $("input#monthlyValue").val();
// 		var newMonthDt = moment(selectedMonth).add(1, 'months').format("YYYY-MM-DD");
// 		var newMonthNumber = moment(newMonthDt).format("MM");
// 		//Construct the WeekNumber string as 'YYYY-MM'
// 		var yearNum=moment(newMonthDt).format("YYYY");
// 		var newMonth = yearNum+"-"+newMonthNumber;
// 		Session.set('selectedMonth', newMonth);
// 		this.studWiseTestMonthlyData();
// 	}

// 	studWiseTestMonthlyData(){
// 		Session.set('pageNumber',this.state.counter);
// 		this.paginationFunction();
// 		var monthDateFromSess = Session.get("selectedMonth");			
// 	  	var monthDateStart  = new Date(moment(monthDateFromSess).month("YYYY-MM"));//Find out first day of month with selectedMonth
// 	  	var monthDateToSess = new Date(moment(monthDateFromSess).add(1,"M"));
// 			if(!this.state.studentNameCWTM){
// 				Meteor.call("getCategoryWiseSWTT",this.state.categoryName,this.state.subCategory,this.state.competitionId,this.state.startRange,this.state.dataRange,
// 					(err,res)=>{
// 					if(err){
// 						console.log(err);
// 					}else{
// 						if(res){
// 							this.setState({
// 								allCategoryWiseStudent : res,
// 							});
// 					}else{
// 							$('.addLoadinginRepo').html("Reports are loading please wait...")
// 						}
// 					}
// 				});
// 			}else{
// 				Meteor.call("getCategoryWiseSWTTSearch",this.state.categoryName,this.state.studentNameCWTM,this.state.competitionId,
// 					(err,res)=>{
// 						if(err){
// 							console.log(err);
// 						}else{
// 							if(res){
// 								this.setState({
// 									allCategoryWiseStudent : res,
// 								});
// 							}else{
// 								$('.addLoadinginRepo').html("Reports are loading please wait...")
// 							}
// 						}
// 					});
// 			}
// 	}

	// buildRegExp(searchText) {
	//    var words = searchText.trim().split(/[ \-\:]+/);
	//    var exps = _.map(words, function(word) {
	//       return "(?=.*" + word + ")";
	//    });

	//    var fullExp = exps.join('') + ".+";
	//    return new RegExp(fullExp, "i");
	// }

// 	getFranchiseName(studentId){
// 		var postHandle = Meteor.subscribe("LoginInStudent",studentId).ready();
// 		if(postHandle){
// 			var studData = StudentMaster.findOne({"studentId":studentId});	
// 			if(studData){		
// 				return studData.franchiseName;
// 			}
// 		}	
// 	}

// 	//----------- pagination number click function  --------------------//
	getQuestionStartEndNum(event){
		var limitRange = $(event.target).attr('id');
		// console.log("limitRange ----> ",limitRange);
		limitRange     = parseInt(limitRange);
		var startRange = limitRange - this.state.dataRange;
		$('.page-link').removeClass('active');
		var counter = $(event.target).text();
		// Session.set('pageNumber',counter);

		$(".liNext").css("cursor","pointer");
			// if(Session.get("questionCount")==counter){
			$(".liNext").css("cursor","not-allowed");
		// }
		this.setState({
			startRange : startRange,
			counter    : counter,
		},()=>{this.studWiseTestMonthlyData()});
		
			
	}

// //------------------ this function call when click on next arrow ------------------//
// 	nextPagee(event){
// 		// console.log("this.state.counter",this.state.counter);
// 		var counter = this.state.counter;
// 		counter++;
// 		// console.log('counter ---> ',counter);
// 		var questionCount = Session.get("questionCount");

// 		if(questionCount>=counter){
// 			Session.set('pageNumber',counter);
// 			$('.page-link').removeClass('active');
// 			$(".pagination"+ counter).addClass("active");
// 			var limitRange = $('.active').attr('id');
// 			// console.log("limitRange",limitRange);
// 			var startRange =  parseInt(limitRange)- this.state.dataRange;
// 			if(startRange){
// 			this.setState({
// 				counter    : counter,
// 				startRange : startRange,
// 				// questionLimit: limitRange,
// 			},()=>{this.studWiseTestMonthlyData()});
// 		}
// 		}else if(questionCount==counter){
// 			// this.CategoryAndSubCatQuestion();
// 			$(".liNext").attr("disabled", true);
// 		}
		
// 	}

// 	previousPage(){		
// 		var counter = this.state.counter;
// 		counter--;
// 		// console.log('counter ---> ',counter);
// 		var questionCount = Session.get("questionCount");

// 		// if(questionCount>=counter){
// 			Session.set('pageNumber',counter);
// 			$('.page-link').removeClass('active');
// 			$(".pagination"+counter).addClass("active");
// 			var limitRange = $('.active').attr('id');
// 			var startRange =  parseInt(limitRange)- this.state.dataRange;
// 			if(startRange){
// 			this.setState({
// 				counter    : counter,
// 				startRange : startRange,
// 				// questionLimit: limitRange,
// 			},()=>{this.studWiseTestMonthlyData()});
// 		}
// 		// }else if(questionCount==counter){
// 			// this.CategoryAndSubCatQuestion();
// 			// $(".liNext").attr("disabled", true);
// 		// }
// 	}
// //------- create pagination for table --------------// 
	paginationFunction(event){

		// Meteor.call('getcompetitionwiseStudCount',this.state.competitionId,this.state.categoryName,this.state.subCategory,(err,res)=>{
			// if(err){

			// 	}else{
				
			// 	if(res[0]=="getCount"){
			// 		this.setState({
			// 			compStudDataCount : res[1],
			// 		});

			// 		const maxRowsPerPage = this.state.limitRange;
			// 		var compStudDataCount = this.state.compStudDataCount;
			// 		// console.log("compStudDataCount",compStudDataCount);
			// 		var paginationNum = parseInt(compStudDataCount)/maxRowsPerPage;
			// 		var pageCount = Math.ceil(paginationNum);
			// 		Session.set("questionCount",pageCount);
			// 		paginationArray = [];
			// 		// paginationArray.push(
			// 		// 		<li  key={-1} className="page-item"><a className="page-link liNext" onClick={this.previousPage.bind(this)}><i className="fa fa-angle-double-left" aria-hidden="true"></i></a></li>
			// 		// 	);
			// 		for (var i=1; i<=pageCount;i++){
			// 			var countNum = maxRowsPerPage * i;
			// 			paginationArray.push(
			// 				<li key={i} className="page-item" title={"Click to jump on "+i+ " page"}><a className={"page-link pagination"+i} id={countNum} onClick={this.getQuestionStartEndNum.bind(this)}>{i}</a></li>
			// 			);
			// 		}
			// 		if(pageCount>=1){
			// 			// paginationArray.push(
			// 			// 	<li  key={-2} className="page-item"><a className="page-link liNext" onClick={this.nextPagee.bind(this)}><i className="fa fa-angle-double-right" aria-hidden="true"></i></a></li>
			// 			// );
			// 			this.setState({
			// 				paginationArray : paginationArray,
			// 			});
			// 		}
			// 	}
			// }
		// });
	}

// 	componentDidUpdate(){
// 		$('.page-link').removeClass("active");
// 		$('.pagination'+this.state.counter).addClass("active");
//     	// Session.set('pageUMNumber',this.state.counter);
// 	}

// 	removeStudentFromCompetition(event){
// 	    var studentId     = event.target.id;
// 	    var competitionId = $(event.target).attr('name');
// 	    var dataRange     = this.state.dataRange;
// 	    var startRange    = this.state.startRange;
// 	    var categoryName  = this.state.categoryName;
// 	    var subCategory   = this.state.subCategory;
// 	    swal({
// 			  title              : 'Are you sure,Do you want to Delete?',
// 			  text               : 'You will not be able to recover this Record!',
// 			  type               : 'warning',
// 			  showCancelButton   : true,
// 			  confirmButtonColor : '#dd6b55',
// 			  cancelButtonColor  : '#d44',
// 			  confirmButtonText  : 'Yes, Delete it!',
// 			  cancelButtonText   : 'No, Keep it',
// 			  closeOnConfirm     : false
// 			},(rslt)=> {
// 		    Meteor.call("removeStudentFromSelectedCompetition",studentId,competitionId,(err,res)=>{
// 		    	if(err){
// 		    		console.log(err);
// 		    	}else{
// 		    		if(res=="studRemoved"){
// 		    			Meteor.call("getCategoryWiseSWTT",categoryName,subCategory,competitionId,startRange,dataRange,
// 							(err,res)=>{
// 							if(err){
// 								console.log(err);
// 							}else{
// 								if(res){
// 									this.setState(state=>({
// 										allCategoryWiseStudent : res,
// 									}));
// 							}else{
// 									$('.addLoadinginRepo').html("Reports are loading please wait...")
// 								}
// 							}
// 						});
// 		    			swal('Student deleted from competition successfully','','success');
// 		    			// this.studWiseTestMonthlyData();
// 		    		}
// 		    	}
// 		    });
// 		});
// 	}

	render() {
		const subCatgArray = this.state.subCatarray;
	       return (
	       		<div>
		        {/* Content Wrapper. Contains page content */}
		        <div className="content-wrapper">
		          {/* Content Header (Page header) */}
		          <section className="content-header">
		            <h1>Competition Result View</h1>
		          </section>
		          {/* Main content */}
		          <section className="content viewContent">
		            <div className="row">
		              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
		                <div className="box">
		                  <div className="box-header with-border boxMinHeight">
		                   <div className="box-header with-border">
					            <h3 className="box-title">Competition Result View</h3>
					        </div>
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 topSpace">
											<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 selectCatSubCatListt paddingleftzero tableAlignment">

												<div className="col-lg-4  col-md-4 col-sm-4 col-xs-12 paddingleftzero">

													<span className="blocking-span"> 
														<select type="text" name="competitionId" ref="competitionId"  id="competitionId" onClick={this.getCompetitionId.bind(this)} onChange={this.handleChange} className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 inputText" autoComplete="off" title="Please select Category" required>
															<option value="">-- Select Competition --</option>
															{this.state.allCompetitions.map((competition,index)=>{
																// {console.log("competition-->",this.state.allCompetitions)}
																return <option key={index} id={competition._id}>{competition.competitionName}</option>
															  })
															}
														</select>
														<span className="floating-label floating-label-Date">Select Competition</span>					   								   			
													</span>
												</div>
												<div className="col-lg-2 col-md-2 col-sm-2 col-xs-6">
													<span className="blocking-span"> 
														<select type="text" name="categoryName" ref="categoryName" value={this.state.categoryName} onClick={this.getCategoryName.bind(this)} onChange={this.handleChange} className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 inputText" autoComplete="off" title="Please select Category" required>
															<option value="">-- Select Category --</option>
															<option value="all" id="all">ALL</option>
															{this.state.showAllCategories.map((categories,index)=>{
																return <option key={index}>{categories.categoryName}</option> 
															  })
															}
														</select>
														<span className="floating-label floating-label-Date">Select Category</span>					   								   			
													</span>
												</div>
												<div className="col-lg-2 col-md-2 col-sm-2 col-xs-6">
													<span className="helpSecSR" title="Help" onClick={this.showhideSubCatDetails.bind(this)} ><i className="fa fa-question-circle"></i></span>
													<div className="categoryListDataStudC">
														<label>A1/B1/C1/D1</label> : Below 7 year<br/>
														<label>A2/B2/C2/D2</label> : 7-9 year<br/>
														<label>A3/B3/C3/D3</label> : 9-11 year<br/>
														<label>A4/B4/C4/D4</label> : 11-14 year<br/>
													</div>
													<span className="blocking-span"> 
														<select type="text" name="subCategory" ref="subCategory" value={this.state.subCategory} onClick={this.getSubCategoryName.bind(this)}className="form-control subCatTab col-lg-12 col-md-12 col-sm-12 col-xs-12 inputText" onChange={this.handleChange.bind(this)} required>
															<option value="">-- Select Sub Category --</option>
															<option value="all" id="all">ALL</option>
															{subCatgArray ? subCatgArray.map((subcat,index) =>{ 
																console.log("subcat render",subcat)
																return (<option key={index}> {subcat} </option>);
															 }) : '<option> No Data </option>' }
														</select>
														<span className="floating-label floating-label-Date">Select Sub Category</span>					   			
													</span>
												</div>
												<div className="col-lg-4  col-md-4 col-sm-4 col-xs-12 bottomSpace paddingrightzero">
										       		<span className="blocking-span">
										           		<input type="text" name="search" placeholder="Search Student Name" className="col-lg-12 col-sm-12 SearchExam SearchStudentCWTMName inputTextSearch" onInput={this.getSWTMTextValue.bind(this)} required/>
										       		</span>
										        </div>
											</div>
										</div>
								    <div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
								    	<div className="btn btn-primary col-lg-2" onClick={this.showGridView.bind(this)}>Grid View</div>
								    	<div className="btn btn-primary col-lg-2 leftSpace" onClick={this.showListView.bind(this)}>List View</div>
								    </div>
								    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									    <div id={this.state.allCategoryWiseStudent.length>0?"gridView":"nonebx"} className="col-lg-12 col-md-12 resultViewBox">
									    	<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
											    {this.state.allCategoryWiseStudent?
											    	this.state.allCategoryWiseStudent.map((allStudentView,ind)=>{
											    	return (
											    		<div key={ind}className="col-lg-2 col-md-2 col-xs-12 col-sm-12 resultViewDiv">
											    			<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 ">
												    			{/*<div className="col-lg-10 col-md-10 col-lg-offset-1 col-md-offset-1 col-xs-12 col-sm-12 profileCircle"></div>*/}
												    			<img className="col-lg-12 col-md-12 profileCircle" src={allStudentView.studImg?allStudentView.studImg:"/images/user.png"}/>
												    			<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 text-center">
													    			<div className="studName">{allStudentView.firstName}{allStudentView.lastName}</div>
													    			{/*<div className="studName"></div>*/}
													    			{this.state.competitionDeclared==true?<div className="studOtherInfo">Rank : {allStudentView.rank} </div>:null}
													    			<div className="studOtherInfo">Category : {allStudentView.category} - {allStudentView.subCategory}</div>
													    			<div className="studOtherInfo">Score : {allStudentView.totalScore}</div>
													    		</div>
												    		</div>
											    		</div>
											    		
											    	)

											    	}):
											    	null

												}
											</div>
									    </div>
									</div>

										<h4 className="col-lg-12 col-md-12 reportTitle text-center">
										{ this.state.allCategoryWiseStudent.length != 0 ?
								         <ReactHTMLTableToExcel
							                    id="test-table-xls-button"
							                    className="pull-right dwnldAsExcel fa fa-download download-table-xls-button btn report-list-downloadXLXS"
							                    table="monthlyStudWiseTest"
							                    filename="MonthlyStudWiseTest"
							                    sheet="tablexls"
							                    buttonText=""/>

							                    :

							                <div className="pull-right"></div>
							        	}
										</h4>
										<form id="listView" className="todaysSalesReport">
											<div>
												<div className="break col-lg-12 col-md-12"></div>
													
													<div className="table-responsive col-lg-12">
													<table className="table table-striped  table-hover table-bordered reportTables" id="monthlyStudWiseTest">
														<thead>
															<tr className="tableHeader myAllTable">
																<th className="tab-Table">Sr. No</th>
																<th> Student Name </th>
																<th> Competition Name </th>
																<th className="tab-Table">Total Questions</th>
																<th className="tab-Table">Attempted</th>
																{/*<th className="tab-Table">Correct Ques</th>*/}
																{/*<th className="tab-Table">Wrong Ques </th>*/}
																{ this.state.allCategoryWiseStudent.length != 0 ?
																		this.state.categoryName=="all" || this.state.subCategory=="all"?
																		<th className="tab-Table">Marks</th>
																		:												
																		<th className="tab-Table">
																			Marks out of({this.state.allCategoryWiseStudent[0].totalMarks})
																		</th>
																	:
																	<th className="tab-Table">Marks</th>
																}
																<th className="tab-Table">Time (mm:ss) </th>
																<th className="tab-Table">Status</th>
																<th className="tab-Table">Rank</th>
																{/*<th className="tab-Table">Action</th>*/}
															</tr>
														</thead>
														{ this.state.allCategoryWiseStudent.length != 0 ?
														<tbody className="">
															{/*{this.studWiseTestMonthlyData()}*/}
															{this.state.allCategoryWiseStudent.map((allStudent,index)=>{
															return <tr key={index} className={this.state.competitionDeclared==true?"rank"+allStudent.rank:null}>
																<td className="tab-Table">{/*parseInt(Session.get('pageNumber')- 1) * (this.state.dataRange) + (index + 1)*/}</td>
																{/*<td><a href={/StudentInformations/+allStudent.StudentId}>{allStudent.firstName} {allStudent.lastName}</a>*/}
																{	/*Roles.userIsInRole(Meteor.userId(), ['Admin','superAdmin'])?
																	<td><a className="studentbluelabel" href="#">{allStudent.firstName} {allStudent.lastName}</a>
																		<div className="franchName">{this.getFranchiseName(allStudent.StudentId)}</div>
																	</td>
																	:*/
																	<td><a className="studentbluelabel" href="#">{allStudent.firstName} {allStudent.lastName}</a>
																		<div className="franchName">{/*this.getFranchiseName(allStudent.StudentId)*/}</div>
																	</td>

																}
																<td >{allStudent.competitionName}</td>
																<td className="tab-Table">{allStudent.totalQuestion}</td>
																<td className="tab-Table">{allStudent.attemptedQues}</td>
																{/*<td className="tab-Table">{allStudent.correctAnswer}</td>*/}
																{/*<td className="tab-Table">{allStudent.wrongAnswer}</td>*/}
																<td className="tab-Table">{allStudent.totalScore}</td>
																<td className="tab-Table"> {allStudent.examSolvedTime}  </td>
																<td className={allStudent.status=="Appearing"?"tab-Table appearingStatus":"tab-Table attemptedStatus"}>{allStudent.status}</td>
																

																{
																	this.state.competitionDeclared==true?
																	<td className="tab-Table">{allStudent.rank !="Consolation" && (allStudent.rank=='1st' || allStudent.rank=='2nd' || allStudent.rank=='3rd') ? <span>{allStudent.rank}  <i className ={"fa fa-trophy trofy" +allStudent.rank} aria-hidden="true"></i></span> : <span>{allStudent.rank}</span>}</td>
																	:
																	<td></td>
																}

																{/*<td>
																	<i className="fa fa-trash deleteIcon" onClick={this.removeStudentFromCompetition.bind(this)} id={allStudent.StudentId} name={this.state.competitionId} title="Remove from selected competition"/>
																</td>*/}
																
															</tr>
															})}
														</tbody>
													:
														<tbody>
															<tr>
																<td colSpan="10" className="tab-Table">Nothing to display.</td>
															</tr>
														</tbody>
														
													}
													</table>
													</div>
													<div className="col-lg-12 col-md-12 col-sm-12 paginationWrap">
															 <ul className="pagination paginationOES">
																  
																  {this.state.paginationArray}
																 
															 </ul>
														</div>
												</div>
										</form>
				
								</div>
							</div>
						  </div>
						</div>
					  </div>
					</div>
				  </section>
				</div>
			</div>
	       
		    );
		
	} 

}




