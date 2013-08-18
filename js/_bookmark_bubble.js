/*
# 
#  wrapper script
#
*/


(function() {
  var bubble, klass;

  klass = google.bookmarkbubble.Bubble;

  klass.prototype.PARAMETER = '#mbb';

  klass.prototype.INNER_HTML = 'Install this web app on your phone: tap on the arrow and then <b>\'Add to Home Screen\'</b>';

  klass.prototype.INNER_HTML_OLD = 'Install this web app on your phone: tap <b style="font-size:15px">+</b> and then <b>\'Add to Home Screen\'</b>';

  klass.prototype.CLASSNAME_BUBBLE = 'mobile_bookmark_bubble';

  klass.prototype.CLASSNAME_BUBBLE_INNER = 'mobile_bookmark_bubble_inner';

  klass.prototype.CLASSNAME_BUBBLE_INNER_IPAD = 'mobile_bookmark_bubble_inner_ipad';

  klass.prototype.CLASSNAME_BUBBLE_ICON = 'mobile_bookmark_bubble_icon';

  klass.prototype.CLASSNAME_BUBBLE_ARROW = 'mobile_bookmark_bubble_arrow';

  klass.prototype.CLASSNAME_BUBBLE_ARROW_IPAD = 'mobile_bookmark_bubble_arrow_ipad';

  klass.prototype.CLASSNAME_BUBBLE_CLOSE = 'mobile_bookmark_bubble_close';

  klass.prototype.hasHashParameter = function() {
    return location.hash.indexOf(this.PARAMETER) !== -1;
  };

  klass.prototype.setHashParameter = function() {
    if (!this.hasHashParameter()) {
      return location.hash += this.PARAMETER;
    }
  };

  klass.prototype.getViewportHeight = function() {
    return innerHeight;
  };

  klass.prototype.getViewportScrollY = function() {
    return pageYOffset;
  };

  klass.prototype.registerScrollHandler = function(handler) {
    return addEventListener('scroll', handler, false);
  };

  klass.prototype.deregisterScrollHandler = function(handler) {
    return removeEventListener('scroll', handler, false);
  };

  klass.prototype.build_ = function() {
    var arrow, bubble, bubbleInner, close, icon, isIpad;
    isIpad = this.isIpad_();
    bubble = document.createElement('div');
    bubble.className = this.CLASSNAME_BUBBLE;
    bubbleInner = document.createElement('div');
    bubbleInner.className = isIpad ? this.CLASSNAME_BUBBLE_INNER_IPAD : this.CLASSNAME_BUBBLE_INNER;
    bubble.appendChild(bubbleInner);
    bubbleInner.innerHTML = this.getIosVersion_() >= this.getVersion_(4, 2) ? this.INNER_HTML : this.INNER_HTML_OLD;
    icon = document.createElement('div');
    icon.className = this.CLASSNAME_BUBBLE_ICON;
    icon.style.background = '#fff url(' + this.getIconUrl_() + ') no-repeat -1px -1px';
    bubbleInner.insertBefore(icon, bubbleInner.firstChild);
    arrow = document.createElement('div');
    arrow.className = isIpad ? this.CLASSNAME_BUBBLE_ARROW_IPAD : this.CLASSNAME_BUBBLE_ARROW;
    bubbleInner.appendChild(arrow);
    close = document.createElement('a');
    close.className = this.CLASSNAME_BUBBLE_CLOSE;
    close.onclick = google.bind(this.closeClickHandler_, this);
    bubbleInner.appendChild(close);
    return bubble;
  };

  bubble = new klass;

  addEventListener('load', function() {
    return setTimeout((function() {
      return bubble.showIfAllowed();
    }), 1000);
  });

}).call(this);
