<template lang="pug">
  .quiz-creator
    quizzes
</template>
<script>
import {mapGetters, mapActions} from 'vuex';
import Quizzes from './Quizzes.vue';

export default {
  name: 'QuizCreator',
  data() {
    return {};
  },
  components: {
    Quizzes,
  },
}
</script>
<style lang="scss" scoped>

</style>
