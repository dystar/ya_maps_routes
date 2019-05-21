import React, { Component } from "react";
import ReactDOM from "react-dom";

import AddPoint from "./components/AddPoint";
import PointsList from "./components/PointsList";
import Map from "./components/Map";

import "bootstrap/dist/css/bootstrap.min.css";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapDefaults: {
                center: [55.76, 37.64], // Москва
                zoom: 10
            },
            points: []
        };
        this.addNewPoint = this.addNewPoint.bind(this);
        this.deletePoint = this.deletePoint.bind(this);
        this.getMapObj = this.getMapObj.bind(this);
        this.updateCoords = this.updateCoords.bind(this);
        this.getPointsOrder = this.getPointsOrder.bind(this);
    }
    addNewPoint(e) {
        e.preventDefault();
        let pointInput = document.querySelector("#newPointName");
        let pointName = pointInput.value;
        pointInput.value = "";
        let point = {
            name: pointName,
            coords: this.state.mapObj.getCenter()
        };

        this.setState({
            points: [...this.state.points, point]
        })
    }
    deletePoint(e) {
        e.preventDefault();
        var index = e.target.parentNode.dataset.pointnum;
        console.log(e.target.parentNode.dataset.pointnum);
        var points =  this.state.points;
        points.splice(index, 1);
        this.setState({
            points: points
        })
    }
    updateCoords(index, coords) {
        var points =  this.state.points;
        points[index].coords = coords;
        this.setState({
            points: points
        })
    }
    async getMapObj(obj) {
        let map = await obj;
        this.setState({
            mapObj: map
        })
    }
    getPointsOrder(order) {
        var points = order.map(index => this.state.points[index]);
        this.setState({
            points: points
        })
    }
    render() {
        return(
            <div className = "container mt-2">
                <div className = "row">
                    <div className = "col-md-6">
                        <AddPoint addNewPoint = {this.addNewPoint}/>
                        <PointsList points = {this.state.points} deletePoint = {this.deletePoint} getPointsOrder = {this.getPointsOrder}/>
                    </div>
                    <div className="col-md-6">
                        <Map 
                            mapDefaults = {this.state.mapDefaults} 
                            getMapObj = {this.getMapObj} 
                            mapObj = {this.state.mapObj}
                            points = {this.state.points}
                            updateCoords = {this.updateCoords}
                        />
                    </div>
                </div>
            </div>
        )
    }
}


export default Main;

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<Main />, wrapper) : false;