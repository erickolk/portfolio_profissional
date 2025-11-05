// Schemas JSON-LD para SEO
export const useSchema = () => {
  const config = useRuntimeConfig()

  // Schema Person (Erick Oliveira)
  const getPersonSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Erick Oliveira',
      jobTitle: 'Desenvolvedor Full Stack',
      url: config.public.siteUrl,
      sameAs: [
        'https://github.com/erickoliveira',
        'https://linkedin.com/in/erickoliveira'
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Arapiraca',
        addressRegion: 'AL',
        addressCountry: 'BR'
      },
      areaServed: [
        {
          '@type': 'Country',
          name: 'Brasil'
        },
        {
          '@type': 'State',
          name: 'Alagoas'
        }
      ]
    }
  }

  // Schema LocalBusiness
  const getLocalBusinessSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Erick Oliveira - Desenvolvedor Full Stack',
      description: 'Desenvolvedor Full Stack especializado em sistemas sob medida, automações e landing pages de alta conversão. Raízes em Arapiraca, soluções para o Brasil.',
      url: config.public.siteUrl,
      telephone: config.public.whatsappNumber,
      email: 'contato@erickoliveira.dev',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Arapiraca',
        addressRegion: 'AL',
        addressCountry: 'BR'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '-9.7522',
        longitude: '-36.6611'
      },
      areaServed: [
        {
          '@type': 'State',
          name: 'Alagoas'
        },
        {
          '@type': 'Country',
          name: 'Brasil'
        }
      ],
      priceRange: '$$',
      serviceArea: {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: '-9.7522',
          longitude: '-36.6611'
        },
        geoRadius: {
          '@type': 'Distance',
          name: 'Todo o Brasil'
        }
      }
    }
  }

  // Schema Service
  const getServiceSchema = (serviceName: string, description: string) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: serviceName,
      description,
      provider: {
        '@type': 'Person',
        name: 'Erick Oliveira'
      },
      areaServed: {
        '@type': 'Country',
        name: 'Brasil'
      }
    }
  }

  // Schema Organization
  const getOrganizationSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Erick Oliveira - Desenvolvedor Full Stack',
      url: config.public.siteUrl,
      logo: `${config.public.siteUrl}/logo.png`,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: config.public.whatsappNumber,
        contactType: 'Customer Service',
        areaServed: 'BR',
        availableLanguage: 'Portuguese'
      },
      sameAs: [
        'https://github.com/erickoliveira',
        'https://linkedin.com/in/erickoliveira'
      ]
    }
  }

  // Schema WebSite
  const getWebSiteSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Erick Oliveira - Desenvolvedor Full Stack',
      url: config.public.siteUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${config.public.siteUrl}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    }
  }

  return {
    getPersonSchema,
    getLocalBusinessSchema,
    getServiceSchema,
    getOrganizationSchema,
    getWebSiteSchema
  }
}

