import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import Axios from 'axios' ;
import usersData from './UsersData'


// function UserRow(props) {
//   const user = props.user
//   const userLink = `/users/${user.id}`

//   const getBadge = (status) => {
//     return status === 'Active' ? 'success' :
//       status === 'Inactive' ? 'secondary' :
//         status === 'Pending' ? 'warning' :
//           status === 'Banned' ? 'danger' :
//             'primary'
//   }

//   return (
//     <tr key={user.id.toString()}>
//       <th scope="row"><Link to={userLink}>{user.id}</Link></th>
//       <td><Link to={userLink}>{user.name}</Link></td>
//       <td>{user.registered}</td>
//       <td>{user.role}</td>
//       <td><Link to={userLink}><Badge color={getBadge(user.status)}>{user.status}</Badge></Link></td>
//     </tr>
//   )
// }

class Users extends Component {

  constructor(props){
    super(props)
    this.state={
      data:[]
    }
  }

  componentDidMount(){
    const url= `http://localhost:5000/customers/all/${this.props.uid}`;
    Axios.get(url).then(res => {
        this.setState({
        data:res.data
      });
     
    })
  }

  render() {

    

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Users <small className="text-muted">example</small>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Telephone</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                    {this.state.data.map((user, index) =>
                      <tr key={user.user_id} >
                      <td>{user.user_id}</td>
                      <td scope="row"><Link to={`/customer/${user.user_id}`}>{user.name}</Link></td>
                      <td><Link to={'/'}>{user.email}</Link></td>
                      <td>{user.tel_num}</td>
                    </tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Users;
