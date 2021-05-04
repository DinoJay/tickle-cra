import React from 'react';
import Rating from '~/components/utils/Rating';
import { PhotoPreview } from '~/components/utils/PhotoUpload';
const DifficultyRating = ({ onChange, highlighted, ...props }) => (React.createElement(Rating, Object.assign({}, props, { count: highlighted, num: 6, onClick: (i) => {
        onChange(i);
    } })));
const TextChallengeAuthor = props => {
    const { className, toggleUserview, style, onChange, activity } = props;
    const { title = '', description = '', img = null, difficulty = 0 } = activity.value || {};
    return (React.createElement("div", { className: `${className} flex flex-col flex-grow w-full h-full`, style: { ...style } },
        React.createElement("section", { className: "mb-4" },
            React.createElement("h2", { className: "mb-1" }, "Title"),
            React.createElement("input", { className: "form-control w-full border", placeholder: "Title", defaultValue: title, onChange: e => onChange({ ...activity.value, title: e.target.value }) })),
        React.createElement("section", { className: "mb-4" },
            React.createElement("h2", { className: "mb-1" }, "Description"),
            React.createElement("textarea", { className: "form-control w-full border", placeholder: "Description", rows: 2, onChange: e => onChange({ ...activity.value, description: e.target.value }), defaultValue: description, style: { minHeight: 200 } })),
        React.createElement("section", { className: "mb-4" },
            React.createElement("h2", { className: "mb-1" }, "IMG"),
            React.createElement(PhotoPreview, Object.assign({}, img, { edit: true, className: "h-48", onChange: (newImg) => {
                    console.log('newImg', newImg);
                    onChange({ ...activity.value, img: newImg });
                } }))),
        React.createElement("section", { className: "hidden" },
            React.createElement("h2", null, "Difficulty"),
            React.createElement(DifficultyRating, { highlighted: difficulty, onChange: (df) => onChange({ ...activity.value, difficulty: df }) })),
        React.createElement("button", { type: "button", className: "mb-2 mt-auto btn border-2 p-1 bg-yellow-500 text-white", onClick: () => toggleUserview(true) }, "UserView")));
};
export default TextChallengeAuthor;
