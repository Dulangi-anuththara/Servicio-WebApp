import React , { Component } from 'react';
import { Button, FormControl, Select, MenuItem, InputLabel} from '@material-ui/core';
//import background from '../assets/images/login_background.jpg';
import fire from '../../../storage/index';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import '../Login/LoginPage.css';
import lgo from "../../../assets/images/lgo.jpg"



class Register extends Component {
    state = {
        email: '',
        password: '',
        full_name: '',
        // grade: '',
        user_type: '',
        redirect: null
    }

    setEmail = (event) => {
        this.setState({email: event.target.value});
    }

    setPassword = (event) => {
        this.setState({password: event.target.value});
    }

    setName = (event) => {
        this.setState({full_name: event.target.value});
    }

    setUtype = (event) => {
        this.setState({
            user_type: event.target.value
        }
        );
    }

    registrationHandler = () => {
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(async (res) => {
            var user = fire.auth().currentUser;
            user.sendEmailVerification().then(function() {
                // Email sent.
              }).catch(function(error) {
                // An error happened.
              });
            var id = user.uid
            this.props.onAuth(id, this.state.user_type);

            //update users username on firebase auth server
            user.updateProfile({
                displayName: this.state.full_name
            }).then((res) => {
                console.log(res);
            }).catch((err => {
                console.log(err);
            }));

            await fire.firestore().doc(`users/${id}`).set({
                user_type: this.state.user_type,
                full_name: this.state.full_name,
                // grade: this.state.grade
            }).then(res => {
                console.log(res);
                this.setState({redirect: <Redirect to="/dashboard"/>})
            })
        })
        .catch((err) => {
            console.log(err.message);
            alert(err.message);
        })
        
    }

    render() {
        return(
            <div style={{
                width: '100%',
                height: '100vh',
                textAlign: 'center',
                //backgroundImage: `url(${background})`,
                //backgroundSize: 'contain'
                // backgroundColor: 'blue',
                
            }}>
                {this.state.redirect}
                {/* <Paper square style={{
                    marginTop: '5%',
                    padding: '20px',
                    height: '80%',
                    width: '30%',
                    display: 'inline-block',

                }}> */}


<div id="register" className="banner h-100 ">
  <div className="d-flex justify-content-center h-100">
    <div className="user_card">
      <div className="d-flex justify-content-center">
        <div className="brand_logo_container">
          <img src={lgo} className="brand_logo" alt="Logo" />
        </div>
      </div>
      <div className="d-flex justify-content-center form_container">
        <form>
          <div className="input-group mb-3">
            <div className="input-group-append">
              <span className="input-group-text"><i className="fas fa-user" /></span>
            </div>
            <input type="text"
                     id="full_name"
                     label="Full Name"
                     onChange={this.setName} className="form-control input_user" placeholder="Full Name" />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-append">
              <span className="input-group-text"><i className="fas fa-at" /></span>
            </div>
            <input type="email"
                    id="email"
                    label="Email"
                    onChange={this.setEmail} className="form-control input_user" placeholder="garage@gmail.com" />
          </div>
          <div className="input-group mb-2">
            <div className="input-group-append">
              <span className="input-group-text"><i className="fas fa-key" /></span>
            </div>
            <input type="password" id="password"
                    label="Password"
                    type="password"
                    onChange={this.setPassword} className="form-control input_pass" placeholder="password" />
          </div>
          <div className="form-group">

            <FormControl  className="input-group-text" component="fieldset" style={{width: '100%'}} >
            <InputLabel style={{ disableAnimation: false }} disableAnimation={false}  className="text-white">Service or Garage?  </InputLabel>
                            <Select
                            labelId="Grade"
                            id="user_type"
                            value={this.state.grade}
                            onChange={this.setUtype}
                            >
                                <MenuItem value={"service"}>Service</MenuItem>
                                <MenuItem value={"garage"}>Garage</MenuItem>
                            </Select>
                        </FormControl>
                </div>
          <div className="d-flex justify-content-center mt-3 login_container">
          <Button onClick={this.registrationHandler} className="btn login_btn">Register</Button>
          </div>
        </form>
      </div>
      <div className="mt-4">
        
      </div>
    </div>
  </div>
</div>

            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        token: state.counter
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (token, userType) => dispatch({type: 'LOGIN', value: {token: token, userType: userType}})
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Register);