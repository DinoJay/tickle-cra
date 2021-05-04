import React from 'react';
import DataElem from '~/constants/dataElemType';
declare const BarChart: React.FC<{
    data: DataElem[];
    className?: string;
    countAcc?: Function;
    titleAcc?: Function;
    imgAcc?: Function;
    style?: React.CSSProperties;
    onClick?: Function;
    selectedId?: string;
    sumAcc: Function;
}>;
export default BarChart;
