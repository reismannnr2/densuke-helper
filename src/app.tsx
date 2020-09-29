import { hot } from 'react-hot-loader/root';
import React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Index } from 'src/pages';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import ja from 'date-fns/locale/ja';

registerLocale('ja', ja);
setDefaultLocale('ja');

function App(): React.ReactElement | null {
  return (
    <DndProvider backend={HTML5Backend}>
      <Index />
    </DndProvider>
  );
}

export default hot(App);
