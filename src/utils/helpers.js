export function rgbToHex(rgb) {
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

export function parseRgb(str) {
  const match = str.match(
    /rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/
  );
  return match
    ? [Number(match[1]), Number(match[2]), Number(match[3])]
    : [];
}
