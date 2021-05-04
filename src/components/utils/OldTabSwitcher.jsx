import React, {PureComponent} from 'react';
import posed from 'react-pose';
import {value, spring} from 'popmotion';
import debounce from 'lodash/debounce';

const VELOCITY_THRESHOLD = 600;
const DISTANCE_PERCENTILE_THRESHOLD = 0.3;

const Draggable = posed.div({
  draggable: 'x',
  rest: {
    x: ({offset}) => -offset,
    transition: {ease: 'easeOut', duration: 500}
  },
  dragEnd: {
    transition: ({from, to, velocity, offset}) =>
      spring({from, to: -offset, velocity})
  }
});

const draggableStyle = {
  display: 'flex',
  height: '100%',
  flexWrap: 'nowrap',
  width: '100%',
  flex: 'none'
};

function bbox(root, index) {
  const el = root.children[index];

  return {
    offset: el.offsetLeft,
    width: root.offsetWidth
  };
}

export default class PopSlideCarousel extends PureComponent {
  static defaultProps = {
    duration: 3000,
    onDragStart() {},
    onDragEnd() {},
    onTransitionEnd() {}
  };

  static getDerivedStateFromProps({visibleIndex}, {root}) {
    return root ? bbox(root, visibleIndex) : null;
  }

  x = value(0);

  constructor(props) {
    super(props);
    this.adjustCurrentBox = debounce(this.adjustCurrentBox, 250);
  }

  state = {
    root: null,
    offset: 0,
    width: 0
  };

  preventClick = false;

  onDragEnd = e => {
    const {offset, width} = this.state;
    const start = -offset;
    const distance = this.x.get() - start;
    const velocity = this.x.getVelocity();

    if (distance !== 0) {
      // prevents click from firing in onClickCapture
      this.preventClick = true;

      const threshold = DISTANCE_PERCENTILE_THRESHOLD * width;

      console.log(
        'to',
        {distance, threshold, velocity, width},
        -distance,
        -threshold
      );

      if (-distance > -threshold || velocity < -VELOCITY_THRESHOLD) {
        this.goToNextSlide();
      } else if (distance > threshold || velocity > VELOCITY_THRESHOLD)
        this.goToPreviousSlide();
    }
    //
    // this.props.onDragEnd();
  };

  adjustCurrentBox = () => {
    const {visibleIndex} = this.props;
    const {root} = this.state;
    this.setState(bbox(root, visibleIndex));
  };

  goToNextSlide = () => {
    this.goToSlide(this.props.visibleIndex + 1);
  };

  goToPreviousSlide = () => {
    this.goToSlide(this.props.visibleIndex - 1);
  };

  goToSlide = newSlideIndex => {
    const {children} = this.props;
    if (newSlideIndex >= 0 && newSlideIndex < children.length) {
      this.props.onSlideChange(newSlideIndex);
    }
  };

  registerRootElement = root => {
    if (root && !this.state.root) {
      console.log('root', root);
      const {visibleIndex} = this.props;
      this.setState({
        root,
        ...bbox(root, visibleIndex)
      });
    }
  };

  render() {
    const {children, className, style} = this.props;
    const {offset, width} = this.state;
    const valuesMap = {x: this.x};

    return (
      <div
        className={`${className} overflow-hidden relative `}
        style={style}>
        <Draggable
          ref={this.registerRootElement}
          onDragEnd={this.onDragEnd}
          values={valuesMap}
          offset={offset}
          style={draggableStyle}
          poseKey={offset}
          pose="rest">
          {React.Children.map(children, d => (
            <div className="flex-none p-1" style={{width}}>
              {d}
            </div>
          ))}
        </Draggable>
      </div>
    );
  }
}
