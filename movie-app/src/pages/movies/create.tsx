import React, { useEffect, useState } from "react";
import Create from "../../components/movies/Create";
import axios from "axios";
import Toastify from "toastify-js";
import { useNavigate } from "react-router-dom";
import { Actor, ActorItem, Movie } from "../../types";

const MovieCreate = () => {
  const API_URL = process.env.REACT_APP_BACKEND;
  const [actors, setActors] = useState<ActorItem[]>([]);
  const navigate = useNavigate();

  const onSubmit = async (createdMovie: Movie) => {
    const token = process.env.REACT_APP_API_TOKEN;
    try {
      const authToken = `Bearer ${token}`;
      const response = await axios.post(`${API_URL}/api/Movies`, createdMovie, {
        headers: {
          Authorization: authToken,
        },
      });
      if (response.data) {
        Toastify({
          text: "Created a movie successfully.",
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
          navigate("/movies");
        }, 500);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      Toastify({
        text: "An error occurred while creating a movie.",
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/Actors`);
        const datas = response.data.map((item: Actor, index: number) => {
          return { label: item.name, value: item.id };
        });
        setActors(datas);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [API_URL]);

  return (
    <div className="container">
      <h2 className="mt-3">Movie #</h2>
      <div className="row">
        <div className="col-md-8 offset-lg-2 offset-md-2 offset-sm-2 col-sm-8 col-xs-12">
          <Create onSubmit={onSubmit} actors={actors} />
        </div>
      </div>
    </div>
  );
};
export default MovieCreate;
