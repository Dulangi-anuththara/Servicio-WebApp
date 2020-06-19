import React, { Component } from 'react';
import { BrowswerRouter as Router,Route,Link } from 'react-router-dom'
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

class UserForm extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,

      Name:"",
      Registration_No:"",
      Address:"",
      Email:"",
      Telephone:"",
      Image:"",      
  
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

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      Name:this.state.Name,
      Registration_No:this.state.Registration_No,
      Address:this.state.Address,
      Email:this.state.Email,
      Telephone:this.state.Telephone,
      Image:this.state.Image,
    }
    const path = "http://localhost:5000/user/profile/edit";
    axios.post(path,data)
          .then((response)=>{
              console.log('Good. '+response.data);
              this.props.history.push('/profile');
          })
          .catch((err)=>{

            console.log(err);
          });
  }

  componentDidMount(){
    const url = "http://localhost:5000/user/profile";
    axios
                        .get(url)
                        .then( response => {
                                this.setState({
                                  Name:response.data.Name,
                                  Registration_No:response.data.Registration_No,
                                  Address:response.data.Address,
                                  Email:response.data.Email,
                                  Telephone:response.data.Telephone,
                                  Image:response.data.Image,

                                })                           
                              
                              }
                        )
                        .catch((err) => console.log(err))

  }

  render() {
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
                          
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="street">Street</Label>
                  <Input type="text" id="street"/>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="8">
                    <FormGroup>
                      <Label htmlFor="city">City</Label>
                      <Input 
                            type="text" 
                            id="city" 
                            name="Address"
                            value={this.state.Address}
                            onChange={this.onChange} />
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="postal-code">Telephone</Label>
                      <Input 
                              type="text" 
                              id="Telephone"
                              name="Telephone" 
                              value={this.state.Telephone}
                              onChange={this.onChange} />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="country">Country</Label>
                  <Input type="select" name="select" id="select">
                        <option value="0">Please select</option>
                        <option value="1">Option #1</option>
                        <option value="2">Option #2</option>
                        <option value="3">Option #3</option>
                      </Input>
                </FormGroup>
                <FormGroup>
                    
                      <Label htmlFor="file-input">Cover Image</Label>
                  
                    
                      <Input type="file" id="Image" name="Image" />
                    
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

export default UserForm;
