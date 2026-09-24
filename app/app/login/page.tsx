"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!supabase) {
      setMessage("Supabase no está configurado.");
      return;
    }

    setLoading(true);
    setMessage("");

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
      } else {
        router.push("/");
      }
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
      } else if (data.user) {
        const { error: profileError } = await supabase
          .from("profiles")
          .insert({
            id: data.user.id,
            name: email.split("@")[0],
            plan: "free",
          });

        if (profileError) {
          setMessage(profileError.message);
        } else {
          setMessage(
            "Cuenta creada correctamente. Ya puedes entrar a GymIA."
          );
          setMode("login");
        }
      }
    }

    setLoading(false);
  }

  return (
    <main className="wrap">
      <section className="hero">
        <div className="muted">GYMIA</div>

        <h1>
          {mode === "login"
            ? "Bienvenido a GymIA"
            : "Crea tu cuenta"}
        </h1>

        <p className="muted">
          Tu entrenamiento inteligente empieza aquí.
        </p>

        <div className="card">
          <form onSubmit={handleSubmit}>
            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
            />

            <label style={{ marginTop: 16 }}>Contraseña</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              minLength={6}
              required
            />

            <button
              className="cta"
              type="submit"
              disabled={loading}
              style={{ marginTop: 20 }}
            >
              {loading
                ? "Procesando..."
                : mode === "login"
                ? "Iniciar sesión"
                : "Crear cuenta"}
            </button>
          </form>

          {message && (
            <p className="muted" style={{ marginTop: 16 }}>
              {message}
            </p>
          )}

          <button
            type="button"
            onClick={() =>
              setMode(mode === "login" ? "signup" : "login")
            }
            style={{
              marginTop: 16,
              background: "none",
              border: 0,
              cursor: "pointer",
            }}
          >
            {mode === "login"
              ? "¿No tienes cuenta? Crear una"
              : "¿Ya tienes cuenta? Iniciar sesión"}
          </button>
        </div>
      </section>
    </main>
  );
}
