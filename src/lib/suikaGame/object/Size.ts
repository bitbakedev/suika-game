export const getRenderHeight = () => {
  const maxHeight = window.innerHeight - 180; // 상단 80px + 하단 70px + 여유공간 30px
  const screenHeight = window.innerHeight;
  const screenWidth = window.innerWidth - 40; // 좌우 여백 20px씩
  
  // 화면 비율에 맞춰 높이 조정
  const aspectRatio = 4 / 7;
  const maxWidthBasedHeight = screenWidth / aspectRatio;
  
  return Math.min(maxHeight, maxWidthBasedHeight);
};

export const getRenderWidth = () => {
  const height = getRenderHeight();
  const aspectRatio = 4 / 7;
  return Math.min(window.innerWidth - 40, height * aspectRatio);
};