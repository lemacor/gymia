import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = String(body?.message ?? "").trim();
    if (!message) return NextResponse.json({ error: "Escribe una pregunta." }, { status: 400 });

    // La integración con el proveedor de IA se conecta aquí.
    // La clave debe vivir exclusivamente en variables de entorno del servidor.
    const safety = /dolor|lesión|lesion|mareo|desmayo|pecho|respirar/i.test(message);

    if (safety) {
      return NextResponse.json({
        reply: "Si tienes dolor, una lesión, mareos, desmayo, dificultad para respirar u otro síntoma preocupante, detén el entrenamiento y consulta a un profesional de salud. GymIA no diagnostica ni sustituye una evaluación profesional."
      });
    }

    return NextResponse.json({
      reply: "Coach IA está preparado para ayudarte con alternativas de ejercicios, organización del entrenamiento y progresión. La conexión al modelo de IA se habilita cuando agregues OPENAI_API_KEY en el servidor."
    });
  } catch {
    return NextResponse.json({ error: "No se pudo procesar la solicitud." }, { status: 500 });
  }
}
