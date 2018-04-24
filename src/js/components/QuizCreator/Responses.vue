<template lang="pug">
  .responses
    h3.responses__caption Ответы
    ol.responses__list
      li.response(v-for="(item, index) in items" :key="index")
        .response__view(v-if="editResponseIndex !== index")
          .response__text(@click="processEditResponse(item, index)" :class="{'response__text--correct': item.correct}") {{ item.text }}
          .response__delete(@click="processDeleteResponse(index)") удалить
        .response__edit(v-if="editResponseIndex === index")
          .response__textarea
            label(for="text") Текст
            textarea.response__text(id="text", type="text", v-model="editResponseCopy.text")
          .response__input
            input.response__correct(type="checkbox", id="correct", v-model="editResponseCopy.correct")
            label(for="correct") правильный
          .response__textarea(v-if="editResponseCopy.correct")
            label(for="hintCorrect") Подсказка (если выбрали)
            textarea.response__hint--correct(
              id="hintCorrect",
              placeholder="примечание к правильному ответу",
              v-model="editResponseCopy.hint.correct")
          .response__textarea(v-if="!editResponseCopy.correct")
            label(for="hintError") Подсказка (если выбрали)
            textarea.response__hint--error(
              id="hintError",
              placeholder="примечание к неправильному ответу",
              v-model="editResponseCopy.hint.error")
          .response__textarea(v-if="editResponseCopy.correct && multipleRightAnswers")
            label(for="hintMissing") Подсказка (если не выбрали)
            textarea.response__hint--missing(
              id="hintMissing",
              placeholder="если не выбрали",
              v-model="editResponseCopy.hint.missing")
          .response__controls
            button.response__button(@click="processCloseResponse") закрыть и сохранить ответ
    .responses__controls
      button.responses__button(@click="processCreateResponse") добавить ответ
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
  @import 'scss/core.scss';

  .responses {
    margin: 18px 0;

    @at-root {
      #{&}__list {
        @extend %list;
      }

      #{&}__button {
        @extend %button;
      }
    }
  }

  .response {
    @at-root {
      #{&}__view {
        @extend %item;
        cursor: pointer;
      }

      #{&}__text {
        margin-right: $unit;

        &--correct {
          color: $green;
        }
      }

      #{&}__delete {
        @extend %action;
      }

      #{&}__edit {
        margin: $unit 0;
      }

      #{&}__textarea {
        @extend %textareaRow;
      }

      #{&}__input {
        @extend %inputRow;
      }

      #{&}__correct {
        margin-right: $unit/2;
      }

      #{&}__button {
        @extend %button;
      }
    }
  }
</style>
