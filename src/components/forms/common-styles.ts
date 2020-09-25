import { css, Interpolation } from '@emotion/core';

export const toggleBox = (checked?: boolean): Interpolation =>
  css({
    border: `1px ${checked ? 'solid #222' : 'dashed #888'}`,
    backgroundColor: checked ? '#222' : '#fff',
    color: checked ? '#fff' : '#222',
  });
