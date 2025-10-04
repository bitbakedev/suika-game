var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fruit } from '../object/Fruit';
import styles from './index.module.scss';
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const Intro = ({ isVisible, handleGameStart }) => {
    const positionCircularly = (totalElements, index) => {
        const radius = 150; // 조절 가능한 원의 반지름
        const angle = (2 * Math.PI * index) / totalElements;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        return {
            top: `calc(50% + ${y}px - 24px)`,
            left: `calc(50% + ${x}px - 24px)`,
        };
    };
    const fruitItemEls = Object.keys(Fruit).slice(0, Object.keys(Fruit).length - 1).map((fruit, index) => {
        const itemPositions = positionCircularly(11, index);
        const getImageUrl = (fruitName) => {
            if (fruitName === 'BLUEBERRY') {
                return require('../../../resource/BREAD1.png');
            }
            if (fruitName === 'STRAWBERRY') {
                return require('../../../resource/BREAD2.png');
            }
            if (fruitName === 'TANGERINE') {
                return require('../../../resource/BREAD3.png');
            }
            if (fruitName === 'TOMATO') {
                return require('../../../resource/BREAD4.png');
            }
            if (fruitName === 'AVOCADO') {
                return require('../../../resource/BREAD5.png');
            }
            if (fruitName === 'KOREANMELON') {
                return require('../../../resource/BREAD6.png');
            }
            if (fruitName === 'APPLE') {
                return require('../../../resource/BREAD7.png');
            }
            if (fruitName === 'PEACH') {
                return require('../../../resource/BREAD8.png');
            }
            if (fruitName === 'COCONUT') {
                return require('../../../resource/BREAD9.png');
            }
            if (fruitName === 'MELON') {
                return require('../../../resource/BREAD10.png');
            }
            if (fruitName === 'WATERMELON') {
                return require('../../../resource/BREAD11.png');
            }
            return require('../../../resource/' + fruitName + '.png');
        };
        return (_jsx("li", { className: cx('listItem'), style: {
                backgroundImage: `url(${getImageUrl(fruit)})`,
                top: itemPositions.top,
                left: itemPositions.left
            } }, fruit));
    });
    const onClick = () => __awaiter(void 0, void 0, void 0, function* () {
        handleGameStart();
    });
    if (!isVisible)
        return null;
    return (_jsxs("div", Object.assign({ className: cx('introArea') }, { children: [_jsx("ul", Object.assign({ className: cx('listWrap') }, { children: fruitItemEls })), _jsx("div", Object.assign({ className: cx('titleArea') }, { children: _jsx("button", Object.assign({ className: cx('btn'), onClick: onClick }, { children: "GAME START" })) })), _jsx("a", Object.assign({ href: 'https://github.com/koreacat/suika-game#readme', target: '_blank', rel: "noopener noreferrer", className: cx('patchLink') }, { children: "\uD328\uCE58\uB178\uD2B8" })), _jsx("span", Object.assign({ className: cx('version') }, { children: "v1.0.4" }))] })));
};
export default Intro;
