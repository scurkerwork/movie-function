import React, { useState, useEffect } from "react";
import Edit from "../../components/movies/Edit";
import axios from "axios";
import Toastify from "toastify-js";
import { useNavigate } from "react-router-dom";
import { Actor, ActorItem, Movie } from "../../types";

const  MovieDetail = () => {
  const API_URL = process.env.REACT_APP_BACKEND;
  const url = window.location.pathname;
  const parts = url.split("/");
  const movie_id = parts[parts.length - 1];
  const [movie, setMovie] = useState<Movie>();
  const [actors, setActors] = useState<ActorItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/Movies/` + movie_id);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [movie_id, API_URL]);

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

  const onSubmit = async (updatedMovie: Movie) => {
    const token = process.env.REACT_APP_API_TOKEN;
    try {
      const authToken = `Bearer ${token}`;
      const response = await axios.put(
        `${API_URL}/api/Movies/` + movie_id,
        updatedMovie,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      setMovie(response.data);
      if (response.data) {
        Toastify({
          text: "Updated a movie successfully.",
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
        text: "An error occurred while updating a movie.",
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
    movie ? (
      <div className="container">
        <h2 className="mt-3">Movie #{movie.id}</h2>
        <div className="row">
          <div className="col-md-8 offset-lg-2 offset-md-2 offset-sm-2 col-sm-8 col-xs-12">
            <Edit movie={movie} onSubmit={onSubmit} actors={actors} />
          </div>
        </div>
      </div>
    ) : <></>
  );
};
export default MovieDetail;
