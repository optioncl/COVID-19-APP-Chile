import fromPairs from 'lodash/fromPairs';
import pipe from 'lodash/fp/pipe';

import types from './eventTypes';
import questionList from 'js/presentation/constants/questionList';

const { actions, event, pipeType, step } = types;

const deleteUndefinedEntries = object =>
  pipe(
    Object.entries,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    o => o.filter(([key, value]) => value !== undefined),
    fromPairs,
  )(object);

export const createEvent = ({
  action,
  screen,
  eventType,
  name,
  ...additionalParams
}) =>
  deleteUndefinedEntries({
    action,
    screen,
    event: eventType,
    name,
    ...additionalParams,
  });

export const createButtonPressEvent = ({ screen, name, ...rest } = {}) =>
  createEvent({
    action: actions.button,
    screen,
    eventType: event.user,
    name,
    ...rest,
  });

export const createLinkPressEvent = ({ screen, name, ...rest } = {}) =>
  createEvent({
    action: actions.link,
    screen,
    eventType: event.user,
    name,
    ...rest,
  });

export const createCovidParams = ({ screen, ...rest } = {}) =>
  createEvent({
    screen,
    pipe: pipeType.coronavirus,
    ...rest,
  });

export const createMapParams = ({ screen, ...rest } = {}) =>
  createEvent({
    screen,
    pipe: pipeType.map,
    ...rest,
  });
export const createPhoneParams = ({ screen, ...rest } = {}) =>
  createEvent({
    screen,
    pipe: pipeType.phone,
    ...rest,
  });

export const createCreditParams = ({ screen, ...rest } = {}) =>
  createEvent({
    screen,
    pipe: pipeType.credits,
    ...rest,
  });

const normalizeQuestion = array =>
  array.map(({ number, ...rest }) => ({
    ...rest,
    number,
    question: questionList[number],
  }));

export const resultQuestionEvent = ({ result, ...rest } = {}) =>
  createEvent({
    action: actions.resolver,
    screen: step.question,
    eventType: event.resultQuestion,
    pipe: pipeType.coronavirus,
    result: normalizeQuestion(result),
    ...rest,
  });

export const resultTestQuestionEvent = ({ result, ...rest } = {}) =>
  createEvent({
    action: actions.resolver,
    screen: step.test,
    eventType: event.resultTestQuestion,
    pipe: pipeType.coronavirus,
    result: normalizeQuestion(result),
    ...rest,
  });

export const resultConditionEvent = ({ ...rest } = {}) =>
  createEvent({
    action: actions.resolver,
    screen: step.condition,
    eventType: event.resultCondition,
    pipe: pipeType.coronavirus,
    ...rest,
  });
