import { useState } from 'react';
import styles from './index.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface GameOverModalProps {
  isVisible: boolean;
  onClick: () => void;
  onContinue: () => void;
  score: number;
}

let timeout: NodeJS.Timeout | null = null;

const GameOverModal = ({ isVisible, onClick, onContinue, score }: GameOverModalProps) => {
  const [toastVisible, setToastVisible] = useState(false);
  const [showFinalScore, setShowFinalScore] = useState(false);

  console.log('GameOverModal render - isVisible:', isVisible, 'showFinalScore:', showFinalScore);

  if (!isVisible) return null;

  const handleReviveClick = () => {
    onContinue();
  };

  const handleCloseClick = () => {
    setShowFinalScore(true);
  };

  const handleTryAgain = () => {
    setShowFinalScore(false);
    onClick();
  };

  const share = () => {
    if (navigator.share) {
      navigator.share({
        title: '수박 만들기 게임',
        text: `${score}점을 획득했습니다! 과일들을 모아 수박을 만들어보세요.`,
        url: window.location.href,
      })
        .then(() => console.log('done'))
        .catch((error) => console.log(error));
    } else {
      timeout && clearTimeout(timeout);

      const urlToCopy = window.location.href;

      // Clipboard API를 지원하는지 확인
      if (document.queryCommandSupported("copy")) {
        const input = document.createElement("input");
        input.value = urlToCopy;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      } else {
        navigator.clipboard.writeText(urlToCopy)
      }

      setToastVisible(true);
      timeout = setTimeout(() => {
        setToastVisible(false);
      }, 2800)
    }
  }

  // 최종 점수 화면
  if (showFinalScore) {
    return (
      <div className={cx('gameOverArea')}>
        <div className={cx('finalScoreContainer')}>
          <h1 className={cx('gameOverTitle')}>GAME OVER</h1>
          <div className={cx('finalScoreDisplay')}>
            <span className={cx('scoreLabel')}>최종 점수</span>
            <span className={cx('finalScore')}>{score}</span>
          </div>
          <div className={cx('finalButtonContainer')}>
            <button className={cx('shareButton')} onClick={share}>
              공유하기
            </button>
            <button className={cx('restartButton')} onClick={handleTryAgain}>
              다시하기
            </button>
          </div>
        </div>
        <div className={cx('toastArea', { show: toastVisible })}>🍉URL이 복사되었습니다.</div>
      </div>
    );
  }

  // 부활 화면
  return (
    <div className={cx('gameOverArea')}>
      <div className={cx('reviveContainer')}>
        <button className={cx('closeReviveButton')} onClick={handleCloseClick}>
          ×
        </button>
        
        <div className={cx('reviveContent')}>
          <div className={cx('reviveIconContainer')}>
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="#FFD700" stroke="#D2691E" strokeWidth="1"/>
            </svg>
          </div>
          
          <h2 className={cx('reviveTitle')}>광고를 보고 부활할까요?</h2>
          <p className={cx('reviveDescription')}>부활시 넘친 과일은 사라져요.</p>
          
          <button className={cx('reviveButton')} onClick={handleReviveClick}>
            부활하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameOverModal;