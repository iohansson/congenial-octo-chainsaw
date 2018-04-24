import Vue from 'vue';

import QuizCreator from 'QuizCreator/QuizCreator';

import store from 'js/store/index';
import router from 'js/router/index';

new Vue({
  el: '#vue-app',
  store,
  router,
  components: {
    QuizCreator,
  },
});

import 'scss/main.scss';
