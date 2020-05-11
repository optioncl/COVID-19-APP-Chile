export default {
  actions: {
    button: 'press_button',
    link: 'press_link',
    resolver: 'resolver_test',
  },
  event: {
    user: 'user_action',
    resultCondition: 'result_condition',
    resultQuestion: 'result_question',
    resultTestQuestion: 'result_test_question',
  },
  pipeType: {
    coronavirus: 'pipe_covid19',
    map: 'map_hospital',
    phone: 'call_phone',
    credits: 'credit_view',
    disclaimer: 'disclaimer_view',
  },
  step: {
    condition: 'ConditionsStep',
    test: 'TestQuestionsStep',
    question: 'QuestionStep',
  },
};
