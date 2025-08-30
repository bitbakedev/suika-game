import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import classNames from "classnames/bind";
import useMatterJS from "./useMatterJS";
import { Fruit, getRandomFruitFeature } from './object/Fruit';
import GameOverModal from './gameOverModal';
import Header from './header';

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
  }, [isGameOver]);

  const handleTryAgain = () => {
    setScore(0);
    setNextItem(getRandomFruitFeature()?.label as Fruit);
    setIsGameOver(false);
    clear();
  }

  const handleClose = () => {
    // 게임 종료 로직 (예: 부모 컴포넌트로 알림)
    window.close();
  }

  return (
    <div className={cx('gameArea')}>
      <div className={cx('gameWrap')}>
        <button className={cx('closeButton')} onClick={handleClose}>
          ×
        </button>
        <button className={cx('restartButton')} onClick={handleTryAgain}>
          ↻
        </button>
        <div className={cx('canvasArea')}>
          <Header bestScore={bestScore} score={score} nextItem={nextItem}/>
          <div id={'canvasWrap'} className={cx('canvasWrap')}/>
        </div>
      </div>

      <GameOverModal isVisible={isGameOver} onClick={handleTryAgain} score={score} />
    </div>
  )
}

export default SuikaGame;