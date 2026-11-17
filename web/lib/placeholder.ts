// Neutral gradient used wherever a photo is not available.
export const PLACEHOLDER_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#10B981'/><stop offset='1' stop-color='#001A33'/></linearGradient></defs><rect width='800' height='500' fill='url(#g)'/></svg>"
  );
