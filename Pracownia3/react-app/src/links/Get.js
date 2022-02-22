import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import Table from "rc-table";
import Pagination from './components/Pagination';
import {ACCESS_TOKEN, API_BASE_URL} from "../constants/constants";

const baseURL_client = "http://localhost:8080/api/clients";
const baseURL_order = "http://localhost:8080/api/orders";
const baseURL_item = "http://localhost:8080/api/items";
const baseURL_address = "http://localhost:8080/api/addresses";
const baseURL_phone = "http://localhost:8080/api/phones";


const Get = () => {

    //client
    const [currentPageClient, setCurrentPageClient] = useState(1);
    const [elementsPerPageClient, setElementsPerPageClient] = useState(5);
    
    //order
    const [currentPageOrder, setCurrentPageOrder] = useState(1);
    const [elementsPerPageOrder, setElementsPerPageOrder] = useState(5);

    //item
    const [currentPageItem, setCurrentPageItem] = useState(1);
    const [elementsPerPageItem, setElementsPerPageItem] = useState(5);

    //address
    const [currentPageAdr, setCurrentPageAdr] = useState(1);
    const [elementsPerPageAdr, setElementsPerPageAdr] = useState(5);

    //phone
    const [currentPagePhone, setCurrentPagePhone] = useState(1);
    const [elementsPerPagePhone, setElementsPerPagePhone] = useState(5);


    const columns_client =
[
          {
            title: "Id",
            dataIndex: "id",
            key: "id",
            width: 100,
          },
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: 100,
          },
          {
            title: "Surname",
            dataIndex: "surname",
            key: "surname",
            width: 100,
          },
          {
            title: "Age",
            dataIndex: "age",
            key: "age",
            width: 100,
          },
];
const data_client = []
const columns_order =
[
          {
            title: "Id",
            dataIndex: "id",
            key: "id",
            width: 100,
          },
          {
            title: "Client",
            dataIndex: "client",
            key: "client",
            width: 100,
          },
          {
            title: "Date",
            dataIndex: "date",
            key: "date",
            width: 300,
          }
          
]
const data_order = []
const columns_address =
[
          {
            title: "Id",
            dataIndex: "id",
            key: "id",
            width: 100,
          },
          {
            title: "Client",
            dataIndex: "client",
            key: "client",
            width: 100,
          },
          {
            title: "Street",
            dataIndex: "street",
            key: "street",
            width: 200,
          },
          {
            title: "Number",
            dataIndex: "number",
            key: "number",
            width: 100,
          },
          {
            title: "City",
            dataIndex: "city",
            key: "city",
            width: 100,
          }
]
const data_address = []
const columns_item =
[
          {
            title: "Id",
            dataIndex: "id",
            key: "id",
            width: 100,
          },
          {
            title: "Order",
            dataIndex: "order",
            key: "order",
            width: 100,
          },
          {
            title: "Description",
            dataIndex: "description",
            key: "description",
            width: 500,
          },
          {
            title: "Value",
            dataIndex: "value",
            key: "value",
            width: 100,
          }
]
const data_item = []
const columns_phone =
[
          {
            title: "Id",
            dataIndex: "id",
            key: "id",
            width: 100,
          },
          {
            title: "Client",
            dataIndex: "client",
            key: "client",
            width: 100,
          },
          {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
            width: 200,
          }
]
const data_phone = []

  const [post_client, setPost_client] = React.useState(null);
  const [post_order, setPost_order] = React.useState(null);
  const [post_address, setPost_address] = React.useState(null);
  const [post_item, setPost_item] = React.useState(null);
  const [post_phone, setPost_phone] = React.useState(null);
  const [input, setInput] = React.useState(''); // '' is the initial state value

  const headers = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}

  React.useEffect(() => {
    axios.all([
        axios.get(baseURL_client, {headers}),
        axios.get(baseURL_order, {headers}),
        axios.get(baseURL_address, {headers}),
        axios.get(baseURL_item, {headers}),
        axios.get(baseURL_phone, {headers})
      ])
      .then(axios.spread((response_client,response_order,response_address,response_item,response_phone) => {
        setPost_client(response_client.data);
        setPost_order(response_order.data);
        setPost_address(response_address.data);
        setPost_item(response_item.data);
        setPost_phone(response_phone.data)
        console.log({ response_client: response_client, response_order: response_order, response_address: response_address, response_item: response_item, response_phone: response_phone})
        // use/access the results 
      }))
  }, []);

   if (!post_client) return null;
   post_client.map(post_client =>data_client.push({id:post_client.id, name:post_client.name, surname:post_client.surname, age:post_client.age}))

  if (!post_order) return null;
  post_order.map(post_order =>data_order.push({id:post_order.id, client: post_order.client.id, date:post_order.date}))

  if (!post_address) return null;
  post_address.map(post_address =>data_address.push({id:post_address.id, client: post_address.client.id, street:post_address.street, number:post_address.number, city:post_address.city}))

  if (!post_item) return null
  post_item.map(post_item =>data_item.push({id:post_item.id, order:post_item.order.id, description: post_item.description, value: post_item.value}))

  if (!post_phone) return null
  post_phone.map(post_phone =>data_phone.push({id: post_phone.id, client: post_phone.client.id, phone: post_phone.phone}));

  //client
  const indexOfLastElementClient = currentPageClient * elementsPerPageClient;
  const indexOfFirstElementClient = indexOfLastElementClient - elementsPerPageClient;
  const currentElementsClient = data_client.slice(indexOfFirstElementClient, indexOfLastElementClient);
  const paginate_client = pageNumber => setCurrentPageClient(pageNumber);

  //order
  const indexOfLastElementOrder = currentPageOrder * elementsPerPageOrder;
  const indexOfFirstElementOrder = indexOfLastElementOrder - elementsPerPageOrder;
  const currentElementsOrder = data_order.slice(indexOfFirstElementOrder, indexOfLastElementOrder);
  const paginate_order = pageNumber => setCurrentPageOrder(pageNumber);

  //item
  const indexOfLastElementItem = currentPageItem * elementsPerPageItem;
  const indexOfFirstElementItem = indexOfLastElementItem - elementsPerPageItem;
  const currentElementsItem = data_item.slice(indexOfFirstElementItem, indexOfLastElementItem);
  const paginate_item = pageNumber => setCurrentPageItem(pageNumber);
  
  //address
  const indexOfLastElementAdr = currentPageAdr * elementsPerPageAdr;
  const indexOfFirstElementAdr = indexOfLastElementAdr - elementsPerPageAdr;
  const currentElementsAdr = data_address.slice(indexOfFirstElementAdr, indexOfLastElementAdr);
  const paginate_adr = pageNumber => setCurrentPageAdr(pageNumber);
  
  //phone
  const indexOfLastElementPhone = currentPagePhone * elementsPerPagePhone;
  const indexOfFirstElementPhone = indexOfLastElementPhone - elementsPerPagePhone;
  const currentElementsPhone = data_phone.slice(indexOfFirstElementPhone, indexOfLastElementPhone);
  const paginate_phone = pageNumber => setCurrentPagePhone(pageNumber);

  
  return (
      <div className='appMain'>
      <button className='inputButton'><span className="textButton" onClick = {() => setInput("Table_Client")}>Clients</span></button>
      <button className='inputButton'><span className="textButton" onClick = {() => setInput("Table_Order")}>Orders</span></button>
      <button className='inputButton'><span className="textButton" onClick = {() => setInput("Table_Item")}>Items</span></button>
      <button className='inputButton'><span className="textButton" onClick = {() => setInput("Table_Address")}>addresses</span></button>
      <button className='inputButton'><span className="textButton" onClick = {() => setInput("Table_Phone")}>Phones</span></button>
      <div className='tableContainer'>
      {input == 'Table_Client'?
      [<Table
        columns={columns_client}
        data={currentElementsClient}
        tableLayout="auto"
        rowKey={'Id'}
      />,
      <Pagination postsPerPage={elementsPerPageClient} totalPosts={data_client.length} paginate={paginate_client}/>
      ]: null }
    {input == 'Table_Order'? 
    [<Table
      columns={columns_order}
      data={currentElementsOrder}
      tableLayout="auto"
      rowKey={'Id'}
    />,
    <Pagination postsPerPage={elementsPerPageOrder} totalPosts={data_order.length} paginate={paginate_order}/>
    ]: null }
    {input == 'Table_Item'? 
    [<Table
      columns={columns_item}
      data={currentElementsItem}
      tableLayout="auto"
      rowKey={'Id'}
    />,
    <Pagination postsPerPage={elementsPerPageItem} totalPosts={data_item.length} paginate={paginate_item}/>
    ]: null }
    {input == 'Table_Address'? 
    [<Table
      columns={columns_address}
      data={currentElementsAdr}
      tableLayout="auto"
      rowKey={'Id'}
    />,
    <Pagination postsPerPage={elementsPerPageAdr} totalPosts={data_address.length} paginate={paginate_adr}/>
    ]: null }
    {input == 'Table_Phone'? 
    [<Table
      columns={columns_phone}
      data={currentElementsPhone}
      tableLayout="auto"
      rowKey={'Id'}
    />,
    <Pagination postsPerPage={elementsPerPagePhone} totalPosts={data_phone.length} paginate={paginate_phone}/>
    ]: null }
    
    </div>
    </div>
    
  );

}

export default Get;