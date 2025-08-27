import { useState } from 'react';
import styles from './index.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface GameOverModalProps {
  isVisible: boolean;
  onClick: () => void;
  score: number;
  onShowRanking: () => void;
  onContinueWithAd: () => void;
}

let timeout: NodeJS.Timeout | null = null;

const GameOverModal = ({ isVisible, onClick, score, onShowRanking, onContinueWithAd }: GameOverModalProps) => {
  const [toastVisible, setToastVisible] = useState(false);
  const [showAdChoice, setShowAdChoice] = useState(false);
  const [isWatchingAd, setIsWatchingAd] = useState(false);

  if (!isVisible) return null;

  const handleContinueClick = () => {
    setShowAdChoice(true);
  };

  const handleWatchAd = () => {
    setIsWatchingAd(true);
    // 실제 광고 시청 시뮬레이션 (3초)
    setTimeout(() => {
      setIsWatchingAd(false);
      setShowAdChoice(false);
      onContinueWithAd();
    }, 3000);
  };

  const handleSkipAd = () => {
    setShowAdChoice(false);
  };

  const share = () => {

    if (navigator.share) {
      navigator.share({
        title: '수박 만들기 게임',
        text: '과일들을 모아 수박을 만들어보세요.',
        url: 'https://koreacat.github.io/suika-game/',
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

  return (
    <div className={cx('gameOverArea')}>
      {isWatchingAd ? (
        <div className={cx('adWatchingArea')}>
          <span className={cx('adText')}>광고 시청 중...</span>
          <div className={cx('adSpinner')}></div>
          <span className={cx('adCountdown')}>잠시만 기다려주세요</span>
        </div>
      ) : showAdChoice ? (
        <div className={cx('adChoiceArea')}>
          <span className={cx('text')}>게임 계속하기</span>
          <span className={cx('adChoiceText')}>광고를 시청하고 게임을 계속하시겠습니까?</span>
          <div className={cx('adChoiceButtons')}>
            <button className={cx('watchAdBtn')} onClick={handleWatchAd}>
              📺 광고 보고 계속하기
            </button>
            <button className={cx('skipAdBtn')} onClick={handleSkipAd}>
              건너뛰기
            </button>
          </div>
        </div>
      ) : (
        <>
          <span className={cx('text')}>GAME OVER</span>
          <span className={cx('score')}>SCORE: {score}</span>
          <button className={cx('continueBtn')} onClick={handleContinueClick}>
            🎮 계속하기
          </button>
          <button className={cx('btn')} onClick={onClick}>↻ 새 게임</button>
          <button className={cx('rankingBtn')} onClick={onShowRanking}>🏆 랭킹 보기</button>
          <div className={cx('linkArea')}>
            <a href={'https://forms.gle/QbPDG6rzT4spywyf6'} target='_blank' rel='noopener noreferrer' className={cx('formsLink')}>의견 남기기</a>
            <button className={cx('shareaBtn')} onClick={share}>공유하기</button>
          </div>
          <div className={cx('toastArea', { show: toastVisible })}>🍉URL이 복사되었습니다.</div>
        </>
      )}
    </div>
  )
}

export default GameOverModal;