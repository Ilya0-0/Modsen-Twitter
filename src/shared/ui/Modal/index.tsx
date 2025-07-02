'use client';

import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { useClickOutside } from '~/hooks/useClickOutside';
import { useLockScroll } from '~/hooks/useLockScroll';
import CloseIcon from '~/public/svg/black-cross.svg?react';

import styles from './styles.module.scss';

type ModalProps = {
  onClose: () => void;
  children: ReactNode;
  title?: string;
};

const Modal = ({ onClose, title, children }: ModalProps) => {
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLockScroll(true);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div ref={modalRef} className={styles.overlay} data-testid="modal-overlay">
      <div className={styles.modalContent} role="dialog" aria-modal="true">
        <header>
          {title && <h3>{title}</h3>}
          <CloseIcon
            className={styles.modalCloseBtn}
            onClick={onClose}
            aria-label="Close modal"
          />
        </header>

        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
