import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import classNames from "classnames/bind";
import useMatterJS from "./useMatterJS";
import { Fruit, getRandomFruitFeature } from './object/Fruit';
import GameOverModal from './gameOverModal';
import Intro from './intro';
import Header from './header';
import Advertisement from './advertisement';
import Ranking from './ranking';
import BackButton from './backButton';

const cx = classNames.bind(styles);

const SuikaGame = () => {
  const [bestScore, setBestScore] = useState(0);
  const [score, setScore] = useState(0);
  const [nextItem, setNextItem] = useState<Fruit>(getRandomFruitFeature()?.label as Fruit);
  const [isStart, setIsStart] = useState<boolean>(true);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [showRanking, setShowRanking] = useState<boolean>(false);

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
    setShowRanking(false);
    clear();
  }

  const handleShowRanking = () => {
    setShowRanking(true);
  }

  const handleCloseRanking = () => {
    setShowRanking(false);
  }
  return (
    <div className={cx('gameArea')}>
      <div className={cx('gameWrap')}>
        <div className={cx('canvasArea')}>
          <BackButton />
          <Header bestScore={bestScore} score={score} nextItem={nextItem}/>
          <div id={'canvasWrap'} className={cx('canvasWrap')}/>
        </div>
        <Advertisement />
      </div>

      <GameOverModal 
        isVisible={isGameOver && !showRanking} 
        onClick={handleTryAgain} 
        score={score} 
        onShowRanking={handleShowRanking}
      />
      <Ranking 
        isVisible={showRanking} 
        onClose={handleCloseRanking} 
        currentScore={score}
      />
    </div>
  )
}

export default SuikaGame;