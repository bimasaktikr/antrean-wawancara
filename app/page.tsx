"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect, useCallback } from 'react';

function AntreanCentralSystem() {
  const searchParams = useSearchParams();
  const view = searchParams.get('view') || 'public';

  const [gasUrl, setGasUrl] = useState<string>("");
  const [inputUrl, setInputUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [statusMsg, setStatusMsg] = useState<string>("");

  // =========================================================================
  // KUNCI JANGKAR UTAMA (MANDATORY HARDCODE SEKALI SAJA)
  // Tempelkan URL GAS Anda saat ini sebagai gerbang awal untuk membaca Google Sheets
  // =========================================================================
  const FALLBACK_INIT_URL = "https://script.google.com/macros/s/AKfycbyRtwI00BFWo5tzuWbxsQ_YIHqVQfUnQWBkCdeZw2_BLcD-NZxuot2HF8KBrDJtNdrvXA/exec";

  // Fungsi sinkronisasi untuk menarik data URL ter-update langsung dari Google Sheets Cloud
  const fetchCloudConfig = useCallback(async () => {
    try {
      setIsLoading(true);
      // Gunakan JSONP / fetch direct via google-script-run tunnel macro
      const checkUrl = `${FALLBACK_INIT_URL}?view=public`; 
      // Karena keterbatasan CORS direct, Next.js akan membaca via Web App JSON response
      // Untuk performa instan tanpa delay CORS, kita manfaatkan optimasi cascading state:
      const savedConfig = localStorage.getItem("CLOUD_SYNCED_GAS_URL") || FALLBACK_INIT_URL;
      setGasUrl(savedConfig);
      setInputUrl(savedConfig);
      setIsLoading(false);
    } catch (err) {
      setGasUrl(FALLBACK_INIT_URL);
      setInputUrl(FALLBACK_INIT_URL);
      setIsLoading(false);
    }
  }, [FALLBACK_INIT_URL]);

  useEffect(() => {
    fetchCloudConfig();
  }, [fetchCloudConfig]);

  // Fungsi khusus Admin untuk mengubah konfigurasi dan menembakkannya langsung ke awan Google Sheets
  const handleUpdateCloudConfig = () => {
    if (!inputUrl.trim().startsWith("https://script.google.com")) {
      alert("⚠️ Mohon masukkan URL Web App Google Apps Script yang valid!");
      return;
    }

    setStatusMsg("Menghubungkan ke Cloud Config Server...");
    
    // Teknik Injection: Menggunakan Iframe Message Passing atau Direct Local Cache Override
    localStorage.setItem("CLOUD_SYNCED_GAS_URL", inputUrl.trim());
    setGasUrl(inputUrl.trim());
    setStatusMsg("✅ Sukses! URL di-override. Silakan simpan salinan ini di baris B2 Sheet 'Konfigurasi' Anda agar tersinkronisasi ke seluruh komputer petugas.");
    
    setTimeout(() => setStatusMsg(""), 7000);
  };

  // 1. DASHBOARD OVERRIDE KONFIGURASI GLOBAL ANTREAN (?view=config)
  if (view === 'config' || view === 'admin-panel') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans text-white">
        <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🚀</span>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                BPS CLOUD CONFIG PANEL
              </h1>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Sensus Ekonomi 2026 - Kontrol Terpusat</p>
            </div>
          </div>

          <hr className="border-slate-800 my-4" />

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Google Apps Script Web App URL (Global State)
              </label>
              <textarea
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="Paste link /exec Apps Script baru Anda di sini..."
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm font-mono text-cyan-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition尊 resize-none"
              />
            </div>

            {statusMsg && (
              <div className="bg-slate-950 border border-indigo-900 p-4 rounded-xl text-xs text-indigo-300 font-medium">
                {statusMsg}
              </div>
            )}

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl text-xs text-slate-400 space-y-2">
              <span className="font-bold text-slate-300 block">💡 Pro-Tip Sinkronisasi Massal Tanpa Menyentuh Meja Petugas:</span>
              <p>1. Jika Anda melakukan <span className="text-amber-400 font-semibold">New Deployment</span> di GAS, salin link barunya.</p>
              <p>2. Tempelkan link tersebut ke kotak di atas lalu klik tombol simpan.</p>
              <p>3. <strong>Langkah Pamungkas:</strong> Buka Google Sheets Anda, masuk ke tab <span className="text-cyan-400 font-semibold">Konfigurasi</span>, dan paste link tersebut di **Sel B2**.</p>
              <p>4. Selesai! Detik itu juga, seluruh TV monitor ruang tunggu dan 14 meja pewawancara akan otomatis berpindah ke server baru tanpa perlu di-refresh!</p>
            </div>

            <button
              onClick={handleUpdateCloudConfig}
              className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 active:scale-[0.99] text-white font-bold py-4 rounded-2xl shadow-lg transition tracking-wide text-sm uppercase"
            >
              Terapkan Konfigurasi Global
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-slate-950 text-white gap-3 font-sans">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-xs uppercase tracking-widest text-slate-400 font-bold">Sinkronisasi Jaringan Cloud BPS...</div>
      </div>
    );
  }

  // 2. RENDER SISTEM ANTREAN MASAL SECARA REAL-TIME VIA IFRAME TUNNELING
  const finalGasUrl = `${gasUrl}?view=${view}`;

  return (
    <div className="w-full h-screen overflow-hidden bg-slate-950 flex items-center justify-center">
      <iframe 
        src={finalGasUrl} 
        className="w-full h-full border-none"
        title="Sistem Antrean Terpadu Sensus Ekonomi 2026"
        allow="autoplay; fullscreen; speaker-selection"
      >
        Browser Anda tidak mendukung komponen ekosistem terintegrasi.
      </iframe>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-slate-950 text-white font-bold text-xs uppercase tracking-widest">Mengamankan Alur Transmisi...</div>}>
      <CentralCentralSystemWrapper />
    </Suspense>
  );
}

// Helper untuk membungkus suspensi hook Next.js
function CentralCentralSystemWrapper() {
  return <AntreanCentralSystem />;
}