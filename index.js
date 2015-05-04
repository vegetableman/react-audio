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
  getDefaultProps() {
    return {
      play: false,
      onPause: function() {},
      onPlay: function() {},
      onEnd: function() {},
      onTimeUpdate: function() {},
      onLoadedMetaData: function() {}
    };
  },
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.play !== this.props.play;
  },
  componentDidUpdate() {
    if(this.props.play) {
      this.audioEl.play();
    } else {
      this.audioEl.pause();
    }
  },
  render() {
    return <div>
      <audio ref='audio' preload="auto">
        <source src={this.props.src}></source>
      </audio>
    </div>
  },
  componentDidMount() {
    this.audioEl = this.refs.audio.getDOMNode();
    attachEvents(this.audioEl, {
      ended: this.props.onEnd,
      pause: this.props.onPause,
      play: this.props.onPlay,
      timeupdate: this.props.onTimeUpdate,
      loadedmetadata: this.props.onLoadedMetaData,
    });
  },
  componentWillUnmount() {
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