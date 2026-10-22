type CompMediaProps = {
  name: string;
  poster: string;
  width: number;
  height: number;
  /** Describes the motion for assistive tech; omit for pure decoration. */
  label?: string;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * One of the artboard's motion compositions ("Comp …" layers).
 *
 * Those layers are video fills in Figma, and the API only hands back their
 * poster frame — so each slot renders a <video> with that frame as the poster.
 * Until the film exists at public/videos/<name>.(webm|mp4) the browser simply
 * paints the poster, which is pixel-identical to the exported still; once the
 * file lands it animates with no code change.
 */
export function CompMedia({
  name,
  poster,
  width,
  height,
  label,
  className,
  style,
}: CompMediaProps) {
  return (
    <video
      className={className}
      style={style}
      poster={poster}
      width={width}
      height={height}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
      aria-hidden={label ? undefined : true}
      tabIndex={-1}
    >
      <source src={`/videos/${name}.webm`} type="video/webm" />
      <source src={`/videos/${name}.mp4`} type="video/mp4" />
    </video>
  );
}
