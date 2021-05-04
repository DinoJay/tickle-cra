import computer from './computer.svg';
import art from './art.svg';
import work from './work.svg';
import sports from './sports.svg';
import history from './history.svg';
import film from './film.svg';

export {computer, art, work, sports, history, film};

const dict: {
  computer: string;
  art: string;
  work: string;
  sports: string;
  history: string;
  film: string;
  [key: string]: string;
} = {
  computer,
  art,
  work,
  sports,
  history,
  film
};

export default Object.keys(dict).map(k => ({
  key: k,
  src: dict[k]
}));
