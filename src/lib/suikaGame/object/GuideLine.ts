import Matter from "matter-js";
import { getRenderWidth, getRenderHeight } from "./Size";

export const GuideLineColor = '#ffffff60';

export const GuideLine = Matter.Bodies.rectangle(
    getRenderWidth() / 2,
    getRenderHeight() / 2 + 40,
    3,
    getRenderHeight(),
    {
        isStatic: true, 
        isSensor: true, 
        collisionFilter: { group: -1 }, 
        render: { 
            fillStyle: GuideLineColor,
            strokeStyle: '#ffffff80',
            lineWidth: 2,
            lineDash: [10, 5]
        },
        label: 'GUIDE_LINE'
    }