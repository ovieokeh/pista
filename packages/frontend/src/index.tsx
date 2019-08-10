import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AOS from 'aos';
import { history } from './utils';
import App from './App';

const mountNode = document.querySelector('#mount');
ReactDOM.render(<App history={history} AOS={AOS} />, mountNode);
