import React from 'react';
declare const styledComp: ({ element, className, style }: {
    element: any;
    className: string;
    style?: React.CSSProperties | undefined;
}) => ({ ...props }: {
    [x: string]: any;
}) => React.CElement<{
    className: string;
    style: any;
}, React.Component<{
    className: string;
    style: any;
}, any, any>>;
export default styledComp;
