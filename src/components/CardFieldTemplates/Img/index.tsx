import React, { Suspense, useState } from 'react';
import Plus from 'react-feather/dist/icons/plus';
import Minus from 'react-feather/dist/icons/minus';
import clsx from 'clsx';

import Search from 'react-feather/dist/icons/search';

// @ts-ignore
import usePromise from 'react-promise-suspense';
import { IMG, ImgField } from '~/constants/cardFields';
import { Img } from '~/constants/typeUtils';

import { ModalBody, ModalProps } from '~/components/utils/Modal';

import { PhotoPreview } from '~/components/utils/PhotoUpload';

import PreviewFrame from '../PreviewFrame';
import TabSlider from '~/components/utils/TabSlider';

export const key = IMG;

export const label = 'Image';

type ModalContentType = {
  img: ImgField;
  id: string;
  onChange: Function;
  disabled: boolean;
  modalProps: ModalProps;
};

const PIXABAY = 'pixabay';
const UPLOAD = 'upload';

const UploadPhoto: React.FC<ModalContentType> = props => {
  const { img, id, onChange, disabled } = props;
  const { type = UPLOAD } = (img && img.value) || {};

  return (
    <PhotoPreview
      edit={!disabled}
      className="flex-grow border-2"
      key={id}
      {...(type === UPLOAD ? img.value : {})}
      onChange={(imgVal: Img): void => {
        onChange({ key, label, value: imgVal } as ImgField);
      }}>
      <div>Edit Image</div>
    </PhotoPreview>
  );
};

const fetchPixaBayJson = (input: string) =>
  fetch(input, {
    method: 'GET',
    mode: 'cors', // no-cors, *cors, same-origin
    credentials: 'same-origin' // include, *same-origin, omit
  })
    .then(res => (res ? res.json() : []))
    .then((obj: any) =>
      obj.hits.map((d: any) => ({ ...d, id: d.id.toString() }))
    )
    .catch(error => {
      console.log('err', error);
      return [];
    });
type PixaBayImg = {
  largeImageURL: string;
  webformatHeight: number;
  webformatWidth: number;
  likes: number;
  imageWidth: number;
  id: string;
  user_id: number;
  views: number;
  comments: number;
  pageURL: string;
  imageHeight: number;
  webformatURL: string;
  type: string;
  previewHeight: number;
  tags: string;
  downloads: number;
  user: string;
  favorites: number;
  imageSize: number;
  previewWidth: number;
  userImageURL: string;
  previewURL: string;
};
const PhotoFetcher: React.FC<{
  query: string;
  img: ImgField;
  onChange: Function;
  // onClick: Function;
}> = props => {
  const { query, img, onChange } = props;

  const onChangeHelper = (value: any) => onChange({ key, label, value });

  const qs = `https://pixabay.com/api/?key=${process.env!.PixaBay
    }&q=${query}&image_type=photo&pretty=true`;

  const data = usePromise(fetchPixaBayJson, [qs]);

  const { id: initId = null, thumbnail = null, type = null } =
    (img && img.value) || {};

  const id = type === PIXABAY ? initId : null;

  return (
    <div className="relative flex-grow">
      {data
        // .filter(
        //   (d: PixaBayImg) => !id || type !== PIXABAY || isSelected(d)
        // )
        .map((d: PixaBayImg) => (
          <div className="relative">
            <img alt={d.id} className="m-1 w-full" src={d.previewURL} />
            <button
              type="button"
              onClick={() => {
                if (id === d.id) onChangeHelper(null);
                else
                  onChangeHelper({
                    id: d.id,
                    name: d.id,
                    thumbnail: d.previewURL,
                    url: d.webformatURL,
                    type: PIXABAY
                  });
              }}
              className={clsx(
                'absolute m-2 bottom-0 right-0 btn bg-white border-2 p-1 rounded-full',
                id === d.id ? 'border-red-500' : 'border-black'
              )}>
              {d.id !== id ? (
                <Plus />
              ) : (
                  <Minus className="text-red-500" />
                )}
            </button>
          </div>
        ))}
      {thumbnail && (
        <div className="fixed bottom-0 right-0 shadow m-3">
          <div className="relative border-2 border-black ">
            <img alt={thumbnail} src={thumbnail} />
            <button
              onClick={() => onChangeHelper(null)}
              type="button"
              className="border-2 border-red-500 bg-white m-1 rounded-full absolute right-0 bottom-0">
              <Minus className="text-red-500" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Unsplash: React.FC<any> = props => {
  const { onChange, img } = props;
  const [query, setQuery] = useState<string>('');
  const [inputVal, setInputVal] = useState<string>('');
  return (
    <div className="flex-grow flex flex-col">
      <div className="flex p-1">
        <input
          onChange={e => setInputVal(e.target.value)}
          value={inputVal}
          className="form-control w-full border-2"
          placeholder="Search for images"
          type="text"
        />
        <button
          className="btn ml-1 border-2 p-1 rounded-full px-2"
          type="button"
          onClick={() => setQuery(inputVal)}>
          <Search />
        </button>
      </div>
      <Suspense fallback="Loading...">
        <PhotoFetcher img={img} query={query} onChange={onChange} />
      </Suspense>
    </div>
  );
};

export const ModalContent: React.FC<ModalContentType> = props => {
  const { id, modalProps } = props;

  const [tabIndex, setTabIndex] = useState<number>(0);

  const btnClassName = (i: number) =>
    `flex-grow btn p-2 border-2 text-lg ${tabIndex === i &&
    'btn-active'}`;
  return (
    <ModalBody {...modalProps} key={id} className="flex flex-grow">
      <div className="flex my-2">
        <button
          className={`${btnClassName(0)} mr-1`}
          type="button"
          onClick={() => setTabIndex(0)}>
          Upload
        </button>
        <button
          type="button"
          className={btnClassName(1)}
          onClick={() => setTabIndex(1)}>
          Search
        </button>
      </div>
      <TabSlider
        visibleIndex={tabIndex}
        className="flex-grow flex flex-col">
        <UploadPhoto {...props} />
        <Unsplash {...props} />
      </TabSlider>
    </ModalBody>
  );
};

export const Preview: React.FC<{ onClick: Function; img: ImgField }> = ({
  onClick,
  img
}) => (
    <PreviewFrame
      onClick={onClick}
      type={label}
      placeholder="Img"
      empty={img.value === null}
      content={() => (
        <div className="truncate-text">
          {(img.value && img.value.name) || (img.value && img.value.url)}
        </div>
      )}
    />
  );

export const View: React.FC<{ img: ImgField; onClose: Function, modalProps: any }> = ({
  img,
  onClose,
  modalProps
}) => (
    <ModalBody
      className="flex flex-col flex-grow"
      onClose={modalProps.onClose}
      title="Photo">
      <div
        className="flex-grow"
        style={{
          backgroundImage: `url(${img.value && img.value.url})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      />
    </ModalBody>
  );
