import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import classNames from "classnames/bind";
import useMatterJS from "./useMatterJS";
import { Fruit, getRandomFruitFeature } from './object/Fruit';
import GameOverModal from './gameOverModal';
import FruitPreview from './fruitPreview';

const cx = classNames.bind(styles);

const SuikaGame = () => {
  const [bestScore, setBestScore] = useState(0);
  const [score, setScore] = useState(0);
  const [nextItem, setNextItem] = useState<Fruit>(getRandomFruitFeature()?.label as Fruit);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const { clear } = useMatterJS({ score, setScore, nextItem, setNextItem, isGameOver, setIsGameOver });

  useEffect(() => {
    const bestScore = localStorage.getItem('bestScore');
    if (bestScore) setBestScore(Number(bestScore));
  }, [isGameOver]);

  useEffect(() => {
    if(isGameOver) {
      const bestScore = localStorage.getItem('bestScore') || 0;
      if (score > Number(bestScore)) {
        localStorage.setItem('bestScore', score.toString());
      }
    }
  }, [isGameOver, score]);

  const handleTryAgain = () => {
    setScore(0);
    setNextItem(getRandomFruitFeature()?.label as Fruit);
    setIsGameOver(false);
    clear();
  }

  const handleClose = () => {
    window.close();
  }

  return (
    <div className={cx('gameArea')}>
      <div className={cx('topArea')}>
        <div className={cx('leftSection')}>
          <div className={cx('bestScoreCircle')}>
            {score > bestScore ? score : bestScore}
          </div>
        </div>
        
        <div className={cx('centerSection')}>
          <div className={cx('mainScore')}>{score}</div>
          <div className={cx('bestScoreRow')}>
            <div className={cx('crownIcon')}>👑</div>
            <div className={cx('bestScoreText')}>BEST: {score > bestScore ? score : bestScore}</div>
          </div>
        </div>
        
        <div className={cx('rightSection')}>
          <div className={cx('nextFruit')} style={{ backgroundImage: `url(${require('../../resource/' + nextItem + '.png')})` }} />
          <div className={cx('nextText')}>NEXT</div>
        </div>
      </div>
      
      <button className={cx('closeButton')} onClick={handleClose}>
        ×
      </button>
      
      <div className={cx('gameWrap')}>
        <div className={cx('canvasArea')}>
          <div id={'canvasWrap'} className={cx('canvasWrap')}/>
        </div>
      </div>

      <FruitPreview onRestart={handleTryAgain} />
      
      <GameOverModal isVisible={isGameOver} onClick={handleTryAgain} score={score} />
    </div>
  )
}

export default SuikaGame;