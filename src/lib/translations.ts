type Translations = {
  [key: string]: {
    [key: string]: string
  }
}

export const translations: Translations = {
  en: {
    'learning-dashboard': 'Learning Dashboard',
    'back-to-home': 'Back to Home',
    'domains': 'Domains',
    'add-domain': 'Add Domain',
    'hide-domains': 'Hide Domains',
    'show-domains': 'Show Domains',
    'add-vocabulary': 'Add New Vocabulary',
    'hide-add-vocabulary': 'Hide Add Vocabulary',
    'examples': 'Examples',
    'select-domain': 'Select a domain to view vocabulary',
    'loading': 'Loading vocabulary...',
    'error': 'Error',
    'read-definition': 'Read definition',
    'stop-reading': 'Stop reading',
    'read-example': 'Read example',
  },
  de: {
    'learning-dashboard': 'Lern-Dashboard',
    'back-to-home': 'Zurück zur Startseite',
    'domains': 'Bereiche',
    'add-domain': 'Bereich hinzufügen',
    'hide-domains': 'Bereiche ausblenden',
    'show-domains': 'Bereiche anzeigen',
    'add-vocabulary': 'Neues Vokabular hinzufügen',
    'hide-add-vocabulary': 'Vokabular hinzufügen ausblenden',
    'examples': 'Beispiele',
    'select-domain': 'Wählen Sie einen Bereich aus, um Vokabular anzuzeigen',
    'loading': 'Vokabular wird geladen...',
    'error': 'Fehler',
    'read-definition': 'Definition vorlesen',
    'stop-reading': 'Vorlesen stoppen',
    'read-example': 'Beispiel vorlesen',
  },
  es: {
    'learning-dashboard': 'Panel de Aprendizaje',
    'back-to-home': 'Volver al Inicio',
    'domains': 'Dominios',
    'add-domain': 'Añadir Dominio',
    'hide-domains': 'Ocultar Dominios',
    'show-domains': 'Mostrar Dominios',
    'add-vocabulary': 'Añadir Nuevo Vocabulario',
    'hide-add-vocabulary': 'Ocultar Añadir Vocabulario',
    'examples': 'Ejemplos',
    'select-domain': 'Seleccione un dominio para ver el vocabulario',
    'loading': 'Cargando vocabulario...',
    'error': 'Error',
    'read-definition': 'Leer definición',
    'stop-reading': 'Detener lectura',
    'read-example': 'Leer ejemplo',
  },
}

export function getTranslation(key: string, language: string): string {
  return translations[language]?.[key] || translations['en'][key] || key
} 