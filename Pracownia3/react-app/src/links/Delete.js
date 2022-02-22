import React, { Component, useState } from 'react';
import axios from 'axios';
import {ACCESS_TOKEN, API_BASE_URL} from "../constants/constants";

export default function () {

  const [state, setState] = useState({
    id: ""
  });

  const headers = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}

  const handleChange = (e) => {
      const value = e.target.value;
      setState({
        ...state,
        [e.target.name]: value
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
        const id = {
          id: state.id
        };

      axios.delete("http://localhost:8080/api/clients/{id}?id=" + id.id, {headers}).then(response => {
          console.log(response);
        })
        .catch(erro => {
          console.log(erro.response);
          console.log("http://localhost:8080/api/clients/{id}?id=" + id.id)
        });

      };

return (
<div className="appMain">
  <form onSubmit={handleSubmit}>
    <label>
      Client id:
      <input type="number" name="id" value={state.id} onChange={handleChange} />
    </label>
    <button className="buttonDelete" type="submit">Delete</button>
  </form>
</div>
)
}
