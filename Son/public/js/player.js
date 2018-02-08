/**
 * Player class containing the state of our playlist and where we are in it.
 * Includes all methods for playing, skipping, updating the display, etc.
 * @param {Array} playlist Array of objects with playlist song details ({title, file, howl}).
 */
var Player = function(playlist) {
  this.playlist = playlist;
  this.index = 0;
  this.key = 'default';

};
Player.prototype = {
  /**
   * Play a song in the playlist.
   * @param  {Number} index Index of the song in the playlist (leave empty to play the first or current).
   */
  play: function(key, index) {
    var self = this;
    var sound;
	var status = $('#audio_status');

	key = typeof key === 'string' ? key : self.key;
	key = key in self.playlist ? key : 'default'
	index = typeof index === null ? Math.random() * length(self.playlist[key]): index;
    index = typeof index === 'number' ? index : self.index;
	
    var data = self.playlist[key][index];

    // If we already loaded this track, use the current one.
    // Otherwise, setup and load a new Howl.
    if (data.howl) {
      sound = data.howl;
    } else {
      sound = data.howl = new Howl({
        src: [data],
        html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
        onend: function() {
			console.log('Finished!');
			status.data("status", 'ready');
		},
		onplay: function() {
			console.log('Playing sound...');	
		},
		onstop: function() {
			console.log('Stop sound.');
			status.data("status", 'ready');
		},
		onpause: function() {
			console.log('sound paused.');
			status.data("status", 'ready');
		}
      });
    }

    // Begin playing the sound.
    sound.play();

    // Keep track of the index we are currently playing.
    self.index = index;
	self.key = key;
  },

  /**
   * Pause the currently playing track.
   */
  pause: function() {
    var self = this;

    // Get the Howl we want to manipulate.
    var sound = self.playlist[self.key][self.index].howl;

    // Pause the sound.
    sound.pause();

  },

  /**
   * Skip to a specific track based on its playlist index.
   * @param  {Number} index Index in the playlist.
   */
  skipTo: function(key, index) {
    var self = this;

    // Stop the current track.
    if (self.playlist[self.key][self.index].howl) {
      self.playlist[self.key][self.index].howl.stop();
    }

    // Play the new track.
    self.play(key, index);
  }
};