import React from 'react';
import Plus from 'react-feather/dist/icons/plus';
import softSkillData from '~/constants/softSkillData';
import BarChart from '~/components/utils/BarChart';
import FlexCollapsible from '~/components/utils/FlexCollapsible';
const PlusBtn = props => (React.createElement("button", Object.assign({ type: "button", className: "btn p-2 bg-black" }, props),
    React.createElement(Plus, { color: "white" })));
const BadgeMenu = props => {
    const { onClick, openPanel, open } = props;
    const data = softSkillData
        .slice(0, 4)
        .map((d) => ({ ...d, count: 3 + Math.random() * 20 }));
    return (React.createElement(FlexCollapsible, { className: "mb-2", open: open, header: React.createElement("h4", null, "Soft-Skills"), onClick: onClick, footer: React.createElement(React.Fragment, null,
            React.createElement("div", { className: "text-xl ", style: { width: '90%' } }, "100$"),
            React.createElement(PlusBtn, { onClick: openPanel })) },
        React.createElement("div", null,
            React.createElement(BarChart, { className: "flex-shrink-0", sumAcc: () => 100, data: data }))));
};
export default BadgeMenu;
