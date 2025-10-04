import { SetStateAction } from "react";
import { Fruit } from "./object/Fruit";
interface UseMatterJSProps {
    score: number;
    setScore: React.Dispatch<SetStateAction<number>>;
    nextItem: Fruit;
    setNextItem: React.Dispatch<SetStateAction<Fruit>>;
    isGameOver: boolean;
    setIsGameOver: React.Dispatch<SetStateAction<boolean>>;
    setLastMergedFruit: React.Dispatch<SetStateAction<Fruit | null>>;
}
declare const useMatterJS: (props: UseMatterJSProps) => {
    clear: () => void;
    removeSmallFruits: () => void;
    shakeCanvas: () => void;
    removeGameOverLineFruits: () => void;
};
export default useMatterJS;
