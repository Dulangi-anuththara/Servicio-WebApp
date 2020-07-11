import React, { Component } from 'react'
import payhere from 'https://www.payhere.lk/lib/payhere.js'

payhere.onCompleted = function onCompleted(orderId) {
    console.log("Payment completed. OrderID:" + orderId);
    //Note: validate the payment and show success or failure page to the customer
};

export default class Subscription extends Component {
    render() {
        return (
            <div>

                <form action="https://sandbox.payhere.lk/pay/o448d4916" method="get"><input name="submit" type="image" alt="payment" src="https://www.payhere.lk/downloads/images/pay_with_payhere.png" width="200px" value="Buy Now"/></form>

            </div>
        )
    }
}
