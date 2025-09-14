import { useEffect, useRef, useState } from "react";
import ChatbotIcon from "../components/ChatbotIcon";
import ChatForm from "../components/ChatForm";
import ChatMessage from "../components/ChatMessage";
import { companyInfo } from "../companyInfo";
import { getCarsData, getSalesData, getInspectionsData } from "../mcp/mcp";

const Chatbot = () => {
  const chatBodyRef = useRef(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      id: Date.now(),
      hideInChat: true,
      role: "model",
      text: companyInfo,
    },
  ]);

  const generateBotResponse = async (history) => {
    const updateHistory = (text, isError = false) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { id: Date.now(), role: "model", text, isError },
      ]);
    };

    let carsData = [], salesData = [], inspectionsData = [];
    try {
      [carsData, salesData, inspectionsData] = await Promise.all([
        getCarsData(),
        getSalesData(),
        getInspectionsData()
      ]);
    } catch (e) {
      updateHistory("⚠️ تعذر تحميل بيانات السيارات أو المبيعات أو الفحص.", true);
      return;
    }

    const lastUserMsg = history.filter((msg) => msg.role === "user").slice(-1)[0]?.text || "";

  const carsList = carsData.map(car => `* ${car.name} موديل ${car.year} (${car.matricule}) بسعر ${car.price}`).join("\n");
    const salesList = salesData.map(sale => {
      const car = carsData.find(c => c.matricule === sale.carId);
      return car ? `* ${car.name} (${car.matricule}) بسعر ${sale.saleAmount} بتاريخ ${sale.saleDate}` : null;
    }).filter(Boolean).join("\n");
    const inspectionsList = inspectionsData.map(ins => {
      const car = carsData.find(c => c.matricule === ins.carId);
      return car ? `* ${car.name} (${car.matricule}) بتاريخ ${ins.inspectionDate}` : null;
    }).filter(Boolean).join("\n");

    const prompt = `
      أنت مساعد ذكي. إذا كان سؤال المستخدم عن السيارات أو المبيعات أو الفحوصات، استخدم فقط البيانات التالية للإجابة بدقة ولا تخترع أي معلومة غير موجودة:
      ---
      السيارات المتوفرة:\n${carsList || 'لا توجد سيارات متوفرة.'}
      ---
      السيارات التي تم بيعها:\n${salesList || 'لا توجد مبيعات.'}
      ---
      الفحوصات:\n${inspectionsList || 'لا توجد فحوصات.'}
      ---
      إذا كان سؤال المستخدم عامًا أو لا يتعلق بهذه البيانات، أجب عليه بشكل طبيعي كمساعد ذكي.
      ---
      سؤال المستخدم:
      ${lastUserMsg}
      ---
      أجب بشكل مختصر وعملي وباللغة المناسبة للسؤال.`;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          { role: "user", parts: [{ text: prompt }] }
        ]
      }),
    };

    try {
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error?.message || "Something went wrong!");
      }

      const apiResponseText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
        "⚠️ No response received.";

      updateHistory(apiResponseText);
    } catch (error) {
      updateHistory(error.message, true);
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <button
        onClick={() => setShowChatbot((prev) => !prev)}
        id="chatbot-toggler"
      >
        <span className="material-symbols-rounded">mode_comment</span>
        <span className="material-symbols-rounded">close</span>
      </button>

      <div className="chatbot-popup">

        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button
            onClick={() => setShowChatbot((prev) => !prev)}
            className="material-symbols-rounded"
          >
            keyboard_arrow_down
          </button>
        </div>

        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hey there <br /> How can I help you today?
            </p>
          </div>

          {chatHistory
            .filter((chat) => !chat.hideInChat)
            .map((chat) => (
              <ChatMessage key={chat.id} chat={chat} />
            ))}
        </div>

        <div className="chat-footer">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
