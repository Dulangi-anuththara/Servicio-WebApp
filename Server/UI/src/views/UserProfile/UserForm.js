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
    }
    const path = "http://localhost:5000/user/profile/edit";
    axios.post(path,data)
          .then((response)=>{
              console.log('Good. '+response.data);
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
                                  Telephone:response.data.Telephone

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

                <Button type="submit" size="sm" color="primary" ><i className="fa fa-dot-circle-o"></i> Submit</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <strong>Basic Form</strong> Elements
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                
                  <FormGroup>
                  <Label htmlFor="postal-code">Email</Label>
                    <InputGroup>
                      <Input 
                            type="email" 
                            id="Email" 
                            name="Email" 
                            autoComplete="username" 
                            value={this.state.Email}
                            onChange={this.onChange}
                            
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText><i className="fa fa-envelope"></i></InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
               
              
                  <FormGroup>
                  <Label htmlFor="date-input">Date Input </Label> 
                  <InputGroup>                                      
                      <Input type="date" id="date-input" name="date-input" placeholder="date" />
                      
                      <InputGroupText><i className="fa fa-calendar"></i></InputGroupText>
                     
                      </InputGroup>  
                  </FormGroup>
                  <FormGroup>
                    
                      <Label htmlFor="textarea-input">Description</Label>
                    
                    
                      <Input type="textarea" name="textarea-input" id="textarea-input" rows="9"
                             placeholder="Content..." />
                    
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Select</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select" name="select" id="select">
                        <option value="0">Please select</option>
                        <option value="1">Option #1</option>
                        <option value="2">Option #2</option>
                        <option value="3">Option #3</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="selectLg">Select Large</Label>
                    </Col>
                    <Col xs="12" md="9" size="lg">
                      <Input type="select" name="selectLg" id="selectLg" bsSize="lg">
                        <option value="0">Please select</option>
                        <option value="1">Option #1</option>
                        <option value="2">Option #2</option>
                        <option value="3">Option #3</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="selectSm">Select Small</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select" name="selectSm" id="SelectLm" bsSize="sm">
                        <option value="0">Please select</option>
                        <option value="1">Option #1</option>
                        <option value="2">Option #2</option>
                        <option value="3">Option #3</option>
                        <option value="4">Option #4</option>
                        <option value="5">Option #5</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="disabledSelect">Disabled Select</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select" name="disabledSelect" id="disabledSelect" disabled autoComplete="name">
                        <option value="0">Please select</option>
                        <option value="1">Option #1</option>
                        <option value="2">Option #2</option>
                        <option value="3">Option #3</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="multiple-select">Multiple select</Label>
                    </Col>
                    <Col md="9">
                      <Input type="select" name="multiple-select" id="multiple-select" multiple>
                        <option value="1">Option #1</option>
                        <option value="2">Option #2</option>
                        <option value="3">Option #3</option>
                        <option value="4">Option #4</option>
                        <option value="5">Option #5</option>
                        <option value="6">Option #6</option>
                        <option value="7">Option #7</option>
                        <option value="8">Option #8</option>
                        <option value="9">Option #9</option>
                        <option value="10">Option #10</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Radios</Label>
                    </Col>
                    <Col md="9">
                      <FormGroup check className="radio">
                        <Input className="form-check-input" type="radio" id="radio1" name="radios" value="option1" />
                        <Label check className="form-check-label" htmlFor="radio1">Option 1</Label>
                      </FormGroup>
                      <FormGroup check className="radio">
                        <Input className="form-check-input" type="radio" id="radio2" name="radios" value="option2" />
                        <Label check className="form-check-label" htmlFor="radio2">Option 2</Label>
                      </FormGroup>
                      <FormGroup check className="radio">
                        <Input className="form-check-input" type="radio" id="radio3" name="radios" value="option3" />
                        <Label check className="form-check-label" htmlFor="radio3">Option 3</Label>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Inline Radios</Label>
                    </Col>
                    <Col md="9">
                      <FormGroup check inline>
                        <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="option1" />
                        <Label className="form-check-label" check htmlFor="inline-radio1">One</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input className="form-check-input" type="radio" id="inline-radio2" name="inline-radios" value="option2" />
                        <Label className="form-check-label" check htmlFor="inline-radio2">Two</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input className="form-check-input" type="radio" id="inline-radio3" name="inline-radios" value="option3" />
                        <Label className="form-check-label" check htmlFor="inline-radio3">Three</Label>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3"><Label>Checkboxes</Label></Col>
                    <Col md="9">
                      <FormGroup check className="checkbox">
                        <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value="option1" />
                        <Label check className="form-check-label" htmlFor="checkbox1">Option 1</Label>
                      </FormGroup>
                      <FormGroup check className="checkbox">
                        <Input className="form-check-input" type="checkbox" id="checkbox2" name="checkbox2" value="option2" />
                        <Label check className="form-check-label" htmlFor="checkbox2">Option 2</Label>
                      </FormGroup>
                      <FormGroup check className="checkbox">
                        <Input className="form-check-input" type="checkbox" id="checkbox3" name="checkbox3" value="option3" />
                        <Label check className="form-check-label" htmlFor="checkbox3">Option 3</Label>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Inline Checkboxes</Label>
                    </Col>
                    <Col md="9">
                      <FormGroup check inline>
                        <Input className="form-check-input" type="checkbox" id="inline-checkbox1" name="inline-checkbox1" value="option1" />
                        <Label className="form-check-label" check htmlFor="inline-checkbox1">One</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input className="form-check-input" type="checkbox" id="inline-checkbox2" name="inline-checkbox2" value="option2" />
                        <Label className="form-check-label" check htmlFor="inline-checkbox2">Two</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input className="form-check-input" type="checkbox" id="inline-checkbox3" name="inline-checkbox3" value="option3" />
                        <Label className="form-check-label" check htmlFor="inline-checkbox3">Three</Label>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file-input">File input</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="file" id="file-input" name="file-input" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file-multiple-input">Multiple File input</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="file" id="file-multiple-input" name="file-multiple-input" multiple />
                    </Col>
                  </FormGroup>
                  <FormGroup row hidden>
                    <Col md="3">
                      <Label className="custom-file" htmlFor="custom-file-input">Custom file input</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Label className="custom-file">
                        <Input className="custom-file" type="file" id="custom-file-input" name="file-input" />
                        <span className="custom-file-control"></span>
                      </Label>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
       
          </Col>
        
          
        </Row>
       
       
        </Form>
  
      </div>
    );
  }
}

export default UserForm;
