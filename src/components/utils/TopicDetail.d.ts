import React from "react";
import Img from "~/constants/imgType";
interface TopicDetailProps {
    description?: string;
    img?: Img;
    onClick: () => void;
}
declare const TopicDetail: React.FC<TopicDetailProps>;
export default TopicDetail;
