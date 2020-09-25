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
import Modal from "react-awesome-modal";

const UserReg = (props) => (
  <tr>
    <td>{props.name}</td>
    <td>{props.email}</td>
    <td>{props.tel_num}</td>
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
      editmodalVisiblity: false,
      yasa: "null",
      full_name: "",
      _tel: "",
      _email: "",
      _id: null,
    };
  }

  componentDidMount() {
    const url = "http://localhost:5000/admin/profile";
    // Axios
    //        .get(url)
    //        .then( response => {
    //          console.log(response.data);
    //          this.setState({
    //            Name:response.data.full_name,
    //            Email:response.data.Email,
    //            UserType:response.data.user_type
    //           });
    //           console.log(this.state.Image);

    //         }
    //   )
    //   .catch((err) => console.log(err))
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
        console.log(Documents.docs.length);
        const data = Documents.docs.map((d) => d.data());
        this.setState({ yasa: data });
        //console.log(data)
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
      });
      this.setState({
        editmodalVisiblity: true,
      });
    };

    //console.log(t)
    return Object.values(t).map(function (currentlist, i) {
    
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
      .set({ ...user,name,tel_num});

    this.cloeseEditUserModal();
    window.setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  handleSubmit = () => {
    const { _tel,full_name, user } = this.state;

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

        <div className="animated fadeIn">
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i>Customers
            </CardHeader>
            <CardBody>
              <Table responsive striped>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Telephone Number</th>
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
