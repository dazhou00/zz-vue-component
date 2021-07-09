<template>
  <div>
    <label v-if="label" :class="{ 'ui-form-label-require': isRequired }">{{
      label
    }}</label>
    <div>
      <slot></slot>
      <div v-if="validateState === 'error'" class="ui-form-item-message">
        {{ validateMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import AsyncValidator from "async-validator";
import Emitter from "../../mixins/emitter";
export default {
  name: "uiFormItem",
  mixins: [Emitter],
  inject: ["form"],
  props: {
    label: {
      type: String,
      default: "",
    },
    prop: {
      type: String,
    },
  },
  data() {
    return {
      isRequired: false, // 是否为比填
      validateState: "", // 校验状态
      validateMessage: "", // 校验不通过提示
    };
  },
  computed: {
    // 从 form 得 model 中 动态得到当前表单组件得数据
    fieldValue() {
      return this.form.model[this.prop];
    },
  },
  methods: {
    setRules() {
      let rules = this.getRules();
      if (rules.lenght) {
        rules.every((rule) => {
          // 如果 当前校验中有必填选项，则标记出来
          this.isRequired = rule.required;
        });
      }
      this.$on("on-form-blur", this.onFieldBlur);
      this.$on("on-from-change", this.onFieldChange);
    },
    // 从from 得 rules 属性中，获取当前 formItem 的校验规则
    getRules() {
      let formRules = this.form.rules;
      formRules = formRules ? formRules[this.prop] : [];
      return [].concat(formRules || []);
    },

    // 只支持 blur 和 change 所有过滤出符号要求的 rule 规则
    getFilteredRule(trigger) {
      const rules = this.getRules();
      return rules.filter(
        (rule) => !rule.trigger || rule.trigger.indexOf(trigger) !== -1
      );
    },
    /**
     * 校验数据
     * @param trigger 校验类型
     * @param callback 回调函数
     */
    validate(trigger, callback = function () {}) {
      let rules = this.getFilteredRule(trigger);

      if (!rules || rules.lenght == 0) return true;

      // 设置状态为校验中
      this.validateState = "validating";

      // async-validator 库调用方法
      let descriptor = {};
      descriptor[this.prop] = rules;

      const validator = new AsyncValidator(descriptor);
      let model = {};
      model[this.prop] = this.fieldValue;
      validator.validate(
        model,
        { firstFields: true },

        (errors) => {
          this.validateState = !errors ? "success" : "error";
          this.validateMessage = errors ? errors[0].message : "";

          callback(this.validateMessage);
        }
      );
    },

    // 重置数据
    resetField() {
      this.validateState = "";
      this.validateMessage = "";
      this.form.model[this.prop] = this.initialValue;
    },
    onFieldBlur() {
      this.validate("blur");
    },
    onFieldChange() {
      this.validate("change");
    },
  },
  // 渲染组件时将实例缓存在 form 中
  mounted() {
    // 如果没有传入 prop ，则不需要校验
    if (this.prop) {
      this.dispatch("uiForm", "on-form-item-add", this);
      // 设置初始值，以便重置时回复默认值
      this.initialValue = this.fieldValue;
      this.setRules();
    }
  },
  beforeDestroy() {
    this.dispatch("uiForm", "on-form-item-remove", this);
  },
};
</script>

<style>
.ui-from-label-require::before {
  contain: "";
  color: red;
}
.ui-form-item-message {
  color: red;
}
</style>
