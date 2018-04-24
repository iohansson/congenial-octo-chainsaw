<template lang="pug">
  .quizzes
    h2.quizzes__caption Тесты
    ul.quizzes__list
      li.quiz(v-for="(quiz, index) in quizzes" :key="index")
        .quiz__view
          router-link.quiz__text(
            :to="{ name: 'quiz', params: { quizIndex: index } }"
          ) {{ quiz.title }}
          .quiz__delete(@click="processDeleteQuiz(index)") удалить
    .quizzes__controls
      button.quizzes__button(@click="processCreateQuiz") добавить тест
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Quizzes',
  data() { return {}; },
  computed: {
    ...mapGetters(['quizzes']),
  },
  methods: {
    ...mapActions(['createQuiz', 'deleteQuiz']),
    processCreateQuiz() {
      this.createQuiz();
    },
    processDeleteQuiz(index) {
      this.deleteQuiz(index);
    },
  },
}
</script>
<style lang="scss" scoped>
  @import 'scss/core.scss';
  
  .quizzes{
    @at-root {
      #{&}__list {
        @extend %list;
      }

      #{&}__button {
        @extend %button;
      }
    }
  }

  .quiz {
    @at-root {
      #{&}__view {
        @extend %item;
      }

      #{&}__text {
        margin-right: $unit;
      }

      #{&}__delete {
        @extend %action;
      }
    }
  }
</style>
