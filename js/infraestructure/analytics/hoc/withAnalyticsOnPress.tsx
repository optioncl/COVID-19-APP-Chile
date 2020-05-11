import React from 'react';
import isObject from 'lodash/isObject';

import createWrapperComponentName from './createWrapperComponentName';

import registerEvent from '../event/registerEvent';
import { createEvent } from '../event/eventCreators';

const withAnalyticsOnPress = (baseEvent, enhanceEvent) => Component => {
  class WithAnalyticsOnPress extends React.Component {
    render() {
      const { analytics, onPress, ...wrappedComponentProps } = this.props;
      if (!baseEvent && !analytics) {
        throw new Error(
          `Presionable con analytics no tiene un evento asociado, omitido
          parámetro en 'withAnalyticsOnPress()' o prop 'analytics'. Tal vez es
          innecesario que sea envuelto en el componente 'WithAnalyticsOnPress'?`,
        );
      }
      const event = {
        ...baseEvent,
        ...analytics,
      };

      return (
        <Component
          onPress={getAnalyticsEnhancedFn(
            onPress || (() => undefined),
            enhanceEvent ? enhanceEvent(event, this.props) : event,
          )}
          {...wrappedComponentProps}
        />
      );
    }
  }

  WithAnalyticsOnPress.displayName = createWrapperComponentName(
    WithAnalyticsOnPress,
    Component,
  );
  return WithAnalyticsOnPress;
};

export default withAnalyticsOnPress;

const getAnalyticsEnhancedFn = (fn, event) => (...args) => {
  if (event) {
    registerEvent(createEvent(isObject(event) ? event : event()));
  }

  return fn(...args);
};
