componentDidMount() {

		axios
  			.get('/studentmaster/C6hmmC4SZJJ5LeBhZ')
            .then((response)=>{
                console.log("-------Response------>>",response.data);
            	this.setState({
		 			// studFormValues : response.data[0],
		 		});
                // localStorage.setItem("token",response.data.token);
                // localStorage.setState({loggedIn:response.data.token})
            })
            .catch(function (error) {
                console.log(error);
            });

		axios
  			.get('/categories/B10')
            .then((response)=>{
                console.log("-------Response111------>>",response.data);
            	this.setState({
		 			// studFormValues : response.data[0],
		 		});
                // localStorage.setItem("token",response.data.token);
                // localStorage.setState({loggedIn:response.data.token})
            })
            .catch(function (error) {
                console.log(error);
            });

        axios
  			.get('/franchisedetails/franchisebasicinfo/7661')
            .then((response)=>{
                console.log("-------Response222------>>",response.data);
            	this.setState({
		 			// studFormValues : response.data[0],
		 		});
                // localStorage.setItem("token",response.data.token);
                // localStorage.setState({loggedIn:response.data.token})
            })
            .catch(function (error) {
                console.log(error);
            });

        axios
  			.get('/instructions/Student Registration')
            .then((response)=>{
                console.log("-------Response333------>>",response.data);
            	this.setState({
		 			// studFormValues : response.data[0],
		 		});
                // localStorage.setItem("token",response.data.token);
                // localStorage.setState({loggedIn:response.data.token})
            })
            .catch(function (error) {
                console.log(error);
            });
    }

























var studFormValues={
  			_id                		: this.refs._id.value.trim(),
  			studentFirstName   		: this.refs.studentFirstName.value.trim(),
  			studentMiddleName  		: this.refs.studentMiddleName.value.trim(),
  			studentLastName    		: this.refs.studentLastName.value.trim(),
  			// mobileNumber       		: this.refs.mobileNumber.value.trim(),
  			// studentDOB         		: this.refs.studentDOB.value.trim(),
  			// schoolName         		: this.refs.schoolName.value.trim(),
  			// franchiseUserId       	: this.state.franchiseUserId,
  			// companyId   	   		: this.refs.franchiseId.value.trim(),
  			// franchiseName      		: this.refs.franchiseName.value,
  			// franchiseMobileNumber   : this.refs.franchiseMobileNumber.value,
  			// studentAddress 			: this.refs.studentAddress.value.trim(),
  			// studentCountry 			: this.refs.studentCountry.value.trim(),
  			// studentState   			: this.refs.studentState.value.trim(),
  			// studentCity    			: this.refs.studentCity.value.trim(),
  			// pincode        			: this.refs.pincode.value.trim(),
  			// category       			: this.refs.category.value.trim(),
  			// studentEmail   			: this.refs.studentEmail.value.trim(),
     //      	genderType              : this.state.genderType,  			
  			// genderType     : $("input[name='genderType']:checked").val(),
  		}

  		axios
  			.post('/registration',{ studFormValues })
            .then((response)=>{
                console.log("///////////////////////////////------>>",response.data);
            	this.setState({
		 			// studFormValues : response.data[0],
		 		});
                // localStorage.setItem("token",response.data.token);
                // localStorage.setState({loggedIn:response.data.token})
            })
            .catch(function (error) {
                console.log(error);
            });

   //          var body = {
			//     userName: 'Fred',
			//     userEmail: 'Flintstone@gmail.com'
			// }


			// axios({
			//     method: 'get',
			//     url: '/registration',
			//     data: body
			// })
			// .then(function (response) {
			//     console.log("///////////////////////////////",response);
			// })
			// .catch(function (error) {
			//     console.log(error);
			// });
