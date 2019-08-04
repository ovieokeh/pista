export function useToggleDropdown(dropdown: React.RefObject<HTMLDivElement>) {
  const handleProfileClick = (event: Event) => {
    let dropdownElement = dropdown.current as HTMLDivElement;

    if (event.target) {
      const target = event.target as HTMLElement;

      target.id === 'dropdown-toggle'
        ? dropdownElement.classList.toggle('navbar__dropdown--visible')
        : dropdownElement.classList.remove('navbar__dropdown--visible');
    }
  };

  document.body.addEventListener('click', handleProfileClick);
  return () => {
    document.body.removeEventListener('click', handleProfileClick);
  };
}
