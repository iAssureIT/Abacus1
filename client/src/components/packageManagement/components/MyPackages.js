import React, {Component} from 'react';
import ReactTable from "react-table";

class MyPackages extends Component {

	constructor(props) {
		super(props);
		this.state = {
			PackageData	: [],
		};
	}

	componentDidMount(){
		this.deletePackageOrder=this.deletePackageOrder.bind(this);
	}
	render(){
		var data1 = this.state.PackageData;
		var data2 = [];
		for(i=0; i<data1.length; i++){
		data2[i] = {
		"serialNumber" : i+1,
		"PackageName" : data1[i].packageName,
		"Category" : data1[i].category,
		"SubCategory" : data1[i].subCategory,
		"price" : data1[i].packagePrice,
		"NoOfPracticeTest" : data1[i].NoOfPracticeTest,	
		};     
		}
		var headers = [
		{Header: "Sr. No.", accessor: 'serialNumber' },
		{Header: "Package Name", accessor: 'PackageName' },
		{Header: "Category", accessor: 'Category'},
		{Header: "Sub Category ", accessor: 'SubCategory' },
		{Header: "Price", accessor: 'price' },
		{Header: "No of Practice Test", accessor: 'NoOfPracticeTest' },
		];
		return(
			<div>
		        <div className="content-wrapper">
		          <section className="content-header">
		            <h1>My Packages</h1>
		          </section>
		          <section className="content viewContent">
		            <div className="row">
		              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
		                <div className="box">
		                  <div className="box-header with-border boxMinHeight">
		                  
					        {
					        	
					        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ExamReportTable">
				              	
									<div className="col-lg-12 col-md-12  col-sm-12 col-xs-12 addRolWrap addcountrylist questWrapReactTable" id="contactlistview">
										<ReactTable data={data2} columns={headers} filterable={true} />
									</div>
						
								</div>
							</div>
					
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
}
export default MyPackages;
