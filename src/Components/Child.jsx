import { red } from '@mui/material/colors';
import { useState } from 'react';

export default function Child({ changeUser, a, b }) {
    const [inputName, setInputName] = useState("");
    const [inputSalary, setInputSalary] = useState("");
    const [inputLocation, setInputLocation] = useState("");

    const changeFun = () => {
        changeUser(inputName, inputSalary, inputLocation);
    };

    return (
        <div>
            <h3>Update User Information</h3>
            <center>
            <table border="1" style={{width:400}}> 
                <tr>
                    <td>Name:</td>
                    <td> <input type="text" value={inputName} onChange={(e) => setInputName(e.target.value)} /></td>
                </tr>
                <tr>
                    <td>Salary:</td>
                    <td> <input type="text" value={inputSalary} onChange={(e) => setInputSalary(e.target.value)} />
                    </td>
                </tr>

                <tr>
                    <td>Location:</td>
                    <td> <input type="text" value={inputLocation} onChange={(e) => setInputLocation(e.target.value)} />
                    </td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <button onClick={changeFun} border="2" >Update User</button>
                    </td>
                </tr>
            </table>
            <p>
                Props Received: {b} - {a} = {b - a}
            </p>
            </center>
        </div>
    );
}