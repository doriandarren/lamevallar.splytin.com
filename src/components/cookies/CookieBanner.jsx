import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setMounted(true);  // Montado en cliente ✅
    const consent = document.cookie.includes("cookie_consent=");
    if (!consent) setShow(true);
  }, []);

  if (!mounted) return null; // No muestra nada hasta que React está montado

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 flex flex-col gap-2 z-50">
      <p className="text-center">Usamos cookies 🍪 para mejorar tu experiencia.</p>
      <div className="flex justify-center gap-4">
        <button onClick={() => aceptar()} className="bg-green-500 px-4 py-2 rounded">Aceptar</button>
        <button onClick={() => rechazar()} className="bg-red-500 px-4 py-2 rounded">Rechazar</button>
      </div>
    </div>
  );

  function aceptar() {
    document.cookie = "cookie_consent=all; path=/; max-age=31536000";
    setShow(false);
  }

  function rechazar() {
    document.cookie = "cookie_consent=none; path=/; max-age=31536000";
    setShow(false);
  }
}
