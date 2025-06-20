import { RefObject, useCallback, useEffect } from 'react';

export const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  onClose: () => void
) => {
  const handleOverlayClick = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) {
        return;
      }

      if (
        (ref.current && !ref.current.contains(e.target as Node)) ||
        e.target === ref.current
      ) {
        if (onClose) onClose();
      }
    },
    [ref, onClose]
  );

  const handleEscapeKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (onClose) onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('click', handleOverlayClick);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('click', handleOverlayClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [handleOverlayClick, handleEscapeKey]);

  return null;
};
