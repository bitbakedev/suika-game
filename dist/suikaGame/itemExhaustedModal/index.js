import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './index.module.scss';
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const ItemExhaustedModal = ({ isVisible, onClose, itemType }) => {
    if (!isVisible)
        return null;
    const getItemName = () => {
        return itemType === 'remove' ? '제거 아이템' : '흔들기 아이템';
    };
    const getItemIcon = () => {
        if (itemType === 'remove') {
            return (_jsx("div", Object.assign({ className: cx('itemIconContainer') }, { children: _jsx("img", { src: require('../../../resource/itempopping.png'), alt: "\uC81C\uAC70 \uC544\uC774\uD15C", width: "40", height: "40" }) })));
        }
        else {
            return (_jsx("div", Object.assign({ className: cx('itemIconContainer') }, { children: _jsx("img", { src: require('../../../resource/shake_icon.png'), alt: "\uD754\uB4E4\uAE30", width: "40", height: "40" }) })));
        }
    };
    return (_jsx("div", Object.assign({ className: cx('modalOverlay') }, { children: _jsxs("div", Object.assign({ className: cx('modalContainer') }, { children: [_jsx("div", Object.assign({ className: cx('modalHeader') }, { children: _jsx("h2", Object.assign({ className: cx('modalTitle') }, { children: "\uC544\uC774\uD15C \uC18C\uC9C4" })) })), _jsxs("div", Object.assign({ className: cx('modalContent') }, { children: [getItemIcon(), _jsxs("p", Object.assign({ className: cx('modalDescription') }, { children: [getItemName(), "\uC744 \uBAA8\uB450 \uC0AC\uC6A9\uD588\uC2B5\uB2C8\uB2E4!"] })), _jsx("p", Object.assign({ className: cx('subDescription') }, { children: "\uAC8C\uC784\uC744 \uB2E4\uC2DC \uC2DC\uC791\uD558\uBA74 \uC544\uC774\uD15C\uC774 \uCD08\uAE30\uD654\uB429\uB2C8\uB2E4." }))] })), _jsx("div", Object.assign({ className: cx('modalActions') }, { children: _jsx("button", Object.assign({ className: cx('confirmButton'), onClick: onClose }, { children: "\uD655\uC778" })) })), _jsx("button", Object.assign({ className: cx('closeButton'), onClick: onClose }, { children: "\u00D7" }))] })) })));
};
export default ItemExhaustedModal;
