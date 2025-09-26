document.getElementById("postForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikx1c2FuZGEiLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTc1ODgxNTgzOSwiZXhwIjoxNzU4ODE5NDM5fQ.-gG7IYlfYGSXlhRzDpL-ScIVYIkiXyo3Gaj6ETQgzlU";
  const form = e.target;
  const data = {
    title: form.title.value,
    author: form.author.value,
    content: form.content.value,
  };

  try {
    const res = await fetch("http://localhost:3000/post/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const text = await res.text();
    document.getElementById("response").innerText = text;
  } catch (err) {
    document.getElementById("response").innerText = "Error submitting post";
  }
});

async function loadPosts() {
  const res = await fetch("http://localhost:3000/post");
  const posts = await res.json();

  const container = document.createElement("div");
  posts.forEach((post) => {
    const card = document.createElement("div");
    card.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p><small>By ${post.author}</small>`;
    container.appendChild(card);
  });

  document.body.appendChild(container);
}

loadPosts();
