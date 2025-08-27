import styles from './index.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface BackButtonProps {
  onClick?: () => void;
}

const BackButton = ({ onClick }: BackButtonProps) => {
  const handleBack = () => {
    if (onClick) {
      onClick();
    } else {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        // 히스토리가 없으면 홈페이지로 이동하거나 페이지 새로고침
        window.location.href = '/';
      }
    }
  };
  return (
    <button className={cx('backButton')} onClick={handleBack}>
      ← 뒤로가기
    </button>
  );
};

export default BackButton;