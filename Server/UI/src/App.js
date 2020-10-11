import React, { Component, Suspense } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import { renderRoutes } from 'react-router-config';
import './App.scss';
import Login from './views/Pages/Login/Login';
import DefaultLayout from './containers/DefaultLayout';
import Register from './views/Pages/Register/Register';
import AdminLogin from "./views/Pages/Login/AdminLogin";
import routes from './routes'



// Containers
//const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages

//const Login = React.lazy(() => import('./views/Pages/Login'));
//const Register = React.lazy(() => import('./views/Pages/Register'));
//const Page404 = React.lazy(() => import('./views/Pages/Page404'));
//const Page500 = React.lazy(() => import('./views/Pages/Page500'));

class App extends Component {

 loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

  componentDidMount(){
    this.props.checkLocal();

    

  } 

  render() {
/*
    let routes = <Switch>
    <Route path="/" component={Login}/>
    <Route path="/register" component={Register}/>
    <Route path="/dashboard" name="Home" render={props => <DefaultLayout {...props}/>} /> 
  </Switch>

  if(this.props.uid && this.props.userType === 'service') {
    routes = <Switch>
      <Route path="/" component={Login}/>
      <Route path="/register" component={Register}/>
      <Route path="/dashboard" name="Home" render={props => <DefaultLayout {...props}/>} />
    </Switch>
  }

  if(this.props.uid && this.props.userType === 'garage') {
    routes = <Switch>
      <Route path="/" component={Login}/>
      <Route path="/register" component={Register}/>
     <Route path="/dashboard" name="Home" render={props => <DefaultLayout {...props}/>} />
    </Switch>
  }*/

  //console.log(this.props);

    return (

    <HashRouter>
       <Suspense fallback={this.loading()}>  
      <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/admin-login" exact component={AdminLogin} />
        {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => <DefaultLayout {...props} uid={this.props.uid}/>} />
                    ) : (null);
                  })}
                <Redirect from="/" to="/dashboard" /> 
      </Switch>
      </Suspense>   
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

