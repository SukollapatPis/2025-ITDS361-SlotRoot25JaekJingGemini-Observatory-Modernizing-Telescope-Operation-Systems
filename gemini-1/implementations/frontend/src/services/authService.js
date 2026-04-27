export const loginAPI = async (email, password) => {
  console.log("📤 Sending login request...");
  console.log("EMAIL:", email);
  console.log("PASSWORD:", password);

  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  });

  console.log("📥 Status:", response.status);

  const text = await response.text(); // อ่านเป็น text ก่อน
  console.log("📥 Raw response:", text);

  // ลอง parse เป็น JSON
  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    console.error("❌ JSON parse error:", e);
  }

  console.log("📥 Parsed response:", data);

  if (!response.ok) {
    throw new Error(data?.message || "Login failed");
  }

  return data;
};