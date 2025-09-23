interface ItemExhaustedModalProps {
    isVisible: boolean;
    onClose: () => void;
    itemType: 'remove' | 'shake';
}
declare const ItemExhaustedModal: ({ isVisible, onClose, itemType }: ItemExhaustedModalProps) => import("react/jsx-runtime").JSX.Element | null;
export default ItemExhaustedModal;
