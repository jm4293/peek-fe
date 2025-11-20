// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
import * as Sentry from '@sentry/nextjs';

const isDevelopment = process.env.NODE_ENV === 'development';

Sentry.init({
  dsn: 'https://1fce5fa2f83471202b76260b339a9c72@o4510396220047360.ingest.us.sentry.io/4510396221423616',

  // Set environment for better filtering in Sentry dashboard
  environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || process.env.NODE_ENV || 'development',

  // Add optional integrations for additional features
  integrations: [Sentry.replayIntegration()],

  // Adjust sample rates based on environment
  // In production, sample 10% of transactions to reduce costs
  // In development, sample 100% for better debugging
  tracesSampleRate: isDevelopment ? 1.0 : 0.1,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Session replay sample rates
  // In development: 100% for debugging
  // In production: 10% to reduce bandwidth and costs
  replaysSessionSampleRate: isDevelopment ? 1.0 : 0.1,

  // Always capture replays when errors occur
  replaysOnErrorSampleRate: 1.0,

  // Enable sending user PII (Personally Identifiable Information)
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,

  // Ignore common errors that don't need tracking
  ignoreErrors: [
    // Browser extensions
    'top.GLOBALS',
    // Random plugins/extensions
    'originalCreateNotification',
    'canvas.contentDocument',
    'MyApp_RemoveAllHighlights',
    // Facebook borked
    'fb_xd_fragment',
    // ISP "optimizing" proxy - `Cache-Control: no-transform` seems to reduce this. (thanks @acdha)
    'bmi_SafeAddOnload',
    'EBCallBackMessageReceived',
    // See http://toolbar.conduit.com/Developer/HtmlAndGadget/Methods/JSInjection.aspx
    'conduitPage',
  ],

  beforeSend(event) {
    // Filter out errors from browser extensions
    if (event.exception?.values?.[0]?.stacktrace?.frames?.some((frame) => frame.filename?.includes('extension://'))) {
      return null;
    }
    return event;
  },
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
