import styles from './index.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface ItemExhaustedModalProps {
  isVisible: boolean;
  onClose: () => void;
  itemType: 'remove' | 'shake';
}

const ItemExhaustedModal = ({ isVisible, onClose, itemType }: ItemExhaustedModalProps) => {
  if (!isVisible) return null;

  const getItemName = () => {
    return itemType === 'remove' ? '제거 아이템' : '흔들기 아이템';
  };

  const getItemIcon = () => {
    if (itemType === 'remove') {
      return (
        <div className={cx('itemIconContainer')}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <circle cx="7" cy="7" r="4" fill="#4F46E5"/>
            <circle cx="17" cy="7" r="4" fill="#EF4444"/>
            <path d="M4 16l16 0" stroke="#D2691E" strokeWidth="4" strokeLinecap="round"/>
            <path d="M6 18l12 0" stroke="#D2691E" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      );
    } else {
      return (
        <div className={cx('itemIconContainer')}>
          <img src={require('../../../resource/shake_icon.png')} alt="흔들기" width="40" height="40" />
        </div>
      );
    }
  };

  return (
    <div className={cx('modalOverlay')}>
      <div className={cx('modalContainer')}>
        <div className={cx('modalHeader')}>
          <h2 className={cx('modalTitle')}>아이템 소진</h2>
        </div>
        
        <div className={cx('modalContent')}>
          {getItemIcon()}
          <p className={cx('modalDescription')}>
            {getItemName()}을 모두 사용했습니다!
          </p>
          <p className={cx('subDescription')}>
            게임을 다시 시작하면 아이템이 초기화됩니다.
          </p>
        </div>
        
        <div className={cx('modalActions')}>
          <button className={cx('confirmButton')} onClick={onClose}>
            확인
          </button>
        </div>
        
        <button className={cx('closeButton')} onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
};

export default ItemExhaustedModal;