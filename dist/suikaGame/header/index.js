import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fruit } from '../object/Fruit';
import { getRenderWidth } from '../object/Size';
import styles from './index.module.scss';
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const Header = ({ score, bestScore, nextItem }) => {
    const getBestScore = () => {
        return score > bestScore ? score : bestScore;
    };
    const getImageUrl = (fruit) => {
        if (fruit === Fruit.BLUEBERRY) {
            return require('../../../resource/BREAD1.png');
        }
        if (fruit === Fruit.STRAWBERRY) {
            return require('../../../resource/BREAD2.png');
        }
        if (fruit === Fruit.TANGERINE) {
            return require('../../../resource/BREAD3.png');
        }
        if (fruit === Fruit.TOMATO) {
            return require('../../../resource/BREAD4.png');
        }
        if (fruit === Fruit.AVOCADO) {
            return require('../../../resource/BREAD5.png');
        }
        if (fruit === Fruit.KOREANMELON) {
            return require('../../../resource/BREAD6.png');
        }
        if (fruit === Fruit.APPLE) {
            return require('../../../resource/BREAD7.png');
        }
        if (fruit === Fruit.PEACH) {
            return require('../../../resource/BREAD8.png');
        }
        if (fruit === Fruit.COCONUT) {
            return require('../../../resource/BREAD9.png');
        }
        if (fruit === Fruit.MELON) {
            return require('../../../resource/BREAD10.png');
        }
        if (fruit === Fruit.WATERMELON) {
            return require('../../../resource/BREAD11.png');
        }
        return require('../../../resource/' + fruit + '.png');
    };
    return (_jsxs("div", Object.assign({ className: cx('headerArea'), style: { maxWidth: getRenderWidth() + 4 } }, { children: [_jsxs("div", Object.assign({ className: cx('bestScoreArea') }, { children: [_jsx("span", Object.assign({ className: cx('text') }, { children: "BEST" })), _jsx("span", Object.assign({ className: cx('number') }, { children: getBestScore() }))] })), _jsx("div", Object.assign({ className: cx('scoreArea') }, { children: _jsx("span", Object.assign({ className: cx('score') }, { children: score })) })), _jsxs("div", Object.assign({ className: cx('nextArea') }, { children: [_jsx("span", Object.assign({ className: cx('text') }, { children: "NEXT" })), _jsx("div", Object.assign({ className: cx('next') }, { children: _jsx("span", { className: cx('img'), style: { backgroundImage: `url(${getImageUrl(nextItem)})` } }) }))] }))] })));
};
export default Header;
