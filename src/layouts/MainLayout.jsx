export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-green-800 text-white p-5">
        <h1 className="text-2xl font-bold mb-10">SmartRancho</h1>

        <nav className="space-y-3">
          <button className="block w-full text-left p-2 rounded hover:bg-green-700">
            Dashboard
          </button>

          <button className="block w-full text-left p-2 rounded hover:bg-green-700">
            Potreros
          </button>
        </nav>
      </aside>

      {/* CONTENIDO */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <header className="bg-white shadow p-4">
          <h2 className="font-semibold">Panel de control</h2>
        </header>

        {/* PAGE CONTENT */}
        <main className="p-6">
          {children}
        </main>

      </div>
    </div>
  )
}