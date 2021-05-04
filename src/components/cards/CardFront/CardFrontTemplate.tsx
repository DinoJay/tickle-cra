import React, {useState} from 'react';

import sortBy from 'lodash/sortBy';
import X from 'react-feather/dist/icons/x';
import {AnimatePresence, motion} from 'framer-motion';
import clsx from 'clsx';
import IcAk from '~/styles/alphabet_icons/ic_ak.svg';
import {extractCardFields, Card} from '~/constants/cardFields';
import SelectField from '~/components/utils/SelectField';

import CardControls from '~/components/cards/CardControls';

export const ImgOverlay: React.FC<{
  src?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: Function;
  contain?: boolean;
}> = ({src, className, style, onClick, contain}) => (
  <a
    onClick={() => onClick && onClick()}
    className={`${className} bg-yellow-500`}
    style={{
      position: 'relative',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '100%',
      overflow: 'hidden',
      ...style
    }}>
    {src ? (
      <img
        src={src}
        alt="Card img"
        style={{
          width: '100%',
          height: '100%',
          objectFit: contain ? 'contain' : 'cover'
        }}
      />
    ) : (
      <div className="w-full h-full bg-yellow-dark p-8">
        <img className="w-full h-full" src={IcAk} alt="logo" />
      </div>
    )}
  </a>
);

const FieldItem: React.FC<any> = props => (
  <motion.div
    positionTransition
    className="text-truncate justify-between flex border-2 m-1 p-2"
    {...props}
  />
);

const RemoveBtn: React.FC<{
  on: boolean;
  onClick: Function;
  style?: React.CSSProperties;
  className?: string;
}> = ({on, onClick, style, className}) => (
  <div className={className} style={style}>
    <button
      type="button"
      onClick={() => onClick()}
      className={clsx(
        'font-bold w-full capitalize flex flex-col justify-center items-center mr-1 mr-1 cursor-pointer',
        on ? 'bg-grey-light' : 'bg-white'
      )}
      style={{...style}}>
      <X />
    </button>
  </div>
);

const GridHelper: React.FC<{className?: string}> = ({
  children,
  className
}) => (
  <div
    className={`overflow-y-auto ${className}`}
    style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridAutoRows: '8rem'
    }}>
    {children}
  </div>
);

const FieldList: React.FC<{
  values: Field[];
  visibility: {[i: string]: boolean};
  className?: string;
  onRemove: Function;
}> = ({values, visibility, onRemove}) => (
  <GridHelper>
    {values.map(d => (
      <AnimatePresence key={d.key}>
        <FieldItem
          exit={{opacity: 0}}
          key={d.key}
          style={{
            opacity: visibility[d.key] ? 1 : 0.5
          }}>
          {d.node}
          {!d.required && (
            <RemoveBtn on onClick={onRemove(d.key)}>
              {d.label}
            </RemoveBtn>
          )}
        </FieldItem>
      </AnimatePresence>
    ))}
  </GridHelper>
);

type Field = {
  key: string;
  label: string;
  node: React.ReactNode;
  required: boolean;
};

const selectNextFieldId = (visibility: {[i: string]: boolean}) =>
  Object.keys(visibility).find(k => !visibility[k]) || null;

const EditCardFields: React.FC<{
  className?: string;
  onResetField: Function;
  data: Card;
  fieldNodes: Field[];
  style?: React.CSSProperties;
}> = props => {
  const {className, onResetField, data, fieldNodes, style} = props;

  const fieldVisibility = fieldNodes.reduce(
    (acc, d) => ({
      ...acc,
      [d.key]: data[d.key] && data[d.key].value !== null
    }),
    {}
  );

  const [visibility, setVisibility] = useState<{
    [index: string]: boolean;
  }>(fieldVisibility);

  const [fieldId, setFieldId] = useState<string | null>(
    selectNextFieldId(visibility)
  );

  const notSelectedFields = fieldNodes.filter(
    (d: Field) => !visibility[d.key]
  );
  const selectedCardFields = fieldNodes.filter(
    (d: Field) => visibility[d.key]
  );
  const disabled = notSelectedFields.length === 0;
  const allHidden = selectedCardFields.length === 0;

  const remove = (key: string) => () => {
    const newVisibility = {...visibility, [key]: false};
    setVisibility(newVisibility);
    setFieldId(selectNextFieldId(newVisibility));
    onResetField(key);
  };

  const addAttr = () => {
    if (fieldId) {
      const newVisibility = {
        ...visibility,
        [fieldId]: true
        // date: new Date()
      };
      setVisibility(newVisibility);
      setFieldId(selectNextFieldId(newVisibility));
    }
  };

  return (
    <div className={`${className}`} style={style}>
      <form
        onSubmit={e => {
          e.preventDefault();
          addAttr();
        }}
        className={`flex flex-shrink-0 mt-2 mb-2 ${disabled &&
          'disabled'}`}>
        <SelectField
          selectedId={fieldId}
          className="bg-white flex-grow mr-4 text-xl"
          selectedClassName="border-2 border-black shadow p-2
            text-xl flex items-center"
          optionClassName="p-1"
          values={sortBy(notSelectedFields, 'label')}
          onChange={(v: Field) => setFieldId(v.key)}
        />
        <button
          className={`btn btn-lg border-2 border-black shadow ${disabled &&
            'btn-disabled'}`}
          type="submit">
          Add Field
        </button>
      </form>

      {allHidden && (
        <div className="flex-grow text-2xl flex flex-col justify-center items-center">
          No Field added
        </div>
      )}
      <FieldList
        className="flex-shrink"
        values={selectedCardFields}
        visibility={visibility}
        onRemove={remove}
      />
    </div>
  );
};

interface CardFrontTemplateType extends Card {
  style: React.CSSProperties;
  onCardUpdate: Function;
  className?: string;
  onClose: Function;
  onFlip: Function;
  bottomControls: React.ReactNode;
  onResetField: Function;
  fieldNodes: Field[];
}

const CardFrontTemplate: React.FC<CardFrontTemplateType> = props => {
  const {
    img = {value: null},
    id,
    style = {},
    className = '',
    onClose,
    onFlip,
    bottomControls,
    onResetField,
    fieldNodes
  } = props;

  const cardFields = extractCardFields(props);

  // const edit = false;

  // const visibleFields = fieldNodes.filter(
  //   (d: CardField) => cardFields[d.key].value !== null
  // );

  return (
    <div
      style={{...style}}
      className={`flex flex-col w-full h-full ${className}`}>
      <ImgOverlay
        contain={!!img.value && img.value.contain}
        src={img.value ? img.value.url : undefined}
        style={{
          flex: '0 0 40%'
          // cursor: 'pointer'
        }}
      />
      <EditCardFields
        key={id}
        className="flex flex-col px-3 py-1 flex-grow overflow-y-auto"
        style={{
          // flex: '0 1 50%',
          cursor: 'pointer'
        }}
        data={cardFields}
        fieldNodes={fieldNodes}
        onResetField={onResetField}
      />

      <CardControls
        className="flex-shrink-0"
        onFlip={onFlip}
        onClose={onClose}>
        <div className="flex ml-auto mr-auto">{bottomControls}</div>
      </CardControls>
    </div>
  );
};
export default CardFrontTemplate;
