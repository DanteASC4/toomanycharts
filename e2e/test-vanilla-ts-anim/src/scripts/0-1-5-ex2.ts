import { animate, stagger, svg } from 'animejs';
import { linechart } from 'toomanycharts';

const drawLine = () => {
  animate(svg.createDrawable('.da-line'), {
    draw: ['0 0', '0 1', '1 1'],
    ease: 'linear',
    duration: 1000,
    delay: stagger(1000),
    loop: true,
  });
};

export default function myLineChart() {
  const basic = linechart({
    data: [
      [10, 20, 10, 20, 10, 20, 50, 90],
      [90, 80, 90, 80, 90, 80, 50, 10],
    ],
    fullWidthLine: true,
    thickness: 10,
    gradientColors: ['#ff00ff', '#00ffff'],
    lineClass: 'da-line',
    width: 500,
  });

  setTimeout(() => {
    drawLine();
  }, 100);

  return basic;
}
