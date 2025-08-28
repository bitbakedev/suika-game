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
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import classNames from "classnames/bind";
import useMatterJS from "./useMatterJS";
import { getRandomFruitFeature } from './object/Fruit';
import GameOverModal from './gameOverModal';
import Header from './header';
import Advertisement from './advertisement';
import Ranking from './ranking';
import BackButton from './backButton';
var cx = classNames.bind(styles);
var SuikaGame = function () {
    var _a;
    var _b = useState(0), bestScore = _b[0], setBestScore = _b[1];
    var _c = useState(0), score = _c[0], setScore = _c[1];
    var _d = useState((_a = getRandomFruitFeature()) === null || _a === void 0 ? void 0 : _a.label), nextItem = _d[0], setNextItem = _d[1];
    var _e = useState(true), isStart = _e[0], setIsStart = _e[1];
    var _f = useState(false), isGameOver = _f[0], setIsGameOver = _f[1];
    var _g = useState(false), showRanking = _g[0], setShowRanking = _g[1];
    var _h = useState(false), showRankingFromBack = _h[0], setShowRankingFromBack = _h[1];
    var _j = useState(false), canContinue = _j[0], setCanContinue = _j[1];
    var _k = useMatterJS({ score: score, setScore: setScore, nextItem: nextItem, setNextItem: setNextItem, isGameOver: isGameOver, setIsGameOver: setIsGameOver, canContinue: canContinue }), clear = _k.clear, removeOverflowFruits = _k.removeOverflowFruits;
    useEffect(function () {
        var bestScore = localStorage.getItem('bestScore');
        if (bestScore)
            setBestScore(Number(bestScore));
    }, [isGameOver]);
    useEffect(function () {
        if (isGameOver) {
            var bestScore_1 = localStorage.getItem('bestScore') || 0;
            if (score > Number(bestScore_1)) {
                localStorage.setItem('bestScore', score.toString());
            }
        }
    }, [isGameOver]);
    var handleTryAgain = function () {
        var _a;
        setScore(0);
        setNextItem((_a = getRandomFruitFeature()) === null || _a === void 0 ? void 0 : _a.label);
        setIsGameOver(false);
        setShowRanking(false);
        setCanContinue(false);
        clear();
    };
    var handleContinueWithAd = function () {
        setIsGameOver(false);
        setCanContinue(true);
        removeOverflowFruits();
    };
    var handleShowRanking = function () {
        setShowRanking(true);
    };
    var handleCloseRanking = function () {
        setShowRanking(false);
        setShowRankingFromBack(false);
    };
    var handleBackButtonClick = function () {
        setShowRankingFromBack(true);
    };
    return (_jsxs("div", __assign({ className: cx('gameArea') }, { children: [_jsxs("div", __assign({ className: cx('gameWrap') }, { children: [_jsxs("div", __assign({ className: cx('canvasArea') }, { children: [_jsx(BackButton, { onClick: handleBackButtonClick }), _jsx("button", __assign({ className: cx('closeButton'), onClick: function () { return window.close(); } }, { children: "\u2715" })), _jsx(Header, { bestScore: bestScore, score: score, nextItem: nextItem }), _jsx("div", { id: 'canvasWrap', className: cx('canvasWrap') })] })), _jsx(Advertisement, {})] })), _jsx(GameOverModal, { isVisible: isGameOver && !showRanking, onClick: handleTryAgain, score: score, onShowRanking: handleShowRanking, onContinueWithAd: handleContinueWithAd }), _jsx(Ranking, { isVisible: showRanking || showRankingFromBack, onClose: handleCloseRanking, currentScore: score })] })));
};
export default SuikaGame;
