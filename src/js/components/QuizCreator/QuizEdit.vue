<template lang="pug">
  .quiz-edit
    .quiz-edit__container
      input.quiz__title(v-model="quiz.title" type="text")
      input.quiz__link(v-model="quiz.link" type="text")
      textarea.quiz__description(v-model="quiz.description")
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
      .quiz-edit__button(@click="processClose(true)") сохранить и закрыть
      .quiz-edit__button(@click="processClose(false)") отменить
      router-link.quiz-edit__button(:to="exportRoute") экспорт
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
  .quiz-edit {
    @at-root {
      #{&}__controls {
        display: flex;
      }

      #{&}__button {
        margin-right: 18px;
        cursor: pointer;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
</style>
