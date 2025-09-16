import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import classNames from "classnames/bind";
import useMatterJS from "./useMatterJS";
import { Fruit, getRandomFruitFeature } from './object/Fruit';
import GameOverModal from './gameOverModal';
import FruitPreview from './fruitPreview';
const cx = classNames.bind(styles);
const SuikaGame = () => {
    var _a;
    const [bestScore, setBestScore] = useState(0);
    const [score, setScore] = useState(0);
    const [nextItem, setNextItem] = useState((_a = getRandomFruitFeature()) === null || _a === void 0 ? void 0 : _a.label);
    const [isGameOver, setIsGameOver] = useState(false);
    const [itemCount, setItemCount] = useState(3);
    const [shakeItemCount, setShakeItemCount] = useState(2);
    const [isItemActive, setIsItemActive] = useState(false);
    const [isShakeActive, setIsShakeActive] = useState(false);
    const [isCanvasShaking, setIsCanvasShaking] = useState(false);
    const getImageUrl = (fruit) => {
        if (fruit === Fruit.BLUEBERRY) {
            return require('../../resource/BREAD1.png');
        }
        if (fruit === Fruit.STRAWBERRY) {
            return require('../../resource/BREAD2.png');
        }
        return require('../../resource/' + fruit + '.png');
    };
    const { clear, removeSmallFruits, shakeCanvas } = useMatterJS({
        score,
        setScore,
        nextItem,
        setNextItem,
        isGameOver,
        setIsGameOver
    });
    useEffect(() => {
        const bestScore = localStorage.getItem('bestScore');
        if (bestScore)
            setBestScore(Number(bestScore));
    }, [isGameOver]);
    useEffect(() => {
        if (isGameOver) {
            const bestScore = localStorage.getItem('bestScore') || 0;
            if (score > Number(bestScore)) {
                localStorage.setItem('bestScore', score.toString());
            }
        }
    }, [isGameOver, score]);
    const handleTryAgain = () => {
        var _a;
        setScore(0);
        setNextItem((_a = getRandomFruitFeature()) === null || _a === void 0 ? void 0 : _a.label);
        setIsGameOver(false);
        setItemCount(3);
        setShakeItemCount(2);
        setIsItemActive(false);
        setIsShakeActive(false);
        setIsCanvasShaking(false);
        clear();
    };
    const handleClose = () => {
        window.close();
    };
    const handleItemUse = () => {
        if (itemCount > 0 && !isGameOver) {
            setItemCount(prev => prev - 1);
            setIsItemActive(true);
            removeSmallFruits();
            // 이펙트 애니메이션
            setTimeout(() => {
                setIsItemActive(false);
            }, 600);
        }
    };
    const handleShakeUse = () => {
        if (shakeItemCount > 0 && !isGameOver) {
            setShakeItemCount(prev => prev - 1);
            setIsShakeActive(true);
            setIsCanvasShaking(true);
            shakeCanvas();
            // 이펙트 애니메이션
            setTimeout(() => {
                setIsShakeActive(false);
                setIsCanvasShaking(false);
            }, 1000);
        }
    };
    return (_jsxs("div", Object.assign({ className: cx('gameArea') }, { children: [_jsxs("div", Object.assign({ className: cx('topArea') }, { children: [_jsxs("div", Object.assign({ className: cx('leftSection') }, { children: [_jsx("div", Object.assign({ className: cx('bestScoreCircle', { active: isItemActive }), onClick: handleItemUse, title: `아이템 사용 (${itemCount}개 남음)` }, { children: _jsx("div", Object.assign({ className: cx('itemIcon') }, { children: _jsxs("svg", Object.assign({ width: "20", height: "20", viewBox: "0 0 24 24", fill: "none" }, { children: [_jsx("circle", { cx: "7", cy: "7", r: "4", fill: "#4F46E5" }), _jsx("circle", { cx: "17", cy: "7", r: "4", fill: "#EF4444" }), _jsx("path", { d: "M4 16l16 0", stroke: "#D2691E", strokeWidth: "4", strokeLinecap: "round" }), _jsx("path", { d: "M6 18l12 0", stroke: "#D2691E", strokeWidth: "2", strokeLinecap: "round" })] })) })) })), _jsx("div", Object.assign({ className: cx('bestScoreCircle', { active: isShakeActive }), onClick: handleShakeUse, title: `흔들기 아이템 (${shakeItemCount}개 남음)` }, { children: _jsx("div", Object.assign({ className: cx('shakeIcon') }, { children: _jsx("img", { src: require('../../resource/shake_icon.png'), alt: "\uD754\uB4E4\uAE302", width: "24", height: "24" }) })) }))] })), _jsxs("div", Object.assign({ className: cx('centerSection') }, { children: [_jsx("div", Object.assign({ className: cx('mainScore') }, { children: score })), _jsxs("div", Object.assign({ className: cx('bestScoreRow') }, { children: [_jsx("div", Object.assign({ className: cx('crownIcon') }, { children: _jsxs("svg", Object.assign({ width: "18", height: "18", viewBox: "0 0 24 24", fill: "none" }, { children: [_jsx("path", { d: "M5 20h14v-2H5v2z", fill: "#FFC107", stroke: "#D2691E", strokeWidth: "0.5" }), _jsx("path", { d: "M5 18l2-8 3 4 2-6 2 6 3-4 2 8H5z", fill: "#FFC107", stroke: "#D2691E", strokeWidth: "0.5" })] })) })), _jsx("div", Object.assign({ className: cx('bestScoreText') }, { children: score > bestScore ? score : bestScore }))] }))] })), _jsxs("div", Object.assign({ className: cx('rightSection') }, { children: [_jsx("div", { className: cx('nextFruit'), style: { backgroundImage: `url(${getImageUrl(nextItem)})` } }), _jsx("div", Object.assign({ className: cx('nextText') }, { children: "NEXT" }))] }))] })), _jsx("button", Object.assign({ className: cx('closeButton'), onClick: handleClose }, { children: "\u00D7" })), _jsx("button", Object.assign({ className: cx('closeButton'), onClick: handleClose }, { children: "\u00D7" })), _jsx("div", Object.assign({ className: cx('gameWrap') }, { children: _jsx("div", Object.assign({ className: cx('canvasArea') }, { children: _jsx("div", { id: 'canvasWrap', className: cx('canvasWrap', { shaking: isCanvasShaking }) }) })) })), _jsx(FruitPreview, { onRestart: handleTryAgain }), _jsx(GameOverModal, { isVisible: isGameOver, onClick: handleTryAgain, score: score })] })));
};
export default SuikaGame;
