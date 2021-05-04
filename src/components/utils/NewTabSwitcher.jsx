import React, {useEffect, useState} from 'react';
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

export default function PopSlideCarousel(props) {
  const {
    children,
    visibleIndex,
    onSlideChange,
    className,
    style
  } = props;
  const x = value(0);

  const [bbox, setBBox] = useState({width: 0, height: 0, root: null});

  const ref = React.useRef();

  function getBBox() {
    const cur = ref.current;
    const el = cur.children[visibleIndex];

    return {
      offset: el.offsetLeft,
      width: cur.offsetWidth
    };
  }

  let preventClick;

  const adjustCurrentBox = () => {};

  const goToSlide = newSlideIndex => {
    console.log('slidechange', newSlideIndex);
    if (newSlideIndex >= 0 && newSlideIndex < children.length) {
      onSlideChange(newSlideIndex);
    }
  };

  const goToNextSlide = () => {
    goToSlide(visibleIndex + 1);
  };

  const goToPreviousSlide = () => {
    goToSlide(visibleIndex - 1);
  };

  useEffect(() => {
    debounce(() => setBBox({...getBBox()}, 250));
  }, []);

  // const preventClick = false;

  const onDragEnd = e => {
    const start = -bbox.offset;
    const distance = x.get() - start;
    const velocity = x.getVelocity();

    console.log('bbox', bbox);
    if (distance !== 0) {
      // prevents click from firing in onClickCapture
      preventClick = true;

      const threshold = DISTANCE_PERCENTILE_THRESHOLD * bbox.width;
      if (-distance > -threshold || velocity < -VELOCITY_THRESHOLD) {
        goToNextSlide();
      } else if (distance > threshold || velocity > VELOCITY_THRESHOLD)
        goToPreviousSlide();
    }
    //
    // this.props.onDragEnd();
  };

  // const registerRootElement = root => {
  //   if (root && !bbox.root) {
  //     setBBox({root, ...getBBox(root, visibleIndex)});
  //   }
  // };

  return (
    <div
      className={`${className} overflow-hidden relative `}
      style={style}>
      <Draggable
        ref={ref}
        onDragEnd={onDragEnd}
        values={{x}}
        offset={bbox.offset}
        style={draggableStyle}
        poseKey={bbox.offset}
        pose="rest">
        {React.Children.map(children, d => (
          <div className="flex-none p-1" style={{width: bbox.width}}>
            {d}
          </div>
        ))}
      </Draggable>
    </div>
  );
}
