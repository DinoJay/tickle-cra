import React from "react";
import { LngLat } from "mapbox-gl";
import BackgroundImg from "~/components/utils/BackgroundImg";
import ChevronLeft from "react-feather/dist/icons/chevron-right";
import IcAk from "~/styles/alphabet_icons/ic_ak.svg";
const angleDeg = (p1, p2) => (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI;
const Compass = props => {
    const { className, selectedCardId, userLocation, map, cards, style } = props;
    const [locs, setLocs] = React.useState([]);
    const getNewPos = () => {
        if (map) {
            setLocs(cards.map((c) => {
                const p = map.project(new LngLat(c.loc.value.longitude, c.loc.value.latitude));
                return { ...c, ...p };
            }));
        }
    };
    React.useEffect(() => {
        getNewPos();
        map.on("zoom", getNewPos);
        map.on("drag", getNewPos);
        map.on("move", getNewPos);
        return () => {
            map.off("zoom", getNewPos);
            map.off("drag", getNewPos);
            map.off("move", getNewPos);
        };
    }, [userLocation]);
    // const line = lineMaker()
    //   .x(d => d.x)
    //   .y(d => d.y);
    // console.log('map', map)
    const { x, y } = map.project(new LngLat(userLocation.longitude, userLocation.latitude));
    // const userPos = [x, y];
    const circlePoint = ([x1, y1], [x2, y2], r = 50) => {
        const phi = Math.atan2(y2 - y1, x2 - x1);
        const cx = x1 + r * Math.cos(phi);
        const cy = y1 + r * Math.sin(phi);
        return [cx, cy];
    };
    // const distance = Math.round(calcDistance(from, to, options) * 1000);
    const cardsWithPos = locs.map(p => {
        const cp = circlePoint([x, y], [p.x, p.y]);
        const ap = circlePoint([x, y], [p.x, p.y]);
        const deg = angleDeg({ x, y }, { x: ap[0], y: ap[1] });
        return { ...p, x1: cp[0], y1: cp[1], x2: ap[0], y2: ap[1], deg };
    });
    return (React.createElement("div", Object.assign({}, { className, style }),
        React.createElement("div", null, cardsWithPos
            .filter(c => !selectedCardId || c.id === selectedCardId)
            .map(p => (React.createElement(React.Fragment, null,
            React.createElement("button", { type: "button", className: "absolute align-middle w-8 h-8 ", style: { left: p.x1, top: p.y1 } },
                React.createElement(BackgroundImg, { className: "w-full h-full bg-yellow-500 border-2 border-black rounded-full", src: p.img && p.img.value ? p.img.value.url : IcAk })),
            React.createElement("div", { id: "compass", className: "hidden absolute bg-yellow-500", style: {
                    left: p.x2,
                    top: p.y2
                    // transform: `translateX(-100%) rotate(${p.deg}deg)`
                } },
                React.createElement(ChevronLeft, null)))))),
        React.createElement("svg", { className: "w-full h-full" },
            React.createElement("circle", { cx: x, cy: y, style: { stroke: "black", fill: "none" }, r: 50 }))));
};
export default Compass;
