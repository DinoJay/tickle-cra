import React from 'react';
import CloseIcon from 'react-feather/dist/icons/x';
import PreviewCard from '~/components/cards/PreviewCard';
import {Img} from '~/constants/typeUtils';

type NotificationPreviewProps = {
  cardId: string;
  preview: Img;
  msg: string;
  caption: string;
  title: string;
  onClose: (id: string) => any;
  onSelect: (id: string) => any;
  id: string;
};
const NotificationPreview: React.FC<
  NotificationPreviewProps
> = props => {
  const {
    cardId,
    preview,
    msg,
    caption,
    title,
    onClose,
    onSelect,
    id
  } = props;

  return (
    <div className="flex my-3">
      <div className="flex flex-row flex-grow">
        <div className="flex mr-5">
          <PreviewCard
            className="h-full w-full"
            title=" "
            img={preview}
            style={{height: '5rem', width: '5rem'}}
            onClick={() => {
              onSelect(cardId);
              onClose(id);
            }}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-start text-gray-400">
            <p>{title}</p>
          </div>
          <div className="flex items-start">
            <p>{msg}</p>
          </div>
        </div>
      </div>
      <div className="flex items-end text-gray-400">
        <p>{caption}</p>
      </div>
      {onClose && (
        <button
          className="flex justify-end"
          type="button"
          onClick={() => {
            onClose(id);
          }}>
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

export default NotificationPreview;
