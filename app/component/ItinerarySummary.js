import PropTypes from 'prop-types';
import React from 'react';
import Duration from './Duration';
import WalkDistance from './WalkDistance';

const ItinerarySummary = ({ itinerary, children }) => (
  <div className="itinerary-summary">
    <Duration
      duration={itinerary.duration}
      className="duration--itinerary-summary"
    />
    {children}
    <WalkDistance walkDistance={itinerary.walkDistance} />
  </div>
);

ItinerarySummary.description = () =>
  "Displays itinerary summary row; itinerary's duration and walk distance";

ItinerarySummary.propTypes = {
  itinerary: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

ItinerarySummary.displayName = 'ItinerarySummary';

export default ItinerarySummary;
