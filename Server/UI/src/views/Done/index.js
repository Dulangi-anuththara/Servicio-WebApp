import React, {Component} from 'react';
import {Badge, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane, ListGroup, ListGroupItem, Button} from 'reactstrap';
import Axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class Done extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onCancel=this.onCancel.bind(this);
    this.handleCompletion=this.handleCompletion.bind(this);
    this.onOpen=this.onOpen.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
      pending:[],
      rated:[],
      completed:[],
      lock:false
    };
  }

  componentDidMount(){
    const path=`http://localhost:5000/ongoing/picked/${this.props.uid}`
    Axios.get(path)
    .then(response=>{
        this.setState({
            pending:response.data
        })
        console.log(response.data)
    })  

    const url=`http://localhost:5000/ongoing/rated/${this.props.uid}`
    Axios.get(url)
    .then(response=>{
        this.setState({
            rated:response.data
        })
        console.log(response.data)
    })

    const URL=`http://localhost:5000/ongoing/completed/${this.props.uid}`
    Axios.get(URL)
    .then(response=>{
        this.setState({
            completed:response.data
        })
        console.log(response.data)
    })

  }

  lorem() {
    return 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.'
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice()
    newArray[tabPane] = tab
    this.setState({
      activeTab: newArray,
    });
  }

  handleCompletion(e){
    
    const url=`http://localhost:5000/ongoing/completion/${this.props.uid}/${e.target.value}`
     
      Axios.get(url)
      .then(response =>{
        console.log(response.data);
        this.props.history.push('/done')
      })
    
    
  }
  onOpen(){
      this.setState({
          lock:true
      })
  }
  onCancel(){
      this.setState({
          lock:false
      })
  }

  tabPane() {
    return (
      <>
        <TabPane tabId="1">
          {<ListGroup>

            {this.state.pending.map(item =>(
                <div>                         
                <ListGroupItem key={item.id}><i className="fa fa-align-justify"></i>   {item.CustName} picked up {item.VehicleDetails.regNo} (Not yet rated)</ListGroupItem>
                </div>
            ))}
            </ListGroup>}
        </TabPane>
        <TabPane tabId="2">
          {<ListGroup>

                {this.state.rated.map(item =>(
                    <div>                         
                    <ListGroupItem key={item.id} onClick={this.onOpen}><i className="fa fa-align-justify"></i>   {item.CustName} has rated for <strong>{item.ServiceType}</strong> on {item.VehicleDetails.brand} {item.VehicleDetails.model}</ListGroupItem>
                    <Dialog open={this.state.lock}>
                        <DialogContent>
                        <DialogContentText>
                    Rating : {item.Rating}
                    </DialogContentText>
                    <DialogContentText>
                    Comment : {item.Comment}
                    </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCompletion} color="primary" value={item.id}>
                                Completed
                            </Button>
                            <Button onClick={this.onCancel} color="primary">
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                    </div>
                ))}
                </ListGroup>}
        </TabPane>
        <TabPane tabId="3">
                {<ListGroup>

        {this.state.completed.map(item =>(
            <div>                         
            <ListGroupItem key={item.id}><i className="fa fa-align-justify"></i>  {item.ServiceType} is completed for {item.VehicleDetails.regNo} </ListGroupItem>
            </div>
        ))}
        </ListGroup>}
        </TabPane>
      </>
    );
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Nav tabs>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '1'}
                  onClick={() => { this.toggle(0, '1'); }}
                >
                  Pending
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '2'}
                  onClick={() => { this.toggle(0, '2'); }}
                >
                  Rated
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '3'}
                  onClick={() => { this.toggle(0, '3'); }}
                >
                  Completed
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab[0]}>
              {this.tabPane()}
            </TabContent>
          </Col>          
        </Row>
      </div>
    );
  }
}

export default withRouter(Done);
