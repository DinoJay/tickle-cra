import React from 'react';
import { Card } from '~/constants/cardFields';
interface EditCardFront extends Card {
    onRemove: (c: Card) => any;
    onCreate: (c: Card) => any;
    onUpdate: (c: Card) => any;
    toggleUserview: Function;
    removable?: boolean;
}
declare const EditCardFront: React.FC<EditCardFront>;
export default EditCardFront;
