import React 		from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MainLayout	from './components/layouts/MainLayout.js';
import axios 		from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.baseURL = 'http://localhost:3006';
// axios.defaults.baseURL = 'http://abacusapi.iassureit.com';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

function App() {
  return (
  	<Router>
	    <div className="App">
		    <Switch>
		  		<Route component={ MainLayout }/>
		    </Switch>
		</div> 
  	</Router>
  );
}
export default App;