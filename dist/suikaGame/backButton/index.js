var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx } from "react/jsx-runtime";
import styles from './index.module.scss';
import classNames from "classnames/bind";
var cx = classNames.bind(styles);
var BackButton = function (_a) {
    var onClick = _a.onClick;
    var handleBack = function () {
        if (onClick) {
            onClick();
        }
        else {
            if (window.history.length > 1) {
                window.history.back();
            }
            else {
                // 히스토리가 없으면 홈페이지로 이동하거나 페이지 새로고침
                window.location.href = '/';
            }
        }
    };
    return (_jsx("button", __assign({ className: cx('backButton'), onClick: handleBack }, { children: "\u2190 \uB4A4\uB85C\uAC00\uAE30" })));
};
export default BackButton;
