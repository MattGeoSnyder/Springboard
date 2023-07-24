const getLocalStorge = () => {
  return (JSON.parse(window.localStorage.getItem('user')));
}

const setLocalStorage = (user) => {
  console.log('Setting local storage to', user);
  window.localStorage.setItem('user', JSON.stringify(user));
}

const removeLocalStorage = () => {
  window.localStorage.setItem('user', '{}');
}

const useLocalStorage = () => {
  return [getLocalStorge, setLocalStorage, removeLocalStorage];
}

export { useLocalStorage };