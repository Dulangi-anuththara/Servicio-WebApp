import React, { Component } from "react";
import firebase from "firebase";
import Modal from "react-awesome-modal";

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

const GarageReg = (props) => (
  <tr>
    <td>{props.full_name}</td>
    <td>{props.email}</td>
    <td>{props.user_type}</td>
    <td>{props.Rating}</td>
    <td>
      <button onClick={() => props.openImage()}>View BR</button>
    </td>
    <td>{props.isVerified ? "true" : "false"}</td>
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
      _selectedUser: {},
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

    db.collection(`Users`)
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
          (g) => g.data().isVerified === false
        );
        this.setState({ garcount: gardata.length });
      });
  }

  Users() {
    let t = { ...this.state.yasa };

    const openImage = (photo, isV, id, user) => {
      console.log("garage -> openImage -> photo", photo);
      this.setState({
        photo: photo,
        show: true,
        isVerified: isV,
        initialVerified: isV,
        id: id,
        _selectedUser: user,
      });
    };

    //console.log(t)
    return Object.values(t).map(function (currentlist, i) {
      if (currentlist.isVerified === true) return;
      console.log("garage -> Users -> currentlist", currentlist);

      return (
        <GarageReg
          id={currentlist.docId}
          openImage={() =>
            openImage(
              currentlist.BRPhoto,
              currentlist.isVerified,
              currentlist.docId,
              currentlist
            )
          }
          isVerified={currentlist.isVerified}
          image={currentlist.Photo}
          email={currentlist.Email}
          full_name={currentlist.Service_Name}
          user_type={currentlist.user_type}
          Rating={currentlist.Rating}
          BRPhoto={currentlist.BRPhoto}
          Verify={currentlist.Verification}
          key={i}
        />
      );
    });
  }

  handleServiceCreation = async () => {
    const {
      BRPhoto,
      Description,
      Email,
      Rating,
      SearchKey,
      Service_Name,
      docId,
      isVerified,
      user_type,
      Location,
    } = this.state._selectedUser;

    const db = firebase.firestore();
    let result = await db
      .collection("Services")
      .doc(docId)
      .set({
        BRPhoto: BRPhoto,
        Description: Description,
        Email: Email,
        Rating: 0,
        SearchKey: SearchKey,
        isVerified: true,
        Service_Name: Service_Name,
        user_type: user_type,
        Address: "addess",
        AddressTwo: "address2",
        City: "please enter a city",
        Favs: ["", ""],
        Image: "https://firebasestorage.googleapis.com/v0/b/servicio-11f11.appspot.com/o/images%2FNissan-Service-Center-534x462.jpg?alt=media&token=8a8e6fe7-e649-4ee5-8101-8880a9e13395",
        Photo: "https://firebasestorage.googleapis.com/v0/b/servicio-11f11.appspot.com/o/images%2FNissan-Service-Center-534x462.jpg?alt=media&token=8a8e6fe7-e649-4ee5-8101-8880a9e13395",
        Name: "dummy name",
        Registeration_No: "20XX-XX-XX",
        Service_Id: docId,
        Service_Types: ["Body Wash"],
        Telephone: parseInt('0700000000'),
        paymentStatus: "0",
        Location:Location,
        createdDate: firebase.firestore.Timestamp.fromDate(new Date()),
      });

    if (!result) {
      this.setState({
        isSubmited: true,
      });
      window.setTimeout(this.redirect(), 3000);
    }
  };

  submitVerified = () => {
    firebase
      .firestore()
      .doc(`Users/${this.state.id}`)
      .update({
        isVerified: this.state.isVerified,
      })
      .then((d) => {
        console.log(d);
      })
      .catch((e) => {
        console.log(e);
      });

    this.handleServiceCreation();
  };

  redirect = () => {
    window.location.reload();
  };

  setVerified = () => {
    this.setState({
      isVerified: !this.state.isVerified,
    });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <div>
          <Modal
           visible={this.state.show}
           effect="fadeInUp"
           onClickAway={() => this.closeModal()}
          >
            <div style={{ padding: 20 }}>
            <h1>Business Registration </h1>
              <p>Please Check the BR and Approve Account</p>
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
              <div style={{ marginTop: 10, marginLeft: 210 }}>
                {(this.state.isVerified && this.state.isSubmited) ||
                this.state.initialVerified ? null : (
                  <input
                    style={{ marginRight: 8, marginTop: 4 }}
                    type="checkbox"
                    value={this.state.isVerified}
                    onChange={this.setVerified}
                  ></input>
                )}
                {(this.state.isVerified && this.state.isSubmited) ||
                this.state.initialVerified ? null : (
                  <button
                    className="btn btn-primary"
                    style={{ height: 30, padding: 2, width: 70 }}
                    onClick={this.submitVerified}
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </Modal>

          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i>Registered Garage Centers{" "}
              {this.state.garcount}
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
                    <th>Status</th>
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
