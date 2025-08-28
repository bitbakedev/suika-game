export var getRenderHeight = function () {
    var maxHeight = Math.min(window.innerHeight - 120, 650);
    var screenHeight = window.innerHeight;
    var screenWidth = window.innerWidth - 8;
    var maxWidth = screenHeight * 4 / 7 - 8;
    if (maxWidth > screenWidth) {
        return Math.min(maxHeight, (screenWidth - 16) * 7 / 4);
    }
    return Math.min(maxHeight, screenHeight);
};
export var getRenderWidth = function () {
    return getRenderHeight() * 4 / 7;
};
