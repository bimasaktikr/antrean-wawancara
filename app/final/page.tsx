export const dynamic = 'force-dynamic'; // Paksa Server-Side Rendering (Anti Error Build)

export default async function RegistrasiPage() {
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
    console.error(error);
  }

  const finalUrl = gasUrl ? `${gasUrl}?view=final` : "";

  return (
    <main className="w-full h-screen overflow-hidden bg-slate-50">
      {finalUrl ? (
        <iframe src={finalUrl} className="w-full h-full border-0" title="Panel Pendaftaran" />
      ) : (
        <div className="flex h-full items-center justify-center text-red-500 font-bold">⚠️ Gagal memuat URL. Periksa Link CSV.</div>
      )}
    </main>
  );
}