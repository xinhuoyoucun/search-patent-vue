<template>
  <div class="sui-paging-info">
    从<strong>{{ searchState.totalResults }}</strong>条<em>"{{ searchState.searchTerm }}"</em>结果中展示
    <strong>{{ start }} - {{ Math.min(end, searchState.totalResults) }}</strong>
    条数据
  </div>
</template>

<script>
export default {
  props: {
    searchState: {
      required: true,
      type: Object
    }
  },
  computed: {
    start() {
      return this.searchState.totalResults === 0
        ? 0
        : (this.searchState.current - 1) * this.searchState.resultsPerPage + 1;
    },
    end() {
      return this.searchState.totalResults <= this.searchState.resultsPerPage
        ? this.searchState.totalResults
        : this.start + this.searchState.resultsPerPage - 1;
    }
  }
};
</script>
