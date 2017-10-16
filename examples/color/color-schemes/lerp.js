// Find hue between 120 and 240 {!1}
var h = lerp(120, 240, 0.5);
// Find saturation between 95 and 40 {!1}
var s = lerp(96, 40, 0.5);
// Find lightness between 31 and 74 {!1}
var l = lerp(31, 74, 0.5);
var midwayColor = colorHsluv(h, s, l);
