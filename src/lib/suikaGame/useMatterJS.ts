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
const getImgUrl = (fruit: Fruit) => {
  if (fruit === Fruit.BLUEBERRY) {
    return require('../../resource/BREAD1.png');
  }
  if (fruit === Fruit.STRAWBERRY) {
    return require('../../resource/BREAD2.png');
  }
  if (fruit === Fruit.TANGERINE) {
    return require('../../resource/BREAD3.png');
  }
  if (fruit === Fruit.TOMATO) {
    return require('../../resource/BREAD4.png');
  }
  if (fruit === Fruit.AVOCADO) {
    return require('../../resource/BREAD5.png');
  }
  if (fruit === Fruit.KOREANMELON) {
    return require('../../resource/BREAD6.png');
  }
  if (fruit === Fruit.APPLE) {
    return require('../../resource/BREAD7.png');
  }
  if (fruit === Fruit.PEACH) {
    return require('../../resource/BREAD8.png');
  }
  if (fruit === Fruit.COCONUT) {
    return require('../../resource/BREAD9.png');
  }
  if (fruit === Fruit.MELON) {
    return require('../../resource/BREAD10.png');
  }
  if (fruit === Fruit.WATERMELON) {
    return require('../../resource/BREAD11.png');
  }
  return require('../../resource/' + fruit + '.png');
};

let engine = Engine.create();
let render: Matter.Render | null = null;
let requestAnimation: number | null = null;
let lastTime = 0;
let fixedItemTimeOut: NodeJS.Timeout | null = null;
let fixedItem: Matter.Body | null = null; // 고정된 아이템
let prevPosition = { x: getRenderWidth() / 2, y: 50 };
let nextFruit: Fruit | null = null;
let prevMergingFruitIds: number[] = [];
let isShakeItemActive: boolean = false;

const renderOptions = {
  width: getRenderWidth(),
  height: getRenderHeight(),
  wireframes: false,
  background: '#ffffff40',
  borderRadius: '16px',
  pixelRatio: window.devicePixelRatio || 2,
  showAngleIndicator: false,
  showVelocity: false,
};

const init = (propsRef: React.RefObject<UseMatterJSProps>) => {
  const canvasWrapEl = document.getElementById('canvasWrap');
  if (!canvasWrapEl) return;
  while (canvasWrapEl.hasChildNodes() && canvasWrapEl.firstChild) canvasWrapEl.removeChild(canvasWrapEl.firstChild);
  engine.world.gravity.y = 1.5;
  render = Render.create({ 
    element: canvasWrapEl, 
    engine: engine, 
    options: {
      ...renderOptions,
      showDebug: false,
      showBroadphase: false,
      showBounds: false,
      showVelocity: false,
      showAngleIndicator: false,
      showSeparations: false,
      showAxes: false,
      showPositions: false,
      showConvexHulls: false,
      showInternalEdges: false,
      showMousePosition: false
    }
  });
  World.add(engine.world, [...Wall]);
  World.add(engine.world, [GameOverGuideLine, ...GuideLine]);
  nextFruit = propsRef.current?.nextItem || null;
  createFixedItem(propsRef);
};

const createFixedItem = (propsRef: React.RefObject<UseMatterJSProps>) => {
  if (fixedItem) return;
  if (!nextFruit) return;
  if (!propsRef.current) return;
  const feature = getFruitFeature(nextFruit);
  const label = feature?.label as Fruit;
  const radius = feature?.radius || 1;
  const mass = feature?.mass || 1;
  fixedItem = Matter.Bodies.circle(prevPosition.x, prevPosition.y, radius, {
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
  World.add(engine.world, fixedItem);

  const newNextItem = getRandomFruitFeature()?.label as Fruit;
  nextFruit = newNextItem;
  propsRef.current.setNextItem(newNextItem);
}

const handleGameOver = (propsRef: React.RefObject<UseMatterJSProps>) => {
  if (!propsRef.current) return;
  propsRef.current.setIsGameOver(true);
  requestAnimation && cancelAnimationFrame(requestAnimation);
}

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
}

const setPositionFixedItem = (event: any) => {
  if(!fixedItem) return;
  const minX = fixedItem.circleRadius ? fixedItem.circleRadius : 0;
  const maxX = fixedItem.circleRadius ? getRenderWidth() - fixedItem.circleRadius : getRenderWidth();

  Matter.Body.setPosition(fixedItem, {
    x: clamp(event.mouse.position.x, minX, maxX),
    y: fixedItem.position.y,
  });
  
  // 모든 대시 라인들의 위치 업데이트
  GuideLine.forEach(dash => {
    Matter.Body.setPosition(dash, {
      x: clamp(event.mouse.position.x, minX, maxX),
      y: dash.position.y,
    });
  });
}

const event = (propsRef: React.RefObject<UseMatterJSProps>, effects: { fireConfetti: () => void, fireRapidStarConfetti: () => void }) => {
  if (!render) return;

  const mouse = Mouse.create(render.canvas);
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 1,
      render: {
        visible: false,
      }
    } as Matter.Constraint
  });

  // 마우스 버튼 누르면 원 이동 시작
  Matter.Events.on(mouseConstraint, 'startdrag', (event: any) => {
    if(!fixedItem) return;
    fixedItemTimeOut && clearTimeout(fixedItemTimeOut);
    prevMergingFruitIds = [];
    setPositionFixedItem(event);
  });

  // 마우스 이동 시 원을 마우스 위치로 이동
  Matter.Events.on(mouseConstraint, 'mousemove', (event: any) => {
    setPositionFixedItem(event);
  });

  // 마우스 버튼 뗄 때 원의 고정 해제
  Matter.Events.on(mouseConstraint, 'enddrag', (event: any) => {
    // 원의 고정 해제
    if (!fixedItem) return;
    setPositionFixedItem(event);

    const popSound = new Audio(require('../../resource/pop.mp3'));
    popSound.play();
    const label = fixedItem?.label as Fruit;
    const feature = getFruitFeature(label);
    const radius = feature?.radius || 1;
    const mass = feature?.mass || 1;
    const newItem = Matter.Bodies.circle(fixedItem.position.x, fixedItem.position.y, radius, {
      isStatic: false,
      label: label,
      restitution: 0.1,
      mass: mass,
      friction: 0.8,
      frictionAir: 0.01,
      render: {
        sprite: {
          texture: getImgUrl(label),
          xScale: (radius * 2.4) / 250,
          yScale: (radius * 2.4) / 250,
        }
      },
    });

    prevPosition.x = fixedItem.position.x;

    // 모든 대시 라인들을 투명하게 만들기
    GuideLine.forEach(dash => {
      dash.render.fillStyle = 'transparent';
    });
    World.remove(engine.world, fixedItem);
    World.remove(engine.world, GameOverLine);
    fixedItem = null;
    World.add(engine.world, newItem);

    fixedItemTimeOut = setTimeout(() => {
      // 모든 대시 라인들을 다시 보이게 만들기
      GuideLine.forEach(dash => {
        dash.render.fillStyle = GuideLineColor;
      });
      World.add(engine.world, GameOverLine);
      createFixedItem(propsRef);
    }, 750);
  });

  Matter.Events.on(engine, 'collisionStart', (event) => {
    const pairs = event.pairs;
    pairs.forEach((pair) => {
      const bodyA = pair.bodyA;
      const bodyB = pair.bodyB;
      
      if ((bodyA.label === GameOverLine.label || bodyB.label === GameOverLine.label) && !isShakeItemActive) {
        handleGameOver(propsRef);
        return;
      }

      const midX = (bodyA.position.x + bodyB.position.x) / 2;
      const midY = (bodyA.position.y + bodyB.position.y) / 2;

      const labelA = bodyA.label as Fruit;
      const labelB = bodyB.label as Fruit;

      if (bodyA.isSensor || bodyB.isSensor) return;
      if (labelA === Fruit.WATERMELON && labelB === Fruit.WATERMELON) return;

      // 이미 합치는 중이면 무시
      if (prevMergingFruitIds.includes(bodyA.id) || prevMergingFruitIds.includes(bodyB.id)) return prevMergingFruitIds = [];

      // 같은 크기인 경우에만 합치기
      if (labelA === labelB) {
        prevMergingFruitIds = [bodyA.id, bodyB.id];
        
        // 과일이 합쳐질 때 사운드 효과
        const popSound = new Audio(require('../../resource/pop2.mp3'));
        popSound.play();

        World.remove(engine.world, bodyA);
        World.remove(engine.world, bodyB);

        // 새로운 Fruit 생성 (크기가 한 사이즈 큰 것)
        const feature = getNextFruitFeature(labelA); // 이 함수는 한 사이즈 큰 Fruit 특성을 반환하도록 수정
        
        // 수박이 만들어지면 별 이펙트
        if(labelA === Fruit.MELON) effects.fireRapidStarConfetti();
        
        // 수박끼리 합쳐지면 더 이상 진행하지 않음
        if (!feature) return;
        
        const label = feature?.label as Fruit;
        const radius = feature?.radius || 1;
        const mass = feature?.mass || 1;
        const score = feature?.score || 0;

        // 수박이 만들어지면 폭죽 이펙트 (멜론 2개가 합쳐져서 수박이 될 때)
        if(labelA === Fruit.MELON && label === Fruit.WATERMELON) effects.fireConfetti();

        const newFruit = Matter.Bodies.circle(midX, midY, radius, {
          isStatic: false,
          label: label,
          restitution: 0.1,
          mass: mass,
          friction: 0.8,
          frictionAir: 0.01,
          render: {
            sprite: {
              texture: getImgUrl(label),
              xScale: (radius * 2.4) / 250,
              yScale: (radius * 2.4) / 250,
            }
          }
        });

        World.add(engine.world, newFruit);
        if (propsRef.current) {
          propsRef.current.setScore(prev => prev + score);
        }
      }
    });
  });

  // World.add(engine.world, mouseConstraint);
};

const animate = (currentTime: number) => {
  requestAnimation = requestAnimationFrame(animate);

  const elapsed = currentTime - lastTime;

  if (elapsed > frameInterval) {
    Engine.update(engine, frameInterval);
    lastTime = currentTime - (elapsed % frameInterval);
  }
};

const run = () => {
  if (!render) return;
  animate(0); // 시작할 때 시간을 0으로 초기화
  Render.run(render);
};

interface UseMatterJSProps {
  score: number;
  setScore: React.Dispatch<SetStateAction<number>>;
  nextItem: Fruit;
  setNextItem: React.Dispatch<SetStateAction<Fruit>>;
  isGameOver: boolean;
  setIsGameOver: React.Dispatch<SetStateAction<boolean>>;
}

const useMatterJS = (props: UseMatterJSProps) => {
  const { fireConfetti, fireRapidStarConfetti } = useConfetti();
  const propsRef = useRef(props);

  // Update props ref on every render
  useEffect(() => {
    propsRef.current = props;
  });

  useEffect(() => {
    init(propsRef);
    event(propsRef, { fireConfetti, fireRapidStarConfetti });
    run();

    return (() => {
      if (propsRef.current) {
        propsRef.current.setScore(0);
      }
    })
  }, [fireConfetti, fireRapidStarConfetti]);

  const clear = () => {
    fixedItem = null;
    isShakeItemActive = false;
    engine = Engine.create();
    init(propsRef);
    event(propsRef, { fireConfetti, fireRapidStarConfetti });
    run();
  }

  const removeSmallFruits = () => {
    const bodiesToRemove = engine.world.bodies.filter(body => {
      const label = body.label as Fruit;
      return (label === Fruit.STRAWBERRY || label === Fruit.BLUEBERRY) && 
             !body.isStatic && !body.isSensor;
    });
    
    // 제거된 과일이 있을 때만 효과 실행
    if (bodiesToRemove.length > 0) {
      // 깔끔한 빵빠레 효과
      fireConfetti();
      
      // 사운드 효과
      const popSound = new Audio(require('../../resource/pop2.mp3'));
      popSound.volume = 0.4;
      popSound.play();
    }
    
    World.remove(engine.world, bodiesToRemove);
  }

  const shakeCanvas = () => {
    isShakeItemActive = true;
    
    const allBodies = engine.world.bodies.filter(body => 
      !body.isStatic && !body.isSensor && body.label !== 'GUIDE_LINE'
    );
    
    // 사운드 효과
    const popSound = new Audio(require('../../resource/pop.mp3'));
    popSound.volume = 0.5;
    popSound.play();
    
    // 모든 과일에 좌우 흔들림 효과 적용
    allBodies.forEach((body, index) => {
      const delay = index * 20; // 순차적 흔들림
      
      setTimeout(() => {
        const shakeForce = 0.06; // 적당한 힘
        const randomDirection = Math.random() > 0.5 ? 1 : -1;
        
        Matter.Body.applyForce(body, body.position, {
          x: shakeForce * randomDirection,
          y: -0.03 // 위로 튀는 힘
        });
      }, delay);
    });
    
    // 연속 흔들기
    for (let i = 1; i < 8; i++) {
      setTimeout(() => {
        allBodies.forEach(body => {
          const shakeForce = 0.04 * (8 - i) / 8; // 점점 약해지는 흔들림
          const randomDirection = Math.random() > 0.5 ? 1 : -1;
          
          Matter.Body.applyForce(body, body.position, {
            x: shakeForce * randomDirection,
            y: Math.random() * 0.02 - 0.01 // 랜덤한 수직 움직임
          });
        });
      }, i * 120); // 간격
    }
    
    // 흔들기 효과가 끝난 후 게임오버 체크 재활성화
    setTimeout(() => {
      isShakeItemActive = false;
    }, 1200); // 전체 흔들기 효과 시간보다 약간 길게
  }

  return {
    clear,
    removeSmallFruits,
    shakeCanvas
  }
};

export default useMatterJS;