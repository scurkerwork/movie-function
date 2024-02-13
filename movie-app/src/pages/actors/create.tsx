import React from "react";
import Create from "../../components/actors/Create";
import axios from "axios";
import Toastify from "toastify-js";
import { useNavigate } from "react-router-dom";
import { Actor } from "../../types";

const ActorCreate = () => {
  const API_URL = process.env.REACT_APP_BACKEND;
  const navigate = useNavigate();
  const onSubmit = async (createdMovie: Actor) => {
    const token = process.env.REACT_APP_API_TOKEN;
    try {
      const authToken = `Bearer ${token}`;
      const response = await axios.post(
        `${API_URL}/api/Actors`,
        createdMovie,
        {
          headers: {
            'Authorization': authToken
          },
        }
      );
      if (response.data) {
        Toastify({
          text: "Created the actor successfully.",
          duration: 3000,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "#00880088",
          },
          offset: {
            x: 10,
            y: 10,
          },
        }).showToast();
        setTimeout(() => {
          navigate("/actors");
        }, 500);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      Toastify({
        text: "An error occurred while creating the actor.",
        duration: 3000,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#ff000088",
          minWidth: "300px",
        },
        offset: {
          x: 10,
          y: 10,
        },
      }).showToast();
    }
  };

  return (
    <div className="container">
      <h2 className="mt-3">Actor #</h2>
      <div className="row">
        <div className="col-md-8 offset-lg-2 offset-md-2 offset-sm-2 col-sm-8 col-xs-12">
          <Create onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};
export default ActorCreate;
