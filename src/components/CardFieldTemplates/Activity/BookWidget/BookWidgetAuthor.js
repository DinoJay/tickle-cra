import React, { useState, useEffect } from 'react';
import SearchIcon from 'react-feather/dist/icons/search';
import PreviewFrame from '../../PreviewFrame';
import { activityFields } from '~/constants/cardFields';
import { doReadBookWidgets } from '~/firebase/db/bookwidget_db.ts';
export const label = 'Bookwidget';
const WidgetList = ({ values, onChange, initWidget }) => {
    const selectedWidgetShortCode = initWidget
        ? initWidget.short_code
        : null;
    const [selectedWidget, setSelectedWidget] = useState(selectedWidgetShortCode);
    const selectedWidgetStyle = {
        borderColor: 'black',
        borderWidth: '5px'
    };
    if (values.length === 0)
        return null;
    return (React.createElement("div", { className: "flex-grow" },
        React.createElement("div", { style: {
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gridAutoRows: '8rem'
            } }, values.map(d => (React.createElement("div", { key: d.short_code, className: "text-truncate justify-between flex items-start border-2 m-1 p-2", onClick: () => {
                setSelectedWidget(d.short_code);
                onChange({
                    short_code: d.short_code,
                    title: d.title,
                    url: d.url,
                    teacher_id: d.teacher_id,
                    type: activityFields.BOOKWIDGET
                });
            }, style: selectedWidget === d.short_code
                ? selectedWidgetStyle
                : undefined },
            React.createElement("div", null,
                React.createElement("h2", null, d.title),
                React.createElement("p", null, d.short_code)),
            React.createElement("button", { type: "button", onClick: e => {
                    e.stopPropagation();
                    const playUrl = d.url.replace('lti/', '');
                    window.open(playUrl);
                } },
                React.createElement(SearchIcon, null))))))));
};
export const BookWidget = props => {
    const { activity, onChange } = props;
    const [bookWidgets, setBookWidgets] = useState([]);
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
    return (React.createElement(React.Fragment, null,
        React.createElement("h4", null, "Choose the bookwidget for the card:"),
        React.createElement(WidgetList, { values: bookWidgets, onChange: onChange, initWidget: activity.value.initActivity })));
};
export const ModalContent = BookWidget;
export const Preview = props => {
    const { activity, onClick } = props;
    return (React.createElement(PreviewFrame, { onClick: onClick, placeholder: "", type: label, empty: activity.value === null, content: () => activity.value.title }));
};
