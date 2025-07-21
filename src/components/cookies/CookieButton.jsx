import { useEffect, useState } from "react";

export default function CookieButton() {
  const [showButton, setShowButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const hasConsent = document.cookie.includes("cookie_consent=");
    setShowButton(!hasConsent);
  }, []);

  const setCookie = (name, value) => {
    document.cookie = `${name}=${value}; path=/; max-age=31536000`;
  };

  const acceptAll = () => {
    setCookie("cookie_consent", "all");
    setCookie("analytics", "true");
    setCookie("marketing", "true");
    setShowButton(false);
    setShowModal(false);
  };

  const rejectAll = () => {
    setCookie("cookie_consent", "none");
    setCookie("analytics", "false");
    setCookie("marketing", "false");
    setShowButton(false);
    setShowModal(false);
  };

  const savePreferences = () => {
    setCookie("cookie_consent", "preferences");
    setCookie("analytics", preferences.analytics);
    setCookie("marketing", preferences.marketing);
    setShowButton(false);
    setShowModal(false);
  };

  if (!showButton) return null;

  return (
    <>
      {/* Botón flotante */}
      {!showModal && (
        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-4 right-4 z-50 px-4 py-3 rounded-full bg-blue-600 text-white font-semibold shadow-lg"
        >
          🍪 Cookies
        </button>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full flex flex-col gap-4 shadow-lg">
            <p className="text-lg font-bold text-center">Preferencias de Cookies</p>

            <label className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) =>
                  setPreferences((prev) => ({ ...prev, analytics: e.target.checked }))
                }
              />
              Cookies de Analítica
            </label>

            <label className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={(e) =>
                  setPreferences((prev) => ({ ...prev, marketing: e.target.checked }))
                }
              />
              Cookies de Marketing
            </label>

            <div className="flex flex-wrap gap-3 justify-center">
              <button onClick={savePreferences} className="bg-blue-600 text-white px-4 py-2 rounded">Guardar</button>
              <button onClick={acceptAll} className="bg-green-600 text-white px-4 py-2 rounded">Aceptar Todo</button>
              <button onClick={rejectAll} className="bg-red-600 text-white px-4 py-2 rounded">Rechazar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
