import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Toastify from "toastify-js";
import { useNavigate } from "react-router-dom";

const Create = ({ onSubmit }:{ onSubmit: Function }) => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (name === "") {
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
    // Prepare the created movie object
    const createdActor = {
      name,
    };
    // Call onSubmit callback with the created movie data
    onSubmit(createdActor);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e: any) => setName(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-2">
        Save
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

export default Create;
