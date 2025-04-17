// npm install @mui/material @emotion/react @emotion/styled
// npm install @mui/icons-material
import React from 'react'

import './Lab5.css';
import ResponsiveAppBar from './AppBar.jsx';

export default function Lab5() {
  function Mover() {
    document.getElementById("login").className = 'Mover-Login'

  }
  function Mleave() {
    document.getElementById("login").className = 'login-form'

  }
  return (
    <div className='parent1'>

      <center>
        <ResponsiveAppBar />
        <h1>
        Idhi Admin Dashboard Kadhaaa?</h1>
        <div className='login-form' onMouseOver={Mover} onMouseLeave={Mleave} id="login">
          <table >
            <tr>
              <td colSpan={2} style={{ backgroundColor: 'yellowgreen' }}> Login Page</td>
            </tr>
            <tr>
              <td>Name:</td>
              <td><input type="text" className='form-control' name="t1" id="un"></input></td>
            </tr>
            <tr>
              <td>Password: </td>
              <td><input type="text" className='form-control' name="t2" id="pwd" /> </td>
            </tr>
            <tr>
              <td>Role: </td>
              <td><select className="form-control" id="sel1">
                <option value={1}>Admin</option>
                <option value={2}>User</option>
              </select></td>
            </tr>
            <tr>
              <td colSpan={2}><button className="btn btn-success" > Login</button></td>
            </tr>
          </table>
        </div>
      </center>
    </div>
  );
}

