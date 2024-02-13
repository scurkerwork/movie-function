import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Toastify from 'toastify-js';
import { useNavigate } from "react-router-dom";
import { Actor } from "../../types";

const Edit = ({ actor, onSubmit } : { actor: Actor, onSubmit: Function }) => {
    const [name, setTitle] = useState(actor.name);
    const navigate = useNavigate();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if(name === ""){
            Toastify({
              text: "Please enter the actor's name.",
              duration: 3000,
              gravity: "top",
              position: "right",
              stopOnFocus: true,
              style: {
                background: "#ff000088",
              },
              offset: {
                x: 10,
                y: 10,
              },
            }).showToast();
            document.getElementById("name")?.focus();
            return;
        }
        // Prepare the updated actor object
        const updatedActor = {
            id: actor.id, // Assuming actor object has an 'id' property
            name
        };
        // Call onSubmit callback with the updated actor data
        onSubmit(updatedActor);
    };

    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e: any) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2">
          Save Changes
        </Button>
        <Button
          variant="danger"
          type="button"
          className="mt-2"
          onClick={() => navigate("/actors")}
        >
          Cancel
        </Button>
      </Form>
    );
};

export default Edit;
