import { Fruit } from '../object/Fruit';
import styles from './index.module.scss';
import classNames from "classnames/bind";
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

interface FruitPreviewProps {
  onRestart: () => void;
  lastMergedFruit?: Fruit | null;
}

const FruitPreview = ({ onRestart, lastMergedFruit }: FruitPreviewProps) => {
  const fruits = Object.values(Fruit);
  const [animatingFruit, setAnimatingFruit] = useState<Fruit | null>(null);

  useEffect(() => {
    if (lastMergedFruit) {
      setAnimatingFruit(lastMergedFruit);
      const timer = setTimeout(() => {
        setAnimatingFruit(null);
      }, 600); // 애니메이션 지속 시간
      
      return () => clearTimeout(timer);
    }
  }, [lastMergedFruit]);

  const getImageUrl = (fruit: Fruit) => {
    if (fruit === Fruit.BLUEBERRY) {
      return require('../../../resource/BREAD1.png');
    }
    if (fruit === Fruit.STRAWBERRY) {
      return require('../../../resource/BREAD2.png');
    }
    if (fruit === Fruit.TANGERINE) {
      return require('../../../resource/BREAD3.png');
    }
    if (fruit === Fruit.TOMATO) {
      return require('../../../resource/BREAD4.png');
    }
    if (fruit === Fruit.AVOCADO) {
      return require('../../../resource/BREAD5.png');
    }
    if (fruit === Fruit.KOREANMELON) {
      return require('../../../resource/BREAD6.png');
    }
    if (fruit === Fruit.APPLE) {
      return require('../../../resource/BREAD7.png');
    }
    if (fruit === Fruit.PEACH) {
      return require('../../../resource/BREAD8.png');
    }
    if (fruit === Fruit.COCONUT) {
      return require('../../../resource/BREAD9.png');
    }
    if (fruit === Fruit.MELON) {
      return require('../../../resource/BREAD10.png');
    }
    if (fruit === Fruit.WATERMELON) {
      return require('../../../resource/BREAD11.png');
    }
    return require('../../../resource/' + fruit + '.png');
  };

  return (
    <div className={cx('previewArea')}>
      <div className={cx('previewWrap')}>
        <button className={cx('restartButton')} onClick={onRestart}>
          ↻
        </button>
        <div className={cx('fruitContainer')}>
          {fruits.map((fruit, index) => (
            <div 
              key={fruit} 
              className={cx('fruitItem', { 
                animating: animatingFruit === fruit 
              })}
              style={{ 
                backgroundImage: `url(${getImageUrl(fruit)})`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FruitPreview;