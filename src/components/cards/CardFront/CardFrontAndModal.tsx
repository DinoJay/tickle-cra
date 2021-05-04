import React, {useState} from 'react';
import {BlackModal} from '~/components/utils/Modal';

import {fieldComps} from '~/components/CardFieldTemplates';

import CardFront from './CardFront';

import {Card} from '~/constants/cardFields';

interface Props {
  onFlip: Function;
  onClose: Function;
}
const ReadCardFront: React.FC<Card & Props> = props => {
  const {
    activitySubmission,
    onFlip,
    onClose,
    style,
    addActivitySubmission,
    toggleUserview,
    history,
    location,
    match
  } = props;

  const [dialogKey, setDialogKey] = useState(null);

  // TODO: later
  const Comp: {View: any} = dialogKey
    ? fieldComps[dialogKey]
    : {View: null};

  const modalProps = {onClose: () => setDialogKey(null)};

  return (
    <>
      <BlackModal visible={dialogKey !== null} background>
        {Comp.View && (
          <Comp.View
            {...props}
            modalProps={modalProps}
            submission={activitySubmission}
            activitySubmission={activitySubmission}
          />
        )}
      </BlackModal>

      <CardFront
        {...props}
        style={style}
        history={history}
        location={location}
        match={match}
        toggleUserview={toggleUserview}
        addActivitySubmission={addActivitySubmission}
        onClose={onClose}
        onFlip={onFlip}
        setDialogKey={setDialogKey}
      />
    </>
  );
};
export default ReadCardFront;
