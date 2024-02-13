import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { MultiSelect } from "react-multi-select-component";
import Toastify from "toastify-js";
import { useNavigate } from "react-router-dom";
import { ActorItem, Movie } from "../../types";

const Edit = ({ movie, onSubmit, actors }: { movie: Movie, onSubmit: Function, actors: ActorItem[] }) => {
  const [title, setTitle] = useState<string>(movie.title);
  const [selected, setSelected] = useState<ActorItem[]>([]);
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (title === "") {
      Toastify({
        text: "Please enter the movie's title.",
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
      document.getElementById("title")?.focus();
      return;
    }
    if (selected.length === 0) {
      Toastify({
        text: "Please select the actors.",
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
      return;
    }
    const actors = selected.map((_: any) => _.value).join(",");
    // Prepare the updated movie object
    const updatedMovie = {
      id: movie.id, // Assuming movie object has an 'id' property
      title,
      actors,
    };
    // Call onSubmit callback with the updated movie data
    onSubmit(updatedMovie);
  };

  useEffect(() => {
    setSelected(
      actors.filter((actor: ActorItem) =>
        movie.actors.split(",").includes(actor.value.toString())
      )
    );
  }, [actors, movie.actors]);

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e: any) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="actors">
        <Form.Label>Actors</Form.Label>
        <MultiSelect
          options={actors}
          value={selected}
          onChange={setSelected}
          labelledBy="Select"
          hasSelectAll={false}
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-2">
        Save Changes
      </Button>
      <Button
        variant="danger"
        type="button"
        className="mt-2"
        onClick={() => navigate("/movies")}
      >
        Cancel
      </Button>
    </Form>
  );
};

export default Edit;
