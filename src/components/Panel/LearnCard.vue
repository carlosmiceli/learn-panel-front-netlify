<template>
  <v-card class="LearnCard">
    <div class="card-title">
      <h4>{{ title }}</h4>
      <div>
        <v-dialog
          v-model="dialog"
          width="300"
        >
        <template v-slot:activator="{ on }">
          <v-btn
            color="red lighten-2"
            dark
            small
            v-on="on"
          >
            X
          </v-btn>
        </template>
          <p>Are you sure you want to remove this course?</p>
          <v-btn @click="removeContent(), dialog = false">Yes, remove</v-btn>
        </v-dialog>
      </div>
    </div>
    <div>
      <div id="text-card" v-if="category === 'texts'">
        <img 
          :id="id"
          @click="popupWindow()"
          :src="image"
          :alt="title"
        >
      </div>
      <div v-if="category === 'youtube'">
        <iframe
          width="100%"
          :src="videoId"
          frameborder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
        </iframe>
      </div>
    </div>
  </v-card>
</template>

<script>

export default {
  name: "LearnCard",
  props: ["id", "title", "url", "image", "videoId", "text", "category", "view"],
  data () {
    return {
      dialog: false,
      renderedText: function () {
        if (this.category === "texts") {
          let pars = document.createTextNode(this.text)
          let node = document.getElementById('text-card')
          node.appendChild(pars)
        }
      }
    }
  },
  mounted: function () {
    return this.renderedText()
  },
  methods: {
    popupWindow() {
      const y = window.top.outerHeight / 2 + window.top.screenY - 800 / 2;
      const x = window.top.outerWidth / 2 - window.top.screenX - 800;
      return window.open(
        this.url,
        this.title,
        `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${800}, height=${550}, top=${y +
          80}, left=${x}`
      );
    },
    removeContent() {
      this.$store.dispatch("removeContent", this.id);
    },
  },
};
</script>

<style>
.LearnCard {
  width: 100%;
  padding-top: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  border-top-style: solid;
  border-top-width: 1px;
  border-top-color: hsla(0, 0%, 52.67%, 1);
  border-right-style: solid;
  border-right-width: 1px;
  border-right-color: hsla(0, 0%, 52.67%, 1);
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: hsla(0, 0%, 52.67%, 1);
  border-left-style: solid;
  border-left-width: 1px;
  border-left-color: hsla(0, 0%, 52.67%, 1);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: hsla(208, 100%, 94.42%, 1);
  display: flex;
  flex-direction: column;
}

.LearnCard img {
  max-width: 100%;
  max-height: 100%;
}

.LearnCard h4 {
  padding-top: 5px;
}

.card-title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

</style>
