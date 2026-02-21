export const Logo = ({ size = 180, weight = 16 }) => {
  const squareSize = 12;
  const squareGap = 6;

  const centerX = 100;

  const leftSquareX = centerX - squareSize - squareGap / 2;
  const rightSquareX = centerX + squareGap / 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox="35 30 130 135"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Roof left */}
      <line
        x1="40"
        y1="90"
        x2="100"
        y2="35"
        stroke="#111"
        strokeWidth={weight}
        strokeLinecap="round"
      />

      {/* Roof right */}
      <line
        x1="100"
        y1="35"
        x2="160"
        y2="90"
        stroke="#111"
        strokeWidth={weight}
        strokeLinecap="round"
      />

      {/* Left vertical (shared with K) */}
      <line
        x1="40"
        y1="90"
        x2="40"
        y2="160"
        stroke="#c1121f"
        strokeWidth={weight}
        strokeLinecap="round"
      />

      {/* Right vertical (shared with H) */}
      <line
        x1="160"
        y1="90"
        x2="160"
        y2="160"
        stroke="#111"
        strokeWidth={weight}
        strokeLinecap="round"
      />

      {/* ===== 4 Center Squares ===== */}
      <rect
        x={leftSquareX}
        y="70"
        width={squareSize}
        height={squareSize}
        fill="#111"
      />
      <rect
        x={rightSquareX}
        y="70"
        width={squareSize}
        height={squareSize}
        fill="#111"
      />
      <rect
        x={leftSquareX}
        y={70 + squareSize + squareGap}
        width={squareSize}
        height={squareSize}
        fill="#111"
      />
      <rect
        x={rightSquareX}
        y={70 + squareSize + squareGap}
        width={squareSize}
        height={squareSize}
        fill="#111"
      />

      {/* ===== Letter K (red) ===== */}
      <line
        x1="40"
        y1="125"
        x2="90"
        y2="105"
        stroke="#c1121f"
        strokeWidth={weight}
        strokeLinecap="round"
      />
      <line
        x1="40"
        y1="125"
        x2="90"
        y2="160"
        stroke="#c1121f"
        strokeWidth={weight}
        strokeLinecap="round"
      />

      {/* ===== Letter H (black) ===== */}
      <line
        x1="120"
        y1="110"
        x2="120"
        y2="160"
        stroke="#111"
        strokeWidth={weight}
        strokeLinecap="round"
      />

      <line
        x1="120"
        y1="135"
        x2="160"
        y2="135"
        stroke="#111"
        strokeWidth={weight}
        strokeLinecap="round"
      />
    </svg>
  );
};
