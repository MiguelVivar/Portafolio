import React, { memo, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import NavLink from './NavLink';
import ContactButton from './ContactButton';
import { IconType } from 'react-icons';

interface DesktopMenuProps {
  links: {
    href: string;
    label: string;
    icon: IconType;
  }[];
  currentPath: string;
}

// Pre-computed animation variants for better performance
const animationVariants = {
  item: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  }
} as const;

// Memoized individual menu item component
interface MenuItemProps {
  link: {
    href: string;
    label: string;
    icon: IconType;
  };
  isActive: boolean;
  index: number;
}

const MenuItem = memo<MenuItemProps>(({ link, isActive, index }) => (
  <motion.div
    key={link.href}
    variants={animationVariants.item}
    custom={index}
  >
    <NavLink 
      href={link.href}
      label={link.label}
      icon={link.icon}
      isActive={isActive}
    />
  </motion.div>
));
MenuItem.displayName = 'MenuItem';

// Memoized contact button wrapper
interface ContactButtonWrapperProps {
  isActive: boolean;
  linksLength: number;
}

const ContactButtonWrapper = memo<ContactButtonWrapperProps>(({ isActive, linksLength }) => (
  <motion.div
    variants={animationVariants.item}
    custom={linksLength}
    className="hidden md:block"
  >
    <ContactButton isActive={isActive} />
  </motion.div>
));
ContactButtonWrapper.displayName = 'ContactButtonWrapper';

const DesktopMenu: React.FC<DesktopMenuProps> = memo(({ links, currentPath }) => {
  // Memoized computation of active states to prevent recalculation on every render
  const activeStates = useMemo(() => 
    links.map(link => currentPath === link.href), 
    [links, currentPath]
  );

  // Memoized check for contact button active state
  const isContactActive = useMemo(() => 
    currentPath === '/contacto', 
    [currentPath]
  );

  // Memoized links length to prevent recalculation
  const linksLength = useMemo(() => links.length, [links.length]);

  // Memoized render function for menu items to prevent recreation
  const renderMenuItem = useCallback((link: typeof links[0], index: number) => (
    <MenuItem
      key={link.href}
      link={link}
      isActive={activeStates[index]}
      index={index}
    />
  ), [activeStates]);

  // Memoized menu items to prevent unnecessary re-renders
  const menuItems = useMemo(() => 
    links.map(renderMenuItem), 
    [links, renderMenuItem]
  );

  return (
    <div className="hidden lg:flex items-center gap-3 xl:gap-6">
      {menuItems}
      
      <ContactButtonWrapper 
        isActive={isContactActive}
        linksLength={linksLength}
      />
    </div>
  );
});

DesktopMenu.displayName = 'DesktopMenu';

export default DesktopMenu;