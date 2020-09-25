/** @jsx jsx */
import { css, Interpolation, jsx } from '@emotion/core';
import React, { PropsWithChildren } from 'react';
import { ObservableState } from '@reismannnr2/observable-state';
import { useCurrentState$ } from '@reismannnr2/react-observable-state-hooks';
import { toggleBox } from './common-styles';

export function RadioBox<List extends string>(
  props: PropsWithChildren<{
    value: List;
    target$: ObservableState<List>;
    styles?: Interpolation;
  }>,
): React.ReactElement | null {
  const [current] = useCurrentState$(props.target$);
  const checked = current === props.value;
  return (
    <label css={css({ display: 'block' })}>
      <input
        type="radio"
        checked={checked}
        css={css({ display: 'none' })}
        value={props.value}
        onChange={() => {
          props.target$.update(() => props.value);
        }}
      />
      <div css={css(toggleBox(checked), props.styles)}>{props.children}</div>
    </label>
  );
}
