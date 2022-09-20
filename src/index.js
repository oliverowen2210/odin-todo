import './style.css';
import project from './projects.js';
import { todoFactory, todoController } from './to-do.js';

const page = document.querySelector('body');
const coolButton = document.createElement('button');
window.obj = todoFactory('odin todo list', 'high', 'tomorrow');