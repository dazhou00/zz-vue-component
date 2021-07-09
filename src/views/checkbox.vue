<template>
  <div>
    <h3>组合多选框组件——CheckboxGroup & Checkbox</h3>

    <ui-checkbox v-model="single">单独选项</ui-checkbox>

    <br />
    数据：{{ single }}

    <br /><br />

    <ui-checkbox-group v-model="multiple">
      <ui-checkbox label="option1">选项 1</ui-checkbox>
      <ui-checkbox label="option2">选项 2</ui-checkbox>
      <ui-checkbox label="option3">选项 3</ui-checkbox>
      <ui-checkbox label="option4">选项 4</ui-checkbox>
    </ui-checkbox-group>

    <br />
    数据：{{ multiple }}
  </div>
</template>
<script>
import uiCheckboxGroup from "../components/checkbox/checkbox-group.vue";
import uiCheckbox from "../components/checkbox/checkbox.vue";
export default {
  components: { uiCheckboxGroup, uiCheckbox },
  data() {
    return {
      single: false,
      multiple: ["option1"],
    };
  },
};
</script>
