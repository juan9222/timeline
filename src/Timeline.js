import React from 'react';
import './Timeline.css';

const Timeline = ({ events }) => {
  const startDate = new Date(events[0].start).getTime();
  const dayInMs = 1000 * 60 * 60 * 24;

  const lanes = [[]];

  events.forEach(event => {
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

  return (
    <div className="timeline">
      {lanes.map((lane, laneIndex) => (
        <div key={laneIndex} className="lane">
          {lane.map(event => (
            <div
              key={event.id}
              className="event"
              style={{
                left: `${(new Date(event.start).getTime() - startDate) / dayInMs * 10}px`,
                width: `${(new Date(event.end).getTime() - new Date(event.start).getTime()) / dayInMs * 10}px`
              }}
            >
              {event.name}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Timeline;
