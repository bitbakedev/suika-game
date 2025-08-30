import confetti from 'canvas-confetti';
import { useCallback } from 'react';
const useConfetti = () => {
    const fireConfetti = useCallback(() => {
        const count = 100;
        const defaults = {
            origin: { y: 0.7 },
        };
        function fire(particleRatio, opts) {
            confetti(Object.assign(Object.assign(Object.assign({}, defaults), opts), { particleCount: Math.floor(count * particleRatio) }));
        }
        fire(0.4, {
            spread: 90,
            startVelocity: 45,
            decay: 0.9,
            scalar: 0.9,
        });
        fire(0.3, {
            spread: 90,
            startVelocity: 35,
            decay: 0.85,
            scalar: 1.1,
        });
    }, []);
    const fireRapidStarConfetti = useCallback(() => {
        const end = Date.now() + (5 * 1000);
        const colors = ['#bb0000', '#ffffff'];
        (function frame() {
            confetti({
                particleCount: 2,
                angle: 80,
                spread: 55,
                origin: { x: 0, y: 0.8 },
                colors: colors
            });
            confetti({
                particleCount: 2,
                angle: 100,
                spread: 55,
                origin: { x: 1, y: 0.8 },
                colors: colors
            });
            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }, []);
    return {
        fireConfetti,
        fireRapidStarConfetti
    };
};
export default useConfetti;
