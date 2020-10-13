import React, { Component } from 'react'
import firebase from "firebase";
import * as fire from '../../storage/index';
import {
    Card,
    CardBody,
    CardHeader,
    Pagination,
    PaginationItem,
    PaginationLink,
    Table,
  } from "reactstrap";

var db = firebase.firestore();



class Subscription extends Component {

    
        constructor(props){
            super(props);
            this.state = {payments: []}
        }
    
    
    componentDidMount() {

        db.collection("Payment").where('userId', '==', this.props.uid).get()
        .then((snapshot)=> {
            const data = snapshot.docs.map((d) => {
                return {
                    ...d.data(),
                    docId: d.id,
                };
            });
            this.setState({
                payments: data
            })
        });
    };

    renderPayments = () => {
        const { payments } = this.state;
        return payments.map((payment, index) => {
            let date = payment.created;
      let _date = new Date(date.seconds * 1000);
            return(
                <tr key={index}>
                    <td>{payment.payment_id}</td>
                    <td>{payment.card_holder_name}</td>
                    <td>{payment.payhere_amount}</td>
                    <td>{payment.payhere_currency}</td>
                    <td>{_date.toDateString()}</td>
                    <td>{}</td>
                </tr>
            );
        });
    };

    render() {
        return (
            <div className="animated fadeIn">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>Your Payments
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>Payment_ID</th>
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
            <Card>
                <CardHeader>
                <i className="fa fa-align-justify"></i>Terms & conditions
              </CardHeader>
                <ul >
                    <p></p>
                    <li>Pay Annual subscription of Rs 2000/- within 3 months once you get approved to stay connected with the system.</li>
                    <li>Subscription is non-refundable.</li>
                    <li>Cancel the subscription for next year please contact us via email.</li>
                    <li>By doing the payment you are agreeing to above Terms & conditions.</li>
                </ul>
            </Card>
            <Card>
            <form align="center" action="https://sandbox.payhere.lk/pay/o448d4916" method="get"><input align="center" name="submit" type="image" alt="payment" src="https://www.payhere.lk/downloads/images/pay_with_payhere.png" width="200px" value="Buy Now"/></form>
            </Card>
                

            </div>
        );
        
    }
}

export default Subscription;