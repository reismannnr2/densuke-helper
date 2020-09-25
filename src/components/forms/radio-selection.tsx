/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { PropsWithChildren } from 'react';
import { ObservableState } from '@reismannnr2/observable-state';
import { RadioBox } from './radio-box';

export function RadioSelection<List extends string>(
  props: PropsWithChildren<{
    definitions: Array<{ value: List; label: string }>;
    target$: ObservableState<List>;
  }>,
): React.ReactElement | null {
  return (
    <ul css={css()}>
      {props.definitions.map((def) => (
        <li key={def.value}>
          <RadioBox value={def.value} target$={props.target$}>
            {def.label}
          </RadioBox>
        </li>
      ))}
    </ul>
  );
}
