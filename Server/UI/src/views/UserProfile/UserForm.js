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
    this.onAdd = this.onAdd.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      isValidated:true,
      isCorrect:true,
      lock:true,
      lock_R:true,

      Name:"",
      Registeration_No:"",
      Address:"",
      AddressTwo:"",
      City:"",
      Email:"",
      Telephone:"",
      Image:"",
      Services:[],
      isChecked:{},    
  
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
  onAdd (e){
    console.log(this.state.isChecked)
    if(!this.state.Services.includes(e.target.value)){
      this.setState({
        Services:[...this.state.Services,e.target.value],
        isChecked:{...this.state.isChecked,[e.target.name]:true}
      },()=>{
        console.log(this.state.Services);
      })
    }else{
      let remove = this.state.Services.indexOf(e.target.value);
      this.setState({
        Services: this.state.Services.filter((_, i) => i !== remove),
        isChecked:{...this.state.isChecked,[e.target.name]:false}
      },()=>{
        console.log(this.state.Services);
      })
    }
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
      console.log("Handle Submit")
      return true;
    }
    else{
      return false;
    }
  }

  validateRegister(e){
    
    var Regex =/^[0-9]{4}[-]{1}[A-Z]{2}[-]{1}[0-9]{2}$/;
    var result = Regex.test(this.state.Registeration_No);
    if(result){
      console.log("Handle Submit2")
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
          Registeration_No:this.state.Registeration_No,
          Address:this.state.Address,
          AddressTwo:this.state.AddressTwo,
          City:this.state.City,
          Email:this.state.Email,
          Telephone:this.state.Telephone,
          Image:this.state.Image,
          Service_Types:this.state.Services
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
                                  Name:response.data.Service_Name,
                                  Registeration_No:response.data.Registeration_No,
                                  Address:response.data.Address,
                                  AddressTwo:response.data.AddressTwo,
                                  City:response.data.City,
                                  Email:response.data.Email,
                                  Telephone:response.data.Telephone,
                                  Image:response.data.Photo,
                                  Services:response.data.Service_Types

                                })                           
                              
                              }
                        )
                        .then(()=>{
                          if(this.state.Services.includes("Body Wash")){
                            this.setState({
                              isChecked:{...this.state.isChecked,Body_wash:true}
                            })
                          }
                          else{
                            this.setState({
                              isChecked:{...this.state.isChecked,Body_wash:false}
                            })
                          }
                          if(this.state.Services.includes("Full Service")){
                            this.setState({
                              isChecked:{...this.state.isChecked,Full_service:true}
                            })
                          }
                          else{
                            this.setState({
                              isChecked:{...this.state.isChecked,Full_service:false}
                            })
                          }
                          if(this.state.Services.includes("Oil Change")){
                            this.setState({
                              isChecked:{...this.state.isChecked,Oil_change:true}
                            })
                          }
                          else{
                            this.setState({
                              isChecked:{...this.state.isChecked,Oil_change:false}
                            })
                          }
                        })
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
                <strong>Update</strong>
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
                          name="Registeration_No" 
                          value={this.state.Registeration_No} 
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
                              />                              
                    </FormGroup>
                    {Alerts}
                  </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="3">
                      <Label>Services</Label>
                    </Col>
                    <Col md="9">
                      <FormGroup check inline>
                        <Input className="form-check-input" type="checkbox" id="inline-checkbox1" name="Body_wash" value="Body Wash" onChange={this.onAdd} checked={this.state.isChecked.Body_wash}/>
                        <Label className="form-check-label" check htmlFor="inline-checkbox1">Body Wash</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input className="form-check-input" type="checkbox" id="inline-checkbox2" name="Full_service" value="Full Service" onChange={this.onAdd} checked={this.state.isChecked.Full_service}/>
                        <Label className="form-check-label" check htmlFor="inline-checkbox2">Full Service</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input className="form-check-input" type="checkbox" id="inline-checkbox3" name="Oil_change" value="Oil Change" onChange={this.onAdd} checked={this.state.isChecked.Oil_change}/>
                        <Label className="form-check-label" check htmlFor="inline-checkbox3">Oil Change</Label>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
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
