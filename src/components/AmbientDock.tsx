import React from 'react';
import { AmbientButton } from './AmbientButton';

export type AmbientKey =
  | 'rain' | 'city' | 'fire' | 'birds' | 'cafe'
  | 'snow' | 'fireflies' | 'leaves' | 'stars';

/**
 * The nine ambient controls. Both breakpoints scatter them loosely over the
 * scene -- that looseness is the look, and a tidy grid reads as a control panel
 * sitting on top of a photograph rather than as part of it.
 *
 * `left`/`top` are desktop, resolved against the whole stage. `mx`/`my` are
 * mobile, resolved against the narrower band `.ambient-dock` carves out between
 * the genre tags and the now-playing card -- so they spread with the screen
 * rather than needing a breakpoint per phone size. `mx` positions the centre of
 * the button, `left` positions its leading edge.
 */
const LAYOUT: { key: AmbientKey; left: string; top: string; mx: string; my: string }[] = [
  { key: 'rain',      left: '12%', top: '28%', mx: '18%', my: '2%'  },
  { key: 'cafe',      left: '35%', top: '22%', mx: '52%', my: '12%' },
  { key: 'leaves',    left: '72%', top: '18%', mx: '85%', my: '0%'  },
  { key: 'birds',     left: '65%', top: '32%', mx: '14%', my: '38%' },
  { key: 'fire',      left: '50%', top: '50%', mx: '49%', my: '46%' },
  { key: 'stars',     left: '15%', top: '19%', mx: '84%', my: '36%' },
  // Held clear of the now-playing card, which is pinned to the lower-left on
  // desktop at a fixed 31px/268px. A bare percentage put Snow's hit area on top
  // of the card's transport buttons at common laptop widths.
  { key: 'snow',      left: 'max(20%, 320px)', top: '65%', mx: '22%', my: '68%' },
  { key: 'fireflies', left: '75%', top: '60%', mx: '57%', my: '76%' },
  { key: 'city',      left: '82%', top: '69%', mx: '87%', my: '64%' },
];

interface AmbientDockProps {
  active: Record<AmbientKey, boolean>;
  onToggle: (key: AmbientKey) => void;
}

export function AmbientDock({ active, onToggle }: AmbientDockProps) {
  return (
    <div
      className="ambient-dock rise-in rise-delay-3"
      role="group"
      aria-label="Ambient sounds and effects"
    >
      {LAYOUT.map(({ key, left, top, mx, my }) => (
        <div
          key={key}
          className="ambient-dock-slot"
          style={{
            ['--dx' as string]: left,
            ['--dy' as string]: top,
            ['--mx' as string]: mx,
            ['--my' as string]: my,
          }}
        >
          <AmbientButton
            type={key}
            isActive={active[key]}
            onClick={() => onToggle(key)}
          />
        </div>
      ))}
    </div>
  );
}
