export const GradientIcon = ({ paths, size = 40, eyes = false, strokeWidth = "2" }: { paths: string[], size?: number, eyes?: boolean, strokeWidth?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="url(#peach-grad)" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className="">
    {paths.map((d, i) => (
      d.startsWith('circle:') ? (
        <circle key={i} cx={d.split(':')[1]} cy={d.split(':')[2]} r={d.split(':')[3]} />
      ) : (
        <path key={i} d={d} />
      )
    ))}
    {eyes && (
      <>
        <circle cx="9" cy="9" r="1" fill="url(#peach-grad)" stroke="none" />
        <circle cx="15" cy="9" r="1" fill="url(#peach-grad)" stroke="none" />
      </>
    )}
  </svg>
);
