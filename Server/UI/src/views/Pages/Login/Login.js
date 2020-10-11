import React , { Component } from 'react';
//import background from '../../../assets/images/';
import fire from '../../../storage/index';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import "./LoginPage.css";
import lgo from '../../../assets/images/lgo.jpg'
import routes from '../../../routes';
import Modal from "react-awesome-modal";

class Login extends Component {
    state = {
        email: '',
        password: '',
        userType: '',
        redirect: null,
        Verification:'',
        show: false,
        _email: "",
    

    }

    closeModal = () => {
      this.setState({
        show: false,
        _email: "",
      });
    };
  
    openModal = () => {
      this.setState({
        show: true,
      });
    };

    componentDidMount(){
      console.log(this.props);
        this.props.checkLocal();
        if(this.props.uid != null) {
          console.log("HEREEEEEE")
          this.setState({
            redirect : <Redirect to="/"/>
          })
        }
      }

    setEmail = (event) => {
        this.setState({email: event.target.value});
    }

    setPassword = (event) => {
        this.setState({password: event.target.value});
    }

    //loginHandler = () => {}

   loginHandler = () => {
        fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
        .then(res => {
            //console.log(res);
            var user = fire.auth().currentUser;
            var id = user.uid

            if(!res.user.emailVerified){
              console.log(`not verified`)
              alert("Please verify your email before login");
              if(this.state.Verification!=false){
                alert("Your Account is Pending!!");
              }

            }
            else{
              // fire.firestore().doc(`Users/${id}`).get().then( res =>{

              fire.firestore().doc(`Services/${id}`).get().then( res =>{
                if(typeof res.data() === 'undefined') {
                  console.log("dont log in")
                  alert("PLease wait till admin approve");
                } else {
                  console.log("log in")
                  this.setState({
                        userType: res.data().user_type
                      });
                      this.props.onAuth(id, this.state.userType);
                      this.setState({redirect: <Redirect to="/dashboard"/>})
                }
                // if(!res.data()) {
                //   
                // } else {
                //   alert("PLease wait till admin approve");
                // }
                
              })


            } 

            // const userRef = fire.database().ref('/users/' + id).once('value').then((snapshot) => {
            //     this.setState({
            //         userType: snapshot.val().user_type
            //     });
            //     this.props.onAuth(id, this.state.userType);
            //     this.setState({redirect: <Redirect to="/dashboard"/>})
            // })
        })
        .catch(err => {
            console.log(err);
            alert(err.message);
        })
    }

    validateEmail = (email) => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    };

    handlePasswordReset = () => {
      const _email = this.state._email;
      if (!this.validateEmail(_email)) {
        alert("Invalid email address!");
      } else {
        let auth = fire.auth();
  
        auth
          .sendPasswordResetEmail(_email)
          .then(function () {
            alert("Password reset email has been sent!");
            window.location.reload();
          })
          .catch(function (error) {
            alert(error);
          });
      }
    };

    render() {
        // let redirect = null;
        // if(this.props.isLoggedin) {
        //     redirect = <Redirect to="/"/>
        // }

        return(
            <div  style={{
                width: '100%',
                height: '100vh',
                textAlign: 'center', }}
            >          
                {this.state.redirect}
                {/* {redirect} */}

            <div id="login" className="banner h-100 ">
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
                          <span className="input-group-text"><i className="fas fa-at" /></span>
                        </div>
                        <input type="email"
                                id="email"
                                label="Email"
                                onChange={this.setEmail} className="form-control input_user" placeholder="center@gmail.com" />
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
                        <div className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="customControlInline" />
                          <label className="custom-control-label text-white" htmlFor="customControlInline">Remember me</label>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center mt-3 login_container">
                        <button type="button" onClick={this.loginHandler} className="btn login_btn">Login</button>
                      </div>
                    </form>
                  </div>
                  <div className="mt-4">
                    <div className="d-flex justify-content-center links text-white">
                      Don't have an account? <Link to="/register">Create an account</Link>
                    </div>
                    <div className="d-flex justify-content-center links text-white">
                     <Link to="/admin-login">Login as an admin</Link>
                    </div>
                    <div className="d-flex justify-content-center links text-white">
                  <p
                    onClick={this.openModal}
                    style={{ cursor: "pointer" }}
                    className="alert-link"
                  >
                    Reset Password
                  </p>
                </div>
                  </div>
                </div>
              </div>
            </div> 
            <Modal
          visible={this.state.show}
          width="200"
          height="200"
          effect="fadeInUp"
          onClickAway={() => this.closeModal()}
        >
          <div style={{ padding: 20 }}>
            <p>Send a verification Code to your email</p>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                id="formGroupExampleInput"
                placeholder="Enter current email"
                value={this.state._email}
                onChange={(e) => {
                  this.setState({
                    _email: e.target.value,
                  });
                }}
              />
            </div>
            <button
              className="btn btn-md btn-primary"
              onClick={this.handlePasswordReset}
            >
              Send Code
            </button>
          </div>
        </Modal>
               
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onAuth: (token, userType) => dispatch({type: 'LOGIN', value: {token: token, userType: userType}}),
        checkLocal: () => dispatch({type: 'CHECKLOCAL'})
    };
}

const mapStateToProps = state => {
    return {
        isLoggedin: state.uid != null,
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(Login);