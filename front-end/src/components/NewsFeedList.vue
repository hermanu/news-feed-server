<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 style="cursor: pointer;" @click="forceUpdate" class="display-1">
          Today News
        </h1>
        <br />
      </div>
    </div>

    <button
      class="btn btn-outline-success new-feed-button col-3"
      @click="$router.push({ name: 'New' })"
    >
      New Feed
    </button>
    <ul style="margin-top:10px;" class="list-group list-group-flush">
      <li
        class="list-group-item custom-hover-effect col-12"
        v-for="newFeed in newsFeedList"
        :key="newFeed._id"
        @click="$router.push({ name: 'Edit', params: { id: newFeed._id } })"
      >
        <h2>{{ newFeed.title }}</h2>
        <h3>{{ newFeed.body }}</h3>
        <img
          v-show="newFeed.img"
          class="img-thumbnail"
          :src="newFeed.img"
          alt=""
        />
        <h5>{{ newFeed.publisher }}: {{ newFeed.source }}</h5>
      </li>
    </ul>
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
    async function forceUpdate() {
      const baseUrl = "http://localhost:3000/feed/forceUpdate";
      let response = await axios.post(`${baseUrl}`);
      newsFeedList.value = response.data.data;
    }
    return {
      getNews,
      newsFeedList,
      forceUpdate,
    };
  },
  beforeMount() {
    this.getNews();
  },
};
</script>

<style>
.img-thumbnail {
  max-height: 30rem;
  max-width: 30rem;
  min-height: 15rem;
  min-width: 15rem;
}
.btn {
  border-radius: 10px;
}
.list-group-item {
  font-family: "Merriweather", serif;
  color: black;
  background: linear-gradient(white, white 50%, #666 50%, #666);
  background-size: 100% 202%;
  transition: all 0.2s ease;
  animation: down-bump 0.4s ease;
}
.list-group-item h2 {
  font-weight: 400;
  letter-spacing: -1.5px;
  line-height: 1.2;
}

.list-group-item h3 {
  font: 1.1em "Lucida Grande", serif;
}

.list-group-item h5 {
  font: 0.8em "Lucida Grande", serif;
}

.list-group-item:hover {
  background-position: 100% 100%;
  animation: up-bump 0.4s ease;
  cursor: pointer;
}

.list-group-item:hover h2 {
  color: white;
}
.list-group-item:hover h3 {
  color: #48ad26;
}
.list-group-item:hover h5 {
  color: #999;
}
</style>
