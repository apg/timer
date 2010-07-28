/**
 * (c) 2010, Andrew Gwozdziewycz, GPL licensed, see LICENSE
 */

var Timer = function(time, e, b) {
  this.length = time;
  this.element = e;
  this.background = b;

  this._interval = null;
  this._status = Timer.c.STOPPED;
  this._timeleft = time;
  this._lasttick = null;

  this.init();
  this.reset();
};

Timer.c = {
  'STOPPED': 0,
  'PAUSED': 1,
  'PLAYING': 2
};

Timer.cr = {
  0: 'STOPPED',
  1: 'PAUSED',
  2: 'PLAYING'
};

Timer.prototype = {
  'init': function() {
    // install the handlers
    var that = this;
    $(this.element).click(function (e) {
      that.onclick(e);
    });
    $(this.element).dblclick(function (e) {
      that.ondblclick(e);
    });
    this.displayTimeFor(this._timeleft);
  },
  'reset': function() {
    this._interval = null;
    this._status = Timer.c.STOPPED;
    this._timeleft = this.length;
    this._lasttick = null;
  },
  'onclick': function(e) {
    if (this._status == Timer.c.STOPPED ||
        this._status == Timer.c.PAUSED) {
      this.play();
    }
    else {
      this.pause();
    }
  },
  'ondblclick': function(e) {
    this.reset();
    this.stop();
  },
  'ontick': function() {
    var tick = this.getTime();
    if (tick > this._lasttick) {
      this._timeleft--;
    }

    this._lasttick = tick;

    if (this._timeleft <= 0) {
      document.getElementById('sound').play();
      this.pause();
    }

    this.displayTimeFor(this._timeleft);
  },
  'play': function() {
    this._status = Timer.c.PLAYING;
    // establish the interval at .2 seconds
    var that = this;
    this._interval = setInterval(function() { that.ontick(); }, 200);
    this._lasttick = this.getTime();
  },
  'pause': function() {
    this._status = Timer.c.PAUSED;
    clearInterval(this._interval);
  },
  'stop': function() {
    this._status = Timer.c.STOPPED;
    if (this._interval) {
      clearInterval(this._interval);
    }
    this.displayTimeFor(this.length);
  },
  'displayTimeFor': function(t) {
    var minutes = Math.floor(t / 60);
    var seconds = t % 60;
    var text = minutes + ':' + (seconds < 10? '0' + seconds: seconds);

    if (t < 60) {
      this.background.attr('class', 'warning');
    }
    else if (t >= 60) {
      this.background.attr('class', 'ok');
    }

    if (t < 10) {
      this.element.attr('class', 'ohshit ' + Timer.cr[this._status].toLowerCase());
    }
    else {
      this.element.attr('class', Timer.cr[this._status].toLowerCase());
    }


    $(this.element).text(text);
  },
  'getTime': function() {
    return Math.floor((new Date()).getTime() / 1000);
  }
};

jQuery(document).ready(function($) {
  var hash = window.location.hash.substring(1);
  var mins = parseInt(hash) > 0? parseInt(hash): 5;
  new Timer(10 * mins, $('#timer'), $('#wrapper'));
  $('#timer').fit({width: $(window).width(), height: $(window).height()});

  $(window).resize(function() {
    $('#timer').fit({width: $(window).width(), height: $(window).height()});
  });
});

