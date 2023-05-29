import { useState, useEffect } from 'react';

function usePersistentState(key, defaultValue) {

  const [state, setState] = useState(() => {
    const persistedState = sessionStorage.getItem(key);
    return persistedState ? JSON.parse(persistedState) : defaultValue;
  });

  useEffect(() => {
      sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default usePersistentState;
