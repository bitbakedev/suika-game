import styles from './index.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface RestartConfirmModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const RestartConfirmModal = ({ isVisible, onClose, onConfirm }: RestartConfirmModalProps) => {
  if (!isVisible) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className={cx('modalOverlay')}>
      <div className={cx('modalContainer')}>
        <div className={cx('modalHeader')}>
          <h2 className={cx('modalTitle')}>게임 재시작</h2>
        </div>
        
        <div className={cx('modalContent')}>
          <p className={cx('modalDescription')}>
            정말로 게임을 다시 시작하시겠습니까?
          </p>
          <p className={cx('subDescription')}>
            현재 진행 상황이 모두 초기화됩니다.
          </p>
        </div>
        
        <div className={cx('modalActions')}>
          <button className={cx('cancelButton')} onClick={onClose}>
            취소
          </button>
          <button className={cx('confirmButton')} onClick={handleConfirm}>
            재시작
          </button>
        </div>
        
        <button className={cx('closeButton')} onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
};

export default RestartConfirmModal;