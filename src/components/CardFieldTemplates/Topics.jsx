import React, { useState, useEffect } from "react";
// import PropTypes from 'prop-types';
// i
import uniq from "lodash/uniq";
import posed, { PoseGroup } from "react-pose";

import SelectTags from "~/components/utils/SelectTags";

import { ModalBody } from "~/components/utils/Modal";
import useDidUpdateEffect from "~/components/utils/useDidUpdateEffect";

import useDeepCompareMemoize from "~/components/utils/useDeepCompareMemoize";

import { TOPICS } from "~/constants/cardFields";

import PreviewFrame from "./PreviewFrame";

export const key = TOPICS;

export const label = "Topics";

const AnimDiv = posed.div();

const btnClass = "btn text-2xl";

const INCR = 10;
const MAX_POINTS = 100;
const MIN_POINTS = 0;

const PointCont = props => {
	const { value, onChange, style, className } = props;

	const incrValid = value + INCR <= MAX_POINTS;
	const decrValid = value - INCR >= MIN_POINTS;

	const addPoints = () => (incrValid ? onChange(value + INCR) : null);
	const substractPoints = () => (decrValid ? onChange(value - INCR) : null);

	const upBtnClass = `${btnClass} ${!incrValid ? "opacity-50" : "opacity-100"}`;
	const downBtnClass = `${btnClass} ${
		!decrValid ? "opacity-50" : "opacity-100"
	}`;

	return (
		<div className={`flex flex-col w-full ${className}`} style={style}>
			<div className="flex border-2 items-center justify-between">
				<div className="px-2 text-5xl">{value}</div>
				<div className="flex flex-col justify-between">
					<button
						disabled={!incrValid}
						className={`text-grey ${upBtnClass}`}
						type="button"
						onClick={addPoints}
					>
						△
					</button>
					<button
						disabled={!decrValid}
						className={`text-grey ${downBtnClass}`}
						type="button"
						onClick={substractPoints}
					>
						▽
					</button>
				</div>
			</div>
		</div>
	);
};

export const ModalContent = props => {
	const { topics: initTopics, onChange, topicDict, modalProps } = props;

	const [topicIds, setTopicIds] = useState(initTopics.value || []);
	const [points, setPoints] = useState(initTopics.points || 10);

	const topics = topicIds.map(id => topicDict.find(d => d.id === id));

	useDidUpdateEffect(() => {
		onChange({ key, label, value: topicIds, points });
	}, [useDeepCompareMemoize(topicIds)]);

	return (
		<ModalBody {...modalProps}>
			<SelectTags
				className="mt-1"
				placeholder="Select Interests"
				optionClassName="text-2xl"
				inputClassName="flex-grow p-2 text-2xl border-2 "
				idAcc={d => d.id}
				valueAcc={d => d.title}
				onSelect={t => {
					setTopicIds(uniq([...topicIds, t.id]));
				}}
				values={topicDict}
			/>
			<div className="flex my-3 flex-wrap overflow-y-auto">
				{topicIds.length === 0 && (
					<div className="tag-label mb-1 mt-1 bg-grey ">No Interests</div>
				)}
				<PoseGroup animateOnMount>
					{topics.map(d => (
						<AnimDiv
							key={d.title}
							className="tag-label text-3xl mr-1 mt-1 mb-1 cursor-pointer"
							onClick={() => setTopicIds(topicIds.filter(e => e !== d.id))}
						>
							{d.title}
						</AnimDiv>
					))}
				</PoseGroup>
			</div>
		</ModalBody>
	);
};

export const Preview = props => {
	const { onClick, topics, topicDict } = props;
	const topicIds = topics.value !== null ? topics.value : [];

	const selectedTopics = topicIds.map(id => topicDict.find(t => t.id === id));

	return (
		<PreviewFrame
			onClick={onClick}
			type={label}
			empty={topics.value === null || topics.value.length === 0}
			content={() => (
				<div className="flex flex-wrap">
					{selectedTopics.map(d => (
						<div className="tag-label mr-1 mb-1 mr-1">{d.title}</div>
					))}
					{!selectedTopics.length && <span className="italic">No Topics</span>}
				</div>
			)}
		/>
	);
};
