import Vue from 'vue';
import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import QuizCreator from 'QuizCreator/QuizCreator';

import store from 'js/store/index';
import router from 'js/router/index';

const toolbarOptions = [['bold', 'italic', 'strike'], ['link'], ['clean']];
Vue.use(VueQuillEditor, { modules: { toolbar: toolbarOptions } });

new Vue({
  el: '#vue-app',
  store,
  router,
  components: {
    QuizCreator,
  },
});

import 'scss/main.scss';
