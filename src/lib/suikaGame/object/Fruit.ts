import { getRenderWidth } from "./Size";

export enum Fruit {
  BLUEBERRY = "BLUEBERRY",
  STRAWBERRY = "STRAWBERRY",
  TANGERINE = "TANGERINE",
  TOMATO = "TOMATO",
  AVOCADO = "AVOCADO",
  KOREANMELON = "KOREANMELON",
  APPLE = "APPLE",
  PEACH = "PEACH",
  COCONUT = "COCONUT",
  MELON = "MELON",
  WATERMELON = "WATERMELON",
}

export type FruitType = keyof typeof Fruit;

export const getFruitFeature = (fruit: FruitType) => {
  switch (fruit) {
    case Fruit.BLUEBERRY:
      return { radius: getRenderWidth() / 16, mass: 1.2, label: Fruit.BLUEBERRY, score: 2 };
    case Fruit.STRAWBERRY:
      return { radius: getRenderWidth() / 12, mass: 1, label: Fruit.STRAWBERRY, score: 4 };
    case Fruit.TANGERINE:
      return { radius: getRenderWidth() / 8, mass: 1, label: Fruit.TANGERINE, score: 8 };
    case Fruit.TOMATO:
      return { radius: getRenderWidth() / 7, mass: 1, label: Fruit.TOMATO, score: 16 };
    case Fruit.AVOCADO:
      return { radius: getRenderWidth() / 5.5, mass: 1, label: Fruit.AVOCADO, score: 32 };
    case Fruit.KOREANMELON:
      return { radius: getRenderWidth() / 4.8, mass: 1, label: Fruit.KOREANMELON, score: 64 };
    case Fruit.APPLE:
      return { radius: getRenderWidth() / 4.2, mass: 1, label: Fruit.APPLE, score: 128 };
    case Fruit.PEACH:
      return { radius: getRenderWidth() / 3.7, mass: 1, label: Fruit.PEACH, score: 256 };
    case Fruit.COCONUT:
      return { radius: getRenderWidth() / 3.2, mass: 1, label: Fruit.COCONUT, score: 512 };
    case Fruit.MELON:
      return { radius: getRenderWidth() / 2.7, mass: 1, label: Fruit.MELON, score: 1024 };
    case Fruit.WATERMELON:
      return { radius: getRenderWidth() / 2.4, mass: 1, label: Fruit.WATERMELON, score: 100 };
  }
}

export const getRandomFruitFeature = () => {
  const fruits = Object.values(Fruit).slice(0, 5);
  const randomIndex = Math.floor(Math.random() * fruits.length); // 무작위 인덱스 선택
  return getFruitFeature(fruits[randomIndex]);
};

export const getNextFruitFeature = (currentFruit: Fruit) => {
  // 현재 과일의 순서를 찾기
  const currentIndex = Object.values(Fruit).indexOf(currentFruit);

  if (currentIndex === -1) {
    // 주어진 과일이 유효하지 않은 경우, 예외 처리
    return null;
  }

  // 수박이 마지막 과일이므로 더 이상 합칠 수 없음
  if (currentFruit === Fruit.WATERMELON) {
    return null;
  }

  // 다음 과일의 순서 계산
  const nextIndex = currentIndex + 1;

  // 다음 과일의 종류 가져오기
  const nextFruit = Object.values(Fruit)[nextIndex];

  // 다음 과일의 특성 가져오기
  const feature = getFruitFeature(nextFruit);

  return feature;
};