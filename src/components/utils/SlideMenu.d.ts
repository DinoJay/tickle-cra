import React, { CSSProperties } from 'react';
interface SlideMenuProps {
    className?: string;
    style?: CSSProperties;
    children?: any;
    visible: boolean;
    onClick: () => void;
}
declare const SlideMenu: React.FC<SlideMenuProps>;
export default SlideMenu;
