interface ThemeTagsProps {
  activeTags: string[];
}

export function ThemeTags({ activeTags }: ThemeTagsProps) {
  // Show current active tag first, then other available tags
  const availableTags = [
    'Afro Lofi Chill',
    'Night Neo Chill',
    'Morning Lofi',
    'Chill Sunset',
    'Cafe Lofi',
    'Rainy Mood',
    'Evening Chill',
    'Deep Chill',
    'Upbeat Lofi'
  ];

  // Show active tag + one other tag
  const displayTags = [
    { label: activeTags[0] || 'Afro Lofi Chill', active: true },
    { label: activeTags[0] === 'Night Neo Chill' ? 'Afro Lofi Chill' : 'Night Neo Chill', active: false }
  ];

  return (
    <div className="fixed top-[96px] left-[24px] z-40 flex gap-2">
      {displayTags.map((tag, index) => (
        <div
          key={`${tag.label}-${index}`}
          className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl flex items-center gap-2 h-[30px]"
        >
          {tag.active && (
            <div className="w-2 h-2 rounded-full bg-[#05df72] opacity-[0.691]" />
          )}
          <p className="text-sm text-white leading-5">{tag.label}</p>
        </div>
      ))}
    </div>
  );
}
