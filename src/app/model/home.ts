export interface HistoryProps {
  key: string;
  type: string;
}

export interface HomeState {
  loading: boolean;
  error: string;
  history: HistoryProps[];
}
