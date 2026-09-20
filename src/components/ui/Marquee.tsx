import { cn } from "@/lib/utils";

/**
 * Infinite marquee — renders `children` (a flex row) twice and
 * scrolls horizontally with a CSS keyframe. Seamless: the outer
 * row translates -50% so the second copy lands exactly where the
 * first started.
 */
export function Marquee({
  children,
  className,
  speed = 40,
  reverse = false,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  reverse?: boolean;
}) {
  const animation = `marquee ${speed}s linear infinite${reverse ? " reverse" : ""}`;

  return (
    <div
      className={cn(
        "overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
    >
      <div className="flex w-max" style={{ animation }}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
