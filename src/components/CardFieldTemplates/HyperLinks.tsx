import React, {useState} from 'react';
import uuidv1 from 'uuid/v1';
import uniqBy from 'lodash/uniqBy';
// import PropTypes from 'prop-types';
// import sortBy from 'lodash/sortBy';
// import useDidUpdateEffect from '~/components/utils/useDidUpdateEffect';

// import useDeepCompareMemoize from '~/components/utils/useDeepCompareMemoize';

import LinkIcon from 'react-feather/dist/icons/link';
import X from 'react-feather/dist/icons/x';
import {ModalBody, ModalProps} from '~/components/utils/Modal';

import {HYPERLINKS, Hyperlinks, Link} from '~/constants/cardFields';

// TODO change
// import softSkillDict from '~/constants/softSkillData';
import NewTabLink from '~/components/utils/NewTabLink';

import PreviewFrame from './PreviewFrame';
// import ElementPanel from '~/components/Admin/ElementPanel';

// import {EditMetaTags} from './MetaTags';

export const key = HYPERLINKS;

export const label = 'Links';

export const ModalContent: React.FC<{
  hyperlinks: Hyperlinks;
  onChange: Function;
  modalProps: ModalProps;
}> = props => {
  const {
    hyperlinks: {value},
    onChange,
    modalProps
  } = props;

  const linkArray = value || [];

  const linkUrls = linkArray.map(l => l.url);
  const [curLink, setCurLink] = useState<Link | null>(null);
  const disabledSubmit =
    !curLink ||
    !curLink.url ||
    !curLink.title ||
    linkUrls.includes(curLink.url);

  const defaultLink = {
    url: 'no url',
    title: 'no title',
    id: uuidv1()
  };

  return (
    <ModalBody {...modalProps}>
      <form
        className="h-64 flex flex-col"
        onSubmit={(e): void => {
          e.preventDefault();
          onChange({
            key,
            label,
            value: uniqBy(
              [...linkArray, {...curLink, id: uuidv1()}],
              'url'
            )
          });
          setCurLink(null);
        }}>
        {linkArray && (
          <ul className="list-reset mb-3">
            {linkArray.map(l => (
              <li className="flex border-b-2 text-lg mb-1 items-center">
                <LinkIcon className="mr-1" />
                <div>
                  <NewTabLink href={l.url}>{l.title}</NewTabLink>
                </div>
                <button
                  className="ml-auto p-1 btn"
                  type="button"
                  onClick={(): void =>
                    onChange({
                      key,
                      label,
                      value: linkArray.filter(e => e.url !== l.url)
                    })
                  }>
                  <X size={20} />
                </button>
              </li>
            ))}
          </ul>
        )}
        {(!linkArray || linkArray.length === 0) && (
          <div className="text-2xl text-grey m-auto">No Links</div>
        )}
        <div className="flex mt-auto">
          <div>
            <input
              placeholder="Title"
              value={(curLink && curLink.title) || ''}
              className="form-control border-2"
              onChange={(e): void =>
                setCurLink({
                  ...(curLink || defaultLink),
                  title: e.target.value
                })
              }
            />
          </div>
          <div>
            <input
              placeholder="Url"
              type="url"
              value={(curLink && curLink.url) || defaultLink.url}
              className="form-control border-2 mx-1"
              onChange={(e): void =>
                setCurLink({
                  ...(curLink || defaultLink),
                  url: e.target.value
                })
              }
            />
          </div>
          <button
            type="submit"
            disabled={disabledSubmit}
            className="btn border-2 p-2 flex-grow">
            Add
          </button>
        </div>
      </form>
    </ModalBody>
  );
};

export const View: React.FC<{
  onClick: Function;
  hyperlinks: Hyperlinks;
  onClose: Function;
  modalProps: any;
}> = props => {
  const {onClick, hyperlinks, modalProps} = props;

  const arr = hyperlinks.value || [];
  return (
    <ModalBody onClose={modalProps.onClose} title={label}>
      <div onClick={(): void => onClick()}>
        <ul className="list-reset text-xl">
          {arr.map(d => (
            <NewTabLink href={d.url} className="m-1">
              {d.title}
            </NewTabLink>
          ))}
        </ul>
      </div>
    </ModalBody>
  );
};

export const Preview: React.FC<{
  onClick: Function;
  hyperlinks: Hyperlinks;
}> = props => {
  const {onClick, hyperlinks} = props;

  return (
    <PreviewFrame
      onClick={onClick}
      placeholder="hyperlinks"
      type={label}
      empty={hyperlinks.value === null}
      content={(): React.ReactNode => (
        <div className="flex flex-wrap">
          {hyperlinks &&
            Array.isArray(hyperlinks.value) &&
            hyperlinks.value.map(d => (
              <NewTabLink href={d.url} className="m-1">
                {d.title}
              </NewTabLink>
            ))}
        </div>
      )}
    />
  );
};
