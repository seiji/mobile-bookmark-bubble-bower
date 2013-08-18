###
# 
#  wrapper script
# 
###
klass = google.bookmarkbubble.Bubble

klass::PARAMETER                   = '#mbb'
klass::INNER_HTML                  = 'Install this web app on your phone: tap on the arrow and then <b>\'Add to Home Screen\'</b>'
klass::INNER_HTML_OLD              = 'Install this web app on your phone: tap <b style="font-size:15px">+</b> and then <b>\'Add to Home Screen\'</b>'
klass::CLASSNAME_BUBBLE            = 'mobile_bookmark_bubble'
klass::CLASSNAME_BUBBLE_INNER      = 'mobile_bookmark_bubble_inner'
klass::CLASSNAME_BUBBLE_INNER_IPAD = 'mobile_bookmark_bubble_inner_ipad'
klass::CLASSNAME_BUBBLE_ICON       = 'mobile_bookmark_bubble_icon'
klass::CLASSNAME_BUBBLE_ARROW      = 'mobile_bookmark_bubble_arrow'
klass::CLASSNAME_BUBBLE_ARROW_IPAD = 'mobile_bookmark_bubble_arrow_ipad'
klass::CLASSNAME_BUBBLE_CLOSE      = 'mobile_bookmark_bubble_close'

klass::hasHashParameter = () ->
  return location.hash.indexOf(this.PARAMETER) != -1

klass::setHashParameter = () ->
  if !this.hasHashParameter()
    location.hash += this.PARAMETER

klass::getViewportHeight = () ->
  return innerHeight

klass::getViewportScrollY = () ->
  return pageYOffset

klass::registerScrollHandler = (handler) ->
  addEventListener 'scroll', handler, false

klass::deregisterScrollHandler = (handler) ->
  removeEventListener 'scroll', handler, false

klass::build_  = () ->
  isIpad = this.isIpad_()

  bubble = document.createElement 'div'
  bubble.className = this.CLASSNAME_BUBBLE

  bubbleInner = document.createElement 'div'
  bubbleInner.className = if isIpad then this.CLASSNAME_BUBBLE_INNER_IPAD else this.CLASSNAME_BUBBLE_INNER
  bubble.appendChild bubbleInner
  bubbleInner.innerHTML = if this.getIosVersion_() >= this.getVersion_(4, 2) then this.INNER_HTML else this.INNER_HTML_OLD

  icon = document.createElement 'div'
  icon.className = this.CLASSNAME_BUBBLE_ICON
  icon.style.background = '#fff url(' + this.getIconUrl_() + ') no-repeat -1px -1px'
  bubbleInner.insertBefore(icon, bubbleInner.firstChild)

  arrow = document.createElement 'div'
  arrow.className = if isIpad then this.CLASSNAME_BUBBLE_ARROW_IPAD else this.CLASSNAME_BUBBLE_ARROW
  bubbleInner.appendChild arrow

  close = document.createElement 'a'
  close.className = this.CLASSNAME_BUBBLE_CLOSE
  close.onclick = google.bind(this.closeClickHandler_, this)
  bubbleInner.appendChild close

  return bubble

bubble = new klass
addEventListener 'load', ->
  setTimeout (->
    bubble.showIfAllowed()
  ), 1000
