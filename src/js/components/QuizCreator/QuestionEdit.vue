<template lang="pug">
  .question-edit
    h2.question__caption {{ question.text }}
    .question__input
      label(for="title") Вопрос
      input.question__title(id="title" v-model="question.title" type="text")
    image-input(@uploaded="processImageUploaded" :value="question.image")
    responses(
      v-if="question.responses"
      :items="question.responses"
      question-index="$route.params.questionIndex")
    .question__controls
      button.question__button(@click="processClose") закрыть и сохранить вопрос
</template>
<script>
import {mapActions, mapGetters} from 'vuex';
import ImageInput from 'ImageInput/ImageInput.vue';
import Responses from './Responses.vue';

export default {
  name: 'QuestionEdit',
  data() { 
    return {
      question: {},
    };
  },
  mounted() {
    this.question = Object.assign(
      {},
      this.quizzes[this.$route.params.quizIndex]
        .questions[this.$route.params.questionIndex]
    );
  },
  beforeDestroy() {
    this.processSave();
  },
  methods: {
    ...mapActions(['updateQuestion', 'createQuestion']),
    processClose() {
      this.processSave();
      this.$router.push({
        name: 'quiz',
        params: {
          quizIndex: this.$route.params.quizIndex,
        },
      });
    },
    processSave() {
      this.updateQuestion({
        ...this.$route.params,
        updatedQuestion: this.question,
      });
    },
    processImageUploaded(data) {
      this.question.image = data.secure_url;
    },
  },
  computed: {
    ...mapGetters(['quizzes'])
  },
  components: {
    ImageInput,
    Responses,
  },
}
</script>
<style lang="scss" scoped>
  @import 'scss/core.scss';

  .question-edit {
    @extend %container;
  }

  .question {
    @at-root {
      #{&}__input {
        @extend %inputRow;
      }

      #{&}__button {
        @extend %button;
      }

      #{&}__title {
        @extend %input;
      }
    }
  }
</style>
