import Link from 'next/link';
import { Users, MonitorSmartphone, Mic, LayoutDashboard, BarChart3 } from 'lucide-react'; // Tambahkan BarChart3

export default function Home() {
  const menus = [
    {
      title: "Registrasi & Check-In",
      description: "Pos pendaftaran depan dan verifikasi kehadiran kandidat.",
      icon: <Users className="w-12 h-12 mb-5 text-amber-500" />,
      href: "/reg",
      colorClass: "hover:border-amber-500 hover:shadow-amber-100"
    },
    {
      title: "Pemeriksaan Hardware",
      description: "Pos pengecekan spesifikasi perangkat Android peserta.",
      icon: <MonitorSmartphone className="w-12 h-12 mb-5 text-blue-500" />,
      href: "/hw",
      colorClass: "hover:border-blue-500 hover:shadow-blue-100"
    },
    {
      title: "Panel Wawancara",
      description: "Pos penguji dan penilaian performa (Meja 1-14).",
      icon: <Mic className="w-12 h-12 mb-5 text-emerald-500" />,
      href: "/interview",
      colorClass: "hover:border-emerald-500 hover:shadow-emerald-100"
    },
    {
      title: "Layar Publik TV",
      description: "Layar antrean sentral untuk ruang tunggu peserta.",
      icon: <LayoutDashboard className="w-12 h-12 mb-5 text-purple-500" />,
      href: "/public",
      colorClass: "hover:border-purple-500 hover:shadow-purple-100"
    },
    {
      title: "Monitoring Hasil", // 🔥 MENU BARU
      description: "Analisis data final, skoring, & hasil seleksi.",
      icon: <BarChart3 className="w-12 h-12 mb-5 text-rose-500" />, // Ikon Rose/Pink agar beda warna
      href: "/final",
      colorClass: "hover:border-rose-500 hover:shadow-rose-100"
    }
  ];  

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-7xl w-full"> {/* Ubah max-w jadi 7xl biar grid 5 kolom muat */}
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Tes Wawancara <span className="text-indigo-600">SE2026</span>
          </h1>
          <p className="text-slate-500 text-sm md:text-base font-medium">
            Sistem Integrasi Antrean Terpadu Sensus Ekonomi
          </p>
        </div>

        {/* GRID MENU (Grid diperbarui jadi 5 kolom di layar besar) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {menus.map((menu, index) => (
            <Link key={index} href={menu.href} className="block group">
              <div className={`bg-white p-8 rounded-3xl shadow-sm border border-slate-200 transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-xl flex flex-col items-center text-center h-full ${menu.colorClass}`}>
                
                <div className="transform transition-transform duration-300 group-hover:scale-110">
                  {menu.icon}
                </div>
                
                <h2 className="text-lg font-bold text-slate-800 mb-3">{menu.title}</h2>
                <p className="text-xs text-slate-500 leading-relaxed">{menu.description}</p>
                
                <div className="mt-6 w-12 h-1 bg-slate-100 rounded-full transition-colors duration-300 group-hover:bg-indigo-500"></div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* FOOTER */}
        <div className="text-center mt-16">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
             Badan Pusat Statistik © 2026
           </p>
        </div>
      </div>
    </main>
  );
}