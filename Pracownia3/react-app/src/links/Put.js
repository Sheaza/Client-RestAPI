import React, { useState } from "react";
import axios from 'axios';
import {ACCESS_TOKEN, API_BASE_URL} from "../constants/constants";

export default function () {
      
        
            const [state, setState] = useState({
              name: "",
              surname: "",
              age: "",
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
                  const userData = {
                  name: state.name,
                  surname: state.surname,
                  age: state.age,
                  id: state.id
                  };
                axios.put("http://localhost:8080/api/clients", userData, {headers}).then(response => {
                    console.log(response);
                  })
                  .catch(erro => {
                    console.log(erro.response);
                  });

      };

        return (
          <div className="appMain">
            <form onSubmit={handleSubmit}>
              <label>
                Client id:
                <input type="number" name="id" value={state.id} onChange={handleChange} />
              </label>
              <label>
                Client name:
                <input type="text" name="name" value={state.name} onChange={handleChange} />
              </label>
              <label>
                Client surname:
                <input type="text" name="surname" value={state.surname} onChange={handleChange} />
              </label>
              <label>
                Client age:
                <input type="number" name="age" value={state.age} onChange={handleChange} />
              </label>
              <button className="buttonEdit" type="submit">Edit</button>
            </form>
          </div>
        )
      }
    
