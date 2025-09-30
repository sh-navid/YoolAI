import React, { useState } from 'react';
import './GPSTracker.css';

const GPSTracker = ({ taskName, gpsPoints, setGpsPoints }) => {
  const [newLat, setNewLat] = useState('');
  const [newLng, setNewLng] = useState('');
  const [newType, setNewType] = useState(''); // New state for type
  const [newDesc, setNewDesc] = useState('');

  const handleAddGpsPoint = () => {
    if (newLat.trim() && newLng.trim() && newType.trim()) { // Type is now mandatory
      const newPoint = {
        id: Date.now(),
        lat: parseFloat(newLat),
        lng: parseFloat(newLng),
        type: newType.toLowerCase().trim(), // Store type in lowercase for consistency
        description: newDesc.trim() || `Point ${Date.now() % 1000}`,
      };
      setGpsPoints((prevPoints) => [...prevPoints, newPoint]);
      setNewLat('');
      setNewLng('');
      setNewType('');
      setNewDesc('');
    } else {
      alert("Latitude, Longitude, and Type are required!");
    }
  };

  const handleDeleteGpsPoint = (id) => {
    setGpsPoints((prevPoints) => prevPoints.filter((point) => point.id !== id));
  };


  return (
    <div className="gps-tracker-container">
      <h2>GPS Coordinates</h2>
      {taskName && <h3 className="current-task-name">Mission: {taskName}</h3>}

      {gpsPoints.length === 0 && (
        <p className="no-gps-message">No GPS points for this mission yet.</p>
      )}

      <ul className="gps-list">
        {gpsPoints.map((point) => (
          <li key={point.id} className="gps-item">
            <div className="gps-info">
              <span className="gps-type">[{point.type.toUpperCase()}]</span>
              <span className="gps-description">{point.description}</span>
              <span className="gps-coords">
                Lat: {point.lat.toFixed(4)}, Lng: {point.lng.toFixed(4)}
              </span>
            </div>
            <button onClick={() => handleDeleteGpsPoint(point.id)} className="delete-button">
              Del
            </button>
          </li>
        ))}
      </ul>

      <div className="new-gps-input">
        <input
          type="number"
          step="any"
          value={newLat}
          onChange={(e) => setNewLat(e.target.value)}
          placeholder="Latitude (e.g., 34.05)"
        />
        <input
          type="number"
          step="any"
          value={newLng}
          onChange={(e) => setNewLng(e.target.value)}
          placeholder="Longitude (e.g., -118.24)"
        />
        <input
          type="text"
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
          placeholder="Type (e.g., home, gym, market)"
          onKeyPress={(e) => e.key === 'Enter' && handleAddGpsPoint()}
        />
        <input
          type="text"
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddGpsPoint()}
          placeholder="Description (Optional)"
        />
        <button onClick={handleAddGpsPoint}>Add Point</button>
      </div>
    </div>
  );
};

export default GPSTracker;