import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { locationShape } from 'react-router';
import Splash from './Splash';

import { getIntroShown, setIntroShown } from '../store/localStorage';
import { isBrowser } from '../util/browser';

class SplashOrComponent extends React.Component {
  static propTypes = {
    displaySplash: React.PropTypes.bool.isRequired,
    children: React.PropTypes.node.isRequired,
  };

  static contextTypes = {
    config: React.PropTypes.object.isRequired,
    location: locationShape.isRequired,
  };

  constructor(props, { config }) {
    super();
    this.state = { shouldShowIntro:
      config.shouldShowIntro && getIntroShown() !== true &&
      // Do not show intro in mock mode
      !(isBrowser && window.mock),
    };
  }

  setIntroShown = () => {
    this.setState({ shouldShowIntro: false }, setIntroShown);
  }

  render() {
    const location = this.context.location;
    const searchOpen = location && location.state && location.state.oneTabSearchModalOpen;

    if (!this.props.displaySplash && !searchOpen && !this.state.shouldShowIntro) {
      return this.props.children;
    }
    return (
      <Splash setIntroShown={this.setIntroShown} shouldShowIntro={this.state.shouldShowIntro} />
    );
  }
}

export default connectToStores(SplashOrComponent, ['PositionStore', 'EndpointStore'],
  (context) => {
    const origin = context.getStore('EndpointStore').getOrigin();

    return {
      displaySplash: (
        (origin.useCurrentPosition &&
            !context.getStore('PositionStore').getLocationState().hasLocation) ||
        (!origin.useCurrentPosition && (!origin.lat || !origin.lon))), // selected location
    };
  });
