export const Logo = ({ size = 120 }) => {
  const centerX = 67.5;

  const squareSize = 6;
  const gap = 4;

  const gridWidth = 2 * squareSize + gap; // 16
  const startX = centerX - gridWidth / 2;

  const startY = 72; // رجعناهم لفوق جوه الدرع

  return (
    <svg
      width={size}
      height={size}
      viewBox="35 25 65 85"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shield */}
      <path
        d="
          M35 30
          L35 75
          L67.5 105
          L100 75
          L100 30
        "
        fill="none"
        stroke="#000"
        strokeWidth="9"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* H */}
      <line x1="35" y1="25" x2="35" y2="65" stroke="#000" strokeWidth="9" />
      <line x1="55" y1="25" x2="55" y2="65" stroke="#000" strokeWidth="9" />
      <line x1="35" y1="45" x2="55" y2="45" stroke="#000" strokeWidth="9" />

      {/* Mirrored K */}
      <g transform="translate(87.5,0) scale(-1,1) translate(-87.5,0)">
        <line
          x1="75"
          y1="25"
          x2="75"
          y2="65"
          stroke="#c1121f"
          strokeWidth="9"
        />
        <line
          x1="75"
          y1="45"
          x2="100"
          y2="25"
          stroke="#c1121f"
          strokeWidth="9"
        />
        <line
          x1="75"
          y1="45"
          x2="100"
          y2="65"
          stroke="#c1121f"
          strokeWidth="9"
        />
      </g>

      {/* 2x2 Grid centered */}
      <rect
        x={startX}
        y={startY}
        width={squareSize}
        height={squareSize}
        fill="#000"
      />
      <rect
        x={startX + squareSize + gap}
        y={startY}
        width={squareSize}
        height={squareSize}
        fill="#000"
      />

      <rect
        x={startX}
        y={startY + squareSize + gap}
        width={squareSize}
        height={squareSize}
        fill="#000"
      />
      <rect
        x={startX + squareSize + gap}
        y={startY + squareSize + gap}
        width={squareSize}
        height={squareSize}
        fill="#000"
      />
    </svg>
  );
};
