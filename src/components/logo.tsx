import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 25"
      width="120"
      height="30"
      {...props}
    >
      <text
        x="0"
        y="20"
        fontFamily="var(--font-headline)"
        fontSize="24"
        fontWeight="bold"
        fill="currentColor"
      >
        creati
      </text>
    </svg>
  );
}
