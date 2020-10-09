import React, { Component, Fragment } from "react";
import firebase from "firebase";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
} from "reactstrap";
import _ from "lodash";
import Modal from "react-awesome-modal";

const UserReg = (props) => (
  <tr>
    <td>{props.name}</td>
    <td>{props.email}</td>
    <td>{props.tel_num}</td>
    {/* {props.paymentStatus ? <td>Done</td> : <td>Pending</td>} */}
    <td>
      <button onClick={() => props.editUser()}>🖋</button>
      <button style={{ marginLeft: 5 }} onClick={() => props.deleteUser()}>
        🗑
      </button>
    </td>
  </tr>
);

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      tel_num: "",
      location: ["", ""],
      favs: ["", ""],
      photo: "",
      editmodalVisiblity: false,
      createModalVisibility: false,
      yasa: "null",
      full_name: "",
      _tel: "",
      _email: "",
      _id: null,
    };
  }

  componentDidMount() {
    const url = "http://localhost:5000/admin/profile";

    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyC1I4w3OUaDmITrLrA0TDfhicVwVWDnJrk",
        authDomain: "servicio-11f11.firebaseapp.com",
        projectId: "servicio-11f11",
      });
    }

    var db = firebase.firestore();

    db.collection(`Customers`)
      .get()
      .then((Documents) => {
        const data = Documents.docs.map((d) => d.data());
        this.setState({ yasa: data });
      });
  }

  cloeseEditUserModal() {
    this.setState({
      editmodalVisiblity: false,
      full_name: "",
      _tel: "",
      _email: "",
      _id: null,
      user: {},
    });
  }

  cloeseCreateUserModal() {
    this.setState({
      createModalVisibility: false,
      email: "",
      tel_num: "",
      full_name: "",
      favs: ["", ""],
      location: ["0.00000 °N", "0.00000 °E"],
      photo: "",
    });
  }

  handleCreateCustomer = () => {
    const { email, tel_num, full_name, favs } = this.state;
    if (full_name.length == 0) {
      alert("Name is required");
    } else if (email.length == 0) {
      alert("Email number is required");
    } else if (tel_num.length == 0) {
      alert("Telephone number is required");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, "test@123")
        .then(async (res) => {
          let customer = firebase.auth().currentUser;

          customer
            .sendEmailVerification()
            .then(function () {
              alert("Verfication has been sent to the service email!");
            })
            .catch(function (error) {
              console.log(error);
            });
          const db = firebase.firestore();
          let id = customer.uid;
          var newDocRef = db.collection("Customers").doc(id);
          newDocRef
            .set({
              email,
              tel_num,
              name: full_name,
              favs,
              location: ["0.00000 °N", "0.00000 °E"],
              photo: ' "https://via.placeholder.com/150"',
              paymentStatus: "0",
              user_id: id,
            })
            .then(function () {
              alert("Create a customer!");
              window.location.reload();
            });
        });
    }
  };
  openCreateMoadal = () => {
    this.setState({
      createModalVisibility: true,
    });
  };
  Users() {
    let t = { ...this.state.yasa };

    // Delete User
    const deleteUser = (id) => {
      const db = firebase.firestore();
      db.collection("Customers").doc(id).delete();
      window.setTimeout(redirect, 2000);
    };

    const redirect = () => {
      window.location.reload();
    };

    const openEditMoadal = (user) => {
      this.setState({
        user: user,
        full_name: user.name,
        _tel: user.tel_num,
      });
      this.setState({
        editmodalVisiblity: true,
      });
    };

    // bug fixes-empty objects being displaying
    let _customers = [];
    Object.values(t).map((_customer, index) => {
      if (_customer.email) {
        _customers.push(_customer);
      }
    });
    console.log(_customers);
    return _customers.map(function (currentlist, i) {
      return (
        <UserReg
          email={currentlist.email}
          name={currentlist.name}
          tel_num={currentlist.tel_num}
          key={i}
          editUser={() => {
            openEditMoadal(currentlist);
          }}
          deleteUser={() => {
            deleteUser(currentlist.user_id);
          }}
        />
      );
    });
  }

  // Edit User
  editUser = (tel_num, name, user) => {
    const db = firebase.firestore();
    db.collection("Customers")
      .doc(user.user_id)
      .set({ ...user, name, tel_num });

    this.cloeseEditUserModal();
    window.setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  handleSubmit = () => {
    const { _tel, full_name, user } = this.state;

    this.editUser(_tel, full_name, user);
  };

  render() {
    return (
      <Fragment>
        <Modal
          visible={this.state.editmodalVisiblity}
          onClickAway={() => this.cloeseEditUserModal()}
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
                  value={this.state.full_name}
                  onChange={(e) => {
                    this.setState({
                      full_name: e.target.value,
                    });
                  }}
                />
              </div>
              <div class="form-group">
                <label for="formGroupExampleInput2">Enter TP No:</label>
                <input
                  type="text"
                  class="form-control"
                  id="formGroupExampleInput2"
                  value={this.state._tel}
                  onChange={(e) => {
                    this.setState({ _tel: e.target.value });
                  }}
                  placeholder="Ex: 0789554563"
                />
              </div>

              <button className="btn btn-primary" onClick={this.handleSubmit}>
                Submit
              </button>
            </div>
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
                  value={this.state.full_name}
                  onChange={(e) => {
                    this.setState({
                      full_name: e.target.value,
                    });
                  }}
                />
              </div>

              <div class="form-group">
                <label for="formGroupExampleInput">Enter Email</label>
                <input
                  type="text"
                  class="form-control"
                  id="formGroupExampleInput"
                  placeholder="Ex: jhon@gmail.com"
                  value={this.state.email}
                  onChange={(e) => {
                    this.setState({
                      email: e.target.value,
                    });
                  }}
                />
              </div>
              <div class="form-group">
                <label for="formGroupExampleInput2">Enter TP No:</label>
                <input
                  type="text"
                  class="form-control"
                  id="formGroupExampleInput2"
                  value={this.state.tel_num}
                  onChange={(e) => {
                    this.setState({ tel_num: e.target.value });
                  }}
                  placeholder="Ex: 0789554563"
                />
              </div>

              <button
                className="btn btn-primary"
                onClick={this.handleCreateCustomer}
              >
                Create
              </button>
            </div>
          </div>
        </Modal>

        <div className="animated fadeIn">
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i>Customers
              <button
                onClick={() => {
                  this.openCreateMoadal();
                }}
              >
                Create a customer
              </button>
            </CardHeader>
            <CardBody>
              <Table responsive striped>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Telephone Number</th>
                    {/* <th>Payment Status</th> */}
                    <th>Actions</th>
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
      </Fragment>
    );
  }
}

export default Customer;
