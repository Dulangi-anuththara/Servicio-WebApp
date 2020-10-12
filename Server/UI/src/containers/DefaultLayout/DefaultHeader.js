import React, { Component } from 'react';
//import { Link, NavLink, Redirect } from 'react-router-dom';
import { BrowswerRouter as Router,Route,Link, NavLink, Redirect } from 'react-router-dom'
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, form, Form } from 'reactstrap';
import PropTypes from 'prop-types';
import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/images/logo.jpg'
import sygnet from '../../assets/img/brand/sygnet.svg'
import Axios from 'axios';
//import { response } from 'express';
import socketIOClient from "socket.io-client";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid} from '@material-ui/core'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};



class DefaultHeader extends Component {
  constructor(props){
    super()

    this.state={
      data:['dd'],
      notifications:'',
      open : false,
      booking :{},
      Image:""
    }
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);

    //handle notifications
    const url= `http://localhost:5000/bookings/${props.uid}`;
    Axios.get(url).then(res => {
        this.setState({
        data:res.data
      });
     
    })
  
    const path = `http://localhost:5000/dashboard/image/${props.uid}`;
    Axios.get(path)
    .then(response=>{
      console.log(response.data)
      this.setState({
        Image:response.data
      })
    }) 

  }

  componentDidMount(){

    const ENDPOINT = `http://127.0.0.1:5000?key=${this.props.uid}`;
    console.log(this.props.uid)
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
     },()=> console.log(this.state.booking));
       //console.log(this.state.booking.Date.slice(0,16))});
     
  
  }
 

 /* handleNotifications(){
    const url= 'http://localhost:5000/bookings';
    Axios.get(url).then(res => {
        
        res.data.forEach(element => {
          element.Date = element.Date.slice(0,16);
          element.EndDate = element.EndDate.slice(0,16);
        });
        this.setState({
        data:res.data
      });
     
    })
    
  }
*/
  handleChange(e){

    const { booking } = { ...this.state};
    const currentState = booking;
    const { name, value} = e.target;
    currentState[name] =value;

    this.setState({
      booking:currentState
    });

    console.log(this.state.booking);
   
  }

  checkAvailability(e){
    //console.log("here");
    //this.props.history.push('/profile');
  }
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    
  
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 150, height: 55, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
        
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/users" className="nav-link">Customers</Link>
          </NavItem>

        </Nav>
        <Nav className="ml-auto" navbar>
        <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
            <i className="icon-bell"></i><Badge pill color="danger">{this.state.notifications}</Badge>
            </DropdownToggle>
            <DropdownMenu right>
              
              {this.state.data.map( (item,index) =>
                
                <DropdownItem key={index} onClick={e => this.props.goToRequests(index)}><i className="fa fa-tasks"></i><a href="">{item.CustName}</a> request for {item.ServiceType}</DropdownItem>
                
              )}
              
            </DropdownMenu>
          </UncontrolledDropdown>
        {/*  
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-list"></i></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-location-pin"></i></NavLink>
        </NavItem>*/}
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={this.state.Image} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
              <DropdownItem onClick={e => this.props.goToRequests(e)}><i className="fa fa-bell-o"></i> Requests<Badge color="info">42</Badge></DropdownItem>
              <DropdownItem onClick={e => this.props.goToProfile(e)}><i className="fa fa-user"></i> Profile</DropdownItem>
              <DropdownItem onClick={e => this.props.goUpdate(e)}><i className="fa fa-wrench"></i> Settings</DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
       {/* <AppAsideToggler className="d-md-down-none" />
        <AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
