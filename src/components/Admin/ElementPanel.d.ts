import React from 'react';
import Topic from '~/constants/topicType';
import Reward from '~/constants/rewardType';
import { Datum } from '~/constants/DatumType';
interface ElementPanelProps {
    className?: string;
    title: string | undefined;
    elementTitle: string;
    data: Topic[] | Reward[] | Datum[];
    onSubmitElement: Function;
    onRemoveElement?: (a: string) => void;
    onClick: () => void;
    open: boolean;
    extendForm?: (a: Datum | Reward | Topic, o: object) => void;
    removable?: (a: any) => boolean;
}
declare const ElementPanel: React.FC<ElementPanelProps>;
export default ElementPanel;
