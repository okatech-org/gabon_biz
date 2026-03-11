const MODULES = [
  {
    title: 'Creer mon entreprise',
    desc: 'Guichet unique entrepreneur - Immatriculation simplifiee',
    icon: '\uD83C\uDFE2',
    color: 'bg-orange-500',
    href: '/entrepreneur',
  },
  {
    title: 'Marches Publics',
    desc: "Appels d'offres et soumissions digitales",
    icon: '\uD83D\uDCCB',
    color: 'bg-blue-500',
    href: '/marches',
  },
  {
    title: 'Innovation Hub',
    desc: 'Marketplace de solutions numeriques KIMBA 2.0',
    icon: '\uD83D\uDCA1',
    color: 'bg-purple-500',
    href: '/innovation',
  },
  {
    title: 'Incubateur Digital',
    desc: 'Programme SING 2.0 pour startups gabonaises',
    icon: '\uD83D\uDE80',
    color: 'bg-green-500',
    href: '/incubateur',
  },
  {
    title: 'Investir au Gabon',
    desc: 'Connectez investisseurs et entrepreneurs',
    icon: '\uD83D\uDCB0',
    color: 'bg-yellow-500',
    href: '/investir',
  },
  {
    title: 'Observatoire',
    desc: "Indicateurs de l'economie numerique gabonaise",
    icon: '\uD83D\uDCCA',
    color: 'bg-teal-500',
    href: '/observatoire',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Hero */}
      <header className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">GABON BIZ</h1>
          <p className="mt-4 text-lg text-orange-100">Votre portail economique numerique</p>
          <p className="mt-2 text-sm text-orange-200">
            Ministere de l&apos;Economie Numerique du Gabon
          </p>
        </div>
      </header>

      {/* Modules */}
      <main className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="mb-8 text-2xl font-semibold text-zinc-800">Nos services</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((mod) => (
            <a
              key={mod.title}
              href={mod.href}
              className="group flex flex-col rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${mod.color} text-2xl text-white`}
              >
                {mod.icon}
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-orange-600">
                {mod.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-500">{mod.desc}</p>
            </a>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-8 text-center text-sm text-zinc-500">
        <p>GABON BIZ &mdash; NTSAGUI Digital &amp; OKA Tech</p>
        <p className="mt-1">Ministere de l&apos;Economie Numerique du Gabon</p>
      </footer>
    </div>
  );
}
