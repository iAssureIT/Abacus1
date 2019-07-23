import React, {Component} 	from 'react';
import {render} 			from 'react-dom';
import $ 					from "jquery";
import axios 				from 'axios';
import '../css/PracticeExam.css';

class PracticeExamReports extends /*TrackerReact*/(Component)  {
	constructor(){
		  super();
		    this.state = {
		       facilityPermission : 'waitingforResult',
		       practiceExamReport : ''
		    }
		}
	componentDidMount(){
		const studentID = localStorage.getItem("user_ID");
		axios.get('/mypracticeexammasters/'+studentID)
            .then((response)=> {
                this.setState({
		 			practiceExamReport : response.data
		 		});
            })
            .catch(function (error) {
                console.log(error);
            });
	}
	
  
	examSolvingTime(start, end) {
	    var m1 = start;
		var m2 = end;
		if(m1 && m2){
			var min1 = m1.split(":");
			var min2 = m2.split(":");
			if(min1[1]=="00"){
				min1[0]-=1;
			}
			var res1 = min1[0]-min2[0];
			
			var res2 = (min1[1]=="00") ? 60-min2[1] : min1[1]-min2[1];

			if(res2==60){res1+=1;res2=0;}
			return res1+":"+res2;
		}else{
			return "01:00";
		}
	}

	render(){
		
		return(
			<div>	      
		        <div className="content-wrapper">		    
		          <section className="content-header">
		            <h1>My Exams</h1>
		          </section>
		         
		          <section className="content viewContent">
		            <div className="row">
		              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
		                <div className="box">
		                  <div className="box-header with-border boxMinHeight">
		                  	<div className="box-header with-border">
					            <h3 className="box-title">Practice Exam Reports</h3>
					        </div>
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ExamReportTable">
				              		<table className="table table-striped formTable table-responsive " id="example">
									    <thead className="tableHeader">
									        <tr>
									            <th className="col-lg-1 tab-Table">Sr.No</th>
									            <th className="col-lg-5 col-md-3 col-sm-3">Exam Name </th>
									            <th className="col-lg-2 col-md-1 col-sm-1"> Date </th>
									            <th className="col-lg-1 col-md-1 col-sm-1 tab-Table"> Category </th>
									            <th className="col-lg-2 col-md-2 col-sm-2 tab-Table"> Total Questions  </th>
									            <th className="col-lg-3 col-md-1 col-sm-1 tab-Table"> Attempted Questions </th>
									            <th className="col-lg-3 col-md-1 col-sm-1 tab-Table"> Correct Answers </th>
									            <th className="col-lg-3 col-md-1 col-lg-1 tab-Table">  Wrong Answers</th>
									            <th className="col-lg-3 col-md-1 col-lg-1 tab-Table">  Time (mm:ss) </th>
									            <th className="col-lg-3 col-md-1 col-sm-1 tab-Table">  Total Score </th>
									            
									        </tr>
									    </thead>
											{this.state.practiceExamReport.length!=0 ?
											    <tbody className="myAllTable">
											     	{this.state.practiceExamReport.map((Exams,index)=>{
											     	return (<tr key={index}>
											     			<td className="tab-Table"></td>
											     			<td>{Exams.examName}</td>
											     			<td>{Exams.date}</td>
											     			<td className="tab-Table">{Exams.category}</td>
											     			<td className="tab-Table">{Exams.totalQuestion}</td>
											     			<td className="tab-Table">{Exams.attemptedQues}</td>
											     			<td className="tab-Table">{Exams.correctAnswer}</td>
											     			<td className="tab-Table">{Exams.wrongAnswer}</td>
											     			<td className="tab-Table">{this.examSolvingTime(Exams.originalTime,Exams.examTime)}</td>
											     			<td className="tab-Table">{Exams.totalScore}</td>
											     		</tr>)
											     		})
											     	
											     }
									     
									    </tbody>
									:
								    	<tbody className="OESDataNotAvailable">
							    			<tr>
							    				<td colSpan="9">"Reports are Not Yet Available."</td>
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
} export default PracticeExamReports;
