import React from 'react';
import { ObservableState } from '@reismannnr2/observable-state';

export interface DatePattern {
  value: string;
  days: [boolean, boolean, boolean, boolean, boolean, boolean, boolean];
  holiday: 'include' | 'exclude' | 'ignore';
  include: string[];
  exclude: string[];
}

export interface State {
  patterns: DatePattern[];
}

export const init: State = {
  patterns: [],
};
export const state$ = new ObservableState(init);
export const StateContext = React.createContext(state$);
