import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding & Visuals */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-teal-600 via-teal-700 to-teal-900 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-200 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/20 rounded-full" />
        </div>
        
        {/* Paw Print Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="paws" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="2" fill="white" />
              <circle cx="15" cy="5" r="2" fill="white" />
              <circle cx="10" cy="10" r="3" fill="white" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#paws)" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center w-full px-12">
          {/* Logo */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white tracking-tight">PetCode</h1>
              <p className="text-teal-200 text-sm">Gestão Veterinária</p>
            </div>
          </div>

          {/* Tagline */}
          <div className="text-center max-w-md">
            <h2 className="text-3xl font-semibold text-white/90 leading-tight mb-4">
              Cuide bem dos seus pets.<br />
              <span className="text-teal-200">Simplifique sua clínica.</span>
            </h2>
            <p className="text-teal-100/70 text-lg">
              Sistema completo de gestão para clínicas veterinárias moderno e intuitivo.
            </p>
          </div>

          {/* Features Preview */}
          <div className="mt-12 grid grid-cols-3 gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl mb-1">🏥</div>
              <p className="text-xs text-teal-100">Prontuários</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl mb-1">📅</div>
              <p className="text-xs text-teal-100">Agendamentos</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl mb-1">🐕</div>
              <p className="text-xs text-teal-100">Pets & Tutores</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">PetCode</h1>
              <p className="text-xs text-slate-500">Gestão Veterinária</p>
            </div>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Bem-vindo de volta!</h2>
            <p className="text-slate-500 mt-2">Entre com suas credenciais para continuar</p>
          </div>

          {/* Form */}
          <form className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="seu@email.com"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  Senha
                </label>
                <Link href="/forgot-password" className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                  Esqueceu a senha?
                </Link>
              </div>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-slate-600">
                Lembrar-me por 30 dias
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <span>Entrar</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>

          {/* Demo Hint */}
          <div className="mt-8 p-4 bg-teal-50 rounded-lg border border-teal-100">
            <p className="text-sm text-teal-800">
              <strong>Demo:</strong> admin@petcode.com.br / admin123
            </p>
          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-slate-500">
            © 2026 PetCode. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
