import React from 'react';
import { AmbientButton } from './AmbientButton';

export type AmbientKey =
  | 'rain' | 'city' | 'fire' | 'birds' | 'cafe'
  | 'snow' | 'fireflies' | 'leaves' | 'stars';

/**
 * The nine ambient controls, in the order they appear on mobile's 3x3 grid.
 * `left`/`top` are the scattered desktop positions -- on desktop the buttons sit
 * loose over the scene, which is the intended look. On mobile the same nine
 * nodes are laid out as a real grid instead (see `.ambient-dock` in globals.css),
 * so there is one set of buttons here rather than two duplicated sets.
 */
const LAYOUT: { key: AmbientKey; left: string; top: string }[] = [
  { key: 'rain',      left: '12%', top: '28%' },
  { key: 'cafe',      left: '35%', top: '22%' },
  { key: 'leaves',    left: '72%', top: '18%' },
  { key: 'birds',     left: '65%', top: '32%' },
  { key: 'fire',      left: '50%', top: '50%' },
  { key: 'stars',     left: '15%', top: '15%' },
  // Held clear of the now-playing card, which is pinned to the lower-left on
  // desktop at a fixed 31px/268px. A bare percentage put Snow's hit area on top
  // of the card's transport buttons at common laptop widths.
  { key: 'snow',      left: 'max(20%, 320px)', top: '65%' },
  { key: 'fireflies', left: '75%', top: '60%' },
  { key: 'city',      left: '82%', top: '72%' },
];

interface AmbientDockProps {
  active: Record<AmbientKey, boolean>;
  onToggle: (key: AmbientKey) => void;
}

export function AmbientDock({ active, onToggle }: AmbientDockProps) {
  return (
    <div className="ambient-dock" role="group" aria-label="Ambient sounds and effects">
      {LAYOUT.map(({ key, left, top }) => (
        <div
          key={key}
          className="ambient-dock-slot"
          style={{ ['--dx' as string]: left, ['--dy' as string]: top }}
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
