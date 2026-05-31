"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';

function AntreanCentralSystem() {
  const searchParams = useSearchParams();
  const view = searchParams.get('view') || 'public';

  const [gasUrl, setGasUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // =====================================================================
  // 🔴 PASTE LINK "PUBLISH TO WEB (CSV)" GOOGLE SHEETS ANDA DI SINI
  // =====================================================================
  const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT_fCNCFXk3w8nrnExKSoODRxWEjFiurr4LYeHu9vv7JcIYLueM_xbPK8y2GKyyOSqqf8uInhtT1OLS/pub?gid=1638517982&single=true&output=csv";

  useEffect(() => {
    const fetchUrlFromSheet = async () => {
      try {
        // Trik parameter waktu (t=...) agar browser TIDAK BISA nge-cache data lama
        const response = await fetch(`${SHEET_CSV_URL}&t=${new Date().getTime()}`, {
          cache: 'no-store'
        });

        if (!response.ok) throw new Error("Gagal terhubung ke Cloud BPS");

        const csvText = await response.text();
        const rows = csvText.split('\n');
        let foundUrl = "";

        // Mencari baris yang mengandung 'CURRENT_GAS_URL'
        for (let row of rows) {
          const cols = row.split(',');
          if (cols[0] === "CURRENT_GAS_URL" && cols.length > 1) {
            foundUrl = cols[1].trim();
            break;
          }
        }

        if (foundUrl && foundUrl.startsWith("http")) {
          setGasUrl(foundUrl);
          setError(""); // Hapus error jika sukses
        } else {
          throw new Error("URL Server belum dikonfigurasi di Google Sheets");
        }

      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    // Jalankan saat pertama kali dibuka
    fetchUrlFromSheet();
    
    // 🔥 FITUR AUTOPILOT: Cek perubahan link di Sheets setiap 60 detik
    // Jika Anda ganti link di Sheets, seluruh PC akan update otomatis dalam 1 menit!
    const interval = setInterval(fetchUrlFromSheet, 60000);
    return () => clearInterval(interval);
    
  }, [SHEET_CSV_URL]);

  // TAMPILAN LOADING
  if (isLoading && !gasUrl) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-slate-950 text-white gap-4 font-sans">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-xs uppercase tracking-widest text-slate-400 font-bold animate-pulse">Menyinkronkan Node Jaringan...</div>
      </div>
    );
  }

  // TAMPILAN ERROR (Jika link CSV salah atau Sheets terhapus)
  if (error && !gasUrl) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-slate-950 text-white font-sans text-center px-6">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <p className="font-bold text-xl tracking-wider uppercase">Koneksi Pusat Terputus</p>
        <p className="text-sm text-slate-400 mt-2">{error}</p>
      </div>
    );
  }

  // TAMPILAN SISTEM UTAMA
  const finalGasUrl = `${gasUrl}?view=${view}`;

  return (
    <div className="w-full h-screen overflow-hidden bg-slate-950 flex items-center justify-center">
      <iframe 
        src={finalGasUrl} 
        className="w-full h-full border-none"
        title="Sistem Antrean Sensus Ekonomi 2026"
        allow="autoplay; fullscreen; speaker-selection"
      />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="bg-slate-950 h-screen flex items-center justify-center text-white text-xs uppercase tracking-widest font-bold animate-pulse">Inisialisasi Sistem...</div>}>
      <AntreanCentralSystem />
    </Suspense>
  );
}