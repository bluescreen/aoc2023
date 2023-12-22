export function numberToColorHex(number) {
  const colors = [
    "#ff0000", // Red
    "#ff9900", // Orange
    "#ffff00", // Yellow
    "#33cc33", // Green
    "#3399ff", // Blue
    "#9966ff", // Purple
    "#ff66cc", // Pink
    "#ff6666", // Light Red
    "#999966", // Olive
    "#66cccc", // Light Blue
  ];
  const index = (number - 1) % colors.length;
  return colors[index >= 0 ? index : index + colors.length];
}
