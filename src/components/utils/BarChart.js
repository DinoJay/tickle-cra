import React from 'react';
import defIconSrc from '~/styles/alphabet_icons/ic_ak.svg';
const BarChart = props => {
    const { data, className, countAcc = (d) => d.count, titleAcc = (d) => d.title, imgAcc = (d) => d.img.url, style, onClick = (d) => d, selectedId, sumAcc } = props;
    // const sum = data.reduce((acc, d) => acc + countAcc(d), 0).toFixed();
    const percent = (d) => {
        // const s =
        console.log('bar data', data);
        return (countAcc(d) * 100) / sumAcc(d);
    };
    console.log('test');
    return (React.createElement("div", { className: className, style: style }, data.map((d) => (React.createElement("div", { className: "mb-2 flex-grow" },
        React.createElement("div", { className: "flex items-center mt-1 text-base", onClick: () => onClick(d) },
            React.createElement("div", { className: "mr-2 text-sm", style: {
                    minHeight: '3rem',
                    minWidth: '3rem',
                    background: `url(${imgAcc(d) || defIconSrc})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                } }),
            React.createElement("button", { type: "button", className: `border-4 border-black bg-yellow-500 h-12 flex items-center ${selectedId &&
                    selectedId === d.id &&
                    'text-white bg-black'} `, style: {
                    width: `${percent(d)}%`
                } }, percent(d) > 40 && (React.createElement("div", { className: "p-1 flex flex-grow break-words justify-between" },
                React.createElement("div", { className: "text-truncate " }, titleAcc(d)),
                React.createElement("div", null,
                    countAcc(d).toFixed(),
                    "XP")))),
            percent(d) <= 40 && (React.createElement("div", { className: "p-1 flex flex-wrap break-words  flex-grow text-truncate" },
                React.createElement("div", { className: "truncate mr-1" }, titleAcc(d)),
                React.createElement("div", null,
                    countAcc(d).toFixed(),
                    "XP")))))))));
};
export default BarChart;
