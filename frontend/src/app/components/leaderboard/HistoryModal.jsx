import React from 'react';

const HistoryModal = ({ isVisible, data, onClose }) => {
  if (!isVisible) return null; // Don't render if not visible

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">User History</h2>
        
        <div className="overflow-y-auto max-h-64">
          {data && data.length > 0 ? (
            <ul>
              {data.map((entry, index) => (
                <li key={index} className="flex justify-between border-b py-2">
                  <span className="font-medium">{entry.date}</span>
                  <span className="text-gray-700">Points: {entry.pointsAwarded}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No history data available.</p>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default HistoryModal;
