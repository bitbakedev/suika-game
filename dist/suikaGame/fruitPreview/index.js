import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fruit } from '../object/Fruit';
import styles from './index.module.scss';
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const FruitPreview = ({ onRestart }) => {
    const fruits = Object.values(Fruit);
    return (_jsx("div", Object.assign({ className: cx('previewArea') }, { children: _jsxs("div", Object.assign({ className: cx('previewWrap') }, { children: [_jsx("button", Object.assign({ className: cx('restartButton'), onClick: onRestart }, { children: "\u21BB" })), _jsx("div", Object.assign({ className: cx('fruitContainer') }, { children: fruits.map((fruit, index) => (_jsx("div", { className: cx('fruitItem'), style: {
                            backgroundImage: `url(${require('../../../resource/' + fruit + '.png')})`
                        } }, fruit))) }))] })) })));
};
export default FruitPreview;
