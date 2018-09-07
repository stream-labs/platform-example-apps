<template>
  <div class="widget">
    <transition name="fade">
      <div v-if="showFollow()">
        <img src="https://vignette.wikia.nocookie.net/wowwiki/images/5/55/Druid_crest.png/revision/latest?cb=20130813094831"/>
        <div class="text">
          <span style="color:green;font-weight: 700">{{ follower.name }}</span> is now following
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      follower: null,
      // init default link
      audio: new Audio("https://wow.zamimg.com/wowsounds/556556"),
      interval: null,
      followListener: null,
      messageListener: null,
    };
  },

  methods: {
    showFollow() {
      return this.follower != null;
    }
  },

  mounted() {
    const streamlabs = window.Streamlabs;

    streamlabs.init({ receiveEvents: true })
      .then(data => {
        streamlabs.userSettings.get('audioLink')
          .then(audioLink => {
            // audioLink can be null if no data with this key
            if (audioLink) {
              this.audio = new Audio(audioLink);
            }
          });
      });

    // play audio file on follow event
    this.followListener = streamlabs.onFollow(event => {
      if (this.interval) {
        clearTimeout(this.interval);
      }
      this.follower = event.message[0];
      this.audio.play();
      this.interval = setTimeout(() => { this.follower = null; }, 3000);
    });

    // we are going to receive new audio links in real-time - no need to restart our widget
    this.messageListener = streamlabs.onMessage(message => {
      switch(message.type) {
        case 'audioLink':
          console.log('link received');
          this.audio = new Audio(message.data.link);
          break;
        default:
          console.log('unknown type: ' + message.type);
      }
    });

  },

  // dont forget to clear listeners in multi-views app
  // here is no need for this, just for example
  beforeDestroy() {
    window.Streamlabs.clear(this.followListener);
    window.Streamlabs.clear(this.messageListener);
    if (this.interval) {
      clearTimeout(this.interval);
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
.widget {
  text-align: center;
  margin-top: 10vh;
}

.text {
  font-size: 14px;
  color: orange;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter {
  opacity: 0;
} 
.fade-enter-to {
  opacity: 1;
}

.fade-leave {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
}
</style>
