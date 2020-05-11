import useAnalyticsEvent from './useAnalyticsEvent';
import getAnalitycsLevel from '../event/getAnalitycsLevel';

export default event => useAnalyticsEvent(getAnalitycsLevel, event);
