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
  const [shakeItemCount, setShakeItemCount] = useState<number>(2);
  const [isItemActive, setIsItemActive] = useState<boolean>(false);
  const [isShakeActive, setIsShakeActive] = useState<boolean>(false);
  const [isCanvasShaking, setIsCanvasShaking] = useState<boolean>(false);

  const { clear, removeSmallFruits, shakeCanvas } = useMatterJS({ 
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
    setShakeItemCount(2);
    setIsItemActive(false);
    setIsShakeActive(false);
    setIsCanvasShaking(false);
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

  const handleShakeUse = () => {
    if (shakeItemCount > 0 && !isGameOver) {
      setShakeItemCount(prev => prev - 1);
      setIsShakeActive(true);
      setIsCanvasShaking(true);
      shakeCanvas();
      
      // 이펙트 애니메이션
      setTimeout(() => {
        setIsShakeActive(false);
        setIsCanvasShaking(false);
      }, 1000);
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
            <div className={cx('itemIcon')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="8" cy="8" r="3" fill="#4F46E5"/>
                <circle cx="16" cy="8" r="3" fill="#EF4444"/>
                <path d="M8 14l8 0" stroke="#D2691E" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>
            <div className={cx('itemCount')}>{itemCount}</div>
          </div>
          <div 
            className={cx('bestScoreCircle', { active: isShakeActive })} 
            onClick={handleShakeUse}
            title={`흔들기 아이템 (${shakeItemCount}개 남음)`}
          >
            <div className={cx('shakeIcon')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 12h3m3-3h3m-3 6h3m3-3h3" stroke="#D2691E" strokeWidth="3" strokeLinecap="round"/>
                <path d="M6 6l3 3m6-3l-3 3m-6 6l3-3m6 3l-3-3" stroke="#D2691E" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className={cx('itemCount')}>{shakeItemCount}</div>
          </div>
        </div>
        
        <div className={cx('centerSection')}>
          <div className={cx('mainScore')}>{score}</div>
          <div className={cx('bestScoreRow')}>
            <div className={cx('crownIcon')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 16L3 8l4 3 5-7 5 7 4-3-2 8H5z" fill="#D2691E" stroke="#D2691E" strokeWidth="2"/>
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
          <div id={'canvasWrap'} className={cx('canvasWrap', { shaking: isCanvasShaking })}/>
        </div>
      </div>

      <FruitPreview onRestart={handleTryAgain} />
      
      <GameOverModal isVisible={isGameOver} onClick={handleTryAgain} score={score} />
    </div>
  )
}

export default SuikaGame;