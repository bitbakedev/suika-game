import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import classNames from "classnames/bind";
import useMatterJS from "./useMatterJS";
import { Fruit, getRandomFruitFeature } from './object/Fruit';
import GameOverModal from './gameOverModal';
import FruitPreview from './fruitPreview';
import ItemUsageModal from './itemUsageModal';
import ItemExhaustedModal from './itemExhaustedModal';
import RestartConfirmModal from './restartConfirmModal';

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
  const [showItemModal, setShowItemModal] = useState<boolean>(false);
  const [modalItemType, setModalItemType] = useState<'remove' | 'shake'>('remove');
  const [showExhaustedModal, setShowExhaustedModal] = useState<boolean>(false);
  const [exhaustedItemType, setExhaustedItemType] = useState<'remove' | 'shake'>('remove');
  const [showRestartModal, setShowRestartModal] = useState<boolean>(false);

  const getImageUrl = (fruit: Fruit) => {
    if (fruit === Fruit.BLUEBERRY) {
      return require('../../resource/BREAD1.png');
    }
    if (fruit === Fruit.STRAWBERRY) {
      return require('../../resource/BREAD2.png');
    }
    if (fruit === Fruit.TANGERINE) {
      return require('../../resource/BREAD3.png');
    }
    if (fruit === Fruit.TOMATO) {
      return require('../../resource/BREAD4.png');
    }
    if (fruit === Fruit.AVOCADO) {
      return require('../../resource/BREAD5.png');
    }
    if (fruit === Fruit.KOREANMELON) {
      return require('../../resource/BREAD6.png');
    }
    if (fruit === Fruit.APPLE) {
      return require('../../resource/BREAD7.png');
    }
    if (fruit === Fruit.PEACH) {
      return require('../../resource/BREAD8.png');
    }
    if (fruit === Fruit.COCONUT) {
      return require('../../resource/BREAD9.png');
    }
    if (fruit === Fruit.MELON) {
      return require('../../resource/BREAD10.png');
    }
    if (fruit === Fruit.WATERMELON) {
      return require('../../resource/BREAD11.png');
    }
    return require('../../resource/' + fruit + '.png');
  };

  const { clear, removeSmallFruits, shakeCanvas, removeGameOverLineFruits } = useMatterJS({
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
        setBestScore(score);
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

  const handleRestartClick = () => {
    setShowRestartModal(true);
  }

  const handleRestartConfirm = () => {
    handleTryAgain();
  }

  const handleContinueWithAd = () => {
    // 게임오버 라인 위의 과일들 제거
    removeGameOverLineFruits();
    setIsGameOver(false);
  }

  const handleClose = () => {
    window.close();
  }

  const handleItemUse = () => {
    if (itemCount > 0 && !isGameOver) {
      setModalItemType('remove');
      setShowItemModal(true);
    } else if (itemCount === 0 && !isGameOver) {
      setExhaustedItemType('remove');
      setShowExhaustedModal(true);
    }
  }

  const handleShakeUse = () => {
    if (shakeItemCount > 0 && !isGameOver) {
      setModalItemType('shake');
      setShowItemModal(true);
    } else if (shakeItemCount === 0 && !isGameOver) {
      setExhaustedItemType('shake');
      setShowExhaustedModal(true);
    }
  }

  const handleModalItemUse = () => {
    if (modalItemType === 'remove') {
      setItemCount(prev => prev - 1);
      setIsItemActive(true);
      removeSmallFruits();
      
      // 이펙트 애니메이션
      setTimeout(() => {
        setIsItemActive(false);
      }, 600);
    } else {
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
              <img src={require('../../resource/itempopping.png')} alt="제거 아이템" width="24" height="24" />
            </div>
          </div>
          <div 
            className={cx('bestScoreCircle', { active: isShakeActive })} 
            onClick={handleShakeUse}
            title={`흔들기 아이템 (${shakeItemCount}개 남음)`}
          >
            <div className={cx('shakeIcon')}>
              <img src={require('../../resource/shake_icon.png')} alt="흔들기2" width="24" height="24" />
            </div>
          </div>
        </div>
        
        <div className={cx('centerSection')}>
          <div className={cx('mainScore')}>{score}</div>
          <div className={cx('bestScoreRow')}>
            <div className={cx('crownIcon')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 20h14v-2H5v2z" fill="#FFC107" stroke="#D2691E" strokeWidth="0.5"/>
                <path d="M5 18l2-8 3 4 2-6 2 6 3-4 2 8H5z" fill="#FFC107" stroke="#D2691E" strokeWidth="0.5"/>
              </svg>
            </div>
            <div className={cx('bestScoreText')}>{score > bestScore ? score : bestScore}</div>
          </div>
        </div>
        
        <div className={cx('rightSection')}>
          <div className={cx('nextFruit')} style={{ backgroundImage: `url(${getImageUrl(nextItem)})` }} />
          <div className={cx('nextText')}>NEXT</div>
        </div>
      </div>
      
      <button className={cx('closeButton')} onClick={handleClose}>
        ×
      </button>
      
      <button className={cx('closeButton')} onClick={handleClose}>
        ×
      </button>
      
      <div className={cx('gameWrap')}>
        <div className={cx('canvasArea')}>
          <div id={'canvasWrap'} className={cx('canvasWrap', { shaking: isCanvasShaking })}/>
        </div>
      </div>

      <FruitPreview onRestart={handleRestartClick} />
      
      
      <ItemUsageModal 
        isVisible={showItemModal}
        onClose={() => setShowItemModal(false)}
        onUse={handleModalItemUse}
        itemType={modalItemType}
        remainingCount={modalItemType === 'remove' ? itemCount : shakeItemCount}
      />
      
      <ItemExhaustedModal 
        isVisible={showExhaustedModal}
        onClose={() => setShowExhaustedModal(false)}
        itemType={exhaustedItemType}
      />
      
      <RestartConfirmModal 
        isVisible={showRestartModal}
        onClose={() => setShowRestartModal(false)}
        onConfirm={handleRestartConfirm}
      />
    </div>
  )
}

export default SuikaGame;