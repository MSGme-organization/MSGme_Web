export const formatDate = (date: Date | string | number) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getHrsDiff = (lastTime: Date | string | number) => {
  const now = new Date();
  const lastChat = new Date(lastTime);
  const msDiff = now.getTime() - lastChat.getTime();
  const hrs = Math.floor(msDiff / (1000 * 60 * 60));
  return hrs;
};

export const getDayDiff = (
  lastDate: Date | string | number,
  firstDate: Date | string | number = new Date()
) => {
  const first = new Date(firstDate);
  const last = new Date(lastDate);
  const firstDateOnly = new Date(
    first.getFullYear(),
    first.getMonth(),
    first.getDate()
  );
  const lastDateOnly = new Date(
    last.getFullYear(),
    last.getMonth(),
    last.getDate()
  );

  const msDiff = firstDateOnly.getTime() - lastDateOnly.getTime();
  const days = msDiff / (1000 * 60 * 60 * 24); 

  return days;
};

export const getFormatTime = (dateString: Date | string | number) => {
  const date = new Date(dateString);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
};

export const getDayLabel = (dateString: Date | string | number) => {
  const dayDiff = getDayDiff(dateString);
  if (dayDiff === 0) {
    return "Today";
  } else if (dayDiff === 1) {
    return "Yesterday";
  } else {
    const d = new Date(dateString);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${day}/${month}/${year}`;
  }
};
