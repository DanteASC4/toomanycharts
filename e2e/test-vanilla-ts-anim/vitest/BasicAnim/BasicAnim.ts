import { animate, utils } from 'animejs';
import { barchart } from 'justcharts';
import '../app.css';

const growBars = () => {
  utils.set('.el-bar', {
    transformOrigin: 'bottom center',
    scaleY: 0,
  });
  animate('.el-bar', {
    scaleY: [0, 1],
    duration: 3000,
    ease: 'linear',
  });
};

export default function BasicChartTest(): HTMLDivElement {
  const parent = document.createElement('div');
  const basic = barchart({
    data: [50, 100, 30],
    barClass: 'el-bar',
  });

  if (basic) {
    parent.appendChild(basic);
    setTimeout(() => {
      growBars();
    }, 100);
  }
  return parent;
}
