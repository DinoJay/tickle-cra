import React from 'react';

export default function NewTabLink({href, className, style, children}) {
  return (
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
}
