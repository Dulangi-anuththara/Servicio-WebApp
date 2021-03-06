import React, { Component } from "react";
import firebase from "firebase";
import Modal from "react-awesome-modal";
import moment from "moment";
import _ from "lodash";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Button,
} from "reactstrap";

const renderTimeDuration = (status, createdDate) => {
  if (status == "2") {
    return <td>-</td>;
  }
  if (createdDate) {
    let created_date = new Date(createdDate.seconds * 1000);
    let _startDate = moment(created_date).format("YYYY-MM-DD HH:mm:ss");
    let _nowDate = moment().format("YYYY-MM-DD HH:mm:ss");

    let _date = moment(_nowDate).diff(_startDate, "months");
    let _ago = moment(_startDate).fromNow();
    console.log("status==========>", status);
    if (status == 0 && _date >= 2) {
      return (
        <td>
          {" "}
          <span className="badge badge-warning">Over Due</span>
        </td>
      );
    } else {
      return <td>{_ago}</td>;
    }
  } else {
    return <td>No record</td>;
  }
};

const renderPaymentStatus = (status) => {
  switch (status) {
    case "0":
      return <td>Pending</td>;
      break;
    case "2":
      return <td>Sucess</td>;
      break;
    case "-1":
      return <td>Cancelled</td>;
      break;
    case "-2":
      return <td>Failed</td>;
      break;
    case "-3":
      return <td>Chargedback</td>;
      break;
    default:
      return null;
  }
};

const GarageReg = (props) => (
  <tr>
    <td>{props.full_name}</td>
    <td>{props.email}</td>
    <td>{props.user_type}</td>
    <td>{props.Rating}</td>
    <td>
      <button onClick={() => props.openImage()}>View BR</button>
    </td>
    {renderPaymentStatus(props.paymentStatus)}
    {renderTimeDuration(props.paymentStatus, props.createdDate)}
    <td>{props.isVerified ?  <span className="badge badge-success"> Verified</span> : <span class="badge badge-danger">Not Verified</span>}</td>
    <td>
      <button onClick={() => props.editUser()}>🖋</button>
      <button style={{ marginLeft: 5 }} onClick={() => props.deleteUser()}>
        🗑
      </button>
    </td>
  </tr>
);

class garage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      full_name: "",
      user_type: "",
      gardata: "",
      yasa: "null",
      Rating: "",
      Verify: "",
      BRPhoto: "",
      Verification: "",
      show: false,
      photo: null,
      isVerified: false,
      visible: false,
      id: "",
      isSubmited: false,
      initialVerified: false,
      users: null,
      db: null,
      editmodalVisiblity: false,
      Email: "",
      Description: "",
      Service_Name: "",
      _id: null,
      user: {},
      createModalVisibility: false,
      Lantitude: "",
      BRPhoto: "",
      Longitude: "",
      City: "",
      Description: "",
      Email: "",
      Favs: ["", ""],
      Image: "",
      Name: "",
      Photo: "",
      Rating: "",
      Registeration_No: "",
      SearchKey: "",
      Service_Types: ["", ""],
      Telephone: "",
      isVerified: true,
      user_type: "",
      paymentStatus: false,
      //============================================
    };
  }

  //    openModal() {
  //     this.setState({
  //         visible : true
  //     });
  // }

  closeModal() {
    this.setState({
      visible: false,
      show: false,
      photo: "",
    });
  }
  cloeseEditUserModal() {
    this.setState({
      editmodalVisiblity: false,
      Telephone: "",
      Description: "",
      Service_Name: "",
      _id: null,
      user: {},
    });
  }
  cloeseCreateUserModal() {
    this.setState({
      createModalVisibility: false,
    });
  }

  openCreateMoadal = () => {
    this.setState({
      createModalVisibility: true,
    });
  };

  validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  validateTel = (Telephone) => {
    const re = /^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/;
    return re.test(Number(Telephone));
  };

  handleCreateService = () => {
    const {
      AddressTwo,
      BRPhoto,
      Address,
      City,
      Description,
      Email,
      Favs,
      Image,
      Name,
      Photo,
      Rating,
      Registeration_No,
      SearchKey,
      Service_Types,
      Telephone,
      isVerified,
      user_type,
      paymentStatus,
    } = this.state;

    if (Name.length == 0) {
      alert("Name is required");
    } else if (Description.length == 0) {
      alert("Description is required");
    } else if (!this.validateTel(this.state.Telephone)) {
      alert("Enter a valid Telephone Number");
    } else if (!this.validateEmail(this.state.Email)) {
      alert("Enter a proper mail 'examp@mail.com' ");
    } else if (this.state.Lantitude.length == 0) {
      alert("Lantitude is required");
    } else if (this.state.Longitude.length == 0) {
      alert("Longitude is required");
    } else if (City.length == 0) {
      alert("City is required");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(Email, "tesT@123")
        .then(async (res) => {
          let service = firebase.auth().currentUser;

          service
            .sendEmailVerification()
            .then(function () {
              alert("Verfication has been sent to the service email!");
            })
            .catch(function (error) {
              console.log(error);
            });

          const db = firebase.firestore();
          let id = service.uid;
          var newDocRef = db.collection(`Services`).doc(id);
          newDocRef
            .set({
              AddressTwo: "draft address2",
              BRPhoto: "https://via.placeholder.com/150",
              Address: "draft address",
              City,
              Description,
              Email,
              Favs: ["fav1", "fav2"],
              Image: "https://via.placeholder.com/150",
              Location: new firebase.firestore.GeoPoint(
                Number(this.state.Lantitude),
                Number(this.state.Longitude)
              ),
              Name,
              Service_Name: Name,
              Photo: "https://via.placeholder.com/150",
              Rating: 0,
              Registeration_No: "20XX-XX-XX",
              SearchKey: Name[0].toUpperCase(),
              Service_Types: ["type1", "type2"],
              Telephone: Number(Telephone),
              isVerified,
              user_type: "service",
              paymentStatus: "0",
              Service_Id: service.uid,
            })
            .then(function () {
              alert("Created a service!");
              window.location.reload();
            });
        });
    }
  };
  componentDidMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyC1I4w3OUaDmITrLrA0TDfhicVwVWDnJrk",
        authDomain: "servicio-11f11.firebaseapp.com",
        projectId: "servicio-11f11",
      });
    }
    let db = firebase.firestore();

    db.collection(`Services`)
      .get()
      .then((Documents) => {
        const data = Documents.docs.map((d) => {
          return {
            ...d.data(),
            docId: d.id,
          };
        });
        this.setState({ yasa: data });

        const gardata = Documents.docs.filter(
          (g) => g.data().user_type === "service"
        );
        this.setState({ garcount: gardata.length });
      });
  }

  Users() {
    let t = { ...this.state.yasa };

    const openImage = (photo, isV, id) => {
      console.log("garage -> openImage -> photo", photo);

      this.setState({
        photo: photo,
        show: true,
        isVerified: isV,
        initialVerified: isV,
        id: id,
      });
    };

  // Delete User
  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      // Save it!
      const db = firebase.firestore();
      db.collection("Services").doc(id).delete();
      window.setTimeout(redirect, 2000);
    } else {
      // Do nothing!
      console.log("Thing was not deleted.");
    }
  };

    const redirect = () => {
      window.location.reload();
    };

    const openEditMoadal = (user) => {
      this.setState({
        user: user,
        Service_Name: user.Service_Name,
        Description: user.Description,
        Telephone: user.Telephone,
      });
      this.setState({
        editmodalVisiblity: true,
      });
    };

    //console.log(t)
    return Object.values(t).map(function (currentlist, i) {
      if (
        currentlist.user_type !== "service" ||
        currentlist.isVerified !== true
      )
        return;

      return (
        <GarageReg
          id={currentlist.docId}
          openImage={() =>
            openImage(
              currentlist.Photo,
              currentlist.isVerified,
              currentlist.docId
            )
          }
          editUser={() => {
            openEditMoadal(currentlist);
          }}
          deleteUser={() => {
            deleteUser(currentlist.docId);
          }}
          isVerified={currentlist.isVerified}
          image={currentlist.Photo}
          email={currentlist.Email}
          full_name={currentlist.Service_Name}
          user_type={currentlist.user_type}
          Rating={currentlist.Rating}
          BRPhoto={currentlist.BRPhoto}
          Verify={currentlist.Verification}
          paymentStatus={currentlist.paymentStatus}
          createdDate={currentlist.createdDate}
          key={i}
        />
      );
    });
  }

  submitVerified = () => {
    firebase
      .firestore()
      .doc(`Services/${this.state.id}`)
      .update({
        isVerified: this.state.isVerified,
      })
      .then((d) => {
        // console.log(d);
      })
      .catch((e) => {
        // console.log(e);
      });

    this.setState({
      isSubmited: true,
    });

    this.closeModal();
  };

  setVerified = () => {
    // console.log("setVerified");

    this.setState({
      isVerified: !this.state.isVerified,
    });
  };
  // Edit User
  editUser = (Telephone, Description, Service_Name, user) => {
    const db = firebase.firestore();
    db.collection("Services")
      .doc(user.docId)
      .set({ ...user, Telephone, Description, Service_Name });

    this.cloeseEditUserModal();
    window.setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  handleSubmit = () => {
    const { Telephone, Description, Service_Name, user } = this.state;

    this.editUser(Telephone, Description, Service_Name, user);
  };

  render() {
    return (
      <div className="animated fadeIn">
        <div>
          <Modal
            visible={this.state.editmodalVisiblity}
            onClickAway={() => this.cloeseEditUserModal()}
            width="500"
          >
            <div style={{ padding: 20 }}>
              <div>
                <div class="form-group">
                  <label for="formGroupExampleInput">Enter Service Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="formGroupExampleInput"
                    placeholder="Ex. Ruwan Garage"
                    value={this.state.Service_Name}
                    onChange={(e) => {
                      this.setState({
                        Service_Name: e.target.value,
                      });
                    }}
                  />
                </div>
                <div class="form-group">
                  <label for="formGroupExampleInput2">Enter Description</label>
                  <input
                    type="text"
                    class="form-control"
                    id="formGroupExampleInput2"
                    placeholder="Ex. This is a description"
                    value={this.state.Description}
                    onChange={(e) => {
                      this.setState({
                        Description: e.target.value,
                      });
                    }}
                  />
                </div>
                <div class="form-group">
                  <label for="formGroupExampleInput2">Telephone</label>
                  <input
                    type="text"
                    class="form-control"
                    id="formGroupExampleInput2"
                    placeholder="Ex. jhon@gmail.com"
                    value={this.state.Telephone}
                    onChange={(e) => {
                      this.setState({
                        Telephone: parseInt(e.target.value),
                      });
                    }}
                  />
                </div>
                <button className="btn btn-primary" onClick={this.handleSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </Modal>
          <Modal
            visible={this.state.show}
            effect="fadeInUp"
            onClickAway={() => this.closeModal()}
          >
            <div style={{ padding: 25 }}>
            <h1>Business Registration </h1>
              <p>BR is checked and <span class="badge badge-success">Approved Account</span></p>
              <div style={{ Height: "500px", Width: "500px" }}>
                <img
                  style={{
                    width: "500px",
                    height: "500px",
                    objectFit: "contain",
                  }}
                  src={this.state.photo}
                />
              </div>
              {(this.state.isVerified && this.state.isSubmited) ||
              this.state.initialVerified ? null : (
                <input
                  type="checkbox"
                  value={this.state.isVerified}
                  onChange={this.setVerified}
                ></input>
              )}

              {(this.state.isVerified && this.state.isSubmited) ||
              this.state.initialVerified ? null : (
                <button onClick={this.submitVerified}>Submit</button>
              )}
            </div>
          </Modal>
          <Modal
            visible={this.state.createModalVisibility}
            onClickAway={() => this.cloeseCreateUserModal()}
            width="500"
          >
            <div style={{ padding: 20 }}>
              <div>
                <div class="form-group">
                  <label for="formGroupExampleInput">Enter Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="formGroupExampleInput"
                    placeholder="Ex: Jhon Doe"
                    value={this.state.Name}
                    onChange={(e) => {
                      this.setState({
                        Name: e.target.value,
                      });
                    }}
                  />
                </div>

                <div class="form-group">
                  <label for="formGroupExampleInput">Enter Description</label>
                  <input
                    type="text"
                    class="form-control"
                    id="formGroupExampleInput"
                    placeholder="Ex: this is nice"
                    value={this.state.Description}
                    onChange={(e) => {
                      this.setState({
                        Description: e.target.value,
                      });
                    }}
                  />
                </div>
                <div class="form-group">
                  <label for="formGroupExampleInput">
                    Enter Telephone Number
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="formGroupExampleInput"
                    placeholder="Ex: 011-2729729"
                    value={this.state.Telephone}
                    onChange={(e) => {
                      this.setState({
                        Telephone: e.target.value,
                      });
                    }}
                  />
                </div>

                <div class="form-group">
                  <label for="formGroupExampleInput2">Enter Email:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="formGroupExampleInput2"
                    value={this.state.Email}
                    onChange={(e) => {
                      this.setState({ Email: e.target.value });
                    }}
                    placeholder="Ex: jhon@gmail.com"
                  />
                </div>

                <div class="form-group">
                  <label for="formGroupExampleInput2">Enter Lantitude:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="formGroupExampleInput2"
                    value={this.state.Lantitude}
                    onChange={(e) => {
                      this.setState({ Lantitude: e.target.value });
                    }}
                    placeholder="Ex: 78.83854"
                  />
                </div>
                <div class="form-group">
                  <label for="formGroupExampleInput2">
                    Enter Address Longitude:
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="formGroupExampleInput2"
                    value={this.state.Longitude}
                    onChange={(e) => {
                      this.setState({ Longitude: e.target.value });
                    }}
                    placeholder="Ex: 69.45932"
                  />
                </div>
                <div class="form-group">
                  <label for="formGroupExampleInput2">Enter City:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="formGroupExampleInput2"
                    value={this.state.City}
                    onChange={(e) => {
                      this.setState({ City: e.target.value });
                    }}
                    placeholder="Ex: Colombo"
                  />
                </div>
                <button
                  className="btn btn-primary"
                  onClick={this.handleCreateService}
                >
                  Create
                </button>
              </div>
            </div>
          </Modal>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i>Registered Garage Centers{" "}
              {this.state.garcount}{" "}
              <button
                onClick={() => {
                  this.openCreateMoadal();
                }}
              >
                Create a service
              </button>
            </CardHeader>
            <CardBody>
              <Table responsive striped>
                <thead>
                  <tr>
                    <th>Names</th>
                    <th>Email</th>
                    <th>User Type</th>
                    <th>Rating</th>
                    <th>BRPhoto</th>
                    <th>Payment Status</th>
                    <th>Time Duration</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>{this.Users()}</tbody>
              </Table>

              {/* <Pagination>
                <PaginationItem disabled>
                  <PaginationLink previous tag="button">
                    Prev
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem active>
                  <PaginationLink tag="button">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink tag="button">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink tag="button">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink tag="button">4</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink next tag="button">
                    Next
                  </PaginationLink>
                </PaginationItem>
              </Pagination> */}
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default garage;
