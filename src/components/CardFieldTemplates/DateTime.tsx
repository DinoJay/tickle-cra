import React, { useState, useEffect } from 'react';

import { ModalBody, ModalProps } from '~/components/utils/Modal';
import { DATE_TIME, DateTime } from '~/constants/cardFields';
// import {parseTime, formatTime} from '~/components/utils/time';

import PreviewFrame from './PreviewFrame';

export const key = DATE_TIME;
export const label = 'dateTime';

export const ModalContent: React.FC<{
  onChange: Function;
  modalProps: ModalProps;
  dateTime: DateTime;
}> = props => {
  const { onChange, modalProps, dateTime } = props;

  const [startDateTimeStr, setStartDateTimeStr] = useState<string>(
    (dateTime && dateTime.value && dateTime.value.startDate) || ''
  );

  const [endDateTimeStr, setEndDateTimeStr] = useState<string>(
    (dateTime && dateTime.value && dateTime.value.endDate) || ''
  );

  useEffect(() => {
    onChange({
      key,
      label,
      value: { startDate: startDateTimeStr, endDate: endDateTimeStr }
    });
  }, [startDateTimeStr, endDateTimeStr]);

  return (
    <ModalBody {...modalProps}>
      <input
        value={startDateTimeStr}
        className="p-2 mb-2 border-2"
        type="datetime-local"
        onChange={(e): void => setStartDateTimeStr(e.target.value)}
      />
      <input
        value={endDateTimeStr}
        type="datetime-local"
        className="p-2 mb-2 border-2"
        onChange={(e): void => setEndDateTimeStr(e.target.value)}
      />
    </ModalBody>
  );
};

export const Preview: React.FC<{
  dateTime: DateTime;
  onClick: Function;
}> = ({ dateTime, onClick }) => (
  <PreviewFrame
    placeholder="DateTime"
    onClick={onClick}
    empty={dateTime.value === null}
    content={() =>
      dateTime && dateTime.value && dateTime.value.startDate
    }
    type={label}
  />
);

export const View: React.FC<{
  dateTime: DateTime;
  onClose: Function;
  modalProps: any
}> = ({ dateTime, modalProps }) => (
  <ModalBody
    title="Time"
    onClose={modalProps.onClose}
    className="text-lg">
    {dateTime.value && dateTime.value.startDate && (
      <>
        <h2 className="text-2xl">Start time</h2>
        <p style={{ width: '100%' }} className="text-2xl">
          {dateTime.value.startDate}
        </p>
      </>
    )}
    {dateTime.value && dateTime.value.endDate && (
      <>
        <h2 className="text-2xl">End time:</h2>
        <p style={{ width: '100%' }}>
          {dateTime.value && dateTime.value.endDate}
        </p>
      </>
    )}
  </ModalBody>
);
