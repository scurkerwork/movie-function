import React, { useState, useEffect } from "react";
import Edit from "../../components/actors/Edit";
import axios from "axios";
import Toastify from "toastify-js";
import { useNavigate } from "react-router-dom";
import { Actor } from "../../types";

const ActorDetail = () => {
  const API_URL = process.env.REACT_APP_BACKEND;
  const url = window.location.pathname;
  const parts = url.split("/");
  const actor_id = parts[parts.length - 1];
  const [actor, setActor] = useState<Actor>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/Actors/` + actor_id);
        setActor(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [actor_id, API_URL]);

  const onSubmit = async (updatedActor: Actor) => {
    const token = process.env.REACT_APP_API_TOKEN;
    try {
      const authToken = `Bearer ${token}`;
      const response = await axios.put(
        `${API_URL}/api/Actors/` + actor_id,
        updatedActor,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      setActor(response.data);
      if (response.data) {
        Toastify({
          text: "Updated the actor successfully.",
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
        text: "An error occurred while updating the actor.",
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
    actor ? (
      <div className="container">
        <h2 className="mt-3">Actor #{actor.id}</h2>
        <div className="row">
          <div className="col-md-8 offset-lg-2 offset-md-2 offset-sm-2 col-sm-8 col-xs-12">
            <Edit actor={actor} onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    ) : <></>
  );
};
export default ActorDetail;
