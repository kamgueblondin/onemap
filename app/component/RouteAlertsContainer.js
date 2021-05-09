import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay/classic';
import { FormattedMessage, intlShape } from 'react-intl';
import moment from 'moment';
import find from 'lodash/find';
import upperFirst from 'lodash/upperFirst';
import connectToStores from 'fluxible-addons-react/connectToStores';

import RouteAlertsRow from './RouteAlertsRow';

const getAlerts = (route, currentTime, intl) => {
  const routeMode = route.mode.toLowerCase();
  const routeLine = route.shortName;
  const { color } = route;

  return route.alerts.map(alert => {
    // Try to find the alert in user's language, or failing in English, or failing in any language
    // TODO: This should be a util function that we use everywhere
    // TODO: We should match to all languages user's browser lists as acceptable
    let header = find(alert.alertHeaderTextTranslations, [
      'language',
      intl.locale,
    ]);
    if (!header) {
      header = find(alert.alertHeaderTextTranslations, ['language', 'en']);
    }
    if (!header) {
      [header] = alert.alertHeaderTextTranslations;
    }
    if (header) {
      header = header.text;
    }

    // Unfortunately nothing in GTFS-RT specifies that if there's one string in a language then
    // all other strings would also be available in the same language...
    let description = find(alert.alertDescriptionTextTranslations, [
      'language',
      intl.locale,
    ]);
    if (!description) {
      description = find(alert.alertDescriptionTextTranslations, [
        'language',
        'en',
      ]);
    }
    if (!description) {
      [description] = alert.alertDescriptionTextTranslations;
    }
    if (description) {
      description = description.text;
    }

    const startTime = moment(alert.effectiveStartDate * 1000);
    const endTime = moment(alert.effectiveEndDate * 1000);
    const sameDay = startTime.isSame(endTime, 'day');

    return (
      <RouteAlertsRow
        key={alert.id}
        routeMode={routeMode}
        color={color ? `#${color}` : null}
        routeLine={routeLine}
        header={header}
        description={description}
        endTime={
          sameDay
            ? intl.formatTime(endTime)
            : upperFirst(endTime.calendar(currentTime))
        }
        startTime={upperFirst(startTime.calendar(currentTime))}
        expired={startTime > currentTime || currentTime > endTime}
      />
    );
  });
};

function RouteAlertsContainer({ route, currentTime }, { intl }) {
  if (route.alerts.length === 0) {
    return (
      <div className="no-alerts-message">
        <FormattedMessage
          id="disruption-info-route-no-alerts"
          defaultMessage="No known disruptions or diversions for route."
        />
      </div>
    );
  }

  return (
    <div className="route-alerts-list momentum-scroll">
      {getAlerts(route, currentTime, intl)}
    </div>
  );
}

RouteAlertsContainer.propTypes = {
  route: PropTypes.object.isRequired,
  currentTime: PropTypes.object,
};

RouteAlertsContainer.contextTypes = {
  intl: intlShape,
};

const RouteAlertsContainerWithTime = connectToStores(
  RouteAlertsContainer,
  ['TimeStore'],
  context => ({
    currentTime: context.getStore('TimeStore').getCurrentTime(),
  }),
);

export default Relay.createContainer(RouteAlertsContainerWithTime, {
  fragments: {
    route: () => Relay.QL`
        fragment on Route {
          mode
          color
          shortName
          alerts {
            id
            alertHeaderTextTranslations {
              text
              language
            }
            alertDescriptionTextTranslations {
              text
              language
            }
            effectiveStartDate
            effectiveEndDate
          }
        }
      `,
  },
});
