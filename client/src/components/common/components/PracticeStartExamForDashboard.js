import React, {Component} from 'react';
import {render} from 'react-dom';
import axios from 'axios';
import swal from 'sweetalert';
import $ from "jquery";
import { BrowserRouter as Router,Link,Route,Switch } from 'react-router-dom';
import '../css/common.css';

class PracticeStartExamForDashboard extends Component {
	constructor(props){
		super(props);
		this.state = ({
			showButton:true,
			showstartExamBtn : true,
			'defaultBtnTime' : '00:05',
			practiceQPData 	 : [],
			freeExamStatus 	 : [],
			studentID 		 : '',
			myArray 		 : [],
			myArray1 		 : []
		});
	}

	componentDidMount(){
		var newStateArray = [];
		const studentID = localStorage.getItem("user_ID");
	    	this.setState({
	    		studentID 	: studentID
	    	})

        axios
	    	.get('/competitionregisterorder/'+studentID)
            .then((response)=> {
                this.setState({
		 			practiceQPData1 : response.data,
		 		});
            })
            .catch(function (error) {
                console.log(error);
            });

        axios
	    	.get('/myexammasters/incomplete/'+studentID)
            .then((response)=> {
                this.setState({
		 			Notificationstatus : response.data,
		 		});
            })
            .catch(function (error) {
                console.log(error);
            });

        axios
	    	.get('/studentmaster/details/'+studentID)
            .then((response)=> {
	        axios
		    	.get('/questionpapermasters/'+response.data.category+'/'+response.data.subCategory)
	            .then((response)=> {
	                this.setState({
			 			practiceQPData : response.data,
			 		},()=>{
			 			this.getStatus();
			 		});
	            })
	            .catch(function (error) {
	                console.log(error);
	            });
	        })
            .catch(function (error) {
                console.log(error);
            });
        axios
	    	.get('/mypracticeexammasters/incompleteexam/'+studentID /*rRDPwPwKJrCRtyY9X*/)
            .then((response)=> {
                this.setState({
		 			Notificationstatus : response.data,
		 		});
            })
            .catch(function (error) {
                console.log(error);
            });
	}



	getStatus(){
		const studentID = localStorage.getItem("user_ID");
		var array 		= [];
		var paperArray 		= [];
		var obj;
		var updateData;

		var qpData = this.state.practiceQPData;
		 			if(qpData){	
		 				qpData.map((item,ind)=>{
		 					axios
								.get('/mypracticeexammasters/'+item._id+'/'+studentID)
								.then((response)=>{
									var examAttempt = response.data;
									if(examAttempt.length>0){

									array.push({
										ind : ind,
										pId : item._id,
										status : "Completed",
									});

									item.status = "Completed";

									}else{
									array.push({
										ind: ind,
										pId : item._id,
										status : "InComplete",
									});

									item.status = "InComplete";
								
									}
									this.setState({
										mypracticeexamstatus :array,
									},()=>{

									});
								})
								.catch(function(error){

								})


		 				})
		 			}
		 			this.setState({
		 				practiceQPData : qpData
		 			})

	}
	
	render(){ 
	if(this.state.practiceQPData){
		return(
			<div className="col-lg-12">
		        <div >
		          <section >
		            <div >
		              <div >
		                <div >
		                 	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								
								<form>
									<div className="col-lg-11 col-md-11 col-lg-offset-1 col-md-offset-1 col-sm-12 col-xs-12 IagreeExamWrapC">
										
										<div className="col-lg-12 ">
											<div className="col-lg-12 partitionline">
												<div className="col-lg-12  col-md-12 studProfileTit21">
												<i className="fa fa-file-text-o" aria-hidden="true"></i>&nbsp; Free Practice Tests
												</div>
											</div>
										</div>

										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 examTable">						              		
											    <div className="pEListTable pEListTableScroll">											  
											    	{this.state.practiceQPData.length>0?								
											    		this.state.practiceQPData.map((questionPaper,index)=>{
												    	return (<ul className="col-lg-12 freePPaper" key={index}>													    			
													    			<li className="testtitle testtitlepadding OH col-lg-9"><i className="fa fa-circle bullet" aria-hidden="true"></i>&nbsp;{questionPaper.quePaperTitle}</li>
													    			{
													    				questionPaper.status=="Completed"?
													    				<Link to="/PractExamReports"><li className="testtitle col-lg-3"><button type="submit" className="btn row startexambtn" value={questionPaper._id} title="Click here to see result">Result</button></li></Link>
													    				:
													    				<Link to="/PracticeStartExam"><li className="testtitle col-lg-3"><button type="submit" className="btn row startexambtn" value={questionPaper._id} title="Click here to start exam">Start</button></li></Link>
													    			}
													     		</ul>)
											    		})
											    		:
											    		<div className="col-lg-12 practicetesttitle1 fontstyle">Free Practice Tests Will be available after registering for competition </div>
											    	}
											    </div>
										</div>
									</div>
								</form>
							</div>
						  </div>
						</div>
					  </div>
				  </section>
				</div>
			</div>
			);
		}else{
			return(
				<div>Loading...</div>
			)
		}
		
			
		
	}
}export default PracticeStartExamForDashboard;
