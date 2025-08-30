import { Fruit } from '../object/Fruit';
import styles from './index.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface FruitPreviewProps {
  onRestart: () => void;
}

const FruitPreview = ({ onRestart }: FruitPreviewProps) => {
  const fruits = Object.values(Fruit);

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
                backgroundImage: `url(${require('../../../resource/' + fruit + '.png')})`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FruitPreview;