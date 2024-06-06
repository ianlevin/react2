import React, { useEffect, useState } from "react";
import './style.css';

const Users = () => {
    const urlApi = "https://randomuser.me/api/?results=12";
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetch(urlApi)
            .then(response => response.json())
            .then(data => setUsers(data.results))
            .catch(error => console.log('Hubo un error ' + error));
    }, []);

    const handleCardClick = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedUser(null);
        setIsModalOpen(false);
    };

    return (
        <>
            <h1>Listado:</h1>
            <div className="user-list">
                {users.map((user, index) => (
                    <div className="card" key={index} onClick={() => handleCardClick(user)}>
                        <img src={user.picture.large} alt="pfp" />
                        <div className="card-content">
                            <p>{user.name.first}</p>
                            <p>{user.name.last}</p>
                            <p>{user.dob.age}</p>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div id="modal" className="user-modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>{selectedUser.name.first} {selectedUser.name.last}</h2>
                        <p>Email: {selectedUser.email}</p>
                        <p>Ubicacion: {selectedUser.location.city}, {selectedUser.location.country}</p>
                        <p>Fecha de nacimiento: {selectedUser.dob.date}</p>
                        <p>Telefono: {selectedUser.phone}</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Users;
