import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import classNames from "classnames/bind";
import useMatterJS from "./useMatterJS";
import { Fruit, getRandomFruitFeature } from './object/Fruit';
import GameOverModal from './gameOverModal';

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

  const handleSettings = () => {
    // 설정 메뉴 열기 (추후 구현)
    console.log('Settings clicked');
  }

  // 모든 과일 목록
  const allFruits = Object.values(Fruit);

  return (
    <div className={cx('gameArea')}>
      <div className={cx('topArea')}>
        <div className={cx('scoreArea')}>
          <span className={cx('crown')}>👑</span>
          <span className={cx('score')}>{score > bestScore ? score : bestScore}</span>
        </div>
        
        <button className={cx('settingsButton')} onClick={handleSettings}>
          ⚙️
        </button>
      </div>
      
      <div className={cx('gameWrap')}>
        <div className={cx('canvasArea')}>
          <div id={'canvasWrap'} className={cx('canvasWrap')}/>
        </div>
      </div>

      <div className={cx('bottomArea')}>
        {allFruits.map((fruit, index) => (
          <div 
            key={fruit} 
            className={cx('fruitItem')}
            style={{ 
              backgroundImage: `url(${require('../../resource/' + fruit + '.png')})`,
              animationDelay: `${index * 0.1}s`
            }}
          />
        ))}
      </div>
      
      <GameOverModal isVisible={isGameOver} onClick={handleTryAgain} score={score} />
    </div>
  )
}

export default SuikaGame;