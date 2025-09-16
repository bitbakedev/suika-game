import { Fruit } from '../object/Fruit';
import styles from './index.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface FruitPreviewProps {
  onRestart: () => void;
}

const FruitPreview = ({ onRestart }: FruitPreviewProps) => {
  const fruits = Object.values(Fruit);

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
              className={cx('fruitItem')}
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