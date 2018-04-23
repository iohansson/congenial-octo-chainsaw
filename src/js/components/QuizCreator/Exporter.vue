<template lang="pug">
  .quiz-export {{ contents }}
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Exporter',
  computed: {
    ...mapGetters(['quizzes']),
    quiz() {
      return this.quizzes[this.$route.params.quizIndex];
    },
    contents() {
      return JSON.stringify(this.quiz);
    },
  },
}
</script>
