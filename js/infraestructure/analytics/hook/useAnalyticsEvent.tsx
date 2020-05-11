import { useEffect, useRef } from 'react';
import isEqual from 'lodash/isEqual';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';

// Hook
function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

const useAnalyticsEvent = (fnEvent, event) => {
  const prevEvent = usePrevious(event);

  useEffect(() => {
    if (isNil(event) || isEmpty(event)) {
      fnEvent();
    } else {
      fnEvent(event);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEqual(event, prevEvent)]);
};

export default useAnalyticsEvent;
