import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import RouteLine from './route/RouteLine';

const TripLine = props => (<RouteLine thin {...props} />);

TripLine.propTypes = { pattern: PropTypes.object, filteredStops: PropTypes.array };

export default Relay.createContainer(TripLine, { fragments: {
  pattern: () => Relay.QL`
    fragment on Trip {
      pattern {
        ${RouteLine.getFragment('pattern')}
      }
    }
  `,
} });
