import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './index.module.scss';
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const ItemUsageModal = ({ isVisible, onClose, onUse, itemType, remainingCount }) => {
    if (!isVisible)
        return null;
    const handleUse = () => {
        // 여기서 광고를 보여주는 로직을 추가할 수 있습니다
        // 현재는 바로 아이템을 사용합니다
        onUse();
        onClose();
    };
    const getItemIcon = () => {
        if (itemType === 'remove') {
            return (_jsx("div", Object.assign({ className: cx('itemIconContainer') }, { children: _jsx("img", { src: require('../../../resource/itempopping.png'), alt: "\uC81C\uAC70 \uC544\uC774\uD15C", width: "40", height: "40" }) })));
        }
        else {
            return (_jsx("div", Object.assign({ className: cx('itemIconContainer') }, { children: _jsx("img", { src: require('../../../resource/shake_icon.png'), alt: "\uD754\uB4E4\uAE30", width: "40", height: "40" }) })));
        }
    };
    const getItemTitle = () => {
        return itemType === 'remove' ? '아이템 사용' : '흔들기 사용';
    };
    const getItemDescription = () => {
        return itemType === 'remove'
            ? '광고를 보고 작은 빵들을 제거할까요?'
            : '광고를 보고 화면을 흔들까요?';
    };
    return (_jsx("div", Object.assign({ className: cx('modalOverlay') }, { children: _jsxs("div", Object.assign({ className: cx('modalContainer') }, { children: [_jsx("div", Object.assign({ className: cx('modalHeader') }, { children: _jsx("h2", Object.assign({ className: cx('modalTitle') }, { children: getItemTitle() })) })), _jsxs("div", Object.assign({ className: cx('modalContent') }, { children: [getItemIcon(), _jsx("p", Object.assign({ className: cx('modalDescription') }, { children: getItemDescription() })), _jsxs("p", Object.assign({ className: cx('remainingCount') }, { children: ["\uB0A8\uC740 \uAC1C\uC218: ", remainingCount, "\uAC1C"] }))] })), _jsx("div", Object.assign({ className: cx('modalActions') }, { children: _jsx("button", Object.assign({ className: cx('useButton'), onClick: handleUse }, { children: "\uC0AC\uC6A9\uD558\uAE30" })) })), _jsx("button", Object.assign({ className: cx('closeButton'), onClick: onClose }, { children: "\u00D7" }))] })) })));
};
export default ItemUsageModal;
