import useAnalyticsEvent from './useAnalyticsEvent';
import { logUnlockAchievement } from '../event/tagCreators';

export default event => useAnalyticsEvent(logUnlockAchievement, event);
