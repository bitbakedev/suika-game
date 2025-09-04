import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fruit } from '../object/Fruit';
import styles from './index.module.scss';
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const FruitPreview = ({ onRestart }) => {
    const fruits = Object.values(Fruit);
    const getImageUrl = (fruit) => {
        if (fruit === Fruit.BLUEBERRY) {
            return require('../../../resource/BREAD1.png');
        }
        if (fruit === Fruit.STRAWBERRY) {
            return require('../../../resource/BREAD2.png');
        }
        return require('../../../resource/' + fruit + '.png');
    };
    return (_jsx("div", Object.assign({ className: cx('previewArea') }, { children: _jsxs("div", Object.assign({ className: cx('previewWrap') }, { children: [_jsx("button", Object.assign({ className: cx('restartButton'), onClick: onRestart }, { children: "\u21BB" })), _jsx("div", Object.assign({ className: cx('fruitContainer') }, { children: fruits.map((fruit, index) => (_jsx("div", { className: cx('fruitItem'), style: {
                            backgroundImage: `url(${getImageUrl(fruit)})`
                        } }, fruit))) }))] })) })));
};
export default FruitPreview;
