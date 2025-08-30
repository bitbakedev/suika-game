import { Fruit } from '../object/Fruit';
import styles from './index.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const FruitPreview = () => {
  const fruits = Object.values(Fruit);

  return (
    <div className={cx('previewArea')}>
      <div className={cx('previewWrap')}>
        {fruits.map((fruit, index) => (
          <div 
            key={fruit} 
            className={cx('fruitItem')}
            style={{ 
              backgroundImage: `url(${require('../../../resource/' + fruit + '.png')})`,
              animationDelay: `${index * 0.1}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FruitPreview;