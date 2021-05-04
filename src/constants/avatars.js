import flatten from 'lodash/flatten';
import user1 from '~/styles/avatars/nerd.svg';
import user2 from '~/styles/avatars/user2.svg';
import user3 from '~/styles/avatars/user3.svg';
import user4 from '~/styles/avatars/user4.svg';
import user5 from '~/styles/avatars/user5.svg';
import user6 from '~/styles/avatars/user6.svg';
import user7 from '~/styles/avatars/user7.svg';
import user8 from '~/styles/avatars/user8.svg';
const avatarDict = {
    scout: {
        title: 'Scout',
        id: 'scout',
        description: ' a person or thing that explores.  a person who investigates unknown regions: the great explorers of the Renaissance.  any instrument used in exploring or sounding a wound, a cavity in a tooth, or the like.  (initial capital letter) Also called Explorer Scout. a person between the ages 14 and 20 who is an active participant in the exploring program sponsored by the Boy Scouts of America.  (initial capital letter) Aerospace. one of a long series of U.S. scientific satellites: Explorer 1 (1958) was the first U.S. artificial satellite.',
        imgs: [
            { name: 'user1', id: 'user1', url: user1 },
            { name: 'user2', id: 'user2', url: user2 },
            { name: 'user2', id: 'user3', url: user3 }
        ]
    },
    supporter: {
        id: 'supporter',
        title: 'supporter',
        description: 'verb (used with object), a·chieved, a·chiev·ing.  to bring to a successful end; carry through; accomplish: The police crackdown on speeders achieved its purpose.  to get or attain by effort; gain; obtain: to achieve victory. verb (used without object), a·chieved, a·chiev·ing.  to bring about an intended result; accomplish some purpose or effect.',
        imgs: [
            { name: 'user1', id: 'user4', url: user4 },
            { name: 'user2', id: 'user5', url: user5 },
            { name: 'user6', id: 'user6', url: user6 }
        ]
    },
    entrepreneur: {
        id: 'entrepreneur',
        title: 'Entrepreneur',
        description: 'noun, plural en·tre·pre·neurs [ahn-truh-pruh-nurz, -noo rz; French ahn-truh-pruh-nœr] /ˌɑn trə prəˈnɜrz, -nʊərz; French ɑ̃ trə prəˈnœr/.  a person who organizes and manages any enterprise, especially a business, usually with considerable initiative and risk.  an employer of productive labor; contractor.  verb (used with object)',
        imgs: [
            { id: 'user7', name: 'user7', url: user7 },
            { name: 'user8', id: 'user8', url: user8 }
        ]
    }
};
export const avatars = flatten(Object.keys(avatarDict).map(k => avatarDict[k].imgs.map(d => ({
    ...avatarDict[k],
    type: avatarDict[k].id,
    id: d.id,
    imgs: undefined,
    img: d
}))));
export const avatarUrls = {
    user1,
    user2,
    user3,
    user4,
    user5,
    user6,
    user7,
    user8
};
export default avatarDict;
