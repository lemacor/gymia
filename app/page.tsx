 "use client";

import { useState } from "react";

const features = [
  "Rutinas personalizadas con IA",
  "Coach IA",
  "Adaptación de ejercicios",
  "Historial completo",
  "Estadísticas avanzadas",
  "Progresión personalizada",
];

export default function ProPage() {
  const [plan, setPlan] = useState<"monthly" | "annual">("monthly");

  const price = plan === "monthly" ? "$9.99/mes" : "$79/año";

  return (
    <main className="wrap">
      <section className="hero">
        <div className="muted">GYMIA PRO</div>
        <h1>Entrena de forma más inteligente. ⭐</h1>
        <p className="muted">
          Desbloquea las funciones avanzadas de GymIA y lleva tu entrenamiento al siguiente nivel.
        </p>

        <div className="nav" style={{ marginTop: 20 }}>
          <button
            className={plan === "monthly" ? "active" : ""}
            onClick={() => setPlan("monthly")}
          >
            Mensual
          </button>
          <button
            className={plan === "annual" ? "active" : ""}
            onClick={() => setPlan("annual")}
          >
            Anual · Ahorra
          </button>
        </div>

        <div className="card" style={{ marginTop: 12 }}>
          <div className="big">{price}</div>
          <p className="muted">
            {plan === "annual"
              ? "Pago anual. La suscripción real se conectará mediante Stripe."
              : "Suscripción mensual. La suscripción real se conectará mediante Stripe."}
          </p>

          <ul style={{ lineHeight: 1.9, paddingLeft: 22 }}>
            {features.map((feature) => (
              <li key={feature}>✓ {feature}</li>
            ))}
          </ul>

          <button
            className="cta"
            onClick={() =>
              alert(
                "GymIA PRO está preparado. En la siguiente fase conectaremos Stripe para procesar el pago real."
              )
          >
            Continuar con PRO
          </button>
        </div>
      </section>
    </main>
  );
}
