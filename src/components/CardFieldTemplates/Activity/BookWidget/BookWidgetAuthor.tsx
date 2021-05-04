import React, { useState, useEffect } from 'react';
import SearchIcon from 'react-feather/dist/icons/search';
import PreviewFrame from '../../PreviewFrame';
import { activityFields } from '~/constants/cardFields';
import { ModalProps } from '~/components/utils/Modal';
import Activity from '~/constants/activityType';

import {
  doReadBookWidgets,
  BookWidgetType
} from '~/firebase/db/bookwidget_db';

export const label = 'Bookwidget';

const WidgetList: React.FC<{
  values: BookWidgetType[];
  onChange: Function;
  initWidget: BookWidgetType;
}> = ({ values, onChange, initWidget }) => {
  const selectedWidgetShortCode = initWidget
    ? initWidget.short_code
    : null;

  const [selectedWidget, setSelectedWidget] = useState(
    selectedWidgetShortCode
  );

  const selectedWidgetStyle = {
    borderColor: 'black',
    borderWidth: '5px'
  };

  if (values.length === 0) return null;

  return (
    <div className="flex-grow">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridAutoRows: '8rem'
        }}>
        {values.map(d => (
          <div
            key={d.short_code}
            className="text-truncate justify-between flex items-start border-2 m-1 p-2"
            onClick={() => {
              setSelectedWidget(d.short_code);
              onChange({
                short_code: d.short_code,
                title: d.title,
                url: d.url,
                teacher_id: d.teacher_id,
                type: activityFields.BOOKWIDGET
              });
            }}
            style={
              selectedWidget === d.short_code
                ? selectedWidgetStyle
                : undefined
            }>
            <div>
              <h2>{d.title}</h2>
              <p>{d.short_code}</p>
            </div>
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                const playUrl = d.url.replace('lti/', '');
                window.open(playUrl);
              }}>
              <SearchIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

interface BookWidgetProps {
  activity: Activity;
  modalProps: ModalProps;
  onChange: Function;
}

export const BookWidget: React.FC<BookWidgetProps> = props => {
  const { activity, onChange } = props;
  const [bookWidgets, setBookWidgets] = useState<BookWidgetType[]>([]);

  const fetchBookWidgets = () => {
    doReadBookWidgets().then(data => {
      setBookWidgets(data);
    });
  };

  useEffect(() => {
    fetchBookWidgets();
  }, []);

  // TODO initActivity must be in value otherwise we are not consistent
  // TODO initActivity must be in value otherwise we are not consistent
  // TODO initActivity must be in value otherwise we are not consistent
  // TODO initActivity must be in value otherwise we are not consistent
  // TODO initActivity must be in value otherwise we are not consistent
  // TODO initActivity must be in value otherwise we are not consistent
  return (
    <>
      <h4>Choose the bookwidget for the card:</h4>
      <WidgetList
        values={bookWidgets}
        onChange={onChange}
        initWidget={activity.value.initActivity}
      />
    </>
  );
};

export const ModalContent = BookWidget;

interface PreviewProps {
  activity: any;
  onClick: Function;
}

export const Preview: React.FC<PreviewProps> = props => {
  const { activity, onClick } = props;

  return (
    <PreviewFrame
      onClick={onClick}
      placeholder=""
      type={label}
      empty={activity.value === null}
      content={() => activity.value.title}
    />
  );
};
