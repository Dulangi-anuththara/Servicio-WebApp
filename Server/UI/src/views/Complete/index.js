import React, {Component} from 'react';
import {Badge, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane, ListGroup, ListGroupItem, Button, FormGroup, Input, Label} from 'reactstrap';
import Axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Rating  from 'react-rating-scale';
import DialogTitle from '@material-ui/core/DialogTitle';

class Complete extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onCancel=this.onCancel.bind(this);
    this.handleCompletion=this.handleCompletion.bind(this);
    this.onOpen=this.onOpen.bind(this);
    this.onChange=this.onChange.bind(this);
    this.onChangeYear=this.onChangeYear.bind(this);
    this.state = {
        Month: new Date().getMonth(),
        Year:new Date().getFullYear(),
        Yesterday:new Date().getDate() - 1,
      activeTab: new Array(4).fill('1'),
      yesterday:[],
      month:[],
      year:[],
      lock:false,
      customerRate:0
    };
  }

  componentDidMount(){

    console.log(this.state.Yesterday)
    const path=`http://localhost:5000/completed/yesterday/${this.props.uid}/${this.state.Yesterday}`
    Axios.get(path)
    .then(response=>{
        this.setState({
            yesterday:response.data
        })
        //console.log(response.data)
    })  

    const url=`http://localhost:5000/completed/month/${this.props.uid}/${this.state.Month}/${this.state.Year}`
    Axios.get(url)
    .then(response=>{
        this.setState({
            month:response.data
        })
        console.log("Month received")
    })

    const URL=`http://localhost:5000/completed/year/${this.props.uid}/${this.state.Year}`
    Axios.get(URL)
    .then(response=>{
        this.setState({
            year:response.data
        })
        console.log(" Year Received")
    })

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
     
      Axios.post(url,{
        rating:this.state.customerRate
      })
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

  onChange(e){
    this.setState({
        [e.target.name]:e.target.value
    },()=>{
        const url=`http://localhost:5000/completed/month/${this.props.uid}/${this.state.Month}/${this.state.Year}`
        Axios.get(url)
        .then(response=>{
            this.setState({
                month:response.data
            })
            console.log("Received")
        })
    })

  }
  onChangeYear(e){
    this.setState({
        [e.target.name]:e.target.value
    },()=>{
        const url=`http://localhost:5000/completed/year/${this.props.uid}/${this.state.Year}`
        Axios.get(url)
        .then(response=>{
            this.setState({
                year:response.data
            })
            console.log("Received")
        })
    })

  }

  tabPane() {
    return (
      <>

        <TabPane tabId="1">
                        {<ListGroup>

                {this.state.yesterday.map(item =>(
                    <div>                         
                    <ListGroupItem key={item.id}><i className="fa fa-align-justify"></i>  {item.ServiceType} is completed for {item.VehicleDetails.regNo} </ListGroupItem>
                    </div>
                ))}
                </ListGroup>}
        </TabPane>
        <TabPane tabId="2">
          { <div> <FormGroup row>
                    <Col md="1">
                      <Label>Month</Label>
                    </Col>
                    <Col md="11">
                      <FormGroup check inline>
                        <Input className="form-check-input" type="radio" id="radio1" name="Month" value={0} onChange={this.onChange}/>
                        <Label className="form-check-label" check htmlFor="inline-radio1">Jan</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input className="form-check-input" type="radio" id="radio2" name="Month" value={1} onChange={this.onChange}/>
                        <Label className="form-check-label" check htmlFor="inline-radio2">Feb</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input className="form-check-input" type="radio" id="radio3" name="Month" value={2} onChange={this.onChange}/>
                        <Label className="form-check-label" check htmlFor="inline-radio3">Mar</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input className="form-check-input" type="radio" id="radio4" name="Month" value={3} onChange={this.onChange}/>
                        <Label className="form-check-label" check htmlFor="inline-radio3">Apr</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input className="form-check-input" type="radio" id="radio5" name="Month" value={4} onChange={this.onChange}/>
                        <Label className="form-check-label" check htmlFor="inline-radio3">May</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input className="form-check-input" type="radio" id="radio6" name="Month" value={5} onChange={this.onChange}/>
                        <Label className="form-check-label" check htmlFor="inline-radio3">Jun</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input className="form-check-input" type="radio" id="radio7" name="Month" value={6} onChange={this.onChange}/>
                        <Label className="form-check-label" check htmlFor="inline-radio3">Jul</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input className="form-check-input" type="radio" id="radio8" name="Month" value={7} onChange={this.onChange}/>
                        <Label className="form-check-label" check htmlFor="inline-radio3">Aug</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input className="form-check-input" type="radio" id="radio9" name="Month" value={8} onChange={this.onChange}/>
                        <Label className="form-check-label" check htmlFor="inline-radio3">Sep</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input className="form-check-input" type="radio" id="radio10" name="Month" value={9} onChange={this.onChange} defaultChecked/>
                        <Label className="form-check-label" check htmlFor="inline-radio3">Oct</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input className="form-check-input" type="radio" id="radio11" name="Month" value={10} onChange={this.onChange}/>
                        <Label className="form-check-label" check htmlFor="inline-radio3">Nov</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input className="form-check-input" type="radio" id="radio12" name="Month" value={11} onChange={this.onChange}/>
                        <Label className="form-check-label" check htmlFor="inline-radio3">Dec</Label>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  
                  <ListGroup>

            {this.state.month.map(item =>(
                <div>                         
                <ListGroupItem key={item.id}><i className="fa fa-align-justify"></i>   {item.CustName} picked up {item.VehicleDetails.regNo} (Not yet rated)</ListGroupItem>
                </div>
            ))}
            </ListGroup> </div>
                  
        }
        </TabPane>
        <TabPane tabId="3">
                {<div>
                    <FormGroup row>
                    <Col md="1">
                      <Label>Year</Label>
                    </Col>
                    <Col md="11">
                      <FormGroup check inline>
                        <Input className="form-check-input" type="radio" id="radio1" name="Year" value={2020} onChange={this.onChangeYear}/>
                        <Label className="form-check-label" check htmlFor="inline-radio1">2020</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input className="form-check-input" type="radio" id="radio2" name="Year" value={2019} onChange={this.onChangeYear}/>
                        <Label className="form-check-label" check htmlFor="inline-radio2">2019</Label>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                    
                    <ListGroup>

        {this.state.year.map(item =>(
            <div>                         
            <ListGroupItem key={item.id}><i className="fa fa-align-justify"></i>  {item.ServiceType} is completed for {item.VehicleDetails.regNo} </ListGroupItem>
            </div>
        ))}
        </ListGroup> </div>}
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
                  Yesterday
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '2'}
                  onClick={() => { this.toggle(0, '2'); }}
                >
                  Month
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '3'}
                  onClick={() => { this.toggle(0, '3'); }}
                >
                  Year
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

export default withRouter(Complete);
