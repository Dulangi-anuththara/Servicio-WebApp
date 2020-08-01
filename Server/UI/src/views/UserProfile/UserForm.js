import React, { Component } from 'react';
import { BrowswerRouter as Router,Route,Link, withRouter } from 'react-router-dom'
import axios from 'axios' ;
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';
import Alert from '@material-ui/lab/Alert';
import Alerts from '../Notifications/Alerts/Alerts';

class UserForm extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.validatePhone=this.validatePhone.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      isValidated:true,
      isCorrect:true,
      lock:false,
      lock_R:false,

      Name:"",
      Registration_No:"",
      Address:"",
      AddressTwo:"",
      City:"",
      Email:"",
      Telephone:"",
      Image:""    
  
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  onChange = (e) => {
    this.setState(
      {
        [e.target.name]:e.target.value
      }
    )
  }

  onChangeHandler = (e) =>{
    
    this.setState({
      Image:e.target.files[0],
      loaded:0,
    })
  }
  validatePhone(e){
    var count=this.state.Telephone.toString().length;
    if(count == 10){
      return true;
    }
    else{
      return false;
    }
  }

  validateRegister(e){

    var Regex =/^[0-9]{4}[-]{1}[A-Z]{2}[-]{1}[0-9]{2}$/;
    var result = Regex.test(this.state.Registration_No);
    if(result){
      return true
    }
    
  }

  handleSubmit(e){
    e.preventDefault();

    this.setState({
      lock:this.validatePhone(),
      lock_R:this.validateRegister(),
      isValidated:true,
      isCorrect:true
    },() => {

      if(this.state.lock && this.state.lock_R){
        const data = {
          Name:this.state.Name,
          Registration_No:this.state.Registration_No,
          Address:this.state.Address,
          AddressTwo:this.state.AddressTwo,
          City:this.state.City,
          Email:this.state.Email,
          Telephone:this.state.Telephone,
          Image:this.state.Image,
        }
        console.log(data);
        
        const path = `http://localhost:5000/user/profile/edit/${this.props.uid}`;
        axios.post(path,data)
              .then((response)=>{
                  console.log('Good. '+response.data);
                  this.props.history.push('/profile/');
                  //console.log(this.props.history)
              })
              .catch((err)=>{
    
                console.log(err);
              });
          
           
            }  
    
    
          else{
            if(!this.state.lock){
              this.setState({
                isValidated:false
              })
            }
            else{
              this.setState({
                isCorrect:false
              })
            }      
          }




    })
   
   
  }

  componentDidMount(){
    const url = `http://localhost:5000/user/profile/${this.props.uid}`;
    axios
                        .get(url)
                        .then( response => {
                                this.setState({
                                  Name:response.data.Name,
                                  Registration_No:response.data.Registration_No,
                                  Address:response.data.Address,
                                  AddressTwo:response.data.AddressTwo,
                                  City:response.data.City,
                                  Email:response.data.Email,
                                  Telephone:response.data.Telephone,
                                  Image:response.data.Image,

                                })                           
                              
                              }
                        )
                        .catch((err) => console.log(err))

  }

  render() {
    let Alerts = <p></p>
    let AlertTwo =<p></p>
    if(!this.state.isValidated){
       Alerts = <Alert severity="error">number must contain 10 digits</Alert>
    }
    if(!this.state.isCorrect){
      AlertTwo=<Alert severity="error">Registration No. should be in this format : 9287-UY-09</Alert>
    }

    return (
      <div className="animated fadeIn">

        <Form onSubmit={this.handleSubmit} >
        <Row>
         
          <Col xs="12">
            <Card>
              <CardHeader>
                <strong>Company</strong>
                <small> Form</small>
              </CardHeader>
              <CardBody>
                <FormGroup>
                  <Label htmlFor="company">Company</Label>
                  <Input 
                          type="text" 
                          id="company"
                          name="Name" 
                          value={this.state.Name}
                          onChange={this.onChange}
                          required
                          />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="vat">Registration No.</Label>
                  <Input 
                          type="text" 
                          id="vat"
                          name="Registration_No" 
                          value={this.state.Registration_No} 
                          onChange={this.onChange}
                          required
                          
                  />
                </FormGroup>
                {AlertTwo}
                <FormGroup>
                  <Label htmlFor="vat">Email</Label>
                  <Input 
                          type="email" 
                          id="email"
                          name="Email" 
                          value={this.state.Email} 
                          onChange={this.onChange}
                          required
                          
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="street">Address</Label>
                  <Input 
                        type="text" 
                        id="Address"
                        name="Address"
                        value={this.state.Address}
                        onChange={this.onChange}
                        required/>
                </FormGroup>
                <FormGroup>
                <Label htmlFor="street">Address 2</Label>
                  <Input 
                  type="text" 
                  id="addressTwo"
                  name="AddressTwo"
                  value={this.state.AddressTwo}
                  onChange={this.onChange}
                  placeholder="optional"/>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="8">
                    <FormGroup>
                      <Label htmlFor="city">City</Label>
                      <Input 
                            type="text" 
                            id="city" 
                            name="City"
                            value={this.state.City}
                            onChange={this.onChange}
                            required />
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="postal-code">Telephone</Label>
                      <Input 
                              type="number" 
                              id="Telephone"
                              name="Telephone" 
                              value={this.state.Telephone}
                              onChange={this.onChange} 
                              required
                              style={{}}
                              />                              
                    </FormGroup>
                    {Alerts}
                  </Col>
                </FormGroup>

                <Button type="submit" size="sm" color="primary" ><i className="fa fa-dot-circle-o"></i> Submit</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
        </Form>
  
      </div>
    );
  }
}

export default withRouter(UserForm);
