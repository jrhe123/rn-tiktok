import React from 'react';

export type BottomSheetProps = {
  children?: React.ReactNode;
  height: number;
  secondHeight?: number;
  throttle: number;
  toggleModal: (toggle: boolean) => void;
};

export type BottomSheetRefProps = {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
};
