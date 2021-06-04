<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 style="cursor: pointer;" @click="forceUpdate" class="display-1">
          Today News
        </h1>
      </div>
      <ul class="list-group list-group-flush">
        <li
          class="list-group-item"
          v-for="newFeed in newsFeedList"
          :key="newFeed._id"
        >
          <h3>{{ newFeed.title }}</h3>
          <p>{{ newFeed.body }}</p>
          <img
            v-if="newFeed.img"
            class="img-thumbnail"
            :src="newFeed.img"
            alt=""
          />
          <p>{{ newFeed.publisher }}: {{ newFeed.source }}</p>
          <button type="button" class="btn btn-outline-primary">
            <router-link
              :to="{
                name: 'Edit',
                params: { id: newFeed._id, newFeed },
              }"
            >
              Editar noticia
            </router-link>
          </button>
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

<style scoped>
.img-thumbnail {
  max-height: 30rem;
  max-width: 30rem;
  min-height: 15rem;
  min-width: 15rem;
}
.btn {
  border-radius: 10px;
}
</style>
