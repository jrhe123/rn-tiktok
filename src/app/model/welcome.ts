import { Option } from '@features/un-authentication/welcome/type';

export type FormCustomizeType = {
  options: Option[];
};

export interface WelcomeState {
  loading: boolean;
  error: string;
}
