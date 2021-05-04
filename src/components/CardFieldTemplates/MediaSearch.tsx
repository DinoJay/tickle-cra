import React, {useState, useEffect} from 'react';
// import PropTypes from 'prop-types';

import PlusSquare from 'react-feather/dist/icons/plus';
import Trash2 from 'react-feather/dist/icons/trash-2';

import uniqBy from 'lodash/uniqBy';

import {theme} from 'Tailwind';
// import {NewTabLink} from '~/components/utils/StyledComps';

// import {GIF, TEXT, VIDEO, IMG, URL} from '~/constants/mediaTypes';
import {Video} from './Videos';

const {colors} = theme;

const MediaBtn: React.FC<{
  className?: string;
  onClick: Function;
  selected: boolean;
}> = ({selected, onClick, className}) => (
  <div
    className={`btn ${className}`}
    style={{
      color: selected ? colors.red[500] : colors.green[500]
    }}
    onClick={() => onClick()}>
    {selected ? (
      <Trash2
        className="border-4 border-red-500"
        color={colors.red[300]}
        size={40}
      />
    ) : (
      <PlusSquare
        className="border-4 border-green-500"
        color={colors.green[400]}
        size={40}
      />
    )}
  </div>
);

export const MediaSearch: React.FC<{
  searchFn: Function;
  defaultQuery?: string;
  onChange: Function;
  Element: any;
  selectedData: Video[];
}> = props => {
  const {
    searchFn,
    defaultQuery = 'Brussels',
    onChange,
    Element,
    selectedData
  } = props;
  const [searchResults, setSearchResults] = useState<Video[]>([]);

  const doSearch = (q: string) => searchFn(q).then(setSearchResults);

  const removeItem = (id: string) =>
    onChange(selectedData.filter(d => d.id !== id));

  const addItem = (item: Video) => onChange([...selectedData, item]);

  useEffect(() => {
    doSearch(defaultQuery);
  }, []);

  const selectedIds = selectedData.map((d: Video) => d.id);

  return (
    <div className="flex flex-col flex-grow">
      <input
        type="text"
        className="form-control border-2 text-lg mt-3 mb-3 w-full"
        placeholder={`Search...for instance ${defaultQuery}`}
        onChange={evt => doSearch(evt.target.value)}
      />
      <div
        className="flex-grow overflow-y-auto"
        style={{
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: 0
        }}>
        {searchResults.map(d => (
          <div className="relative border-2 p-2 flex mb-3">
            <Element {...props} {...d} />
            <MediaBtn
              className="absolute right-0 bottom-0 m-4 bg-white"
              selected={selectedIds.includes(d.id)}
              onClick={() => {
                selectedIds.includes(d.id)
                  ? removeItem(d.id)
                  : addItem(d);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const MediaOverview: React.FC<{
  data: Video[];
  className?: string;
  Element: any;
}> = props => {
  const {data, className, Element} = props;

  return (
    <div className={`${className} flex flex-col flex-1-1-0`}>
      {data.length === 0 && (
        <h3 className="text-muted">No media added to this Card!</h3>
      )}
      <div className="overflow-y-auto">
        {data.map(d => (
          <div className="relative flex p-2 mb-3 border border-2">
            <Element {...props} {...d} />
          </div>
        ))}
      </div>
    </div>
  );
};

export const EditMediaOverview: React.FC<{
  className?: string;
  data: Video[];
  videoIdFn: Function;
  onChange: Function;
  Element: any;
}> = props => {
  const {data, videoIdFn, onChange, className, Element} = props;

  const [inputId, setInputId] = useState('');
  const removeItem = (m: Video) => {
    const newData = data.filter((d: Video) => d.id !== m.id);
    onChange(newData);
  };

  return (
    <div className={`${className} flex flex-col flex-1-1-0`}>
      {data.length === 0 && (
        <h3 className="text-muted">No media added to this Card!</h3>
      )}
      <div className="overflow-y-auto">
        {data.map(d => (
          <div className="relative flex p-2 mb-3 border border-2">
            <Element {...props} {...d} />
            <MediaBtn
              className="absolute right-0 bottom-0 m-3 bg-white"
              selected
              onClick={() => removeItem(d)}
            />
          </div>
        ))}
      </div>
      <form
        className="flex mt-auto p-1 flex-shrink-0"
        onSubmit={e => {
          e.preventDefault();
          videoIdFn(inputId).then((items: Video[]) => {
            onChange(uniqBy([...data, ...items], 'id'));
            setInputId('');
          });
        }}>
        <input
          className="form-input"
          placeholder="Add Video By ID"
          value={inputId}
          onChange={e => setInputId(e.target.value)}
        />
        <button
          className="btn bg-gray-500 text-white ml-1 px-2"
          disabled={inputId === ''}
          type="submit">
          Add
        </button>
      </form>
    </div>
  );
};
