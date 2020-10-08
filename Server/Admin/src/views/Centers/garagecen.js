import React, { Component } from "react";
import firebase from "firebase";
import Modal from "react-awesome-modal";
import GeoPoint from "geopoint";
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
    <td>{props.isVerified ? "true" : "false"}</td>
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
      Service_Name: "",
      _id: null,
      paymentStatus: false,
      user: {}, //====================================
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
      Email: "",
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
  

  handleCreateGarage = () => {
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
      alert("Enter a valid telephone number");
    } else if (!this.validateEmail(this.state.Email)) {
      alert("Enter a proper mail 'examp@mail.com' ");
    } else if (this.state.Lantitude.length == 0) {
      alert("Lantitude is required");
    } else if (this.state.Longitude.length == 0) {
      alert("Longitude is required");
    } else if (City.length == 0) {
      alert("City is required");
    } else {
      const db = firebase.firestore();

      var newDocRef = db.collection("Services").doc();
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
          user_type: "garage",
          paymentStatus: "0",
          Service_Id: newDocRef.id,
        })
        .then(function () {
          alert("Created a garage!");
          window.location.reload();
        });
    }
  };

  componentDidMount() {
    const url = "http://localhost:5000/admin/profile";

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
          (g) => g.data().user_type === "garage"
        );
        this.setState({ garcount: gardata.length });
      });
  }

  Users() {
    let t = { ...this.state.yasa };

    const openImage = (photo, isV, id) => {
      this.setState({
        photo: photo,
        show: true,
        isVerified: isV,
        initialVerified: isV,
        id: id,
      });
      // console.log(isV);
      // console.log(id);
    };

    // Delete User
    const deleteUser = (id) => {
      const db = firebase.firestore();
      db.collection("Services").doc(id).delete();
      window.setTimeout(redirect, 2000);
    };

    const redirect = () => {
      window.location.reload();
    };

    const openEditMoadal = (user) => {
      this.setState({
        user: user,
        Service_Name: user.Service_Name,
        Description: user.Description,
        Email: user.Email,
      });
      this.setState({
        editmodalVisiblity: true,
      });
    };

    //console.log(t)
    return Object.values(t).map(function (currentlist, i) {
      // console.log(currentlist);
      if (currentlist.user_type !== "garage" || currentlist.isVerified !== true)
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
    this.setState({
      isVerified: !this.state.isVerified,
    });
  };

  // Edit User
  editUser = (Email, Description, Service_Name, user, paymentStatus) => {
    const db = firebase.firestore();
    db.collection("Services")
      .doc(user.docId)
      .set({ ...user, Email, Description, Service_Name, paymentStatus });

    this.cloeseEditUserModal();
    window.setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  handleSubmit = () => {
    const {
      Email,
      Description,
      Service_Name,
      user,
      paymentStatus,
    } = this.state;

    this.editUser(Email, Description, Service_Name, user, paymentStatus);
  };

  render() {
    return (
      <div className="animated fadeIn">
        <div>
          {/* <Modal show={this.state.show} >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body><img src={this.state.photo ? this.state.photo : ''}/></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" >
            Close
          </Button>
          <Button variant="primary" >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
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
                  <label for="formGroupExampleInput2">Enter Email</label>
                  <input
                    type="text"
                    class="form-control"
                    id="formGroupExampleInput2"
                    placeholder="Ex. jhon@gmail.com"
                    value={this.state.Email}
                    onChange={(e) => {
                      this.setState({
                        Email: e.target.value,
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
            width="400"
            height="400"
            effect="fadeInUp"
            onClickAway={() => this.closeModal()}
          >
            <div style={{ padding: 25 }}>
              <h1>Title</h1>
              <p>Some Contents</p>
              <div style={{ Height: "100px", Width: "100px", paddingLeft: 55 }}>
                <img
                  style={{ width: "80%", objectFit: "cover" }}
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
              <a href="javascript:void(0);" onClick={() => this.closeModal()}>
                Close
              </a>
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
                  <label for="formGroupExampleInput2">Enter Latitude:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="formGroupExampleInput"
                    value={this.state.Lantitude}
                    onChange={(e) => {
                      this.setState({ Lantitude: e.target.value });
                    }}
                    placeholder="Ex: 78.42656"
                  />
                </div>
                <div class="form-group">
                  <label for="formGroupExampleInput2">Enter Longitude:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="formGroupExampleInput2"
                    value={this.state.Longitude}
                    onChange={(e) => {
                      this.setState({ Longitude: e.target.value });
                    }}
                    placeholder="Ex: 69.548695"
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
                  onClick={this.handleCreateGarage}
                >
                  Create
                </button>
              </div>
            </div>
          </Modal>

          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i>Registered Garage Centers
              {this.state.garcount}
              <button
                onClick={() => {
                  this.openCreateMoadal();
                }}
              >
                Create a garage
              </button>
            </CardHeader>
            <CardBody>
              <Table responsive striped>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>User Type</th>
                    <th>Rating</th>
                    <th>BRPhoto</th>
                    <th>Payment Status</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{this.Users()}</tbody>
              </Table>

              <Pagination>
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
              </Pagination>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default garage;
