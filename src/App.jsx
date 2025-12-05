import { GoogleGenAI } from "@google/genai";
import { useState } from "react";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});
function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const generate = async () => {
    try {
      if (!input.trim()) return;
      setLoading(true);
      setOutput("Thinking...");
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: input,
      });
      let text;
      const parts = response.candidates?.[0]?.content?.parts;
      if (parts?.length) {
        text = parts
          .map((p) => p.text ?? "")
          .join("")
          .trim();
      }
      setOutput(text || "Model Returned Empty Value");
      console.log(response);
    } catch (error) {
      console.log(error);
      setOutput("Something went Wrong..");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      style={{ width: "600px", margin: "50px auto", fontFamily: "sans-serif" }}
    >
      <h2>Gemini Ai React-App</h2>
      <textarea
        style={{ width: "100%", padding: 10, fontSize: 16 }}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <button
        onClick={generate}
        disabled={loading}
        style={{
          marginTop: 10,
          padding: "10px 20px",
          fontSize: 16,
          color: "#fff",
          borderRadius: 6,
          background: "#000",
          cursor: "pointer",
        }}
      >
        {loading ? "Generating..." : "Ask Google Gemini"}
      </button>
      <h3>Response:</h3>
      <div style={{ padding: 15, borderRadius: 6, whiteSpace: "pre-wrap" }}>
        {output}
      </div>
    </div>
  );
}

export default App;
