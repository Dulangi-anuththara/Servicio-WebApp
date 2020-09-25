import React, { Component } from 'react';
import firebase from "firebase"
import {VictoryBar, VictoryChart, VictoryPie, VictoryTheme, VictoryAxis } from 'victory';
import axios from 'axios';


// const ServiceReg = props => (
//   <tr>
//       <td>{props.user_type}</td>
//   </tr>
// )

class Reports extends Component {

    constructor(props){
        super(props);
        this.state={
      
          user_type: '',
          res:'',
          yasa: 'null',
          garcount: '',
          serTypes: ["service", "garage"],
          serTypeCount: [],
          sercount:''
        }

   }

   componentDidMount(){
    // const url = "";

    axios.get('http://localhost:5000/admin/countTotalSerType')
            .then(response => {
                this.setState({
                    resBody: response.data.serTypeCount
                })

                let j=1;
                for (let i=0; i<2; i++){
                    this.state.serTypeCount[j] = this.state.resBody[i];
                    j++;
                }

                console.log("The total services according to type : ", this.state.serTypeCount)

                this.setState({
                    serTypeCount : this.state.serTypeCount
                })
            })

  
          if(!firebase.apps.length){

            firebase.initializeApp({
              apiKey: 'AIzaSyC1I4w3OUaDmITrLrA0TDfhicVwVWDnJrk',
              authDomain: 'servicio-11f11.firebaseapp.com',
              projectId: 'servicio-11f11'
            });
          }
    
    var db = firebase.firestore();

   
    db.collection(`users`)
      .get()
      .then( Documents => {
        // console.log(Documents.docs.length)
        const data = Documents.docs.map( d => d.data());
        const serdata = Documents.docs.filter( s => s.data().user_type==='service');
        this.setState({sercount: serdata.length});

        const gardata = Documents.docs.filter( g => g.data().user_type==='garage');
        this.setState({garcount: gardata.length});
        
        
        this.setState({ yasa: data });
        
        //console.log(data)
      })
}



   










  render() {
    return (
      <div className="animated fadeIn">
      
            
      <h3 style= {{paddingLeft:15}}> Total users upto date </h3>
                                <VictoryPie 
                                    radius = {30}
                                    colorScale = {["orange", "gold"]}
                                    innerRadius = {15}
                                    outerRadius = {30}
                                    height = {100}
                                    data = {[
                                        {x: "Services\n"+this.state.sercount, y:this.state.sercount},
                                        {x: "Garages\n"+this.state.garcount, y:this.state.garcount}
                                    ]}
                                    style={{ labels: { fontSize: 7}}}
                                />  

        <h3 style= {{paddingLeft:15}}>Total number of CARCARE Centers based on type</h3>
                                <VictoryChart 
                                    maxDomain ={{y:20}}
                                    height = {125}
                                    width = {330}
                                    theme={VictoryTheme.material}
                                    padding={{ top: 10, bottom: 30, left: 80, right: 100 }}
                                    domainPadding={{x:8}}
                                    >

                                    <VictoryAxis dependentAxis
                                        style = {{ tickLabels: {fontSize: 6}}}
                                    />

                                    <VictoryAxis crossAxis
                                        style = {{ tickLabels : {fontSize: 6}}}
                                    />
                                        
                                    <VictoryBar
                                        alignment="middle"
                                        style = {{ data : {fill: "#c43a31"}}}
                                        cornerRadius={{topLeft: 5}}
                                        data={this.state.serTypeCount[0]}
                                        categories={{ x: this.state.serTypes }}
                                    />
                                </VictoryChart>   
        

       
      </div>

    );
  }
}

export default Reports;