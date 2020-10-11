import React, { Component } from "react";
import fire from "../../../storage/index";
import { connect } from "react-redux";

import { Redirect, Link } from "react-router-dom";
import "./LoginPage.css";
import lgo from "../../../assets/images/lgo.jpg";

class AdminLogin extends Component {
  state = {
    email: "",
    password: "",
    userType: "",
    redirect: null,
    Verification: "",
  };

  componentDidMount() {}

  handleSubmit = () => {
    const { email, password } = this.state;
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
        var user = fire.auth().currentUser;
        var id = user.uid;

        fire
          .firestore()
          .doc(`Admin/${id}`)
          .get()
          .then((res) => {
            this.setState({
              userType: res.data().user_type,
            });
            this.props.onAuth(id, this.state.userType);
            window.location.assign("http://localhost:3001/#/dashboard");
          });
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };
  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          textAlign: "center",
        }}
      >
        <div id="login" className="banner h-100 ">
          <div className="d-flex justify-content-center h-100">
            <div className="user_card">
              <div className="d-flex justify-content-center">
                <div
                  className="brand_logo_container"
                  style={{ marginTop: "25px" }}
                >
                  <img src={lgo} className="brand_logo" alt="Logo" />
                </div>
              </div>

              <div className="d-flex justify-content-center form_container">
                <form>
                  <p style={{ color: "white" }}>Admin panel login</p>
                  <div className="input-group mb-3">
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="fa fa-at" />
                      </span>
                    </div>
                    <input
                      type="email"
                      id="email"
                      label="Email"
                      onChange={(e) => {
                        this.setState({ email: e.target.value });
                      }}
                      className="form-control input_user"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="input-group mb-2">
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="fa fa-key" />
                      </span>
                    </div>
                    <input
                      type="password"
                      id="password"
                      label="Password"
                      type="password"
                      onChange={(e) => {
                        this.setState({ password: e.target.value });
                      }}
                      className="form-control input_pass"
                      placeholder="Enter your password"
                    />
                  </div>
                  <div className="form-group">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customControlInline"
                      />
                      <label
                        className="custom-control-label text-white"
                        htmlFor="customControlInline"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mt-3 login_container">
                    <button
                      type="button"
                      onClick={this.handleSubmit}
                      className="btn login_btn"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (token, userType) =>
      dispatch({ type: "LOGIN", value: { token: token, userType: userType } }),
    checkLocal: () => dispatch({ type: "CHECKLOCAL" }),
  };
};

const mapStateToProps = (state) => {
  return {
    isLoggedin: state.uid != null,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin);