export async function callGroqAI(prompt, apiKey) {
  const model = process.env.PULLBEAR_AI_MODEL || "mistral-saba-24b";

  if (!apiKey) {
    throw new Error("❌ PULLBEAR_GROQ_KEY is missing or undefined.");
  }

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: "You are a code review expert." },
          { role: "user", content: prompt },
        ],
        temperature: 0.3,
      }),
    });

    // Check for non-2xx response codes
    if (!res.ok) {
      const errorPayload = await res.json().catch(() => ({}));
      const errorMessage =
        errorPayload?.error?.message || `HTTP ${res.status} - ${res.statusText}`;
      throw new Error(`❌ Groq API error: ${errorMessage}`);
    }

    const data = await res.json();

    if (!data.choices?.[0]?.message?.content) {
      throw new Error("❌ Groq response did not contain valid content.");
    }

    return data.choices[0].message.content.trim();

  } catch (err) {
    console.error("⚠️ Failed to call Groq AI:", err.message || err);
    return "⚠️ AI review failed. Please check your API key, internet connection, or rate limits.";
  }
}
