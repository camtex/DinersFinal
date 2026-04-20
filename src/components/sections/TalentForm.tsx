import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "@/firebase";
import {
  completeEmailLinkAccess,
  getPendingProfile,
  hasEmailLink,
  sendAccessLink,
  signInWithGoogleAccount,
} from "@/auth";
import { consumePostLoginRedirect, saveStoredUserProfile } from "@/lib/dashboardStorage";
import { getRedirectResult } from "firebase/auth";
import { auth } from "@/firebase";

type AccessMode = "login" | "register";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
};

const modeCopy: Record<AccessMode, { title: string; description: string; success: string; emailNotice: string; }> = {
  register: {
    title: "Crea tu acceso",
    description: "Registra tu perfil con nombre, apellido y Gmail para entrar al ecosistema.",
    success: "Tu registro fue confirmado y ya quedaste conectado a la plataforma.",
    emailNotice: "Te enviamos un enlace de registro a tu Gmail para validar tu acceso.",
  },
  login: {
    title: "Inicia tu sesion",
    description: "Usa tu Gmail o Google para entrar de forma segura y continuar tu postulacion.",
    success: "Tu sesion quedo iniciada correctamente.",
    emailNotice: "Te enviamos un enlace de acceso a tu Gmail para que inicies sesion.",
  },
};

export const TalentForm = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AccessMode>("register");
  const [formData, setFormData] = useState(initialForm);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompletingAccess, setIsCompletingAccess] = useState(true);

  const navigateAfterAccess = () => {
    navigate(consumePostLoginRedirect() || "/dashboard");
  };

  useEffect(() => {
    if (!errorMessage) return;

    const timer = setTimeout(() => setErrorMessage(""), 5000);
    return () => clearTimeout(timer);
  }, [errorMessage]);

  useEffect(() => {
    setErrorMessage("");
    setStatusMessage("");
  }, [mode]);

useEffect(() => {
  const completeAccess = async () => {
    // 1. Prioridad: Verificar si venimos de un enlace de Gmail
    if (hasEmailLink(window.location.href)) {
      setIsCompletingAccess(true);
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
        setStatusMessage("Acceso confirmado correctamente.");
      } catch (err) {
        setErrorMessage("No pudimos completar el acceso por correo.");
      }
      setIsCompletingAccess(false);
      return;
    }

    // 2. Manejar el regreso de Google Redirect
    try {
      // Importante: No uses 'auth' directamente si no estás seguro de que cargó
      const result = await getRedirectResult(auth);
      
      if (result?.user) {
        const user = result.user;
        const nameParts = user.displayName?.split(" ") ?? ["", ""];
        
        await saveUserProfile({
          uid: user.uid,
          email: user.email ?? "",
          firstName: nameParts[0],
          lastName: nameParts.slice(1).join(" "),
          mode: "login",
        });

        setSubmitted(true);
        setStatusMessage("Autenticación con Google exitosa.");
      }
    } catch (error: any) {
      console.error("Error en Redirect:", error);
      setErrorMessage("Error al procesar el login con Google.");
    }

    // 3. RESPALDO (Crucial): Si el redirect falló pero el usuario ya tiene sesión
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user && !submitted) {
        // Si hay un usuario pero el formulario no ha marcado "submitted"
        // significa que la sesión ya existe pero no la procesamos
        const nameParts = user.displayName?.split(" ") ?? ["", ""];
        await saveUserProfile({
          uid: user.uid,
          email: user.email ?? "",
          firstName: nameParts[0],
          lastName: nameParts.slice(1).join(" "),
          mode: "login",
        });
        setSubmitted(true);
      }
      setIsCompletingAccess(false);
    });

    return () => unsubscribe();
  };

  void completeAccess();
}, [submitted]); // Añadimos submitted como dependencia para evitar bucles

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleAccessRequest = async (selectedMode: AccessMode) => {
    if (!formData.email.endsWith("@gmail.com")) {
      setErrorMessage("Ingresa un correo de Gmail valido.");
      return;
    }

    setIsSubmitting(true);

    try {
      await sendAccessLink({ ...formData, mode: selectedMode });
      setStatusMessage(modeCopy[selectedMode].emailNotice);
    } catch {
      setErrorMessage("Error al enviar el acceso. Intentalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

const handleGoogleSignIn = async () => {
  setIsSubmitting(true);
  setErrorMessage("");

  try {
    // Al usar Redirect, la ejecución de esta función se detiene aquí 
    // porque la página se recarga/redirige.
    await signInWithGoogleAccount(); 
  } catch (error: any) {
    console.error(error);
    setErrorMessage("No se pudo iniciar el flujo de Google.");
    setIsSubmitting(false);
  }
};

  if (isCompletingAccess) {
    return (
      <div className="flex h-screen flex-col justify-center bg-diners-twilight py-40 text-center text-white">
        <LoaderCircle className="mx-auto mb-6 h-12 w-12 animate-spin text-diners-blue-sky" />
        <h2 className="text-4xl font-black italic">Validando acceso...</h2>
      </div>
    );
  }

  return (
    <section id="registro" className="relative overflow-hidden bg-[#f8fbfd] py-24 md:py-32">
      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/95 shadow-[0_24px_60px_rgba(4,30,66,0.08)] lg:grid-cols-[0.92fr_1.08fr]">
          <div className="flex flex-col justify-between bg-diners-twilight px-8 py-12 text-white md:px-10 md:py-14">
            <div>
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white/70">
                Acceso Diners
              </span>
              <h2 className="mt-8 text-3xl font-black leading-tight md:text-5xl">
                Tu acceso a un perfil mas <span className="text-diners-blue-sky">claro y seguro.</span>
              </h2>
              <p className="mt-6 text-sm font-light leading-relaxed text-white/65 md:text-base">
                Puedes entrar con Google o recibir un enlace seguro en tu correo. Una vez dentro, veras tu perfil y continuaras tu postulacion.
              </p>
            </div>
          </div>

          <div className="px-6 py-10 md:px-10 md:py-12">
            {submitted ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-16 text-center">
                <CheckCircle2 className="mx-auto mb-6 h-16 w-16 text-diners-lakefront" />
                <h3 className="text-3xl font-black text-diners-twilight">Acceso confirmado</h3>
                <p className="mt-4 font-light text-slate-500">{statusMessage || modeCopy[mode].success}</p>
                <Button onClick={navigateAfterAccess} className="mt-8 rounded-full px-10">
                  Ir a mi perfil
                </Button>
              </motion.div>
            ) : (
              <div className="mx-auto max-w-xl">
                <div className="mb-6">
                  <h3 className="text-2xl font-black text-diners-twilight">{modeCopy[mode].title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-diners-twilight-65">{modeCopy[mode].description}</p>
                </div>

                <div className="mb-8 flex gap-1 rounded-2xl bg-slate-100 p-1.5">
                  <button type="button" onClick={() => setMode("register")} className={`flex-1 rounded-xl py-3 text-xs font-black uppercase tracking-wider transition-all ${mode === "register" ? "bg-white text-diners-twilight shadow-sm" : "text-slate-400"}`}>
                    Registrarte
                  </button>
                  <button type="button" onClick={() => setMode("login")} className={`flex-1 rounded-xl py-3 text-xs font-black uppercase tracking-wider transition-all ${mode === "login" ? "bg-white text-diners-twilight shadow-sm" : "text-slate-400"}`}>
                    Iniciar sesion
                  </button>
                </div>

                <div className="mb-6 rounded-2xl border border-diners-blue-sky/15 bg-diners-blue-sky/5 p-4 text-[12px] leading-relaxed text-diners-twilight-65">
                  Este acceso no usa contrasena en el formulario. Puedes continuar con Google o recibir un enlace seguro en tu correo.
                </div>

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

                  <AnimatePresence>
                    {errorMessage && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-xl border border-red-100 bg-red-50 p-3 text-[11px] font-bold text-red-600">
                        {errorMessage}
                      </motion.div>
                    )}
                    {statusMessage && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-xl border border-diners-blue-sky/20 bg-diners-blue-sky/10 p-3 text-[11px] font-bold text-diners-twilight">
                        {statusMessage}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button disabled={isSubmitting} className="h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-lg active:scale-95">
                      {isSubmitting ? <LoaderCircle className="animate-spin" /> : mode === "register" ? "Enviar enlace" : "Recibir acceso"}
                    </Button>

                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      disabled={isSubmitting}
                      className="flex h-14 items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white text-sm font-bold text-diners-twilight shadow-sm transition-all hover:bg-slate-50 disabled:opacity-50"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      Continuar con Google
                    </button>
                  </div>
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
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`.trim(),
    email,
    lastAccessMode: mode,
    lastAccessAt: serverTimestamp(),
  }, { merge: true });
};
