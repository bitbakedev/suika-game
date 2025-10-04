import { Fruit } from '../object/Fruit';
interface FruitPreviewProps {
    onRestart: () => void;
    lastMergedFruit?: Fruit | null;
}
declare const FruitPreview: ({ onRestart, lastMergedFruit }: FruitPreviewProps) => import("react/jsx-runtime").JSX.Element;
export default FruitPreview;
