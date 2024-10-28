import { MouseEventHandler, RefObject, useEffect } from 'react';

const useClickOutside = <callbackT>(
  ref?: RefObject<HTMLElement>,
  callback?: callbackT,
  isAddEvent?: boolean,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref?.current && !ref?.current.contains(event.target as HTMLElement)) {
        typeof callback === 'function' && callback();
      }
    };

    if (isAddEvent) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback, ref, isAddEvent]);
};

export default useClickOutside;
