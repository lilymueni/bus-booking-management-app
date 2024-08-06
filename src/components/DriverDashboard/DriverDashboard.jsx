import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DriverDashboard = () => {
    const [buses, setBuses] = useState([]);
    const [newBus, setNewBus] = useState({
        number_of_seats: '',
        cost_per_seat: '',
        route: '',
        travel_time: ''
    });

    useEffect(() => {
        axios.get('/api/buses')
            .then(response => setBuses(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBus(prev => ({ ...prev, [name]: value }));
    };

    const handleAddBus = () => {
        axios.post('/api/buses', newBus)
            .then(response => setBuses([...buses, response.data]))
            .catch(error => console.error(error));
    };

    const handleDeleteBus = (id) => {
        axios.delete(/api/buses/${id})
            .then(() => setBuses(buses.filter(bus => bus.id !== id)))
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>Driver Dashboard</h1>
            <h2>Add New Bus</h2>
            <input
                type="number"
                name="number_of_seats"
                value={newBus.number_of_seats}
                onChange={handleInputChange}
                placeholder="Number of Seats"
            />
            <input
                type="number"
                name="cost_per_seat"
                value={newBus.cost_per_seat}
                onChange={handleInputChange}
                placeholder="Cost per Seat"
            />
            <input
                type="text"
                name="route"
                value={newBus.route}
                onChange={handleInputChange}
                placeholder="Route"
            />
            <input
                type="text"
                name="travel_time"
                value={newBus.travel_time}
                onChange={handleInputChange}
                placeholder="Travel Time"
            />
            <button onClick={handleAddBus}>Add Bus</button>

            <h2>Existing Buses</h2>
            <ul>
                {buses.map(bus => (
                    <li key={bus.id}>
                        {bus.route} - {bus.travel_time} - ${bus.cost_per_seat} (Seat Capacity: {bus.number_of_seats})
                        <button onClick={() => handleDeleteBus(bus.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DriverDashboard;