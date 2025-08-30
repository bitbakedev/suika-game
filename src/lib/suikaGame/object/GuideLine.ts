import Matter from "matter-js";
import { getRenderWidth, getRenderHeight } from "./Size";

export const GuideLineColor = '#ffffff80';

// 점선을 만들기 위한 작은 사각형들의 배열
const createDashedLine = () => {
  const dashLength = 8;
  const gapLength = 8;
  const totalHeight = getRenderHeight();
  const startY = 40;
  const dashes: Matter.Body[] = [];
  
  for (let y = startY; y < totalHeight; y += dashLength + gapLength) {
    const dash = Matter.Bodies.rectangle(
      getRenderWidth() / 2,
      y + dashLength / 2,
      2,
      dashLength,
      {
        isStatic: true,
        isSensor: true,
        collisionFilter: { group: -1 },
        render: {
          fillStyle: GuideLineColor
        },
        label: 'GUIDE_LINE_DASH'
      }
    );
    dashes.push(dash);
  }
  
  return dashes;
};

export const GuideLine = createDashedLine();