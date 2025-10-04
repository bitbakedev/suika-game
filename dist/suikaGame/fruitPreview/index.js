import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fruit } from '../object/Fruit';
import styles from './index.module.scss';
import classNames from "classnames/bind";
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);
const FruitPreview = ({ onRestart, lastMergedFruit }) => {
    const fruits = Object.values(Fruit);
    const [animatingFruit, setAnimatingFruit] = useState(null);
    useEffect(() => {
        if (lastMergedFruit) {
            setAnimatingFruit(lastMergedFruit);
            const timer = setTimeout(() => {
                setAnimatingFruit(null);
            }, 600); // 애니메이션 지속 시간
            return () => clearTimeout(timer);
        }
    }, [lastMergedFruit]);
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
    return (_jsx("div", Object.assign({ className: cx('previewArea') }, { children: _jsxs("div", Object.assign({ className: cx('previewWrap') }, { children: [_jsx("button", Object.assign({ className: cx('restartButton'), onClick: onRestart }, { children: "\u21BB" })), _jsx("div", Object.assign({ className: cx('fruitContainer') }, { children: fruits.map((fruit, index) => (_jsx("div", { className: cx('fruitItem', {
                            animating: animatingFruit === fruit
                        }), style: {
                            backgroundImage: `url(${getImageUrl(fruit)})`
                        } }, fruit))) }))] })) })));
};
export default FruitPreview;
