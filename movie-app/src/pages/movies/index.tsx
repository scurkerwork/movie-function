// index.js
import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import DataTable from "react-data-table-component";
import { FaTrashAlt, FaEdit, FaArrowUp } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { useNavigate } from "react-router-dom";
import { Actor, ActorItem, MovieWithActors } from "../../types";

const Movie = () => {
  const API_URL = process.env.REACT_APP_BACKEND;
  const token = process.env.REACT_APP_API_TOKEN;
  const [movies, setMovies] = useState<MovieWithActors[]>([]);
  const [fullMovies, setFullMovies] = useState<MovieWithActors[]>([]);
  const [actors, setActors] = useState<ActorItem[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();

  const joinStringArray = (arr: string[]) => {
    if (arr.length <= 3) {
      // Join all elements if array length is less than or equal to 3
      return arr.join(", ");
    } else {
      // Join first 3 elements and add "..." suffix
      return arr.slice(0, 3).join(", ") + ", ...";
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

  const handleChangeSearchText = (e: any) => {
    setSearchText(e.target.value);
    setMovies(
      fullMovies.filter((movie: MovieWithActors) =>
        movie.movie.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const deleteMovie = useCallback(
    async (e: any, id: number) => {
      e.preventDefault();
      const fetchData = async () => {
        try {
          const authToken = `Bearer ${token}`;
          const response = await axios.delete(API_URL + "/api/Movies/" + id, {
            headers: {
              Authorization: authToken,
            },
          });
          if (response.status === 204) {
            const data = movies.filter(
              (movie: MovieWithActors) => movie.movie.id !== id
            );
            setMovies(data);
            setFullMovies(
              fullMovies.filter(
                (movie: MovieWithActors) => movie.movie.id !== id
              )
            );
            Toastify({
              text: "Deleted a movie successfully.",
              duration: 3000,
              gravity: "top",
              position: "right",
              stopOnFocus: true,
              style: {
                background: "#00880088",
                minWidth: "300px",
              },
              offset: {
                x: 10,
                y: 10,
              },
            }).showToast();
          } else {
            Toastify({
              text: "An error occurred while deleting a movie.",
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
          return response;
        } catch (error) {
          console.error("Error fetching data:", error);
          Toastify({
            text: "An error occurred while deleting a movie.",
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
          return null;
        }
      };
      await fetchData();
    },
    [API_URL, movies, token, fullMovies]
  );

  const handleRating = useCallback(
    async (rate: number, id: number) => {
      const data = {
        movieId: id,
        rating: rate,
      };
      const isExistRating = Boolean(
        movies.filter(
          (item: MovieWithActors) =>
            item.movie.id === id && item.rating !== null
        ).length
      );
      const ratingId = isExistRating
        ? movies.filter(
            (item: MovieWithActors) =>
              item.movie.id === id && item.rating !== null
          )[0].rating.id
        : null;
      try {
        const token = process.env.REACT_APP_API_TOKEN;
        const authToken = `Bearer ${token}`;
        const response = isExistRating
          ? await axios.put(`${API_URL}/api/MovieRatings/` + ratingId, data, {
              headers: {
                Authorization: authToken,
              },
            })
          : await axios.post(`${API_URL}/api/MovieRatings`, data, {
              headers: {
                Authorization: authToken,
              },
            });
        if (response.data) {
          Toastify({
            text: "Updated rate for this movie",
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
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        Toastify({
          text: "An error occurred while updating a rate.",
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
    },
    [API_URL, movies]
  );

  const columns = useMemo(
    () => [
      {
        name: "ID",
        selector: (row: MovieWithActors) => row._key!,
        sortable: true,
        cell: (d: MovieWithActors) => d._key,
        width: "80px",
      },
      {
        name: "Title",
        selector: (row: MovieWithActors) => row.movie.title!,
        sortable: true,
      },
      {
        name: "Actors",
        selector: (row: MovieWithActors) => row.movie.actors!,
        sortable: true,
        width: "200px",
        cell: (d: MovieWithActors) => (
          <span
            style={{ minWidth: "200px" }}
            title={actors
              .filter((actor: ActorItem) =>
                d.movie.actors.split(",").includes(actor.value.toString())
              )
              .map((_: any) => _.label)
              .join(", ")}
          >
            {joinStringArray(
              actors
                .filter((actor: ActorItem) =>
                  d.movie.actors.split(",").includes(actor.value.toString())
                )
                .map((_: any) => _.label)
            )}
          </span>
        ),
      },
      {
        name: "Rating",
        selector: (row: MovieWithActors) => row.movie.id!,
        sortable: true,
        width: "200px",
        cell: (d: MovieWithActors) => (
          <Rating
            onClick={(e: any) => handleRating(e, d.movie.id)}
            initialValue={d.rating?.rating}
            size={20}
          />
        ),
      },
      {
        name: "ACTIONS",
        sortable: false,
        selector: (row: MovieWithActors) => row._key!,
        cell: (d: MovieWithActors) => (
          <>
            <a
              key={`${d.movie.id}_1`}
              href={`/movies/${d.movie.id}`}
              className="btn btn-flex mr-3"
              title="edit"
            >
              <FaEdit />
            </a>
            <a
              key={`${d.movie.id}_2`}
              href={`/movies/${d.movie.id}`}
              className="btn btn-flex"
              title="delete"
              onClick={(e: any) => deleteMovie(e, d.movie.id)}
            >
              <FaTrashAlt />
            </a>
          </>
        ),
      },
    ],
    [deleteMovie, handleRating, actors]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/Movies`);
        const datas = response.data.map(
          (item: MovieWithActors, index: number) => {
            const key = `${index + 1}`;
            // Add the key field to the object
            return { ...item, _key: key };
          }
        );
        setMovies(datas);
        setFullMovies(datas);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [API_URL]);

  const createMovie = () => {
    navigate("/movies/create");
  };

  return (
    <>
      <div className="container">
        <h2 className="mt-3">Movie List</h2>
        <div className="searchBox mb-3 mt-3">
          <input
            type="text"
            value={searchText}
            placeholder="Search ..."
            onChange={(e: any) => handleChangeSearchText(e)}
            className="filterText"
          />
          <Button
            variant="primary"
            type="button"
            onClick={createMovie}
            className="ml-auto btn-create"
          >
            New Movie
          </Button>
        </div>
        <div>
          {movies && columns && (
            <DataTable
              columns={columns}
              data={movies}
              noHeader
              sortIcon={
                <span className="float-right">
                  &nbsp;
                  <FaArrowUp size={16} />
                </span>
              }
              defaultSortAsc={true}
              pagination
              highlightOnHover
              dense
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Movie;
