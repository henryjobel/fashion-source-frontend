import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { auth } from "../lib/api";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { useSettings } from "../lib/queries";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Fashion Source BD" },
      {
        name: "description",
        content: "Fashion Source BD is an export-oriented garments buying house.",
      },
      { name: "author", content: "Fashion Source BD" },
      { property: "og:title", content: "Fashion Source BD" },
      {
        property: "og:description",
        content: "Fashion Source BD is an export-oriented garments buying house.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@fashionsourcebd" },
      { name: "twitter:title", content: "Fashion Source BD" },
      {
        name: "twitter:description",
        content: "Fashion Source BD is an export-oriented garments buying house.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b34ec89e-12c2-453f-b203-11796dc39cd5/id-preview-942de6a9--0e569bca-9367-47c7-a613-30b234329557.lovable.app-1782719718360.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b34ec89e-12c2-453f-b203-11796dc39cd5/id-preview-942de6a9--0e569bca-9367-47c7-a613-30b234329557.lovable.app-1782719718360.png",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Manrope:wght@400;500;600;700;800&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function SiteScripts() {
  const { data: settings } = useSettings();

  useEffect(() => {
    if (!settings) return;
    const injected: HTMLElement[] = [];

    if (settings.analyticsId) {
      const loader = document.createElement("script");
      loader.async = true;
      loader.src = `https://www.googletagmanager.com/gtag/js?id=${settings.analyticsId}`;
      document.head.appendChild(loader);
      const init = document.createElement("script");
      init.text = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${settings.analyticsId}');`;
      document.head.appendChild(init);
      injected.push(loader, init);
    }

    if (settings.customHeadScript) {
      const script = document.createElement("script");
      script.text = settings.customHeadScript;
      document.head.appendChild(script);
      injected.push(script);
    }

    if (settings.customBodyScript) {
      const script = document.createElement("script");
      script.text = settings.customBodyScript;
      document.body.appendChild(script);
      injected.push(script);
    }

    return () => injected.forEach((el) => el.remove());
  }, [settings]);

  return null;
}

function MaintenanceNotice() {
  const { data: settings } = useSettings();
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-900 px-4 text-center text-white">
      <div>
        <h1 className="text-3xl font-black">We&apos;ll be right back.</h1>
        <p className="mt-3 text-sm text-white/70">
          {settings?.siteName || "This site"} is undergoing scheduled maintenance. Please check back
          shortly.
        </p>
      </div>
    </div>
  );
}

function SiteShell() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const isHome = location.pathname === "/";
  const { data: settings } = useSettings();
  const maintenanceActive = !isAdmin && settings?.maintenanceMode === "true" && !auth.isLoggedIn();

  return (
    <>
      <SiteScripts />
      {maintenanceActive ? (
        <MaintenanceNotice />
      ) : (
        <>
          {!isAdmin && !isHome && <SiteHeader />}
          {/* SiteHeader is fixed/overlaid; the homepage hero manages its own top
              spacing to sit under the transparent header, every other page needs
              padding here so content isn't hidden behind the solid header bar. */}
          <main className={!isAdmin && !isHome ? "pt-20" : undefined}>
            <Outlet />
          </main>
          {!isAdmin && !isHome && <SiteFooter />}
        </>
      )}
    </>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteShell />
    </QueryClientProvider>
  );
}
