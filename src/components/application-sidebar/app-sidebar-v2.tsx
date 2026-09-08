import { useTranslation } from 'react-i18next'
import {
  SideNav,
  SideNavHeading,
  SideNavItem,
  SideNavSection,
} from '@astryxdesign/core/SideNav'
import { NavIcon } from '@astryxdesign/core/NavIcon'
import { HouseIcon } from '@phosphor-icons/react/dist/ssr'

import { getSidebarLinks } from './constant'

export default function AppSideBarV2() {
  const { t } = useTranslation()
  return (
    <SideNav
      header={
        <SideNavHeading
          icon={
            <NavIcon icon={<HouseIcon style={{ width: 16, height: 16 }} />} />
          }
          heading="App Shell"
          headingHref="#"
        />
      }
    >
      <SideNavSection title="Main">
        {getSidebarLinks(t).map((sidebar) => {
          if (sidebar.links.length === 1) {
            return (
              <SideNavItem
                key={sidebar.title}
                label={sidebar.title}
                icon={sidebar.icon}
              />
            )
          }

          return (
            <SideNavItem
              key={sidebar.title}
              label={sidebar.title}
              icon={sidebar.icon}
            >
              {sidebar.links.map((link) => (
                <SideNavItem
                  key={link.name}
                  label={link.name}
                  href={link.href}
                />
              ))}
            </SideNavItem>
          )
        })}
      </SideNavSection>
    </SideNav>
  )
}
