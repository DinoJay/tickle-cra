import React from 'react';
declare type Field = {
    key: string;
    label: string | React.ReactNode;
};
declare const SelectField: React.FC<{
    className: string;
    selectedClassName: string;
    optionClassName: string;
    style?: React.CSSProperties;
    onChange: Function;
    values: Field[];
    selectedId: string | null;
}>;
export default SelectField;
