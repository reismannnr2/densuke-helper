/** @jsx jsx */
import { css, jsx, Global } from '@emotion/core';
import React from 'react';

export default function GlobalStyle(): React.ReactElement | null {
  const global = css({
    'html, body': {
      height: '100vh',
      margin: 0,
      padding: 0,
      fontSize: 16,
      scrollBehavior: 'smooth',
      overflow: 'hidden',
      backgroundColor: '#fff',
      color: '#222',
    },
    '#root': {
      height: '100%',
      overflowY: 'scroll',
    },
    '*, *::before, *::after': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
    },
    'ul, ol': {
      listStyleType: 'none',
      margin: 0,
      padding: 0,
    },
  });
  return <Global styles={global} />;
}
