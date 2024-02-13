// index.js
import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import DataTable from "react-data-table-component";
import { FaTrashAlt, FaEdit, FaArrowUp } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Actor } from "../../types";

const Actors = () => {
  const API_URL = process.env.REACT_APP_BACKEND;
  const token = process.env.REACT_APP_API_TOKEN;
  const [actors, setActors] = useState<Actor[]>([]);
  const [fullActors, setFullActors] = useState<Actor[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();

  const deleteActor = useCallback(
    async (e: any, id: number) => {
      e.preventDefault();
      const fetchData = async () => {
        try {
          const authToken = `Bearer ${token}`;
          const response = await axios.delete(API_URL + "/api/Actors/" + id, {
            headers: {
              Authorization: authToken,
            },
          });
          if (response.status === 204) {
            const data = actors.filter((actor) => actor.id !== id);
            setActors(data);
            setFullActors(fullActors.filter((actor: Actor) => actor.id !== id));
            Toastify({
              text: "Deleted the actor successfully.",
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
              text: "An error occurred while deleting the actor.",
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
          return null;
        }
      };
      await fetchData();
    },
    [API_URL, actors, token, fullActors]
  );

  const columns = useMemo(
    () => [
      {
        name: "ID",
        selector: (row: Actor) => row._key!,
        sortable: true,
        cell: (d: Actor) => d._key!,
      },
      {
        name: "Name",
        selector: (row: Actor) => row.name!,
        sortable: true,
      },
      {
        name: "ACTIONS",
        sortable: false,
        selector: (row: Actor) => row.id,
        cell: (d: Actor) => [
          <a
            key={`${d.id}_1`}
            href={`/actors/${d.id}`}
            className="btn btn-flex mr-3"
            title="edit"
          >
            <FaEdit />
          </a>,
          <a
            key={`${d.id}_2`}
            href={`/actors/${d.id}`}
            className="btn btn-flex"
            title="delete"
            onClick={(e: any) => deleteActor(e, d.id)}
          >
            <FaTrashAlt />
          </a>,
        ],
      },
    ],
    [deleteActor]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/Actors`);
        const datas = response.data.map((item: Actor, index: number) => {
          const key = `${index + 1}`;
          // Add the key field to the object
          return { ...item, _key: key };
        });
        setActors(datas);
        setFullActors(datas);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [API_URL]);

  const createActor = () => {
    navigate("/actors/create");
  };

  const handleChangeSearchText = (e: any) => {
    setSearchText(e.target.value);
    e.target.value !== ""
      ? setActors(
          fullActors.filter((actor: Actor) =>
            actor.name.toLowerCase().includes(e.target.value.toLowerCase())
          )
        )
      : setActors(fullActors);
  };

  return (
    <>
      <div className="container">
        <h2 className="mt-3">Actor List</h2>

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
            onClick={createActor}
            className="ml-auto btn-create"
          >
            New Actor
          </Button>
        </div>
        <div>
          {actors && columns && (
            <DataTable
              columns={columns}
              data={actors}
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

export default Actors;
