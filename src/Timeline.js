import React, { useState } from 'react';
import Draggable from 'react-draggable';
import './Timeline.css';

const Timeline = ({ events }) => {
  const [zoom, setZoom] = useState(10); // Default zoom level
  const [eventList, setEventList] = useState(events);
  const [editingEventId, setEditingEventId] = useState(null);
  const [editedName, setEditedName] = useState('');

  const startDate = new Date(eventList[0].start).getTime();
  const dayInMs = 1000 * 60 * 60 * 24;

  const lanes = [[]];

  eventList.forEach(event => {
    let placed = false;
    for (const lane of lanes) {
      if (!lane.some(e => (new Date(e.start) <= new Date(event.end) && new Date(event.start) <= new Date(e.end)))) {
        lane.push(event);
        placed = true;
        break;
      }
    }
    if (!placed) {
      lanes.push([event]);
    }
  });

  const handleZoomIn = () => setZoom(zoom + 5);
  const handleZoomOut = () => setZoom(zoom - 5);

  const handleDrag = (e, data, event) => {
    const newStartDate = new Date(startDate + (data.x / zoom) * dayInMs);
    const newEndDate = new Date(newStartDate.getTime() + (new Date(event.end).getTime() - new Date(event.start).getTime()));

    if (newStartDate < new Date(eventList[0].start) || newEndDate > new Date(eventList[eventList.length - 1].end)) {
      return;
    }

    setEventList(eventList.map(ev => ev.id === event.id ? { ...ev, start: newStartDate.toISOString().split('T')[0], end: newEndDate.toISOString().split('T')[0] } : ev));
  };

  const handleEdit = (event) => {
    setEditingEventId(event.id);
    setEditedName(event.name);
  };

  const handleSave = (event) => {
    setEventList(eventList.map(ev => ev.id === event.id ? { ...ev, name: editedName } : ev));
    setEditingEventId(null);
    setEditedName('');
  };

  const handleCancel = () => {
    setEditingEventId(null);
    setEditedName('');
  };

  return (
    <div>
      <div className="controls">
        <button onClick={handleZoomOut}>-</button>
        <button onClick={handleZoomIn}>+</button>
      </div>
      <div className="timeline">
        {lanes.map((lane, laneIndex) => (
          <div key={laneIndex} className="lane">
            {lane.map(event => (
              <Draggable
                key={event.id}
                axis="x"
                grid={[zoom, zoom]}
                onDrag={(e, data) => handleDrag(e, data, event)}
              >
                <div
                  className="event"
                  style={{
                    left: `${(new Date(event.start).getTime() - startDate) / dayInMs * zoom}px`,
                    width: `${(new Date(event.end).getTime() - new Date(event.start).getTime()) / dayInMs * zoom}px`
                  }}
                >
                  {editingEventId === event.id ? (
                    <div className="edit-container">
                      <input
                        type="text"
                        value={editedName}
                        onChange={e => setEditedName(e.target.value)}
                      />
                      <button onClick={() => handleSave(event)}>Save</button>
                      <button onClick={handleCancel}>Cancel</button>
                    </div>
                  ) : (
                    <span onDoubleClick={() => handleEdit(event)}>
                      {event.name}
                    </span>
                  )}
                </div>
              </Draggable>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;