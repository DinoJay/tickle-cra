import React from 'react';
import { Card } from '~/constants/cardFields';
interface Props {
    onFlip: Function;
    onClose: Function;
}
declare const ReadCardFront: React.FC<Card & Props>;
export default ReadCardFront;
