var React = require('react');
var domEvents = require('attach-dom-events');

var attachEvents = domEvents.on;
var detachEvents = domEvents.off;
var PropTypes = React.PropTypes;

module.exports = React.createClass({
  displayName: 'Audio',
  propTypes: {
    play: PropTypes.bool.isRequired,
    src: PropTypes.string.isRequired,
    onPause: PropTypes.func,
    onPlay: PropTypes.func,
    onEnd: PropTypes.func,
    onTimeUpdate: PropTypes.func,
    onLoadedMetaData: PropTypes.func
  },
  getDefaultProps:function() {
    return {
      play: false,
      onPause: function() {},
      onPlay: function() {},
      onEnd: function() {},
      onTimeUpdate: function() {},
      onLoadedMetaData: function() {}
    };
  },
  shouldComponentUpdate:function(nextProps, nextState) {
    return nextProps.play !== this.props.play;
  },
  componentDidUpdate:function() {
    if(this.props.play) {
      this.audioEl.play();
    } else {
      this.audioEl.pause();
    }
  },
  render:function() {
    return React.createElement("div", null, 
      React.createElement("audio", {ref: "audio", preload: "auto"}, 
        React.createElement("source", {src: this.props.src})
      )
    )
  },
  componentDidMount:function() {
    this.audioEl = this.refs.audio.getDOMNode();
    attachEvents(this.audioEl, {
      ended: this.props.onEnd,
      pause: this.props.onPause,
      play: this.props.onPlay,
      timeupdate: this.props.onTimeUpdate,
      loadedmetadata: this.props.onLoadedMetaData,
    });
  },
  componentWillUnmount:function() {
    detachEvents(this.audioEl, {
      ended: this.props.onEnd,
      pause: this.props.onPause,
      play: this.props.onPlay,
      timeupdate: this.props.onTimeUpdate,
      loadedmetadata: this.props.onLoadedMetaData,
    });
    this.audioEl = null;
  }
})