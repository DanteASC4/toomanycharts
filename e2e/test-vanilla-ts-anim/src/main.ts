import basicChart from './scripts/0-0-1-example';
import './style.css';

const app = document.querySelector<HTMLDivElement>('#app')!;
const addMyChart = basicChart();
app.appendChild(addMyChart);
