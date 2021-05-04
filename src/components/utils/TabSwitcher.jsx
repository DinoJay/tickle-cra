import React, {useEffect, useState} from 'react';
import posed from 'react-pose';
import {value, spring} from 'popmotion';

const VELOCITY_THRESHOLD = 600;
const DISTANCE_PERCENTILE_THRESHOLD = 0.3;

const Draggable = posed.div({
  draggable: 'x',
  dragBounds: ({draggable}) =>
    draggable ? {right: 0} : {right: 0, left: 0},
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

export default function TabSwitcher(props) {
  const {
    children,
    visibleIndex,
    onSlideChange = d => d,
    className,
    tabClassName = '',
    style,
    draggable = true
  } = props;

  const x = value(0);

  const ref = React.useRef();
  const onSlideChangeRef = React.useRef();
  onSlideChangeRef.current = onSlideChange;

  const [bbox, setBBox] = useState({
    width: 0,
    offset: 0
  });

  const preventClick = React.useRef();

  const getBBox = () => {
    const root = ref.current;

    if (!root.children || root.children.length === 0)
      return {offset: 0, width: 0};
    const el = root.children[visibleIndex];

    const offset = el.offsetLeft; // - root.clientWidth / 2;

    return {
      offset,
      width: root.offsetWidth
    };
  };

  const goToSlide = newSlideIndex => {
    if (newSlideIndex >= 0 && newSlideIndex < children.length) {
      onSlideChangeRef.current(newSlideIndex);
    }
  };

  useEffect(() => {
    setBBox({
      ...getBBox()
    });
    const resize = () => {
      setBBox({
        ...getBBox()
      });
      // do stuff here
    };

    // window.addEventListener('resize', resize);
    // return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    preventClick.current = false;
    if (ref.current) {
      setBBox({...getBBox()});
    }
  }, [visibleIndex]);

  // const preventClick = false;
  // Because onDragEnd is immutable
  const cacheRef = React.useRef();
  cacheRef.current = {bbox, visibleIndex};

  const onDragEndImmutable = e => {
    e.stopPropagation();
    const cache = cacheRef.current;

    const start = -cache.bbox.offset;
    const distance = x.get() - start;
    const velocity = x.getVelocity();

    if (distance > -20 && distance < 20) {
      preventClick.current = false;
    } else {
      const threshold =
        DISTANCE_PERCENTILE_THRESHOLD * cache.bbox.width;

      if (distance < -threshold || velocity < -VELOCITY_THRESHOLD) {
        goToSlide(cache.visibleIndex + 1);
      } else if (
        distance > threshold ||
        velocity > VELOCITY_THRESHOLD
      ) {
        goToSlide(cache.visibleIndex - 1);
      }

      preventClick.current = true;
    }
  };

  return (
    <div
      className={`${className} overflow-x-hidden relative flex flex-col`}
      style={style}>
      <Draggable
        ref={ref}
        values={{x}}
        offset={bbox.offset}
        onDragEnd={Draggable ? onDragEndImmutable : d => d}
        onClickCapture={e => {
          preventClick.current && e.stopPropagation();
        }}
        onDragStart={() => {
          preventClick.current = false;
        }}
        style={draggableStyle}
        poseKey={bbox.offset}
        className="flex-grow"
        pose="rest">
        {React.Children.map(children, d => (
          <div
            className={`flex-none flex flex-col w-full ${tabClassName}`}>
            {d}
          </div>
        ))}
      </Draggable>
    </div>
  );
}
