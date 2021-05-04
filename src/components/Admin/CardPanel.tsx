import React, { useState, useEffect, CSSProperties } from 'react';
import clsx from 'clsx';
import Check from 'react-feather/dist/icons/check';
import X from 'react-feather/dist/icons/x';
import PreviewCard from '~/components/cards/PreviewCard';

import { TEMP_ID, Card } from '~/constants/cardFields';

// import {BlackModal, ModalBody} from '~/components/utils/Modal';

import DetailsFrame from '~/components/utils/DetailsFrame';

interface TogggleButtonsProps {
  keys: string[];
  onClick: (a: string | null) => void;
  className?: string;
  selectedKey: string;
  disabled: boolean;
}

const SUBMITTED_TYPE: string = 'submitted';
const OPEN_TYPE: string = 'open';

const cardFilters = (isSubmitted: boolean, isPublished: boolean) => {
  if (isSubmitted)
    return (d: Card) =>
      d.allActivitySubs && d.allActivitySubs.length > 0;

  if (isPublished) return (d: Card) => d.published;
  return () => true;
};

interface CardPanelProps {
  className?: string;
  cards: Card[];
  userEnvId: string;
  height: number;
  style: CSSProperties;
  routeSelectExtend: Function;
  fetchAllCardsWithSubmissions: Function;
  fetchCardTemplates: any;
  open: boolean;
  onClick: () => void;
}

const CardPanel: React.FC<CardPanelProps> = props => {
  const {
    className,
    cards,
    userEnvId,
    height,
    style,
    routeSelectExtend,
    fetchCardTemplates,
    fetchAllCardsWithSubmissions,
    open,
    onClick
    // asyncCreateCard
  } = props;

  useEffect(() => {
    fetchAllCardsWithSubmissions(userEnvId);
    fetchCardTemplates(userEnvId);
  }, [userEnvId]);

  const [isSubmitted, setCardType] = useState<boolean>(false);
  const [isPublished, setIsPublished] = useState<boolean>(false);
  // const [batchModal, setBatchModal] = useState<boolean>(false);

  // TODO
  const filteredCards = cards.filter(
    cardFilters(isSubmitted, isPublished)
  );

  return (
    <DetailsFrame
      contentStyle={style}
      className={className}
      open={open}
      header={
        <div
          className={clsx(
            'w-full flex ',
            open && ' mt-1 mb-2 pb-2 border-b-2'
          )}>
          <div className="mr-1">Cards</div>

          <div className={clsx('flex flex-grow', !open && 'hidden')}>
            <button
              type="button"
              className={clsx(
                'ml-auto text-base btn p-1 border-2 mr-1',
                isPublished && 'bg-gray-500 text-white'
              )}
              onClick={e => {
                e.stopPropagation();
                setIsPublished(!isPublished);
                setCardType(null);
              }}>
              <span>Published</span>
              {isPublished ? <Check /> : <X />}
            </button>

            <button
              type="button"
              className={clsx(
                'text-base btn p-1 border-2 mr-1',
                isSubmitted && 'bg-gray-500 text-white'
              )}
              onClick={e => {
                e.stopPropagation();
                setCardType(!isSubmitted);
              }}>
              <span>Submitted</span>
              {isSubmitted ? <Check /> : <X />}
            </button>
          </div>
        </div>
      }
      footer={
        <div className="flex justify-between w-full">
          <button
            type="button"
            className="ml-auto btn p-1 text-base border-2"
            onClick={() => routeSelectExtend('newcard')}>
            Open New Card
          </button>
          <button
            type="button"
            className="ml-1 btn p-1 text-base border-2"
            onClick={() => routeSelectExtend(TEMP_ID)}>
            Open Template Card
          </button>
        </div>
      }
      onClick={onClick}>
      <div
        className="overflow-y-auto relative flex flex-wrap justify-center"
        style={{ height: height / 2 }}>
        {filteredCards.map((c: Card) => (
          <PreviewCard
            detail={false}
            className={clsx(
              'mr-2 mb-2',
              c.published || c.published === undefined
                ? 'opacity-100'
                : 'opacity-50'
            )}
            key={c.id}
            img={c.img && c.img.value}
            title={c.title && c.title.value}
            onClick={() => routeSelectExtend(c.id)}
          />
        ))}
      </div>
    </DetailsFrame>
  );
};

export default CardPanel;
