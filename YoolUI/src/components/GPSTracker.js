import React, { useState } from 'react';
import './GPSTracker.css';

// Predefined list of common GPS point types
const predefinedGpsTypes = [
  "anomaly", "research", "facility", "supermarket", "gym", "home",
  "work", "school", "hospital", "park", "restaurant", "cafe", "library",
  "museum", "airport", "clinic", "market", "bank", "gas station", "pharmacy",
  "hotel", "police station", "fire station", "post office", "church", "temple",
  "mosque", "synagogue", "stadium", "cinema", "theater", "gallery", "zoo",
  "beach", "mountain", "forest", "river", "lake", "ocean", "desert", "volcano",
  "data core", "distribution hub", // Added types from your initial App.js tasks
  "unknown" // A fallback/default type
];

const GPSTracker = ({ taskName, gpsPoints, requiredGpsTypes, setGpsPoints }) => {
  const [newLat, setNewLat] = useState('');
  const [newLng, setNewLng] = useState('');
  const [newType, setNewType] = useState(predefinedGpsTypes[0] || 'unknown');
  const [newDesc, setNewDesc] = useState('');

  const handleAddGpsPoint = () => {
    if (newLat.trim() && newLng.trim() && newType.trim()) {
      const newPoint = {
        id: Date.now(),
        lat: parseFloat(newLat),
        lng: parseFloat(newLng),
        type: newType.toLowerCase().trim(),
        description: newDesc.trim() || `Point ${Date.now() % 1000}`,
        visited: false, // New points are initially not visited
      };
      setGpsPoints((prevPoints) => [...prevPoints, newPoint]);
      setNewLat('');
      setNewLng('');
      setNewType(predefinedGpsTypes[0] || 'unknown');
      setNewDesc('');
    } else {
      alert("Latitude, Longitude, and Type are required!");
    }
  };

  const handleDeleteGpsPoint = (id) => {
    setGpsPoints((prevPoints) => prevPoints.filter((point) => point.id !== id));
  };

  // New handler to toggle the visited status of a GPS point
  const handleToggleVisited = (id) => {
    setGpsPoints((prevPoints) =>
      prevPoints.map((point) =>
        point.id === id ? { ...point, visited: !point.visited } : point
      )
    );
  };

  return (
    <div className="gps-tracker-container">
      <h2>GPS Coordinates</h2>
      {taskName && <h3 className="current-task-name">Mission: {taskName}</h3>}

      {requiredGpsTypes && requiredGpsTypes.length > 0 && (
        <>
          <p>Required types for this mission:</p>
          <ul className="required-types-list">
            {requiredGpsTypes.map((type, index) => (
              <span key={index}>{type.toUpperCase()}</span>
            ))}
          </ul>
        </>
      )}

      {gpsPoints.length === 0 && (
        <p className="no-gps-message">No GPS points for this mission yet. Add one below!</p>
      )}

      <ul className="gps-list">
        {gpsPoints.map((point) => (
          <li key={point.id} className={`gps-item ${requiredGpsTypes?.includes(point.type) ? 'required' : ''} ${point.visited ? 'visited' : ''}`}>
            <div className="gps-info">
              <span className="gps-type">[{point.type.toUpperCase()}]</span>
              <span className="gps-description">{point.description}</span>
              <span className="gps-coords">
                Lat: {point.lat.toFixed(4)}, Lng: {point.lng.toFixed(4)}
              </span>
            </div>
            <div className="gps-actions"> {/* New wrapper for action buttons */}
              <button
                onClick={() => handleToggleVisited(point.id)}
                className={`visit-button ${point.visited ? 'visited-button' : ''}`}
                title={point.visited ? 'Mark as Not Visited' : 'Mark as Visited'}
              >
                {point.visited ? '✓ Visited' : 'Visit'}
              </button>
              <button onClick={() => handleDeleteGpsPoint(point.id)} className="delete-button">
                Del
              </button>
            </div>
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
        <select
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
          className="gps-type-select"
        >
          {predefinedGpsTypes.sort().map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddGpsPoint()} // Can trigger add from here
          placeholder="Description (Optional)"
        />
        <button onClick={handleAddGpsPoint}>Add Point</button>
      </div>
    </div>
  );
};

export default GPSTracker;