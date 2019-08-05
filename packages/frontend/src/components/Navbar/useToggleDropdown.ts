import { useEffect } from 'react';

export function useToggleDropdown(dropdown: React.RefObject<HTMLDivElement>) {
  const handleProfileClick = (event: Event) => {
    const dropdownElement = dropdown.current as HTMLDivElement;
    const target = event.target as HTMLElement;

    if (!dropdownElement) return;

    target.id === 'dropdown-toggle'
      ? dropdownElement.classList.toggle('navbar__dropdown--visible')
      : dropdownElement.classList.remove('navbar__dropdown--visible');
  };

  useEffect(() => {
    document.body.addEventListener('click', handleProfileClick);
    return () => {
      document.body.removeEventListener('click', handleProfileClick);
    };
  });
}
