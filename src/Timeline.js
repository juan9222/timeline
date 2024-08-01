import React, { useState } from 'react';
import Draggable from 'react-draggable';
import './Timeline.css';

const Timeline = ({ events }) => {
  const [zoom, setZoom] = useState(190); // Default zoom level
  const [eventList, setEventList] = useState(events);
  const [editingEventId, setEditingEventId] = useState(null);
  const [editedName, setEditedName] = useState('');

  const startDate = Date.parse(eventList[0].start);
  const endDate = Date.parse(eventList[eventList.length - 1].end);
  const dayInMs = 1000 * 60 * 60 * 24;

  const lanes = [];

  eventList.forEach(event => {
    let placed = false;
    for (const lane of lanes) {
      if (!lane.some(e => (Date.parse(e.start) <= Date.parse(event.end) && Date.parse(event.start) <= Date.parse(e.end)))) {
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
    const newEndDate = new Date(newStartDate.getTime() + (Date.parse(event.end) - Date.parse(event.start)));

    const newStartDateStr = newStartDate.toISOString().split('T')[0];
    const newEndDateStr = newEndDate.toISOString().split('T')[0];

    if (Date.parse(newStartDateStr) < startDate || Date.parse(newEndDateStr) > endDate) {
      return;
    }

    setEventList(eventList.map(ev => ev.id === event.id ? { ...ev, start: newStartDateStr, end: newEndDateStr } : ev));
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

  const renderDateScale = () => {
    const dates = [];
    for (let time = startDate; time <= endDate; time += dayInMs) {
      const date = new Date(time).toISOString().split('T')[0];
      dates.push(
        <div key={date} className="date-scale-item" style={{ left: `${(time - startDate) / dayInMs * zoom}px` }}>
          {date}
        </div>
      );
    }
    return dates;
  };

  return (
    <div>
      <div className="controls">
        <button onClick={handleZoomOut}>-</button>
        <button onClick={handleZoomIn}>+</button>
      </div>
      <div className="timeline-container">
        <div className="date-scale">
          {renderDateScale()}
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
                      left: `${(Date.parse(event.start) - startDate) / dayInMs * zoom}px`,
                      width: `${(Date.parse(event.end) - Date.parse(event.start)) / dayInMs * zoom}px`
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
    </div>
  );
};

export default Timeline;