import React, { useState } from "react";
import axios from 'axios';
import {ACCESS_TOKEN, API_BASE_URL} from "../constants/constants";

const Post = () =>{
      
        
            const [state, setState] = useState({
              name: "",
              surname: "",
              age: "",
              date: new Date(),
              street: "",
              number: "",
              city: "",
              phone: ""

            });

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
                  orders:[{
                  date: state.date}],
                  address: {
                  street: state.street,
                  number: state.number,
                  city: state.city},
                  phone:{
                      phone:state.phone
                  }
                };
                const headers = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}
                axios.post("http://localhost:8080/api/clients", userData, {headers}).then(response => {
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
                Client name:
                <input type="text" name="name" value={state.name} onChange={handleChange} />
              </label>
              <label>
                Client surname:
                <input type="text" name="surname" value={state.surname} onChange={handleChange} />
              </label>
              <label>
                Client age:
                <input type="text" name="age" value={state.age} onChange={handleChange} />
              </label>
              <label>
                Client street:
                <input type="text" name="street" value={state.street} onChange={handleChange} />
              </label>
              <label>
                Client number:
                <input type="text" name="number" value={state.number} onChange={handleChange} />
              </label>
              <label>
                Client city:
                <input type="text" name="city" value={state.city} onChange={handleChange} />
              </label>
              <label>
                Client phone:
                <input type="text" name="phone" value={state.phone} onChange={handleChange} />
              </label>
              <button className="buttonAdd" type="submit">Add</button>
            </form>
          </div>
        )
      }
    
export default Post;