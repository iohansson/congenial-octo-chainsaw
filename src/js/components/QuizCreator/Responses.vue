<template lang="pug">
  .responses
    h3.responses__caption Ответы
    ol.responses__list
      li.response(v-for="(item, index) in items" :key="index")
        .response__view(v-if="editResponseIndex !== index")
          .response__text(@click="processEditResponse(item, index)") {{ item.text }}
          .response__delete(@click="processDeleteResponse(index)") удалить
        .response__edit(v-if="editResponseIndex === index")
          input.response__text(type="text", v-model="editResponseCopy.text")
          label(for="correct") правильный
          input.response__correct(type="checkbox", name="correct", v-model="editResponseCopy.correct")
          input.response__hint--correct(
            v-if="editResponseCopy.correct",
            placeholder="примечание к правильному ответу",
            v-model="editResponseCopy.hint.correct")
          input.response__hint--error(
            v-if="!editResponseCopy.correct",
            placeholder="примечание к неправильному ответу",
            v-model="editResponseCopy.hint.error")
          input.response__hint--missng(
            v-if="editResponseCopy.correct && multipleRightAnswers",
            placeholder="если не выбрали",
            v-model="editResponseCopy.hint.missing")
          .response__controls
            .response__button(@click="processCloseResponse") закрыть и сохранить ответ
    .responses__controls
      .responses__button(@click="processCreateResponse") добавить ответ
</template>
<script>
import {mapActions, mapGetters} from 'vuex';
import { deepCloneObject } from 'utils/helpers';

export default {
  name: 'Responses',
  data() { return {
    editResponseIndex: null,
    editResponseCopy: {},
  }; },
  props: {
    items: {
      type: Array,
      required: true,
    },
    questionIndex: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions(['createResponse', 'updateResponse', 'deleteResponse']),
    processCreateResponse() {
      this.createResponse({
        ...this.$route.params,
      });
      const createdResponseIndex = this.items.length - 1;
      const createdResponse = this.items[createdResponseIndex];
      this.processEditResponse(createdResponse, createdResponseIndex);
    },
    processEditResponse(response, index) {
      if (this.editResponseIndex) this.processCloseResponse();
      this.editResponseIndex = index;
      this.editResponseCopy = deepCloneObject(response);
    },
    processDeleteResponse(index) {
      this.deleteResponse({
        ...this.$route.params,
        responseIndex: index,
      });
    },
    processUpdateResponse() {
      this.updateResponse({
        ...this.$route.params,
        responseIndex: this.editResponseIndex,
        updatedResponse: this.editResponseCopy,
      });
    },
    processCloseResponse() {
      this.processUpdateResponse();
      this.editResponseIndex = null;
      this.editResponseCopy = {};
    },
  },
  computed: {
    multipleRightAnswers() {
      return this.items.reduce((correctAnswers, item) => {
        return correctAnswers + (item.correct ? 1 : 0);
      }, 0) > 1;
    },
  },
}
</script>
<style lang="scss" scoped>
  .responses {
    margin: 18px 0;
  }

  .response {
    @at-root {
      #{&}__view {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
    }
  }
</style>
