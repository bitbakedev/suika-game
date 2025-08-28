interface GameOverModalProps {
    isVisible: boolean;
    onClick: () => void;
    score: number;
    onShowRanking: () => void;
    onContinueWithAd: () => void;
}
declare const GameOverModal: ({ isVisible, onClick, score, onShowRanking, onContinueWithAd }: GameOverModalProps) => import("react/jsx-runtime").JSX.Element | null;
export default GameOverModal;
