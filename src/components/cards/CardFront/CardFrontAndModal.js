import React, { useState } from 'react';
import { BlackModal } from '~/components/utils/Modal';
import { fieldComps } from '~/components/CardFieldTemplates';
import CardFront from './CardFront';
const ReadCardFront = props => {
    const { activitySubmission, onFlip, onClose, style, addActivitySubmission, toggleUserview, history, location, match } = props;
    const [dialogKey, setDialogKey] = useState(null);
    // TODO: later
    const Comp = dialogKey
        ? fieldComps[dialogKey]
        : { View: null };
    const modalProps = { onClose: () => setDialogKey(null) };
    return (React.createElement(React.Fragment, null,
        React.createElement(BlackModal, { visible: dialogKey !== null, background: true }, Comp.View && (React.createElement(Comp.View, Object.assign({}, props, { modalProps: modalProps, submission: activitySubmission, activitySubmission: activitySubmission })))),
        React.createElement(CardFront, Object.assign({}, props, { style: style, history: history, location: location, match: match, toggleUserview: toggleUserview, addActivitySubmission: addActivitySubmission, onClose: onClose, onFlip: onFlip, setDialogKey: setDialogKey }))));
};
export default ReadCardFront;
