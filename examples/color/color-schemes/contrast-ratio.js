function lightnessToLuminance(l) {
  if (l <= 8) {
    return 1.0 * l / 903.2962962;
  } else {
    return 1.0 * Math.pow((l + 16) / 116, 3);
  }
}

function contrastRatio(l1, l2) {
  l1 = lightnessToLuminance(l1);
  l2 = lightnessToLuminance(l2);
  return (l1 + 0.05) / (l2 + 0.05);
}

function setup() {
  console.log(contrastRatio(40, 70)); // BAD! 0.35521707859730733
  console.log(contrastRatio(40, 90)); // GOOD! 0.19988073069469958
}
