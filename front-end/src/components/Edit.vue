<template>
  <div class="container">
    <button @click="$router.back()" class="btn">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="currentColor"
        class="bi bi-arrow-left-circle"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
        />
      </svg>
    </button>
    <br />

    <div class="card-group">
      <div class="card" style="width: 100%; margin-top: 15px;">
        <img
          v-show="currentFeed.img && !isEditing"
          :src="currentFeed.img"
          class="card-img-center"
          alt="..."
          style="min-width: 50%; max-width: 50%; margin: 0 auto;"
        />

        <div class="card-body" v-show="!isEditing">
          <h4 class="card-title">
            {{ currentFeed.title }}
          </h4>
          <h5 class="card-text">
            {{ currentFeed.body }}
          </h5>
          <p>{{ currentFeed.publisher }}: {{ currentFeed.source }}</p>
          <button
            v-show="!isEditing"
            @click="toggleEdit()"
            class="btn btn-outline-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-pencil"
              viewBox="0 0 16 16"
            >
              <path
                d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
              />
            </svg>
          </button>
          <button
            style="margin-left: 1rem;"
            v-show="!isEditing"
            @click="removeCurrentFeed(currentFeed)"
            class="btn btn-outline-danger"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-x-square"
              viewBox="0 0 16 16"
            >
              <path
                d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
              />
              <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </button>
        </div>

        <div id="editingInputs" v-show="isEditing">
          <label for="newFeedPublisher">Imagen</label>
          <textarea
            id="newFeedPublisher"
            v-model="currentFeed.img"
            class="form-control"
          ></textarea>

          <label for="newFeedTitle">Titulo</label>
          <textarea
            id=""
            v-model="currentFeed.title"
            class="form-control"
          ></textarea>
          <br />
          <label for="newFeedBody">Cuerpo</label>
          <textarea
            id="newFeedBody"
            v-model="currentFeed.body"
            class="form-control"
          ></textarea>

          <label for="newFeedAuthor">Autor</label>
          <textarea
            id="newFeedAuthor"
            v-model="currentFeed.source"
            class="form-control"
          ></textarea>

          <label for="newFeedPublisher">Fuente</label>
          <textarea
            id="newFeedPublisher"
            v-model="currentFeed.publisher"
            class="form-control"
          ></textarea>
          <br />
          <button @click="updateCurrentFeed()" class="btn btn-primary">
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import router from "@/router";

export default {
  props: {
    id: String,
  },
  setup(props) {
    const currentFeed = ref({});
    const isEditing = ref(Boolean);
    const baseUrl = `http://localhost:3000/feed`;

    async function getFeedById() {
      const getFeedUrl = `${baseUrl}/${props.id}`;
      const response = await axios.get(getFeedUrl);
      currentFeed.value = response.data.data;
    }

    function toggleEdit() {
      this.isEditing = !this.isEditing;
    }

    async function updateCurrentFeed() {
      const updateFeedUrl = `${baseUrl}/${props.id}`;
      const response = await axios.patch(updateFeedUrl, currentFeed.value);
      currentFeed.value = response.data.data;
      this.toggleEdit();
    }

    async function removeCurrentFeed() {
      const removeFeedUrl = `${baseUrl}/${props.id}`;
      const response = await axios.delete(removeFeedUrl, {
        data: currentFeed.value._id,
      });
      if (response.data.data.deletedCount === 1) {
        router.back();
      } else {
        console.log("wrong");
      }
    }

    return {
      getFeedById,
      currentFeed,
      toggleEdit,
      isEditing,
      updateCurrentFeed,
      removeCurrentFeed,
    };
  },
  beforeMount() {
    this.isEditing = false;
    this.getFeedById();
  },
};
</script>

<style scoped>
.btn {
  border-radius: 10px;
}
label {
  font: 1.2rem bold;
  margin-top: 1rem;
}
</style>
