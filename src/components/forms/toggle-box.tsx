/** @jsx jsx */
import { css, jsx, Interpolation } from '@emotion/core';
import React, { PropsWithChildren } from 'react';
import { ObservableState } from '@reismannnr2/observable-state';
import { useCurrentState$ } from '@reismannnr2/react-observable-state-hooks';
import { toggleBox } from './common-styles';

export function ToggleBox(
  props: PropsWithChildren<{
    check$: ObservableState<boolean>;
    styles?: Interpolation;
  }>,
): React.ReactElement | null {
  const [checked] = useCurrentState$(props.check$);
  return (
    <label css={css({ display: 'block' })}>
      <input
        type="checkbox"
        checked={checked}
        css={css({ display: 'none' })}
        onChange={(e) => {
          props.check$.update(() => e.target.checked);
        }}
      />
      <div css={css(toggleBox(), props.styles)}>{props.children}</div>
    </label>
  );
}
