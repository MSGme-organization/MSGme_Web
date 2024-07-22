export const formatDate = (date: any) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getHrsDiff = (lastTime: any) => {
  const now = new Date();
  const lastChat = new Date(lastTime);
  const msDiff = now.getTime() - lastChat.getTime();
  const hrs = Math.floor(msDiff / (1000 * 60 * 60));
  return hrs;
};

export const getDayDiff = (lastTime: any) => {
  const now = new Date();
  const lastChat = new Date(lastTime);
  const msDiff = now.getTime() - lastChat.getTime();
  const days = Math.floor(msDiff / (1000 * 60 * 60 * 24));
  return days;
};
