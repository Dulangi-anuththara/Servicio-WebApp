import React, { Component } from 'react'
import face from "../../assets/images/man.jpg"

export default class CustomerView extends Component {
    render() {
        return (
            <div>


                  {/* client profile picture container */}
                  <div className="col-lg-3">                                
                                <div className="card card-primary card-outline">
                                    <div className="card-body box-profile">
                                        <div className="text-center">
                                            {/* Profile Image */}
                                            <img className="profile-user-img img-fluid img-circle" src={face}  alt="User profile pic" />            
                                        </div>
                                        <h3 className="profile-username text-center">Jagath Senadeera</h3>


                                        <ul className="list-group list-group-unbordered mb-3 text-center">
                                            <li className="list-group-item">
                                                <h6 className="text-center">Member since 2019</h6>
                                            </li>

                                            
                                        </ul>
                                    </div>
                                    {/* /.card-body */}
                                </div>

                            </div>

                                   {/* Profile Details Container */}
                                   <div className="card-body">
                                        <div className="tab-content">
                                            <div className="active tab-pane" id="profile">
                                                <div className="timeline timeline-inverse">
                                                    {/* timeline item */}
                                                    <div>
                                                        <div className="timeline-item">
                                                            <h3 className="timeline-header border-0"> <strong>First Name:  </strong>Jagath</h3>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="timeline-item">
                                                            <h3 className="timeline-header border-0"> <strong>Last Name:  </strong>senadeera</h3>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="timeline-item">
                                                            <h3 className="timeline-header border-0"> <strong>Email:  </strong>jagath@gmail.com</h3>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="timeline-item">
                                                            <h3 className="timeline-header border-0"> <strong>Address:  </strong>Malwatta road, Colombo 07</h3>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="timeline-item">
                                                            <h3 className="timeline-header border-0"> <strong>Telephone:  </strong>0777234567</h3>
                                                        </div>
                                                    </div>
                                                    {/* END timeline item */}
                                                </div>
                                                {/* /.tab-pane */}
                                            </div>
                                        </div>
                                        {/* /.tab-content */}
                                    </div>{/* /.card-body */}


                                    <div className="col-lg-3">

                                {/*First Card in Right Side*/}
                                <div className="card card-primary">
                                    <div className="card-body text-center">
                                        <strong>Rate Jagath </strong>
                                        <br />
                                        <div style={{ fontSize: 28 }}>
                                           
                                            <hr />
                                        </div>
                                        <strong><i className="fas fa-map-marker-alt mr-1" /> Location</strong>
                                        <p className="text-muted text-center">Colombo</p>
                                        <hr />

                                        <button class="btn btn-outline-secondary btn-block" ><i className="fa fa-comment mr-2"></i>Leave a Review</button>
                                        

                                        <hr />
                                        
                                    { /** 
                                        * @desc: complaint component.
                                        * @required: Complaint
                                        */ }
                                        <button class="btn btn-secondary btn-block" ><i className="fa fa-exclamation-triangle mr-2"></i>Add a complaint</button>
                                        
                                    { /** 
                                        * END of code for complaint
                                        */  }

                                    { /** 
                                        * @desc: chatting component.
                                        * @required: ChatComponent
                                        */ }
                                        <input type="button" class="btn btn-outline-success btn-block" value="Send Message to Client"  />
                                        <div>
                                          
                                        </div>
                                    { /** 
                                        * END of code for chat
                                        */  }

                                    </div>
                                    {/* /.card-body */}
                                </div>

                                {/* /.card */}
                            </div>
                        </div>
                     
            
        )
    }
}
