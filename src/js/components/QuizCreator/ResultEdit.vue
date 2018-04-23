<template lang="pug">
  .result-edit
    input.result__entry(type="text", v-model="result.entry")
    input.result__title(type="text", v-model="result.title")
    input.result__text(type="text", v-model="result.text")
    image-input(@uploaded="processImageUploaded" :value="result.image")
    input.result__title(type="text", v-model="result.shareTitle")
    input.result__text(type="text", v-model="result.shareText")
    image-input(@uploaded="processShareImageUploaded" :value="result.shareImage")
    .result__controls
      .result__button(@click="processClose") закрыть и сохранить результат
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
</style>
