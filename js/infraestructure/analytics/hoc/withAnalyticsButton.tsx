import isString from 'lodash/isString';

import withAnalyticsOnPress from './withAnalyticsOnPress';
import { createButtonPressEvent } from '../event/eventCreators';

export default event => Component =>
  withAnalyticsOnPress(createButtonPressEvent(event), (_event, { text }) => ({
    name: isString(text) ? text : undefined,
    ..._event,
  }))(Component);
