import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
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
  };

  const rejectAll = () => {
    saveCookie("cookie_consent", "none");
    saveCookie("analytics", false);
    saveCookie("marketing", false);
    setShow(false);
  };

  const acceptPreferences = () => {
    saveCookie("cookie_consent", "preferences");
    saveCookie("analytics", preferences.analytics);
    saveCookie("marketing", preferences.marketing);
    setShow(false);
    setShowPreferences(false);
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 p-4 transition-all duration-300 ${show ? "opacity-100 visible" : "opacity-0 invisible"} bg-gray-900 text-white z-50`}>
      <p className="text-center font-semibold">🍪 Usamos cookies para mejorar tu experiencia</p>
      
      {!showPreferences ? (
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <button onClick={acceptAll} className="bg-green-500 px-4 py-2 rounded">Aceptar todo</button>
          <button onClick={() => setShowPreferences(true)} className="bg-yellow-500 px-4 py-2 rounded">Preferencias</button>
          <button onClick={rejectAll} className="bg-red-500 px-4 py-2 rounded">Rechazar todo</button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 mt-4">
          <label>
            <input
              type="checkbox"
              checked={preferences.analytics}
              onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
            /> Cookies de Analítica
          </label>
          <label>
            <input
              type="checkbox"
              checked={preferences.marketing}
              onChange={(e) => setPreferences(prev => ({ ...prev, marketing: e.target.checked }))}
            /> Cookies de Marketing
          </label>
          <button onClick={acceptPreferences} className="bg-blue-500 px-4 py-2 rounded">Guardar preferencias</button>
        </div>
      )}
    </div>
  );
}
