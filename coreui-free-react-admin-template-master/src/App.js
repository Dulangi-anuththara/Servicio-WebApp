import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import UserProvider from "./providers/UserProvider"


import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ServiceDash from './pages/service/ServiceDash'



class App extends Component {
 

  componentDidMount(){
    this.props.checkLocal();

  }
  
  render() {
    let routes = <Switch>
      <Route path="/" exact component={LoginPage}/>
      <Route path="/register" component={RegisterPage}/>
      <Route path="/dashboard" render={() => <h1>Not Found</h1>} />
    </Switch>

    if(this.props.uid && this.props.userType === 'service') {
      routes = <Switch>
        <Route path="/" exact component={LoginPage}/>
        <Route path="/register" component={RegisterPage}/>
        <Route path="/dashboard" component={ServiceDash}/>
      </Switch>
    }

    if(this.props.uid && this.props.userType === 'garage') {
      routes = <Switch>
        <Route path="/" exact component={LoginPage}/>
        <Route path="/register" component={RegisterPage}/>
        <Route path="/dashboard" render={() => <h1>Garage Dashboard</h1>}/>
      </Switch>
    }

    return (

      <HashRouter>
        {routes}
      </HashRouter>
     
    );
  }
}

const mapStateToProps = state => {
  return {
      uid: state.uid,
      userType: state.userType
  }
}


const mapDispatchToProps = dispatch => {
  return {
      checkLocal: () => dispatch({type: 'CHECKLOCAL'})
  };
}


export default connect(mapStateToProps,mapDispatchToProps)(App);
