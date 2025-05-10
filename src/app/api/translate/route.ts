import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { text, from, to } = await request.json();

    if (!text || !from || !to) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // For now, we'll use a simple translation mapping
    // In a production environment, you would use a proper translation API
    const translations: { [key: string]: { [key: string]: string } } = {
      'algorithm': {
        'de': 'Algorithmus',
        'es': 'Algoritmo'
      },
      'api': {
        'de': 'API',
        'es': 'API'
      },
      'cloud computing': {
        'de': 'Cloud Computing',
        'es': 'Computación en la nube'
      },
      'database': {
        'de': 'Datenbank',
        'es': 'Base de datos'
      },
      'encryption': {
        'de': 'Verschlüsselung',
        'es': 'Cifrado'
      },
      'firewall': {
        'de': 'Firewall',
        'es': 'Cortafuegos'
      },
      'interface': {
        'de': 'Schnittstelle',
        'es': 'Interfaz'
      },
      'protocol': {
        'de': 'Protokoll',
        'es': 'Protocolo'
      },
      'server': {
        'de': 'Server',
        'es': 'Servidor'
      },
      'virtualization': {
        'de': 'Virtualisierung',
        'es': 'Virtualización'
      },
      'roi': {
        'de': 'Kapitalrendite',
        'es': 'Retorno de inversión'
      },
      'kpi': {
        'de': 'Leistungskennzahl',
        'es': 'Indicador clave de rendimiento'
      },
      'marketing': {
        'de': 'Marketing',
        'es': 'Mercadotecnia'
      },
      'strategy': {
        'de': 'Strategie',
        'es': 'Estrategia'
      },
      'leadership': {
        'de': 'Führung',
        'es': 'Liderazgo'
      },
      'innovation': {
        'de': 'Innovation',
        'es': 'Innovación'
      },
      'management': {
        'de': 'Management',
        'es': 'Gestión'
      },
      'entrepreneurship': {
        'de': 'Unternehmertum',
        'es': 'Emprendimiento'
      },
      'finance': {
        'de': 'Finanzen',
        'es': 'Finanzas'
      },
      'branding': {
        'de': 'Markenbildung',
        'es': 'Marca'
      },
      'hypothesis': {
        'de': 'Hypothese',
        'es': 'Hipótesis'
      },
      'experiment': {
        'de': 'Experiment',
        'es': 'Experimento'
      },
      'theory': {
        'de': 'Theorie',
        'es': 'Teoría'
      },
      'research': {
        'de': 'Forschung',
        'es': 'Investigación'
      },
      'analysis': {
        'de': 'Analyse',
        'es': 'Análisis'
      },
      'observation': {
        'de': 'Beobachtung',
        'es': 'Observación'
      },
      'methodology': {
        'de': 'Methodik',
        'es': 'Metodología'
      },
      'data': {
        'de': 'Daten',
        'es': 'Datos'
      },
      'conclusion': {
        'de': 'Schlussfolgerung',
        'es': 'Conclusión'
      },
      'evidence': {
        'de': 'Beweis',
        'es': 'Evidencia'
      }
    };

    // Try to find an exact match in our translations
    const lowerText = text.toLowerCase();
    if (translations[lowerText] && translations[lowerText][to]) {
      return NextResponse.json({
        translatedText: translations[lowerText][to]
      });
    }

    // If no exact match is found, return the original text
    // In a production environment, you would call a translation API here
    return NextResponse.json({
      translatedText: text
    });

  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: 'Translation failed' },
      { status: 500 }
    );
  }
} 