import { group } from 'd3-array';
import uniq from 'lodash/uniq';
import flatten from 'lodash/flatten';
export default function setify(data) {
    const spreadData = flatten(data.map((d) => {
        const spreadCards = d.topics && Array.isArray(d.topics.value) ? d.topics.value : [];
        return spreadCards.map(t => ({
            ...d,
            topicId: t.id,
            cards: spreadCards
        }));
    }));
    const nested = [
        ...group(spreadData, (d) => d.topicId)
    ]
        .map(d => ({ id: d[0], cards: d[1] }))
        // TODO: fix later, really confusing
        // TODO: fix later, really confusing
        .map((d) => {
        const relatedTopics = uniq(flatten(Array.isArray(d.cards)
            ? d.cards.map((e) => e.topics && Array.isArray(e.topics.value)
                ? e.topics.value
                : [])
            : []));
        const { description = 'example', img = { url: 'example', name: 'example', id: 'example' }, title = 'example' } = relatedTopics.find((e) => e.id === d.id) || {};
        const points = relatedTopics.reduce((acc, t) => (t && t.points ? acc + t.points : acc), 0);
        return {
            description,
            img,
            title,
            count: d.cards.length,
            points,
            relatedTopics,
            ...d
        };
    })
        .sort((a, b) => (b.cards || []).length - (a.cards || []).length);
    return nested;
}
