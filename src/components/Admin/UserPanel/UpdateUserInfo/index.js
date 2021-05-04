import React, { useState } from 'react';
import uniqBy from 'lodash/uniqBy';
import uniq from 'lodash/uniq';
import DetailsFrame from '~/components/utils/DetailsFrame';
import SelectTags from '~/components/utils/SelectTags';
import PersonalityTraits from './PersonalityTraits';
import TimeFrame from './TimeFrame';
const tagClass = 'text-base mr-1 mb-1 p-1 text-white uppercase';
const uniqById = (newTags) => uniqBy(newTags, d => d.id);
const TagSet = props => {
    const { values, className, onClick, style, placeholder } = props;
    return (React.createElement("div", { style: style, className: `flex mt-1 cursor-pointer flex-wrap ${className}` },
        values.length === 0 && (React.createElement("div", { className: `${tagClass} bg-grey` }, placeholder)),
        values.map(a => (React.createElement("div", { onClick: () => onClick(a), key: a.title, className: `${tagClass} bg-black` },
            a.title,
            " ",
            React.createElement("span", { className: "text-sm" }, "x"))))));
};
const EnvPanel = props => {
    const { open, onClick, envs, onChange, uid } = props;
    const checkInEnv = (env) => env.uids && env.uids.includes(uid);
    const baseLiClass = 'border-b-2 p-1 m-1 text-lg flex justify-between items-center';
    return (React.createElement(DetailsFrame, { className: "flex flex-col mb-3", open: open, onClick: onClick, title: "Environments" },
        React.createElement("div", { className: "h-64 flex flex-col" },
            React.createElement("ul", { className: "list-reset m-2 " }, envs.map(env => (React.createElement("li", { className: baseLiClass, key: env.id },
                React.createElement("span", null, env.name),
                React.createElement("input", { className: "cursor-pointer", name: "inEnv", id: env.id, type: "checkbox", defaultChecked: checkInEnv(env), onChange: () => onChange(env) }))))))));
};
//
// const PLAYER_TYPES = [
//   {
//     trait: 'Philanthropist',
//     selected: false
//   },
//   {
//     trait: 'Socialiser',
//     selected: false
//   },
//   {
//     trait: 'Free Spirit',
//     selected: false
//   },
//   {
//     trait: 'Achiever',
//     selected: false
//   },
//   {
//     trait: 'Player',
//     selected: false
//   },
//   {
//     trait: 'Disruptor',
//     selected: false
//   }
// ];
//
// const BIG_FIVE = [
//   {
//     trait: 'Opennes',
//     selected: false
//   },
//   {
//     trait: 'Conscientiniousness',
//     selected: false
//   },
//   {
//     trait: 'Extraversion',
//     selected: false
//   },
//   {
//     trait: 'Agreeableness',
//     selected: false
//   },
//   {
//     trait: 'Neuroticism',
//     selected: false
//   }
// ];
const CONTENT = [
    {
        content: 'Islamic',
        selected: false
    },
    {
        content: 'Catholic',
        selected: false
    },
    {
        content: 'Judaism',
        selected: false
    }
];
const remove = (tags, id) => tags.filter(t => t.id !== id);
const AimsPanel = props => {
    const { open, onClick, onChange, topicDict, aims } = props;
    return (React.createElement(DetailsFrame, { className: "flex flex-col mb-3 overflow-visible", open: open, onClick: () => onClick(), overflow: true, title: "Learning Aims" },
        React.createElement("div", { className: "mb-3" },
            React.createElement(SelectTags, { key: "0", placeholder: "Enter Learning Aims", inputClassName: "flex-grow p-2 border-2 ", ulClassName: "h-max-32 overflow-y-auto", idAcc: (d) => d.id, valueAcc: (d) => d.title, onSelect: (newAim) => {
                    onChange({ aims: uniqById([...aims, newAim]) });
                }, values: topicDict }),
            React.createElement(TagSet, { values: aims, placeholder: "No aim", onClick: (n) => onChange({ aims: remove(aims, n.id) }) }))));
};
const UpdateUserInfo = props => {
    const { onChange, interests = [], topicDict = [], aims = [], deficits = [], sensitiveContent = [], personalityTraits, addUserToEnv, excludeUserFromEnv, user, envs, uid } = props;
    // const removeTag = ()
    const DEFICITS_PANEL = 'DEFICITS_PANEL';
    const AIMS_PANEL = 'AIMS_PANEL';
    const INTEREST_PANEL = 'INTEREST_PANEL';
    const SENSITIVITY_PANEL = 'SENSITIVITY_PANEL';
    const PERSONALITY_PANEL = 'PERSONALITY_PANEL';
    const ENV_PANEL = 'ENV_PANEL';
    const [panelId, setPanelId] = useState(null);
    const onPanelClick = (refId) => setPanelId(panelId === refId ? null : refId);
    const selectedStyle = {
        borderColor: 'black',
        borderWidth: '5px'
    };
    const checkInEnv = (env) => env.uids && env.uids.includes(uid);
    const handleInputChange = (env) => {
        if (checkInEnv(env)) {
            excludeUserFromEnv({ envId: env.id, usrInfo: user });
        }
        else {
            addUserToEnv({ envId: env.id, usrInfo: user });
        }
    };
    return (React.createElement("div", { className: "mr-1" },
        React.createElement(EnvPanel, { envs: envs, uid: uid, open: panelId === ENV_PANEL, onClick: () => onPanelClick(ENV_PANEL), onChange: handleInputChange }),
        React.createElement(DetailsFrame, { className: "flex flex-col mb-3", open: DEFICITS_PANEL === panelId, onClick: () => onPanelClick(DEFICITS_PANEL), title: "Learning Deficits" },
            React.createElement("div", { className: "mb-3" },
                React.createElement(SelectTags, { key: "1", btnContent: "Add", placeholder: "Enter Learning deficits", inputClassName: "z-0 flex-grow p-2 border-2 ", ulClassName: "h-max-32 overflow-y-auto", className: "", valueAcc: (d) => d.title, idAcc: (d) => d.id, onSelect: (newDeficit) => onChange({
                        deficits: uniqById([...deficits, newDeficit])
                    }), values: topicDict }),
                React.createElement(TagSet, { values: deficits, onClick: (n) => onChange({ deficits: remove(deficits, n.id) }), placeholder: "No deficits" }))),
        React.createElement(DetailsFrame, { className: "flex flex-col mb-3", open: panelId === INTEREST_PANEL, onClick: () => setPanelId(INTEREST_PANEL), title: "Interests" },
            React.createElement("div", { className: "mb-3" },
                React.createElement(SelectTags, { key: "2", placeholder: "Enter interests", inputClassName: "z-0 flex-grow p-2 border-2 ", ulClassName: "h-max-32 overflow-y-auto", valueAcc: (d) => d.title, idAcc: (d) => d.id, onSelect: (newInterest) => {
                        onChange({
                            interests: uniqById([...interests, newInterest])
                        });
                    }, values: topicDict }),
                React.createElement(TagSet, { values: interests, onClick: (n) => onChange({ interests: remove(interests, n.id) }), placeholder: "No deficits" }))),
        React.createElement(DetailsFrame, { className: "flex flex-col overflow-y-auto mb-3", open: SENSITIVITY_PANEL === panelId, onClick: () => onPanelClick(SENSITIVITY_PANEL), title: "Sensitive CONTENT" },
            React.createElement("p", { className: "mb-2" }, "Sensitive CONTENT"),
            React.createElement("div", { className: "flex flex-wrap justify-between" }, CONTENT.map(sc => (React.createElement("button", { type: "button", id: sc.content, className: "btn border-2 p-2", onClick: () => {
                    if (sc.selected) {
                        onChange({
                            sensitiveContent: sensitiveContent.filter(s => s.content !== sc.content)
                        });
                    }
                    else {
                        onChange({
                            sensitiveContent: uniq([
                                ...sensitiveContent,
                                sc.content
                            ])
                        });
                    }
                }, style: sc.selected ? selectedStyle : undefined }, sc.content))))),
        React.createElement(PersonalityTraits, { traits: personalityTraits, onChange: (traits) => onChange({ personalityTraits: traits }), open: PERSONALITY_PANEL === panelId, onClick: () => onPanelClick(PERSONALITY_PANEL) }),
        React.createElement(AimsPanel, { onChange: onChange, aims: aims, onClick: () => onPanelClick(AIMS_PANEL), topicDict: topicDict, open: AIMS_PANEL === panelId }),
        React.createElement(TimeFrame, Object.assign({}, props))));
};
export default UpdateUserInfo;
