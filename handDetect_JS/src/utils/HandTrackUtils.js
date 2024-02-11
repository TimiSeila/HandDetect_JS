export const isSelectedHand = (handNo, results) => {
  const handedness = results.handedness[0];
  if (handedness) {
    if (handedness[0].index == handNo) {
      return true;
    }
    return false;
  }
};

export const findDistance = (lm1, lm2) => {
  if (lm1 && lm2) {
    let x1 = lm1.x;
    let y1 = lm1.y;
    let x2 = lm2.x;
    let y2 = lm2.y;

    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
};
