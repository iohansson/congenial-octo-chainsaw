<template lang="pug">
  .image-input
    .image-input__target(
      v-if="!value"
      ref="target"
      @drop.prevent="processDrop"
      @dragover.prevent=""
    )
      span.image-input__target-text(v-if="!busy") перетащите картинку сюда
      spinner(v-else)
    .image-input__input(v-if="!value && !busy")
      label(for="url") или вставьте URL картинки
      input.image-input__url(id="url" @input="processUrlInput")
    img.image-input__preview(v-if="value" :src="value")
</template>
<script>
import { uploadImage } from 'api/methods';
import Spinner from 'Spinner/Spinner.vue';

export default {
  name: 'ImageInput',
  data() { return {
    imageSrc: '',
    busy: false
  }; },
  props: {
    value: {
      type: String,
      required: false,
      default: null
    }
  },
  methods: {
    processDrop(event) {
      const transfer = event.dataTransfer;
      const reader = new FileReader();
      const files = transfer.files;
      reader.addEventListener('load', (e) => {
        const base64image = e.target.result;
        this.uploadImage(base64image);
      });
      for (let i = 0; i < files.length; i++) {
        reader.readAsDataURL(files[i]);
      }
    },
    processUrlInput(event) {
      this.uploadImage(event.target.value);
    },
    uploadImage(image) {
      this.busy = true;
      uploadImage(image)
        .then((result) => {
          this.busy = false;
          this.$emit('uploaded', result.data);
        })
        .catch((e) => {
          this.busy = false;
          console.log(e);
        });
    }
  },
  components: {
    Spinner,
  },
}
</script>
<style lang="scss" scoped>
  @import 'scss/core.scss';

  .image-input {
    @at-root {
      #{&}__target {
        width: 100%;
        min-height: 300px;
        background-color: $greenMedium;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: $unit;
      }

      #{&}__input {
        label {
          margin-right: $unit/2;
        }
      }

      #{&}__preview {
        width: 100%;
      }
    }
  }
</style>
