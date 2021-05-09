import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay/classic';
import { routerShape, locationShape } from 'react-router';
import DisruptionInfoButton from './DisruptionInfoButton';
import { isBrowser } from '../util/browser';

function DisruptionInfoButtonContainer(
  outerProps,
  { router, location, config: { feedIds } },
) {
  if (isBrowser) {
    const openDisruptionInfo = () => {
      router.push({
        ...location,
        state: {
          ...location.state,
          disruptionInfoOpen: true,
        },
      });
    };

    return (
      <Relay.Renderer
        Container={DisruptionInfoButton}
        forceFetch
        queryConfig={{
          name: 'ViewerRoute',
          queries: {
            root: (Component, variables) => Relay.QL`
              query {
                viewer {
                  ${Component.getFragment('root', variables)}
                }
              }
           `,
          },
          params: { feedIds },
        }}
        environment={Relay.Store}
        render={({ renderProps, props }) => (
          <DisruptionInfoButton
            {...renderProps}
            {...props}
            toggleDisruptionInfo={openDisruptionInfo}
          />
        )}
      />
    );
  }
  return <div />;
}

DisruptionInfoButtonContainer.contextTypes = {
  router: routerShape.isRequired, // eslint-disable-line react/no-typos
  location: locationShape.isRequired, // eslint-disable-line react/no-typos
  config: PropTypes.shape({
    feedIds: PropTypes.arrayOf(PropTypes.string.isRequired),
  }).isRequired,
};

export default DisruptionInfoButtonContainer;
