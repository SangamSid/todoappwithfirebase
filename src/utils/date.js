export const date = () => {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${day}/${month}/${year} ${hours}:${formattedMinutes}`;
};
