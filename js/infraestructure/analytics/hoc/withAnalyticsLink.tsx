import isString from 'lodash/isString';

import withAnalyticsOnPress from './withAnalyticsOnPress';
import { createLinkPressEvent } from '../event/eventCreators';

export default event => Component =>
  withAnalyticsOnPress(createLinkPressEvent(event), (_event, { text }) => ({
    ..._event,
    name: isString(text) ? text : undefined,
  }))(Component);
