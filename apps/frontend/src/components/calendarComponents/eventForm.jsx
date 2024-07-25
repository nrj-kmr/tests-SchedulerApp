import React, { useState } from 'react';

const EventForm = ({ date, onSubmit, onClose }) => {
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('pending');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEvent = {
            title,
            status,
            start: date,
            end: date,
        };
        onSubmit(newEvent);
    };

    return (
        <div className="event-form">
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <label>
                    Status:
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="done">Done</option>
                        <option value="not done">Not Done</option>
                        <option value="pending">Pending</option>
                        <option value="ongoing">Ongoing</option>
                    </select>
                </label>
                <button type="submit">Create Event</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default EventForm;