import React from 'react';
import { render } from 'react-dom';
import timelineItems from './timelineItems';
import Timeline from './Timeline';
import './index.css';

const App = () => (
  <div>
    <h2>Timeline</h2>
    <Timeline events={timelineItems} />
  </div>
);

render(<App />, document.getElementById('root'));
