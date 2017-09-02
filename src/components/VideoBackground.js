import React, { Component } from 'react';
import VideoCover from 'react-video-cover';

const style = {
  width: '110vw',
  height: '110vh',
  position: 'fixed',
  margin: 'auto',
  top: '-5vh',
  left: '-5vw',
  zIndex: -2,
};
class VideoBackground extends Component {

  state = {
    resizeNotifier: () => {},
  }

  render() {
    const videoOptions = {
      src: '/CoffeeShopTablet.mp4',
      autoPlay: true,
      loop: true,
      muted: true
    };

    return (
      <div style={style} >
        <VideoCover
          videoOptions={videoOptions}
          remeasureOnWindowResize
          getResizeNotifier={resizeNotifier => {
            this.setState({
              resizeNotifier,
            });
          }}
        />
      </div>
    );
  }
}

export default VideoBackground;
