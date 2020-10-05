import React, { Component } from "react";
import firebase from "firebase";
import _, { after } from "lodash";
import {
  Card,
  CardBody,
  CardHeader,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
} from "reactstrap";
import moment from "moment";
class Typography extends Component {
  state = {
    complains: [],
    users: [],
    services: [],
    resolved: false,
  };

  componentDidMount = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyC1I4w3OUaDmITrLrA0TDfhicVwVWDnJrk",
        authDomain: "servicio-11f11.firebaseapp.com",
        projectId: "servicio-11f11",
      });
    }
    var db = firebase.firestore();

    db.collection(`Complains`)
      .get()
      .then((Documents) => {
        const data = Documents.docs.map((d) => {
          return {
            ...d.data(),
            docId: d.id,
          };
        });
        let _complains = _.filter(data, { is_resolved: false });
        this.setState({
          complains: _complains,
        });
      });
    db.collection(`Customers`)
      .get()
      .then((Documents) => {
        const data = Documents.docs.map((d) => {
          return {
            ...d.data(),
            docId: d.id,
          };
        });
        this.setState({
          users: data,
        });
      });

    db.collection(`Services`)
      .get()
      .then((Documents) => {
        const data = Documents.docs.map((d) => {
          return {
            ...d.data(),
            docId: d.id,
          };
        });
        this.setState({
          services: data,
        });
      });
  };

  getServiceName = (servie_id) => {
    const { services } = this.state;

    if (services.length !== 0) {
      let user = _.filter(services, { docId: servie_id });
      console.log("Typography -> getUserName -> user", user);

      return user[0].Service_Name;
    }
  };

  getUserName = (user_id) => {
    const { users } = this.state;

    if (users.length !== 0) {
      let user = _.filter(users, { docId: user_id });
      console.log("Typography -> getUserName -> user", user);

      return user[0].name;
    }
  };

  resolveComplain = async (complain) => {
    let id = complain.docId;
    const db = firebase.firestore();

    let result = await db
      .collection("Complains")
      .doc(id)
      .update({ is_resolved: true });
    if (!result) {
      this.redirect();
    }
  };

  redirect = () => {
    window.location.reload();
  };

  renderComplains = () => {
    const { complains } = this.state;
    return complains.map((complain, index) => {
      let _userId = complain.user_id;
      let _serviceId = complain.service_id;
      let date = complain.date;
      let _date = new Date(date.seconds * 1000);

      return (
        <tr key={index}>
          <td>{this.getUserName(_userId)}</td>
          <td>{this.getServiceName(_serviceId)}</td>
          <td>{complain.complain}</td>
          <td>{_date.toDateString()}</td>
          <td>
            <button onClick={() => this.resolveComplain(complain)}>✔</button>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i>Registered Garage Centers
          </CardHeader>
          <CardBody>
            <Table responsive striped>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Service Name</th>
                  <th>Complain</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{this.renderComplains()}</tbody>
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
    );
  }
}

export default Typography;
