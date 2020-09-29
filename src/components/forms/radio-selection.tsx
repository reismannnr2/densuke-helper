/** @jsx jsx */
import { css, Interpolation, jsx } from '@emotion/core';
import React, { PropsWithChildren } from 'react';
import { ObservableState } from '@reismannnr2/observable-state';
import { RadioBox } from './radio-box';

export function RadioSelection<List extends string>(
  props: PropsWithChildren<{
    definitions: Array<{ value: List; label: string }>;
    target$: ObservableState<List>;
    styles?: Interpolation;
    itemStyles?: Interpolation;
  }>,
): React.ReactElement | null {
  return (
    <ul
      css={css(
        css({
          display: 'flex',
        }),
        props.styles,
      )}
    >
      {props.definitions.map((def) => (
        <li
          key={def.value}
          css={css({
            '&:not(:last-of-type)': {
              marginRight: '0.5rem',
            },
          })}
        >
          <RadioBox
            value={def.value}
            target$={props.target$}
            styles={css(
              {
                padding: '0 0.25rem',
              },
              props.itemStyles,
            )}
          >
            {def.label}
          </RadioBox>
        </li>
      ))}
    </ul>
  );
}
