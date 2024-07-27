import React from 'react';

const CustomToolbar = ({ label, onNavigate, onView }) => {
  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" onClick={() => onNavigate('PREV')}>Back</button>
        <button type="button" onClick={() => onNavigate('TODAY')}>Today</button>
        <button type="button" onClick={() => onNavigate('NEXT')}>Next</button>
      </span>
      <span className="rbc-toolbar-label">{label}</span>
      <span className="rbc-btn-group">
        <button type="button" onClick={() => onView('month')}>Month</button>
        <button type="button" onClick={() => onView('week')}>Week</button>
        <button type="button" onClick={() => onView('day')}>Day</button>
        <button type="button" onClick={() => onView('agenda')}>Agenda</button>
      </span>
    </div>
  );
};

export default CustomToolbar;