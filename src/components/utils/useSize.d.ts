import React from 'react';
export default function useSize(ref: React.RefObject<HTMLElement>): {
    width: number;
    height: number;
};
