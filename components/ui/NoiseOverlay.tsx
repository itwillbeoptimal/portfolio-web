'use client';

export default function NoiseOverlay() {
  return (
    <>
      <svg
        style={{ position: 'absolute', width: 0, height: 0 }}
        aria-hidden="true"
      >
        <defs>
          <filter id="noise-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>

      <div
        className="noise-overlay"
        style={{ filter: 'url(#noise-filter)' }}
        aria-hidden="true"
      />
    </>
  );
}
