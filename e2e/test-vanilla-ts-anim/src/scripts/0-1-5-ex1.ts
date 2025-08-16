import { animate, svg } from 'animejs';
import { linechart } from 'toomanycharts';

const drawLine = () => {
  animate(svg.createDrawable('.da-line'), {
    draw: ['0 0', '0 1', '1 1'],
    ease: 'inOutCubic',
    duration: 2000,
    loop: true,
  });
};

export default function myLineChart() {
  const basic = linechart({
    data: [10, 20, 10, 20, 10, 20, 50, 100],
    thickness: 10,
    gradientColors: ['#ff00ff', '#00ffff'],
    gradientDirection: 'top-to-bottom',
    lineClass: 'da-line',
  });

  setTimeout(() => {
    drawLine();
  }, 100);

  return basic;
}
