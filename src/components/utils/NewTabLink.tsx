import React from 'react';

const NewTabLink: React.FC<{
  href: string;
  className?: string;
  style?: React.CSSProperties;
}> = ({href, className, style, children}) => (
  <a
    className={className}
    target="_blank"
    href={href}
    rel="noopener"
    style={{
      ...style,
      textDecoration: 'underline',
      cursor: 'pointer',
      color: '#007bff',
      backgroundColor: 'transparent'
    }}>
    {children}
  </a>
);
export default NewTabLink;
