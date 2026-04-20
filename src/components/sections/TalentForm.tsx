import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, LoaderCircle, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  completeGoogleRedirectAccess,
  loginWithEmailPassword,
  registerWithEmailPassword,
  signInWithGoogleAccount,
} from "@/auth";
import { consumePostLoginRedirect } from "@/lib/dashboardStorage";

type AccessMode = "login" | "register";

export const TalentForm = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AccessMode>("register");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const completeRedirect = async () => {
      try {
        const result = await completeGoogleRedirectAccess();
        if (result) {
          setSubmitted(true);
          navigate(consumePostLoginRedirect() || "/dashboard", { replace: true });
        }
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "No pudimos completar el acceso con Google.");
      }
    };

    void completeRedirect();
  }, [navigate]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      if (mode === "register") {
        await registerWithEmailPassword({
          email: formData.email.trim(),
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
        });
      } else {
        await loginWithEmailPassword({
          email: formData.email.trim(),
          password: formData.password,
        });
      }

      setSubmitted(true);
      navigate(consumePostLoginRedirect() || "/dashboard", { replace: true });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "No pudimos procesar el acceso.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const result = await signInWithGoogleAccount();
      if (result?.user) {
        setSubmitted(true);
        navigate(consumePostLoginRedirect() || "/dashboard", { replace: true });
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Error al conectar con Google.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8 font-gotham">
      <div className="absolute top-0 left-0 w-64 h-64 bg-diners-blue-sky/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-diners-twilight/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-6xl grid lg:grid-cols-[45%_55%] bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden"
      >
        <div className="relative hidden lg:block overflow-hidden bg-[#041E42]">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
            alt="Office"
            className="absolute inset-0 h-full w-full object-cover mix-blend-overlay opacity-40 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#041E42]/80 via-transparent to-[#041E42]" />

          <div className="relative h-full flex flex-col justify-between p-16 text-white">
            <div>
              <h2 className="text-5xl font-black leading-[1.1] mb-6">
                Impulsa el futuro <br />
                <span className="text-diners-blue-sky">Diners Club.</span>
              </h2>
              <p className="text-lg font-light text-white/70 leading-relaxed max-w-sm">
                Tu potencial encuentra su proximo gran escenario. Unete para transformar la experiencia financiera.
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm font-medium text-white/50">
              <span className="w-8 h-[1px] bg-white/20" />
              <span>Unete a la Familia Diners Club</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col p-8 md:p-16 lg:p-20 justify-center">
          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center space-y-6"
            >
              <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
              </div>
              <h3 className="text-4xl font-black text-diners-twilight">Bienvenido</h3>
              <p className="text-slate-500 max-w-xs mx-auto">Tu perfil ha sido configurado. Ya puedes acceder a tu panel personalizado.</p>
              <Button
                onClick={() => navigate("/dashboard")}
                className="w-full h-14 rounded-2xl bg-[#041E42] hover:bg-diners-blue-sky text-white font-bold text-lg transition-all shadow-xl group"
              >
                Ir a mi Dashboard <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          ) : (
            <div className="max-w-md mx-auto w-full space-y-8">
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-diners-twilight">
                  {mode === "register" ? "Crear perfil" : "Bienvenido de nuevo"}
                </h3>
                <p className="text-slate-400 font-medium">Ingresa tus credenciales para continuar.</p>
              </div>

              <div className="flex p-1 bg-slate-100 rounded-2xl">
                {(["register", "login"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      setMode(m);
                      setErrorMessage("");
                    }}
                    className={`flex-1 py-3 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all ${mode === m ? "bg-white text-diners-twilight shadow-sm scale-[1.02]" : "text-slate-400 hover:text-slate-600"}`}
                  >
                    {m === "register" ? "Registro" : "Login"}
                  </button>
                ))}
              </div>

              <form onSubmit={handleEmailAuth} className="space-y-4">
                {mode === "register" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-[10px] font-bold uppercase text-slate-500 ml-1">Nombre</Label>
                      <Input
                        placeholder="Juan"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="h-12 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-diners-blue-sky/20"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[10px] font-bold uppercase text-slate-500 ml-1">Apellido</Label>
                      <Input
                        placeholder="Perez"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="h-12 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-diners-blue-sky/20"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase text-slate-500 ml-1">Correo Electronico</Label>
                  <Input
                    type="email"
                    placeholder="nombre@correo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-diners-blue-sky/20"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase text-slate-500 ml-1">Contrasena</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="h-12 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-diners-blue-sky/20 pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 text-red-600 text-[11px] p-4 rounded-xl font-bold border border-red-100"
                    >
                      {errorMessage}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="pt-4 space-y-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 rounded-2xl bg-[#041E42] hover:bg-diners-blue-sky text-white font-black uppercase tracking-widest transition-all shadow-lg active:scale-[0.98]"
                  >
                    {isSubmitting ? <LoaderCircle className="animate-spin" /> : mode === "register" ? "Crear Perfil" : "Entrar"}
                  </Button>

                  <div className="flex items-center gap-4 py-2">
                    <div className="h-[1px] flex-1 bg-slate-100" />
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">o</span>
                    <div className="h-[1px] flex-1 bg-slate-100" />
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={isSubmitting}
                    className="w-full h-14 rounded-2xl border-2 border-slate-100 hover:bg-slate-50 transition-all flex items-center justify-center gap-3 font-bold text-slate-600 active:scale-[0.98]"
                  >
                    <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="G" />
                    <span>Continuar con Google</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};
