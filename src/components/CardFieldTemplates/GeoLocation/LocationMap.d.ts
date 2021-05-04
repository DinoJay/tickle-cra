import React from "react";
import { Card } from "~/constants/cardFields";
declare type EditLocationMapType = Card & {
    className?: string;
    onChange: Function;
};
export declare const EditLocationMap: React.FC<EditLocationMapType>;
export declare const ViewLocationMap: React.FC<Card>;
export {};
