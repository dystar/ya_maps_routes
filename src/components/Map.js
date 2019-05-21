import React, {Component} from "react";


class Map extends Component {
    constructor(props) {
        super(props);
    }

    createMap (mapDefaults) {
        return new Promise((resolve, reject) => {
            let myMap;
            ymaps.ready(init);
            
            function init () {
                myMap = new ymaps.Map("map", mapDefaults, {
                    searchControlProvider: "yandex#search"
                });
                resolve(myMap);
            }
        });
    }

    componentDidMount() {
        const mapObj = this.createMap(this.props.mapDefaults);
        this.props.getMapObj(mapObj);
    }    

    render() {
        if(this.props.mapObj) {
            console.log("bla");
            this.props.mapObj.geoObjects.removeAll();

            //draw points
            this.props.points.map((point, index) => {
                var placeMark = new ymaps.Placemark(point.coords, {
                    balloonContent: point.name
                }, {
                    preset: "islands#dotIcon",
                    iconColor: "#735184",
                    draggable: true
                });
                var that = this;
                placeMark.events.add("dragend", function (e) {
                    var coords = this.geometry.getCoordinates();
                    that.props.updateCoords(index, coords);
                }, placeMark);

                this.props.mapObj.geoObjects.add(placeMark);
            })

            //draw line between points
            var myPolyline = new ymaps.Polyline(this.props.points.map(point => point.coords));
            this.props.mapObj.geoObjects.add(myPolyline);
        }
        return(
            <div id="map"></div>
        )
    }
}

export default Map;