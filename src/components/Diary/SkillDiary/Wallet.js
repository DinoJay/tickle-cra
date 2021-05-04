import React, { useState } from 'react';
import clsx from 'clsx';
import FlexCollapsible from '~/components/utils/FlexCollapsible';
import { BlackModal, ModalBody } from '~/components/utils/Modal';
import PreviewTag from '~/components/utils/PreviewTag';
import TagDetail from '~/components/utils/TagDetail';
const Wallet = props => {
    const { open, allRewards, onClick, style, authUser, updateAuthUser, ownedRewards, xPoints, allXpoints } = props;
    const { rewardIds: ownedRewardIds = [] } = authUser;
    const availableRewards = allRewards.filter(r => !ownedRewardIds.includes(r.id));
    const AVAIL = 'affordable';
    const BOUGHT = 'bought';
    const [filterId, setFilterId] = useState(AVAIL);
    const [selectedReward, setReward] = useState(null);
    const selectedRewards = filterId === AVAIL ? availableRewards : ownedRewards;
    const affordable = selectedReward && xPoints > selectedReward.points;
    const owned = selectedReward && ownedRewardIds.includes(selectedReward.id);
    const pointsOfSelectedReward = selectedReward !== null ? selectedReward.points : null;
    return (React.createElement(React.Fragment, null,
        React.createElement(FlexCollapsible, { header: "Wallet", className: "w-full overflow-hidden mb-2", open: open, onClick: onClick, style: style, footer: React.createElement("div", { className: "flex flex-grow text-base" },
                React.createElement("div", { className: "flex" },
                    React.createElement("button", { type: "button", className: clsx(`btn border-2 p-1 mr-1 $ `, filterId === AVAIL && 'bg-gray-500 text-white '), onClick: () => setFilterId(AVAIL) },
                        "available (",
                        availableRewards.length,
                        ")"),
                    React.createElement("button", { type: "button", className: clsx(`btn border-2 p-1 mr-1 $`, filterId === BOUGHT && 'bg-gray-500 text-white'), onClick: () => setFilterId(BOUGHT) },
                        "Bought (",
                        ownedRewards.length,
                        ")")),
                React.createElement("div", { className: "ml-auto items-center text-lg font-bold flex flex-wrap" },
                    React.createElement("div", null,
                        xPoints,
                        "/"),
                    React.createElement("div", null,
                        allXpoints,
                        "XP"))) },
            React.createElement("div", { className: "flex justify-center flex-wrap overflow-y-auto flex-max-grow mb-10" },
                selectedRewards.length === 0 && (React.createElement("div", { className: "m-1 text-xl italic" }, "No Rewards!")),
                selectedRewards.map((r) => (React.createElement(PreviewTag, Object.assign({}, r, { title: r.title, points: r.points, className: "flex-none m-1", onClick: () => {
                        setReward(r);
                    } })))))),
        React.createElement(BlackModal, { visible: !!selectedReward },
            React.createElement(ModalBody, { className: "flex flex-grow", onClose: () => 
                /* TODO */
                null },
                selectedReward && (React.createElement(React.Fragment, null,
                    React.createElement(TagDetail, Object.assign({}, selectedReward, { className: "flex-grow w-full" })),
                    React.createElement("div", { className: "flex mt-auto" },
                        affordable && selectedReward && (React.createElement("button", { type: "button", className: "btn bg-green-500 flex-grow flex-shrink-0 p-2 text-white", onClick: () => {
                                if (selectedReward)
                                    updateAuthUser({
                                        rewardIds: [
                                            ...ownedRewardIds,
                                            selectedReward.id
                                        ]
                                    });
                                setReward(null);
                            } },
                            "Buy (",
                            pointsOfSelectedReward,
                            "$)")),
                        owned && (React.createElement("button", { type: "button", className: "btn bg-yellow-500 flex-grow flex-shrink-0 p-2 text-white", onClick: () => {
                                updateAuthUser({
                                    rewardIds: ownedRewardIds.filter((id) => id !== selectedReward.id)
                                });
                                setReward(null);
                            } },
                            "Sell (",
                            pointsOfSelectedReward,
                            "$)")),
                        !owned && !affordable && (React.createElement("div", { className: "mt-1 uppercase text-center flex-grow p-2 text-red-500 border-2 border-red-500 font-bold" }, "Not enough Money!!!"))))),
                React.createElement("button", { type: "button", className: "mt-1 btn border-2 border-red p-2", onClick: () => setReward(null) }, "Close")))));
};
export default Wallet;
