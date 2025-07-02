'use client';

import { useState } from 'react';

export const useModal = (initialState = false) => {
  const [isModalOpen, setIsModalOpen] = useState(initialState);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return { isOpen: isModalOpen, openModal, closeModal };
};
