export const getRenderHeight = () => {
    const maxHeight = window.innerHeight - 180; // 상단 80px + 하단 100px
    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth - 40; // 좌우 여백 20px씩
    const maxWidth = screenHeight * 4 / 7 - 8;
  
    if (maxWidth > screenWidth) {
      return maxHeight;
    }
  
    return maxHeight;
  };
  
  export const getRenderWidth = () => {
    return Math.min(window.innerWidth - 40, 500); // 최대 500px, 최소 화면 너비 - 40px
  };