<template>
  <article class="search-result">
    <div v-if="result.highlight.name" class="search-result__heading" v-html="result.highlight.name"></div>
    <div v-else class="search-result__heading">{{result.name}}</div>
    <div class="search-result__body">
      <div class="search-result__data">
        <div v-if="result.inventor"><strong>发明人: </strong>{{ result.inventor }}</div>
        <div v-if="result.applicant"><strong>申请单位（人）: </strong>{{ result.applicant }}</div>
        <div v-if="result.publicationDate">
          <strong>公开时间: </strong>{{ result.publicationDate }}
        </div>
      </div>
    </div>
    <p v-if="result.highlight.abstractStr"  class="search-result__flavor"><strong>摘要：</strong><span v-html="result.highlight.abstractStr"></span></p>
    <p v-else class="search-result__flavor"><strong>摘要：</strong><span v-html="result.abstractStr"></span></p>
  </article>
</template>

<script>
export default {
  props: {
    result: {
      type: Object,
      required: true,
    },
  },
  methods: {
    imageSrc(id) {
      return `https://art.hearthstonejson.com/v1/render/latest/enUS/512x/${id}.png`;
    },
  },
};
</script>

<style scoped>
.search-result {
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  /* align-items: center; */
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.search-result__heading {
  text-align: center;
  margin: 0;
}

.search-result__body {
  display: flex;
  justify-content: flex-start;
  align-self: flex-start;
}

.search-result__data {
  padding-top: 50px;
}

.search-result__flavor {
  margin: 0;
}

.search-result__image {
  flex: none;
  width: 256px;
  height: 387px;
}
</style>
