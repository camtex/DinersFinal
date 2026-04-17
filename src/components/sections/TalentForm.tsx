import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  LoaderCircle,
  Eye,
  EyeOff
} from "lucide-react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"; // Importaciones de Google Auth
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db, auth } from "@/firebase"; // Asegúrate de exportar 'auth' desde tu archivo firebase.ts
import {
  completeEmailLinkAccess,
  getPendingProfile,
  hasEmailLink,
  sendAccessLink,
} from "@/auth";
import { consumePostLoginRedirect, saveStoredUserProfile } from "@/lib/dashboardStorage";

type AccessMode = "login" | "register";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const modeCopy: Record<AccessMode, { title: string; description: string; success: string; emailNotice: string; }> = {
  register: {
    title: "Crea tu acceso",
    description: "Registra tu perfil con nombre, apellido y Gmail para entrar al ecosistema.",
    success: "Tu registro fue confirmado y ya quedaste conectado a la plataforma.",
    emailNotice: "Te enviamos un enlace de registro a tu Gmail para validar tu acceso.",
  },
  login: {
    title: "Inicia tu sesión",
    description: "Usa tu Gmail para recibir un enlace seguro y entrar sin contraseñas.",
    success: "Tu sesión quedó iniciada correctamente.",
    emailNotice: "Te enviamos un enlace de acceso a tu Gmail para que inicies sesión.",
  },
};

export const TalentForm = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AccessMode>("register");
  const [formData, setFormData] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompletingAccess, setIsCompletingAccess] = useState(true);

  const navigateAfterAccess = () => {
    navigate(consumePostLoginRedirect() || "/dashboard");
  };

  // Limpiar errores automáticamente
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  useEffect(() => {
    setErrorMessage("");
    setStatusMessage("");
  }, [mode]);

  // Lógica de Google Login
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Separar nombre y apellido del perfil de Google
      const nameParts = user.displayName?.split(" ") ?? ["", ""];
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ");

      await saveUserProfile({
        uid: user.uid,
        email: user.email ?? "",
        firstName: firstName,
        lastName: lastName,
        mode: "login",
      });

      setSubmitted(true);
      setStatusMessage("Autenticación con Google exitosa.");
    } catch (error: any) {
      console.error("Error Google Auth:", error);
      if (error.code !== "auth/cancelled-popup-request") {
        setErrorMessage("Hubo un problema al conectar con Google.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const completeAccess = async () => {
      if (!hasEmailLink(window.location.href)) {
        const pendingProfile = getPendingProfile();
        if (pendingProfile) {
          setFormData({ ...initialForm, ...pendingProfile, password: "" });
          setMode(pendingProfile.mode);
        }
        setIsCompletingAccess(false);
        return;
      }

      try {
        const { user, profile } = await completeEmailLinkAccess(window.location.href);
        await saveUserProfile({
          uid: user.uid,
          email: user.email ?? profile?.email ?? "",
          firstName: profile?.firstName ?? "",
          lastName: profile?.lastName ?? "",
          mode: profile?.mode ?? "login",
        });
        setSubmitted(true);
      } catch (error) {
        setErrorMessage("No pudimos completar el acceso. Solicita un nuevo enlace.");
      } finally {
        setIsCompletingAccess(false);
      }
    };
    void completeAccess();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleAccessRequest = async (selectedMode: AccessMode) => {
    if (!formData.email.endsWith("@gmail.com")) {
      setErrorMessage("Ingresa un correo de Gmail válido.");
      return;
    }
    setIsSubmitting(true);
    try {
      await sendAccessLink({ ...formData, mode: selectedMode });
      setStatusMessage(modeCopy[selectedMode].emailNotice);
    } catch (error) {
      setErrorMessage("Error al enviar el acceso. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isCompletingAccess) {
    return (
      <div className="py-40 text-center bg-diners-twilight text-white h-screen flex flex-col justify-center">
        <LoaderCircle className="w-12 h-12 animate-spin mx-auto mb-6 text-diners-blue-sky" />
        <h2 className="text-4xl font-black italic">Validando acceso...</h2>
      </div>
    );
  }

  return (
    <section id="registro" className="py-40 bg-[#f8fbfd] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid rounded-[3rem] border border-white/60 bg-white/90 shadow-2xl lg:grid-cols-[0.95fr_1.05fr] overflow-hidden">

          <div className="bg-diners-twilight px-10 py-16 text-white flex flex-col justify-between">
            <div>
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white/70">
                Acceso Diners
              </span>
              <h2 className="mt-8 text-4xl md:text-5xl font-black leading-tight italic">
                Tu entrada al ecosistema <span className="text-diners-blue-sky">Premium.</span>
              </h2>
              <p className="mt-6 text-white/60 font-light leading-relaxed">
                Utiliza tu cuenta institucional o personal de Google para un acceso instantáneo y seguro.
              </p>
            </div>
          </div>

          <div className="px-8 py-12 md:px-14">
            {submitted ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                <CheckCircle2 className="h-16 w-16 text-diners-lakefront mx-auto mb-6" />
                <h3 className="text-3xl font-black text-diners-twilight">Acceso confirmado</h3>
                <p className="mt-4 text-slate-500 font-light">{statusMessage || modeCopy[mode].success}</p>
                <Button onClick={navigateAfterAccess} className="mt-8 rounded-full px-10">Ir a mi perfil</Button>
              </motion.div>
            ) : (
              <div className="max-w-xl mx-auto">
                <div className="rounded-2xl bg-slate-100 p-1.5 flex gap-1 mb-10">
                  <button type="button" onClick={() => setMode("register")} className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${mode === "register" ? "bg-white shadow-sm text-diners-twilight" : "text-slate-400"}`}>
                    Registrarte
                  </button>
                  <button type="button" onClick={() => setMode("login")} className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${mode === "login" ? "bg-white shadow-sm text-diners-twilight" : "text-slate-400"}`}>
                    Iniciar Sesión
                  </button>
                </div>

                {/*  <div className="relative mb-8 text-center">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                  <span className="relative px-4 bg-white text-[10px] font-black text-slate-300 uppercase tracking-widest">O con tu correo</span>
                </div> */}

                <form onSubmit={(e) => { e.preventDefault(); void handleAccessRequest(mode); }} className="space-y-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-slate-400">Nombre</Label>
                      <Input id="firstName" value={formData.firstName} onChange={handleChange} placeholder="Tu nombre" className="h-12 rounded-2xl border-slate-200" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-slate-400">Apellido</Label>
                      <Input id="lastName" value={formData.lastName} onChange={handleChange} placeholder="Tu apellido" className="h-12 rounded-2xl border-slate-200" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400">Gmail</Label>
                    <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="tunombre@gmail.com" className="h-12 rounded-2xl border-slate-200" />
                  </div>

                  <div className="space-y-2 relative">
                    <Label className="text-[10px] font-black uppercase text-slate-400">Contraseña</Label>
                    <div className="relative">
                      <Input id="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} placeholder="••••••••" className="h-12 rounded-2xl border-slate-200 pr-12" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-diners-lakefront transition-colors">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {errorMessage && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-[11px] font-bold">
                        {errorMessage}
                      </motion.div>
                    )}
                    {statusMessage && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-3 rounded-xl bg-diners-blue-sky/10 border border-diners-blue-sky/20 text-diners-twilight text-[11px] font-bold">
                        {statusMessage}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button disabled={isSubmitting} className="w-full h-14 rounded-2xl bg-diners-twilight hover:bg-diners-lakefront text-white font-black uppercase tracking-widest text-[11px] transition-all shadow-lg active:scale-95">
                    {isSubmitting ? <LoaderCircle className="animate-spin" /> : (mode === "register" ? "Crear Perfil" : "Entrar")}
                  </Button>

                  {/* BOTÓN GOOGLE FUNCIONAL */}
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={isSubmitting}
                    className="w-full h-12 flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition-all mb-8 shadow-sm group active:scale-[0.98] disabled:opacity-50"
                  >
                    <svg className="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    <span className="text-sm font-bold text-diners-twilight">Continuar con Google</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const saveUserProfile = async ({ uid, email, firstName, lastName, mode }: { uid: string; email: string; firstName: string; lastName: string; mode: AccessMode; }) => {
  saveStoredUserProfile({
    uid,
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`.trim(),
    email,
    lastAccessMode: mode,
  });

  await setDoc(doc(db, "users", uid), {
    firstName, lastName,
    fullName: `${firstName} ${lastName}`.trim(),
    email, lastAccessMode: mode,
    lastAccessAt: serverTimestamp(),
  }, { merge: true });
};
