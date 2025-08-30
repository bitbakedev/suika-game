import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import styles from './index.module.scss';
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
let timeout = null;
const GameOverModal = ({ isVisible, onClick, score }) => {
    const [toastVisible, setToastVisible] = useState(false);
    if (!isVisible)
        return null;
    const share = () => {
        if (navigator.share) {
            navigator.share({
                title: '수박 만들기 게임',
                text: '과일들을 모아 수박을 만들어보세요.',
                url: 'https://koreacat.github.io/suika-game/',
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
    return (_jsxs("div", Object.assign({ className: cx('gameOverArea') }, { children: [_jsx("span", Object.assign({ className: cx('text') }, { children: "GAME OVER" })), _jsxs("span", Object.assign({ className: cx('score') }, { children: ["SCORE: ", score] })), _jsx("button", Object.assign({ className: cx('btn'), onClick: onClick }, { children: "\u21BB TRY AGAIN?" })), _jsxs("div", Object.assign({ className: cx('linkArea') }, { children: [_jsx("a", Object.assign({ href: 'https://forms.gle/QbPDG6rzT4spywyf6', target: '_blank', className: cx('formsLink') }, { children: "\uC758\uACAC \uB0A8\uAE30\uAE30" })), _jsx("button", Object.assign({ className: cx('shareaBtn'), onClick: share }, { children: "\uACF5\uC720\uD558\uAE30" }))] })), _jsx("div", Object.assign({ className: cx('toastArea', { show: toastVisible }) }, { children: "\uD83C\uDF49URL\uC774 \uBCF5\uC0AC\uB418\uC5C8\uC2B5\uB2C8\uB2E4." }))] })));
};
export default GameOverModal;
