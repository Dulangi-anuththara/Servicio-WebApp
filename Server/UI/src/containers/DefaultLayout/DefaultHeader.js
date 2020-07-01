import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, form, Form } from 'reactstrap';
import PropTypes from 'prop-types';
import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'
import Axios from 'axios';
//import { response } from 'express';
import socketIOClient from "socket.io-client";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid} from '@material-ui/core'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

const ENDPOINT = "http://127.0.0.1:5000";

class DefaultHeader extends Component {
  constructor(){
    super()

    this.state={
      data:['dd'],
      notifications:'',
      open : false,
      booking :{} 
    }
    this.handleNotifications = this.handleNotifications.bind(this);
    this.handleAppointment = this.handleAppointment.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount(){
    
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", response => {
      this.setState(
        {        
           notifications:response
        });
      
    });
  }

  handleClose(){
    this.setState({
      open:false
    })
  }

  handleAppointment(e){
     //console.log(this.state.data[e]);
     this.setState({
       open:true,
       booking:this.state.data[e]
     },() => console.log(this.state.booking));
     
  }

  handleAvailability(e){
      console.log(e.target.name);
      console.log("Checking availabilty");
  }

  handleNotifications(){
    //console.log("Clicked Notifications");
    const url= 'http://localhost:5000/bookings';
    Axios.get(url).then(res => {
        //console.log(res.data);
        this.setState({
        data:res.data
      })
     
    })
    
  }
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    
  
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
        
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/users" className="nav-link">Users</Link>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="#" className="nav-link">Settings</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>

                                    <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                                    <DialogTitle id="form-dialog-title">New Reservation</DialogTitle>
                                    <Form onSubmit={this.handleAvailability}>
                                    <DialogContent>
                                      <Grid  spacing={3}>                                      
                                      <TextField  style={{marginRight:30}} id="outlined-basic" label="Outlined" variant="outlined" label="Customer" value={this.state.booking.CustName} name="cust" />
                                      <TextField
                                          name="date"
                                          id="date"
                                          label="Date and Time"
                                          variant="outlined"
                                          type="date"                                        
                                          InputLabelProps={{
                                            shrink: true,
                                          }}
                                        />
                                        <TextField
                                          style={{marginTop:30, marginRight:30}}
                                          id="Stime"
                                          name="Stime"
                                          label="Start Time"
                                          type="time"
                                          defaultValue="07:30"
                                          variant="outlined"
                                          InputLabelProps={{
                                            shrink: true,
                                          }}
                                        />
                                        <TextField
                                          style={{marginTop:30, marginRight:30}}
                                          id="Etime"
                                          name="Etime"
                                          label="End Time"
                                          type="time"
                                          defaultValue="07:30"
                                          variant="outlined"
                                          InputLabelProps={{
                                            shrink: true,
                                          }}
                                        />
                                  
                                      <TextField
                                        style={{marginTop:30}}
                                        margin="dense"
                                        variant="outlined"
                                        id="service"
                                        name="service"
                                        label="Email Address"
                                        type="text"
                                        value={this.state.booking.ServiceType}
                                        fullWidth
                                      />
                                      
                                      </Grid>
                                    </DialogContent>
                                    <DialogActions>
                                    <Button variant="contained" color="secondary" onClick={this.handleClose}>
                                        Decline
                                      </Button> 
                                      <Button type="submit" variant="contained" color="primary">
                                          Check Availability
                                       </Button>
                                    </DialogActions>
                                    </Form>
                                  </Dialog>
        <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav onClick={this.handleNotifications}>
            <i className="icon-bell"></i><Badge pill color="danger">{this.state.notifications}</Badge>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>Appointments</strong></DropdownItem>
              {this.state.data.map( (item,index) =>
                <DropdownItem key={item.key} onClick={() =>this.handleAppointment(index)}><i className="fa fa-tasks"></i><a href="">{item.CustName}</a> request for {item.ServiceType}</DropdownItem>
              )}
              
            </DropdownMenu>
          </UncontrolledDropdown>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-list"></i></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-location-pin"></i></NavLink>
          </NavItem>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={'../../assets/img/avatars/8.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              <DropdownItem><i className="fa fa-bell-o"></i> Requests<Badge color="info">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
              <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
              <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
              <DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem>
              <DropdownItem divider />
              <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <AppAsideToggler className="d-md-down-none" />
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
