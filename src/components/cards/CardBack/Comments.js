import React, { useState, useEffect } from 'react';
import { timeFormat } from 'd3-time-format';
// import UserIcon from 'react-feather/dist/icons/user';
import uuidv1 from 'uuid/v1';
import CardDB from '~/firebase/db/card_db';
import { avatarUrls } from '~/constants/avatars';
/**
 * Component to fetch data for CommentList
 */
const CommentsWrapper = props => {
    const { author, cardId, extended, userEnvId } = props;
    const [comments, setComments] = useState([]);
    const { uid, username, avatar } = author;
    const db = CardDB(userEnvId);
    useEffect(() => {
        db.readComments(cardId).then(setComments);
    }, []);
    console.log('comments', comments);
    console.log('author', author);
    return (React.createElement(CommentList, { extended: extended, data: comments.sort((a, b) => +b.date - +a.date), onAdd: (text) => {
            db.addComment({ cardId, uid, text, username, avatar }).then((c) => console.log('comment added', c));
            const comment = {
                id: uuidv1(),
                text,
                cardId,
                avatar,
                uid,
                username,
                date: new Date()
            };
            setComments([comment, ...comments]);
        } }));
};
/**
 * List of Comments
 */
const CommentList = ({ data, onAdd, extended }) => (React.createElement("div", { className: "m-2 flex flex-col flex-grow flex-shrink" },
    React.createElement("div", { className: "flex mb-2" },
        React.createElement("h2", { className: "tag-label bg-black" }, "Comments")),
    data.length === 0 && React.createElement("div", { className: "tex-lg" }, "No Comments"),
    React.createElement("div", { className: "mb-auto overflow-y-auto" }, data.map(({ ...c }) => (React.createElement(OneComment, Object.assign({}, c))))),
    extended && React.createElement(AddComment, { onClick: onAdd })));
/**
 * One single Comment
 */
const OneComment = props => {
    const { text, username, avatar = 'user1', date } = props;
    const formatTime = timeFormat('%B %d, %Y');
    return (React.createElement("div", { className: "flex items-center mb-2 pb-1 border-b" },
        React.createElement("div", { className: "mr-2 border-black flex-col-wrapper justify-center" }, avatar && (React.createElement("img", { width: "30", height: "30", src: avatarUrls[avatar], alt: "alt" }))),
        React.createElement("div", null,
            React.createElement("div", { className: "mb-1" }, text),
            React.createElement("div", { className: "italic text-sm" },
                ' ',
                React.createElement("span", { className: "font-bold" }, username || 'user'),
                ', ',
                formatTime(date)))));
};
const AddComment = props => {
    const { onClick } = props;
    const [text, setText] = useState(null);
    return (React.createElement("div", { className: "mt-5" },
        React.createElement("input", { className: "mb-2 form-control mb-1 w-full border", placeholder: "Write a comment", type: "text", onChange: (e) => setText(e.target.value) }),
        React.createElement("button", { className: "btn w-full border-2 p-2", type: "button", disabled: text === null || text === '', onClick: () => {
                onClick(text);
                setText(null);
            } }, "Submit")));
};
export default CommentsWrapper;
