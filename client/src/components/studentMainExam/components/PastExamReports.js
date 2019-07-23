import React, {Component} 	from 'react';
import {render} 			from 'react-dom';
import swal 				from 'sweetalert';
import $ 					from "jquery";
import moment 				from 'moment';
import axios 				from 'axios';

export default class PastExamReports extends /*TrackerReact*/(Component)  {
	constructor(){
		  super();
		    this.state = {
		       facilityPermission : 'waitingforResult',
		       getAllExamReport   : '',
		    }
		}

	componentWillMount(){
		const studentID = localStorage.getItem("user_ID");
		axios.get('/myexammasters/'+studentID,)
            .then((response)=> {
                this.setState({
		 			getAllExamReport : response.data
		 		});
            })
            .catch(function (error) {
                console.log(error);
            });

  	}
	
	
	render(){
		
		return(
			<div>
		        {/* Content Wrapper. Contains page content */}
		        <div className="content-wrapper">
		          {/* Content Header (Page header) */}
		          <section className="content-header">
		            <h1>My Exams</h1>
		          </section>
		          {/* Main content */}
		          <section className="content viewContent">
		            <div className="row">
		              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
		                <div className="box">
		                  <div className="box-header with-border boxMinHeight">
		                   <div className="box-header with-border">
					            <h3 className="box-title">Main Exam Reports</h3>
					        </div>
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ExamReportTable">
				              		<table className="table table-striped formTable">
									    <thead className="tableHeader">
									        <tr>
									            <th className="col-lg-1 tab-Table">Sr.No</th>
									            <th className="col-lg-5">Exam Name </th>
									            <th className="col-lg-2"> Exam Date </th>
									            <th className="col-lg-1 tab-Table"> Category </th>
									            <th className="col-lg-2 tab-Table"> Total Ques  </th>
									            <th className="col-lg-3 tab-Table"> Attempted Ques </th>
									            <th className="col-lg-3 tab-Table"> Correct Ans </th>
									            <th className="col-lg-3 tab-Table"> Wrong Ans</th>
									            <th className="col-lg-3 tab-Table"> Time (mm:ss)</th>
									            <th className="col-lg-3 tab-Table"> Total Score </th>
									            
									        </tr>
									    </thead>
								

						    			{this.state.getAllExamReport!=0 ?
									    <tbody className="myAllTable">
									     	{this.state.getAllExamReport.map((Exams,index)=>{
									     	return <tr key={index}>
									     			<td className="tab-Table"></td>
									     			<td>{Exams.competitionName}</td>
									     			<td>{moment(Exams.examDate).format('DD/MM/YYYY')}</td>
									     			<td className="tab-Table">{Exams.category}</td>
									     			<td className="tab-Table">{Exams.totalQuestion}</td>
									     			<td className="tab-Table">{Exams.attemptedQues}</td>
									     			<td className="tab-Table">{Exams.correctAnswer}</td>
									     			<td className="tab-Table">{Exams.wrongAnswer}</td>
									     			<td className="tab-Table">{Exams.examSolvedTime}</td>
									     			<td className="tab-Table">{Exams.totalScore}</td>
									     			
									     			
									     		</tr>
									     		})
									     }
									    </tbody>
									:
								    	<tbody className="OESDataNotAvailable">
							    			<tr>
							    				<td colSpan="10">"Reports are Not Yet Available."</td>
							    			</tr>
							    		</tbody>
						    		}
									</table>
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