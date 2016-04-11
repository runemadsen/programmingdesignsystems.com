(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Rune = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){

},{}],2:[function(_dereq_,module,exports){
/* MIT license */

module.exports = {
  rgb2hsl: rgb2hsl,
  rgb2hsv: rgb2hsv,
  rgb2hwb: rgb2hwb,
  rgb2cmyk: rgb2cmyk,
  rgb2keyword: rgb2keyword,
  rgb2xyz: rgb2xyz,
  rgb2lab: rgb2lab,
  rgb2lch: rgb2lch,

  hsl2rgb: hsl2rgb,
  hsl2hsv: hsl2hsv,
  hsl2hwb: hsl2hwb,
  hsl2cmyk: hsl2cmyk,
  hsl2keyword: hsl2keyword,

  hsv2rgb: hsv2rgb,
  hsv2hsl: hsv2hsl,
  hsv2hwb: hsv2hwb,
  hsv2cmyk: hsv2cmyk,
  hsv2keyword: hsv2keyword,

  hwb2rgb: hwb2rgb,
  hwb2hsl: hwb2hsl,
  hwb2hsv: hwb2hsv,
  hwb2cmyk: hwb2cmyk,
  hwb2keyword: hwb2keyword,

  cmyk2rgb: cmyk2rgb,
  cmyk2hsl: cmyk2hsl,
  cmyk2hsv: cmyk2hsv,
  cmyk2hwb: cmyk2hwb,
  cmyk2keyword: cmyk2keyword,

  keyword2rgb: keyword2rgb,
  keyword2hsl: keyword2hsl,
  keyword2hsv: keyword2hsv,
  keyword2hwb: keyword2hwb,
  keyword2cmyk: keyword2cmyk,
  keyword2lab: keyword2lab,
  keyword2xyz: keyword2xyz,

  xyz2rgb: xyz2rgb,
  xyz2lab: xyz2lab,
  xyz2lch: xyz2lch,

  lab2xyz: lab2xyz,
  lab2rgb: lab2rgb,
  lab2lch: lab2lch,

  lch2lab: lch2lab,
  lch2xyz: lch2xyz,
  lch2rgb: lch2rgb
}


function rgb2hsl(rgb) {
  var r = rgb[0]/255,
      g = rgb[1]/255,
      b = rgb[2]/255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      delta = max - min,
      h, s, l;

  if (max == min)
    h = 0;
  else if (r == max)
    h = (g - b) / delta;
  else if (g == max)
    h = 2 + (b - r) / delta;
  else if (b == max)
    h = 4 + (r - g)/ delta;

  h = Math.min(h * 60, 360);

  if (h < 0)
    h += 360;

  l = (min + max) / 2;

  if (max == min)
    s = 0;
  else if (l <= 0.5)
    s = delta / (max + min);
  else
    s = delta / (2 - max - min);

  return [h, s * 100, l * 100];
}

function rgb2hsv(rgb) {
  var r = rgb[0],
      g = rgb[1],
      b = rgb[2],
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      delta = max - min,
      h, s, v;

  if (max == 0)
    s = 0;
  else
    s = (delta/max * 1000)/10;

  if (max == min)
    h = 0;
  else if (r == max)
    h = (g - b) / delta;
  else if (g == max)
    h = 2 + (b - r) / delta;
  else if (b == max)
    h = 4 + (r - g) / delta;

  h = Math.min(h * 60, 360);

  if (h < 0)
    h += 360;

  v = ((max / 255) * 1000) / 10;

  return [h, s, v];
}

function rgb2hwb(rgb) {
  var r = rgb[0],
      g = rgb[1],
      b = rgb[2],
      h = rgb2hsl(rgb)[0],
      w = 1/255 * Math.min(r, Math.min(g, b)),
      b = 1 - 1/255 * Math.max(r, Math.max(g, b));

  return [h, w * 100, b * 100];
}

function rgb2cmyk(rgb) {
  var r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255,
      c, m, y, k;

  k = Math.min(1 - r, 1 - g, 1 - b);
  c = (1 - r - k) / (1 - k) || 0;
  m = (1 - g - k) / (1 - k) || 0;
  y = (1 - b - k) / (1 - k) || 0;
  return [c * 100, m * 100, y * 100, k * 100];
}

function rgb2keyword(rgb) {
  return reverseKeywords[JSON.stringify(rgb)];
}

function rgb2xyz(rgb) {
  var r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255;

  // assume sRGB
  r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
  g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
  b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

  var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
  var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
  var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

  return [x * 100, y *100, z * 100];
}

function rgb2lab(rgb) {
  var xyz = rgb2xyz(rgb),
        x = xyz[0],
        y = xyz[1],
        z = xyz[2],
        l, a, b;

  x /= 95.047;
  y /= 100;
  z /= 108.883;

  x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);
  y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);
  z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);

  l = (116 * y) - 16;
  a = 500 * (x - y);
  b = 200 * (y - z);

  return [l, a, b];
}

function rgb2lch(args) {
  return lab2lch(rgb2lab(args));
}

function hsl2rgb(hsl) {
  var h = hsl[0] / 360,
      s = hsl[1] / 100,
      l = hsl[2] / 100,
      t1, t2, t3, rgb, val;

  if (s == 0) {
    val = l * 255;
    return [val, val, val];
  }

  if (l < 0.5)
    t2 = l * (1 + s);
  else
    t2 = l + s - l * s;
  t1 = 2 * l - t2;

  rgb = [0, 0, 0];
  for (var i = 0; i < 3; i++) {
    t3 = h + 1 / 3 * - (i - 1);
    t3 < 0 && t3++;
    t3 > 1 && t3--;

    if (6 * t3 < 1)
      val = t1 + (t2 - t1) * 6 * t3;
    else if (2 * t3 < 1)
      val = t2;
    else if (3 * t3 < 2)
      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
    else
      val = t1;

    rgb[i] = val * 255;
  }

  return rgb;
}

function hsl2hsv(hsl) {
  var h = hsl[0],
      s = hsl[1] / 100,
      l = hsl[2] / 100,
      sv, v;

  if(l === 0) {
      // no need to do calc on black
      // also avoids divide by 0 error
      return [0, 0, 0];
  }

  l *= 2;
  s *= (l <= 1) ? l : 2 - l;
  v = (l + s) / 2;
  sv = (2 * s) / (l + s);
  return [h, sv * 100, v * 100];
}

function hsl2hwb(args) {
  return rgb2hwb(hsl2rgb(args));
}

function hsl2cmyk(args) {
  return rgb2cmyk(hsl2rgb(args));
}

function hsl2keyword(args) {
  return rgb2keyword(hsl2rgb(args));
}


function hsv2rgb(hsv) {
  var h = hsv[0] / 60,
      s = hsv[1] / 100,
      v = hsv[2] / 100,
      hi = Math.floor(h) % 6;

  var f = h - Math.floor(h),
      p = 255 * v * (1 - s),
      q = 255 * v * (1 - (s * f)),
      t = 255 * v * (1 - (s * (1 - f))),
      v = 255 * v;

  switch(hi) {
    case 0:
      return [v, t, p];
    case 1:
      return [q, v, p];
    case 2:
      return [p, v, t];
    case 3:
      return [p, q, v];
    case 4:
      return [t, p, v];
    case 5:
      return [v, p, q];
  }
}

function hsv2hsl(hsv) {
  var h = hsv[0],
      s = hsv[1] / 100,
      v = hsv[2] / 100,
      sl, l;

  l = (2 - s) * v;
  sl = s * v;
  sl /= (l <= 1) ? l : 2 - l;
  sl = sl || 0;
  l /= 2;
  return [h, sl * 100, l * 100];
}

function hsv2hwb(args) {
  return rgb2hwb(hsv2rgb(args))
}

function hsv2cmyk(args) {
  return rgb2cmyk(hsv2rgb(args));
}

function hsv2keyword(args) {
  return rgb2keyword(hsv2rgb(args));
}

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
function hwb2rgb(hwb) {
  var h = hwb[0] / 360,
      wh = hwb[1] / 100,
      bl = hwb[2] / 100,
      ratio = wh + bl,
      i, v, f, n;

  // wh + bl cant be > 1
  if (ratio > 1) {
    wh /= ratio;
    bl /= ratio;
  }

  i = Math.floor(6 * h);
  v = 1 - bl;
  f = 6 * h - i;
  if ((i & 0x01) != 0) {
    f = 1 - f;
  }
  n = wh + f * (v - wh);  // linear interpolation

  switch (i) {
    default:
    case 6:
    case 0: r = v; g = n; b = wh; break;
    case 1: r = n; g = v; b = wh; break;
    case 2: r = wh; g = v; b = n; break;
    case 3: r = wh; g = n; b = v; break;
    case 4: r = n; g = wh; b = v; break;
    case 5: r = v; g = wh; b = n; break;
  }

  return [r * 255, g * 255, b * 255];
}

function hwb2hsl(args) {
  return rgb2hsl(hwb2rgb(args));
}

function hwb2hsv(args) {
  return rgb2hsv(hwb2rgb(args));
}

function hwb2cmyk(args) {
  return rgb2cmyk(hwb2rgb(args));
}

function hwb2keyword(args) {
  return rgb2keyword(hwb2rgb(args));
}

function cmyk2rgb(cmyk) {
  var c = cmyk[0] / 100,
      m = cmyk[1] / 100,
      y = cmyk[2] / 100,
      k = cmyk[3] / 100,
      r, g, b;

  r = 1 - Math.min(1, c * (1 - k) + k);
  g = 1 - Math.min(1, m * (1 - k) + k);
  b = 1 - Math.min(1, y * (1 - k) + k);
  return [r * 255, g * 255, b * 255];
}

function cmyk2hsl(args) {
  return rgb2hsl(cmyk2rgb(args));
}

function cmyk2hsv(args) {
  return rgb2hsv(cmyk2rgb(args));
}

function cmyk2hwb(args) {
  return rgb2hwb(cmyk2rgb(args));
}

function cmyk2keyword(args) {
  return rgb2keyword(cmyk2rgb(args));
}


function xyz2rgb(xyz) {
  var x = xyz[0] / 100,
      y = xyz[1] / 100,
      z = xyz[2] / 100,
      r, g, b;

  r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
  g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
  b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

  // assume sRGB
  r = r > 0.0031308 ? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
    : r = (r * 12.92);

  g = g > 0.0031308 ? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
    : g = (g * 12.92);

  b = b > 0.0031308 ? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
    : b = (b * 12.92);

  r = Math.min(Math.max(0, r), 1);
  g = Math.min(Math.max(0, g), 1);
  b = Math.min(Math.max(0, b), 1);

  return [r * 255, g * 255, b * 255];
}

function xyz2lab(xyz) {
  var x = xyz[0],
      y = xyz[1],
      z = xyz[2],
      l, a, b;

  x /= 95.047;
  y /= 100;
  z /= 108.883;

  x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);
  y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);
  z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);

  l = (116 * y) - 16;
  a = 500 * (x - y);
  b = 200 * (y - z);

  return [l, a, b];
}

function xyz2lch(args) {
  return lab2lch(xyz2lab(args));
}

function lab2xyz(lab) {
  var l = lab[0],
      a = lab[1],
      b = lab[2],
      x, y, z, y2;

  if (l <= 8) {
    y = (l * 100) / 903.3;
    y2 = (7.787 * (y / 100)) + (16 / 116);
  } else {
    y = 100 * Math.pow((l + 16) / 116, 3);
    y2 = Math.pow(y / 100, 1/3);
  }

  x = x / 95.047 <= 0.008856 ? x = (95.047 * ((a / 500) + y2 - (16 / 116))) / 7.787 : 95.047 * Math.pow((a / 500) + y2, 3);

  z = z / 108.883 <= 0.008859 ? z = (108.883 * (y2 - (b / 200) - (16 / 116))) / 7.787 : 108.883 * Math.pow(y2 - (b / 200), 3);

  return [x, y, z];
}

function lab2lch(lab) {
  var l = lab[0],
      a = lab[1],
      b = lab[2],
      hr, h, c;

  hr = Math.atan2(b, a);
  h = hr * 360 / 2 / Math.PI;
  if (h < 0) {
    h += 360;
  }
  c = Math.sqrt(a * a + b * b);
  return [l, c, h];
}

function lab2rgb(args) {
  return xyz2rgb(lab2xyz(args));
}

function lch2lab(lch) {
  var l = lch[0],
      c = lch[1],
      h = lch[2],
      a, b, hr;

  hr = h / 360 * 2 * Math.PI;
  a = c * Math.cos(hr);
  b = c * Math.sin(hr);
  return [l, a, b];
}

function lch2xyz(args) {
  return lab2xyz(lch2lab(args));
}

function lch2rgb(args) {
  return lab2rgb(lch2lab(args));
}

function keyword2rgb(keyword) {
  return cssKeywords[keyword];
}

function keyword2hsl(args) {
  return rgb2hsl(keyword2rgb(args));
}

function keyword2hsv(args) {
  return rgb2hsv(keyword2rgb(args));
}

function keyword2hwb(args) {
  return rgb2hwb(keyword2rgb(args));
}

function keyword2cmyk(args) {
  return rgb2cmyk(keyword2rgb(args));
}

function keyword2lab(args) {
  return rgb2lab(keyword2rgb(args));
}

function keyword2xyz(args) {
  return rgb2xyz(keyword2rgb(args));
}

var cssKeywords = {
  aliceblue:  [240,248,255],
  antiquewhite: [250,235,215],
  aqua: [0,255,255],
  aquamarine: [127,255,212],
  azure:  [240,255,255],
  beige:  [245,245,220],
  bisque: [255,228,196],
  black:  [0,0,0],
  blanchedalmond: [255,235,205],
  blue: [0,0,255],
  blueviolet: [138,43,226],
  brown:  [165,42,42],
  burlywood:  [222,184,135],
  cadetblue:  [95,158,160],
  chartreuse: [127,255,0],
  chocolate:  [210,105,30],
  coral:  [255,127,80],
  cornflowerblue: [100,149,237],
  cornsilk: [255,248,220],
  crimson:  [220,20,60],
  cyan: [0,255,255],
  darkblue: [0,0,139],
  darkcyan: [0,139,139],
  darkgoldenrod:  [184,134,11],
  darkgray: [169,169,169],
  darkgreen:  [0,100,0],
  darkgrey: [169,169,169],
  darkkhaki:  [189,183,107],
  darkmagenta:  [139,0,139],
  darkolivegreen: [85,107,47],
  darkorange: [255,140,0],
  darkorchid: [153,50,204],
  darkred:  [139,0,0],
  darksalmon: [233,150,122],
  darkseagreen: [143,188,143],
  darkslateblue:  [72,61,139],
  darkslategray:  [47,79,79],
  darkslategrey:  [47,79,79],
  darkturquoise:  [0,206,209],
  darkviolet: [148,0,211],
  deeppink: [255,20,147],
  deepskyblue:  [0,191,255],
  dimgray:  [105,105,105],
  dimgrey:  [105,105,105],
  dodgerblue: [30,144,255],
  firebrick:  [178,34,34],
  floralwhite:  [255,250,240],
  forestgreen:  [34,139,34],
  fuchsia:  [255,0,255],
  gainsboro:  [220,220,220],
  ghostwhite: [248,248,255],
  gold: [255,215,0],
  goldenrod:  [218,165,32],
  gray: [128,128,128],
  green:  [0,128,0],
  greenyellow:  [173,255,47],
  grey: [128,128,128],
  honeydew: [240,255,240],
  hotpink:  [255,105,180],
  indianred:  [205,92,92],
  indigo: [75,0,130],
  ivory:  [255,255,240],
  khaki:  [240,230,140],
  lavender: [230,230,250],
  lavenderblush:  [255,240,245],
  lawngreen:  [124,252,0],
  lemonchiffon: [255,250,205],
  lightblue:  [173,216,230],
  lightcoral: [240,128,128],
  lightcyan:  [224,255,255],
  lightgoldenrodyellow: [250,250,210],
  lightgray:  [211,211,211],
  lightgreen: [144,238,144],
  lightgrey:  [211,211,211],
  lightpink:  [255,182,193],
  lightsalmon:  [255,160,122],
  lightseagreen:  [32,178,170],
  lightskyblue: [135,206,250],
  lightslategray: [119,136,153],
  lightslategrey: [119,136,153],
  lightsteelblue: [176,196,222],
  lightyellow:  [255,255,224],
  lime: [0,255,0],
  limegreen:  [50,205,50],
  linen:  [250,240,230],
  magenta:  [255,0,255],
  maroon: [128,0,0],
  mediumaquamarine: [102,205,170],
  mediumblue: [0,0,205],
  mediumorchid: [186,85,211],
  mediumpurple: [147,112,219],
  mediumseagreen: [60,179,113],
  mediumslateblue:  [123,104,238],
  mediumspringgreen:  [0,250,154],
  mediumturquoise:  [72,209,204],
  mediumvioletred:  [199,21,133],
  midnightblue: [25,25,112],
  mintcream:  [245,255,250],
  mistyrose:  [255,228,225],
  moccasin: [255,228,181],
  navajowhite:  [255,222,173],
  navy: [0,0,128],
  oldlace:  [253,245,230],
  olive:  [128,128,0],
  olivedrab:  [107,142,35],
  orange: [255,165,0],
  orangered:  [255,69,0],
  orchid: [218,112,214],
  palegoldenrod:  [238,232,170],
  palegreen:  [152,251,152],
  paleturquoise:  [175,238,238],
  palevioletred:  [219,112,147],
  papayawhip: [255,239,213],
  peachpuff:  [255,218,185],
  peru: [205,133,63],
  pink: [255,192,203],
  plum: [221,160,221],
  powderblue: [176,224,230],
  purple: [128,0,128],
  rebeccapurple: [102, 51, 153],
  red:  [255,0,0],
  rosybrown:  [188,143,143],
  royalblue:  [65,105,225],
  saddlebrown:  [139,69,19],
  salmon: [250,128,114],
  sandybrown: [244,164,96],
  seagreen: [46,139,87],
  seashell: [255,245,238],
  sienna: [160,82,45],
  silver: [192,192,192],
  skyblue:  [135,206,235],
  slateblue:  [106,90,205],
  slategray:  [112,128,144],
  slategrey:  [112,128,144],
  snow: [255,250,250],
  springgreen:  [0,255,127],
  steelblue:  [70,130,180],
  tan:  [210,180,140],
  teal: [0,128,128],
  thistle:  [216,191,216],
  tomato: [255,99,71],
  turquoise:  [64,224,208],
  violet: [238,130,238],
  wheat:  [245,222,179],
  white:  [255,255,255],
  whitesmoke: [245,245,245],
  yellow: [255,255,0],
  yellowgreen:  [154,205,50]
};

var reverseKeywords = {};
for (var key in cssKeywords) {
  reverseKeywords[JSON.stringify(cssKeywords[key])] = key;
}

},{}],3:[function(_dereq_,module,exports){
var conversions = _dereq_("./conversions");

var convert = function() {
   return new Converter();
}

for (var func in conversions) {
  // export Raw versions
  convert[func + "Raw"] =  (function(func) {
    // accept array or plain args
    return function(arg) {
      if (typeof arg == "number")
        arg = Array.prototype.slice.call(arguments);
      return conversions[func](arg);
    }
  })(func);

  var pair = /(\w+)2(\w+)/.exec(func),
      from = pair[1],
      to = pair[2];

  // export rgb2hsl and ["rgb"]["hsl"]
  convert[from] = convert[from] || {};

  convert[from][to] = convert[func] = (function(func) {
    return function(arg) {
      if (typeof arg == "number")
        arg = Array.prototype.slice.call(arguments);

      var val = conversions[func](arg);
      if (typeof val == "string" || val === undefined)
        return val; // keyword

      for (var i = 0; i < val.length; i++)
        val[i] = Math.round(val[i]);
      return val;
    }
  })(func);
}


/* Converter does lazy conversion and caching */
var Converter = function() {
   this.convs = {};
};

/* Either get the values for a space or
  set the values for a space, depending on args */
Converter.prototype.routeSpace = function(space, args) {
   var values = args[0];
   if (values === undefined) {
      // color.rgb()
      return this.getValues(space);
   }
   // color.rgb(10, 10, 10)
   if (typeof values == "number") {
      values = Array.prototype.slice.call(args);
   }

   return this.setValues(space, values);
};

/* Set the values for a space, invalidating cache */
Converter.prototype.setValues = function(space, values) {
   this.space = space;
   this.convs = {};
   this.convs[space] = values;
   return this;
};

/* Get the values for a space. If there's already
  a conversion for the space, fetch it, otherwise
  compute it */
Converter.prototype.getValues = function(space) {
   var vals = this.convs[space];
   if (!vals) {
      var fspace = this.space,
          from = this.convs[fspace];
      vals = convert[fspace][space](from);

      this.convs[space] = vals;
   }
  return vals;
};

["rgb", "hsl", "hsv", "cmyk", "keyword"].forEach(function(space) {
   Converter.prototype[space] = function(vals) {
      return this.routeSpace(space, arguments);
   }
});

module.exports = convert;
},{"./conversions":2}],4:[function(_dereq_,module,exports){
var baseFlatten = _dereq_('../internal/baseFlatten'),
    isIterateeCall = _dereq_('../internal/isIterateeCall');

/**
 * Flattens a nested array. If `isDeep` is `true` the array is recursively
 * flattened, otherwise it's only flattened a single level.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to flatten.
 * @param {boolean} [isDeep] Specify a deep flatten.
 * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, 3, [4]]]);
 * // => [1, 2, 3, [4]]
 *
 * // using `isDeep`
 * _.flatten([1, [2, 3, [4]]], true);
 * // => [1, 2, 3, 4]
 */
function flatten(array, isDeep, guard) {
  var length = array ? array.length : 0;
  if (guard && isIterateeCall(array, isDeep, guard)) {
    isDeep = false;
  }
  return length ? baseFlatten(array, isDeep) : [];
}

module.exports = flatten;

},{"../internal/baseFlatten":23,"../internal/isIterateeCall":56}],5:[function(_dereq_,module,exports){
/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array ? array.length : 0;
  return length ? array[length - 1] : undefined;
}

module.exports = last;

},{}],6:[function(_dereq_,module,exports){
var baseDifference = _dereq_('../internal/baseDifference'),
    isArrayLike = _dereq_('../internal/isArrayLike'),
    restParam = _dereq_('../function/restParam');

/**
 * Creates an array excluding all provided values using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to filter.
 * @param {...*} [values] The values to exclude.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * _.without([1, 2, 1, 3], 1, 2);
 * // => [3]
 */
var without = restParam(function(array, values) {
  return isArrayLike(array)
    ? baseDifference(array, values)
    : [];
});

module.exports = without;

},{"../function/restParam":10,"../internal/baseDifference":21,"../internal/isArrayLike":54}],7:[function(_dereq_,module,exports){
module.exports = _dereq_('./forEach');

},{"./forEach":8}],8:[function(_dereq_,module,exports){
var arrayEach = _dereq_('../internal/arrayEach'),
    baseEach = _dereq_('../internal/baseEach'),
    createForEach = _dereq_('../internal/createForEach');

/**
 * Iterates over elements of `collection` invoking `iteratee` for each element.
 * The `iteratee` is bound to `thisArg` and invoked with three arguments:
 * (value, index|key, collection). Iteratee functions may exit iteration early
 * by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length" property
 * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
 * may be used for object iteration.
 *
 * @static
 * @memberOf _
 * @alias each
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Array|Object|string} Returns `collection`.
 * @example
 *
 * _([1, 2]).forEach(function(n) {
 *   console.log(n);
 * }).value();
 * // => logs each value from left to right and returns the array
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
 *   console.log(n, key);
 * });
 * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
 */
var forEach = createForEach(arrayEach, baseEach);

module.exports = forEach;

},{"../internal/arrayEach":12,"../internal/baseEach":22,"../internal/createForEach":46}],9:[function(_dereq_,module,exports){
var arrayMap = _dereq_('../internal/arrayMap'),
    baseCallback = _dereq_('../internal/baseCallback'),
    baseMap = _dereq_('../internal/baseMap'),
    isArray = _dereq_('../lang/isArray');

/**
 * Creates an array of values by running each element in `collection` through
 * `iteratee`. The `iteratee` is bound to `thisArg` and invoked with three
 * arguments: (value, index|key, collection).
 *
 * If a property name is provided for `iteratee` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `iteratee` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * Many lodash methods are guarded to work as iteratees for methods like
 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
 *
 * The guarded methods are:
 * `ary`, `callback`, `chunk`, `clone`, `create`, `curry`, `curryRight`,
 * `drop`, `dropRight`, `every`, `fill`, `flatten`, `invert`, `max`, `min`,
 * `parseInt`, `slice`, `sortBy`, `take`, `takeRight`, `template`, `trim`,
 * `trimLeft`, `trimRight`, `trunc`, `random`, `range`, `sample`, `some`,
 * `sum`, `uniq`, and `words`
 *
 * @static
 * @memberOf _
 * @alias collect
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [iteratee=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function timesThree(n) {
 *   return n * 3;
 * }
 *
 * _.map([1, 2], timesThree);
 * // => [3, 6]
 *
 * _.map({ 'a': 1, 'b': 2 }, timesThree);
 * // => [3, 6] (iteration order is not guaranteed)
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * // using the `_.property` callback shorthand
 * _.map(users, 'user');
 * // => ['barney', 'fred']
 */
function map(collection, iteratee, thisArg) {
  var func = isArray(collection) ? arrayMap : baseMap;
  iteratee = baseCallback(iteratee, thisArg, 3);
  return func(collection, iteratee);
}

module.exports = map;

},{"../internal/arrayMap":13,"../internal/baseCallback":19,"../internal/baseMap":31,"../lang/isArray":65}],10:[function(_dereq_,module,exports){
/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that invokes `func` with the `this` binding of the
 * created function and arguments from `start` and beyond provided as an array.
 *
 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/Web/JavaScript/Reference/Functions/rest_parameters).
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var say = _.restParam(function(what, names) {
 *   return what + ' ' + _.initial(names).join(', ') +
 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
 * });
 *
 * say('hello', 'fred', 'barney', 'pebbles');
 * // => 'hello fred, barney, & pebbles'
 */
function restParam(func, start) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        rest = Array(length);

    while (++index < length) {
      rest[index] = args[start + index];
    }
    switch (start) {
      case 0: return func.call(this, rest);
      case 1: return func.call(this, args[0], rest);
      case 2: return func.call(this, args[0], args[1], rest);
    }
    var otherArgs = Array(start + 1);
    index = -1;
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = rest;
    return func.apply(this, otherArgs);
  };
}

module.exports = restParam;

},{}],11:[function(_dereq_,module,exports){
(function (global){
var cachePush = _dereq_('./cachePush'),
    getNative = _dereq_('./getNative');

/** Native method references. */
var Set = getNative(global, 'Set');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeCreate = getNative(Object, 'create');

/**
 *
 * Creates a cache object to store unique values.
 *
 * @private
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var length = values ? values.length : 0;

  this.data = { 'hash': nativeCreate(null), 'set': new Set };
  while (length--) {
    this.push(values[length]);
  }
}

// Add functions to the `Set` cache.
SetCache.prototype.push = cachePush;

module.exports = SetCache;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./cachePush":40,"./getNative":52}],12:[function(_dereq_,module,exports){
/**
 * A specialized version of `_.forEach` for arrays without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;

},{}],13:[function(_dereq_,module,exports){
/**
 * A specialized version of `_.map` for arrays without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;

},{}],14:[function(_dereq_,module,exports){
/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;

},{}],15:[function(_dereq_,module,exports){
/**
 * A specialized version of `_.some` for arrays without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;

},{}],16:[function(_dereq_,module,exports){
/**
 * Used by `_.defaults` to customize its `_.assign` use.
 *
 * @private
 * @param {*} objectValue The destination object property value.
 * @param {*} sourceValue The source object property value.
 * @returns {*} Returns the value to assign to the destination object.
 */
function assignDefaults(objectValue, sourceValue) {
  return objectValue === undefined ? sourceValue : objectValue;
}

module.exports = assignDefaults;

},{}],17:[function(_dereq_,module,exports){
var keys = _dereq_('../object/keys');

/**
 * A specialized version of `_.assign` for customizing assigned values without
 * support for argument juggling, multiple sources, and `this` binding `customizer`
 * functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {Function} customizer The function to customize assigned values.
 * @returns {Object} Returns `object`.
 */
function assignWith(object, source, customizer) {
  var index = -1,
      props = keys(source),
      length = props.length;

  while (++index < length) {
    var key = props[index],
        value = object[key],
        result = customizer(value, source[key], key, object, source);

    if ((result === result ? (result !== value) : (value === value)) ||
        (value === undefined && !(key in object))) {
      object[key] = result;
    }
  }
  return object;
}

module.exports = assignWith;

},{"../object/keys":72}],18:[function(_dereq_,module,exports){
var baseCopy = _dereq_('./baseCopy'),
    keys = _dereq_('../object/keys');

/**
 * The base implementation of `_.assign` without support for argument juggling,
 * multiple sources, and `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return source == null
    ? object
    : baseCopy(source, keys(source), object);
}

module.exports = baseAssign;

},{"../object/keys":72,"./baseCopy":20}],19:[function(_dereq_,module,exports){
var baseMatches = _dereq_('./baseMatches'),
    baseMatchesProperty = _dereq_('./baseMatchesProperty'),
    bindCallback = _dereq_('./bindCallback'),
    identity = _dereq_('../utility/identity'),
    property = _dereq_('../utility/property');

/**
 * The base implementation of `_.callback` which supports specifying the
 * number of arguments to provide to `func`.
 *
 * @private
 * @param {*} [func=_.identity] The value to convert to a callback.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function baseCallback(func, thisArg, argCount) {
  var type = typeof func;
  if (type == 'function') {
    return thisArg === undefined
      ? func
      : bindCallback(func, thisArg, argCount);
  }
  if (func == null) {
    return identity;
  }
  if (type == 'object') {
    return baseMatches(func);
  }
  return thisArg === undefined
    ? property(func)
    : baseMatchesProperty(func, thisArg);
}

module.exports = baseCallback;

},{"../utility/identity":75,"../utility/property":76,"./baseMatches":32,"./baseMatchesProperty":33,"./bindCallback":38}],20:[function(_dereq_,module,exports){
/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property names to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @returns {Object} Returns `object`.
 */
function baseCopy(source, props, object) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];
    object[key] = source[key];
  }
  return object;
}

module.exports = baseCopy;

},{}],21:[function(_dereq_,module,exports){
var baseIndexOf = _dereq_('./baseIndexOf'),
    cacheIndexOf = _dereq_('./cacheIndexOf'),
    createCache = _dereq_('./createCache');

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of `_.difference` which accepts a single array
 * of values to exclude.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values) {
  var length = array ? array.length : 0,
      result = [];

  if (!length) {
    return result;
  }
  var index = -1,
      indexOf = baseIndexOf,
      isCommon = true,
      cache = (isCommon && values.length >= LARGE_ARRAY_SIZE) ? createCache(values) : null,
      valuesLength = values.length;

  if (cache) {
    indexOf = cacheIndexOf;
    isCommon = false;
    values = cache;
  }
  outer:
  while (++index < length) {
    var value = array[index];

    if (isCommon && value === value) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === value) {
          continue outer;
        }
      }
      result.push(value);
    }
    else if (indexOf(values, value, 0) < 0) {
      result.push(value);
    }
  }
  return result;
}

module.exports = baseDifference;

},{"./baseIndexOf":27,"./cacheIndexOf":39,"./createCache":44}],22:[function(_dereq_,module,exports){
var baseForOwn = _dereq_('./baseForOwn'),
    createBaseEach = _dereq_('./createBaseEach');

/**
 * The base implementation of `_.forEach` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object|string} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

module.exports = baseEach;

},{"./baseForOwn":25,"./createBaseEach":42}],23:[function(_dereq_,module,exports){
var arrayPush = _dereq_('./arrayPush'),
    isArguments = _dereq_('../lang/isArguments'),
    isArray = _dereq_('../lang/isArray'),
    isArrayLike = _dereq_('./isArrayLike'),
    isObjectLike = _dereq_('./isObjectLike');

/**
 * The base implementation of `_.flatten` with added support for restricting
 * flattening and specifying the start index.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {boolean} [isDeep] Specify a deep flatten.
 * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, isDeep, isStrict, result) {
  result || (result = []);

  var index = -1,
      length = array.length;

  while (++index < length) {
    var value = array[index];
    if (isObjectLike(value) && isArrayLike(value) &&
        (isStrict || isArray(value) || isArguments(value))) {
      if (isDeep) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, isDeep, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;

},{"../lang/isArguments":64,"../lang/isArray":65,"./arrayPush":14,"./isArrayLike":54,"./isObjectLike":59}],24:[function(_dereq_,module,exports){
var createBaseFor = _dereq_('./createBaseFor');

/**
 * The base implementation of `baseForIn` and `baseForOwn` which iterates
 * over `object` properties returned by `keysFunc` invoking `iteratee` for
 * each property. Iteratee functions may exit iteration early by explicitly
 * returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;

},{"./createBaseFor":43}],25:[function(_dereq_,module,exports){
var baseFor = _dereq_('./baseFor'),
    keys = _dereq_('../object/keys');

/**
 * The base implementation of `_.forOwn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;

},{"../object/keys":72,"./baseFor":24}],26:[function(_dereq_,module,exports){
var toObject = _dereq_('./toObject');

/**
 * The base implementation of `get` without support for string paths
 * and default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} path The path of the property to get.
 * @param {string} [pathKey] The key representation of path.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path, pathKey) {
  if (object == null) {
    return;
  }
  if (pathKey !== undefined && pathKey in toObject(object)) {
    path = [pathKey];
  }
  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[path[index++]];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;

},{"./toObject":62}],27:[function(_dereq_,module,exports){
var indexOfNaN = _dereq_('./indexOfNaN');

/**
 * The base implementation of `_.indexOf` without support for binary searches.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return indexOfNaN(array, fromIndex);
  }
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = baseIndexOf;

},{"./indexOfNaN":53}],28:[function(_dereq_,module,exports){
var baseIsEqualDeep = _dereq_('./baseIsEqualDeep'),
    isObject = _dereq_('../lang/isObject'),
    isObjectLike = _dereq_('./isObjectLike');

/**
 * The base implementation of `_.isEqual` without support for `this` binding
 * `customizer` functions.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
}

module.exports = baseIsEqual;

},{"../lang/isObject":68,"./baseIsEqualDeep":29,"./isObjectLike":59}],29:[function(_dereq_,module,exports){
var equalArrays = _dereq_('./equalArrays'),
    equalByTag = _dereq_('./equalByTag'),
    equalObjects = _dereq_('./equalObjects'),
    isArray = _dereq_('../lang/isArray'),
    isTypedArray = _dereq_('../lang/isTypedArray');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing objects.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = objToString.call(object);
    if (objTag == argsTag) {
      objTag = objectTag;
    } else if (objTag != objectTag) {
      objIsArr = isTypedArray(object);
    }
  }
  if (!othIsArr) {
    othTag = objToString.call(other);
    if (othTag == argsTag) {
      othTag = objectTag;
    } else if (othTag != objectTag) {
      othIsArr = isTypedArray(other);
    }
  }
  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && !(objIsArr || objIsObj)) {
    return equalByTag(object, other, objTag);
  }
  if (!isLoose) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
    }
  }
  if (!isSameTag) {
    return false;
  }
  // Assume cyclic values are equal.
  // For more information on detecting circular references see https://es5.github.io/#JO.
  stackA || (stackA = []);
  stackB || (stackB = []);

  var length = stackA.length;
  while (length--) {
    if (stackA[length] == object) {
      return stackB[length] == other;
    }
  }
  // Add `object` and `other` to the stack of traversed objects.
  stackA.push(object);
  stackB.push(other);

  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);

  stackA.pop();
  stackB.pop();

  return result;
}

module.exports = baseIsEqualDeep;

},{"../lang/isArray":65,"../lang/isTypedArray":69,"./equalArrays":47,"./equalByTag":48,"./equalObjects":49}],30:[function(_dereq_,module,exports){
var baseIsEqual = _dereq_('./baseIsEqual'),
    toObject = _dereq_('./toObject');

/**
 * The base implementation of `_.isMatch` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Array} matchData The propery names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparing objects.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = toObject(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var result = customizer ? customizer(objValue, srcValue, key) : undefined;
      if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
        return false;
      }
    }
  }
  return true;
}

module.exports = baseIsMatch;

},{"./baseIsEqual":28,"./toObject":62}],31:[function(_dereq_,module,exports){
var baseEach = _dereq_('./baseEach'),
    isArrayLike = _dereq_('./isArrayLike');

/**
 * The base implementation of `_.map` without support for callback shorthands
 * and `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap(collection, iteratee) {
  var index = -1,
      result = isArrayLike(collection) ? Array(collection.length) : [];

  baseEach(collection, function(value, key, collection) {
    result[++index] = iteratee(value, key, collection);
  });
  return result;
}

module.exports = baseMap;

},{"./baseEach":22,"./isArrayLike":54}],32:[function(_dereq_,module,exports){
var baseIsMatch = _dereq_('./baseIsMatch'),
    getMatchData = _dereq_('./getMatchData'),
    toObject = _dereq_('./toObject');

/**
 * The base implementation of `_.matches` which does not clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    var key = matchData[0][0],
        value = matchData[0][1];

    return function(object) {
      if (object == null) {
        return false;
      }
      return object[key] === value && (value !== undefined || (key in toObject(object)));
    };
  }
  return function(object) {
    return baseIsMatch(object, matchData);
  };
}

module.exports = baseMatches;

},{"./baseIsMatch":30,"./getMatchData":51,"./toObject":62}],33:[function(_dereq_,module,exports){
var baseGet = _dereq_('./baseGet'),
    baseIsEqual = _dereq_('./baseIsEqual'),
    baseSlice = _dereq_('./baseSlice'),
    isArray = _dereq_('../lang/isArray'),
    isKey = _dereq_('./isKey'),
    isStrictComparable = _dereq_('./isStrictComparable'),
    last = _dereq_('../array/last'),
    toObject = _dereq_('./toObject'),
    toPath = _dereq_('./toPath');

/**
 * The base implementation of `_.matchesProperty` which does not clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to compare.
 * @returns {Function} Returns the new function.
 */
function baseMatchesProperty(path, srcValue) {
  var isArr = isArray(path),
      isCommon = isKey(path) && isStrictComparable(srcValue),
      pathKey = (path + '');

  path = toPath(path);
  return function(object) {
    if (object == null) {
      return false;
    }
    var key = pathKey;
    object = toObject(object);
    if ((isArr || !isCommon) && !(key in object)) {
      object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
      if (object == null) {
        return false;
      }
      key = last(path);
      object = toObject(object);
    }
    return object[key] === srcValue
      ? (srcValue !== undefined || (key in object))
      : baseIsEqual(srcValue, object[key], undefined, true);
  };
}

module.exports = baseMatchesProperty;

},{"../array/last":5,"../lang/isArray":65,"./baseGet":26,"./baseIsEqual":28,"./baseSlice":36,"./isKey":57,"./isStrictComparable":60,"./toObject":62,"./toPath":63}],34:[function(_dereq_,module,exports){
/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;

},{}],35:[function(_dereq_,module,exports){
var baseGet = _dereq_('./baseGet'),
    toPath = _dereq_('./toPath');

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new function.
 */
function basePropertyDeep(path) {
  var pathKey = (path + '');
  path = toPath(path);
  return function(object) {
    return baseGet(object, path, pathKey);
  };
}

module.exports = basePropertyDeep;

},{"./baseGet":26,"./toPath":63}],36:[function(_dereq_,module,exports){
/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  start = start == null ? 0 : (+start || 0);
  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = (end === undefined || end > length) ? length : (+end || 0);
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;

},{}],37:[function(_dereq_,module,exports){
/**
 * Converts `value` to a string if it's not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  return value == null ? '' : (value + '');
}

module.exports = baseToString;

},{}],38:[function(_dereq_,module,exports){
var identity = _dereq_('../utility/identity');

/**
 * A specialized version of `baseCallback` which only supports `this` binding
 * and specifying the number of arguments to provide to `func`.
 *
 * @private
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function bindCallback(func, thisArg, argCount) {
  if (typeof func != 'function') {
    return identity;
  }
  if (thisArg === undefined) {
    return func;
  }
  switch (argCount) {
    case 1: return function(value) {
      return func.call(thisArg, value);
    };
    case 3: return function(value, index, collection) {
      return func.call(thisArg, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(thisArg, accumulator, value, index, collection);
    };
    case 5: return function(value, other, key, object, source) {
      return func.call(thisArg, value, other, key, object, source);
    };
  }
  return function() {
    return func.apply(thisArg, arguments);
  };
}

module.exports = bindCallback;

},{"../utility/identity":75}],39:[function(_dereq_,module,exports){
var isObject = _dereq_('../lang/isObject');

/**
 * Checks if `value` is in `cache` mimicking the return signature of
 * `_.indexOf` by returning `0` if the value is found, else `-1`.
 *
 * @private
 * @param {Object} cache The cache to search.
 * @param {*} value The value to search for.
 * @returns {number} Returns `0` if `value` is found, else `-1`.
 */
function cacheIndexOf(cache, value) {
  var data = cache.data,
      result = (typeof value == 'string' || isObject(value)) ? data.set.has(value) : data.hash[value];

  return result ? 0 : -1;
}

module.exports = cacheIndexOf;

},{"../lang/isObject":68}],40:[function(_dereq_,module,exports){
var isObject = _dereq_('../lang/isObject');

/**
 * Adds `value` to the cache.
 *
 * @private
 * @name push
 * @memberOf SetCache
 * @param {*} value The value to cache.
 */
function cachePush(value) {
  var data = this.data;
  if (typeof value == 'string' || isObject(value)) {
    data.set.add(value);
  } else {
    data.hash[value] = true;
  }
}

module.exports = cachePush;

},{"../lang/isObject":68}],41:[function(_dereq_,module,exports){
var bindCallback = _dereq_('./bindCallback'),
    isIterateeCall = _dereq_('./isIterateeCall'),
    restParam = _dereq_('../function/restParam');

/**
 * Creates a `_.assign`, `_.defaults`, or `_.merge` function.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return restParam(function(object, sources) {
    var index = -1,
        length = object == null ? 0 : sources.length,
        customizer = length > 2 ? sources[length - 2] : undefined,
        guard = length > 2 ? sources[2] : undefined,
        thisArg = length > 1 ? sources[length - 1] : undefined;

    if (typeof customizer == 'function') {
      customizer = bindCallback(customizer, thisArg, 5);
      length -= 2;
    } else {
      customizer = typeof thisArg == 'function' ? thisArg : undefined;
      length -= (customizer ? 1 : 0);
    }
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;

},{"../function/restParam":10,"./bindCallback":38,"./isIterateeCall":56}],42:[function(_dereq_,module,exports){
var getLength = _dereq_('./getLength'),
    isLength = _dereq_('./isLength'),
    toObject = _dereq_('./toObject');

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    var length = collection ? getLength(collection) : 0;
    if (!isLength(length)) {
      return eachFunc(collection, iteratee);
    }
    var index = fromRight ? length : -1,
        iterable = toObject(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

module.exports = createBaseEach;

},{"./getLength":50,"./isLength":58,"./toObject":62}],43:[function(_dereq_,module,exports){
var toObject = _dereq_('./toObject');

/**
 * Creates a base function for `_.forIn` or `_.forInRight`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var iterable = toObject(object),
        props = keysFunc(object),
        length = props.length,
        index = fromRight ? length : -1;

    while ((fromRight ? index-- : ++index < length)) {
      var key = props[index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;

},{"./toObject":62}],44:[function(_dereq_,module,exports){
(function (global){
var SetCache = _dereq_('./SetCache'),
    getNative = _dereq_('./getNative');

/** Native method references. */
var Set = getNative(global, 'Set');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeCreate = getNative(Object, 'create');

/**
 * Creates a `Set` cache object to optimize linear searches of large arrays.
 *
 * @private
 * @param {Array} [values] The values to cache.
 * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
 */
function createCache(values) {
  return (nativeCreate && Set) ? new SetCache(values) : null;
}

module.exports = createCache;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./SetCache":11,"./getNative":52}],45:[function(_dereq_,module,exports){
var restParam = _dereq_('../function/restParam');

/**
 * Creates a `_.defaults` or `_.defaultsDeep` function.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @param {Function} customizer The function to customize assigned values.
 * @returns {Function} Returns the new defaults function.
 */
function createDefaults(assigner, customizer) {
  return restParam(function(args) {
    var object = args[0];
    if (object == null) {
      return object;
    }
    args.push(customizer);
    return assigner.apply(undefined, args);
  });
}

module.exports = createDefaults;

},{"../function/restParam":10}],46:[function(_dereq_,module,exports){
var bindCallback = _dereq_('./bindCallback'),
    isArray = _dereq_('../lang/isArray');

/**
 * Creates a function for `_.forEach` or `_.forEachRight`.
 *
 * @private
 * @param {Function} arrayFunc The function to iterate over an array.
 * @param {Function} eachFunc The function to iterate over a collection.
 * @returns {Function} Returns the new each function.
 */
function createForEach(arrayFunc, eachFunc) {
  return function(collection, iteratee, thisArg) {
    return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection))
      ? arrayFunc(collection, iteratee)
      : eachFunc(collection, bindCallback(iteratee, thisArg, 3));
  };
}

module.exports = createForEach;

},{"../lang/isArray":65,"./bindCallback":38}],47:[function(_dereq_,module,exports){
var arraySome = _dereq_('./arraySome');

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing arrays.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var index = -1,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
    return false;
  }
  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index],
        result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;

    if (result !== undefined) {
      if (result) {
        continue;
      }
      return false;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (isLoose) {
      if (!arraySome(other, function(othValue) {
            return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
          })) {
        return false;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
      return false;
    }
  }
  return true;
}

module.exports = equalArrays;

},{"./arraySome":15}],48:[function(_dereq_,module,exports){
/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    stringTag = '[object String]';

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag) {
  switch (tag) {
    case boolTag:
    case dateTag:
      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
      return +object == +other;

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case numberTag:
      // Treat `NaN` vs. `NaN` as equal.
      return (object != +object)
        ? other != +other
        : object == +other;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings primitives and string
      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
      return object == (other + '');
  }
  return false;
}

module.exports = equalByTag;

},{}],49:[function(_dereq_,module,exports){
var keys = _dereq_('../object/keys');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isLoose) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  var skipCtor = isLoose;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key],
        result = customizer ? customizer(isLoose ? othValue : objValue, isLoose? objValue : othValue, key) : undefined;

    // Recursively compare objects (susceptible to call stack limits).
    if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
      return false;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (!skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      return false;
    }
  }
  return true;
}

module.exports = equalObjects;

},{"../object/keys":72}],50:[function(_dereq_,module,exports){
var baseProperty = _dereq_('./baseProperty');

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

module.exports = getLength;

},{"./baseProperty":34}],51:[function(_dereq_,module,exports){
var isStrictComparable = _dereq_('./isStrictComparable'),
    pairs = _dereq_('../object/pairs');

/**
 * Gets the propery names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = pairs(object),
      length = result.length;

  while (length--) {
    result[length][2] = isStrictComparable(result[length][1]);
  }
  return result;
}

module.exports = getMatchData;

},{"../object/pairs":74,"./isStrictComparable":60}],52:[function(_dereq_,module,exports){
var isNative = _dereq_('../lang/isNative');

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

module.exports = getNative;

},{"../lang/isNative":67}],53:[function(_dereq_,module,exports){
/**
 * Gets the index at which the first occurrence of `NaN` is found in `array`.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
 */
function indexOfNaN(array, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 0 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    var other = array[index];
    if (other !== other) {
      return index;
    }
  }
  return -1;
}

module.exports = indexOfNaN;

},{}],54:[function(_dereq_,module,exports){
var getLength = _dereq_('./getLength'),
    isLength = _dereq_('./isLength');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

module.exports = isArrayLike;

},{"./getLength":50,"./isLength":58}],55:[function(_dereq_,module,exports){
/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

module.exports = isIndex;

},{}],56:[function(_dereq_,module,exports){
var isArrayLike = _dereq_('./isArrayLike'),
    isIndex = _dereq_('./isIndex'),
    isObject = _dereq_('../lang/isObject');

/**
 * Checks if the provided arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
      ? (isArrayLike(object) && isIndex(index, object.length))
      : (type == 'string' && index in object)) {
    var other = object[index];
    return value === value ? (value === other) : (other !== other);
  }
  return false;
}

module.exports = isIterateeCall;

},{"../lang/isObject":68,"./isArrayLike":54,"./isIndex":55}],57:[function(_dereq_,module,exports){
var isArray = _dereq_('../lang/isArray'),
    toObject = _dereq_('./toObject');

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  var type = typeof value;
  if ((type == 'string' && reIsPlainProp.test(value)) || type == 'number') {
    return true;
  }
  if (isArray(value)) {
    return false;
  }
  var result = !reIsDeepProp.test(value);
  return result || (object != null && value in toObject(object));
}

module.exports = isKey;

},{"../lang/isArray":65,"./toObject":62}],58:[function(_dereq_,module,exports){
/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],59:[function(_dereq_,module,exports){
/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],60:[function(_dereq_,module,exports){
var isObject = _dereq_('../lang/isObject');

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

module.exports = isStrictComparable;

},{"../lang/isObject":68}],61:[function(_dereq_,module,exports){
var isArguments = _dereq_('../lang/isArguments'),
    isArray = _dereq_('../lang/isArray'),
    isIndex = _dereq_('./isIndex'),
    isLength = _dereq_('./isLength'),
    keysIn = _dereq_('../object/keysIn');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = !!length && isLength(length) &&
    (isArray(object) || isArguments(object));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = shimKeys;

},{"../lang/isArguments":64,"../lang/isArray":65,"../object/keysIn":73,"./isIndex":55,"./isLength":58}],62:[function(_dereq_,module,exports){
var isObject = _dereq_('../lang/isObject');

/**
 * Converts `value` to an object if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Object} Returns the object.
 */
function toObject(value) {
  return isObject(value) ? value : Object(value);
}

module.exports = toObject;

},{"../lang/isObject":68}],63:[function(_dereq_,module,exports){
var baseToString = _dereq_('./baseToString'),
    isArray = _dereq_('../lang/isArray');

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `value` to property path array if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Array} Returns the property path array.
 */
function toPath(value) {
  if (isArray(value)) {
    return value;
  }
  var result = [];
  baseToString(value).replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
}

module.exports = toPath;

},{"../lang/isArray":65,"./baseToString":37}],64:[function(_dereq_,module,exports){
var isArrayLike = _dereq_('../internal/isArrayLike'),
    isObjectLike = _dereq_('../internal/isObjectLike');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Native method references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is classified as an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  return isObjectLike(value) && isArrayLike(value) &&
    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
}

module.exports = isArguments;

},{"../internal/isArrayLike":54,"../internal/isObjectLike":59}],65:[function(_dereq_,module,exports){
var getNative = _dereq_('../internal/getNative'),
    isLength = _dereq_('../internal/isLength'),
    isObjectLike = _dereq_('../internal/isObjectLike');

/** `Object#toString` result references. */
var arrayTag = '[object Array]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = getNative(Array, 'isArray');

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};

module.exports = isArray;

},{"../internal/getNative":52,"../internal/isLength":58,"../internal/isObjectLike":59}],66:[function(_dereq_,module,exports){
var isObject = _dereq_('./isObject');

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 which returns 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

module.exports = isFunction;

},{"./isObject":68}],67:[function(_dereq_,module,exports){
var isFunction = _dereq_('./isFunction'),
    isObjectLike = _dereq_('../internal/isObjectLike');

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = isNative;

},{"../internal/isObjectLike":59,"./isFunction":66}],68:[function(_dereq_,module,exports){
/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],69:[function(_dereq_,module,exports){
var isLength = _dereq_('../internal/isLength'),
    isObjectLike = _dereq_('../internal/isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dateTag] = typedArrayTags[errorTag] =
typedArrayTags[funcTag] = typedArrayTags[mapTag] =
typedArrayTags[numberTag] = typedArrayTags[objectTag] =
typedArrayTags[regexpTag] = typedArrayTags[setTag] =
typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
function isTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
}

module.exports = isTypedArray;

},{"../internal/isLength":58,"../internal/isObjectLike":59}],70:[function(_dereq_,module,exports){
var assignWith = _dereq_('../internal/assignWith'),
    baseAssign = _dereq_('../internal/baseAssign'),
    createAssigner = _dereq_('../internal/createAssigner');

/**
 * Assigns own enumerable properties of source object(s) to the destination
 * object. Subsequent sources overwrite property assignments of previous sources.
 * If `customizer` is provided it's invoked to produce the assigned values.
 * The `customizer` is bound to `thisArg` and invoked with five arguments:
 * (objectValue, sourceValue, key, object, source).
 *
 * **Note:** This method mutates `object` and is based on
 * [`Object.assign`](http://ecma-international.org/ecma-262/6.0/#sec-object.assign).
 *
 * @static
 * @memberOf _
 * @alias extend
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
 * // => { 'user': 'fred', 'age': 40 }
 *
 * // using a customizer callback
 * var defaults = _.partialRight(_.assign, function(value, other) {
 *   return _.isUndefined(value) ? other : value;
 * });
 *
 * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
 * // => { 'user': 'barney', 'age': 36 }
 */
var assign = createAssigner(function(object, source, customizer) {
  return customizer
    ? assignWith(object, source, customizer)
    : baseAssign(object, source);
});

module.exports = assign;

},{"../internal/assignWith":17,"../internal/baseAssign":18,"../internal/createAssigner":41}],71:[function(_dereq_,module,exports){
var assign = _dereq_('./assign'),
    assignDefaults = _dereq_('../internal/assignDefaults'),
    createDefaults = _dereq_('../internal/createDefaults');

/**
 * Assigns own enumerable properties of source object(s) to the destination
 * object for all destination properties that resolve to `undefined`. Once a
 * property is set, additional values of the same property are ignored.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * _.defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
 * // => { 'user': 'barney', 'age': 36 }
 */
var defaults = createDefaults(assign, assignDefaults);

module.exports = defaults;

},{"../internal/assignDefaults":16,"../internal/createDefaults":45,"./assign":70}],72:[function(_dereq_,module,exports){
var getNative = _dereq_('../internal/getNative'),
    isArrayLike = _dereq_('../internal/isArrayLike'),
    isObject = _dereq_('../lang/isObject'),
    shimKeys = _dereq_('../internal/shimKeys');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeKeys = getNative(Object, 'keys');

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  var Ctor = object == null ? undefined : object.constructor;
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
      (typeof object != 'function' && isArrayLike(object))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};

module.exports = keys;

},{"../internal/getNative":52,"../internal/isArrayLike":54,"../internal/shimKeys":61,"../lang/isObject":68}],73:[function(_dereq_,module,exports){
var isArguments = _dereq_('../lang/isArguments'),
    isArray = _dereq_('../lang/isArray'),
    isIndex = _dereq_('../internal/isIndex'),
    isLength = _dereq_('../internal/isLength'),
    isObject = _dereq_('../lang/isObject');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || isArguments(object)) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keysIn;

},{"../internal/isIndex":55,"../internal/isLength":58,"../lang/isArguments":64,"../lang/isArray":65,"../lang/isObject":68}],74:[function(_dereq_,module,exports){
var keys = _dereq_('./keys'),
    toObject = _dereq_('../internal/toObject');

/**
 * Creates a two dimensional array of the key-value pairs for `object`,
 * e.g. `[[key1, value1], [key2, value2]]`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the new array of key-value pairs.
 * @example
 *
 * _.pairs({ 'barney': 36, 'fred': 40 });
 * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
 */
function pairs(object) {
  object = toObject(object);

  var index = -1,
      props = keys(object),
      length = props.length,
      result = Array(length);

  while (++index < length) {
    var key = props[index];
    result[index] = [key, object[key]];
  }
  return result;
}

module.exports = pairs;

},{"../internal/toObject":62,"./keys":72}],75:[function(_dereq_,module,exports){
/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],76:[function(_dereq_,module,exports){
var baseProperty = _dereq_('../internal/baseProperty'),
    basePropertyDeep = _dereq_('../internal/basePropertyDeep'),
    isKey = _dereq_('../internal/isKey');

/**
 * Creates a function that returns the property value at `path` on a
 * given object.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': { 'c': 2 } } },
 *   { 'a': { 'b': { 'c': 1 } } }
 * ];
 *
 * _.map(objects, _.property('a.b.c'));
 * // => [2, 1]
 *
 * _.pluck(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
}

module.exports = property;

},{"../internal/baseProperty":34,"../internal/basePropertyDeep":35,"../internal/isKey":57}],77:[function(_dereq_,module,exports){
var createElement = _dereq_("./vdom/create-element.js")

module.exports = createElement

},{"./vdom/create-element.js":89}],78:[function(_dereq_,module,exports){
var diff = _dereq_("./vtree/diff.js")

module.exports = diff

},{"./vtree/diff.js":112}],79:[function(_dereq_,module,exports){
var h = _dereq_("./virtual-hyperscript/index.js")

module.exports = h

},{"./virtual-hyperscript/index.js":97}],80:[function(_dereq_,module,exports){
/*!
 * Cross-Browser Split 1.1.1
 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 * Available under the MIT License
 * ECMAScript compliant, uniform cross-browser split method
 */

/**
 * Splits a string into an array of strings using a regex or string separator. Matches of the
 * separator are not included in the result array. However, if `separator` is a regex that contains
 * capturing groups, backreferences are spliced into the result each time `separator` is matched.
 * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
 * cross-browser.
 * @param {String} str String to split.
 * @param {RegExp|String} separator Regex or string to use for separating the string.
 * @param {Number} [limit] Maximum number of items to include in the result array.
 * @returns {Array} Array of substrings.
 * @example
 *
 * // Basic use
 * split('a b c d', ' ');
 * // -> ['a', 'b', 'c', 'd']
 *
 * // With limit
 * split('a b c d', ' ', 2);
 * // -> ['a', 'b']
 *
 * // Backreferences in result array
 * split('..word1 word2..', /([a-z]+)(\d+)/i);
 * // -> ['..', 'word', '1', ' ', 'word', '2', '..']
 */
module.exports = (function split(undef) {

  var nativeSplit = String.prototype.split,
    compliantExecNpcg = /()??/.exec("")[1] === undef,
    // NPCG: nonparticipating capturing group
    self;

  self = function(str, separator, limit) {
    // If `separator` is not a regex, use `nativeSplit`
    if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
      return nativeSplit.call(str, separator, limit);
    }
    var output = [],
      flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + // Proposed for ES6
      (separator.sticky ? "y" : ""),
      // Firefox 3+
      lastLastIndex = 0,
      // Make `global` and avoid `lastIndex` issues by working with a copy
      separator = new RegExp(separator.source, flags + "g"),
      separator2, match, lastIndex, lastLength;
    str += ""; // Type-convert
    if (!compliantExecNpcg) {
      // Doesn't need flags gy, but they don't hurt
      separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
    }
    /* Values for `limit`, per the spec:
     * If undefined: 4294967295 // Math.pow(2, 32) - 1
     * If 0, Infinity, or NaN: 0
     * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
     * If negative number: 4294967296 - Math.floor(Math.abs(limit))
     * If other: Type-convert, then use the above rules
     */
    limit = limit === undef ? -1 >>> 0 : // Math.pow(2, 32) - 1
    limit >>> 0; // ToUint32(limit)
    while (match = separator.exec(str)) {
      // `separator.lastIndex` is not reliable cross-browser
      lastIndex = match.index + match[0].length;
      if (lastIndex > lastLastIndex) {
        output.push(str.slice(lastLastIndex, match.index));
        // Fix browsers whose `exec` methods don't consistently return `undefined` for
        // nonparticipating capturing groups
        if (!compliantExecNpcg && match.length > 1) {
          match[0].replace(separator2, function() {
            for (var i = 1; i < arguments.length - 2; i++) {
              if (arguments[i] === undef) {
                match[i] = undef;
              }
            }
          });
        }
        if (match.length > 1 && match.index < str.length) {
          Array.prototype.push.apply(output, match.slice(1));
        }
        lastLength = match[0].length;
        lastLastIndex = lastIndex;
        if (output.length >= limit) {
          break;
        }
      }
      if (separator.lastIndex === match.index) {
        separator.lastIndex++; // Avoid an infinite loop
      }
    }
    if (lastLastIndex === str.length) {
      if (lastLength || !separator.test("")) {
        output.push("");
      }
    } else {
      output.push(str.slice(lastLastIndex));
    }
    return output.length > limit ? output.slice(0, limit) : output;
  };

  return self;
})();

},{}],81:[function(_dereq_,module,exports){
'use strict';

var OneVersionConstraint = _dereq_('individual/one-version');

var MY_VERSION = '7';
OneVersionConstraint('ev-store', MY_VERSION);

var hashKey = '__EV_STORE_KEY@' + MY_VERSION;

module.exports = EvStore;

function EvStore(elem) {
    var hash = elem[hashKey];

    if (!hash) {
        hash = elem[hashKey] = {};
    }

    return hash;
}

},{"individual/one-version":83}],82:[function(_dereq_,module,exports){
(function (global){
'use strict';

/*global window, global*/

var root = typeof window !== 'undefined' ?
    window : typeof global !== 'undefined' ?
    global : {};

module.exports = Individual;

function Individual(key, value) {
    if (key in root) {
        return root[key];
    }

    root[key] = value;

    return value;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],83:[function(_dereq_,module,exports){
'use strict';

var Individual = _dereq_('./index.js');

module.exports = OneVersion;

function OneVersion(moduleName, version, defaultValue) {
    var key = '__INDIVIDUAL_ONE_VERSION_' + moduleName;
    var enforceKey = key + '_ENFORCE_SINGLETON';

    var versionValue = Individual(enforceKey, version);

    if (versionValue !== version) {
        throw new Error('Can only have one copy of ' +
            moduleName + '.\n' +
            'You already have version ' + versionValue +
            ' installed.\n' +
            'This means you cannot install version ' + version);
    }

    return Individual(key, defaultValue);
}

},{"./index.js":82}],84:[function(_dereq_,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = _dereq_('min-document');

if (typeof document !== 'undefined') {
    module.exports = document;
} else {
    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }

    module.exports = doccy;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"min-document":1}],85:[function(_dereq_,module,exports){
"use strict";

module.exports = function isObject(x) {
	return typeof x === "object" && x !== null;
};

},{}],86:[function(_dereq_,module,exports){
var nativeIsArray = Array.isArray
var toString = Object.prototype.toString

module.exports = nativeIsArray || isArray

function isArray(obj) {
    return toString.call(obj) === "[object Array]"
}

},{}],87:[function(_dereq_,module,exports){
var patch = _dereq_("./vdom/patch.js")

module.exports = patch

},{"./vdom/patch.js":92}],88:[function(_dereq_,module,exports){
var isObject = _dereq_("is-object")
var isHook = _dereq_("../vnode/is-vhook.js")

module.exports = applyProperties

function applyProperties(node, props, previous) {
    for (var propName in props) {
        var propValue = props[propName]

        if (propValue === undefined) {
            removeProperty(node, propName, propValue, previous);
        } else if (isHook(propValue)) {
            removeProperty(node, propName, propValue, previous)
            if (propValue.hook) {
                propValue.hook(node,
                    propName,
                    previous ? previous[propName] : undefined)
            }
        } else {
            if (isObject(propValue)) {
                patchObject(node, props, previous, propName, propValue);
            } else {
                node[propName] = propValue
            }
        }
    }
}

function removeProperty(node, propName, propValue, previous) {
    if (previous) {
        var previousValue = previous[propName]

        if (!isHook(previousValue)) {
            if (propName === "attributes") {
                for (var attrName in previousValue) {
                    node.removeAttribute(attrName)
                }
            } else if (propName === "style") {
                for (var i in previousValue) {
                    node.style[i] = ""
                }
            } else if (typeof previousValue === "string") {
                node[propName] = ""
            } else {
                node[propName] = null
            }
        } else if (previousValue.unhook) {
            previousValue.unhook(node, propName, propValue)
        }
    }
}

function patchObject(node, props, previous, propName, propValue) {
    var previousValue = previous ? previous[propName] : undefined

    // Set attributes
    if (propName === "attributes") {
        for (var attrName in propValue) {
            var attrValue = propValue[attrName]

            if (attrValue === undefined) {
                node.removeAttribute(attrName)
            } else {
                node.setAttribute(attrName, attrValue)
            }
        }

        return
    }

    if(previousValue && isObject(previousValue) &&
        getPrototype(previousValue) !== getPrototype(propValue)) {
        node[propName] = propValue
        return
    }

    if (!isObject(node[propName])) {
        node[propName] = {}
    }

    var replacer = propName === "style" ? "" : undefined

    for (var k in propValue) {
        var value = propValue[k]
        node[propName][k] = (value === undefined) ? replacer : value
    }
}

function getPrototype(value) {
    if (Object.getPrototypeOf) {
        return Object.getPrototypeOf(value)
    } else if (value.__proto__) {
        return value.__proto__
    } else if (value.constructor) {
        return value.constructor.prototype
    }
}

},{"../vnode/is-vhook.js":103,"is-object":85}],89:[function(_dereq_,module,exports){
var document = _dereq_("global/document")

var applyProperties = _dereq_("./apply-properties")

var isVNode = _dereq_("../vnode/is-vnode.js")
var isVText = _dereq_("../vnode/is-vtext.js")
var isWidget = _dereq_("../vnode/is-widget.js")
var handleThunk = _dereq_("../vnode/handle-thunk.js")

module.exports = createElement

function createElement(vnode, opts) {
    var doc = opts ? opts.document || document : document
    var warn = opts ? opts.warn : null

    vnode = handleThunk(vnode).a

    if (isWidget(vnode)) {
        return vnode.init()
    } else if (isVText(vnode)) {
        return doc.createTextNode(vnode.text)
    } else if (!isVNode(vnode)) {
        if (warn) {
            warn("Item is not a valid virtual dom node", vnode)
        }
        return null
    }

    var node = (vnode.namespace === null) ?
        doc.createElement(vnode.tagName) :
        doc.createElementNS(vnode.namespace, vnode.tagName)

    var props = vnode.properties
    applyProperties(node, props)

    var children = vnode.children

    for (var i = 0; i < children.length; i++) {
        var childNode = createElement(children[i], opts)
        if (childNode) {
            node.appendChild(childNode)
        }
    }

    return node
}

},{"../vnode/handle-thunk.js":101,"../vnode/is-vnode.js":104,"../vnode/is-vtext.js":105,"../vnode/is-widget.js":106,"./apply-properties":88,"global/document":84}],90:[function(_dereq_,module,exports){
// Maps a virtual DOM tree onto a real DOM tree in an efficient manner.
// We don't want to read all of the DOM nodes in the tree so we use
// the in-order tree indexing to eliminate recursion down certain branches.
// We only recurse into a DOM node if we know that it contains a child of
// interest.

var noChild = {}

module.exports = domIndex

function domIndex(rootNode, tree, indices, nodes) {
    if (!indices || indices.length === 0) {
        return {}
    } else {
        indices.sort(ascending)
        return recurse(rootNode, tree, indices, nodes, 0)
    }
}

function recurse(rootNode, tree, indices, nodes, rootIndex) {
    nodes = nodes || {}


    if (rootNode) {
        if (indexInRange(indices, rootIndex, rootIndex)) {
            nodes[rootIndex] = rootNode
        }

        var vChildren = tree.children

        if (vChildren) {

            var childNodes = rootNode.childNodes

            for (var i = 0; i < tree.children.length; i++) {
                rootIndex += 1

                var vChild = vChildren[i] || noChild
                var nextIndex = rootIndex + (vChild.count || 0)

                // skip recursion down the tree if there are no nodes down here
                if (indexInRange(indices, rootIndex, nextIndex)) {
                    recurse(childNodes[i], vChild, indices, nodes, rootIndex)
                }

                rootIndex = nextIndex
            }
        }
    }

    return nodes
}

// Binary search for an index in the interval [left, right]
function indexInRange(indices, left, right) {
    if (indices.length === 0) {
        return false
    }

    var minIndex = 0
    var maxIndex = indices.length - 1
    var currentIndex
    var currentItem

    while (minIndex <= maxIndex) {
        currentIndex = ((maxIndex + minIndex) / 2) >> 0
        currentItem = indices[currentIndex]

        if (minIndex === maxIndex) {
            return currentItem >= left && currentItem <= right
        } else if (currentItem < left) {
            minIndex = currentIndex + 1
        } else  if (currentItem > right) {
            maxIndex = currentIndex - 1
        } else {
            return true
        }
    }

    return false;
}

function ascending(a, b) {
    return a > b ? 1 : -1
}

},{}],91:[function(_dereq_,module,exports){
var applyProperties = _dereq_("./apply-properties")

var isWidget = _dereq_("../vnode/is-widget.js")
var VPatch = _dereq_("../vnode/vpatch.js")

var updateWidget = _dereq_("./update-widget")

module.exports = applyPatch

function applyPatch(vpatch, domNode, renderOptions) {
    var type = vpatch.type
    var vNode = vpatch.vNode
    var patch = vpatch.patch

    switch (type) {
        case VPatch.REMOVE:
            return removeNode(domNode, vNode)
        case VPatch.INSERT:
            return insertNode(domNode, patch, renderOptions)
        case VPatch.VTEXT:
            return stringPatch(domNode, vNode, patch, renderOptions)
        case VPatch.WIDGET:
            return widgetPatch(domNode, vNode, patch, renderOptions)
        case VPatch.VNODE:
            return vNodePatch(domNode, vNode, patch, renderOptions)
        case VPatch.ORDER:
            reorderChildren(domNode, patch)
            return domNode
        case VPatch.PROPS:
            applyProperties(domNode, patch, vNode.properties)
            return domNode
        case VPatch.THUNK:
            return replaceRoot(domNode,
                renderOptions.patch(domNode, patch, renderOptions))
        default:
            return domNode
    }
}

function removeNode(domNode, vNode) {
    var parentNode = domNode.parentNode

    if (parentNode) {
        parentNode.removeChild(domNode)
    }

    destroyWidget(domNode, vNode);

    return null
}

function insertNode(parentNode, vNode, renderOptions) {
    var newNode = renderOptions.render(vNode, renderOptions)

    if (parentNode) {
        parentNode.appendChild(newNode)
    }

    return parentNode
}

function stringPatch(domNode, leftVNode, vText, renderOptions) {
    var newNode

    if (domNode.nodeType === 3) {
        domNode.replaceData(0, domNode.length, vText.text)
        newNode = domNode
    } else {
        var parentNode = domNode.parentNode
        newNode = renderOptions.render(vText, renderOptions)

        if (parentNode && newNode !== domNode) {
            parentNode.replaceChild(newNode, domNode)
        }
    }

    return newNode
}

function widgetPatch(domNode, leftVNode, widget, renderOptions) {
    var updating = updateWidget(leftVNode, widget)
    var newNode

    if (updating) {
        newNode = widget.update(leftVNode, domNode) || domNode
    } else {
        newNode = renderOptions.render(widget, renderOptions)
    }

    var parentNode = domNode.parentNode

    if (parentNode && newNode !== domNode) {
        parentNode.replaceChild(newNode, domNode)
    }

    if (!updating) {
        destroyWidget(domNode, leftVNode)
    }

    return newNode
}

function vNodePatch(domNode, leftVNode, vNode, renderOptions) {
    var parentNode = domNode.parentNode
    var newNode = renderOptions.render(vNode, renderOptions)

    if (parentNode && newNode !== domNode) {
        parentNode.replaceChild(newNode, domNode)
    }

    return newNode
}

function destroyWidget(domNode, w) {
    if (typeof w.destroy === "function" && isWidget(w)) {
        w.destroy(domNode)
    }
}

function reorderChildren(domNode, moves) {
    var childNodes = domNode.childNodes
    var keyMap = {}
    var node
    var remove
    var insert

    for (var i = 0; i < moves.removes.length; i++) {
        remove = moves.removes[i]
        node = childNodes[remove.from]
        if (remove.key) {
            keyMap[remove.key] = node
        }
        domNode.removeChild(node)
    }

    var length = childNodes.length
    for (var j = 0; j < moves.inserts.length; j++) {
        insert = moves.inserts[j]
        node = keyMap[insert.key]
        // this is the weirdest bug i've ever seen in webkit
        domNode.insertBefore(node, insert.to >= length++ ? null : childNodes[insert.to])
    }
}

function replaceRoot(oldRoot, newRoot) {
    if (oldRoot && newRoot && oldRoot !== newRoot && oldRoot.parentNode) {
        oldRoot.parentNode.replaceChild(newRoot, oldRoot)
    }

    return newRoot;
}

},{"../vnode/is-widget.js":106,"../vnode/vpatch.js":109,"./apply-properties":88,"./update-widget":93}],92:[function(_dereq_,module,exports){
var document = _dereq_("global/document")
var isArray = _dereq_("x-is-array")

var render = _dereq_("./create-element")
var domIndex = _dereq_("./dom-index")
var patchOp = _dereq_("./patch-op")
module.exports = patch

function patch(rootNode, patches, renderOptions) {
    renderOptions = renderOptions || {}
    renderOptions.patch = renderOptions.patch && renderOptions.patch !== patch
        ? renderOptions.patch
        : patchRecursive
    renderOptions.render = renderOptions.render || render

    return renderOptions.patch(rootNode, patches, renderOptions)
}

function patchRecursive(rootNode, patches, renderOptions) {
    var indices = patchIndices(patches)

    if (indices.length === 0) {
        return rootNode
    }

    var index = domIndex(rootNode, patches.a, indices)
    var ownerDocument = rootNode.ownerDocument

    if (!renderOptions.document && ownerDocument !== document) {
        renderOptions.document = ownerDocument
    }

    for (var i = 0; i < indices.length; i++) {
        var nodeIndex = indices[i]
        rootNode = applyPatch(rootNode,
            index[nodeIndex],
            patches[nodeIndex],
            renderOptions)
    }

    return rootNode
}

function applyPatch(rootNode, domNode, patchList, renderOptions) {
    if (!domNode) {
        return rootNode
    }

    var newNode

    if (isArray(patchList)) {
        for (var i = 0; i < patchList.length; i++) {
            newNode = patchOp(patchList[i], domNode, renderOptions)

            if (domNode === rootNode) {
                rootNode = newNode
            }
        }
    } else {
        newNode = patchOp(patchList, domNode, renderOptions)

        if (domNode === rootNode) {
            rootNode = newNode
        }
    }

    return rootNode
}

function patchIndices(patches) {
    var indices = []

    for (var key in patches) {
        if (key !== "a") {
            indices.push(Number(key))
        }
    }

    return indices
}

},{"./create-element":89,"./dom-index":90,"./patch-op":91,"global/document":84,"x-is-array":86}],93:[function(_dereq_,module,exports){
var isWidget = _dereq_("../vnode/is-widget.js")

module.exports = updateWidget

function updateWidget(a, b) {
    if (isWidget(a) && isWidget(b)) {
        if ("name" in a && "name" in b) {
            return a.id === b.id
        } else {
            return a.init === b.init
        }
    }

    return false
}

},{"../vnode/is-widget.js":106}],94:[function(_dereq_,module,exports){
'use strict';

module.exports = AttributeHook;

function AttributeHook(namespace, value) {
    if (!(this instanceof AttributeHook)) {
        return new AttributeHook(namespace, value);
    }

    this.namespace = namespace;
    this.value = value;
}

AttributeHook.prototype.hook = function (node, prop, prev) {
    if (prev && prev.type === 'AttributeHook' &&
        prev.value === this.value &&
        prev.namespace === this.namespace) {
        return;
    }

    node.setAttributeNS(this.namespace, prop, this.value);
};

AttributeHook.prototype.unhook = function (node, prop, next) {
    if (next && next.type === 'AttributeHook' &&
        next.namespace === this.namespace) {
        return;
    }

    var colonPosition = prop.indexOf(':');
    var localName = colonPosition > -1 ? prop.substr(colonPosition + 1) : prop;
    node.removeAttributeNS(this.namespace, localName);
};

AttributeHook.prototype.type = 'AttributeHook';

},{}],95:[function(_dereq_,module,exports){
'use strict';

var EvStore = _dereq_('ev-store');

module.exports = EvHook;

function EvHook(value) {
    if (!(this instanceof EvHook)) {
        return new EvHook(value);
    }

    this.value = value;
}

EvHook.prototype.hook = function (node, propertyName) {
    var es = EvStore(node);
    var propName = propertyName.substr(3);

    es[propName] = this.value;
};

EvHook.prototype.unhook = function(node, propertyName) {
    var es = EvStore(node);
    var propName = propertyName.substr(3);

    es[propName] = undefined;
};

},{"ev-store":81}],96:[function(_dereq_,module,exports){
'use strict';

module.exports = SoftSetHook;

function SoftSetHook(value) {
    if (!(this instanceof SoftSetHook)) {
        return new SoftSetHook(value);
    }

    this.value = value;
}

SoftSetHook.prototype.hook = function (node, propertyName) {
    if (node[propertyName] !== this.value) {
        node[propertyName] = this.value;
    }
};

},{}],97:[function(_dereq_,module,exports){
'use strict';

var isArray = _dereq_('x-is-array');

var VNode = _dereq_('../vnode/vnode.js');
var VText = _dereq_('../vnode/vtext.js');
var isVNode = _dereq_('../vnode/is-vnode');
var isVText = _dereq_('../vnode/is-vtext');
var isWidget = _dereq_('../vnode/is-widget');
var isHook = _dereq_('../vnode/is-vhook');
var isVThunk = _dereq_('../vnode/is-thunk');

var parseTag = _dereq_('./parse-tag.js');
var softSetHook = _dereq_('./hooks/soft-set-hook.js');
var evHook = _dereq_('./hooks/ev-hook.js');

module.exports = h;

function h(tagName, properties, children) {
    var childNodes = [];
    var tag, props, key, namespace;

    if (!children && isChildren(properties)) {
        children = properties;
        props = {};
    }

    props = props || properties || {};
    tag = parseTag(tagName, props);

    // support keys
    if (props.hasOwnProperty('key')) {
        key = props.key;
        props.key = undefined;
    }

    // support namespace
    if (props.hasOwnProperty('namespace')) {
        namespace = props.namespace;
        props.namespace = undefined;
    }

    // fix cursor bug
    if (tag === 'INPUT' &&
        !namespace &&
        props.hasOwnProperty('value') &&
        props.value !== undefined &&
        !isHook(props.value)
    ) {
        props.value = softSetHook(props.value);
    }

    transformProperties(props);

    if (children !== undefined && children !== null) {
        addChild(children, childNodes, tag, props);
    }


    return new VNode(tag, props, childNodes, key, namespace);
}

function addChild(c, childNodes, tag, props) {
    if (typeof c === 'string') {
        childNodes.push(new VText(c));
    } else if (typeof c === 'number') {
        childNodes.push(new VText(String(c)));
    } else if (isChild(c)) {
        childNodes.push(c);
    } else if (isArray(c)) {
        for (var i = 0; i < c.length; i++) {
            addChild(c[i], childNodes, tag, props);
        }
    } else if (c === null || c === undefined) {
        return;
    } else {
        throw UnexpectedVirtualElement({
            foreignObject: c,
            parentVnode: {
                tagName: tag,
                properties: props
            }
        });
    }
}

function transformProperties(props) {
    for (var propName in props) {
        if (props.hasOwnProperty(propName)) {
            var value = props[propName];

            if (isHook(value)) {
                continue;
            }

            if (propName.substr(0, 3) === 'ev-') {
                // add ev-foo support
                props[propName] = evHook(value);
            }
        }
    }
}

function isChild(x) {
    return isVNode(x) || isVText(x) || isWidget(x) || isVThunk(x);
}

function isChildren(x) {
    return typeof x === 'string' || isArray(x) || isChild(x);
}

function UnexpectedVirtualElement(data) {
    var err = new Error();

    err.type = 'virtual-hyperscript.unexpected.virtual-element';
    err.message = 'Unexpected virtual child passed to h().\n' +
        'Expected a VNode / Vthunk / VWidget / string but:\n' +
        'got:\n' +
        errorString(data.foreignObject) +
        '.\n' +
        'The parent vnode is:\n' +
        errorString(data.parentVnode)
        '\n' +
        'Suggested fix: change your `h(..., [ ... ])` callsite.';
    err.foreignObject = data.foreignObject;
    err.parentVnode = data.parentVnode;

    return err;
}

function errorString(obj) {
    try {
        return JSON.stringify(obj, null, '    ');
    } catch (e) {
        return String(obj);
    }
}

},{"../vnode/is-thunk":102,"../vnode/is-vhook":103,"../vnode/is-vnode":104,"../vnode/is-vtext":105,"../vnode/is-widget":106,"../vnode/vnode.js":108,"../vnode/vtext.js":110,"./hooks/ev-hook.js":95,"./hooks/soft-set-hook.js":96,"./parse-tag.js":98,"x-is-array":86}],98:[function(_dereq_,module,exports){
'use strict';

var split = _dereq_('browser-split');

var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
var notClassId = /^\.|#/;

module.exports = parseTag;

function parseTag(tag, props) {
    if (!tag) {
        return 'DIV';
    }

    var noId = !(props.hasOwnProperty('id'));

    var tagParts = split(tag, classIdSplit);
    var tagName = null;

    if (notClassId.test(tagParts[1])) {
        tagName = 'DIV';
    }

    var classes, part, type, i;

    for (i = 0; i < tagParts.length; i++) {
        part = tagParts[i];

        if (!part) {
            continue;
        }

        type = part.charAt(0);

        if (!tagName) {
            tagName = part;
        } else if (type === '.') {
            classes = classes || [];
            classes.push(part.substring(1, part.length));
        } else if (type === '#' && noId) {
            props.id = part.substring(1, part.length);
        }
    }

    if (classes) {
        if (props.className) {
            classes.push(props.className);
        }

        props.className = classes.join(' ');
    }

    return props.namespace ? tagName : tagName.toUpperCase();
}

},{"browser-split":80}],99:[function(_dereq_,module,exports){
'use strict';

var DEFAULT_NAMESPACE = null;
var EV_NAMESPACE = 'http://www.w3.org/2001/xml-events';
var XLINK_NAMESPACE = 'http://www.w3.org/1999/xlink';
var XML_NAMESPACE = 'http://www.w3.org/XML/1998/namespace';

// http://www.w3.org/TR/SVGTiny12/attributeTable.html
// http://www.w3.org/TR/SVG/attindex.html
var SVG_PROPERTIES = {
    'about': DEFAULT_NAMESPACE,
    'accent-height': DEFAULT_NAMESPACE,
    'accumulate': DEFAULT_NAMESPACE,
    'additive': DEFAULT_NAMESPACE,
    'alignment-baseline': DEFAULT_NAMESPACE,
    'alphabetic': DEFAULT_NAMESPACE,
    'amplitude': DEFAULT_NAMESPACE,
    'arabic-form': DEFAULT_NAMESPACE,
    'ascent': DEFAULT_NAMESPACE,
    'attributeName': DEFAULT_NAMESPACE,
    'attributeType': DEFAULT_NAMESPACE,
    'azimuth': DEFAULT_NAMESPACE,
    'bandwidth': DEFAULT_NAMESPACE,
    'baseFrequency': DEFAULT_NAMESPACE,
    'baseProfile': DEFAULT_NAMESPACE,
    'baseline-shift': DEFAULT_NAMESPACE,
    'bbox': DEFAULT_NAMESPACE,
    'begin': DEFAULT_NAMESPACE,
    'bias': DEFAULT_NAMESPACE,
    'by': DEFAULT_NAMESPACE,
    'calcMode': DEFAULT_NAMESPACE,
    'cap-height': DEFAULT_NAMESPACE,
    'class': DEFAULT_NAMESPACE,
    'clip': DEFAULT_NAMESPACE,
    'clip-path': DEFAULT_NAMESPACE,
    'clip-rule': DEFAULT_NAMESPACE,
    'clipPathUnits': DEFAULT_NAMESPACE,
    'color': DEFAULT_NAMESPACE,
    'color-interpolation': DEFAULT_NAMESPACE,
    'color-interpolation-filters': DEFAULT_NAMESPACE,
    'color-profile': DEFAULT_NAMESPACE,
    'color-rendering': DEFAULT_NAMESPACE,
    'content': DEFAULT_NAMESPACE,
    'contentScriptType': DEFAULT_NAMESPACE,
    'contentStyleType': DEFAULT_NAMESPACE,
    'cursor': DEFAULT_NAMESPACE,
    'cx': DEFAULT_NAMESPACE,
    'cy': DEFAULT_NAMESPACE,
    'd': DEFAULT_NAMESPACE,
    'datatype': DEFAULT_NAMESPACE,
    'defaultAction': DEFAULT_NAMESPACE,
    'descent': DEFAULT_NAMESPACE,
    'diffuseConstant': DEFAULT_NAMESPACE,
    'direction': DEFAULT_NAMESPACE,
    'display': DEFAULT_NAMESPACE,
    'divisor': DEFAULT_NAMESPACE,
    'dominant-baseline': DEFAULT_NAMESPACE,
    'dur': DEFAULT_NAMESPACE,
    'dx': DEFAULT_NAMESPACE,
    'dy': DEFAULT_NAMESPACE,
    'edgeMode': DEFAULT_NAMESPACE,
    'editable': DEFAULT_NAMESPACE,
    'elevation': DEFAULT_NAMESPACE,
    'enable-background': DEFAULT_NAMESPACE,
    'end': DEFAULT_NAMESPACE,
    'ev:event': EV_NAMESPACE,
    'event': DEFAULT_NAMESPACE,
    'exponent': DEFAULT_NAMESPACE,
    'externalResourcesRequired': DEFAULT_NAMESPACE,
    'fill': DEFAULT_NAMESPACE,
    'fill-opacity': DEFAULT_NAMESPACE,
    'fill-rule': DEFAULT_NAMESPACE,
    'filter': DEFAULT_NAMESPACE,
    'filterRes': DEFAULT_NAMESPACE,
    'filterUnits': DEFAULT_NAMESPACE,
    'flood-color': DEFAULT_NAMESPACE,
    'flood-opacity': DEFAULT_NAMESPACE,
    'focusHighlight': DEFAULT_NAMESPACE,
    'focusable': DEFAULT_NAMESPACE,
    'font-family': DEFAULT_NAMESPACE,
    'font-size': DEFAULT_NAMESPACE,
    'font-size-adjust': DEFAULT_NAMESPACE,
    'font-stretch': DEFAULT_NAMESPACE,
    'font-style': DEFAULT_NAMESPACE,
    'font-variant': DEFAULT_NAMESPACE,
    'font-weight': DEFAULT_NAMESPACE,
    'format': DEFAULT_NAMESPACE,
    'from': DEFAULT_NAMESPACE,
    'fx': DEFAULT_NAMESPACE,
    'fy': DEFAULT_NAMESPACE,
    'g1': DEFAULT_NAMESPACE,
    'g2': DEFAULT_NAMESPACE,
    'glyph-name': DEFAULT_NAMESPACE,
    'glyph-orientation-horizontal': DEFAULT_NAMESPACE,
    'glyph-orientation-vertical': DEFAULT_NAMESPACE,
    'glyphRef': DEFAULT_NAMESPACE,
    'gradientTransform': DEFAULT_NAMESPACE,
    'gradientUnits': DEFAULT_NAMESPACE,
    'handler': DEFAULT_NAMESPACE,
    'hanging': DEFAULT_NAMESPACE,
    'height': DEFAULT_NAMESPACE,
    'horiz-adv-x': DEFAULT_NAMESPACE,
    'horiz-origin-x': DEFAULT_NAMESPACE,
    'horiz-origin-y': DEFAULT_NAMESPACE,
    'id': DEFAULT_NAMESPACE,
    'ideographic': DEFAULT_NAMESPACE,
    'image-rendering': DEFAULT_NAMESPACE,
    'in': DEFAULT_NAMESPACE,
    'in2': DEFAULT_NAMESPACE,
    'initialVisibility': DEFAULT_NAMESPACE,
    'intercept': DEFAULT_NAMESPACE,
    'k': DEFAULT_NAMESPACE,
    'k1': DEFAULT_NAMESPACE,
    'k2': DEFAULT_NAMESPACE,
    'k3': DEFAULT_NAMESPACE,
    'k4': DEFAULT_NAMESPACE,
    'kernelMatrix': DEFAULT_NAMESPACE,
    'kernelUnitLength': DEFAULT_NAMESPACE,
    'kerning': DEFAULT_NAMESPACE,
    'keyPoints': DEFAULT_NAMESPACE,
    'keySplines': DEFAULT_NAMESPACE,
    'keyTimes': DEFAULT_NAMESPACE,
    'lang': DEFAULT_NAMESPACE,
    'lengthAdjust': DEFAULT_NAMESPACE,
    'letter-spacing': DEFAULT_NAMESPACE,
    'lighting-color': DEFAULT_NAMESPACE,
    'limitingConeAngle': DEFAULT_NAMESPACE,
    'local': DEFAULT_NAMESPACE,
    'marker-end': DEFAULT_NAMESPACE,
    'marker-mid': DEFAULT_NAMESPACE,
    'marker-start': DEFAULT_NAMESPACE,
    'markerHeight': DEFAULT_NAMESPACE,
    'markerUnits': DEFAULT_NAMESPACE,
    'markerWidth': DEFAULT_NAMESPACE,
    'mask': DEFAULT_NAMESPACE,
    'maskContentUnits': DEFAULT_NAMESPACE,
    'maskUnits': DEFAULT_NAMESPACE,
    'mathematical': DEFAULT_NAMESPACE,
    'max': DEFAULT_NAMESPACE,
    'media': DEFAULT_NAMESPACE,
    'mediaCharacterEncoding': DEFAULT_NAMESPACE,
    'mediaContentEncodings': DEFAULT_NAMESPACE,
    'mediaSize': DEFAULT_NAMESPACE,
    'mediaTime': DEFAULT_NAMESPACE,
    'method': DEFAULT_NAMESPACE,
    'min': DEFAULT_NAMESPACE,
    'mode': DEFAULT_NAMESPACE,
    'name': DEFAULT_NAMESPACE,
    'nav-down': DEFAULT_NAMESPACE,
    'nav-down-left': DEFAULT_NAMESPACE,
    'nav-down-right': DEFAULT_NAMESPACE,
    'nav-left': DEFAULT_NAMESPACE,
    'nav-next': DEFAULT_NAMESPACE,
    'nav-prev': DEFAULT_NAMESPACE,
    'nav-right': DEFAULT_NAMESPACE,
    'nav-up': DEFAULT_NAMESPACE,
    'nav-up-left': DEFAULT_NAMESPACE,
    'nav-up-right': DEFAULT_NAMESPACE,
    'numOctaves': DEFAULT_NAMESPACE,
    'observer': DEFAULT_NAMESPACE,
    'offset': DEFAULT_NAMESPACE,
    'opacity': DEFAULT_NAMESPACE,
    'operator': DEFAULT_NAMESPACE,
    'order': DEFAULT_NAMESPACE,
    'orient': DEFAULT_NAMESPACE,
    'orientation': DEFAULT_NAMESPACE,
    'origin': DEFAULT_NAMESPACE,
    'overflow': DEFAULT_NAMESPACE,
    'overlay': DEFAULT_NAMESPACE,
    'overline-position': DEFAULT_NAMESPACE,
    'overline-thickness': DEFAULT_NAMESPACE,
    'panose-1': DEFAULT_NAMESPACE,
    'path': DEFAULT_NAMESPACE,
    'pathLength': DEFAULT_NAMESPACE,
    'patternContentUnits': DEFAULT_NAMESPACE,
    'patternTransform': DEFAULT_NAMESPACE,
    'patternUnits': DEFAULT_NAMESPACE,
    'phase': DEFAULT_NAMESPACE,
    'playbackOrder': DEFAULT_NAMESPACE,
    'pointer-events': DEFAULT_NAMESPACE,
    'points': DEFAULT_NAMESPACE,
    'pointsAtX': DEFAULT_NAMESPACE,
    'pointsAtY': DEFAULT_NAMESPACE,
    'pointsAtZ': DEFAULT_NAMESPACE,
    'preserveAlpha': DEFAULT_NAMESPACE,
    'preserveAspectRatio': DEFAULT_NAMESPACE,
    'primitiveUnits': DEFAULT_NAMESPACE,
    'propagate': DEFAULT_NAMESPACE,
    'property': DEFAULT_NAMESPACE,
    'r': DEFAULT_NAMESPACE,
    'radius': DEFAULT_NAMESPACE,
    'refX': DEFAULT_NAMESPACE,
    'refY': DEFAULT_NAMESPACE,
    'rel': DEFAULT_NAMESPACE,
    'rendering-intent': DEFAULT_NAMESPACE,
    'repeatCount': DEFAULT_NAMESPACE,
    'repeatDur': DEFAULT_NAMESPACE,
    'requiredExtensions': DEFAULT_NAMESPACE,
    'requiredFeatures': DEFAULT_NAMESPACE,
    'requiredFonts': DEFAULT_NAMESPACE,
    'requiredFormats': DEFAULT_NAMESPACE,
    'resource': DEFAULT_NAMESPACE,
    'restart': DEFAULT_NAMESPACE,
    'result': DEFAULT_NAMESPACE,
    'rev': DEFAULT_NAMESPACE,
    'role': DEFAULT_NAMESPACE,
    'rotate': DEFAULT_NAMESPACE,
    'rx': DEFAULT_NAMESPACE,
    'ry': DEFAULT_NAMESPACE,
    'scale': DEFAULT_NAMESPACE,
    'seed': DEFAULT_NAMESPACE,
    'shape-rendering': DEFAULT_NAMESPACE,
    'slope': DEFAULT_NAMESPACE,
    'snapshotTime': DEFAULT_NAMESPACE,
    'spacing': DEFAULT_NAMESPACE,
    'specularConstant': DEFAULT_NAMESPACE,
    'specularExponent': DEFAULT_NAMESPACE,
    'spreadMethod': DEFAULT_NAMESPACE,
    'startOffset': DEFAULT_NAMESPACE,
    'stdDeviation': DEFAULT_NAMESPACE,
    'stemh': DEFAULT_NAMESPACE,
    'stemv': DEFAULT_NAMESPACE,
    'stitchTiles': DEFAULT_NAMESPACE,
    'stop-color': DEFAULT_NAMESPACE,
    'stop-opacity': DEFAULT_NAMESPACE,
    'strikethrough-position': DEFAULT_NAMESPACE,
    'strikethrough-thickness': DEFAULT_NAMESPACE,
    'string': DEFAULT_NAMESPACE,
    'stroke': DEFAULT_NAMESPACE,
    'stroke-dasharray': DEFAULT_NAMESPACE,
    'stroke-dashoffset': DEFAULT_NAMESPACE,
    'stroke-linecap': DEFAULT_NAMESPACE,
    'stroke-linejoin': DEFAULT_NAMESPACE,
    'stroke-miterlimit': DEFAULT_NAMESPACE,
    'stroke-opacity': DEFAULT_NAMESPACE,
    'stroke-width': DEFAULT_NAMESPACE,
    'surfaceScale': DEFAULT_NAMESPACE,
    'syncBehavior': DEFAULT_NAMESPACE,
    'syncBehaviorDefault': DEFAULT_NAMESPACE,
    'syncMaster': DEFAULT_NAMESPACE,
    'syncTolerance': DEFAULT_NAMESPACE,
    'syncToleranceDefault': DEFAULT_NAMESPACE,
    'systemLanguage': DEFAULT_NAMESPACE,
    'tableValues': DEFAULT_NAMESPACE,
    'target': DEFAULT_NAMESPACE,
    'targetX': DEFAULT_NAMESPACE,
    'targetY': DEFAULT_NAMESPACE,
    'text-anchor': DEFAULT_NAMESPACE,
    'text-decoration': DEFAULT_NAMESPACE,
    'text-rendering': DEFAULT_NAMESPACE,
    'textLength': DEFAULT_NAMESPACE,
    'timelineBegin': DEFAULT_NAMESPACE,
    'title': DEFAULT_NAMESPACE,
    'to': DEFAULT_NAMESPACE,
    'transform': DEFAULT_NAMESPACE,
    'transformBehavior': DEFAULT_NAMESPACE,
    'type': DEFAULT_NAMESPACE,
    'typeof': DEFAULT_NAMESPACE,
    'u1': DEFAULT_NAMESPACE,
    'u2': DEFAULT_NAMESPACE,
    'underline-position': DEFAULT_NAMESPACE,
    'underline-thickness': DEFAULT_NAMESPACE,
    'unicode': DEFAULT_NAMESPACE,
    'unicode-bidi': DEFAULT_NAMESPACE,
    'unicode-range': DEFAULT_NAMESPACE,
    'units-per-em': DEFAULT_NAMESPACE,
    'v-alphabetic': DEFAULT_NAMESPACE,
    'v-hanging': DEFAULT_NAMESPACE,
    'v-ideographic': DEFAULT_NAMESPACE,
    'v-mathematical': DEFAULT_NAMESPACE,
    'values': DEFAULT_NAMESPACE,
    'version': DEFAULT_NAMESPACE,
    'vert-adv-y': DEFAULT_NAMESPACE,
    'vert-origin-x': DEFAULT_NAMESPACE,
    'vert-origin-y': DEFAULT_NAMESPACE,
    'viewBox': DEFAULT_NAMESPACE,
    'viewTarget': DEFAULT_NAMESPACE,
    'visibility': DEFAULT_NAMESPACE,
    'width': DEFAULT_NAMESPACE,
    'widths': DEFAULT_NAMESPACE,
    'word-spacing': DEFAULT_NAMESPACE,
    'writing-mode': DEFAULT_NAMESPACE,
    'x': DEFAULT_NAMESPACE,
    'x-height': DEFAULT_NAMESPACE,
    'x1': DEFAULT_NAMESPACE,
    'x2': DEFAULT_NAMESPACE,
    'xChannelSelector': DEFAULT_NAMESPACE,
    'xlink:actuate': XLINK_NAMESPACE,
    'xlink:arcrole': XLINK_NAMESPACE,
    'xlink:href': XLINK_NAMESPACE,
    'xlink:role': XLINK_NAMESPACE,
    'xlink:show': XLINK_NAMESPACE,
    'xlink:title': XLINK_NAMESPACE,
    'xlink:type': XLINK_NAMESPACE,
    'xml:base': XML_NAMESPACE,
    'xml:id': XML_NAMESPACE,
    'xml:lang': XML_NAMESPACE,
    'xml:space': XML_NAMESPACE,
    'y': DEFAULT_NAMESPACE,
    'y1': DEFAULT_NAMESPACE,
    'y2': DEFAULT_NAMESPACE,
    'yChannelSelector': DEFAULT_NAMESPACE,
    'z': DEFAULT_NAMESPACE,
    'zoomAndPan': DEFAULT_NAMESPACE
};

module.exports = SVGAttributeNamespace;

function SVGAttributeNamespace(value) {
  if (SVG_PROPERTIES.hasOwnProperty(value)) {
    return SVG_PROPERTIES[value];
  }
}

},{}],100:[function(_dereq_,module,exports){
'use strict';

var isArray = _dereq_('x-is-array');

var h = _dereq_('./index.js');


var SVGAttributeNamespace = _dereq_('./svg-attribute-namespace');
var attributeHook = _dereq_('./hooks/attribute-hook');

var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

module.exports = svg;

function svg(tagName, properties, children) {
    if (!children && isChildren(properties)) {
        children = properties;
        properties = {};
    }

    properties = properties || {};

    // set namespace for svg
    properties.namespace = SVG_NAMESPACE;

    var attributes = properties.attributes || (properties.attributes = {});

    for (var key in properties) {
        if (!properties.hasOwnProperty(key)) {
            continue;
        }

        var namespace = SVGAttributeNamespace(key);

        if (namespace === undefined) { // not a svg attribute
            continue;
        }

        var value = properties[key];

        if (typeof value !== 'string' &&
            typeof value !== 'number' &&
            typeof value !== 'boolean'
        ) {
            continue;
        }

        if (namespace !== null) { // namespaced attribute
            properties[key] = attributeHook(namespace, value);
            continue;
        }

        attributes[key] = value
        properties[key] = undefined
    }

    return h(tagName, properties, children);
}

function isChildren(x) {
    return typeof x === 'string' || isArray(x);
}

},{"./hooks/attribute-hook":94,"./index.js":97,"./svg-attribute-namespace":99,"x-is-array":86}],101:[function(_dereq_,module,exports){
var isVNode = _dereq_("./is-vnode")
var isVText = _dereq_("./is-vtext")
var isWidget = _dereq_("./is-widget")
var isThunk = _dereq_("./is-thunk")

module.exports = handleThunk

function handleThunk(a, b) {
    var renderedA = a
    var renderedB = b

    if (isThunk(b)) {
        renderedB = renderThunk(b, a)
    }

    if (isThunk(a)) {
        renderedA = renderThunk(a, null)
    }

    return {
        a: renderedA,
        b: renderedB
    }
}

function renderThunk(thunk, previous) {
    var renderedThunk = thunk.vnode

    if (!renderedThunk) {
        renderedThunk = thunk.vnode = thunk.render(previous)
    }

    if (!(isVNode(renderedThunk) ||
            isVText(renderedThunk) ||
            isWidget(renderedThunk))) {
        throw new Error("thunk did not return a valid node");
    }

    return renderedThunk
}

},{"./is-thunk":102,"./is-vnode":104,"./is-vtext":105,"./is-widget":106}],102:[function(_dereq_,module,exports){
module.exports = isThunk

function isThunk(t) {
    return t && t.type === "Thunk"
}

},{}],103:[function(_dereq_,module,exports){
module.exports = isHook

function isHook(hook) {
    return hook &&
      (typeof hook.hook === "function" && !hook.hasOwnProperty("hook") ||
       typeof hook.unhook === "function" && !hook.hasOwnProperty("unhook"))
}

},{}],104:[function(_dereq_,module,exports){
var version = _dereq_("./version")

module.exports = isVirtualNode

function isVirtualNode(x) {
    return x && x.type === "VirtualNode" && x.version === version
}

},{"./version":107}],105:[function(_dereq_,module,exports){
var version = _dereq_("./version")

module.exports = isVirtualText

function isVirtualText(x) {
    return x && x.type === "VirtualText" && x.version === version
}

},{"./version":107}],106:[function(_dereq_,module,exports){
module.exports = isWidget

function isWidget(w) {
    return w && w.type === "Widget"
}

},{}],107:[function(_dereq_,module,exports){
module.exports = "2"

},{}],108:[function(_dereq_,module,exports){
var version = _dereq_("./version")
var isVNode = _dereq_("./is-vnode")
var isWidget = _dereq_("./is-widget")
var isThunk = _dereq_("./is-thunk")
var isVHook = _dereq_("./is-vhook")

module.exports = VirtualNode

var noProperties = {}
var noChildren = []

function VirtualNode(tagName, properties, children, key, namespace) {
    this.tagName = tagName
    this.properties = properties || noProperties
    this.children = children || noChildren
    this.key = key != null ? String(key) : undefined
    this.namespace = (typeof namespace === "string") ? namespace : null

    var count = (children && children.length) || 0
    var descendants = 0
    var hasWidgets = false
    var hasThunks = false
    var descendantHooks = false
    var hooks

    for (var propName in properties) {
        if (properties.hasOwnProperty(propName)) {
            var property = properties[propName]
            if (isVHook(property) && property.unhook) {
                if (!hooks) {
                    hooks = {}
                }

                hooks[propName] = property
            }
        }
    }

    for (var i = 0; i < count; i++) {
        var child = children[i]
        if (isVNode(child)) {
            descendants += child.count || 0

            if (!hasWidgets && child.hasWidgets) {
                hasWidgets = true
            }

            if (!hasThunks && child.hasThunks) {
                hasThunks = true
            }

            if (!descendantHooks && (child.hooks || child.descendantHooks)) {
                descendantHooks = true
            }
        } else if (!hasWidgets && isWidget(child)) {
            if (typeof child.destroy === "function") {
                hasWidgets = true
            }
        } else if (!hasThunks && isThunk(child)) {
            hasThunks = true;
        }
    }

    this.count = count + descendants
    this.hasWidgets = hasWidgets
    this.hasThunks = hasThunks
    this.hooks = hooks
    this.descendantHooks = descendantHooks
}

VirtualNode.prototype.version = version
VirtualNode.prototype.type = "VirtualNode"

},{"./is-thunk":102,"./is-vhook":103,"./is-vnode":104,"./is-widget":106,"./version":107}],109:[function(_dereq_,module,exports){
var version = _dereq_("./version")

VirtualPatch.NONE = 0
VirtualPatch.VTEXT = 1
VirtualPatch.VNODE = 2
VirtualPatch.WIDGET = 3
VirtualPatch.PROPS = 4
VirtualPatch.ORDER = 5
VirtualPatch.INSERT = 6
VirtualPatch.REMOVE = 7
VirtualPatch.THUNK = 8

module.exports = VirtualPatch

function VirtualPatch(type, vNode, patch) {
    this.type = Number(type)
    this.vNode = vNode
    this.patch = patch
}

VirtualPatch.prototype.version = version
VirtualPatch.prototype.type = "VirtualPatch"

},{"./version":107}],110:[function(_dereq_,module,exports){
var version = _dereq_("./version")

module.exports = VirtualText

function VirtualText(text) {
    this.text = String(text)
}

VirtualText.prototype.version = version
VirtualText.prototype.type = "VirtualText"

},{"./version":107}],111:[function(_dereq_,module,exports){
var isObject = _dereq_("is-object")
var isHook = _dereq_("../vnode/is-vhook")

module.exports = diffProps

function diffProps(a, b) {
    var diff

    for (var aKey in a) {
        if (!(aKey in b)) {
            diff = diff || {}
            diff[aKey] = undefined
        }

        var aValue = a[aKey]
        var bValue = b[aKey]

        if (aValue === bValue) {
            continue
        } else if (isObject(aValue) && isObject(bValue)) {
            if (getPrototype(bValue) !== getPrototype(aValue)) {
                diff = diff || {}
                diff[aKey] = bValue
            } else if (isHook(bValue)) {
                 diff = diff || {}
                 diff[aKey] = bValue
            } else {
                var objectDiff = diffProps(aValue, bValue)
                if (objectDiff) {
                    diff = diff || {}
                    diff[aKey] = objectDiff
                }
            }
        } else {
            diff = diff || {}
            diff[aKey] = bValue
        }
    }

    for (var bKey in b) {
        if (!(bKey in a)) {
            diff = diff || {}
            diff[bKey] = b[bKey]
        }
    }

    return diff
}

function getPrototype(value) {
  if (Object.getPrototypeOf) {
    return Object.getPrototypeOf(value)
  } else if (value.__proto__) {
    return value.__proto__
  } else if (value.constructor) {
    return value.constructor.prototype
  }
}

},{"../vnode/is-vhook":103,"is-object":85}],112:[function(_dereq_,module,exports){
var isArray = _dereq_("x-is-array")

var VPatch = _dereq_("../vnode/vpatch")
var isVNode = _dereq_("../vnode/is-vnode")
var isVText = _dereq_("../vnode/is-vtext")
var isWidget = _dereq_("../vnode/is-widget")
var isThunk = _dereq_("../vnode/is-thunk")
var handleThunk = _dereq_("../vnode/handle-thunk")

var diffProps = _dereq_("./diff-props")

module.exports = diff

function diff(a, b) {
    var patch = { a: a }
    walk(a, b, patch, 0)
    return patch
}

function walk(a, b, patch, index) {
    if (a === b) {
        return
    }

    var apply = patch[index]
    var applyClear = false

    if (isThunk(a) || isThunk(b)) {
        thunks(a, b, patch, index)
    } else if (b == null) {

        // If a is a widget we will add a remove patch for it
        // Otherwise any child widgets/hooks must be destroyed.
        // This prevents adding two remove patches for a widget.
        if (!isWidget(a)) {
            clearState(a, patch, index)
            apply = patch[index]
        }

        apply = appendPatch(apply, new VPatch(VPatch.REMOVE, a, b))
    } else if (isVNode(b)) {
        if (isVNode(a)) {
            if (a.tagName === b.tagName &&
                a.namespace === b.namespace &&
                a.key === b.key) {
                var propsPatch = diffProps(a.properties, b.properties)
                if (propsPatch) {
                    apply = appendPatch(apply,
                        new VPatch(VPatch.PROPS, a, propsPatch))
                }
                apply = diffChildren(a, b, patch, apply, index)
            } else {
                apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
                applyClear = true
            }
        } else {
            apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
            applyClear = true
        }
    } else if (isVText(b)) {
        if (!isVText(a)) {
            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
            applyClear = true
        } else if (a.text !== b.text) {
            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
        }
    } else if (isWidget(b)) {
        if (!isWidget(a)) {
            applyClear = true
        }

        apply = appendPatch(apply, new VPatch(VPatch.WIDGET, a, b))
    }

    if (apply) {
        patch[index] = apply
    }

    if (applyClear) {
        clearState(a, patch, index)
    }
}

function diffChildren(a, b, patch, apply, index) {
    var aChildren = a.children
    var orderedSet = reorder(aChildren, b.children)
    var bChildren = orderedSet.children

    var aLen = aChildren.length
    var bLen = bChildren.length
    var len = aLen > bLen ? aLen : bLen

    for (var i = 0; i < len; i++) {
        var leftNode = aChildren[i]
        var rightNode = bChildren[i]
        index += 1

        if (!leftNode) {
            if (rightNode) {
                // Excess nodes in b need to be added
                apply = appendPatch(apply,
                    new VPatch(VPatch.INSERT, null, rightNode))
            }
        } else {
            walk(leftNode, rightNode, patch, index)
        }

        if (isVNode(leftNode) && leftNode.count) {
            index += leftNode.count
        }
    }

    if (orderedSet.moves) {
        // Reorder nodes last
        apply = appendPatch(apply, new VPatch(
            VPatch.ORDER,
            a,
            orderedSet.moves
        ))
    }

    return apply
}

function clearState(vNode, patch, index) {
    // TODO: Make this a single walk, not two
    unhook(vNode, patch, index)
    destroyWidgets(vNode, patch, index)
}

// Patch records for all destroyed widgets must be added because we need
// a DOM node reference for the destroy function
function destroyWidgets(vNode, patch, index) {
    if (isWidget(vNode)) {
        if (typeof vNode.destroy === "function") {
            patch[index] = appendPatch(
                patch[index],
                new VPatch(VPatch.REMOVE, vNode, null)
            )
        }
    } else if (isVNode(vNode) && (vNode.hasWidgets || vNode.hasThunks)) {
        var children = vNode.children
        var len = children.length
        for (var i = 0; i < len; i++) {
            var child = children[i]
            index += 1

            destroyWidgets(child, patch, index)

            if (isVNode(child) && child.count) {
                index += child.count
            }
        }
    } else if (isThunk(vNode)) {
        thunks(vNode, null, patch, index)
    }
}

// Create a sub-patch for thunks
function thunks(a, b, patch, index) {
    var nodes = handleThunk(a, b)
    var thunkPatch = diff(nodes.a, nodes.b)
    if (hasPatches(thunkPatch)) {
        patch[index] = new VPatch(VPatch.THUNK, null, thunkPatch)
    }
}

function hasPatches(patch) {
    for (var index in patch) {
        if (index !== "a") {
            return true
        }
    }

    return false
}

// Execute hooks when two nodes are identical
function unhook(vNode, patch, index) {
    if (isVNode(vNode)) {
        if (vNode.hooks) {
            patch[index] = appendPatch(
                patch[index],
                new VPatch(
                    VPatch.PROPS,
                    vNode,
                    undefinedKeys(vNode.hooks)
                )
            )
        }

        if (vNode.descendantHooks || vNode.hasThunks) {
            var children = vNode.children
            var len = children.length
            for (var i = 0; i < len; i++) {
                var child = children[i]
                index += 1

                unhook(child, patch, index)

                if (isVNode(child) && child.count) {
                    index += child.count
                }
            }
        }
    } else if (isThunk(vNode)) {
        thunks(vNode, null, patch, index)
    }
}

function undefinedKeys(obj) {
    var result = {}

    for (var key in obj) {
        result[key] = undefined
    }

    return result
}

// List diff, naive left to right reordering
function reorder(aChildren, bChildren) {
    // O(M) time, O(M) memory
    var bChildIndex = keyIndex(bChildren)
    var bKeys = bChildIndex.keys
    var bFree = bChildIndex.free

    if (bFree.length === bChildren.length) {
        return {
            children: bChildren,
            moves: null
        }
    }

    // O(N) time, O(N) memory
    var aChildIndex = keyIndex(aChildren)
    var aKeys = aChildIndex.keys
    var aFree = aChildIndex.free

    if (aFree.length === aChildren.length) {
        return {
            children: bChildren,
            moves: null
        }
    }

    // O(MAX(N, M)) memory
    var newChildren = []

    var freeIndex = 0
    var freeCount = bFree.length
    var deletedItems = 0

    // Iterate through a and match a node in b
    // O(N) time,
    for (var i = 0 ; i < aChildren.length; i++) {
        var aItem = aChildren[i]
        var itemIndex

        if (aItem.key) {
            if (bKeys.hasOwnProperty(aItem.key)) {
                // Match up the old keys
                itemIndex = bKeys[aItem.key]
                newChildren.push(bChildren[itemIndex])

            } else {
                // Remove old keyed items
                itemIndex = i - deletedItems++
                newChildren.push(null)
            }
        } else {
            // Match the item in a with the next free item in b
            if (freeIndex < freeCount) {
                itemIndex = bFree[freeIndex++]
                newChildren.push(bChildren[itemIndex])
            } else {
                // There are no free items in b to match with
                // the free items in a, so the extra free nodes
                // are deleted.
                itemIndex = i - deletedItems++
                newChildren.push(null)
            }
        }
    }

    var lastFreeIndex = freeIndex >= bFree.length ?
        bChildren.length :
        bFree[freeIndex]

    // Iterate through b and append any new keys
    // O(M) time
    for (var j = 0; j < bChildren.length; j++) {
        var newItem = bChildren[j]

        if (newItem.key) {
            if (!aKeys.hasOwnProperty(newItem.key)) {
                // Add any new keyed items
                // We are adding new items to the end and then sorting them
                // in place. In future we should insert new items in place.
                newChildren.push(newItem)
            }
        } else if (j >= lastFreeIndex) {
            // Add any leftover non-keyed items
            newChildren.push(newItem)
        }
    }

    var simulate = newChildren.slice()
    var simulateIndex = 0
    var removes = []
    var inserts = []
    var simulateItem

    for (var k = 0; k < bChildren.length;) {
        var wantedItem = bChildren[k]
        simulateItem = simulate[simulateIndex]

        // remove items
        while (simulateItem === null && simulate.length) {
            removes.push(remove(simulate, simulateIndex, null))
            simulateItem = simulate[simulateIndex]
        }

        if (!simulateItem || simulateItem.key !== wantedItem.key) {
            // if we need a key in this position...
            if (wantedItem.key) {
                if (simulateItem && simulateItem.key) {
                    // if an insert doesn't put this key in place, it needs to move
                    if (bKeys[simulateItem.key] !== k + 1) {
                        removes.push(remove(simulate, simulateIndex, simulateItem.key))
                        simulateItem = simulate[simulateIndex]
                        // if the remove didn't put the wanted item in place, we need to insert it
                        if (!simulateItem || simulateItem.key !== wantedItem.key) {
                            inserts.push({key: wantedItem.key, to: k})
                        }
                        // items are matching, so skip ahead
                        else {
                            simulateIndex++
                        }
                    }
                    else {
                        inserts.push({key: wantedItem.key, to: k})
                    }
                }
                else {
                    inserts.push({key: wantedItem.key, to: k})
                }
                k++
            }
            // a key in simulate has no matching wanted key, remove it
            else if (simulateItem && simulateItem.key) {
                removes.push(remove(simulate, simulateIndex, simulateItem.key))
            }
        }
        else {
            simulateIndex++
            k++
        }
    }

    // remove all the remaining nodes from simulate
    while(simulateIndex < simulate.length) {
        simulateItem = simulate[simulateIndex]
        removes.push(remove(simulate, simulateIndex, simulateItem && simulateItem.key))
    }

    // If the only moves we have are deletes then we can just
    // let the delete patch remove these items.
    if (removes.length === deletedItems && !inserts.length) {
        return {
            children: newChildren,
            moves: null
        }
    }

    return {
        children: newChildren,
        moves: {
            removes: removes,
            inserts: inserts
        }
    }
}

function remove(arr, index, key) {
    arr.splice(index, 1)

    return {
        from: index,
        key: key
    }
}

function keyIndex(children) {
    var keys = {}
    var free = []
    var length = children.length

    for (var i = 0; i < length; i++) {
        var child = children[i]

        if (child.key) {
            keys[child.key] = i
        } else {
            free.push(i)
        }
    }

    return {
        keys: keys,     // A hash of key name to index
        free: free      // An array of unkeyed item indices
    }
}

function appendPatch(apply, patch) {
    if (apply) {
        if (isArray(apply)) {
            apply.push(patch)
        } else {
            apply = [apply, patch]
        }

        return apply
    } else {
        return patch
    }
}

},{"../vnode/handle-thunk":101,"../vnode/is-thunk":102,"../vnode/is-vnode":104,"../vnode/is-vtext":105,"../vnode/is-widget":106,"../vnode/vpatch":109,"./diff-props":111,"x-is-array":86}],113:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bezier = _dereq_("./bezier");

var _bezier2 = _interopRequireDefault(_bezier);

var _vector = _dereq_("./vector");

var _vector2 = _interopRequireDefault(_vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Anchor = function () {
  function Anchor() {
    _classCallCheck(this, Anchor);
  }

  _createClass(Anchor, [{
    key: "add",
    value: function add(vec) {
      var a = this.copy();
      if (a.vec1) a.vec1 = a.vec1.add(vec);
      if (a.vec2) a.vec2 = a.vec2.add(vec);
      if (a.vec3) a.vec3 = a.vec3.add(vec);
      return a;
    }
  }, {
    key: "sub",
    value: function sub(vec) {
      var a = this.copy();
      if (a.vec1) a.vec1 = a.vec1.sub(vec);
      if (a.vec2) a.vec2 = a.vec2.sub(vec);
      if (a.vec3) a.vec3 = a.vec3.sub(vec);
      return a;
    }
  }, {
    key: "multiply",
    value: function multiply(scalar) {
      var a = this.copy();
      if (a.vec1) a.vec1 = a.vec1.multiply(scalar);
      if (a.vec2) a.vec2 = a.vec2.multiply(scalar);
      if (a.vec3) a.vec3 = a.vec3.multiply(scalar);
      return a;
    }
  }, {
    key: "copy",
    value: function copy() {
      var a = new Anchor();
      a.command = this.command;
      if (this.vec1) a.vec1 = this.vec1.copy();
      if (this.vec2) a.vec2 = this.vec2.copy();
      if (this.vec3) a.vec3 = this.vec3.copy();
      return a;
    }
  }, {
    key: "setMove",
    value: function setMove(x, y) {
      this.command = 'move';
      this.vec1 = new _vector2.default(x, y);
      return this;
    }
  }, {
    key: "setLine",
    value: function setLine(x, y) {
      this.command = 'line';
      this.vec1 = new _vector2.default(x, y);
      return this;
    }
  }, {
    key: "setCurve",
    value: function setCurve(a, b, c, d, e, f) {

      // cubic bezier with two control points
      if (typeof f !== 'undefined') {
        this.command = 'cubic';
        this.vec1 = new _vector2.default(a, b);
        this.vec2 = new _vector2.default(c, d);
        this.vec3 = new _vector2.default(e, f);
      }

      // quad bezier with one control point
      else {
          this.command = 'quad';
          this.vec1 = new _vector2.default(a, b);
          this.vec2 = new _vector2.default(c, d);
        }

      return this;
    }
  }, {
    key: "setClose",
    value: function setClose() {
      this.command = 'close';
      return this;
    }
  }, {
    key: "length",
    value: function length() {
      if (this.command == 'move') {
        return 0;
      } else if (this.command == 'line') {
        return this.vec1.length();
      } else if (this.command == 'quad') {
        return new _bezier2.default(0, 0, this.vec1.x, this.vec1.y, this.vec2.x, this.vec2.y).length();
      } else if (this.command == 'cubic') {
        return new _bezier2.default(0, 0, this.vec1.x, this.vec1.y, this.vec2.x, this.vec2.y, this.vec3.x, this.vec3.y).length();
      } else {
        throw new Error("Cannot compute length for this type of anchor");
      }
    }
  }, {
    key: "vectorAt",
    value: function vectorAt(scalar) {

      if (scalar > 1) scalar = 1;
      if (scalar < 0) scalar = 0;

      var ax, bx, cx;
      var ay, by, cy;
      var tSquared, tDoubled, tCubed;
      var dx, dy;

      if (this.command == 'line') {
        return new _vector2.default(this.vec1.x, this.vec1.y).multiply(scalar);
      } else if (this.command == 'quad') {
        return new _bezier2.default(0, 0, this.vec1.x, this.vec1.y, this.vec2.x, this.vec2.y).get(scalar);
      } else if (this.command == 'cubic') {
        return new _bezier2.default(0, 0, this.vec1.x, this.vec1.y, this.vec2.x, this.vec2.y, this.vec3.x, this.vec3.y).get(scalar);
      } else {
        throw new Error("Cannot compute vectorAt for this type of anchor");
      }
    }
  }]);

  return Anchor;
}();

exports.default = Anchor;

},{"./bezier":114,"./vector":132}],114:[function(_dereq_,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

// This code was extracted from Bezier.js
// A javascript Bezier curve library by Pomax.
// Based on http://pomax.github.io/bezierinfo
// http://pomax.github.io/bezierjs/

(function () {
  "use strict";

  // Math functions. I hate the Math namespace with a passion.

  var abs = Math.abs,
      min = Math.min,
      max = Math.max,
      cos = Math.cos,
      sin = Math.sin,
      acos = Math.acos,
      asin = Math.asin,
      atan2 = Math.atan2,
      sqrt = Math.sqrt,

  // cube root function yielding real roots
  crt = function crt(v) {
    if (v < 0) return -Math.pow(-v, 1 / 3);return Math.pow(v, 1 / 3);
  },
      pi = Math.PI,
      tau = 2 * pi,
      quart = pi / 2;

  // a zero coordinate, which is surprisingly useful
  var ZERO = { x: 0, y: 0, z: 0 };

  // Bezier utility functions
  var utils = {
    // Legendre-Gauss abscissae with n=24 (x_i values, defined at i=n as the roots of the nth order Legendre polynomial Pn(x))
    Tvalues: [-0.0640568928626056260850430826247450385909, 0.0640568928626056260850430826247450385909, -0.1911188674736163091586398207570696318404, 0.1911188674736163091586398207570696318404, -0.3150426796961633743867932913198102407864, 0.3150426796961633743867932913198102407864, -0.4337935076260451384870842319133497124524, 0.4337935076260451384870842319133497124524, -0.5454214713888395356583756172183723700107, 0.5454214713888395356583756172183723700107, -0.6480936519369755692524957869107476266696, 0.6480936519369755692524957869107476266696, -0.7401241915785543642438281030999784255232, 0.7401241915785543642438281030999784255232, -0.8200019859739029219539498726697452080761, 0.8200019859739029219539498726697452080761, -0.8864155270044010342131543419821967550873, 0.8864155270044010342131543419821967550873, -0.9382745520027327585236490017087214496548, 0.9382745520027327585236490017087214496548, -0.9747285559713094981983919930081690617411, 0.9747285559713094981983919930081690617411, -0.9951872199970213601799974097007368118745, 0.9951872199970213601799974097007368118745],

    // Legendre-Gauss weights with n=24 (w_i values, defined by a function linked to in the Bezier primer article)
    Cvalues: [0.1279381953467521569740561652246953718517, 0.1279381953467521569740561652246953718517, 0.1258374563468282961213753825111836887264, 0.1258374563468282961213753825111836887264, 0.1216704729278033912044631534762624256070, 0.1216704729278033912044631534762624256070, 0.1155056680537256013533444839067835598622, 0.1155056680537256013533444839067835598622, 0.1074442701159656347825773424466062227946, 0.1074442701159656347825773424466062227946, 0.0976186521041138882698806644642471544279, 0.0976186521041138882698806644642471544279, 0.0861901615319532759171852029837426671850, 0.0861901615319532759171852029837426671850, 0.0733464814110803057340336152531165181193, 0.0733464814110803057340336152531165181193, 0.0592985849154367807463677585001085845412, 0.0592985849154367807463677585001085845412, 0.0442774388174198061686027482113382288593, 0.0442774388174198061686027482113382288593, 0.0285313886289336631813078159518782864491, 0.0285313886289336631813078159518782864491, 0.0123412297999871995468056670700372915759, 0.0123412297999871995468056670700372915759],
    arcfn: function arcfn(t, derivativeFn) {
      var d = derivativeFn(t);
      var l = d.x * d.x + d.y * d.y;
      if (typeof d.z !== "undefined") {
        l += d.z * d.z;
      }
      return sqrt(l);
    },
    length: function length(derivativeFn) {
      var z = 0.5,
          sum = 0,
          len = this.Tvalues.length,
          i,
          t;
      for (i = 0; i < len; i++) {
        t = z * this.Tvalues[i] + z;
        sum += this.Cvalues[i] * this.arcfn(t, derivativeFn);
      }
      return z * sum;
    },
    angle: function angle(o, v1, v2) {
      var dx1 = v1.x - o.x,
          dy1 = v1.y - o.y,
          dx2 = v2.x - o.x,
          dy2 = v2.y - o.y,
          cross = dx1 * dy2 - dy1 * dx2,
          m1 = sqrt(dx1 * dx1 + dy1 * dy1),
          m2 = sqrt(dx2 * dx2 + dy2 * dy2),
          dot;
      dx1 /= m1;dy1 /= m1;dx2 /= m2;dy2 /= m2;
      dot = dx1 * dx2 + dy1 * dy2;
      return atan2(cross, dot);
    },
    dist: function dist(p1, p2) {
      var dx = p1.x - p2.x,
          dy = p1.y - p2.y;
      return sqrt(dx * dx + dy * dy);
    },
    align: function align(points, line) {
      var tx = line.p1.x,
          ty = line.p1.y,
          a = -atan2(line.p2.y - ty, line.p2.x - tx),
          d = function d(v) {
        return {
          x: (v.x - tx) * cos(a) - (v.y - ty) * sin(a),
          y: (v.x - tx) * sin(a) + (v.y - ty) * cos(a)
        };
      };
      return points.map(d);
    }
  };

  /**
   * Bezier curve constructor. The constructor argument can be one of three things:
   *
   * 1. array/4 of {x:..., y:..., z:...}, z optional
   * 2. numerical array/8 ordered x1,y1,x2,y2,x3,y3,x4,y4
   * 3. numerical array/12 ordered x1,y1,z1,x2,y2,z2,x3,y3,z3,x4,y4,z4
   *
   */
  var Bezier = function Bezier(coords) {
    var args = coords && coords.forEach ? coords : arguments;
    if (_typeof(args[0]) === "object") {
      args = [];
      for (var i = 0; i < coords.length; i++) {
        ['x', 'y', 'z'].forEach(function (d) {
          if (typeof coords[i][d] !== "undefined") {
            args.push(coords[i][d]);
          }
        });
      }
    }
    var len = args.length;
    if (len !== 6 && len !== 8 && len !== 9 && len !== 12) {
      console.log(coords);
      throw new Error("This Bezier curve library only supports quadratic and cubic curves (in 2d and 3d)");
    }
    var _3d = len === 9 || len === 12;
    this._3d = _3d;
    var points = [];
    for (var idx = 0, step = _3d ? 3 : 2; idx < len; idx += step) {
      var point = {
        x: args[idx],
        y: args[idx + 1]
      };
      if (_3d) {
        point.z = args[idx + 2];
      };
      points.push(point);
    }
    this.order = points.length - 1;
    this.points = points;
    var dims = ['x', 'y'];
    if (_3d) dims.push('z');
    this.dims = dims;
    this.dimlen = dims.length;
    (function (curve) {
      var a = utils.align(points, { p1: points[0], p2: points[curve.order] });
      for (var i = 0; i < a.length; i++) {
        if (abs(a[i].y) > 0.0001) {
          curve._linear = false;
          return;
        }
      }
      curve._linear = true;
    })(this);
    this._t1 = 0;
    this._t2 = 1;
    this.update();
  };

  Bezier.utils = utils;

  Bezier.prototype = {
    update: function update() {
      // one-time compute derivative coordinates
      this.dpoints = [];
      for (var p = this.points, d = p.length, c = d - 1; d > 1; d--, c--) {
        var list = [];
        for (var j = 0, dpt; j < c; j++) {
          dpt = {
            x: c * (p[j + 1].x - p[j].x),
            y: c * (p[j + 1].y - p[j].y)
          };
          if (this._3d) {
            dpt.z = c * (p[j + 1].z - p[j].z);
          }
          list.push(dpt);
        }
        this.dpoints.push(list);
        p = list;
      };
      this.computedirection();
    },
    computedirection: function computedirection() {
      var points = this.points;
      var angle = utils.angle(points[0], points[this.order], points[1]);
      this.clockwise = angle > 0;
    },
    length: function length() {
      return utils.length(this.derivative.bind(this));
    },
    get: function get(t) {
      return this.compute(t);
    },
    compute: function compute(t) {
      // shortcuts
      if (t === 0) {
        return this.points[0];
      }
      if (t === 1) {
        return this.points[this.order];
      }
      // plain computation
      var mt = 1 - t,
          mt2 = mt * mt,
          t2 = t * t,
          a,
          b,
          c,
          d = 0,
          p = this.points;
      if (this.order === 2) {
        p = [p[0], p[1], p[2], ZERO];
        a = mt2;
        b = mt * t * 2;
        c = t2;
      }
      if (this.order === 3) {
        a = mt2 * mt;
        b = mt2 * t * 3;
        c = mt * t2 * 3;
        d = t * t2;
      }
      var ret = {
        x: a * p[0].x + b * p[1].x + c * p[2].x + d * p[3].x,
        y: a * p[0].y + b * p[1].y + c * p[2].y + d * p[3].y
      };
      if (this._3d) {
        ret.z = a * p[0].z + b * p[1].z + c * p[2].z + d * p[3].z;
      }
      return ret;
    },
    derivative: function derivative(t) {
      var mt = 1 - t,
          a,
          b,
          c = 0,
          p = this.dpoints[0];
      if (this.order === 2) {
        p = [p[0], p[1], ZERO];a = mt;b = t;
      }
      if (this.order === 3) {
        a = mt * mt;b = mt * t * 2;c = t * t;
      }
      var ret = {
        x: a * p[0].x + b * p[1].x + c * p[2].x,
        y: a * p[0].y + b * p[1].y + c * p[2].y
      };
      if (this._3d) {
        ret.z = a * p[0].z + b * p[1].z + c * p[2].z;
      }
      return ret;
    }
  };

  module.exports = Bezier;
})();

},{}],115:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // This code was adapted from the brilliant color lib by MoOx
// See more here: https://github.com/MoOx/color


var _colorConvert = _dereq_('color-convert');

var _colorConvert2 = _interopRequireDefault(_colorConvert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Color = function () {
  function Color(a, b, c, d, e) {
    _classCallCheck(this, Color);

    this.values = {
      rgb: [0, 0, 0],
      hsl: [0, 0, 0],
      hsv: [0, 0, 0],
      hwb: [0, 0, 0],
      cmyk: [0, 0, 0, 0],
      alpha: 1
    };

    // COLOR
    if (a instanceof Color) {
      return a;
    }

    // HSB
    else if (a == 'hsv') {
        this.setValues('hsv', { h: b % 360, s: c, v: d });
        if (e) this.setValues('alpha', e);
      }

      // HEX
      else if (typeof a === 'string') {

          // convert HEX to RGB
          var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
          if (result) {
            this.setValues('rgb', [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]);
          } else {
            throw new Error("Unable to parse color from string \"" + a + "\"");
          }
          if (b) this.setValues('alpha', b);
        }

        // GRAYSCALE
        else if (typeof c === 'undefined') {
            this.setValues('rgb', { r: a, g: a, b: a });
            if (b) this.setValues('alpha', b);
          }

          // RGB
          else if (typeof a !== 'undefined') {
              this.setValues('rgb', { r: a, g: b, b: c });
              if (d) this.setValues('alpha', d);
            }
  }

  _createClass(Color, [{
    key: 'rgb',
    value: function rgb(vals) {
      return this.setSpace("rgb", arguments);
    }
  }, {
    key: 'hsl',
    value: function hsl(vals) {
      return this.setSpace("hsl", arguments);
    }
  }, {
    key: 'hsv',
    value: function hsv(vals) {
      return this.setSpace("hsv", arguments);
    }
  }, {
    key: 'hwb',
    value: function hwb(vals) {
      return this.setSpace("hwb", arguments);
    }
  }, {
    key: 'cmyk',
    value: function cmyk(vals) {
      return this.setSpace("cmyk", arguments);
    }
  }, {
    key: 'rgbArray',
    value: function rgbArray() {
      return this.values.rgb;
    }
  }, {
    key: 'hslArray',
    value: function hslArray() {
      return this.values.hsl;
    }
  }, {
    key: 'hsvArray',
    value: function hsvArray() {
      return this.values.hsv;
    }
  }, {
    key: 'hwbArray',
    value: function hwbArray() {
      if (this.values.alpha !== 1) {
        return this.values.hwb.concat([this.values.alpha]);
      }
      return this.values.hwb;
    }
  }, {
    key: 'cmykArray',
    value: function cmykArray() {
      return this.values.cmyk;
    }
  }, {
    key: 'rgbaArray',
    value: function rgbaArray() {
      var rgb = this.values.rgb;
      return rgb.concat([this.values.alpha]);
    }
  }, {
    key: 'hslaArray',
    value: function hslaArray() {
      var hsl = this.values.hsl;
      return hsl.concat([this.values.alpha]);
    }
  }, {
    key: 'alpha',
    value: function alpha(val) {
      if (val === undefined) {
        return this.values.alpha;
      }
      this.setValues("alpha", val);
      return this;
    }
  }, {
    key: 'red',
    value: function red(val) {
      return this.setChannel("rgb", 0, val);
    }
  }, {
    key: 'green',
    value: function green(val) {
      return this.setChannel("rgb", 1, val);
    }
  }, {
    key: 'blue',
    value: function blue(val) {
      return this.setChannel("rgb", 2, val);
    }
  }, {
    key: 'hue',
    value: function hue(val) {
      return this.setChannel("hsl", 0, val);
    }
  }, {
    key: 'saturation',
    value: function saturation(val) {
      return this.setChannel("hsl", 1, val);
    }
  }, {
    key: 'lightness',
    value: function lightness(val) {
      return this.setChannel("hsl", 2, val);
    }
  }, {
    key: 'saturationv',
    value: function saturationv(val) {
      return this.setChannel("hsv", 1, val);
    }
  }, {
    key: 'whiteness',
    value: function whiteness(val) {
      return this.setChannel("hwb", 1, val);
    }
  }, {
    key: 'blackness',
    value: function blackness(val) {
      return this.setChannel("hwb", 2, val);
    }
  }, {
    key: 'value',
    value: function value(val) {
      return this.setChannel("hsv", 2, val);
    }
  }, {
    key: 'cyan',
    value: function cyan(val) {
      return this.setChannel("cmyk", 0, val);
    }
  }, {
    key: 'magenta',
    value: function magenta(val) {
      return this.setChannel("cmyk", 1, val);
    }
  }, {
    key: 'yellow',
    value: function yellow(val) {
      return this.setChannel("cmyk", 2, val);
    }
  }, {
    key: 'black',
    value: function black(val) {
      return this.setChannel("cmyk", 3, val);
    }
  }, {
    key: 'luminosity',
    value: function luminosity() {
      // http://www.w3.org/TR/WCAG20/#relativeluminancedef
      var rgb = this.values.rgb;
      var lum = [];
      for (var i = 0; i < rgb.length; i++) {
        var chan = rgb[i] / 255;
        lum[i] = chan <= 0.03928 ? chan / 12.92 : Math.pow((chan + 0.055) / 1.055, 2.4);
      }
      return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
    }
  }, {
    key: 'contrast',
    value: function contrast(color2) {
      // http://www.w3.org/TR/WCAG20/#contrast-ratiodef
      var lum1 = this.luminosity();
      var lum2 = color2.luminosity();
      if (lum1 > lum2) {
        return (lum1 + 0.05) / (lum2 + 0.05);
      };
      return (lum2 + 0.05) / (lum1 + 0.05);
    }
  }, {
    key: 'level',
    value: function level(color2) {
      var contrastRatio = this.contrast(color2);
      return contrastRatio >= 7.1 ? 'AAA' : contrastRatio >= 4.5 ? 'AA' : '';
    }
  }, {
    key: 'dark',
    value: function dark() {
      // YIQ equation from http://24ways.org/2010/calculating-color-contrast
      var rgb = this.values.rgb,
          yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
      return yiq < 128;
    }
  }, {
    key: 'light',
    value: function light() {
      return !this.dark();
    }
  }, {
    key: 'negate',
    value: function negate() {
      var rgb = [];
      for (var i = 0; i < 3; i++) {
        rgb[i] = 255 - this.values.rgb[i];
      }
      this.setValues("rgb", rgb);
      return this;
    }
  }, {
    key: 'lighten',
    value: function lighten(ratio) {
      this.values.hsl[2] += this.values.hsl[2] * ratio;
      this.setValues("hsl", this.values.hsl);
      return this;
    }
  }, {
    key: 'darken',
    value: function darken(ratio) {
      this.values.hsl[2] -= this.values.hsl[2] * ratio;
      this.setValues("hsl", this.values.hsl);
      return this;
    }
  }, {
    key: 'saturate',
    value: function saturate(ratio) {
      this.values.hsl[1] += this.values.hsl[1] * ratio;
      this.setValues("hsl", this.values.hsl);
      return this;
    }
  }, {
    key: 'desaturate',
    value: function desaturate(ratio) {
      this.values.hsl[1] -= this.values.hsl[1] * ratio;
      this.setValues("hsl", this.values.hsl);
      return this;
    }
  }, {
    key: 'whiten',
    value: function whiten(ratio) {
      this.values.hwb[1] += this.values.hwb[1] * ratio;
      this.setValues("hwb", this.values.hwb);
      return this;
    }
  }, {
    key: 'blacken',
    value: function blacken(ratio) {
      this.values.hwb[2] += this.values.hwb[2] * ratio;
      this.setValues("hwb", this.values.hwb);
      return this;
    }
  }, {
    key: 'greyscale',
    value: function greyscale() {
      var rgb = this.values.rgb;
      // http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
      var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
      this.setValues("rgb", [val, val, val]);
      return this;
    }
  }, {
    key: 'clearer',
    value: function clearer(ratio) {
      this.setValues("alpha", this.values.alpha - this.values.alpha * ratio);
      return this;
    }
  }, {
    key: 'opaquer',
    value: function opaquer(ratio) {
      this.setValues("alpha", this.values.alpha + this.values.alpha * ratio);
      return this;
    }
  }, {
    key: 'rotate',
    value: function rotate(degrees) {
      var hue = this.values.hsl[0];
      hue = (hue + degrees) % 360;
      hue = hue < 0 ? 360 + hue : hue;
      this.values.hsl[0] = hue;
      this.setValues("hsl", this.values.hsl);
      return this;
    }

    /**
     * Ported from sass implementation in C
     * https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
     */

  }, {
    key: 'mix',
    value: function mix(mixinColor, weight) {
      var color1 = this;
      var color2 = mixinColor;
      var p = weight !== undefined ? weight : 0.5;

      var w = 2 * p - 1;
      var a = color1.alpha() - color2.alpha();

      var w1 = ((w * a == -1 ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
      var w2 = 1 - w1;

      return this.rgb(w1 * color1.red() + w2 * color2.red(), w1 * color1.green() + w2 * color2.green(), w1 * color1.blue() + w2 * color2.blue()).alpha(color1.alpha() * p + color2.alpha() * (1 - p));
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return this.rgb();
    }
  }, {
    key: 'copy',
    value: function copy() {
      return new Color().rgb(this.rgb());
    }
  }, {
    key: 'getValues',
    value: function getValues(space) {
      var vals = {};
      for (var i = 0; i < space.length; i++) {
        vals[space.charAt(i)] = this.values[space][i];
      }
      if (this.values.alpha != 1) {
        vals["a"] = this.values.alpha;
      }
      // {r: 255, g: 255, b: 255, a: 0.4}
      return vals;
    }
  }, {
    key: 'setValues',
    value: function setValues(space, vals) {

      var spaces = {
        "rgb": ["red", "green", "blue"],
        "hsl": ["hue", "saturation", "lightness"],
        "hsv": ["hue", "saturation", "value"],
        "hwb": ["hue", "whiteness", "blackness"],
        "cmyk": ["cyan", "magenta", "yellow", "black"]
      };

      var maxes = {
        "rgb": [255, 255, 255],
        "hsl": [360, 100, 100],
        "hsv": [360, 100, 100],
        "hwb": [360, 100, 100],
        "cmyk": [100, 100, 100, 100]
      };

      var alpha = 1;
      if (space == "alpha") {
        alpha = vals;
      } else if (vals.length) {
        // [10, 10, 10]
        this.values[space] = vals.slice(0, space.length);
        alpha = vals[space.length];
      } else if (vals[space.charAt(0)] !== undefined) {
        // {r: 10, g: 10, b: 10}
        for (var i = 0; i < space.length; i++) {
          this.values[space][i] = vals[space.charAt(i)];
        }
        alpha = vals.a;
      } else if (vals[spaces[space][0]] !== undefined) {
        // {red: 10, green: 10, blue: 10}
        var chans = spaces[space];
        for (var i = 0; i < space.length; i++) {
          this.values[space][i] = vals[chans[i]];
        }
        alpha = vals.alpha;
      }
      this.values.alpha = Math.max(0, Math.min(1, alpha !== undefined ? alpha : this.values.alpha));
      if (space == "alpha") {
        return;
      }

      // cap values of the space prior converting all values
      for (var i = 0; i < space.length; i++) {
        var capped = Math.max(0, Math.min(maxes[space][i], this.values[space][i]));
        this.values[space][i] = Math.round(capped);
      }

      // convert to all the other color spaces
      for (var sname in spaces) {
        if (sname != space) {
          this.values[sname] = _colorConvert2.default[space][sname](this.values[space]);
        }

        // cap values
        for (var i = 0; i < sname.length; i++) {
          var capped = Math.max(0, Math.min(maxes[sname][i], this.values[sname][i]));
          this.values[sname][i] = Math.round(capped);
        }
      }
      return true;
    }
  }, {
    key: 'setSpace',
    value: function setSpace(space, args) {
      var vals = args[0];
      if (vals === undefined) {
        // color.rgb()
        return this.getValues(space);
      }
      // color.rgb(10, 10, 10)
      if (typeof vals == "number") {
        vals = Array.prototype.slice.call(args);
      }
      this.setValues(space, vals);
      return this;
    }
  }, {
    key: 'setChannel',
    value: function setChannel(space, index, val) {
      if (val === undefined) {
        // color.red()
        return this.values[space][index];
      }
      // color.red(100)
      this.values[space][index] = val;
      this.setValues(space, this.values[space]);
      return this;
    }
  }]);

  return Color;
}();

// Modules should be accessible through Color


Color.Convert = _colorConvert2.default;

exports.default = Color;

},{"color-convert":3}],116:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Events = {

  on: function on(name, callback) {
    if (!this._events) this._events = {};
    this._events[name] = this._events[name] || [];
    this._events[name].push(callback);
    return this;
  },

  off: function off(name, callback) {
    if (this._events[name] && !callback) {
      delete this._events[name];
    } else if (this._events[name]) {
      name = this._events[name];
      var i = name.length;
      while (i--) {
        if (name[i] === callback) name.splice(i - 1, 1);
      }
    } else if (arguments.length === 0) {
      this._events = {};
    }
    return this;
  },

  trigger: function trigger(name) {
    if (this._events && this._events[name]) {
      var theseEvents = this._events[name];
      var args = arguments.length > 1 ? [arguments[1]] : [];
      var i = theseEvents.length;
      while (i--) {
        theseEvents[i].apply(this, args);
      }
    }
    return this;
  }

};

exports.default = Events;

},{}],117:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assign = _dereq_("lodash/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _defaults = _dereq_("lodash/object/defaults");

var _defaults2 = _interopRequireDefault(_defaults);

var _mixins = _dereq_("./mixins");

var _group = _dereq_("./group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Grid = function () {
  function Grid(options) {
    _classCallCheck(this, Grid);

    this.moveable();
    this.modules = [];

    var req = (0, _defaults2.default)(options || {}, {
      x: 0,
      y: 0,
      columns: 10,
      rows: 1,
      gutterWidth: 0,
      gutterHeight: 0,
      moduleWidth: 50,
      moduleHeight: 500
    });

    // if gutter is set, override gutterWidth and gutterHeight
    if (typeof req.gutter !== 'undefined') {
      req.gutterWidth = req.gutter;
      req.gutterHeight = req.gutter;
    }

    // if width is set, override moduleWidth
    if (typeof req.width !== 'undefined') {
      req.moduleWidth = (req.width - (req.columns - 1) * req.gutterWidth) / req.columns;
    } else {
      req.width = req.moduleWidth * req.columns + req.gutterWidth * (req.columns - 1);
    }

    // if height is set, override moduleWidth
    if (typeof req.height !== 'undefined') {
      req.moduleHeight = (req.height - (req.rows - 1) * req.gutterHeight) / req.rows;
    } else {
      req.height = req.moduleHeight * req.rows + req.gutterHeight * (req.rows - 1);
    }

    (0, _assign2.default)(this.vars, req);

    this.computeGrid();
  }

  _createClass(Grid, [{
    key: "add",
    value: function add(child, column, row) {

      if (!column) column = 1;
      if (!row) row = 1;

      // index is x + (y * width)
      var index = column - 1 + (row - 1) * this.vars.columns;

      if (this.modules[index]) this.modules[index].add(child);else throw new Error("Column or row does not exist");
    }
  }, {
    key: "getModule",
    value: function getModule(column, row) {

      // index is x + (y * width)
      var index = column - 1 + (row - 1) * this.vars.columns;

      if (this.modules[index]) return this.modules[index];else return undefined;
    }
  }, {
    key: "computeGrid",
    value: function computeGrid() {

      this.modules = [];

      for (var y = 0; y < this.vars.rows; y++) {
        for (var x = 0; x < this.vars.columns; x++) {

          var groupX = x * this.vars.moduleWidth + x * this.vars.gutterWidth;
          var groupY = y * this.vars.moduleHeight + y * this.vars.gutterHeight;

          this.modules.push(new _group2.default(groupX, groupY));
        }
      }
    }
  }]);

  return Grid;
}();

(0, _assign2.default)(Grid.prototype, _mixins.Shapeable, _mixins.Moveable, { type: "grid" });

exports.default = Grid;

},{"./group":118,"./mixins":119,"lodash/object/assign":70,"lodash/object/defaults":71}],118:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _without = _dereq_("lodash/array/without");

var _without2 = _interopRequireDefault(_without);

var _assign = _dereq_("lodash/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _each = _dereq_("lodash/collection/each");

var _each2 = _interopRequireDefault(_each);

var _mixins = _dereq_("./mixins");

var _utils = _dereq_("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _vector = _dereq_("./vector");

var _vector2 = _interopRequireDefault(_vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Group = function () {
  function Group(x, y) {
    _classCallCheck(this, Group);

    this.moveable();
    this.children = [];

    if (typeof x !== 'undefined') this.vars.x = x;
    if (typeof y !== 'undefined') this.vars.y = y;
  }

  _createClass(Group, [{
    key: "add",
    value: function add(child) {
      if (child.parent) child.parent.remove(child);
      this.children.push(child);
      child.parent = this;
    }
  }, {
    key: "remove",
    value: function remove(child) {
      this.children = (0, _without2.default)(this.children, child);
      child.parent = false;
    }
  }, {
    key: "copy",
    value: function copy(parent) {
      var copy = new Group();
      for (var i = 0; i < this.children.length; i++) {
        this.children[i].copy(copy);
      }
      _utils2.default.copyMixinVars(this, copy);
      _utils2.default.groupLogic(copy, this.parent, parent);
      return copy;
    }
  }, {
    key: "scale",
    value: function scale(scalar) {
      (0, _each2.default)(this.children, function (child) {
        child.vars.x *= scalar;
        child.vars.y *= scalar;
        child.scale(scalar);
      });
      return this;
    }
  }]);

  return Group;
}();

// Should we figure out a better way to do mixins for ES6?


(0, _assign2.default)(Group.prototype, _mixins.Moveable, { type: "group" });

exports.default = Group;

},{"./mixins":119,"./utils":131,"./vector":132,"lodash/array/without":6,"lodash/collection/each":7,"lodash/object/assign":70}],119:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Styleable = exports.Sizeable = exports.Moveable = undefined;

var _utils = _dereq_('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _color = _dereq_('./color');

var _color2 = _interopRequireDefault(_color);

var _vector = _dereq_('./vector');

var _vector2 = _interopRequireDefault(_vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Moveable = {

  moveable: function moveable(copy) {
    this.vars = this.vars || {};
    this.vars.x = copy ? copy.vars.x : 0;
    this.vars.y = copy ? copy.vars.y : 0;
    this.vars.rotation = copy ? copy.vars.rotation : 0;
    this.vars.rotationX = copy ? copy.vars.rotationX : 0;
    this.vars.rotationY = copy ? copy.vars.rotationY : 0;
  },

  move: function move(x, y, relative) {
    this.vars.x = relative ? this.vars.x + x : x;
    this.vars.y = relative ? this.vars.y + y : y;
    return this;
  },

  rotate: function rotate(deg, x, y, relative) {
    this.vars.rotation = deg;
    if (x || y) {
      this.vars.rotationX = x || 0;
      this.vars.rotationY = y || 0;
    }
    if (relative) {
      this.vars.rotationX += this.vars.x;
      this.vars.rotationY += this.vars.y;
    }
    return this;
  },

  addParent: function addParent(group) {
    group.add(this);
    return this;
  },

  removeParent: function removeParent() {
    if (this.parent) this.parent.remove(this);
    return this;
  },

  stagepos: function stagepos() {
    var vec = new _vector2.default(this.vars.x, this.vars.y);
    if (this.parent) {
      vec = vec.add(this.parent.stagepos());
    }
    return vec;
  }

};

var Sizeable = {

  sizeable: function sizeable(copy) {
    this.vars = this.vars || {};
    this.vars.width = copy ? copy.vars.width : 0;
    this.vars.height = copy ? copy.vars.height : 0;
  },

  scaleSizeable: function scaleSizeable(scalar) {
    this.vars.width *= scalar;
    this.vars.height *= scalar;
  }

};

var Styleable = {

  styleable: function styleable(copy) {

    this.vars = this.vars || {};
    this.vars.fill = new _color2.default(128);
    this.vars.stroke = new _color2.default(0);

    if (copy) {
      if (copy.vars.fill === false) this.vars.fill = false;else if (copy.vars.fill) this.vars.fill = copy.vars.fill.copy();

      if (copy.vars.stroke === false) this.vars.stroke = false;else if (copy.vars.stroke) this.vars.stroke = copy.vars.stroke.copy();

      if (copy.vars.strokeWidth) this.vars.strokeWidth = copy.vars.strokeWidth;
      if (copy.vars.strokeCap) this.vars.strokeCap = copy.vars.strokeCap;
      if (copy.vars.strokeJoin) this.vars.strokeJoin = copy.vars.strokeJoin;
      if (copy.vars.strokeMiterlimit) this.vars.strokeMiterlimit = copy.vars.strokeMiterlimit;
      if (copy.vars.strokeDash) this.vars.strokeDash = copy.vars.strokeDash;
      if (copy.vars.strokeDashOffset) this.vars.strokeDashOffset = copy.vars.strokeDashOffset;
    }
  },

  fill: function fill(a, b, c, d, e) {
    if (a === false) this.vars.fill = false;else this.vars.fill = new _color2.default(a, b, c, d, e);
    return this;
  },

  stroke: function stroke(a, b, c, d, e) {
    if (a === false) this.vars.stroke = false;else this.vars.stroke = new _color2.default(a, b, c, d, e);
    return this;
  },

  strokeWidth: function strokeWidth(val) {
    this.vars.strokeWidth = val;return this;
  },
  strokeCap: function strokeCap(val) {
    this.vars.strokeCap = val;return this;
  },
  strokeJoin: function strokeJoin(val) {
    this.vars.strokeJoin = val;return this;
  },
  strokeMiterlimit: function strokeMiterlimit(val) {
    this.vars.strokeMiterlimit = val;return this;
  },
  strokeDash: function strokeDash(val) {
    this.vars.strokeDash = val;return this;
  },
  strokeDashOffset: function strokeDashOffset(val) {
    this.vars.strokeDashOffset = val;return this;
  },

  scaleStyleable: function scaleStyleable(scalar) {
    if (this.vars.strokeWidth) {
      this.vars.strokeWidth *= scalar;
    } else {
      this.vars.strokeWidth = scalar;
    }
  }
};

exports.Moveable = Moveable;
exports.Sizeable = Sizeable;
exports.Styleable = Styleable;

},{"./color":115,"./utils":131,"./vector":132}],120:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _flatten = _dereq_("lodash/array/flatten");

var _flatten2 = _interopRequireDefault(_flatten);

var _each = _dereq_("lodash/collection/each");

var _each2 = _interopRequireDefault(_each);

var _map = _dereq_("lodash/collection/map");

var _map2 = _interopRequireDefault(_map);

var _circle = _dereq_("./shapes/circle");

var _circle2 = _interopRequireDefault(_circle);

var _rectangle = _dereq_("./shapes/rectangle");

var _rectangle2 = _interopRequireDefault(_rectangle);

var _line = _dereq_("./shapes/line");

var _line2 = _interopRequireDefault(_line);

var _h = _dereq_("virtual-dom/h");

var _h2 = _interopRequireDefault(_h);

var _diff = _dereq_("virtual-dom/diff");

var _diff2 = _interopRequireDefault(_diff);

var _patch = _dereq_("virtual-dom/patch");

var _patch2 = _interopRequireDefault(_patch);

var _createElement = _dereq_("virtual-dom/create-element");

var _createElement2 = _interopRequireDefault(_createElement);

var _svg = _dereq_("virtual-dom/virtual-hyperscript/svg");

var _svg2 = _interopRequireDefault(_svg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Render = function () {
  function Render(params) {
    _classCallCheck(this, Render);

    this.params = params;
    this.tree = (0, _svg2.default)('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      'xmlns:xlink': 'http://www.w3.org/1999/xlink',
      width: this.s(params.width),
      height: this.s(params.height)
    });
    this.el = (0, _createElement2.default)(this.tree);
  }

  _createClass(Render, [{
    key: "render",
    value: function render(stage, opts) {

      var newTree = (0, _svg2.default)('svg', {
        width: this.s(this.params.width),
        height: this.s(this.params.height)
      }, [this.objectsToSVG(stage.children, opts)]);

      var diffTree = (0, _diff2.default)(this.tree, newTree);
      this.el = (0, _patch2.default)(this.el, diffTree);
      this.tree = newTree;
    }

    // Shape converters
    // --------------------------------------------------

  }, {
    key: "objectToSVG",
    value: function objectToSVG(object, opts) {
      if (this[object.type + "ToSVG"]) return this[object.type + "ToSVG"](object, opts);else console.error("Rune.Render: Object not recognized", object);
    }
  }, {
    key: "objectsToSVG",
    value: function objectsToSVG(objects, opts) {
      var newObjects = [];
      for (var i = 0; i < objects.length; i++) {
        newObjects.push(this.objectToSVG(objects[i], opts));
      }
      return (0, _flatten2.default)(newObjects, true);
    }
  }, {
    key: "rectangleToSVG",
    value: function rectangleToSVG(rect) {
      var attr = {
        x: this.s(rect.vars.x),
        y: this.s(rect.vars.y),
        width: this.s(rect.vars.width),
        height: this.s(rect.vars.height)
      };
      if (rect.vars.rx) attr.rx = this.s(rect.vars.rx);
      if (rect.vars.ry) attr.ry = this.s(rect.vars.ry);
      this.transformAttribute(attr, rect);
      this.styleableAttributes(rect, attr);
      return (0, _svg2.default)('rect', attr);
    }
  }, {
    key: "ellipseToSVG",
    value: function ellipseToSVG(ellipse) {
      var attr = {
        cx: this.s(ellipse.vars.x),
        cy: this.s(ellipse.vars.y),
        rx: this.s(ellipse.vars.width / 2),
        ry: this.s(ellipse.vars.height / 2)
      };
      this.transformAttribute(attr, ellipse);
      this.styleableAttributes(ellipse, attr);
      return (0, _svg2.default)('ellipse', attr);
    }
  }, {
    key: "circleToSVG",
    value: function circleToSVG(circle) {
      var attr = {
        cx: this.s(circle.vars.x),
        cy: this.s(circle.vars.y),
        r: this.s(circle.vars.radius)
      };
      this.transformAttribute(attr, circle);
      this.styleableAttributes(circle, attr);
      return (0, _svg2.default)('circle', attr);
    }
  }, {
    key: "lineToSVG",
    value: function lineToSVG(line) {
      var attr = {
        x1: this.s(line.vars.x),
        y1: this.s(line.vars.y),
        x2: this.s(line.vars.x2),
        y2: this.s(line.vars.y2)
      };
      this.transformAttribute(attr, line);
      this.styleableAttributes(line, attr);
      return (0, _svg2.default)('line', attr);
    }
  }, {
    key: "triangleToSVG",
    value: function triangleToSVG(tri) {
      var attr = {
        points: '0 0 ' + tri.vars.x2 + ' ' + tri.vars.y2 + ' ' + tri.vars.x3 + ' ' + tri.vars.y3
      };
      this.transformAttribute(attr, tri);
      this.styleableAttributes(tri, attr);
      return (0, _svg2.default)('polygon', attr);
    }
  }, {
    key: "polygonToSVG",
    value: function polygonToSVG(polygon) {
      var attr = {
        points: (0, _map2.default)(polygon.vars.vectors, function (vec) {
          return vec.x + " " + vec.y;
        }).join(" ")
      };
      this.transformAttribute(attr, polygon);
      this.styleableAttributes(polygon, attr);
      return (0, _svg2.default)('polygon', attr);
    }
  }, {
    key: "pathToSVG",
    value: function pathToSVG(path, opts) {
      var attr = {};
      this.dAttribute(path, attr);
      this.transformAttribute(attr, path);
      this.styleableAttributes(path, attr);
      this.optionalAttributes(path, attr, {
        "fillRule": "fill-rule"
      });

      var els = [(0, _svg2.default)('path', attr)];

      if (opts && opts.debug) els = els.concat(this.debugPathToSVG(path));
      return els;
    }
  }, {
    key: "textToSVG",
    value: function textToSVG(text, opts) {
      var attr = {
        x: this.s(text.vars.x),
        y: this.s(text.vars.y)
      };
      this.transformAttribute(attr, text);
      this.styleableAttributes(text, attr);

      // attributes that need specific handling
      if (text.vars.textAlign) {
        var translate = { "left": "start", "center": "middle", "right": "end" };
        attr["text-anchor"] = translate[text.vars.textAlign];
      }

      this.optionalAttributes(text, attr, {
        "fontFamily": "font-family",
        "textAlign": "text-align",
        "fontStyle": "font-style",
        "fontWeight": "font-weight",
        "fontSize": "font-size",
        "letterSpacing": "letter-spacing",
        "textDecoration": "text-decoration"
      });

      if (text.vars.textAlign) {
        var translate = { "left": "start", "center": "middle", "right": "end" };
        attr["text-anchor"] = translate[text.vars.textAlign];
      }

      return (0, _svg2.default)('text', attr, text.vars.text);
    }
  }, {
    key: "imageToSVG",
    value: function imageToSVG(img) {
      var attr = {
        "xlink:href": this.s(img.vars.url),
        x: this.s(img.vars.x),
        y: this.s(img.vars.y)
      };
      this.optionalAttributes(img, attr, {
        "width": "width",
        "height": "height"
      });
      this.transformAttribute(attr, img);
      return (0, _svg2.default)('image', attr);
    }
  }, {
    key: "groupToSVG",
    value: function groupToSVG(group, opts) {
      if (!group.children || group.children.length == 0) return;
      var attr = {};
      this.transformAttribute(attr, group);
      return (0, _svg2.default)('g', attr, this.objectsToSVG(group.children, opts));
    }
  }, {
    key: "gridToSVG",
    value: function gridToSVG(grid, opts) {
      var attr = {};
      this.transformAttribute(attr, grid);
      var groups = this.objectsToSVG(grid.modules);
      if (opts && opts.debug) groups = groups.concat(this.debugGridToSVG(grid));

      return (0, _svg2.default)('g', attr, (0, _flatten2.default)(groups, true));
    }

    // Multiple attributes
    // --------------------------------------------------

  }, {
    key: "optionalAttributes",
    value: function optionalAttributes(object, attr, keys) {
      (0, _each2.default)(keys, function (attribute, variable) {
        if (object.vars[variable]) {
          attr[attribute] = this.s(object.vars[variable]);
        }
      }, this);
    }
  }, {
    key: "sizeableAttributes",
    value: function sizeableAttributes(object, attr) {
      attr.width = this.s(object.vars.width);
      attr.height = this.s(object.vars.height);
    }
  }, {
    key: "styleableAttributes",
    value: function styleableAttributes(object, attr) {

      if (object.vars.fill === false) attr.fill = "none";else if (object.vars.fill) {
        attr.fill = "rgb(" + object.vars.fill.values.rgb[0] + ", " + object.vars.fill.values.rgb[1] + ", " + object.vars.fill.values.rgb[2] + ")";
        var alpha = object.vars.fill.values.alpha;
        if (alpha < 1) attr["fill-opacity"] = this.s(alpha);
      }

      if (object.vars.stroke === false) attr.stroke = "none";else if (object.vars.stroke) {
        attr.stroke = "rgb(" + object.vars.stroke.values.rgb[0] + ", " + object.vars.stroke.values.rgb[1] + ", " + object.vars.stroke.values.rgb[2] + ")";
        var alpha = object.vars.stroke.values.alpha;
        if (alpha < 1) attr["stroke-opacity"] = this.s(alpha);
      }

      if (object.vars.strokeWidth) attr["stroke-width"] = this.s(object.vars.strokeWidth);
      if (object.vars.strokeCap) attr["stroke-linecap"] = object.vars.strokeCap;
      if (object.vars.strokeJoin) attr["stroke-linejoin"] = object.vars.strokeJoin;
      if (object.vars.strokeMiterlimit) attr["stroke-miterlimit"] = this.s(object.vars.strokeMiterlimit);
      if (object.vars.strokeDash) attr["stroke-dasharray"] = object.vars.strokeDash;
      if (object.vars.strokeDashOffset) attr["stroke-dashoffset"] = this.s(object.vars.strokeDashOffset);
    }

    // Single attributes
    // --------------------------------------------------

  }, {
    key: "transformAttribute",
    value: function transformAttribute(attr, shape) {

      var vars = shape.vars;
      var strings = [];

      if (vars.rotation) {
        var rot = "rotate(" + vars.rotation;
        if (vars.rotationX || vars.rotationY) rot += " " + vars.rotationX + " " + vars.rotationY;
        strings.push(rot + ")");
      }

      if ((shape.type == "group" || shape.type == "path" || shape.type == "polygon" || shape.type == "grid" || shape.type == "triangle") && (vars.x || vars.y)) {
        strings.push("translate(" + vars.x + " " + vars.y + ")");
      }

      if (strings.length > 0) attr.transform = strings.join(" ").trim();
    }
  }, {
    key: "dAttribute",
    value: function dAttribute(object, attr) {
      attr.d = (0, _map2.default)(object.vars.anchors, function (a) {

        if (a.command == 'move') {
          return (a.relative ? "m" : "M") + " " + [a.vec1.x, a.vec1.y].join(' ');
        } else if (a.command == 'line') {
          return (a.relative ? "l" : "L") + " " + [a.vec1.x, a.vec1.y].join(' ');
        } else if (a.command == 'cubic') {
          return (a.relative ? "c" : "C") + " " + [a.vec1.x, a.vec1.y, a.vec2.x, a.vec2.y, a.vec3.x, a.vec3.y].join(' ');
        } else if (a.command == 'quad' && typeof a.vec2 !== 'undefined') {
          return (a.relative ? "q" : "Q") + " " + [a.vec1.x, a.vec1.y, a.vec2.x, a.vec2.y].join(' ');
        } else if (a.command == 'quad') {
          return (a.relative ? "t" : "T") + " " + [a.vec1.x, a.vec1.y].join(' ');
        } else if (a.command == 'close') {
          return "Z";
        }
      }).join(" ").trim();
    }

    // Debug
    // --------------------------------------------------

  }, {
    key: "debugPathToSVG",
    value: function debugPathToSVG(path) {

      var t = this;
      var els = [];

      (0, _each2.default)(path.vars.anchors, function (a, i) {
        if (a.command == 'cubic') {
          els.push(t.debugLine(path.vars.x + a.vec1.x, path.vars.y + a.vec1.y, path.vars.x + a.vec3.x, path.vars.y + a.vec3.y));
          els.push(t.debugLine(path.vars.x + a.vec2.x, path.vars.y + a.vec2.y, path.vars.x + a.vec3.x, path.vars.y + a.vec3.y));
          for (var i = 1; i < 4; i++) {
            els.push(t.debugCircle(path.vars.x + a["vec" + i].x, path.vars.y + a["vec" + i].y));
          }
        } else if (a.command == 'quad' && typeof a.vec2 !== 'undefined') {
          els.push(t.debugLine(path.vars.x + a.vec1.x, path.vars.y + a.vec1.y, path.vars.x + a.vec2.x, path.vars.y + a.vec2.y));
          for (var i = 1; i < 3; i++) {
            els.push(t.debugCircle(path.vars.x + a["vec" + i].x, path.vars.y + a["vec" + i].y));
          }
        }
      });

      return els;
    }
  }, {
    key: "debugGridToSVG",
    value: function debugGridToSVG(grid) {

      var t = this;
      var els = [];

      // draw container rect
      els.push(this.debugRect(0, 0, grid.vars.width, grid.vars.height));

      // draw lines for columns
      var x = 0;
      for (var i = 0; i < grid.vars.columns - 1; i++) {
        x += grid.vars.moduleWidth;
        els.push(this.debugLine(x, 0, x, grid.vars.height));
        x += grid.vars.gutterWidth;
        els.push(this.debugLine(x, 0, x, grid.vars.height));
      }

      // draw lines for rows
      var y = 0;
      for (var i = 0; i < grid.vars.rows - 1; i++) {
        y += grid.vars.moduleHeight;
        els.push(this.debugLine(0, y, grid.vars.width, y));
        y += grid.vars.gutterHeight;
        els.push(this.debugLine(0, y, grid.vars.width, y));
      }

      return els;
    }
  }, {
    key: "debugCircle",
    value: function debugCircle(x, y) {
      var c = new _circle2.default(x, y, 4).fill(212, 18, 229).stroke(false);
      return this.circleToSVG(c);
    }
  }, {
    key: "debugRect",
    value: function debugRect(x, y, width, height) {
      var r = new _rectangle2.default(x, y, width, height).stroke(212, 18, 229).fill(false);
      return this.rectangleToSVG(r);
    }
  }, {
    key: "debugLine",
    value: function debugLine(x1, y1, x2, y2) {
      var l = new _line2.default(x1, y1, x2, y2).stroke(212, 18, 229);
      return this.lineToSVG(l);
    }

    // Helpers
    // --------------------------------------------------

    // function to turn any non-string into a string. We need
    // this when running server-side node.

  }, {
    key: "s",
    value: function s(val) {
      if (typeof val !== 'string' && typeof val.toString !== 'undefined') return val.toString();
      return val;
    }
  }]);

  return Render;
}();

exports.default = Render;

},{"./shapes/circle":122,"./shapes/line":125,"./shapes/rectangle":128,"lodash/array/flatten":4,"lodash/collection/each":7,"lodash/collection/map":9,"virtual-dom/create-element":77,"virtual-dom/diff":78,"virtual-dom/h":79,"virtual-dom/patch":87,"virtual-dom/virtual-hyperscript/svg":100}],121:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _defaults = _dereq_("lodash/object/defaults");

var _defaults2 = _interopRequireDefault(_defaults);

var _assign = _dereq_("lodash/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _each = _dereq_("lodash/collection/each");

var _each2 = _interopRequireDefault(_each);

var _vector = _dereq_("./vector");

var _vector2 = _interopRequireDefault(_vector);

var _anchor = _dereq_("./anchor");

var _anchor2 = _interopRequireDefault(_anchor);

var _color = _dereq_("./color");

var _color2 = _interopRequireDefault(_color);

var _group = _dereq_("./group");

var _group2 = _interopRequireDefault(_group);

var _grid = _dereq_("./grid");

var _grid2 = _interopRequireDefault(_grid);

var _utils = _dereq_("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _events = _dereq_("./events");

var _events2 = _interopRequireDefault(_events);

var _render = _dereq_("./render");

var _render2 = _interopRequireDefault(_render);

var _circle = _dereq_("./shapes/circle");

var _circle2 = _interopRequireDefault(_circle);

var _ellipse = _dereq_("./shapes/ellipse");

var _ellipse2 = _interopRequireDefault(_ellipse);

var _line = _dereq_("./shapes/line");

var _line2 = _interopRequireDefault(_line);

var _triangle = _dereq_("./shapes/triangle");

var _triangle2 = _interopRequireDefault(_triangle);

var _path = _dereq_("./shapes/path");

var _path2 = _interopRequireDefault(_path);

var _polygon = _dereq_("./shapes/polygon");

var _polygon2 = _interopRequireDefault(_polygon);

var _rectangle = _dereq_("./shapes/rectangle");

var _rectangle2 = _interopRequireDefault(_rectangle);

var _text = _dereq_("./shapes/text");

var _text2 = _interopRequireDefault(_text);

var _image = _dereq_("./shapes/image");

var _image2 = _interopRequireDefault(_image);

var _mixins = _dereq_("./mixins");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rune = function () {
  function Rune(options) {
    _classCallCheck(this, Rune);

    var params = (0, _defaults2.default)(options || {}, {
      width: 640,
      height: 480,
      debug: false,
      frameRate: 60
    });

    this.width = params.width;
    this.height = params.height;
    this.renderer = new _render2.default(params);
    this.stage = new _group2.default();
    this.debug = params.debug;
    this.frameCount = 1;
    this.frameRate = params.frameRate;

    if (params.container && typeof window !== 'undefined') {

      if (typeof params.container === 'string') {
        params.container = document.querySelector(params.container);
      }

      if (params.container) {
        this.appendTo(params.container);
      } else {
        console.error("Container element not found");
      }
    }

    this.initEvents();
  }

  // Events
  // --------------------------------------------------

  _createClass(Rune, [{
    key: "initEvents",
    value: function initEvents() {

      // Specific browser events
      if (typeof window !== 'undefined') {
        this.initMouseEvents();
      }
    }
  }, {
    key: "relativePos",
    value: function relativePos(pageX, pageY) {
      var bounds = this.renderer.el.getBoundingClientRect();
      var relX = pageX - bounds.left;
      var relY = pageY - bounds.top;
      return { x: relX, y: relY };
    }
  }, {
    key: "initMouseEvents",
    value: function initMouseEvents() {
      var mouseEvents = ['mousemove', 'mousedown', 'mouseup', 'click'];
      (0, _each2.default)(mouseEvents, function (mouseEvent) {
        var that = this;
        this.renderer.el.addEventListener(mouseEvent, function (e) {
          var rel = that.relativePos(e.pageX, e.pageY);
          that.trigger(mouseEvent, { x: rel.x, y: rel.y });
        });
      }, this);
    }

    // Shape functions
    // --------------------------------------------------

  }, {
    key: "group",
    value: function group(x, y, parent) {
      var g = new _group2.default(x, y);
      _utils2.default.groupLogic(g, this.stage, parent);
      return g;
    }
  }, {
    key: "triangle",
    value: function triangle(x, y, x2, y2, x3, y3, parent) {
      var t = new _triangle2.default(x, y, x2, y2, x3, y3);
      _utils2.default.groupLogic(t, this.stage, parent);
      return t;
    }
  }, {
    key: "rect",
    value: function rect(x, y, width, height, parent) {
      var r = new _rectangle2.default(x, y, width, height);
      _utils2.default.groupLogic(r, this.stage, parent);
      return r;
    }
  }, {
    key: "ellipse",
    value: function ellipse(x, y, width, height, parent) {
      var e = new _ellipse2.default(x, y, width, height);
      _utils2.default.groupLogic(e, this.stage, parent);
      return e;
    }
  }, {
    key: "circle",
    value: function circle(x, y, radius, parent) {
      var c = new _circle2.default(x, y, radius);
      _utils2.default.groupLogic(c, this.stage, parent);
      return c;
    }
  }, {
    key: "line",
    value: function line(x1, y1, x2, y2, parent) {
      var l = new _line2.default(x1, y1, x2, y2);
      _utils2.default.groupLogic(l, this.stage, parent);
      return l;
    }
  }, {
    key: "polygon",
    value: function polygon(x, y, parent) {
      var p = new _polygon2.default(x, y);
      _utils2.default.groupLogic(p, this.stage, parent);
      return p;
    }
  }, {
    key: "path",
    value: function path(x, y, parent) {
      var p = new _path2.default(x, y);
      _utils2.default.groupLogic(p, this.stage, parent);
      return p;
    }
  }, {
    key: "text",
    value: function text(textString, x, y, parent) {
      var t = new _text2.default(textString, x, y);
      _utils2.default.groupLogic(t, this.stage, parent);
      return t;
    }
  }, {
    key: "image",
    value: function image(url, x, y, width, height, parent) {
      var i = new _image2.default(url, x, y, width, height);
      _utils2.default.groupLogic(i, this.stage, parent);
      return i;
    }
  }, {
    key: "grid",
    value: function grid(options, parent) {
      var g = new _grid2.default(options);
      _utils2.default.groupLogic(g, this.stage, parent);
      return g;
    }

    // Playhead
    // --------------------------------------------------

    // This function is a proxy function that is run on every frame
    // It has a check that delays the frame with a setTimeout if
    // the framerate is lower than 60 fps.

  }, {
    key: "play",
    value: function play() {

      if (this.pauseNext) {
        this.pauseNext = false;
        return;
      }

      if (this.frameRate >= 60) {
        this.playNow();
      } else {
        var that = this;
        setTimeout(function () {
          that.playNow();
        }, 1000 / this.frameRate);
      }
    }
  }, {
    key: "playNow",
    value: function playNow() {
      var that = this;
      this.trigger('draw', { frameCount: this.frameCount });
      this.animationFrame = requestAnimationFrame(function () {
        that.play();
      });
      this.draw();
    }
  }, {
    key: "pause",
    value: function pause() {
      this.pauseNext = true;
    }

    // Render functions
    // --------------------------------------------------

  }, {
    key: "getEl",
    value: function getEl() {
      return this.renderer.el;
    }
  }, {
    key: "appendTo",
    value: function appendTo(container) {
      container.appendChild(this.renderer.el);
      return this;
    }
  }, {
    key: "draw",
    value: function draw() {
      this.renderer.render(this.stage, { debug: this.debug });
      this.frameCount += 1;
    }
  }]);

  return Rune;
}();

(0, _assign2.default)(Rune, _utils2.default);
(0, _assign2.default)(Rune.prototype, _events2.default);

// Modules should be accessible through Rune
Rune.Vector = _vector2.default;
Rune.Anchor = _anchor2.default;
Rune.Color = _color2.default;
Rune.Group = _group2.default;
Rune.Grid = _grid2.default;
Rune.Circle = _circle2.default;
Rune.Ellipse = _ellipse2.default;
Rune.Line = _line2.default;
Rune.Triangle = _triangle2.default;
Rune.Path = _path2.default;
Rune.Polygon = _polygon2.default;
Rune.Rectangle = _rectangle2.default;
Rune.Text = _text2.default;
Rune.Image = _image2.default;

// Right now I need these for mixin tests.
// Rewrite so we don't need them.
Rune.Moveable = _mixins.Moveable;
Rune.Styleable = _mixins.Styleable;
Rune.Sizeable = _mixins.Sizeable;

module.exports = Rune;

},{"./anchor":113,"./color":115,"./events":116,"./grid":117,"./group":118,"./mixins":119,"./render":120,"./shapes/circle":122,"./shapes/ellipse":123,"./shapes/image":124,"./shapes/line":125,"./shapes/path":126,"./shapes/polygon":127,"./shapes/rectangle":128,"./shapes/text":129,"./shapes/triangle":130,"./utils":131,"./vector":132,"lodash/collection/each":7,"lodash/object/assign":70,"lodash/object/defaults":71}],122:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assign = _dereq_("lodash/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _mixins = _dereq_("../mixins");

var _ellipse = _dereq_("./ellipse");

var _ellipse2 = _interopRequireDefault(_ellipse);

var _utils = _dereq_("../utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Circle = function () {
  function Circle(x, y, radius) {
    _classCallCheck(this, Circle);

    this.moveable();
    this.styleable();

    this.vars.x = x;
    this.vars.y = y;
    this.vars.radius = radius;
  }

  _createClass(Circle, [{
    key: "toPolygon",
    value: function toPolygon(opts, parent) {
      var ellipse = new _ellipse2.default(this.vars.x, this.vars.y, this.vars.radius * 2, this.vars.radius * 2);
      var poly = ellipse.toPolygon(opts, false);
      _utils2.default.copyMixinVars(this, poly);
      _utils2.default.groupLogic(poly, this.parent, parent);
      return poly;
    }
  }, {
    key: "scale",
    value: function scale(scalar) {
      this.scaleStyleable(scalar);
      this.vars.radius *= scalar;
      return this;
    }
  }, {
    key: "copy",
    value: function copy(parent) {
      var copy = new Circle();
      copy.vars.radius = this.vars.radius;
      _utils2.default.copyMixinVars(this, copy);
      _utils2.default.groupLogic(copy, this.parent, parent);
      return copy;
    }
  }]);

  return Circle;
}();

// Should we figure out a better way to do mixins for ES6?


(0, _assign2.default)(Circle.prototype, _mixins.Moveable, _mixins.Styleable, { type: "circle" });

exports.default = Circle;

},{"../mixins":119,"../utils":131,"./ellipse":123,"lodash/object/assign":70}],123:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assign = _dereq_("lodash/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _mixins = _dereq_("../mixins");

var _polygon = _dereq_("./polygon");

var _polygon2 = _interopRequireDefault(_polygon);

var _utils = _dereq_("../utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ellipse = function () {
  function Ellipse(x, y, width, height) {
    _classCallCheck(this, Ellipse);

    this.moveable();
    this.sizeable();
    this.styleable();
    this.vars.x = x;
    this.vars.y = y;
    this.vars.width = width;
    this.vars.height = height;
  }

  _createClass(Ellipse, [{
    key: "toPolygon",
    value: function toPolygon(opts, parent) {

      var numVectors = 16;

      // if we're calculating the number of vectors based on spacing
      // find circumference and divide by spacing.
      if (opts && opts.spacing) {
        var circumference = Math.PI * (this.vars.width + this.vars.height);
        numVectors = circumference / opts.spacing;
      }

      var vectorAngle = 360 / numVectors;

      var poly = new _polygon2.default(this.vars.x, this.vars.y);
      for (var i = 0; i < numVectors; i++) {
        var x = Math.cos(_utils2.default.radians(i * vectorAngle)) * this.vars.width;
        var y = Math.sin(_utils2.default.radians(i * vectorAngle)) * this.vars.height;
        poly.lineTo(x, y);
      }

      _utils2.default.copyMixinVars(this, poly);
      _utils2.default.groupLogic(poly, this.parent, parent);

      return poly;
    }
  }, {
    key: "scale",
    value: function scale(scalar) {
      this.scaleSizeable(scalar);
      this.scaleStyleable(scalar);
      return this;
    }
  }, {
    key: "copy",
    value: function copy(parent) {
      var copy = new Ellipse();
      _utils2.default.copyMixinVars(this, copy);
      _utils2.default.groupLogic(copy, this.parent, parent);
      return copy;
    }
  }]);

  return Ellipse;
}();

// Should we figure out a better way to do mixins for ES6?


(0, _assign2.default)(Ellipse.prototype, _mixins.Moveable, _mixins.Sizeable, _mixins.Styleable, { type: "ellipse" });

exports.default = Ellipse;

},{"../mixins":119,"../utils":131,"./polygon":127,"lodash/object/assign":70}],124:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assign = _dereq_("lodash/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _mixins = _dereq_("../mixins");

var _utils = _dereq_("../utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Image = function () {
  function Image(url, x, y, width, height) {
    _classCallCheck(this, Image);

    this.moveable();
    this.sizeable();
    this.vars.url = url;
    this.vars.x = x;
    this.vars.y = y;
    this.vars.width = width;
    this.vars.height = height;
  }

  _createClass(Image, [{
    key: "scale",
    value: function scale(scalar) {
      this.scaleSizeable(scalar);
      return this;
    }
  }, {
    key: "copy",
    value: function copy(parent) {
      var copy = new Image();
      copy.vars.url = this.vars.url;
      _utils2.default.copyMixinVars(this, copy);
      _utils2.default.groupLogic(copy, this.parent, parent);
      return copy;
    }
  }]);

  return Image;
}();

// Should we figure out a better way to do mixins for ES6?


(0, _assign2.default)(Image.prototype, _mixins.Moveable, _mixins.Sizeable, { type: "image" });

exports.default = Image;

},{"../mixins":119,"../utils":131,"lodash/object/assign":70}],125:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assign = _dereq_("lodash/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _mixins = _dereq_("../mixins");

var _vector = _dereq_("../vector");

var _vector2 = _interopRequireDefault(_vector);

var _utils = _dereq_("../utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Line = function () {
  function Line(x, y, x2, y2) {
    _classCallCheck(this, Line);

    this.moveable();
    this.styleable();
    this.vars.x = x;
    this.vars.y = y;
    this.vars.x2 = x2;
    this.vars.y2 = y2;
  }

  _createClass(Line, [{
    key: "copy",
    value: function copy(parent) {
      var copy = new Line();
      copy.vars.x2 = this.vars.x2;
      copy.vars.y2 = this.vars.y2;
      _utils2.default.copyMixinVars(this, copy);
      _utils2.default.groupLogic(copy, this.parent, parent);
      return copy;
    }
  }, {
    key: "scale",
    value: function scale(scalar) {
      this.scaleStyleable(scalar);
      var start = new _vector2.default(this.vars.x, this.vars.y);
      var end = new _vector2.default(this.vars.x2, this.vars.y2);
      var vec = end.sub(start).multiply(scalar).add(start);
      this.vars.x2 = vec.x;
      this.vars.y2 = vec.y;
      return this;
    }
  }]);

  return Line;
}();

(0, _assign2.default)(Line.prototype, _mixins.Moveable, _mixins.Styleable, { type: "line" });

exports.default = Line;

},{"../mixins":119,"../utils":131,"../vector":132,"lodash/object/assign":70}],126:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _each = _dereq_("lodash/collection/each");

var _each2 = _interopRequireDefault(_each);

var _map = _dereq_("lodash/collection/map");

var _map2 = _interopRequireDefault(_map);

var _assign = _dereq_("lodash/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _mixins = _dereq_("../mixins");

var _anchor = _dereq_("../anchor");

var _anchor2 = _interopRequireDefault(_anchor);

var _vector = _dereq_("../vector");

var _vector2 = _interopRequireDefault(_vector);

var _polygon = _dereq_("./polygon");

var _polygon2 = _interopRequireDefault(_polygon);

var _utils = _dereq_("../utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Path = function () {
  function Path(x, y) {
    _classCallCheck(this, Path);

    this.moveable();
    this.styleable();
    this.vars.anchors = [];
    if (typeof x !== 'undefined') this.vars.x = x;
    if (typeof y !== 'undefined') this.vars.y = y;
  }

  _createClass(Path, [{
    key: "moveTo",
    value: function moveTo(x, y) {
      this.vars.anchors.push(new _anchor2.default().setMove(x, y));
      return this;
    }
  }, {
    key: "lineTo",
    value: function lineTo(x, y) {
      this.checkStartMove();
      this.vars.anchors.push(new _anchor2.default().setLine(x, y));
      return this;
    }
  }, {
    key: "curveTo",
    value: function curveTo(a, b, c, d, e, f) {
      this.checkStartMove();
      this.vars.anchors.push(new _anchor2.default().setCurve(a, b, c, d, e, f));
      return this;
    }
  }, {
    key: "closePath",
    value: function closePath() {
      this.checkStartMove();
      this.vars.anchors.push(new _anchor2.default().setClose());
      return this;
    }
  }, {
    key: "startVector",
    value: function startVector() {
      return this.vars.anchors[0] && this.vars.anchors[0].command == 'move' ? this.vars.anchors[0].vec1.copy() : new _vector2.default(0, 0);
    }
  }, {
    key: "subpaths",
    value: function subpaths(parent) {
      var subs = [];
      var lastSplit = 0;

      (0, _each2.default)(this.vars.anchors, function (anchor, i) {

        var isMove = anchor.command == 'move';
        var isAfterClose = this.vars.anchors[i - 1] && this.vars.anchors[i - 1].command == 'close';
        var isLast = i == this.vars.anchors.length - 1;

        if (i > lastSplit && (isMove || isAfterClose || isLast)) {
          if (isLast) i++;
          var sub = this.copy(parent);
          sub.vars.anchors = sub.vars.anchors.slice(lastSplit, i);
          subs.push(sub);
          lastSplit = i;
        }
      }, this);
      return subs;
    }
  }, {
    key: "length",
    value: function length() {

      var len = 0;
      var paths = this.subpaths(false);

      for (var p = 0; p < paths.length; p++) {

        var anchors = paths[p].vars.anchors;

        // find length of all anchors in subpath.
        // if last stop is close, use beginning
        for (var i = 0; i < anchors.length - 1; i++) {
          var start = anchors[i];
          var startVec = start.vec3 || start.vec2 || start.vec1;
          var stop = anchors[i + 1];

          // if stop is a close command, replace close anchor
          // with vector of first point in path.
          if (stop.command == 'close') {
            stop = paths[p].startVector();
          }

          var rel = stop.sub(startVec);
          len += rel.length();
        }
      }

      return len;
    }
  }, {
    key: "vectorAtLength",
    value: function vectorAtLength(len) {
      var tmpLen = 0;
      var paths = this.subpaths(false);

      for (var p = 0; p < paths.length; p++) {

        var anchors = paths[p].vars.anchors;

        // find length of all anchors in subpath.
        // if last stop is close, use beginning
        for (var i = 0; i < anchors.length - 1; i++) {
          var start = anchors[i];
          var startVec = start.vec3 || start.vec2 || start.vec1;
          var stop = anchors[i + 1];

          // if stop is a close command, replace close anchor
          // with vector of first point in path.
          if (stop.command == 'close') {
            var beginning = paths[p].startVector();
            stop = new _anchor2.default().setLine(beginning.x, beginning.y);
          }

          var vec = stop.sub(startVec);
          var veclen = vec.length();

          if (tmpLen + veclen > len) {
            var remaining = len - tmpLen;
            return startVec.add(vec.vectorAt(remaining / veclen));
          }

          tmpLen += veclen;
        }
      }

      return this.startVector();
    }
  }, {
    key: "vectorAt",
    value: function vectorAt(scalar) {
      return this.vectorAtLength(this.length() * scalar);
    }
  }, {
    key: "toPolygons",
    value: function toPolygons(opts, parent) {

      var paths = this.subpaths(false);
      var polys = [];

      // if splitting the path into vectors with equal spacing
      if (opts && opts.spacing) {

        (0, _each2.default)(paths, function (path) {
          var poly = new _polygon2.default(path.vars.x, path.vars.y);
          var len = path.length();
          var num = len / opts.spacing;
          for (var i = 0; i < num; i++) {
            var vec = path.vectorAtLength(i * opts.spacing);
            poly.lineTo(vec.x, vec.y);
          }

          _utils2.default.copyMixinVars(this, poly);
          _utils2.default.groupLogic(poly, this.parent, parent);

          polys.push(poly);
        }, this);
      }

      return polys;
    }
  }, {
    key: "copy",
    value: function copy(parent) {
      var copy = new Path();
      copy.vars.anchors = (0, _map2.default)(this.vars.anchors, function (a) {
        return a.copy();
      });
      _utils2.default.copyMixinVars(this, copy);
      _utils2.default.groupLogic(copy, this.parent, parent);
      return copy;
    }
  }, {
    key: "scale",
    value: function scale(scalar) {
      this.scaleStyleable(scalar);
      this.vars.anchors = (0, _map2.default)(this.vars.anchors, function (anchor) {
        return anchor.multiply(scalar);
      });
      return this;
    }
  }, {
    key: "fillRule",
    value: function fillRule(val) {
      this.vars.fillRule = val;return this;
    }

    // Paths must start with a moveTo. This function is checks if
    // there is a moveTo at the beginning, and adds one if not.

  }, {
    key: "checkStartMove",
    value: function checkStartMove() {
      if (this.vars.anchors.length == 0) {
        this.moveTo(0, 0);
      }
    }
  }]);

  return Path;
}();

(0, _assign2.default)(Path.prototype, _mixins.Moveable, _mixins.Styleable, { type: "path" });

exports.default = Path;

},{"../anchor":113,"../mixins":119,"../utils":131,"../vector":132,"./polygon":127,"lodash/collection/each":7,"lodash/collection/map":9,"lodash/object/assign":70}],127:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assign = _dereq_("lodash/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _each = _dereq_("lodash/collection/each");

var _each2 = _interopRequireDefault(_each);

var _map = _dereq_("lodash/collection/map");

var _map2 = _interopRequireDefault(_map);

var _flatten = _dereq_("lodash/array/flatten");

var _flatten2 = _interopRequireDefault(_flatten);

var _mixins = _dereq_("../mixins");

var _vector = _dereq_("../vector");

var _vector2 = _interopRequireDefault(_vector);

var _utils = _dereq_("../utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Polygon = function () {
  function Polygon(x, y) {
    _classCallCheck(this, Polygon);

    this.moveable();
    this.styleable();
    this.vars.vectors = [];
    if (typeof x !== 'undefined') this.vars.x = x;
    if (typeof y !== 'undefined') this.vars.y = y;
  }

  _createClass(Polygon, [{
    key: "lineTo",
    value: function lineTo(x, y) {
      this.vars.vectors.push(new _vector2.default(x, y));
      return this;
    }
  }, {
    key: "length",
    value: function length() {
      var len = 0;
      for (var i = 0; i < this.vars.vectors.length; i++) {
        var start = this.vars.vectors[i];
        var stop = this.vars.vectors[(i + 1) % this.vars.vectors.length];
        len += stop.sub(start).length();
      }
      return len;
    }
  }, {
    key: "vectorAtLength",
    value: function vectorAtLength(len) {

      var tmpLen = 0;

      for (var i = 0; i < this.vars.vectors.length; i++) {
        var start = this.vars.vectors[i];
        var stop = this.vars.vectors[(i + 1) % this.vars.vectors.length];
        var vec = stop.sub(start);
        var veclen = vec.length();

        if (tmpLen + veclen > len) {
          var remaining = len - tmpLen;
          return start.add(vec.normalize().multiply(remaining));
        }

        tmpLen += veclen;
      }

      return this.vars.vectors[0].copy();
    }
  }, {
    key: "vectorAt",
    value: function vectorAt(scalar) {
      return this.vectorAtLength(this.length() * scalar);
    }
  }, {
    key: "area",
    value: function area() {
      var area = 0;
      for (var i = 0; i < this.vars.vectors.length - 1; i++) {
        area += this.vars.vectors[i].x * this.vars.vectors[i + 1].y - this.vars.vectors[i + 1].x * this.vars.vectors[i].y;
      }
      area /= 2;
      return Math.abs(area);
    }
  }, {
    key: "bounds",
    value: function bounds() {
      var xmax = undefined;
      var ymax = undefined;
      var xmin = undefined;
      var ymin = undefined;

      (0, _each2.default)(this.vars.vectors, function (vec) {
        if (typeof xmin === 'undefined' || vec.x < xmin) xmin = vec.x;
        if (typeof xmax === 'undefined' || vec.x > xmax) xmax = vec.x;
        if (typeof ymin === 'undefined' || vec.y < ymin) ymin = vec.y;
        if (typeof ymax === 'undefined' || vec.y > ymax) ymax = vec.y;
      });

      return {
        x: xmin,
        y: ymin,
        width: xmax - xmin,
        height: ymax - ymin
      };
    }
  }, {
    key: "centroid",
    value: function centroid() {
      var areaAcc = 0.0;
      var xAcc = 0.0;
      var yAcc = 0.0;
      for (var i = 0; i < this.vars.vectors.length; i++) {
        var start = this.vars.vectors[i];
        var stop = this.vars.vectors[(i + 1) % this.vars.vectors.length];
        areaAcc += start.x * stop.y - stop.x * start.y;
        xAcc += (start.x + stop.x) * (start.x * stop.y - stop.x * start.y);
        yAcc += (start.y + stop.y) * (start.x * stop.y - stop.x * start.y);
      }
      areaAcc /= 2.0;
      var x = xAcc / (6.0 * areaAcc);
      var y = yAcc / (6.0 * areaAcc);
      return new _vector2.default(x, y);
    }
  }, {
    key: "toPolygon",
    value: function toPolygon(opts, parent) {

      if (opts && opts.spacing) {

        var poly = new Polygon(this.vars.x, this.vars.y);
        var len = this.length();
        var num = len / opts.spacing;
        for (var i = 0; i < num; i++) {
          var vec = this.vectorAtLength(i * opts.spacing);
          poly.lineTo(vec.x, vec.y);
        }

        _utils2.default.copyMixinVars(this, poly);
        _utils2.default.groupLogic(poly, this.parent, parent);

        return poly;
      }

      return this;
    }
  }, {
    key: "copy",
    value: function copy(parent) {
      var copy = new Polygon();
      copy.vars.vectors = (0, _map2.default)(this.vars.vectors, function (v) {
        return v.copy();
      });
      _utils2.default.copyMixinVars(this, copy);
      _utils2.default.groupLogic(copy, this.parent, parent);
      return copy;
    }

    // Code from ContainsPoint function here:
    // http://polyk.ivank.net

  }, {
    key: "contains",
    value: function contains(x, y) {

      // get stage position
      var addPos = this.stagepos();

      // map array of vectors to flat array of xy numbers
      // This might be slow, so let's rewrite this at some point.

      var p = (0, _flatten2.default)((0, _map2.default)(this.vars.vectors, function (vector) {
        return [addPos.x + vector.x, addPos.y + vector.y];
      }, this));

      var n = p.length >> 1;
      var ax,
          ay = p[2 * n - 3] - y,
          bx = p[2 * n - 2] - x,
          by = p[2 * n - 1] - y;

      var lup;
      for (var i = 0; i < n; i++) {
        ax = bx;ay = by;
        bx = p[2 * i] - x;
        by = p[2 * i + 1] - y;
        if (ay == by) continue;
        lup = by > ay;
      }

      var depth = 0;
      for (var i = 0; i < n; i++) {
        ax = bx;ay = by;
        bx = p[2 * i] - x;
        by = p[2 * i + 1] - y;
        if (ay < 0 && by < 0) continue; // both "up" or both "down"
        if (ay > 0 && by > 0) continue; // both "up" or both "down"
        if (ax < 0 && bx < 0) continue; // both points on the left

        if (ay == by && Math.min(ax, bx) <= 0) return true;
        if (ay == by) continue;

        var lx = ax + (bx - ax) * -ay / (by - ay);
        if (lx == 0) return true; // point on edge
        if (lx > 0) depth++;
        if (ay == 0 && lup && by > ay) depth--; // hit vertex, both up
        if (ay == 0 && !lup && by < ay) depth--; // hit vertex, both down
        lup = by > ay;
      }

      return (depth & 1) == 1;
    }
  }, {
    key: "scale",
    value: function scale(scalar) {
      this.scaleStyleable(scalar);
      this.vars.vectors = (0, _map2.default)(this.vars.vectors, function (vec) {
        return vec.multiply(scalar);
      });
      return this;
    }
  }]);

  return Polygon;
}();

(0, _assign2.default)(Polygon.prototype, _mixins.Moveable, _mixins.Styleable, { type: "polygon" });

exports.default = Polygon;

},{"../mixins":119,"../utils":131,"../vector":132,"lodash/array/flatten":4,"lodash/collection/each":7,"lodash/collection/map":9,"lodash/object/assign":70}],128:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assign = _dereq_("lodash/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _mixins = _dereq_("../mixins");

var _polygon = _dereq_("./polygon");

var _polygon2 = _interopRequireDefault(_polygon);

var _utils = _dereq_("../utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rectangle = function () {
  function Rectangle(x, y, width, height) {
    _classCallCheck(this, Rectangle);

    this.moveable();
    this.sizeable();
    this.styleable();
    this.vars.x = x;
    this.vars.y = y;
    this.vars.width = width;
    this.vars.height = height;
  }

  _createClass(Rectangle, [{
    key: "round",
    value: function round(rx, ry) {
      if (!ry) ry = rx;
      this.vars.rx = rx;
      this.vars.ry = ry;
    }
  }, {
    key: "toPolygon",
    value: function toPolygon(opts, parent) {
      var poly = new _polygon2.default(this.vars.x, this.vars.y).lineTo(0, 0).lineTo(this.vars.width, 0).lineTo(this.vars.width, this.vars.height).lineTo(0, this.vars.height);

      if (opts) poly = poly.toPolygon(opts, false);

      _utils2.default.copyMixinVars(this, poly);
      _utils2.default.groupLogic(poly, this.parent, parent);

      return poly;
    }
  }, {
    key: "copy",
    value: function copy(parent) {
      var copy = new Rectangle();
      _utils2.default.copyMixinVars(this, copy);
      _utils2.default.groupLogic(copy, this.parent, parent);
      return copy;
    }
  }, {
    key: "scale",
    value: function scale(scalar) {
      this.scaleSizeable(scalar);
      this.scaleStyleable(scalar);
      return this;
    }
  }]);

  return Rectangle;
}();

(0, _assign2.default)(Rectangle.prototype, _mixins.Moveable, _mixins.Sizeable, _mixins.Styleable, { type: "rectangle" });

exports.default = Rectangle;

},{"../mixins":119,"../utils":131,"./polygon":127,"lodash/object/assign":70}],129:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assign = _dereq_("lodash/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _mixins = _dereq_("../mixins");

var _utils = _dereq_("../utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Text = function () {
  function Text(text, x, y) {
    _classCallCheck(this, Text);

    this.moveable();
    this.styleable();
    this.vars.text = text;
    this.vars.x = x;
    this.vars.y = y;
    this.vars.fontSize = 16;
  }

  _createClass(Text, [{
    key: "toPolygon",
    value: function toPolygon() {
      throw new Error("You need the Rune.Font plugin to convert text to polygon");
    }
  }, {
    key: "textAlign",
    value: function textAlign(_textAlign) {
      this.vars.textAlign = _textAlign;return this;
    }
  }, {
    key: "fontFamily",
    value: function fontFamily(_fontFamily) {
      this.vars.fontFamily = _fontFamily;return this;
    }
  }, {
    key: "fontStyle",
    value: function fontStyle(_fontStyle) {
      this.vars.fontStyle = _fontStyle;return this;
    }
  }, {
    key: "fontWeight",
    value: function fontWeight(_fontWeight) {
      this.vars.fontWeight = _fontWeight;return this;
    }
  }, {
    key: "fontSize",
    value: function fontSize(_fontSize) {
      this.vars.fontSize = _fontSize;return this;
    }
  }, {
    key: "letterSpacing",
    value: function letterSpacing(_letterSpacing) {
      this.vars.letterSpacing = _letterSpacing;return this;
    }
  }, {
    key: "textDecoration",
    value: function textDecoration(_textDecoration) {
      this.vars.textDecoration = _textDecoration;return this;
    }
  }, {
    key: "copy",
    value: function copy(parent) {
      var copy = new Text();
      copy.vars.text = this.vars.text;
      copy.vars.textAlign = this.vars.textAlign;
      copy.vars.fontFamily = this.vars.fontFamily;
      copy.vars.fontStyle = this.vars.fontStyle;
      copy.vars.fontWeight = this.vars.fontWeight;
      copy.vars.fontSize = this.vars.fontSize;
      copy.vars.letterSpacing = this.vars.letterSpacing;
      copy.vars.textDecoration = this.vars.textDecoration;
      _utils2.default.copyMixinVars(this, copy);
      _utils2.default.groupLogic(copy, this.parent, parent);
      return copy;
    }
  }, {
    key: "scale",
    value: function scale(scalar) {
      this.scaleStyleable(scalar);
      this.vars.fontSize *= scalar;
      return this;
    }
  }]);

  return Text;
}();

(0, _assign2.default)(Text.prototype, _mixins.Moveable, _mixins.Styleable, { type: "text" });

exports.default = Text;

},{"../mixins":119,"../utils":131,"lodash/object/assign":70}],130:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assign = _dereq_("lodash/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _mixins = _dereq_("../mixins");

var _utils = _dereq_("../utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Triangle = function () {
  function Triangle(x, y, x2, y2, x3, y3) {
    _classCallCheck(this, Triangle);

    this.moveable();
    this.styleable();

    this.vars.x = x;
    this.vars.y = y;

    // Make variables relative to 0,0 as
    // x,y will be used in transform
    this.vars.x2 = x2 - x;
    this.vars.y2 = y2 - y;
    this.vars.x3 = x3 - x;
    this.vars.y3 = y3 - y;
  }

  _createClass(Triangle, [{
    key: "copy",
    value: function copy(parent) {
      var copy = new Triangle();
      copy.vars.x2 = this.vars.x2;
      copy.vars.y2 = this.vars.y2;
      copy.vars.x3 = this.vars.x3;
      copy.vars.y3 = this.vars.y3;
      _utils2.default.copyMixinVars(this, copy);
      _utils2.default.groupLogic(copy, this.parent, parent);
      return copy;
    }
  }, {
    key: "scale",
    value: function scale(scalar) {
      this.scaleStyleable(scalar);
      this.vars.x2 *= scalar;
      this.vars.y2 *= scalar;
      this.vars.x3 *= scalar;
      this.vars.y3 *= scalar;
      return this;
    }
  }]);

  return Triangle;
}();

(0, _assign2.default)(Triangle.prototype, _mixins.Moveable, _mixins.Styleable, { type: "triangle" });

exports.default = Triangle;

},{"../mixins":119,"../utils":131,"lodash/object/assign":70}],131:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Utils = {

  random: function random(a, b) {
    if (typeof b === 'undefined') {
      b = a;
      a = 0;
    }
    return a + Math.random() * (b - a);
  },

  degrees: function degrees(radians) {
    return radians * (180 / Math.PI);
  },

  radians: function radians(degrees) {
    return degrees * (Math.PI / 180);
  },

  groupLogic: function groupLogic(child, fallback, group) {

    if (group && group.type == "group") {
      group.add(child);
    } else if (group !== false && fallback && fallback.type == "group") {
      fallback.add(child);
    }
  },

  copyMixinVars: function copyMixinVars(a, b) {
    if (a.moveable && b.moveable) b.moveable(a);
    if (a.sizeable && b.sizeable) b.sizeable(a);
    if (a.styleable && b.styleable) b.styleable(a);
  }

};

exports.default = Utils;

},{}],132:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = _dereq_("./utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector = function () {
  function Vector(x, y) {
    _classCallCheck(this, Vector);

    this.x = x || 0;
    this.y = y || 0;
  }

  _createClass(Vector, [{
    key: "set",
    value: function set(x, y) {
      this.x = x;
      this.y = y;
    }
  }, {
    key: "add",
    value: function add(vec) {
      return new Vector(this.x + vec.x, this.y + vec.y);
    }
  }, {
    key: "sub",
    value: function sub(vec) {
      return new Vector(this.x - vec.x, this.y - vec.y);
    }
  }, {
    key: "multiply",
    value: function multiply(scalar) {
      return new Vector(this.x * scalar, this.y * scalar);
    }
  }, {
    key: "divide",
    value: function divide(scalar) {
      var vec = new Vector(0, 0);
      if (scalar) {
        vec.x = this.x / scalar;
        vec.y = this.y / scalar;
      }
      return vec;
    }
  }, {
    key: "distance",
    value: function distance(vec) {
      return Math.sqrt(this.distanceSquared(vec));
    }
  }, {
    key: "distanceSquared",
    value: function distanceSquared(vec) {
      var dx = this.x - vec.x;
      var dy = this.y - vec.y;
      return dx * dx + dy * dy;
    }
  }, {
    key: "lerp",
    value: function lerp(vec, scalar) {
      var x = (vec.x - this.x) * scalar + this.x;
      var y = (vec.y - this.y) * scalar + this.y;
      return new Vector(x, y);
    }
  }, {
    key: "dot",
    value: function dot(vec) {
      return this.x * vec.x + this.y * vec.y;
    }
  }, {
    key: "length",
    value: function length() {
      return Math.sqrt(this.lengthSquared());
    }
  }, {
    key: "lengthSquared",
    value: function lengthSquared() {
      return this.x * this.x + this.y * this.y;
    }
  }, {
    key: "normalize",
    value: function normalize() {
      return this.divide(this.length());
    }
  }, {
    key: "rotation",
    value: function rotation() {
      return _utils2.default.degrees(Math.atan2(this.y, this.x));
    }
  }, {
    key: "rotate",
    value: function rotate(degrees) {
      var rad = _utils2.default.radians(this.rotation() + degrees);
      var len = this.length();
      var x = Math.cos(rad) * len;
      var y = Math.sin(rad) * len;
      return new Vector(x, y);
    }
  }, {
    key: "copy",
    value: function copy() {
      return new Vector(this.x, this.y);
    }
  }, {
    key: "toString",
    value: function toString() {
      return "(x: " + this.x + ", y: " + this.y + ")";
    }
  }]);

  return Vector;
}();

exports.default = Vector;

},{"./utils":131}]},{},[121])(121)
});


//# sourceMappingURL=rune.js.map
