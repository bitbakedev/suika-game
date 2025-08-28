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
var cx = classNames.bind(styles);
var Ranking = function (_a) {
    var _b;
    var isVisible = _a.isVisible, onClose = _a.onClose, currentScore = _a.currentScore;
    var _c = useState([]), rankings = _c[0], setRankings = _c[1];
    var _d = useState(''), playerName = _d[0], setPlayerName = _d[1];
    var _e = useState(false), isSubmitted = _e[0], setIsSubmitted = _e[1];
    useEffect(function () {
        if (isVisible) {
            loadRankings();
            setIsSubmitted(false);
            setPlayerName('');
        }
    }, [isVisible]);
    var loadRankings = function () {
        var savedRankings = localStorage.getItem('suika-rankings');
        if (savedRankings) {
            var parsed = JSON.parse(savedRankings);
            setRankings(parsed);
        }
    };
    var saveScore = function () {
        if (!playerName.trim()) {
            alert('이름을 입력해주세요!');
            return;
        }
        var newEntry = {
            score: currentScore,
            date: new Date().toLocaleDateString('ko-KR'),
            rank: 0
        };
        var savedRankings = localStorage.getItem('suika-rankings');
        var currentRankings = savedRankings ? JSON.parse(savedRankings) : [];
        currentRankings.push(newEntry);
        currentRankings.sort(function (a, b) { return b.score - a.score; });
        currentRankings = currentRankings.slice(0, 10); // 상위 10개만 저장
        // 순위 재계산
        currentRankings.forEach(function (entry, index) {
            entry.rank = index + 1;
        });
        localStorage.setItem('suika-rankings', JSON.stringify(currentRankings));
        setRankings(currentRankings);
        setIsSubmitted(true);
    };
    var clearRankings = function () {
        if (confirm('모든 랭킹 기록을 삭제하시겠습니까?')) {
            localStorage.removeItem('suika-rankings');
            setRankings([]);
        }
    };
    if (!isVisible)
        return null;
    var isNewRecord = rankings.length === 0 || currentScore > (((_b = rankings[0]) === null || _b === void 0 ? void 0 : _b.score) || 0);
    var currentRank = rankings.findIndex(function (entry) { return currentScore > entry.score; }) + 1;
    var displayRank = currentRank === 0 ? rankings.length + 1 : currentRank;
    return (_jsx("div", __assign({ className: cx('rankingArea') }, { children: _jsxs("div", __assign({ className: cx('rankingModal') }, { children: [_jsxs("div", __assign({ className: cx('header') }, { children: [_jsx("h2", __assign({ className: cx('title') }, { children: "\uD83C\uDFC6 \uC810\uC218 \uB7AD\uD0B9" })), _jsx("button", __assign({ className: cx('backBtn'), onClick: onClose }, { children: "\u2190 \uB4A4\uB85C\uAC00\uAE30" })), _jsx("button", __assign({ className: cx('closeBtn'), onClick: onClose }, { children: "\u2715" }))] })), _jsxs("div", __assign({ className: cx('currentScore') }, { children: [_jsxs("div", __assign({ className: cx('scoreInfo') }, { children: [_jsx("span", __assign({ className: cx('label') }, { children: "\uD604\uC7AC \uC810\uC218" })), _jsx("span", __assign({ className: cx('score') }, { children: currentScore }))] })), isNewRecord && _jsx("div", __assign({ className: cx('newRecord') }, { children: "\uD83C\uDF89 \uC2E0\uAE30\uB85D!" })), _jsxs("div", __assign({ className: cx('rankInfo') }, { children: ["\uC608\uC0C1 \uC21C\uC704: ", _jsxs("span", __assign({ className: cx('rank') }, { children: [displayRank, "\uC704"] }))] }))] })), !isSubmitted ? (_jsxs("div", __assign({ className: cx('submitArea') }, { children: [_jsx("input", { type: "text", placeholder: "\uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694", value: playerName, onChange: function (e) { return setPlayerName(e.target.value); }, className: cx('nameInput'), maxLength: 10 }), _jsx("button", __assign({ className: cx('submitBtn'), onClick: saveScore }, { children: "\uC810\uC218 \uB4F1\uB85D" }))] }))) : (_jsx("div", __assign({ className: cx('submittedMessage') }, { children: "\u2705 \uC810\uC218\uAC00 \uB4F1\uB85D\uB418\uC5C8\uC2B5\uB2C8\uB2E4!" }))), _jsxs("div", __assign({ className: cx('rankingList') }, { children: [_jsxs("div", __assign({ className: cx('listHeader') }, { children: [_jsx("span", { children: "\uC21C\uC704" }), _jsx("span", { children: "\uC774\uB984" }), _jsx("span", { children: "\uC810\uC218" }), _jsx("span", { children: "\uB0A0\uC9DC" })] })), rankings.length === 0 ? (_jsx("div", __assign({ className: cx('emptyMessage') }, { children: "\uC544\uC9C1 \uB4F1\uB85D\uB41C \uAE30\uB85D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." }))) : (rankings.map(function (entry, index) { return (_jsxs("div", __assign({ className: cx('rankingItem', {
                                highlight: entry.score === currentScore && isSubmitted
                            }) }, { children: [_jsx("span", __assign({ className: cx('rankNumber') }, { children: entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : "".concat(entry.rank, "\uC704") })), _jsx("span", __assign({ className: cx('playerName') }, { children: "\uC775\uBA85" })), _jsx("span", __assign({ className: cx('playerScore') }, { children: entry.score })), _jsx("span", __assign({ className: cx('playDate') }, { children: entry.date }))] }), index)); }))] })), _jsx("div", __assign({ className: cx('actions') }, { children: _jsx("button", __assign({ className: cx('clearBtn'), onClick: clearRankings }, { children: "\uAE30\uB85D \uCD08\uAE30\uD654" })) }))] })) })));
};
export default Ranking;
