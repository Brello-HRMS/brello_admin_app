import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Settings,
  CreditCard,
  Boxes,
  Users,
  Building2,
  Network,
  Lock,
  LifeBuoy,
  ScrollText,
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

import { Logo } from '../../components/common/Logo/Logo';

import styles from './Sidebar.module.scss';
import { NavItem } from './components/NavItem';

import type { MenuItem } from './sidebarConfig';

const PLATFORM_ADMIN_MENU: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard',
  },
  {
    label: 'Leads',
    icon: Users,
    path: '/leads',
  },
  {
    label: 'Enterprises',
    icon: Building2,
    path: '/enterprises',
  },
  {
    label: 'Organisations',
    icon: Network,
    path: '/organizations',
  },
  {
    label: 'Plans',
    icon: CreditCard,
    path: '/plans',
  },
  {
    label: 'Access',
    icon: Lock,
    children: [
      { label: 'Roles', path: '/access/roles' },
      { label: 'Permissions', path: '/access/permissions' },
    ],
  },
  {
    label: 'App & Modules',
    icon: Boxes,
    children: [
      { label: 'Apps', path: '/apps' },
      { label: 'Modules', path: '/modules' },
    ],
  },
  {
    label: 'Setup',
    icon: Settings,
    children: [
      { label: 'Actions', path: '/setup/actions' },
      { label: 'Industry Types', path: '/setup/industry-types' },
      { label: 'Departments', path: '/setup/departments' },
      { label: 'Designations', path: '/setup/designations' },
    ],
  },
  {
    label: 'Audit Logs',
    icon: ScrollText,
    path: '/audit-logs',
  },
  {
    label: 'Support',
    icon: LifeBuoy,
    children: [
      { label: 'Feedback', path: '/support/feedback' },
      { label: 'Reports', path: '/support/report' },
    ],
  },
];

export interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export const Sidebar = ({ isCollapsed, setIsCollapsed }: SidebarProps) => {
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const location = useLocation();

  const toggleMenu = (label: string) => {
    if (isCollapsed) return;
    setOpenMenus((prev) => (prev.includes(label) ? [] : [label]));
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const isParentActive = (item: MenuItem) => {
    if (item.path && isActive(item.path)) return true;
    return item.children?.some((child) => isActive(child.path)) ?? false;
  };

  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : styles.expanded}`}>
      <div className={styles.header}>
        <div
          className={styles.logo}
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{ cursor: 'pointer' }}
        >
          <Logo showWordmark={false} />
        </div>
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles.brandName}
          >
            Brello
          </motion.span>
        )}
      </div>

      <nav className={styles.nav}>
        {PLATFORM_ADMIN_MENU.map((item) => (
          <NavItem
            key={item.label}
            item={item}
            isCollapsed={isCollapsed}
            isOpen={openMenus.includes(item.label)}
            isActive={isActive}
            isParentActive={isParentActive}
            onToggle={toggleMenu}
            hoveredMenu={hoveredMenu}
            setHoveredMenu={setHoveredMenu}
            isLocked={item.isLocked}
          />
        ))}
      </nav>
    </aside>
  );
};
