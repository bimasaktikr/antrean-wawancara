"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';

function AntreanSystem() {
  const searchParams = useSearchParams();
  const view = searchParams.get('view') || 'public';

  // State untuk menyimpan URL GAS secara dinamis
  const [gasUrl, setGasUrl] = useState<string>("");
  const [inputUrl, setInputUrl] = useState<string>("");
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Ambil URL dari localStorage saat halaman pertama kali dimuat
  useEffect(() => {
    const savedUrl = localStorage.getItem("DYNAMIC_GAS_URL");
    if (savedUrl) {
      setGasUrl(savedUrl);
      setInputUrl(savedUrl);
    }
  }, []);

  // Fungsi untuk menyimpan URL baru ke localStorage
  const handleSaveConfig = () => {
    if (!inputUrl.trim().startsWith("https://script.google.com")) {
      alert("⚠️ Mohon masukkan URL Google Apps Script yang valid!");
      return;
    }
    localStorage.setItem("DYNAMIC_GAS_URL", inputUrl.trim());
    setGasUrl(inputUrl.trim());
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  // 1. TAMPILAN PANEL KONFIGURASI (?view=config atau ?view=admin-panel)
  if (view === 'config' || view === 'admin-panel') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans text-white">
        <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">⚙️</span>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                MONITOR CONFIG CENTER
              </h1>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Sensus Ekonomi 2026 - Control Panel</p>
            </div>
          </div>

          <hr className="border-slate-800 my-4" />

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Google Apps Script Web App URL Current
              </label>
              <textarea
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="Paste link /exec Apps Script baru Anda di sini..."
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm font-mono text-cyan-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
              />
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl text-xs text-slate-400 space-y-1">
              <span className="font-bold text-slate-300 block mb-1">💡 Petunjuk Operasional:</span>
              <p>• Setelah melakukan <span className="text-amber-400 font-semibold">New Deployment</span> di GAS, salin tautan akhirnya.</p>
              <p>• Tempelkan pada kotak di atas, lalu klik simpan.</p>
              <p>• Seluruh ekosistem TV Monitor dan Meja Penguji akan otomatis ter-update seketika.</p>
            </div>

            <button
              onClick={handleSaveConfig}
              className="w-full bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] text-white font-bold py-4 rounded-2xl shadow-lg transition tracking-wide text-sm uppercase flex justify-center items-center gap-2"
            >
              {isSaved ? "✅ Konfigurasi Berhasil Disimpan!" : "Simpan Perubahan URL"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. STATE JIKA URL GAS BELUM DI-SET SAMA SEKALI
  if (!gasUrl) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 font-sans text-white text-center">
        <div className="text-6xl mb-4 animate-bounce">🚨</div>
        <h2 className="text-2xl font-black text-red-400 uppercase tracking-wide">Sistem Belum Terhubung</h2>
        <p className="text-slate-400 text-sm max-w-md mt-2 mb-6">
          URL Google Apps Script belum dikonfigurasi pada memori penyimpanan lokal browser ini.
        </p>
        <a 
          href="?view=config" 
          className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-indigo-400 font-bold py-3 px-8 rounded-xl text-sm tracking-wider uppercase transition shadow-md"
        >
          Masuk ke Menu Pengaturan
        </a>
      </div>
    );
  }

  // 3. TAMPILAN UTAMA IFRAME JIKA URL SUDAH AMAN (Meneruskan Parameter Parameter ?view)
  const finalGasUrl = `${gasUrl}?view=${view}`;

  return (
    <div className="w-full h-screen overflow-hidden bg-slate-900 flex items-center justify-center">
      <iframe 
        src={finalGasUrl} 
        className="w-full h-full border-none"
        title="Sistem Antrean Terpadu"
        allow="autoplay; fullscreen; speaker-selection"
      >
        Browser Anda tidak mendukung iframe.
      </iframe>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-slate-950 text-white font-bold animate-pulse uppercase tracking-widest text-xs">Memetakan Node Jaringan...</div>}>
      <AntreanSystem />
    </Suspense>
  );
}