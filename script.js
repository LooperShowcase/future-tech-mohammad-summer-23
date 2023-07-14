conversation = [
  { role: "user", content: "hi" },
  { role: "assistant", content: "hello" },
];

async function conversationUserAdd(question, sentiment) {
  conversation.push({
    role: "user",
    content:
      "my happinessout of 10:" + sentiment + "my question is:" + question,
  });
}

async function conversationAssistantAdd(respones) {
  conversation.push({ role: "assistant", content: "respone" });
}

async function openai_test() {
  let url = "https://api.openai.com/v1/chat/completions";

  let part1 = "sk";
  let part2 = "-uUPayv04E0azuKUx7fqkT3BlbkF";
  let part3 = "JAbsZR6JQELQpKK5nH0bl";

  let allParts = part1 + part2 + part3;
  let date = { model: "gpt-3.5-turbo", messages: conversation };
  let response;

  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${allParts}`,
      },
      body: JSON.stringify(date),
    });
  } catch (error) {
    console.log("there is an error:", error);
  }

  console.log(response);
  if (response.ok) {
    const responseData = await response.json();
    const message = responseData.choices[0].message.content;
    conversationAssistantAdd(message);
    const utterance = new SpeechSynthesisUtterance(message);
    speechSynthesis.speak(utterance);
    return message;
  }
}
