// Find hue between 120 and 240 {!1}
const h = lerp(120, 240, 0.5);
// Find saturation between 95 and 40 {!1}
const s = lerp(96, 40, 0.5);
// Find lightness between 31 and 74 {!1}
const l = lerp(31, 74, 0.5);
const midwayColor = colorHsluv(h, s, l);
