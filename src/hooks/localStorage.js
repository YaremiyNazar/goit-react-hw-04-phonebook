import {useState, useEffect  } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(localStorage.getItem(key)) ?? initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState];
};
export default useLocalStorage