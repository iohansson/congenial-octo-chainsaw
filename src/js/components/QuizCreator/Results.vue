<template lang="pug">
  .results
    h2.results__caption Результаты
    ol.results__list
      li.result(v-for="(item, index) in items" :key="index")
        .result__view
          router-link.result__text(
            :to="{ name: 'result', params: { quizIndex: $route.params.quizIndex, resultIndex: index } }") {{ item.title + ' (' + item.entry + '+)' }}
          .result__delete(@click="processDeleteResult(index)") удалить
    .results__controls
      button.results__button(@click="processCreateResult") добавить результат
</template>
<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'Results',
  data() { return {}; },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  methods: {
    ...mapActions(['createResult', 'deleteResult']),
    processCreateResult() {
      this.createResult({
        ...this.$route.params,
        router: this.$router,
      });
    },
    processDeleteResult(index) {
      this.deleteResult({
        ...this.$route.params,
        resultIndex: index,
      });
    },
  },
}
</script>
<style lang="scss" scoped>
  @import 'scss/core.scss';

  .results {
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

  .result {
    margin-bottom: 9px;

    &:last-child {
      margin-bottom: 0;
    }

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
