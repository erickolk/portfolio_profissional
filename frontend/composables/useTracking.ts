export const useTracking = () => {
  const trackEvent = (
    event: string,
    category?: string,
    label?: string,
    value?: number
  ) => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event,
        event_category: category,
        event_label: label,
        event_value: value
      })
    }
  }

  const trackPageView = (path: string, title: string) => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'page_view',
        page_path: path,
        page_title: title
      })
    }
  }

  const trackDiagnosticClick = (location: string) => {
    trackEvent('diagnostic_click', 'engagement', location)
  }

  const trackContactSubmit = (projectType: string) => {
    trackEvent('contact_submit', 'engagement', projectType)
  }

  const trackWhatsAppClick = (location: string) => {
    trackEvent('whatsapp_click', 'engagement', location)
  }

  const trackCaseView = (caseTitle: string) => {
    trackEvent('case_view', 'engagement', caseTitle)
  }

  const trackProposalDownload = (leadId: string) => {
    trackEvent('proposal_download', 'conversion', leadId)
  }

  const trackServiceView = (serviceTitle: string) => {
    trackEvent('service_view', 'engagement', serviceTitle)
  }

  const trackCursoInterest = (cursoTitle: string) => {
    trackEvent('curso_interest', 'engagement', cursoTitle)
  }

  return {
    trackEvent,
    trackPageView,
    trackDiagnosticClick,
    trackContactSubmit,
    trackWhatsAppClick,
    trackCaseView,
    trackProposalDownload,
    trackServiceView,
    trackCursoInterest
  }
}

