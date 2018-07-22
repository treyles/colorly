export default function rgbToHex(rgb) {
  const colorValues = rgb
    .replace(/^rgb?\(|\s+|\)$/g, '')
    .split(',')
    .map(str => parseInt(str, 10));

  const hexResult = colorValues
    .map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? `0${hex}` : hex;
    })
    .join('');

  return `#${hexResult}`.toUpperCase();
}
