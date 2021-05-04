import React from 'react';
import clsx from 'clsx';
import DetailsFrame from '~/components/utils/DetailsFrame';
const PercentageInput = props => {
    const { label, value, onChange, className } = props;
    return (React.createElement("div", { className: clsx('w-32 p-1 flex flex-col h-24 items-center', className) },
        React.createElement("div", { className: "form-input w-full h-full border-4 flex items-center" },
            React.createElement("div", { className: " text-2xl flex items-center" },
                React.createElement("input", { onChange: e => onChange && onChange(e.target.value), value: value, type: "number", min: "0", max: "100", step: "1", className: "w-full text-center w-full" }),
                React.createElement("span", { className: "" }, "%"))),
        React.createElement("div", { className: "w-full flex-shrink-0 text-center text-lg text-gray-700 truncate" }, label)));
};
const PersonalityTraits = props => {
    const { onClick, onChange, open, traits = {
        openness: 0,
        conscientiousness: 0,
        emotionalStability: 0,
        agreeableness: 0,
        neuroticism: 0,
        player: 0,
        introvert: 0,
        extrovert: 0
    } } = props;
    const { openness, conscientiousness, agreeableness, neuroticism, player, emotionalStability, introvert, extrovert } = traits;
    const updateTraits = (tr) => onChange({ ...traits, ...tr });
    return (React.createElement(DetailsFrame, { className: "flex overflow-y-auto mb-3", open: open, onClick: onClick, title: "Personality Traits" },
        React.createElement("form", { className: "flex flex-wrap", onSubmit: e => {
                e.preventDefault();
            } },
            React.createElement(PercentageInput, { label: "Openness", className: "m-1", value: openness, onChange: (val) => updateTraits({ openness: parseInt(val, 10) }) }),
            React.createElement(PercentageInput, { value: conscientiousness, className: "m-1 ", label: "conscientiousness", onChange: (val) => updateTraits({ conscientiousness: parseInt(val, 10) }) }),
            React.createElement(PercentageInput, { value: agreeableness, className: "m-1", label: "Agreeableness", onChange: (val) => updateTraits({ agreeableness: parseInt(val, 10) }) }),
            React.createElement(PercentageInput, { value: neuroticism, className: "m-1", label: "Neuroticism", onChange: (val) => updateTraits({ neuroticism: parseInt(val, 10) }) }),
            React.createElement(PercentageInput, { value: emotionalStability, className: "m-1", label: "Emotional stable", onChange: (val) => updateTraits({ emotionalStability: parseInt(val, 10) }) }),
            React.createElement(PercentageInput, { value: introvert, className: "m-1", label: "Introvert", onChange: (val) => updateTraits({ introvert: parseInt(val, 10) }) }),
            React.createElement(PercentageInput, { value: extrovert, onChange: (val) => updateTraits({ extrovert: parseInt(val, 10) }), className: "m-1", label: "Extrovert" }),
            React.createElement(PercentageInput, { value: player, onChange: (val) => updateTraits({ player: parseInt(val, 10) }), className: "m-1", label: "Player" }))));
};
export default PersonalityTraits;
