import { updateProfile } from './actions';

export default function Home() {
    return (
        <main className="w-full max-w-4xl retro-container p-8 relative z-10 font-mono">
            <header className="mb-10 border-b-2 border-[#008f11] pb-6 text-center">
                <h1 className="text-5xl font-bold retro-title mb-4 text-[#00ff41]">WIZ-DEMO-DEFEND</h1>
                <div className="flex justify-center items-center gap-6 text-xs tracking-widest uppercase">
                    <p>Status: <span className="text-[#00ff41]">ONLINE</span></p>
                    <span className="text-gray-600">|</span>
                    <p>Security: <span className="text-red-500">ACTIVE</span></p>
                </div>
            </header>

            <div className="max-w-md mx-auto">
                <div className="border border-[#008f11] p-8 bg-[#050505] shadow-[0_0_20px_rgba(0,143,17,0.1)]">
                    <h2 className="text-xl font-bold mb-8 text-center text-[#00ff41] tracking-widest flex items-center justify-center gap-2">
                        <span>[</span> SYSTEM CONSOLE <span>]</span>
                    </h2>

                    <form action={updateProfile} className="space-y-8">
                        {/* Hidden fields for internal state */}
                        <input type="hidden" name="username" value="guest_user" />
                        <input type="hidden" name="bio" value="Automatic system diagnostic check" />
                        <input type="hidden" name="config" value='{"access_level": "guest"}' />

                        <div className="space-y-3 bg-[#0a0a0a] p-4 border border-[#008f11]/20 rounded text-[10px] text-gray-400">
                            <p className="flex justify-between"><span>IDENTIFIER:</span> <span className="text-[#00ff41]">GUEST_SESSION</span></p>
                            <p className="flex justify-between"><span>PERMISSION:</span> <span className="text-yellow-600">LEVEL_1</span></p>
                            <p className="flex justify-between"><span>GATEWAY:</span> <span className="text-blue-400">READY</span></p>
                        </div>

                        <button type="submit" className="w-full py-4 retro-button text-lg tracking-widest border border-[#008f11] text-white hover:bg-[#002200] transition-colors">
                            EXECUTE SYSTEM UPDATE
                        </button>
                    </form>
                </div>

                <div className="mt-8 text-[10px] text-gray-500 font-mono text-center space-y-1 opacity-50">
                    <p>> initializing_kernel_v1.0.4...</p>
                    <p>> session_confirmed_secure...</p>
                </div>
            </div>

            <footer className="mt-16 text-center text-[10px] opacity-40 uppercase tracking-[0.2em]">
                <p>Wiz-Demo-Defend // <span className="text-red-500">UNSECURED_ENDPOINT_DETECTED</span></p>
            </footer>
        </main>
    );
}
