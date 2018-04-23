import Vue from 'vue';
import VueRouter from 'vue-router';
import QuizCreator from 'QuizCreator/QuizCreator.vue';
import QuizEdit from 'QuizCreator/QuizEdit.vue';
import QuestionEdit from 'QuizCreator/QuestionEdit.vue';
import ResultEdit from 'QuizCreator/ResultEdit.vue';
import Exporter from 'QuizCreator/Exporter.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: QuizCreator,
  },
  {
    name: 'quiz',
    path: '/quiz/:quizIndex',
    component: QuizEdit,
  },
  {
    name: 'question',
    path: '/quiz/:quizIndex/question/:questionIndex',
    component: QuestionEdit,
  },
  {
    name: 'result',
    path: '/quiz/:quizIndex/result/:resultIndex',
    component: ResultEdit,
  },
  {
    name: 'export',
    path: '/quiz/:quizIndex/export',
    component: Exporter,
  },
];

export default new VueRouter({
  routes,
});
