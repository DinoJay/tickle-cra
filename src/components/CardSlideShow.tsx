import React, { useEffect, CSSProperties } from 'react';

// import smoothscroll from 'smoothscroll-polyfill';

import css from './CardSlideShow.scss';

const useDragToScroll = ref => {
  useEffect(() => {
    const slider = ref.current;
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    if (slider && slider.clientWidth > 600) {
      slider.addEventListener('mousedown', (e: MouseEvent) => {
        e.preventDefault();
        isDown = true;

        slider.classList.add(css.grabbing);

        // slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });
      slider.addEventListener('mouseleave', (e: MouseEvent) => {
        e.preventDefault();
        isDown = false;
        for (const item of slider.children) {
          item.classList.remove(css.active);
        }

        slider.classList.remove(css.grabbing);
        // slider.classList.remove('active');
      });
      slider.addEventListener('mouseup', (e: MouseEvent) => {
        e.preventDefault();
        for (const item of slider.children) {
          item.classList.remove(css.active);
        }
        isDown = false;
        // slider.classList.remove('active');
      });
      slider.addEventListener('mousemove', (e: MouseEvent) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1; // scroll-fast
        slider.scrollLeft = scrollLeft - walk;
        if (Math.abs(walk) > 7) {
          for (const item of slider.children) {
            item.classList.add(css.active);
          }
        }
      });
    }
  });

  return { ref };
};

const useScrollTo = (index: number, ref: any) => {
  useEffect(() => {
    const parentEl = ref.current;
    if (parentEl) {
      const elements = parentEl.children;
      const rootWidth = parentEl.clientWidth;
      const el = elements[index];
      if (el) {
        const offset =
          el.offsetLeft - rootWidth / 2 + el.clientWidth / 2;
        parentEl.scrollTo({ left: offset, behavior: 'smooth' });
      }
    }
  }, [index]);
  return { ref };
};

interface CardSlideShowProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  style: CSSProperties;
  width: number;
  visibleIndex: number;
}

const CardSlideShow: React.FC<CardSlideShowProps> = props => {
  const { children, className, style, visibleIndex } = props;

  const ref = React.useRef<HTMLDivElement>(null);
  useScrollTo(visibleIndex, ref);
  useDragToScroll(ref);

  return (
    <div
      ref={ref}
      className={`flex overflow-x-scroll md:overflow-x-hidden overflow-y-visible ${className}`}
      style={style}>
      {children}
    </div>
  );
};

export default CardSlideShow;
