<template lang="pug">
  .quiz-edit
    .quiz-edit__container
      h2.quiz__caption {{ quiz.title }}
      .quiz__input
        label(for="title") Название
        input.quiz__title(id="title" v-model="quiz.title" type="text")
      .quiz__input
        label(for="link") Ссылка
        input.quiz__link(id="link" v-model="quiz.link" type="text")
      .quiz__textarea
        label(for="description") Описание
        textarea.quiz__description(id="description" v-model="quiz.description")
      image-input(@uploaded="processImageUploaded" :value="quiz.image")
      questions(
        v-if="quiz.questions",
        :items="quiz.questions",
      )
      results(
        v-if="quiz.results",
        :items="quiz.results",
      )
    .quiz-edit__controls
      button.quiz-edit__button(@click="processClose(true)") сохранить и закрыть
      .quiz-edit__action(@click="processClose(false)") отменить
      router-link.quiz-edit__action(:to="exportRoute") экспорт
</template>
<script>
import {mapActions, mapGetters} from 'vuex';
import ImageInput from 'ImageInput/ImageInput.vue';
import Questions from './Questions.vue';
import Results from './Results.vue';

export default {
  name: 'QuizEditView',
  data() { 
    return {
      quiz: {},
    };
  },
  mounted() {
    this.quiz = Object.assign({}, this.quizzes[this.$route.params.quizIndex]);
  },
  beforeDestroy() {
    this.processSave();
  },
  methods: {
    ...mapActions(['updateQuiz', 'createQuestion']),
    processClose(save) {
      save && this.processSave();
      this.$router.push('/');
    },
    processSave() {
      this.updateQuiz({
        ...this.$route.params,
        updatedQuiz: this.quiz,
      });
    },
    processImageUploaded(data) {
      this.quiz.image = data.secure_url;
    },
  },
  computed: {
    ...mapGetters(['quizzes']),
    exportRoute() {
      return {
        name: 'export',
        params: {
          quizIndex: this.$route.params.quizIndex,
        },
      };
    },
  },
  components: {
    ImageInput,
    Questions,
    Results,
  },
}
</script>
<style lang="scss" scoped>
  @import 'scss/core.scss';

  .quiz-edit {
    @extend %container;

    @at-root {
      #{&}__controls {
        display: flex;
        align-items: center;
      }

      #{&}__button {
        @extend %button;
      }

      #{&}__action {
        @extend %action;
      }
    }
  }

  .quiz {
    @at-root {
      #{&}__title {
        @extend %input;
      }

      #{&}__link {
        @extend %input;
      }

      #{&}__input {
        @extend %inputRow;
      }

      #{&}__textarea {
        @extend %textareaRow;
      }

      #{&}__description {
        @extend %textarea;
      }
    }
  }
</style>
