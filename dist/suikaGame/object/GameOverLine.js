import Matter from "matter-js";
import { getRenderWidth, getRenderHeight } from "./Size";
const LINE_WIDTH = getRenderWidth() * 10;
const LINE_HEIGHT = 8;
// 게임오버 감지 라인 - 캔버스 최상단 (y=0)
export const GameOverLine = Matter.Bodies.rectangle(getRenderWidth() / 2, 0, LINE_WIDTH, LINE_HEIGHT, {
    isStatic: true,
    isSensor: true,
    collisionFilter: { group: -1 },
    render: { fillStyle: '#ffffff00' },
    label: 'GAME_OVER_LINE',
});
// 시각적 가이드 라인 - 기존 위치 유지
export const GameOverGuideLine = Matter.Bodies.rectangle(getRenderWidth() / 2, getRenderHeight() / 6.5, LINE_WIDTH, LINE_HEIGHT, {
    isStatic: true,
    isSensor: true,
    collisionFilter: { group: -1 },
    render: { fillStyle: '#ffffff20' },
    label: 'GAME_OVER_GUIDE_LINE',
});
