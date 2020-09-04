<template>
  <div v-show="facet.length" class="sui-multi-checkbox-facet sui-facet">
    <div class="sui-multi-checkbox-facet__label">{{ title }}</div>
    <div class="sui-multi-checkbox-facet__options-list">
      <label
        v-for="facetItem in facet"
        :key="getValue(facetItem)"
        class="sui-multi-checkbox-facet__option-label"
      >
        <div class="sui-multi-checkbox-facet__option-input-wrapper">
          <input
            class="sui-multi-checkbox-facet__checkbox"
            type="checkbox"
            :value="getValue(facetItem)"
            :checked="isChecked(getValue(facetItem))"
            @change="$emit('change', $event)"
          />
          <span class="sui-multi-checkbox-facet__input-text">
            {{
            getLabel(facetItem, title)
            }}
          </span>
        </div>
        <span class="sui-multi-checkbox-facet__option-count">
          {{
          facetItem.count
          }}
        </span>
      </label>
    </div>
    <div class="right" @click="$emit('getMore')" v-if="title=='申请单位'">
      更多
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    facet: {
      type: Array,
      required: true,
    },
    checked: {
      type: Array,
      required: true,
    },
  },
  methods: {
    isChecked(value) {
      return this.checked && this.checked.includes(value);
    },
    getValue(facetItem) {
      return facetItem.value;
    },
    getLabel(facetItem, title) {
      if (title === "专利类型") {
        //1代表发明专利，2代表实用新型，3代表外观设计，8代表中国国家阶段的PCT发明专利申请，9代表中国国家阶段的PCT实用新型专利申请，4代表其他
        switch (facetItem.value) {
          case "1":
            return "发明专利";
          case "2":
            return "实用新型";
          case "3":
            return "外观设计";
          case "8":
            return "中国国家阶段的PCT发明专利申请";
          case "9":
            return "中国国家阶段的PCT实用新型专利申请";
          default:
            return "其他类型";
        }
      }
      if (title === "单位类型") {
        switch (facetItem.value) {
          case "01":
            return "高校院所";
          case "02":
            return "科研院所";
          case "03":
            return "企业";
          case "04":
            return "党政机关";
          case "05":
            return "高校变更前";
          case "06":
            return "高校附属机构";
          case "07":
            return "军队系统";
          case "08":
            return "医院";
          default:
            return "其他";
        }
      } else {
        return facetItem.value;
      }
    },
  },
};
</script>

<style scoped>
.right{
  color: blue;
  text-align: right;
}
</style>