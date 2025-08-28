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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import styles from './index.module.scss';
import classNames from "classnames/bind";
var cx = classNames.bind(styles);
var Advertisement = function (_a) {
    var _b = _a.adSlot, adSlot = _b === void 0 ? "1234567890" : _b, _c = _a.adClient, adClient = _c === void 0 ? "ca-pub-6671588871176014" : _c, _d = _a.adFormat, adFormat = _d === void 0 ? "auto" : _d, _e = _a.responsive, responsive = _e === void 0 ? true : _e;
    var adRef = useRef(null);
    useEffect(function () {
        // Google AdSense 스크립트가 로드되었는지 확인하고 지연 후 실행
        var timer = setTimeout(function () {
            if (typeof window !== 'undefined' && window.adsbygoogle) {
                try {
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                }
                catch (error) {
                    console.error('AdSense error:', error);
                }
            }
        }, 500);
        return function () { return clearTimeout(timer); };
    }, []);
    return (_jsx("div", __assign({ className: cx('adWrapper') }, { children: _jsxs("div", __assign({ className: cx('adContainer') }, { children: [_jsx("ins", { className: cx('adBanner', 'adsbygoogle'), style: { display: 'block' }, "data-ad-client": adClient, "data-ad-slot": adSlot, "data-ad-format": adFormat, "data-full-width-responsive": responsive ? 'true' : 'false', ref: adRef }), _jsx("div", __assign({ className: cx('adPlaceholder') }, { children: "Advertisement" }))] })) })));
};
export default Advertisement;
