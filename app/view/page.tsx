export default async function DynamicPosPage({ params }: { params: { view: string } }) {
  // 1. Menangkap kata dari URL secara otomatis (isinya akan jadi "reg", "hw", dll)
  const { view } = params; 

  // 2. Link CSV dari Tab "Konfigurasi" Google Sheets Anda
  const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT_fCNCFXk3w8nrnExKSoODRxWEjFiurr4LYeHu9vv7JcIYLueM_xbPK8y2GKyyOSqqf8uInhtT1OLS/pub?gid=1638517982&single=true&output=csv";
  
  let gasUrl = "";

  try {
    const res = await fetch(CSV_URL, { cache: 'no-store' });
    const csvText = await res.text();
    
    const rows = csvText.split('\n');
    for (const row of rows) {
      if (row.includes('CURRENT_GAS_URL')) {
        gasUrl = row.split(',')[1].replace(/['"\r]/g, '').trim(); 
        break;
      }
    }
  } catch (error) {
    console.error("Gagal menarik konfigurasi URL GAS:", error);
  }

  // 3. Gabungkan URL GAS dengan variabel view yang ditangkap dari URL Next.js
  const finalUrl = gasUrl ? `${gasUrl}?view=${view}` : "";

  // 4. (Opsional) Bikin judul iframe dinamis biar rapi
  const titleMap: Record<string, string> = {
    reg: "Panel Pendaftaran",
    hw: "Pos Pemeriksaan Hardware",
    interview: "Panel Wawancara",
    public: "Layar Publik TV"
  };

  return (
    <main className="w-full h-screen overflow-hidden bg-slate-50">
      {finalUrl ? (
        <iframe 
          src={finalUrl} 
          className="w-full h-full border-0"
          title={titleMap[view] || "Sistem Antrean BPS"}
          // Pasang semua izin (termasuk mic & autoplay) agar halaman Public TV tetap bisa ngomong
          allow="microphone; camera; autoplay; clipboard-write; encrypted-media; picture-in-picture"
        />
      ) : (
        <div className="flex h-full items-center justify-center text-red-500 font-bold">
          ⚠️ Gagal memuat URL Server. Periksa Link CSV Konfigurasi Anda.
        </div>
      )}
    </main>
  );
}