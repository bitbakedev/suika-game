import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import styles from './index.module.scss';
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
let timeout = null;
const GameOverModal = ({ isVisible, onClick, onContinue, hasUsedRevive, score }) => {
    const [toastVisible, setToastVisible] = useState(false);
    const [showFinalScore, setShowFinalScore] = useState(false);
    console.log('GameOverModal render - isVisible:', isVisible, 'showFinalScore:', showFinalScore);
    if (!isVisible)
        return null;
    const handleReviveClick = () => {
        console.log('Revive button clicked'); // 디버깅용
        onContinue();
        setShowFinalScore(false); // 부활 후 모달 닫기
    };
    const handleCloseClick = () => {
        setShowFinalScore(true);
    };
    const handleTryAgain = () => {
        setShowFinalScore(false);
        onClick();
    };
    const share = () => {
        if (navigator.share) {
            navigator.share({
                title: '수박 만들기 게임',
                text: `${score}점을 획득했습니다! 과일들을 모아 수박을 만들어보세요.`,
                url: window.location.href,
            })
                .then(() => console.log('done'))
                .catch((error) => console.log(error));
        }
        else {
            timeout && clearTimeout(timeout);
            const urlToCopy = window.location.href;
            // Clipboard API를 지원하는지 확인
            if (document.queryCommandSupported("copy")) {
                const input = document.createElement("input");
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
            timeout = setTimeout(() => {
                setToastVisible(false);
            }, 2800);
        }
    };
    // 최종 점수 화면
    if (showFinalScore) {
        return (_jsxs("div", Object.assign({ className: cx('gameOverArea') }, { children: [_jsxs("div", Object.assign({ className: cx('finalScoreContainer') }, { children: [_jsx("h1", Object.assign({ className: cx('gameOverTitle') }, { children: "GAME OVER" })), _jsxs("div", Object.assign({ className: cx('finalScoreDisplay') }, { children: [_jsx("span", Object.assign({ className: cx('scoreLabel') }, { children: "\uCD5C\uC885 \uC810\uC218" })), _jsx("span", Object.assign({ className: cx('finalScore') }, { children: score }))] })), _jsxs("div", Object.assign({ className: cx('finalButtonContainer') }, { children: [_jsx("button", Object.assign({ className: cx('shareButton'), onClick: share }, { children: "\uACF5\uC720\uD558\uAE30" })), _jsx("button", Object.assign({ className: cx('restartButton'), onClick: handleTryAgain }, { children: "\uB2E4\uC2DC\uD558\uAE30" }))] }))] })), _jsx("div", Object.assign({ className: cx('toastArea', { show: toastVisible }) }, { children: "\uD83C\uDF49URL\uC774 \uBCF5\uC0AC\uB418\uC5C8\uC2B5\uB2C8\uB2E4." }))] })));
    }
    // 부활 화면
    if (hasUsedRevive) {
        // 이미 부활을 사용했다면 바로 최종 점수 화면으로
        return (_jsxs("div", Object.assign({ className: cx('gameOverArea') }, { children: [_jsxs("div", Object.assign({ className: cx('finalScoreContainer') }, { children: [_jsx("h1", Object.assign({ className: cx('gameOverTitle') }, { children: "GAME OVER" })), _jsxs("div", Object.assign({ className: cx('finalScoreDisplay') }, { children: [_jsx("span", Object.assign({ className: cx('scoreLabel') }, { children: "\uCD5C\uC885 \uC810\uC218" })), _jsx("span", Object.assign({ className: cx('finalScore') }, { children: score }))] })), _jsxs("div", Object.assign({ className: cx('finalButtonContainer') }, { children: [_jsx("button", Object.assign({ className: cx('shareButton'), onClick: share }, { children: "\uACF5\uC720\uD558\uAE30" })), _jsx("button", Object.assign({ className: cx('restartButton'), onClick: handleTryAgain }, { children: "\uB2E4\uC2DC\uD558\uAE30" }))] }))] })), _jsx("div", Object.assign({ className: cx('toastArea', { show: toastVisible }) }, { children: "\uD83C\uDF49URL\uC774 \uBCF5\uC0AC\uB418\uC5C8\uC2B5\uB2C8\uB2E4." }))] })));
    }
    // 첫 번째 게임오버 - 부활 화면
    return (_jsx("div", Object.assign({ className: cx('gameOverArea') }, { children: _jsxs("div", Object.assign({ className: cx('reviveContainer') }, { children: [_jsx("button", Object.assign({ className: cx('closeReviveButton'), onClick: handleCloseClick }, { children: "\u00D7" })), _jsxs("div", Object.assign({ className: cx('reviveContent') }, { children: [_jsx("div", Object.assign({ className: cx('reviveIconContainer') }, { children: _jsx("svg", Object.assign({ width: "60", height: "60", viewBox: "0 0 24 24", fill: "none" }, { children: _jsx("path", { d: "M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z", fill: "#FFD700", stroke: "#D2691E", strokeWidth: "1" }) })) })), _jsx("h2", Object.assign({ className: cx('reviveTitle') }, { children: "\uAD11\uACE0\uB97C \uBCF4\uACE0 \uBD80\uD65C\uD560\uAE4C\uC694?" })), _jsx("p", Object.assign({ className: cx('reviveDescription') }, { children: "\uBD80\uD65C\uC2DC \uB118\uCE5C \uACFC\uC77C\uC740 \uC0AC\uB77C\uC838\uC694." })), _jsx("button", Object.assign({ className: cx('reviveButton'), onClick: handleReviveClick }, { children: "\uBD80\uD65C\uD558\uAE30" }))] }))] })) })));
};
export default GameOverModal;
