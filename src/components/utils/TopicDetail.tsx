import React from "react";
import BackgroundImg from "~/components/utils/BackgroundImg";
import Img from "~/constants/imgType";

interface TopicDetailProps {
  description?: string;
  img?: Img;
  onClick: () => void;
}

const TopicDetail: React.FC<TopicDetailProps> = props => {
  const { description, img, onClick } = props;

  return (
    <div className="flex flex-col flex-grow">
      {img && (
        <BackgroundImg
          className="w-full h-64"
          src={img.url}
          style={{ backgroundSize: "contain" }}
        />
      )}
      <p>{description || "No description"}</p>
      <div className="flex flex-wrap overflow-y-auto" />
      <button
        onClick={onClick}
        type="button"
        className="w-full btn p-2 border-2"
      >
        Select Topic
      </button>
    </div>
  );
};

export default TopicDetail;
