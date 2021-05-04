import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import FlexCollapsible from '~/components/utils/FlexCollapsible';
import PreviewCard from '~/components/cards/PreviewCard';

import {BlackModal, ModalBody} from '~/components/utils/Modal';

import CardActivity from './CardActivity';
import MovementActivity from './MovementActivity';

const Activities: React.SFC<{
  authUser: User;
  open: boolean;
  onClick: Function;
  style?: React.CSSProperties;
  className?: string;
}> = props => {
  const {open, onClick, style, routeCard} = props;

  const [selected, setSelected] = useState(false);
  const [selectedCards, setSelectedCards] = useState(null);

  return (
    <>
      <FlexCollapsible
        header="Activity"
        className="w-full overflow-hidden "
        open={open}
        onClick={onClick}
        style={style}
        footer={
          <div className="flex flex-grow text-base">
            <button
              type="button"
              className={clsx(
                'btn flex-grow',
                selected && 'bg-gray-500 text-white'
              )}
              onClick={() => setSelected(true)}>
              Movement
            </button>
            <button
              type="button"
              className={clsx(
                'btn flex-grow',
                !selected && 'bg-gray-500 text-white'
              )}
              onClick={() => setSelected(false)}>
              Challenges
            </button>
          </div>
        }>
        {!selected ? (
          <CardActivity {...props} onClick={setSelectedCards} />
        ) : (
          <MovementActivity {...props} />
        )}
      </FlexCollapsible>
      <BlackModal visible={!!selectedCards}>
        <ModalBody
          className=""
          onClose={() => setSelectedCards(null)}
          title={
            selectedCards &&
            selectedCards.every(
              a =>
                a.activitySubmission && a.activitySubmission.succeeded
            )
              ? 'Succeeded Cards'
              : 'Started Cards'
          }>
          <div className="flex justify-center flex-wrap flex-grow">
            {selectedCards !== null &&
              selectedCards.map(d => (
                <PreviewCard
                  onClick={() => routeCard(d.id)}
                  className="mr-2 mb-2"
                  key={d.id}
                  img={d.img && d.img.value}
                  title={d.title && d.title.value}
                />
              ))}
          </div>
        </ModalBody>
      </BlackModal>
    </>
  );
};
export default Activities;
