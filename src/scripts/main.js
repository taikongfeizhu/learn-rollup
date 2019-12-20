import '../styles/main.css';

import $$ from 'jquery';
import { sayHelloTo } from './modules/mod1';
import addArray from './modules/mod2';

const result1 = sayHelloTo('Jason');
const result2 = addArray([1, 2, 3, 4]);

const printTarget = $$('.debug__output');

console.log(ENV);

printTarget.text(result1);

console.log(result2);
