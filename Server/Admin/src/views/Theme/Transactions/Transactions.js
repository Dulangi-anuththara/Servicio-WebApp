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
class Transactions extends Component {
  state = {
    payments: [],
    services: [],
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

    db.collection(`Payment`)
      .get()
      .then((Documents) => {
        const data = Documents.docs.map((d) => {
            //console.log(d.data());
          return {
            ...d.data(),
            docId: d.id,
          };
        });
        let _complains = data;
        this.setState({
          payments: _complains,
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

  getServiceName = (Service_id) => {
    const { services } = this.state;
    //console.log(services);

    if (services.length !== 0) {
      let user = _.filter(services, { Service_Id: Service_id });
      //console.log("Typography -> getUserName -> user", user);
        console.log(user);
        if(user.length > 0)
            return user[0].Service_Name;
    }
  };


  renderPayments = () => {
    const { payments } = this.state;
    return payments.map((payment, index) => {
      let _serviceId = payment.userId;
      let date = payment.created;
      let _date = new Date(date.seconds * 1000);

      return (
        <tr key={index}>
          <td>{payment.payment_id}</td>
          <td>{this.getServiceName(_serviceId)}</td>
          <td>{payment.card_holder_name}</td>
          <td>{payment.payhere_amount}</td>
          <td>{payment.payhere_currency}</td>
            <td>{_date.toDateString()}</td>
          
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i>Payment Details
          </CardHeader>
          <CardBody>
            <Table responsive striped>
              <thead>
                <tr>
                  <th>Payment ID</th>
                  <th>Service Name</th>
                  <th>Card Holder</th>
                  <th>Amount</th>
                  <th>Currency</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>{this.renderPayments()}</tbody>
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

export default Transactions;
