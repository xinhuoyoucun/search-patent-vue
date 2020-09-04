<template>
  <div class="sui-sorting">
    <div class="sui-sorting__label">排序</div>
    <select
      name="sortBy"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
      <option value="_score">相关度</option>
      <option value="publication_date">公开时间</option>
      <option value="application_date">申请时间</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  }
};
</script>
