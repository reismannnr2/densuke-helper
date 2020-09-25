/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { PropsWithChildren } from 'react';
import GlobalStyle from 'src/components/global-style';

export function Layout(
  props: PropsWithChildren<unknown>,
): React.ReactElement | null {
  return (
    <div
      css={css({
        display: 'grid',
        gridTemplateRows: 'fit-content(100%) 1fr fit-content(100%)',
        minHeight: '100vh',
      })}
    >
      <GlobalStyle />
      <header
        css={css({
          display: 'flex',
          alignItems: 'flex-end',
          height: '2.5rem',
          padding: '0.5rem 1rem',
          borderBottom: '1px solid black',
        })}
      >
        Densuke Helper
      </header>
      <div
        css={css({
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        })}
      >
        {props.children}
      </div>
      <footer
        css={css({
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          padding: '0 1rem',
        })}
      >
        <small
          css={css({
            fontSize: 'smaller',
          })}
        >
          Copyright © 2020 author
        </small>
      </footer>
    </div>
  );
}
