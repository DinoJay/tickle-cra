import React, {useEffect} from 'react';

const TabSlider: React.FC<{
  visibleIndex: number;
  className?: string;
  tabClassName?: string;
  style?: React.CSSProperties;
  draggable?: boolean;
  children: React.ReactNode | React.ReactNode[];
}> = (props, externalRef: any) => {
  const {
    children,
    visibleIndex,
    className,
    tabClassName = '',
    style
  } = props;

  const ref = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current;

    const rootChildren = root && root.children;
    if (
      root !== null &&
      root.scrollTo &&
      rootChildren &&
      rootChildren.length > 0
    ) {
      const el = rootChildren[visibleIndex] as HTMLElement;

      root.scrollTo({
        left: el.offsetLeft,
        behavior: 'smooth'
        // inline: 'start'
        // block: 'end'
      });

      const resize = (): void => {
        root.scrollTo({
          left: el.offsetLeft
          // inline: 'start'
        });
      };

      window.addEventListener('resize', resize);
      return () => window.removeEventListener('resize', resize);
    }
    return () => null;
  }, [visibleIndex]);

  // TODO scrolling
  // TODO scrolling
  // TODO scrolling
  // TODO scrolling
  // TODO scrolling
  // TODO scrolling
  return (
    <div
      className={`${className} overflow-hidden relative flex flex-col`}
      style={style}
      ref={externalRef}>
      <div
        className="overflow-x-hidden flex w-full flex-grow"
        ref={ref}>
        {React.Children.map(children, d => (
          <div
            className={`flex-none flex flex-col w-full overflow-y-auto ${tabClassName}`}>
            {d}
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.forwardRef(TabSlider);
