import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../hooks/useAuth'
import {
  HomeIcon,
  BuildingOfficeIcon,
  UsersIcon,
  UserPlusIcon,
  ChartBarIcon,
  BeakerIcon,
  CalendarIcon,
  CubeIcon,
  DocumentTextIcon,
  TicketIcon,
  FolderIcon,
  ChartPieIcon,

  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

interface LayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: 'nav.dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'nav.accounts', href: '/accounts', icon: BuildingOfficeIcon },
  { name: 'nav.contacts', href: '/contacts', icon: UsersIcon },
  { name: 'nav.leads', href: '/leads', icon: UserPlusIcon },
  { name: 'nav.opportunities', href: '/opportunities', icon: ChartBarIcon },
  { name: 'nav.trials', href: '/trials', icon: BeakerIcon },
  { name: 'nav.activities', href: '/activities', icon: CalendarIcon },
  { name: 'nav.products', href: '/products', icon: CubeIcon },
  { name: 'nav.quotes', href: '/quotes', icon: DocumentTextIcon },
  { name: 'nav.tickets', href: '/tickets', icon: TicketIcon },
  { name: 'nav.documents', href: '/documents', icon: FolderIcon },
  { name: 'nav.reports', href: '/reports', icon: ChartPieIcon },
]

export function Layout({ children }: LayoutProps) {
  const { t } = useTranslation()
  const location = useLocation()
  const { user, logout } = useAuthStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? '' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4">
            <span className="text-xl font-bold text-efp-green">EF Polymer CRM</span>
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setSidebarOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <SidebarContent navigation={navigation} location={location} t={t} />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col bg-white border-r border-gray-200">
          <div className="flex h-16 items-center px-4">
            <span className="text-xl font-bold text-efp-green">EF Polymer CRM</span>
          </div>
          <SidebarContent navigation={navigation} location={location} t={t} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col lg:pl-64">
        {/* Top bar */}
        <div className="flex h-16 items-center justify-between bg-white border-b border-gray-200 px-4 lg:px-6">
          <button
            type="button"
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {user?.name} ({user?.role})
            </span>
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-gray-700 p-1"
              title={t('auth.logout')}
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

function SidebarContent({ navigation, location, t }: { navigation: any[], location: any, t: any }) {
  return (
    <nav className="flex-1 space-y-1 px-2 py-4">
      {navigation.map((item: any) => {
        const current = location.pathname === item.href
        return (
          <Link
            key={item.name}
            to={item.href}
            className={`
              group flex items-center px-2 py-2 text-sm font-medium rounded-md
              ${current
                ? 'bg-efp-light text-efp-green'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }
            `}
          >
            <item.icon
              className={`
                mr-3 h-5 w-5 flex-shrink-0
                ${current ? 'text-efp-green' : 'text-gray-400 group-hover:text-gray-500'}
              `}
            />
            {t(item.name)}
          </Link>
        )
      })}
    </nav>
  )
}