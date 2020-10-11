import React, { Component } from "react";
import {
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
//import background from '../assets/images/login_background.jpg';
import fire from "../../../storage/index";
import { connect } from "react-redux";
import axios from "axios";
import firebase from "firebase";

import "../Login/LoginPage.css";
import lgo from "../../../assets/images/lgo.jpg";
import { storage } from "../../../storage";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { af } from "date-fns/locale";
import Modal from "react-awesome-modal";

class Register extends Component {
  state = {
    email: "",
    password: "",
    full_name: "",
    // grade: '',
    user_type: "",
    Photo: "",
    SearchKey: "",
    Rating: 0,
    Desc: "",
    redirect: null,
    isVerified: false,
    show: false,
    Image: "",
    Verification: "",
    latitude: "",
    longitude: "",
    location: null,
  };

  getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      this.setState({
        show: true,
      });
    });
  };
  closeModal() {
    this.setState({
      show: false,
    });
  }
  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleChange = (e) => {
    if (e.target.files[0]) {
      this.setState({ Photo: e.target.files[0] });
    }
  };

  handleUpload = () => {
    this.setState({
      open: false,
    });
    console.log(this.state.Test);

    // .then(url =>{
    //   console.log(url);

    //   const data ={
    //     Image:url,
    //   }
    //   const path= "http://localhost:5000/user/imgUploadBR";
    //   axios.post(path,data)
    //         .then((response)=>{
    //           console.log('Good. '+response.data);
    //           // this.props.history.push('/profile');

    //       })
    //       .catch((err)=>{

    //         console.log(err);
    //       });

    //  this.setState({
    //    Image:url,
    //  })

    //   })
    // })
  };

  setEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  setPassword = (event) => {
    this.setState({ password: event.target.value });
  };

  setName = (event) => {
    this.setState({ full_name: event.target.value });

    var names = event.target.value.toUpperCase().trim();
    this.setState({ SearchKey: names[0] });
  };

  setDesc = (event) => {
    this.setState({ Desc: event.target.value });
  };

  //   setLetter = (event) => {
  //     var names = event.target.value.trim();
  //     this.setState({SearchKey: names[0]});
  // }

  setUtype = (event) => {
    this.setState({
      user_type: event.target.value,
    });
  };

  validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return re.test(password);
  };

  registrationHandler = () => {
    if (this.state.full_name == "") {
      alert("Please Enter your business name");
    } else if (!this.validateEmail(this.state.email)) {
      alert("Please Enter an valid Email");
    } else if (!this.validatePassword(this.state.password)) {
      alert("Please Enter a password in a proper format"); // 6 Digits minimum|| special character || Numbers || Capital || simple
    } else if (this.state.Desc.length == 0) {
      alert("Please Enter a description");
    } else if (this.state.user_type.length == 0) {
      alert("Enter your User Type");
    } else if (this.state.location.length == 0) {
      alert("Add you service locaion");
    } else if (this.state.Photo.length == 0) {
      alert("Add an image");
    } else {
      fire
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(async (res) => {
          var user = fire.auth().currentUser;
          user
            .sendEmailVerification()
            .then(function () {
              // Email sent.
              console.log(`email sendt`);
              alert("Verification Link sent to your email");
            })
            .catch(function (error) {
              // An error happened.
            });

          var id = user.uid;
          this.props.onAuth(id, this.state.user_type);

          //update users username on firebase auth server
          user
            .updateProfile({
              displayName: this.state.full_name,
            })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });

          const uploadTask = storage
            .ref(`images/${this.state.Photo.name}`)
            .put(this.state.Photo);
          uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (error) => {
              console.log(error);
            },
            () => {
              storage
                .ref("images")
                .child(this.state.Photo.name)
                .getDownloadURL()
                .then((URL) => {
                  console.log("=========================>", URL);
                  this.setState({ Image: URL });
                  // 2 - sucess 0- pending -1 cancel -2 failed -3 chargedback
                  // grade: this.state.grade
                })
                .then((res) => {
                  console.log(res);
                  fire.firestore().doc(`Users/${id}`).set({
                    user_type: this.state.user_type,
                    Service_Name: this.state.full_name,
                    Email: this.state.email,
                    SearchKey: this.state.SearchKey,
                    BRPhoto: this.state.Image,
                    Rating: this.state.Rating,
                    Description: this.state.Desc,
                    Location: this.state.location,
                    isVerified: this.state.isVerified,
                    paymentStatus: 0,
                  });

                  alert("Account has been registered successfully!");
                  window.location.href = "http://localhost:3000/#/";
                })

                .catch((err) => {
                  console.log(err.message);
                  alert(err.message);
                });
            }
          );
        });
    }
  };

  redirect = () => {
    window.location.reload();
  };
  handleLocationConfirm = (latitude, longitude) => {
    this.closeModal();
    this.setState({
      location: new firebase.firestore.GeoPoint(
        Number(latitude),
        Number(longitude)
      ),
    });
  };

  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          textAlign: "center",
          //backgroundImage: `url(${background})`,
          //backgroundSize: 'contain'
          // backgroundColor: 'blue',
        }}
      >
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
                      <span className="input-group-text">
                        <i className="fa fa-user" />
                      </span>
                    </div>
                    <input
                      type="text"
                      id="full_name"
                      label="Full Name"
                      onChange={this.setName}
                      onch
                      className="form-control input_user"
                      placeholder="Full Name"
                      required
                    />
                  </div>

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
                      onChange={this.setEmail}
                      className="form-control input_user"
                      placeholder="garage@gmail.com"
                      required
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
                      onChange={this.setPassword}
                      className="form-control input_pass"
                      placeholder="password"
                      required
                      title="Password should atleast be of 6 characters
                      should include atleast one simple letter, capital letter, special character and number" 
                    />
                  </div>
                  <div className="form-group">
                    <FormControl
                      className="input-group-text"
                      component="fieldset"
                      style={{ width: "100%" }}
                    >
                      <InputLabel
                        style={{ disableAnimation: false }}
                        disableAnimation={false}
                        className="text-white"
                      >
                        Service or Garage?
                      </InputLabel>
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

                  <div className="input-group mb-2">
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="fa fa-home" />
                      </span>
                    </div>
                    <input
                      type="password"
                      id="password"
                      label="Description"
                      type="span"
                      onChange={this.setDesc}
                      className="form-control input_pass"
                      placeholder="Describe About your Company"
                      required
                    />
                  </div>

                  <div>
                    <Button color="light" className="btn login_btn" onClick={this.handleClickOpen}>
                      Upload your BR <i className="fa fa-camera fa-lg"></i>
                      &nbsp;
                    </Button>

                    <Dialog
                      open={this.state.open}
                      onClose={this.handleClose}
                      aria-labelledby="form-dialog-title"
                    >
                      <DialogTitle id="form-dialog-title">
                        Upload Your Image
                      </DialogTitle>
                      <DialogContent>
                        <FormGroup row>
                          <Col md="3">
                            <Label htmlFor="file-input">File input</Label>
                          </Col>
                          <Col xs="12" md="9">
                            <Input
                              type="file"
                              id="test"
                              name="test"
                              onChange={this.handleChange}
                            />
                          </Col>
                        </FormGroup>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                          Cancel
                        </Button>
                        <Button onClick={this.handleUpload} color="primary">
                          Upload
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                  <div className="d-flex justify-content-center mt-3 login_container">
                    <Button
                      onClick={() => this.getUserLocation()}
                      className="btn login_btn"
                    >
                      Add service location
                    </Button>
                  </div>
                  <div className="d-flex justify-content-center mt-3 login_container">
                    <Button
                      onClick={this.registrationHandler}
                      className="btn login_btn"
                    >
                      Register
                    </Button>
                  </div>
                </form>
              </div>
              <div className="mt-4"></div>
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
            <div className="row">
              <div className="col">
                <h4>Your location</h4>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p>{`Longitude:  ${this.state.longitude}`}</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p>{`Latitude:  ${this.state.latitude}`}</p>
              </div>
            </div>
            <button
              onClick={() => {
                this.handleLocationConfirm(
                  this.state.latitude,
                  this.state.longitude
                );
              }}
            >
              Confirm
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.counter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (token, userType) =>
      dispatch({ type: "LOGIN", value: { token: token, userType: userType } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);