import { Fruit } from '../object/Fruit';
import { getRenderWidth } from '../object/Size';
import styles from './index.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface HeaderProps {
  bestScore: number;
  score: number;
  nextItem: null | Fruit;
}

const Header = ({ score, bestScore, nextItem }: HeaderProps) => {
  const getBestScore = () => {
    return score > bestScore ? score : bestScore;
  };

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
    return require('../../../resource/' + fruit + '.png');
  };

  return (
    <div className={cx('headerArea')} style={{ maxWidth: getRenderWidth() + 4 }}>
      <div className={cx('bestScoreArea')}>
        <span className={cx('text')}>BEST</span>
        <span className={cx('number')}>{getBestScore()}</span>
      </div>
      <div className={cx('scoreArea')}>
        <span className={cx('score')}>{score}</span>
      </div>
      <div className={cx('nextArea')}>
        <span className={cx('text')}>NEXT</span>
        <div className={cx('next')}>
          <span className={cx('img')} style={{ backgroundImage: `url(${getImageUrl(nextItem!)})` }} />
        </div>
      </div>
    </div>
  )
}

export default Header;