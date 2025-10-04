interface GameOverModalProps {
    isVisible: boolean;
    onClick: () => void;
    onContinue: () => void;
    hasUsedRevive: boolean;
    score: number;
}
declare const GameOverModal: ({ isVisible, onClick, onContinue, hasUsedRevive, score }: GameOverModalProps) => import("react/jsx-runtime").JSX.Element | null;
export default GameOverModal;
