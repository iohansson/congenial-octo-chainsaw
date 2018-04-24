<template lang="pug">
  .result-edit
    h2.result__caption {{ result.title }}
    .result__input
      label(for="entry") Минимум
      input.result__entry(id="entry", type="text", v-model="result.entry")
    .result__input
      label(for="title") Название
      input.result__title(id="title", type="text", v-model="result.title")
    .result__input
      label(for="text") Текст
      input.result__text(id="text", type="text", v-model="result.text")
    image-input(@uploaded="processImageUploaded" :value="result.image")
    h3.result__subcaption Для шары
    .result__input
      label(for="shareTitle") Заголовок
      input.result__title(id="shareTitle", type="text", v-model="result.shareTitle")
    .result__input
      label(for="shareText") Текст
      input.result__text(id="shareText", type="text", v-model="result.shareText")
    image-input(@uploaded="processShareImageUploaded" :value="result.shareImage")
    .result__controls
      button.result__button(@click="processClose") закрыть и сохранить результат
</template>
<script>
import {mapActions, mapGetters} from 'vuex';
import ImageInput from 'ImageInput/ImageInput.vue';
import { deepCloneObject } from 'utils/helpers';

export default {
  name: 'ResultEdit',
  data() { 
    return {
      result: {},
    };
  },
  mounted() {
    this.result = deepCloneObject(
      this.quizzes[this.$route.params.quizIndex]
        .results[this.$route.params.resultIndex]
    );
  },
  beforeDestroy() {
    this.processSave();
  },
  methods: {
    ...mapActions(['updateResult']),
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
      this.updateResult({
        ...this.$route.params,
        updatedResult: this.result,
      });
    },
    processImageUploaded(data) {
      this.result.image = data.secure_url;
    },
    processShareImageUploaded(data) {
      this.result.shareImage = data.secure_url;
    }
  },
  computed: {
    ...mapGetters(['quizzes'])
  },
  components: {
    ImageInput,
  },
}
</script>
<style lang="scss" scoped>
  @import 'scss/core.scss';

  .result-edit {
    @extend %container;
  }

  .result {
    @at-root {
      #{&}__input {
        @extend %inputRow;
      }

      #{&}__button {
        @extend %button;
      }

      #{&}__controls {
        @extend %footer;
      }
    }
  }
</style>
