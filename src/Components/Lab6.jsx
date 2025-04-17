//npm install axios

import React from 'react'
import axios from "axios"
import { useState } from "react";
import './Lab6.css';
// call the open API and display the resule in the Table

const Lab6 = () => {
 
  const [result, setResult] = useState("nothing");

  if (result == "nothing")
    axios.get("https://reqres.in/api/users", {}).then((res) => {
      setResult(res.data.data);
      console.log(result)
    })

  else
    return (
      <div>
       User List<br />
      
        <table border={1}>
          <tr style={{ textAlign: 'center', fontWeight: 'bold',backgroundColor:"yellow" }}>
            <td>ID</td>
            <td>Email</td>
            <td>First Name</td>
            <td>Last Name Name</td>
            <td>Photo</td>
            <td>Action</td>
          </tr>

          {result.map((element, index) => {
            return (
              <tr>
                <td>{element.id}</td>
                <td>{element.email}</td>
                <td>{element.first_name}</td>
                <td>{element.last_name}</td>
                <td><img src={element.avatar} width={70} height={70} /></td>
                <td>Edit</td>
              </tr>
            )

          })}
        </table>
      </div>
    )

}

export default Lab6
