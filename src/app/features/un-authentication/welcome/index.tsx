import React, { memo, useState } from 'react';

import isEqual from 'react-fast-compare';

import { STORAGE_WELCOME_COMPLETE } from '@common';
import { navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { saveString } from '@storage';

import { FirstP } from './components/first-page';
import { SecondP } from './components/second-page';
import { ThirdP } from './components/third-page';
import { INTEREST_OPTIONS } from './data';
import { Option } from './type';

const WelcomeComponent = () => {
  const [step, setStep] = useState<number>(1);
  const [options, setOptions] = useState<Option[]>(INTEREST_OPTIONS);

  if (step === 1) {
    return <FirstP handleConfirm={() => setStep(2)} />;
  } else if (step === 2) {
    return (
      <SecondP
        options={options}
        handleSetOptions={(options: Option[]) => setOptions(options)}
        handleConfirm={() => {
          const filtered = options.filter(op => op.selected);
          console.log('filtered: ', filtered);
          setStep(3);
        }}
      />
    );
  } else if (step === 3) {
    return (
      <ThirdP
        handleConfirm={() => {
          saveString(STORAGE_WELCOME_COMPLETE, '1');
          navigate(APP_SCREEN.HOME);
        }}
      />
    );
  }
  return null;
};

export const Welcome = memo(WelcomeComponent, isEqual);
