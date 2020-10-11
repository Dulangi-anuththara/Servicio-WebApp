import React, { Component,useRef } from "react";
import ReactToPrint from 'react-to-print';
import {render} from "react-dom";
import Typography from '../Theme/Typography/Typography'
import Transactions from '../Theme/Transactions/Transactions'
import Customers from '../Customers/Customer'

export class reports extends Component {

  handleClickC() {
    const Example = () => {
      const componentRef = useRef();
     
      return (
        <div>
          <ReactToPrint
            trigger={() => <button>Print this out!</button>}
            content={() => componentRef.current}
          />
          <Typography ref={componentRef} />
        </div>
      );
    };
    var k = render(<Example />, document.querySelector('#root'));
    window.open(k);
    };

    handleClickT() {
      const Example = () => {
        const componentRef = useRef();
       
        return (
          <div>
            <ReactToPrint
              trigger={() => <button>Print this out!</button>}
              content={() => componentRef.current}
            />
            <Transactions ref={componentRef} />
          </div>
        );
      };
      var k = render(<Example />, document.querySelector('#root'));
      window.open(k);
      };

  render() {
    return (
      <div>
        <h2>Generate Reports</h2>
        <p></p>
        <button type="button" class="btn btn-primary" onClick={this.handleClickC}>Complaints</button>
        <p></p>
        <button type="button" class="btn btn-primary" onClick={this.handleClickT}>Transactions</button>
      </div>
    );
  }
}

export default reports;
