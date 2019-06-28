import { useEffect } from 'react';

export function useToggleNav(ref: any) {
  const handleClickOutside = (event: Event) => {
    if (!ref.current) return;

    const target = event.target as HTMLElement;

    !target.classList.contains('hamburger')
      ? ref.current.classList.remove('nav-links__show')
      : ref.current.classList.toggle('nav-links__show');
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
}
