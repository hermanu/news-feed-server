<template>
  <div class="container">
    <div class="row">
      <div class="col">Today News Feed</div>
      <ul class="list-group">
        <li
          class="list-group-item"
          v-for="newFeed in newsFeedList"
          :key="newFeed._id"
        >
          <p>{{ newFeed.publisher }}: {{ newFeed.source }}</p>
          <h3>{{ newFeed.title }}</h3>
          <p>{{ newFeed.body }}</p>
          <img class="img-fluid" :src="newFeed.img" alt="" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
export default {
  setup() {
    let newsFeedList = ref([]);
    async function getNews() {
      const baseUrl = "http://localhost:3000";
      let response = await axios.get(`${baseUrl}/feed`);
      newsFeedList.value = response.data.data;
    }
    return {
      getNews,
      newsFeedList,
    };
  },
  beforeMount() {
    this.getNews();
  },
};
</script>
