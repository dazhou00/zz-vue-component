<template>
  <div>
    <h3>具有校验功能得表单组件</h3>
    <ui-form ref="form" :model="form" :rules="rules">
      <ui-form-item label="用户名" prop="name">
        <ui-input v-model="form.name"></ui-input>
      </ui-form-item>
      <ui-form-item label="邮箱" prop="mail">
        <ui-input v-model="form.mail"></ui-input>
      </ui-form-item>
    </ui-form>
  </div>
</template>

<script>
import uiForm from "../components/form/from.vue";
import uiFormItem from "../components/form/form-item.vue";
import uiInput from "../components/input/input.vue";
export default {
  name: "",
  components: {
    uiForm,
    uiFormItem,
    uiInput,
  },
  data() {
    return {
      form: {
        name: "",
        mail: "",
      },
      rules: {
        name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        mail: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" },
        ],
      },
    };
  },
};
</script>

<style></style>
