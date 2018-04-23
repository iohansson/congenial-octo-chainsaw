<template lang="pug">
  .results
    h2.results__caption Результаты
    ol.results__list
      li.result(v-for="(item, index) in items" :key="index")
        .result__view
          router-link.result__text(
            :to="{ name: 'result', params: { quizIndex: $route.params.quizIndex, resultIndex: index } }") {{ item.title }}
          .result__delete(@click="processDeleteResult(index)") удалить
    .results__controls
      .results__button(@click="processCreateResult") добавить результат
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
</style>
