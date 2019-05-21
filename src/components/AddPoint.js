import React from "react";
import { Form, Input} from "reactstrap";

const AddPoint = (props) => {
    return(
        <Form onSubmit={ (e) => props.addNewPoint(e) }>
          <Input 
            type="text" 
            name="newPointName" 
            id="newPointName" 
            placeholder="Новая точка маршрута"
          />
        </Form>
    )
}

export default AddPoint;