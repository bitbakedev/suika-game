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
  const [itemCount, setItemCount] = useState<number>(3);
  const [isItemActive, setIsItemActive] = useState<boolean>(false);

  const { clear, removeSmallFruits } = useMatterJS({ 
    score, 
    setScore, 
    nextItem, 
    setNextItem, 
    isGameOver, 
    setIsGameOver 
  });

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
    setItemCount(3);
    setIsItemActive(false);
    clear();
  }

  const handleClose = () => {
    window.close();
  }

  const handleItemUse = () => {
    if (itemCount > 0 && !isGameOver) {
      setItemCount(prev => prev - 1);
      setIsItemActive(true);
      removeSmallFruits();
      
      // 이펙트 애니메이션
      setTimeout(() => {
        setIsItemActive(false);
      }, 600);
    }
  }

  return (
    <div className={cx('gameArea')}>
      <div className={cx('topArea')}>
        <div className={cx('leftSection')}>
          <div 
            className={cx('bestScoreCircle', { active: isItemActive })} 
            onClick={handleItemUse}
            title={`아이템 사용 (${itemCount}개 남음)`}
          >
            {itemCount}
          </div>
        </div>
        
        <div className={cx('centerSection')}>
          <div className={cx('mainScore')}>{score}</div>
          <div className={cx('bestScoreRow')}>
            <div className={cx('crownIcon')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 16L3 7l5.5 4L12 4l3.5 7L21 7l-2 9H5z" fill="#8B4513" stroke="#8B4513" strokeWidth="1"/>
                <circle cx="7" cy="9" r="1" fill="#8B4513"/>
                <circle cx="12" cy="6" r="1" fill="#8B4513"/>
                <circle cx="17" cy="9" r="1" fill="#8B4513"/>
              </svg>
            </div>
            <div className={cx('bestScoreText')}>{score > bestScore ? score : bestScore}</div>
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