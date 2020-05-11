import useAnalyticsEvent from './useAnalyticsEvent';
import { logAppOpen } from '../event/tagCreators';

export default () => useAnalyticsEvent(logAppOpen);
