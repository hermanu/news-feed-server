<template>
  <form @submit.prevent="createNewFeed">
    <div class="form-group">
      <label for="newFeedTitle">Titulo de la noticia</label>
      <input
        v-model="newFeed.title"
        type="text"
        class="form-control"
        id="newFeedTitle"
        placeholder="Introduce un titulo"
      />

      <label for="newFeedBody">Cuerpo de la noticia</label>
      <input
        v-model="newFeed.body"
        type="text"
        class="form-control"
        id="newFeedBody"
        placeholder="Introduce el cuerpo de la noticia"
      />

      <label for="newFeedImg">Imagen de la noticia</label>
      <input
        v-model="newFeed.img"
        type="text"
        class="form-control"
        id="newFeedImg"
        placeholder="Introduce la URL de la imagen"
      />

      <label for="newFeedSource">Author de la noticia</label>
      <input
        v-model="newFeed.source"
        type="text"
        class="form-control"
        id="newFeedSource"
        placeholder="Introduce el nombre del autor"
      />

      <label for="newFeedPublisher">Nombre del periodico</label>
      <input
        v-model="newFeed.publisher"
        type="text"
        class="form-control"
        id="newFeedPublisher"
        placeholder="Introduce el nombre del periodico"
      />
    </div>
    <br />
    <button type="submit" class="btn btn-primary ">
      Guardar
    </button>

    <button
      class="btn btn-outline-primary "
      @click="$router.push({ name: 'NewsFeedList' })"
    >
      Go Home
    </button>
  </form>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
export default {
  setup() {
    const baseUrl = `http://localhost:3000/feed`;
    const newFeed = ref({});
    async function createNewFeed() {
      const response = await axios.post(baseUrl, newFeed.value);
      if (response.data.data) newFeed.value = {};
    }
    return {
      newFeed,
      createNewFeed,
    };
  },
};
</script>
