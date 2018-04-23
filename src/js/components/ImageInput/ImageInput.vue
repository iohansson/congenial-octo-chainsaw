<template lang="pug">
  .image-input
    .image-input__target(
      v-if="!value"
      ref="target"
      @drop.prevent="processDrop"
      @dragover.prevent=""
    )
    img.image-input__preview(v-if="value" :src="value")
</template>
<script>
import { uploadImage } from 'api/methods';

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
    uploadImage(base64image) {
      this.busy = true;
      uploadImage(base64image)
        .then((result) => {
          this.busy = false;
          this.$emit('uploaded', result.data);
        })
        .catch((e) => {
          this.busy = false;
          console.log(e);
        });
    }
  }
}
</script>
<style lang="scss" scoped>
  .image-input {
    @at-root {
      #{&}__target {
        width: 300px;
        height: 300px;
        background-color: steelblue;
      }

      #{&}__preview {
        width: 100%;
      }
    }
  }
</style>
