import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getRenderWidth } from '../object/Size';
import styles from './index.module.scss';
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const Header = ({ score, bestScore, nextItem }) => {
    const getBestScore = () => {
        return score > bestScore ? score : bestScore;
    };
    return (_jsxs("div", Object.assign({ className: cx('headerArea'), style: { maxWidth: getRenderWidth() + 4 } }, { children: [_jsxs("div", Object.assign({ className: cx('bestScoreArea') }, { children: [_jsx("span", Object.assign({ className: cx('text') }, { children: "BEST" })), _jsx("span", Object.assign({ className: cx('number') }, { children: getBestScore() }))] })), _jsx("div", Object.assign({ className: cx('scoreArea') }, { children: _jsx("span", Object.assign({ className: cx('score') }, { children: score })) })), _jsxs("div", Object.assign({ className: cx('nextArea') }, { children: [_jsx("span", Object.assign({ className: cx('text') }, { children: "NEXT" })), _jsx("div", Object.assign({ className: cx('next') }, { children: _jsx("span", { className: cx('img'), style: { backgroundImage: `url(${require('../../../resource/' + nextItem + '.png')})` } }) }))] }))] })));
};
export default Header;
