import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import ChevronRight from 'react-feather/dist/icons/chevron-right';
import ChevronLeft from 'react-feather/dist/icons/chevron-left';
import PreviewCard from '~/components/cards/PreviewCard';
import usePrevious from '~/components/utils/usePrevious';

const useScrollTo = (index: number, ref: any) => {
  const prev = usePrevious(index);
  useEffect(() => {
    const parentEl = ref?.current;
    // console.log('parentEl', parentEl);
    if (parentEl) {
      const elements = parentEl.children;
      const el = elements[index];
      if (el) {
        const offset = (index > prev ? 1 : -1) * el.clientWidth;

        parentEl.scrollBy({left: offset, behavior: 'smooth'});
      }
    }
  }, [index]);
  return {ref};
};

const SlideShow = ({cards = [], size=0, onCardClick = d => d}) => {
  const [index, setIndex] = useState(0);
  const ref = React.useRef<HTMLDivElement>();
  useScrollTo(index, ref);
  const disabledRight = index === cards.length - 1;
  const disabledLeft = index === 0;
  const btnClass =
    'btn bg-black rounded-full flex items-center justify-center p-1';

  return (
    <div className="bg-gray-300 flex justify-center items-center w-full border-2">
      <button
        type="button"
        onClick={() => setIndex(index - 1)}
        className={clsx(
          btnClass,
          'mr-1 md:m-1',
          disabledLeft && 'disabled'
        )}
        disabled={disabledLeft}>
        <ChevronLeft className="flex-shrink-0 text-white" />
      </button>
      <div
        className="p-4 w-full justify-center items-center flex overflow-y-auto "
        ref={ref}
        style={{maxWidth: '100%'}}>
        {cards.map(c => (
          <PreviewCard
            onClick={() => onCardClick(c.id)}
            className="m-1"
            style={
              {

            minWidth: `${size}rem`,
            width: `${size}rem`,
            height: `${size}rem`,
                // minWidth: '12rem',
                // transform: `scale(${selected ? 1.05 : 1})`,
                // transformOrigin: d.id === selectedCardId && null ,
                // transition: 'transform 300ms'
              }
            }
            title={c.title?.value}
            img={c.img?.value}
          />
        ))}
      </div>
      <button
        type="button"
        className={clsx(
          btnClass,
          'ml-1 md:m-1',
          disabledRight && 'disabled'
        )}
        disabled={disabledRight}
        onClick={() => setIndex(index + 1)}>
        <ChevronRight className="flex-shrink-0 text-white" />
      </button>
    </div>
  );
};

export default SlideShow;
