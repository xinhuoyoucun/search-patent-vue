<template>
  <div class="sui-layout">
    <SearchHeader v-model="searchInputValue" @submit="handleFormSubmit" />
    <div v-if="searchState.wasSearched" class="sui-layout-body">
      <div class="sui-layout-body__inner">
        <div class="sui-layout-sidebar">
          <SearchSort v-show="thereAreResults" v-model="sortBy" />

          <SearchFacet
            title="申请单位"
            :checked="applicant"
            :facet="searchState.facets.applicants"
            @change="handleFacetChange($event, 'applicant')"
            @getMore="getMore('applicant')"
          />

          <SearchFacet
            title="专利类型"
            :checked="patent_type"
            :facet="searchState.facets.patent_types"
            @change="handleFacetChange($event, 'patent_type')"
            @getMore="getMore('patent_type')"
          />

          <SearchFacet
            title="单位类型"
            :checked="unit_type"
            :facet="searchState.facets.unit_types"
            @change="handleFacetChange($event, 'unit_type')"
            @getMore="getMore('unit_type')"
          />
        </div>
        <div class="sui-layout-main">
          <div class="sui-layout-main-header">
            <div class="sui-layout-main-header__inner">
              <SearchPagingInfo :search-state="searchState" />
              <SearchResultsPerPage v-show="thereAreResults" v-model.number="resultsPerPage" />
            </div>
          </div>
          <div class="sui-layout-main-body">
            <SearchResults v-show="thereAreResults" :results="searchState.results" />
          </div>
          <div class="sui-layout-main-footer">
            <SearchPagination
              v-show="thereAreResults"
              :total-pages="searchState.totalPages"
              :click-handler="setCurrentPage"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchHeader from "./SearchHeader";
import SearchSort from "./SearchSort";
import SearchResults from "./SearchResults";
import SearchFacet from "./SearchFacet";
import SearchPagingInfo from "./SearchPagingInfo";
import SearchPagination from "./SearchPagination";
import SearchResultsPerPage from "./SearchResultsPerPage";

// const driver = new SearchDriver(config);

export default {
  components: {
    SearchHeader,
    SearchSort,
    SearchResults,
    SearchFacet,
    SearchPagingInfo,
    SearchPagination,
    SearchResultsPerPage,
  },
  data() {
    return {
      searchInputValue: "",
      searchState: {},
      patent_type: [],
      unit_type: [],
      applicant: [],
      patentTypeFilter: null,
      getSizeAggPatentType: 5,
      unitTypeFilter: null,
      getSizeAggUnitType: 5,
      applicantFilter: null,
      getSizeAggApplicant: 5,
      resultsPerPage: 20,
      currentPage: 1,
      sortBy: "",
    };
  },
  computed: {
    thereAreResults() {
      return this.searchState.results && this.searchState.results.length > 0;
    },
  },
  watch: {
    resultsPerPage(newResultsPerPage) {
      this.resultsPerPage = newResultsPerPage;
      this.setCurrentPage(1);
    },
    sortBy(newSortBy) {
      this.sortBy = newSortBy;
      this.setCurrentPage(1);
    },
  },
  mounted() {
    // restoring UI from url query
    this.searchInputValue = "";
    this.sortBy = "_score";
    this.resultsPerPage = 20;
    this.currentPage = 1;
  },
  methods: {
    getMore(aggField) {
      let size = 5;
      switch (aggField) {
        case "patent_type":
          this.getSizeAggPatentType += 5;
          size = this.getSizeAggPatentType;
          break;
        case "unit_type":
          this.getSizeAggUnitType += 5;
          size = this.getSizeAggUnitType;
          break;
        case "applicant":
          this.getSizeAggApplicant += 5;
          size = this.getSizeAggApplicant;
          break;
        default:
          size = 10;
          break;
      }
      this.$axios
        .get("/getMoreAgg", {
          params: {
            q: this.searchInputValue,
            size: size,
            aggField: aggField,
          },
        })
        .then((res) => {
          switch (aggField) {
            case "patent_type":
              this.searchState.facets.patent_types = res.data;
              break;
            case "unit_type":
              this.searchState.facets.unit_types = res.data;
              break;
            case "applicant":
              this.searchState.facets.applicants = res.data;
              break;
            default:
              break;
          }
        });
    },
    handleFormSubmit() {
      this.setCurrentPage(1);
      this.patent_type = [];
      this.applicant = [];
      this.unit_type = [];
      this.patentTypeFilter = null;
      this.unitTypeFilter = null;
      this.applicantFilter = null;
      this.getSizeAggPatentType = 5;
      this.getSizeAggUnitType = 5;
      this.getSizeAggApplicant = 5;
    },
    getData() {
      this.$axios
        .get("/search", {
          params: {
            q: this.searchInputValue,
            size: this.resultsPerPage,
            current: this.currentPage,
            sortBy: this.sortBy,
            applicant: this.applicantFilter,
            unitType: this.unitTypeFilter,
            patentType: this.patentTypeFilter,
          },
        })
        .then((res) => {
          this.searchState = res.data;
          this.searchState.totalResults = res.data.page.totalResults;
          this.searchState.searchTerm = this.searchInputValue;
          this.searchState.current = this.currentPage;
          this.searchState.totalPages = res.data.page.totalPages;
          this.searchState.resultsPerPage = this.resultsPerPage;
          this.searchState.facets = res.data.facets;
        });
    },
    handleFacetChange(event, facet) {
      const { value, checked } = event.target;
      if (checked) {
        this[facet].push(value);
      } else {
        const index = this[facet].indexOf(value);
        if (index > -1) {
          this[facet].splice(index, 1);
        }
      }
      switch (facet) {
        case "patent_type":
          this.patentTypeFilter = checked ? value : null;
          break;
        case "unit_type":
          this.unitTypeFilter = checked ? value : null;
          break;
        case "applicant":
          this.applicantFilter = checked ? value : null;
          break;
        default:
          break;
      }
      this.setCurrentPage(1);
    },
    setCurrentPage(page) {
      this.currentPage = page;
      this.getData();
    },
  },
};
</script>
