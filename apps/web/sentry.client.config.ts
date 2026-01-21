import * as Sentry from "@sentry/nextjs";

Sentry.init({
	dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

	// Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing
	// Adjust this in production for performance
	tracesSampleRate: 1.0,

	// Capture Replay for 10% of all sessions, plus 100% of sessions with errors
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1.0,

	integrations: [
		Sentry.replayIntegration({
			maskAllText: true,
			blockAllMedia: true,
		}),
		Sentry.browserTracingIntegration(),
	],

	// Only enable in production
	enabled: process.env.NODE_ENV === "production",
});
