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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import styles from './index.module.scss';
import classNames from "classnames/bind";
var cx = classNames.bind(styles);
var timeout = null;
var GameOverModal = function (_a) {
    var isVisible = _a.isVisible, onClick = _a.onClick, score = _a.score, onShowRanking = _a.onShowRanking, onContinueWithAd = _a.onContinueWithAd;
    var _b = useState(false), toastVisible = _b[0], setToastVisible = _b[1];
    var _c = useState(false), showAdChoice = _c[0], setShowAdChoice = _c[1];
    var _d = useState(false), isWatchingAd = _d[0], setIsWatchingAd = _d[1];
    if (!isVisible)
        return null;
    var handleContinueClick = function () {
        setShowAdChoice(true);
    };
    var handleWatchAd = function () {
        setIsWatchingAd(true);
        // 실제 광고 시청 시뮬레이션 (3초)
        setTimeout(function () {
            setIsWatchingAd(false);
            setShowAdChoice(false);
            onContinueWithAd();
        }, 3000);
    };
    var handleSkipAd = function () {
        setShowAdChoice(false);
    };
    var share = function () {
        if (navigator.share) {
            navigator.share({
                title: '수박 만들기 게임',
                text: '과일들을 모아 수박을 만들어보세요.',
                url: 'https://koreacat.github.io/suika-game/',
            })
                .then(function () { return console.log('done'); })
                .catch(function (error) { return console.log(error); });
        }
        else {
            timeout && clearTimeout(timeout);
            var urlToCopy = window.location.href;
            // Clipboard API를 지원하는지 확인
            if (document.queryCommandSupported("copy")) {
                var input = document.createElement("input");
                input.value = urlToCopy;
                document.body.appendChild(input);
                input.select();
                document.execCommand("copy");
                document.body.removeChild(input);
            }
            else {
                navigator.clipboard.writeText(urlToCopy);
            }
            setToastVisible(true);
            timeout = setTimeout(function () {
                setToastVisible(false);
            }, 2800);
        }
    };
    return (_jsx("div", __assign({ className: cx('gameOverArea') }, { children: isWatchingAd ? (_jsxs("div", __assign({ className: cx('adWatchingArea') }, { children: [_jsx("span", __assign({ className: cx('adText') }, { children: "\uAD11\uACE0 \uC2DC\uCCAD \uC911..." })), _jsx("div", { className: cx('adSpinner') }), _jsx("span", __assign({ className: cx('adCountdown') }, { children: "\uC7A0\uC2DC\uB9CC \uAE30\uB2E4\uB824\uC8FC\uC138\uC694" }))] }))) : showAdChoice ? (_jsxs("div", __assign({ className: cx('adChoiceArea') }, { children: [_jsx("span", __assign({ className: cx('text') }, { children: "\uAC8C\uC784 \uACC4\uC18D\uD558\uAE30" })), _jsx("span", __assign({ className: cx('adChoiceText') }, { children: "\uAD11\uACE0\uB97C \uC2DC\uCCAD\uD558\uACE0 \uAC8C\uC784\uC744 \uACC4\uC18D\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?" })), _jsxs("div", __assign({ className: cx('adChoiceButtons') }, { children: [_jsx("button", __assign({ className: cx('watchAdBtn'), onClick: handleWatchAd }, { children: "\uD83D\uDCFA \uAD11\uACE0 \uBCF4\uACE0 \uACC4\uC18D\uD558\uAE30" })), _jsx("button", __assign({ className: cx('skipAdBtn'), onClick: handleSkipAd }, { children: "\uAC74\uB108\uB6F0\uAE30" }))] }))] }))) : (_jsxs(_Fragment, { children: [_jsx("span", __assign({ className: cx('text') }, { children: "GAME OVER" })), _jsxs("span", __assign({ className: cx('score') }, { children: ["SCORE: ", score] })), _jsx("button", __assign({ className: cx('continueBtn'), onClick: handleContinueClick }, { children: "\uD83C\uDFAE \uACC4\uC18D\uD558\uAE30" })), _jsx("button", __assign({ className: cx('btn'), onClick: onClick }, { children: "\u21BB \uC0C8 \uAC8C\uC784" })), _jsx("button", __assign({ className: cx('rankingBtn'), onClick: onShowRanking }, { children: "\uD83C\uDFC6 \uB7AD\uD0B9 \uBCF4\uAE30" })), _jsxs("div", __assign({ className: cx('linkArea') }, { children: [_jsx("a", __assign({ href: 'https://forms.gle/QbPDG6rzT4spywyf6', target: '_blank', rel: 'noopener noreferrer', className: cx('formsLink') }, { children: "\uC758\uACAC \uB0A8\uAE30\uAE30" })), _jsx("button", __assign({ className: cx('shareaBtn'), onClick: share }, { children: "\uACF5\uC720\uD558\uAE30" }))] })), _jsx("div", __assign({ className: cx('toastArea', { show: toastVisible }) }, { children: "\uD83C\uDF49URL\uC774 \uBCF5\uC0AC\uB418\uC5C8\uC2B5\uB2C8\uB2E4." }))] })) })));
};
export default GameOverModal;
