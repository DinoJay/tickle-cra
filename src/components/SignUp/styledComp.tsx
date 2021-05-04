import React from 'react';

const styledComp = ({
  element,
  className,
  style
}: {
  element: any;
  className: string;
  style?: React.CSSProperties;
}) => ({...props}) =>
  React.createElement(element, {
    ...props,
    className: `${className} ${props.className}`,
    style: {...style, ...props.style}
  });

export default styledComp;
