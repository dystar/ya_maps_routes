import React from "react";
import Sortable from "react-sortablejs";

const PointsList = (props) => {
    const list = props.points.map((point, index) => {
    var style = {cursor: "pointer", listStyleType: "none", border: "1px", borderStyle: "solid", borderColor: "#ccc", padding: "10px"};
        return(        
            <li style={style} key={index} data-pointnum={index} data-id={index} className="mt-2">
                {point.name}
                <button className="btn btn-light btn-sm float-right" onClick={ (e) => props.deletePoint(e) }>x</button>
            </li>
        )
    })

    return(
        //<ul className="list-unstyled">
            <Sortable
            //tag="ul" // Defaults to "div"
            onChange={(order, sortable, evt) => {
                props.getPointsOrder(order);
            }}
        >
            {list}
        </Sortable>
        //</ul>
    )
}

export default PointsList;