interface ItemUsageModalProps {
    isVisible: boolean;
    onClose: () => void;
    onUse: () => void;
    itemType: 'remove' | 'shake';
    remainingCount: number;
}
declare const ItemUsageModal: ({ isVisible, onClose, onUse, itemType, remainingCount }: ItemUsageModalProps) => import("react/jsx-runtime").JSX.Element | null;
export default ItemUsageModal;
