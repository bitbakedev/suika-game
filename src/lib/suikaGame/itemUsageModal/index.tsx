import { useState } from 'react';
import styles from './index.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface ItemUsageModalProps {
  isVisible: boolean;
  onClose: () => void;
  onUse: () => void;
  itemType: 'remove' | 'shake';
  remainingCount: number;
}

const ItemUsageModal = ({ isVisible, onClose, onUse, itemType, remainingCount }: ItemUsageModalProps) => {
  if (!isVisible) return null;

  const handleUse = () => {
    // 여기서 광고를 보여주는 로직을 추가할 수 있습니다
    // 현재는 바로 아이템을 사용합니다
    onUse();
    onClose();
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

  const getItemTitle = () => {
    return itemType === 'remove' ? '아이템 사용' : '흔들기 사용';
  };

  const getItemDescription = () => {
    return itemType === 'remove' 
      ? '광고를 보고 아이템을 사용할까요?' 
      : '광고를 보고 흔들기를 사용할까요?';
  };

  return (
    <div className={cx('modalOverlay')}>
      <div className={cx('modalContainer')}>
        <div className={cx('modalHeader')}>
          <h2 className={cx('modalTitle')}>{getItemTitle()}</h2>
        </div>
        
        <div className={cx('modalContent')}>
          {getItemIcon()}
          <p className={cx('modalDescription')}>{getItemDescription()}</p>
          <p className={cx('remainingCount')}>남은 개수: {remainingCount}개</p>
        </div>
        
        <div className={cx('modalActions')}>
          <button className={cx('useButton')} onClick={handleUse}>
            사용하기
          </button>
        </div>
        
        <button className={cx('closeButton')} onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
};

export default ItemUsageModal;