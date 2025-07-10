export const formatDuration = (time: string): string => {
  // Remove 'PT' prefix
  time = time.replace("PT", "");

  let hours = "";
  let minutes = "";
  let seconds = "";

  // Match numbers followed by H, M, or S
  const hourMatch = time.match(/(\d+)H/);
  const minuteMatch = time.match(/(\d+)M/);
  const secondMatch = time.match(/(\d+)S/);

  if (hourMatch) {
    hours = `${hourMatch[1]}H`;
  }

  if (minuteMatch) {
    minutes = `${minuteMatch[1]}M`;
  }

  if (secondMatch) {
    seconds = `${secondMatch[1]}S`;
  }

  return [hours, minutes, seconds].filter(Boolean).join(" ");
};
