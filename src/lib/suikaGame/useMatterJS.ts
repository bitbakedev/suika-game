import Matter from 'matter-js';
import { SetStateAction, useEffect, useRef } from "react";
import Wall from "./object/Wall";
import { Fruit, getFruitFeature, getNextFruitFeature, getRandomFruitFeature } from "./object/Fruit";
import { getRenderHeight, getRenderWidth } from "./object/Size";
import { GameOverLine, GameOverGuideLine } from './object/GameOverLine';
import { GuideLine, GuideLineColor } from './object/GuideLine';
import useConfetti from "./useConfetti";

const { Engine, Render, World, Mouse, MouseConstraint } = Matter;
const frameInterval = 1000 / 60; // 60fps
const getImgUrl = (fruit: Fruit) => require('../../resource/' + fruit + '.png');

const renderOptions = {
  width: getRenderWidth(),
  height: getRenderHeight(),
  wireframes: false,
  background: '#ffffff40',
  borderRadius: '16px',
};

const init = (props: UseMatterJSProps, refs: MatterJSRefs) => {
  const canvasWrapEl = document.getElementById('canvasWrap');
  if (!canvasWrapEl) return;
  while (canvasWrapEl.hasChildNodes() && canvasWrapEl.firstChild) canvasWrapEl.removeChild(canvasWrapEl.firstChild);
  refs.engineRef.current.world.gravity.y = 2.0;
  refs.renderRef.current = Render.create({ element: canvasWrapEl, engine: refs.engineRef.current, options: renderOptions });
  World.add(refs.engineRef.current.world, [...Wall]);
  World.add(refs.engineRef.current.world, [GameOverGuideLine, GuideLine]);
  refs.nextFruitRef.current = props.nextItem;
  createFixedItem(props, refs);
};

const createFixedItem = ({ setNextItem }: UseMatterJSProps, refs: MatterJSRefs) => {
  if (refs.fixedItemRef.current) return;
  if (!refs.nextFruitRef.current) return;
  const feature = getFruitFeature(refs.nextFruitRef.current);
  const label = feature?.label as Fruit;
  const radius = feature?.radius || 1;
  const mass = feature?.mass || 1;
  refs.fixedItemRef.current = Matter.Bodies.circle(refs.prevPositionRef.current.x, refs.prevPositionRef.current.y, radius, {
    isStatic: true,
    isSensor: true,
    label: label,
    restitution: 0,
    mass: mass,
    friction: 1,
    render: {
      sprite: {
        texture: getImgUrl(label),
        xScale: (radius * 2) / 250,
        yScale: (radius * 2) / 250,
      }
    }
  });
  World.add(refs.engineRef.current.world, refs.fixedItemRef.current);

  const newNextItem = getRandomFruitFeature()?.label as Fruit;
  refs.nextFruitRef.current = newNextItem;
  setNextItem(newNextItem);
}

const handleGameOver = (props: UseMatterJSProps, refs: MatterJSRefs) => {
  props.setIsGameOver(true);
  refs.requestAnimationRef.current && cancelAnimationFrame(refs.requestAnimationRef.current);
}

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
}

const setPositionFixedItem = (event: any, refs: MatterJSRefs) => {
  if(!refs.fixedItemRef.current) return;
  const minX = refs.fixedItemRef.current.circleRadius ? refs.fixedItemRef.current.circleRadius : 0;
  const maxX = refs.fixedItemRef.current.circleRadius ? getRenderWidth() - refs.fixedItemRef.current.circleRadius : getRenderWidth();

  Matter.Body.setPosition(refs.fixedItemRef.current, {
    x: clamp(event.mouse.position.x, minX, maxX),
    y: refs.fixedItemRef.current.position.y,
  });
  Matter.Body.setPosition(GuideLine, {
    x: clamp(event.mouse.position.x, minX, maxX),
    y: GuideLine.position.y,
  })
}

const event = (props: UseMatterJSProps, effects: { fireConfetti: () => void, fireRapidStarConfetti: () => void }, refs: MatterJSRefs) => {
  if (!refs.renderRef.current) return;

  // 기존 이벤트 리스너 제거
  if (refs.mouseConstraintRef.current) {
    Matter.Events.off(refs.mouseConstraintRef.current, 'startdrag');
    Matter.Events.off(refs.mouseConstraintRef.current, 'mousemove');
    Matter.Events.off(refs.mouseConstraintRef.current, 'enddrag');
    World.remove(refs.engineRef.current.world, refs.mouseConstraintRef.current);
  }
  Matter.Events.off(refs.engineRef.current, 'collisionStart');

  const mouse = Mouse.create(refs.renderRef.current.canvas);
  refs.mouseConstraintRef.current = MouseConstraint.create(refs.engineRef.current, {
    mouse: mouse,
    constraint: {
      stiffness: 1,
      render: {
        visible: false,
      }
    } as Matter.Constraint
  });

  // 마우스 버튼 누르면 원 이동 시작
  Matter.Events.on(refs.mouseConstraintRef.current, 'startdrag', (event: any) => {
    if(!refs.fixedItemRef.current) return;
    refs.fixedItemTimeOutRef.current && clearTimeout(refs.fixedItemTimeOutRef.current);
    refs.prevMergingFruitIdsRef.current = [];
    setPositionFixedItem(event, refs);
  });

  // 마우스 이동 시 원을 마우스 위치로 이동
  Matter.Events.on(refs.mouseConstraintRef.current, 'mousemove', (event: any) => {
    setPositionFixedItem(event, refs);
  });

  // 마우스 버튼 뗄 때 원의 고정 해제
  Matter.Events.on(refs.mouseConstraintRef.current, 'enddrag', (event: any) => {
    // 원의 고정 해제
    if (!refs.fixedItemRef.current) return;
    setPositionFixedItem(event, refs);

    const popSound = new Audio(require('../../resource/pop.mp3'));
    popSound.play();
    const label = refs.fixedItemRef.current?.label as Fruit;
    const feature = getFruitFeature(label);
    const radius = feature?.radius || 1;
    const mass = feature?.mass || 1;
    const newItem = Matter.Bodies.circle(refs.fixedItemRef.current.position.x, refs.fixedItemRef.current.position.y, radius, {
      isStatic: false,
      label: label,
      restitution: 0,
      mass: mass,
      friction: 1,
      render: {
        sprite: {
          texture: getImgUrl(label),
          xScale: (radius * 2) / 250,
          yScale: (radius * 2) / 250,
        }
      },
    });

    refs.prevPositionRef.current.x = refs.fixedItemRef.current.position.x;

    GuideLine.render.fillStyle = '#ffffff00';
    World.remove(refs.engineRef.current.world, refs.fixedItemRef.current);
    World.remove(refs.engineRef.current.world, GameOverLine);
    refs.fixedItemRef.current = null;
    World.add(refs.engineRef.current.world, newItem);

    refs.fixedItemTimeOutRef.current = setTimeout(() => {
      GuideLine.render.fillStyle = GuideLineColor;
      World.add(refs.engineRef.current.world, GameOverLine);
      createFixedItem(props, refs);
    }, 750);
  });

  Matter.Events.on(refs.engineRef.current, 'collisionStart', (event) => {
    const pairs = event.pairs;
    pairs.forEach((pair) => {
      const bodyA = pair.bodyA;
      const bodyB = pair.bodyB;
      
      if (bodyA.label === GameOverLine.label || bodyB.label === GameOverLine.label) {
        handleGameOver(props, refs);
        return;
      }

      const midX = (bodyA.position.x + bodyB.position.x) / 2;
      const midY = (bodyA.position.y + bodyB.position.y) / 2;

      const labelA = bodyA.label as Fruit;
      const labelB = bodyB.label as Fruit;

      if (bodyA.isSensor || bodyB.isSensor) return;
      if (labelA === Fruit.GOLDWATERMELON && labelB === Fruit.GOLDWATERMELON) return;

      // 이미 합치는 중이면 무시
      if (refs.prevMergingFruitIdsRef.current.includes(bodyA.id) || refs.prevMergingFruitIdsRef.current.includes(bodyB.id)) return refs.prevMergingFruitIdsRef.current = [];

      // 같은 크기인 경우에만 합치기
      if (labelA === labelB) {
        refs.prevMergingFruitIdsRef.current = [bodyA.id, bodyB.id];
        
        // 과일이 합쳐질 때 사운드 효과
        const popSound = new Audio(require('../../resource/pop2.mp3'));
        popSound.play();

        World.remove(refs.engineRef.current.world, bodyA);
        World.remove(refs.engineRef.current.world, bodyB);

        // 새로운 Fruit 생성 (크기가 한 사이즈 큰 것)
        const feature = getNextFruitFeature(labelA); // 이 함수는 한 사이즈 큰 Fruit 특성을 반환하도록 수정
        const label = feature?.label as Fruit;
        const radius = feature?.radius || 1;
        const mass = feature?.mass || 1;
        const score = feature?.score || 0;

        // 수박이 만들어지면 폭죽 이펙트
        if(label === Fruit.WATERMELON) effects.fireConfetti();

        // 황금 수박이 만들어지면 별 이펙트
        if(label === Fruit.GOLDWATERMELON) effects.fireRapidStarConfetti();

        const newFruit = Matter.Bodies.circle(midX, midY, radius, {
          isStatic: false,
          label: label,
          restitution: 0,
          mass: mass,
          friction: 1,
          render: {
            sprite: {
              texture: getImgUrl(label),
              xScale: (radius * 2) / 250,
              yScale: (radius * 2) / 250,
            }
          }
        });

        World.add(refs.engineRef.current.world, newFruit);
        props.setScore(prev => prev + score);
      }
    });
  });

  World.add(refs.engineRef.current.world, refs.mouseConstraintRef.current);
};

const animate = (currentTime: number, refs: MatterJSRefs) => {
  refs.requestAnimationRef.current = requestAnimationFrame((time) => animate(time, refs));

  const elapsed = currentTime - refs.lastTimeRef.current;

  if (elapsed > frameInterval) {
    Engine.update(refs.engineRef.current, frameInterval);
    refs.lastTimeRef.current = currentTime - (elapsed % frameInterval);
  }
};

const run = (refs: MatterJSRefs) => {
  if (!refs.renderRef.current) return;
  animate(0, refs); // 시작할 때 시간을 0으로 초기화
  Render.run(refs.renderRef.current);
};

interface MatterJSRefs {
  engineRef: React.MutableRefObject<Matter.Engine>;
  renderRef: React.MutableRefObject<Matter.Render | null>;
  requestAnimationRef: React.MutableRefObject<number | null>;
  lastTimeRef: React.MutableRefObject<number>;
  fixedItemTimeOutRef: React.MutableRefObject<NodeJS.Timeout | null>;
  fixedItemRef: React.MutableRefObject<Matter.Body | null>;
  prevPositionRef: React.MutableRefObject<{ x: number; y: number }>;
  nextFruitRef: React.MutableRefObject<Fruit | null>;
  prevMergingFruitIdsRef: React.MutableRefObject<number[]>;
  mouseConstraintRef: React.MutableRefObject<Matter.MouseConstraint | null>;
}

interface UseMatterJSProps {
  score: number;
  setScore: React.Dispatch<SetStateAction<number>>;
  nextItem: Fruit;
  setNextItem: React.Dispatch<SetStateAction<Fruit>>;
  isGameOver: boolean;
  setIsGameOver: React.Dispatch<SetStateAction<boolean>>;
  canContinue?: boolean;
}

const useMatterJS = (props: UseMatterJSProps) => {
  const { fireConfetti, fireRapidStarConfetti } = useConfetti();

  const engineRef = useRef(Engine.create());
  const renderRef = useRef<Matter.Render | null>(null);
  const requestAnimationRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  const fixedItemTimeOutRef = useRef<NodeJS.Timeout | null>(null);
  const fixedItemRef = useRef<Matter.Body | null>(null);
  const prevPositionRef = useRef({ x: getRenderWidth() / 2, y: 50 });
  const nextFruitRef = useRef<Fruit | null>(null);
  const prevMergingFruitIdsRef = useRef<number[]>([]);
  const mouseConstraintRef = useRef<Matter.MouseConstraint | null>(null);

  const refs: MatterJSRefs = {
    engineRef,
    renderRef,
    requestAnimationRef,
    lastTimeRef,
    fixedItemTimeOutRef,
    fixedItemRef,
    prevPositionRef,
    nextFruitRef,
    prevMergingFruitIdsRef,
    mouseConstraintRef
  };

  useEffect(() => {
    init(props, refs);
    event(props, { fireConfetti, fireRapidStarConfetti }, refs);
    run(refs);

    return () => {
      // 종합적인 정리 작업
      if (refs.renderRef.current) {
        Render.stop(refs.renderRef.current);
        refs.renderRef.current.canvas.remove();
        refs.renderRef.current = null;
      }
      
      if (refs.requestAnimationRef.current) {
        cancelAnimationFrame(refs.requestAnimationRef.current);
        refs.requestAnimationRef.current = null;
      }
      
      if (refs.mouseConstraintRef.current) {
        Matter.Events.off(refs.mouseConstraintRef.current, 'startdrag');
        Matter.Events.off(refs.mouseConstraintRef.current, 'mousemove');
        Matter.Events.off(refs.mouseConstraintRef.current, 'enddrag');
        World.remove(refs.engineRef.current.world, refs.mouseConstraintRef.current);
        refs.mouseConstraintRef.current = null;
      }
      
      Matter.Events.off(refs.engineRef.current, 'collisionStart');
      Engine.clear(refs.engineRef.current);
      
      if (refs.fixedItemTimeOutRef.current) {
        clearTimeout(refs.fixedItemTimeOutRef.current);
        refs.fixedItemTimeOutRef.current = null;
      }
      
      props.setScore(0);
    };
  }, [fireConfetti, fireRapidStarConfetti]);

  const clear = () => {
    // 기존 정리 작업
    if (refs.renderRef.current) {
      Render.stop(refs.renderRef.current);
      refs.renderRef.current.canvas.remove();
      refs.renderRef.current = null;
    }
    
    if (refs.requestAnimationRef.current) {
      cancelAnimationFrame(refs.requestAnimationRef.current);
      refs.requestAnimationRef.current = null;
    }
    
    if (refs.mouseConstraintRef.current) {
      Matter.Events.off(refs.mouseConstraintRef.current, 'startdrag');
      Matter.Events.off(refs.mouseConstraintRef.current, 'mousemove');
      Matter.Events.off(refs.mouseConstraintRef.current, 'enddrag');
      World.remove(refs.engineRef.current.world, refs.mouseConstraintRef.current);
      refs.mouseConstraintRef.current = null;
    }
    
    Matter.Events.off(refs.engineRef.current, 'collisionStart');
    Engine.clear(refs.engineRef.current);
    
    if (refs.fixedItemTimeOutRef.current) {
      clearTimeout(refs.fixedItemTimeOutRef.current);
      refs.fixedItemTimeOutRef.current = null;
    }

    // 새로 초기화
    refs.fixedItemRef.current = null;
    refs.engineRef.current = Engine.create();
    refs.lastTimeRef.current = 0;
    refs.prevMergingFruitIdsRef.current = [];
    refs.prevPositionRef.current = { x: getRenderWidth() / 2, y: 50 };
    
    init(props, refs);
    event(props, { fireConfetti, fireRapidStarConfetti }, refs);
    run(refs);
  }

  const removeOverflowFruits = () => {
    // 게임 오버 라인 위에 있는 과일들을 제거
    const gameOverY = getRenderHeight() / 6.5 - 30;
    const bodiesToRemove = refs.engineRef.current.world.bodies.filter(body => 
      !body.isStatic && 
      !body.isSensor && 
      body.position.y < gameOverY &&
      body.label !== 'GUIDE_LINE' &&
      body.label !== 'GAME_OVER_LINE' &&
      body.label !== 'GAME_OVER_GUIDE_LINE' &&
      !body.label.includes('WALL')
    );
    
    bodiesToRemove.forEach(body => {
      World.remove(refs.engineRef.current.world, body);
    });
    
    // 새로운 고정 아이템 생성
    createFixedItem(props, refs);
  }

  return {
    clear,
    removeOverflowFruits
  }
};

export default useMatterJS;
