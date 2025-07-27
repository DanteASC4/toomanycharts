import BasicChart from './script';
import './style.css';

const app = document.querySelector<HTMLDivElement>('#app')!;
const addMyChart = BasicChart();
app.appendChild(addMyChart);
