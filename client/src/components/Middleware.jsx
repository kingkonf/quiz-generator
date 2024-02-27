import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Middleware.css";

const Middleware = () => {
    const [users, setUsers] = useState([]); // Initialize users as an array
    const [error, setError] = useState(null); // Initialize error state
    const [searchTerm, setSearchTerm] = useState(''); // Initialize searchTerm state

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(import.meta.env.VITE_DB_URL+ "/users");
            const data = await response.json();
            setUsers(data);
          } catch (error) {
            setError(error);
          }
        };
    
        fetchData();

        
    }, []);

    const handleSearch = () => {
        setUsers(
          users.filter((user) => {
            return (
              user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.resultstatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.resulttype.toLowerCase().includes(searchTerm.toLowerCase()) 
            );
          })
        );
      };

   

    // Check for error and render error message if there is an error
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='input111'
                placeholder="Search by username, email, status, or result type"
            />

            <button onClick={handleSearch} className='button'>Search</button>
            
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="th">Username</th>
                            <th className="th">Email</th>
                            <th className="th">Marks</th>
                            <th className="th">Percentage</th>
                            <th className="th">Result Status</th>
                        </tr>
                    </thead>    
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}> 
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.resultstatus}</td>
                                <td>{user.percentage}%</td> 
                                <td>{user.resulttype}</td> 
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Middleware;
