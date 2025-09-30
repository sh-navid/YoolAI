import React from 'react';
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
  // --- No state for newLat, newLng, newType, newDesc as client cannot add. ---
  // --- No handleAddGpsPoint function. ---

  const handleDeleteGpsPoint = (id) => {
    setGpsPoints((prevPoints) => prevPoints.filter((point) => point.id !== id));
  };

  const handleToggleVisited = (id) => {
    setGpsPoints((prevPoints) =>
      prevPoints.map((point) =>
        point.id === id ? { ...point, visited: !point.visited } : point
      )
    );
  };

  // Ensure gpsPoints is always an array before mapping
  const pointsToRender = Array.isArray(gpsPoints) ? gpsPoints : [];

  return (
    <div className="gps-tracker-container">
      <h2>GPS Coordinates</h2>
      {taskName && <h3 className="current-task-name">Mission: {taskName}</h3>}

      {requiredGpsTypes && requiredGpsTypes.length > 0 ? (
        <>
          <p>Required types for this mission:</p>
          <ul className="required-types-list">
            {requiredGpsTypes.map((type, index) => (
              <span key={index}>{type.toUpperCase()}</span>
            ))}
          </ul>
        </>
      ) : (
        <p className="no-required-types-message">No specific GPS types required for this mission.</p>
      )}

      {pointsToRender.length === 0 && (
        <p className="no-gps-message">No GPS points configured for this mission.</p>
      )}

      <ul className="gps-list">
        {pointsToRender.map((point) => (
          <li
            key={point.id}
            className={`gps-item ${requiredGpsTypes?.includes(point.type) ? 'required' : ''} ${point.visited ? 'visited' : ''}`}
          >
            <div className="gps-info">
              <span className="gps-type">[{point.type.toUpperCase()}]</span>
              <span className="gps-description">{point.description}</span>
              <span className="gps-coords">
                Lat: {point.lat.toFixed(4)}, Lng: {point.lng.toFixed(4)}
              </span>
            </div>
            <div className="gps-actions">
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

      {/* The new-gps-input section remains intentionally removed */}
    </div>
  );
};

export default GPSTracker;