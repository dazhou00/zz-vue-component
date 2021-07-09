<template>
  <input
    type="text"
    :value="currentValue"
    @input="handleInput"
    @blur="handleBlur"
  />
</template>

<script>
import Emitter from "../../mixins/emitter";
export default {
  name: "uiImput",
  mixins: [Emitter],
  props: {
    value: {
      type: String,
      return: "",
    },
  },
  data() {
    return {
      currentValue: this.value,
    };
  },
  watch: {
    value(val) {
      this.currentValue = val;
    },
  },
  methods: {
    handleInput(event) {
      const value = event.target.value;
      this.currentValue = value;
      this.$emit("input", value);
      // 触发校验
      this.dispatch("uiFormItem", "on-form-change", value);
    },
    handleBlur() {
      // 触发校验
      this.dispatch("uiFormItem", "on-form-blur", this.currentValue);
    },
  },
};
</script>

<style></style>
