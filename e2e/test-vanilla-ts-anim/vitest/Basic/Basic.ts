import { barchart } from 'nanocharts';
import '../app.css';

export default function BasicChartTest(): HTMLDivElement {
  const parent = document.createElement('div');
  const basic = barchart({
    data: [50, 100, 30],
  });

  console.log(basic instanceof SVGElement, basic instanceof HTMLElement);
  if (basic) {
    parent.appendChild(basic);
  }
  return parent;
}
