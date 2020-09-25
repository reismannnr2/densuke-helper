import 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'src/app';
import { setDefaultLocale, registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ja from 'date-fns/locale/ja';

registerLocale('ja', ja);
setDefaultLocale('ja');

ReactDOM.render(<App />, document.getElementById('root'));
