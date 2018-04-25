import createCRUDActionsMapping from './createCRUDActionsMapping';

const uuid = require('uuid/v4');

export default {
  state: {
    quizzes: [],
  },
  /* eslint-disable no-param-reassign */
  mutations: {
    createQuiz(state) {
      state.quizzes.unshift({
        id: uuid(),
        title: 'Новый тест',
        description: '',
        link: '',
        image: '',
        questions: [],
        results: [],
      });
      state.currentQuizIndex = 0;
    },
    readQuiz(state, index) {
      state.currentQuizIndex = index;
    },
    updateQuiz(state, payload) {
      state.quizzes[payload.quizIndex] = payload.updatedQuiz;
    },
    deleteQuiz(state, index) {
      state.quizzes.splice(index, 1);
      state.currentQuizIndex = null;
    },
    listQuiz(state) {
      state.currentQuizIndex = null;
    },
    createQuestion(state, payload) {
      const numberOfQuestions = state.quizzes[payload.quizIndex].questions.push({
        id: uuid(),
        title: 'Новый вопрос',
        text: '',
        image: '',
        responses: [],
      });
      payload.router.push({
        name: 'question',
        params: {
          quizIndex: payload.quizIndex,
          questionIndex: numberOfQuestions - 1,
        },
      });
    },
    updateQuestion(state, payload) {
      state.quizzes[payload.quizIndex].questions[payload.questionIndex] = payload.updatedQuestion;
    },
    deleteQuestion(state, payload) {
      state.quizzes[payload.quizIndex].questions.splice(payload.questionIndex, 1);
    },
    createResponse(state, payload) {
      state.quizzes[payload.quizIndex].questions[payload.questionIndex].responses.push({
        id: uuid(),
        text: '42',
        hint: {
          correct: 'Правильно!',
          missing: '',
          error: 'Неправильно!',
        },
      });
    },
    updateResponse(state, payload) {
      state
        .quizzes[payload.quizIndex]
        .questions[payload.questionIndex]
        .responses[payload.responseIndex] = payload.updatedResponse;
    },
    deleteResponse(state, payload) {
      state
        .quizzes[payload.quizIndex]
        .questions[payload.questionIndex]
        .responses
        .splice(payload.responseIndex, 1);
    },
    createResult(state, payload) {
      const quiz = state.quizzes[payload.quizIndex];
      const numberOfResults = quiz.results.push({
        id: uuid(),
        entry: 0,
        title: 'Вафля',
        shareTitle: quiz.title,
        text: 'Описание результата',
        shareText: quiz.description,
        image: '',
        shareImage: '',
      });
      payload.router.push({
        name: 'result',
        params: {
          quizIndex: payload.quizIndex,
          resultIndex: numberOfResults - 1,
        },
      });
    },
    updateResult(state, payload) {
      state.quizzes[payload.quizIndex].results[payload.resultIndex] = payload.updatedResult;
    },
    deleteResult(state, payload) {
      state.quizzes[payload.quizIndex].results.splice(payload.resultIndex, 1);
    },
  },
  actions: {
    ...createCRUDActionsMapping('Quiz'),
    ...createCRUDActionsMapping('Question'),
    ...createCRUDActionsMapping('Response'),
    ...createCRUDActionsMapping('Result'),
  },
  getters: {
    quizzes: state => state.quizzes,
  },
};
