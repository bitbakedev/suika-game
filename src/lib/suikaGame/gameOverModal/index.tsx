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
  const [showAdModal, setShowAdModal] = useState(false);

  console.log('GameOverModal render - isVisible:', isVisible); // 디버깅용
  
  if (!isVisible) return null;

  const handleContinueClick = () => {
    setShowAdModal(true);
  };

  const handleWatchAd = () => {
    // 여기서 실제 광고를 보여주는 로직을 추가할 수 있습니다
    // 현재는 바로 계속하기 기능을 실행합니다
    setShowAdModal(false);
    onContinue();
  };

  const handleCloseAdModal = () => {
    setShowAdModal(false);
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

  if (showAdModal) {
    return (
      <div className={cx('gameOverArea')}>
        <div className={cx('adModalContainer')}>
          <div className={cx('adModalHeader')}>
            <h2 className={cx('adModalTitle')}>게임 계속하기</h2>
          </div>
          
          <div className={cx('adModalContent')}>
            <div className={cx('adIconContainer')}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                <path d="M8 5v14l11-7z" fill="#FFD700" stroke="#D2691E" strokeWidth="1"/>
              </svg>
            </div>
            <p className={cx('adModalDescription')}>
              광고를 보고 게임을 계속하시겠습니까?
            </p>
            <p className={cx('adModalSubDescription')}>
              게임오버 라인 위의 빵들이 제거되고 게임이 계속됩니다.
            </p>
          </div>
          
          <div className={cx('adModalActions')}>
            <button className={cx('cancelAdButton')} onClick={handleCloseAdModal}>
              취소
            </button>
            <button className={cx('watchAdButton')} onClick={handleWatchAd}>
              광고 보기
            </button>
          </div>
          
          <button className={cx('closeAdButton')} onClick={handleCloseAdModal}>
            ×
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cx('gameOverArea')}>
      <span className={cx('text')}>GAME OVER</span>
      <span className={cx('score')}>SCORE: {score}</span>
      <div className={cx('buttonContainer')}>
        <button className={cx('continueBtn')} onClick={handleContinueClick}>📺 CONTINUE?</button>
        <button className={cx('btn')} onClick={onClick}>↻ TRY AGAIN?</button>
      </div>
      <div className={cx('linkArea')}>
        <a href={'https://forms.gle/QbPDG6rzT4spywyf6'} target='_blank' className={cx('formsLink')}>의견 남기기</a>
        <button className={cx('shareaBtn')} onClick={share}>공유하기</button>
      </div>
      <div className={cx('toastArea', { show: toastVisible })}>🍉URL이 복사되었습니다.</div>
    </div>
  )
}

export default GameOverModal;