import React from 'react';
import sortBy from 'lodash/sortBy';
import {max} from 'd3-array';
import PreviewCard from '~/components/cards/PreviewCard';
import distanceLoc from '~/components/utils/distanceLoc';
import useDragToScroll, {useScrollTo} from './useDragToScroll';

import {avatars} from '~/constants/avatars';

const layoutCircle = ({cards, radius, width, height}) => {
  let angle = 0;
  const step = (2 * Math.PI) / cards.length;

  return cards.map(c => {
    const x = width / 2 + radius * Math.cos(angle);
    const y = height / 2 + radius * Math.sin(angle);
    angle += step;
    return {x, y, ...c};
  });
};

const Img = React.forwardRef(({style, src}, ref) => (
  <img
    ref={ref}
    alt="avatar"
    style={{
      ...style,
      transform: 'translate(-50%,-50%)'
    }}
    className="absolute w-24 h-24"
    src={src}
  />
));

const Labels = props => {
  const {size, b, i} = props;
  const textOffset = (pi, offset) => size / 2 + (b.r + offset) * pi;

  return (
    <g>
      <text
        style={{fontSize: 20}}
        x={textOffset(Math.cos(2 * Math.PI), i !== 0 ? 50 : 50)}
        y={textOffset(Math.sin(2 * Math.PI), i !== 0 ? 50 : 50)}>
        {b.dist ? b.dist.toFixed(1) : 0}km
      </text>
      <text
        style={{fontSize: 20}}
        x={textOffset(Math.cos(Math.PI), i !== 0 ? 110 : 100)}
        y={textOffset(Math.sin(Math.PI), i !== 0 ? 110 : 100)}>
        {b.dist ? b.dist.toFixed(1) : 0}km
      </text>
      <text
        textAnchor="middle"
        style={{fontSize: 20}}
        x={textOffset(Math.cos(Math.PI / 2), 100)}
        y={textOffset(Math.sin(Math.PI / 2), i !== 0 ? 110 : 100)}>
        {b.dist ? b.dist.toFixed(1) : 0}km
      </text>
      <text
        textAnchor="middle"
        style={{fontSize: 20}}
        x={textOffset(Math.cos(-Math.PI / 2), 100)}
        y={textOffset(Math.sin(-Math.PI / 2), i !== 0 ? 110 : 100)}>
        {b.dist ? b.dist.toFixed(1) : 0}km
      </text>
    </g>
  );
};

const DistCircle: React.FC<any> = props => {
  const {cards, authUser, userLocation, onCardClick} = props;
  const ref = React.useRef<HTMLDivElement | null>(null);
  const focusRef = React.useRef<HTMLDivElement | null>(null);
  const [dim, setDim] = React.useState([0, 0]);

  const avatar = avatars.find(a => a.id === authUser.avatar);

  React.useEffect(() => {
    const cont = ref.current;
    if (cont && cont.offsetWidth && cont.offsetHeight)
      setDim([cont.offsetWidth, cont.offsetHeight]);
  }, []);

  useDragToScroll(ref);

  useScrollTo(focusRef, ref, []);

  const cardsWithDist = cards.map(d => ({
    ...d,
    dist: distanceLoc(userLocation, d.loc.value)
  }));

  const sortedCards = sortBy(cardsWithDist, d => d.dist);

  const maxRad = 450;
  const buck0 = sortedCards.slice(0, 4);
  const buck1 = sortedCards.slice(4, 9);
  const buck2 = sortedCards.slice(9, 30);
  const buckets = [
    {cards: buck0, r: 150, dist: max(buck0, d => d.dist)},
    {cards: buck1, r: 300, dist: max(buck1, d => d.dist)},
    {cards: buck2, r: maxRad, dist: max(buck2, d => d.dist)}
  ];

  const pad = 50;
  const size = maxRad * 2 + pad;

  return (
    <div ref={ref} className="overflow-auto flex-grow w-full">
      <div className="relative " style={{width: size, minHeight: size}}>
        <Img
          ref={focusRef}
          src={avatar!.img!.url}
          style={{
            left: size / 2,
            top: size / 2
          }}
        />
        <svg className="absolute overflow-visible text-gray-500 stroke-current">
          {buckets.map((b, i) => (
            <>
              <Labels b={b} i={i} size={size} />
              <circle
                style={{fill: 'none'}}
                r={b.r}
                cx={size / 2}
                cy={size / 2}
              />
            </>
          ))}
        </svg>
        {buckets.map((b, i) =>
          layoutCircle({
            cards: b.cards,
            radius: b.r,
            width: size,
            height: size
          }).map(d => (
            <div
              className="absolute"
              style={{
                transform: 'translate(-50%, -50%)',
                left: d.x,
                top: d.y
              }}>
              <PreviewCard
                title={d.title?.value}
                onClick={() => onCardClick(d.id)}
                img={d.img.value}
                style={{
                  width: '3rem',
                  height: '3rem',
                  maxWidth: '3rem',
                  minWidth: '3rem'
                }}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default DistCircle;
