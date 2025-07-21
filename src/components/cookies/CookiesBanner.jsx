import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const cookies = document.cookie;
    const hasConsent = cookies.includes("cookie_consent=");
    if (!hasConsent) setShow(true);
  }, []);

  const saveCookie = (key, value) => {
    document.cookie = `${key}=${value}; path=/; max-age=31536000`;
  };

  const acceptAll = () => {
    saveCookie("cookie_consent", "all");
    saveCookie("analytics", true);
    saveCookie("marketing", true);
    setShow(false);
    setPreferencesOpen(false);
  };

  const rejectAll = () => {
    saveCookie("cookie_consent", "none");
    saveCookie("analytics", false);
    saveCookie("marketing", false);
    setShow(false);
    setPreferencesOpen(false);
  };

  const acceptPreferences = () => {
    saveCookie("cookie_consent", "preferences");
    saveCookie("analytics", preferences.analytics);
    saveCookie("marketing", preferences.marketing);
    setShow(false);
    setPreferencesOpen(false);
  };

  if (!show) return null;

  return (
    <>
      {/* Botón flotante */}
      {!preferencesOpen && (
        <button
          onClick={() => setPreferencesOpen(true)}
          className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg z-50"
        >
          🍪 Cookies
        </button>
      )}

      {/* Modal de preferencias */}
      {preferencesOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-xl shadow-xl max-w-sm w-full flex flex-col gap-4">
            <p className="text-lg font-bold text-center">Configuración de Cookies</p>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) => setPreferences((p) => ({ ...p, analytics: e.target.checked }))}
              /> Cookies de Analítica
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={(e) => setPreferences((p) => ({ ...p, marketing: e.target.checked }))}
              /> Cookies de Marketing
            </label>

            <div className="flex justify-center gap-3 mt-4">
              <button onClick={acceptPreferences} className="bg-blue-600 text-white px-4 py-2 rounded">Guardar</button>
              <button onClick={acceptAll} className="bg-green-600 text-white px-4 py-2 rounded">Aceptar todo</button>
              <button onClick={rejectAll} className="bg-red-600 text-white px-4 py-2 rounded">Rechazar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
