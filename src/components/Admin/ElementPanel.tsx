import React, { useState } from 'react';

import uuidv1 from 'uuid/v1';
import { BlackModal, ModalBody } from '~/components/utils/Modal';
import PreviewTag from '~/components/utils/PreviewTag';

import AddUrl from '~/components/utils/AddUrl';

import DetailsFrame from '~/components/utils/DetailsFrame';
import TabSlider from '../utils/TabSlider';
import PhotoPreview from '../utils/PhotoUpload';
import { Img } from '~/constants/typeUtils';
import Topic from '~/constants/topicType';
import Reward from '~/constants/rewardType';
import { Datum } from '~/constants/DatumType';

interface DatumFormProps {
  className?: string;
  setDatum: (d: Datum | Reward | Topic) => void;
  bottomControls: React.ReactNode;
  datum: Datum | Reward | Topic;
  extendForm?: (a: Datum | Reward | Topic, o: object) => void;
}

const DatumForm: React.FC<DatumFormProps> = props => {
  const {
    setDatum,
    bottomControls,
    datum,
    extendForm = () => null
  } = props;
  const [tabIndex, setTabIndex] = useState<number>(0);

  const btnClassName = (i: number) =>
    `flex-grow btn p-2 border-2 text-lg ${tabIndex === i &&
    'btn-active'}`;

  return (
    <div className="flex-grow flex flex-col">
      <div className="flex mt-2">
        <button
          className={`${btnClassName(0)} mr-1`}
          type="button"
          onClick={() => setTabIndex(0)}>
          Info
        </button>
        <button
          type="button"
          className={btnClassName(1)}
          onClick={() => setTabIndex(1)}>
          Image
        </button>
      </div>
      <TabSlider
        visibleIndex={tabIndex}
        className="flex-grow flex flex-col">
        <div className="flex flex-col flex-grow mt-4">
          <div className="w-full">
            <h3>Title:</h3>
            <input
              className="w-full form-control border-2"
              onChange={e => {
                const val = e.target.value;
                // setDatum((d: Datum) => ({ ...d, title: val }) as Datum);
                // Why this??
                setDatum({ ...datum, title: val });
              }}
              type="text"
              value={datum.title || ''}
            />
          </div>
          <div className="mt-3 w-full">
            <h3>Description:</h3>
            <textarea
              onChange={e => {
                const val = e.target.value;
                // setDatum((d: Datum) => ({ ...d, description: val }) as Datum);
                // Why this??
                setDatum({ ...datum, description: val });
              }}
              rows={10}
              className="w-full form-control border-2"
              value={datum.description || ''}
            />
          </div>
          {extendForm(datum, (o: any) => setDatum({ ...datum, ...o }))}
        </div>
        <PhotoPreview
          className="mt-3 mb-3 flex-grow border-2 flex-grow"
          {...datum.img}
          edit
          // setDatum((d: Datum) => ({ ...d, img }) as Datum);
          // Why this??
          onChange={(img: Img) => setDatum({ ...datum, img })}
        />
        <AddUrl
          {...datum.img}
          url={datum.img ? datum.img.url : ''}
          onChange={(img: Img) => setDatum({ ...datum, img })}
        />
      </TabSlider>
      {bottomControls}
    </div>
  );
};

interface NewDatumProps {
  onSubmitElement: Function;
  setModal: (a: boolean) => void;
  datum: Datum | Reward | Topic;
  setDatum: (d: Datum | Reward | Topic) => void;
  elementTitle?: string;
  extendForm?: (a: Datum | Reward | Topic, o: object) => void;
}

const NewDatum: React.FC<NewDatumProps> = props => {
  const {
    onSubmitElement,
    setModal,
    datum,
    setDatum,
    elementTitle,
    extendForm
  } = props;

  const disabled = datum.description === null && datum.title === null;

  const className = `${disabled ? 'disabled' : 'bg-green-500 text-white '
    }
btn p-2 text-lg border mt-auto`;

  return (
    <DatumForm
      key={datum.id}
      className="flex-grow flex flex-col"
      datum={datum}
      setDatum={setDatum}
      extendForm={extendForm}
      bottomControls={
        <button
          type="button"
          className={className}
          disabled={disabled}
          onClick={() => {
            onSubmitElement(datum);
            setDatum({
              title: '',
              description: null,
              id: uuidv1(),
              img: null
            });
            setModal(false);
          }}>
          Add {elementTitle}
        </button>
      }
    />
  );
};

interface UpdateDatumProps {
  onRemoveElement?: (id: string) => void;
  onSubmitElement: Function;
  removable?: (d: Datum | Reward | Topic) => boolean;
  setModal: (a: boolean) => void;
  datum: Datum | Reward | Topic;
  setDatum: (d: Datum | Reward | Topic) => void;
  extendForm?: (a: Datum | Reward | Topic, o: object) => void;
}

const UpdateDatum: React.FC<UpdateDatumProps> = ({ ...props }) => {
  const {
    onRemoveElement,
    onSubmitElement,
    removable,
    setModal,
    datum,
    setDatum,
    extendForm
  } = props;

  return (
    <DatumForm
      {...props}
      className="flex-grow flex flex-col"
      datum={datum}
      setDatum={setDatum}
      extendForm={extendForm}
      bottomControls={
        removable &&
        removable(datum) && (
          <div className="flex">
            <button
              type="button"
              className="flex-grow btn text-lg border p-2 mt-auto bg-red-500 text-white"
              onClick={() => {
                onRemoveElement && onRemoveElement(datum.id);
                setModal(false);
              }}>
              Remove
            </button>
            <button
              type="button"
              className="flex-grow btn text-lg border p-2 mt-auto bg-green-500 text-white"
              onClick={() => {
                onSubmitElement(datum);
                setModal(false);
              }}>
              Update
            </button>
          </div>
        )
      }
    />
  );
};

interface ElementPanelProps {
  className?: string;
  title: string | undefined;
  elementTitle: string;
  data: Topic[] | Reward[] | Datum[];
  onSubmitElement: Function;
  onRemoveElement?: (a: string) => void;
  onClick: () => void;
  open: boolean;
  extendForm?: (a: Datum | Reward | Topic, o: object) => void;
  removable?: (a: any) => boolean;
}

const ElementPanel: React.FC<ElementPanelProps> = props => {
  const {
    className,
    title = '',
    elementTitle = '',
    data = [],
    onSubmitElement,
    onClick,
    open,
    extendForm
  } = props;

  const [modalVisible, setModalVisible] = useState(false);

  const initDatum: Datum = {
    description: null,
    title: '',
    id: uuidv1(),
    img: { url: '', thumbnail: null, id: '', name: '' }
  };

  const [datum, setDatum] = useState<Datum>({ ...initDatum });

  const alreadyExist = data.some(
    (d: Datum | Reward | Topic) => d.id === datum.id
  );

  const selectDatum = (a: Datum | Reward | Topic) => {
    setDatum(a);
    setModalVisible(true);
  };

  return (
    <DetailsFrame
      className={`${className} `}
      open={open}
      onClick={onClick}
      title={title}
      footer={
        onSubmitElement && (
          <button
            className="btn p-1 ml-auto text-base border-2 border-grey flex-col "
            type="button"
            onClick={() => selectDatum(initDatum)}>
            Add {elementTitle}
          </button>
        )
      }>
      <BlackModal visible={modalVisible}>
        <ModalBody
          className="flex-grow"
          title={elementTitle}
          onClose={() => {
            setModalVisible(false);
            onSubmitElement(datum);
          }}>
          {alreadyExist ? (
            <UpdateDatum
              {...props}
              onSubmitElement={onSubmitElement}
              key={datum.id}
              datum={datum}
              setDatum={setDatum}
              setModal={setModalVisible}
            />
          ) : (
              <NewDatum
                {...props}
                key={datum.id}
                datum={datum}
                setDatum={setDatum}
                setModal={setModalVisible}
                extendForm={extendForm}
              />
            )}
        </ModalBody>
      </BlackModal>
      <div className="flex mt-1 flex-wrap">
        {data.map((a: Datum | Reward | Topic) => (
          <PreviewTag
            className="p-1 m-2 "
            {...a}
            title={a.title ? a.title : ''}
            onClick={() => {
              selectDatum(a);
            }}
          />
        ))}
      </div>
    </DetailsFrame>
  );
};

export default ElementPanel;
