<template lang="pug">
  .questions
    h2.questions__caption Вопросы
    ol.questions__list
      li.question(v-for="(item, index) in items" :key="index")
        .question__view
          router-link.question__text(
            :to="{ name: 'question', params: { quizIndex: $route.params.quizIndex, questionIndex: index } }") {{ item.text }}
          .question__delete(@click="processDeleteQuestion(index)") удалить
    .questions__controls
      .questions__button(@click="processCreateQuestion") добавить вопрос
</template>
<script>
import {mapActions} from 'vuex';

export default {
  name: 'Questions',
  data() { return {}; },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  methods: {
    ...mapActions(['createQuestion', 'deleteQuestion']),
    processCreateQuestion() {
      this.createQuestion({
        ...this.$route.params,
        router: this.$router,
      });
    },
    processDeleteQuestion(index) {
      this.deleteQuestion({
        ...this.$route.params,
        questionIndex: index,
      });
    },
  },
}
</script>
<style lang="scss" scoped>
  .questions {
    margin: 18px 0;

    @at-root {
      #{&}__caption {
        margin-bottom: 18px;
      }

      #{&}__list {
        margin-bottom: 12px;
      }
    }
  }

  .question {
    margin-bottom: 9px;

    &:last-child {
      margin-bottom: 0;
    }

    @at-root {
      #{&}__view {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
    }
  }
</style>
