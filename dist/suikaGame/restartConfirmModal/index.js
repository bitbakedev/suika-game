import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './index.module.scss';
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const RestartConfirmModal = ({ isVisible, onClose, onConfirm }) => {
    if (!isVisible)
        return null;
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };
    return (_jsx("div", Object.assign({ className: cx('modalOverlay') }, { children: _jsxs("div", Object.assign({ className: cx('modalContainer') }, { children: [_jsx("div", Object.assign({ className: cx('modalHeader') }, { children: _jsx("h2", Object.assign({ className: cx('modalTitle') }, { children: "\uAC8C\uC784 \uC7AC\uC2DC\uC791" })) })), _jsxs("div", Object.assign({ className: cx('modalContent') }, { children: [_jsx("p", Object.assign({ className: cx('modalDescription') }, { children: "\uC815\uB9D0\uB85C \uAC8C\uC784\uC744 \uB2E4\uC2DC \uC2DC\uC791\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?" })), _jsx("p", Object.assign({ className: cx('subDescription') }, { children: "\uD604\uC7AC \uC9C4\uD589 \uC0C1\uD669\uC774 \uBAA8\uB450 \uCD08\uAE30\uD654\uB429\uB2C8\uB2E4." }))] })), _jsxs("div", Object.assign({ className: cx('modalActions') }, { children: [_jsx("button", Object.assign({ className: cx('cancelButton'), onClick: onClose }, { children: "\uCDE8\uC18C" })), _jsx("button", Object.assign({ className: cx('confirmButton'), onClick: handleConfirm }, { children: "\uC7AC\uC2DC\uC791" }))] })), _jsx("button", Object.assign({ className: cx('closeButton'), onClick: onClose }, { children: "\u00D7" }))] })) })));
};
export default RestartConfirmModal;
