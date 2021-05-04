import React, { CSSProperties } from 'react';
interface SelectTagsProps {
    values: any[];
    className?: string;
    ulClassName?: string;
    idAcc: Function;
    placeholder: string;
    btnContent?: any;
    onChange?: Function;
    inputClassName?: string;
    liClassName?: string;
    valueAcc: Function;
    style?: CSSProperties | undefined;
    onSelect?: Function;
    orientation?: string;
}
declare const SelectTags: React.FC<SelectTagsProps>;
export default SelectTags;
