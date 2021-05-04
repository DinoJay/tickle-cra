import React from 'react';
import { PersonalityTraits as PersonalityTraitsType } from '~/constants/userFields';
declare const PersonalityTraits: React.FC<{
    open: boolean;
    traits?: PersonalityTraitsType;
    onClick: Function;
    onChange: Function;
}>;
export default PersonalityTraits;
