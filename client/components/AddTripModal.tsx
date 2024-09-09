import  { useState } from 'react';
import Modal from 'react-modal';
import '../styles/window.css'
const AddToTripModal = ({ isOpen, onClose, onSelect, trips}) => {
  const [selectedTripId, setSelectedTripId] = useState(-1);
  const [newTripName, setNewTripName] = useState('');
  
  const handleSelect = (event) => {
    setSelectedTripId(Number(event.target.value));
  };

  const handleSubmit = () => {
    if (selectedTripId === -2) {
      onSelect({ trip_id: -2, trip_name: newTripName });
    } else {
      const selectedTrip = trips.find((trip) => trip.trip_id === selectedTripId);
      onSelect(selectedTrip);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add to Trip"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="modal-header">
        <h2>Add to Trip</h2>
        <button
          className="modal-close-btn"
          onClick={onClose}
        >
          Close
        </button>
      </div>
      <div className="modal-body">
        <select value={selectedTripId} onChange={handleSelect}>
          <option value="-1" disabled>
            Select a trip or add a new one
          </option>
          <option value="-2" className="create-new-trip-option">Create a new trip</option>
          {trips.map((trip) => (
            <option key={trip.trip_id} value={trip.trip_id}>
              {trip.trip_name}
            </option>
          ))}
        </select>
        {selectedTripId === -2 && (
          <input
            type="text"
            value={newTripName}
            onChange={(e) => setNewTripName(e.target.value)}
            placeholder="What's your new journey?"
            className="modal-input"
          />
        )}
        <div className="modal-footer">
          <button
            className="modal-button"
            onClick={handleSubmit}
          >
            Add
          </button>
          <button
            className="modal-button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddToTripModal;