import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row, Button } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import Axios from 'axios';
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
      activeTab: 1,
      data:[],
      lock:false,
    };

    const url=`http://localhost:5000/ongoing/picked/${this.props.uid}`
    Axios.get(url)
    .then(response=>{
        this.setState({
            data:response.data
        })
        console.log(response.data)
    })
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
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

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Picked Up</strong>
                <div className="card-header-actions">
                  <a href="https://reactstrap.github.io/components/listgroup/" rel="noreferrer noopener" target="_blank" className="card-header-action">
                  </a>
                </div>
              </CardHeader>
              <CardBody>
                <ListGroup>

                    {this.state.data.map(item =>(
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
                </ListGroup>
              </CardBody>
            </Card>
          </Col>          
        </Row>

        
       
      </div>
    );
  }
}

export default withRouter(Done);
