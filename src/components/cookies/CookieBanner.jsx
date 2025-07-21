import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const consent = document.cookie.includes("cookie_consent=");
    if (!consent) setShow(true);
  }, []);

  const acceptAll = () => {
    document.cookie = "cookie_consent=all; path=/; max-age=31536000";
    setShow(false);
  };

  const rejectAll = () => {
    document.cookie = "cookie_consent=none; path=/; max-age=31536000";
    setShow(false);
  };

  const acceptPreferences = () => {
    document.cookie = `cookie_consent=preferences; path=/; max-age=31536000`;
    document.cookie = `analytics=${preferences.analytics}; path=/; max-age=31536000`;
    document.cookie = `marketing=${preferences.marketing}; path=/; max-age=31536000`;
    setShow(false);
    setShowPreferences(false);
  };

  return show && (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 flex flex-col gap-2 z-50">
      <p className="text-center">Usamos cookies para mejorar tu experiencia 🍪</p>
      {!showPreferences ? (
        <div className="flex justify-center gap-4">
          <button onClick={acceptAll} className="bg-green-500 px-4 py-2 rounded">Aceptar todo</button>
          <button onClick={() => setShowPreferences(true)} className="bg-yellow-500 px-4 py-2 rounded">Preferencias</button>
          <button onClick={rejectAll} className="bg-red-500 px-4 py-2 rounded">Rechazar todo</button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col gap-2">
            <label>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) => setPreferences(p => ({ ...p, analytics: e.target.checked }))}
              /> Cookies de Analítica
            </label>
            <label>
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={(e) => setPreferences(p => ({ ...p, marketing: e.target.checked }))}
              /> Cookies de Marketing
            </label>
          </div>
          <button onClick={acceptPreferences} className="bg-blue-500 px-4 py-2 rounded">Guardar preferencias</button>
        </div>
      )}
    </div>
  );
}
