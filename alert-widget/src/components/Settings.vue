<template>
  <div >
    <p>Enter http link to the audio file and press <i>Save</i></p>
    <p>This link will be save in a user profile and propagated to the widget page in realtime</p>
    <div>
      <input name="link" class="input" v-model="link" placeholder="Enter http link to audio file"/>
      <button class="button" @click="save" :disabled="!initCompleted">Save</button>
    </div>
    <p style="color:red" v-show="notice">{{ notice }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      initCompleted: false,
      link: null,
      notice: null,
    }
  },

  mounted() {
    const streamlabs = window.Streamlabs;
    streamlabs.init({ receiveEvents: true })
      .then(data => {
        this.initCompleted = true;
        // fetch user settings from storage
        streamlabs.userSettings.get('audioLink')
          .then(link => {
            this.link = link;
          });
      });
  },

  methods: {
    save() {
      if (!this.link) {
        this.notice = "Paste http link before click on save";
        return;
      }
      this.notice = null;
      const streamlabs = window.Streamlabs;
      // save settings in user profile and then fire an event
      streamlabs.userSettings.set('audioLink', this.link)
        .then(_ => {
          this.notice = 'Saved';
          streamlabs.postMessage('audioLink', { link: this.link });
        });
    }
  }
}
</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
}
</style>

<style scoped>
.input {
  width: 20vw;
  border-radius: 3px;
  border: 1px solid;
  padding: 5px;
}

.button {
  background-color: #32c3a2;
  border-radius: 3px;
  border: 0px;
  padding: 6px 15px;
  margin-left: 8px;
  color: #eef1f2;
}

</style>