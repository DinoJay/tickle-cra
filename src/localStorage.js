export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log('error in loading localStorage', err);
    return undefined;
  }
};

export const saveState = state => {
  try {
    // console.log('state to serialize', state);
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.log('error in save state', err);
  }
};
