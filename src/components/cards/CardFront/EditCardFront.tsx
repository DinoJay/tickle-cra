import React, {useState} from 'react';
import {useQueryParam, StringParam} from 'use-query-params';
import Eye from 'react-feather/dist/icons/eye';

import {BlackModal} from '~/components/utils/Modal';
import AlertButton from '~/components/utils/AlertButton';

import {
  extractCardFields,
  TITLE,
  TEMP_ID,
  Card,
  CardField
} from '~/constants/cardFields';

import CardFrontTemplate from './CardFrontTemplate';
import {fieldComps} from '~/components/CardFieldTemplates';

interface EditCardFront extends Card {
  onRemove: (c: Card) => any;
  onCreate: (c: Card) => any;
  onUpdate: (c: Card) => any;
  toggleUserview: Function;
  removable?: boolean;
}

const EditCardFront: React.FC<EditCardFront> = props => {
  const {
    onRemove,
    onCreate,
    onUpdate,
    id,
    toggleUserview,
    style,
    onClose,
    onFlip,
    removable = false,
    onCardUpdate
  } = props;
  const startProps = extractCardFields(props);
  const {published = true} = startProps;
  const [data, setData] = useState<Card>(startProps);

  const [dialogKey = null, setDialogKey] = useQueryParam(
    'dialogKey',
    StringParam
  );

  const template = id === TEMP_ID;

  const updateField = (d: CardField) => {
    const newData = {...data, [d.key]: d};
    onUpdate(newData);
    setData(newData);
  };

  const resetField = (key: string) => {
    setData({...data, [key]: {...data[key], value: null}});
  };
  const onCloseModal = () => {
    onUpdate({...data});
    setDialogKey(null);
  };

  const Comp =
    dialogKey !== null ? fieldComps[dialogKey] : fieldComps[TITLE];

  const modalVisible = dialogKey !== null;
  const modalProps = {
    visible: modalVisible,
    title: Comp.label,
    onClose: onCloseModal
  };

  const previewFields = Object.keys(fieldComps).map(k => {
    const d = fieldComps[k];
    return {
      ...d,
      node: (
        <d.Preview
          {...props}
          {...data}
          onClick={() => setDialogKey(d.key)}
        />
      )
    };
  });

  const bottomControls = () => (
    <div className="flex">
      {template && (
        <button
          type="button"
          className="btn-green text-xl m-2 p-2"
          onClick={() => onCreate(data)}>
          Create
        </button>
      )}
      {!template && removable && (
        <AlertButton
          type="button"
          className="btn-red text-xl m-2 p-2"
          msg={`Are you sure that you want to delete the ${data.title} ?`}
          onClick={() => onRemove(data)}>
          Remove
        </AlertButton>
      )}
      {toggleUserview && (
        <button
          type="button"
          className="btn border-2 m-2 p-2 flex items-center"
          onClick={() => toggleUserview()}>
          <div className="mr-1">UserView</div> <Eye />
        </button>
      )}

      <div className="text-lg font-bold mb-2 border-2 border-dashed px-1 pt-1 pb-2 items-center flex flex-col justify-center mx-3 mt-2">
        <div>Public:</div>
        <input
          className="mx-1"
          type="checkbox"
          defaultChecked={published}
          onChange={() => onUpdate({...data, published: !published})}
        />
      </div>
    </div>
  );

  // TODO error
  return (
    <>
      <BlackModal visible={modalVisible} zIndex={200}>
        <Comp.ModalContent
          {...props}
          modalProps={modalProps}
          {...data}
          onChange={updateField}
        />
      </BlackModal>
      <CardFrontTemplate
        {...props}
        style={style}
        onClose={onClose}
        onFlip={onFlip}
        onCardUpdate={onCardUpdate}
        fieldNodes={previewFields}
        onResetField={resetField}
        onFieldLabelChange={updateField}
        {...data}
        bottomControls={bottomControls()}
      />
    </>
  );
};
export default EditCardFront;
