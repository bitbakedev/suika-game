export const getRenderHeight = () => {
    const maxHeight = window.innerHeight - 160; // 상단 80px + 하단 80px
    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth - 20;
    const maxWidth = screenHeight * 4 / 7 - 8;
  
    if (maxWidth > screenWidth) {
      return maxHeight;
    }
  
    return maxHeight;
  };
  
  export const getRenderWidth = () => {
    return Math.min(window.innerWidth - 20, getRenderHeight() * 4 / 7);
  };