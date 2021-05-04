import React from 'react';
import { Card } from '~/constants/cardFields';
interface ReviewCardFrontType extends Card {
    style?: React.CSSProperties;
    onClose: Function;
    onFlip: Function;
    className?: string;
}
declare const ReviewCardFront: React.FC<ReviewCardFrontType>;
export default ReviewCardFront;
