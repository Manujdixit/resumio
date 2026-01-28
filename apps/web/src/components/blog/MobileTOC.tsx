import type { ReactNode } from "react";

export function MobileTOC({ children }: { children: ReactNode }) {
  return <div className="xl:hidden">{children}</div>;
}
