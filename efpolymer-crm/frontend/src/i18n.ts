import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      'nav.dashboard': 'Dashboard',
      'nav.accounts': 'Accounts',
      'nav.contacts': 'Contacts',
      'nav.leads': 'Leads',
      'nav.opportunities': 'Opportunities',
      'nav.trials': 'Trials',
      'nav.activities': 'Activities',
      'nav.products': 'Products',
      'nav.quotes': 'Quotes',
      'nav.tickets': 'Tickets',
      'nav.documents': 'Documents',
      'nav.reports': 'Reports',
      'nav.settings': 'Settings',
      
      // Common
      'common.save': 'Save',
      'common.cancel': 'Cancel',
      'common.delete': 'Delete',
      'common.edit': 'Edit',
      'common.add': 'Add',
      'common.search': 'Search',
      'common.filter': 'Filter',
      'common.loading': 'Loading...',
      'common.noData': 'No data available',
      
      // Authentication
      'auth.login': 'Login',
      'auth.logout': 'Logout',
      'auth.email': 'Email',
      'auth.password': 'Password',
      'auth.welcome': 'Welcome to EF Polymer CRM',
      'auth.loginDescription': 'Local-only agronomy-focused sales management',
    }
  },
  es: {
    translation: {
      // Navigation
      'nav.dashboard': 'Panel de Control',
      'nav.accounts': 'Cuentas',
      'nav.contacts': 'Contactos',
      'nav.leads': 'Prospectos',
      'nav.opportunities': 'Oportunidades',
      'nav.trials': 'Ensayos',
      'nav.activities': 'Actividades',
      'nav.products': 'Productos',
      'nav.quotes': 'Cotizaciones',
      'nav.tickets': 'Tickets',
      'nav.documents': 'Documentos',
      'nav.reports': 'Reportes',
      'nav.settings': 'Configuración',
      
      // Common
      'common.save': 'Guardar',
      'common.cancel': 'Cancelar',
      'common.delete': 'Eliminar',
      'common.edit': 'Editar',
      'common.add': 'Agregar',
      'common.search': 'Buscar',
      'common.filter': 'Filtrar',
      'common.loading': 'Cargando...',
      'common.noData': 'No hay datos disponibles',
      
      // Authentication
      'auth.login': 'Iniciar Sesión',
      'auth.logout': 'Cerrar Sesión',
      'auth.email': 'Correo Electrónico',
      'auth.password': 'Contraseña',
      'auth.welcome': 'Bienvenido a EF Polymer CRM',
      'auth.loginDescription': 'Gestión de ventas agronómicas local',
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });

export default i18n;