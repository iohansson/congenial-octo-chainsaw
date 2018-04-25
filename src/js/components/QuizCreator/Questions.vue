<template lang="pug">
  .questions
    h2.questions__caption Вопросы
    ol.questions__list
      li.question(v-for="(item, index) in items" :key="index")
        .question__view
          router-link.question__title(
            :to="{ name: 'question', params: { quizIndex: $route.params.quizIndex, questionIndex: index } }") {{ item.title }}
          .question__delete(@click="processDeleteQuestion(index)") удалить
    .questions__controls
      button.questions__button(@click="processCreateQuestion") добавить вопрос
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
  @import 'scss/core.scss';

  .questions {
    margin: $unit 0;

    @at-root {
      #{&}__caption {
        margin-bottom: 18px;
      }

      #{&}__list {
        @extend %list;
        @extend %orderedList;
      }

      #{&}__button {
        @extend %button;
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
        @extend %item;
      }

      #{&}__title {
        margin-right: $unit;
      }

      #{&}__delete {
        @extend %action;
      }
    }
  }
</style>
