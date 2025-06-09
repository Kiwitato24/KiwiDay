let currentPage = 1;
const totalPages = 6;

function showPage(pageNum) {
  for (let i = 1; i <= totalPages; i++) {
    document.getElementById(`page${i}`)?.classList.remove('active');
  }
  document.getElementById(`page${pageNum}`)?.classList.add('active');
}

function nextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    showPage(currentPage);
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    showPage(currentPage);
  }
}

window.onload = () => {
  showPage(currentPage);

  const saved = localStorage.getItem('herAmendment');
  if (saved) document.getElementById('savedAmendment').textContent = saved;

  const ratified = localStorage.getItem('ratifiedMessage');
  if (ratified) document.getElementById('ratifiedMessage').textContent = `"${ratified}"`;

  document.querySelectorAll('.highlightable').forEach(p => {
    p.addEventListener('click', () => p.classList.toggle('highlighted'));
  });
};

// Save & Send Amendment
function saveAmendment() {
  const amendment = document.getElementById('herAmendment').value.trim();
  if (!amendment) return;

  localStorage.setItem('herAmendment', amendment);
  document.getElementById('savedAmendment').textContent = amendment;
  document.getElementById('herAmendment').value = '';

  emailjs.send("service_ubo6ai9", "template_nw2f7kr", {
    from_name: "Kiwi (Amendment)",
    to_name: "Pupbeans",
    message: amendment,
    reply_email: "potatoxanxan@gmail.com"
  }).catch((error) => {
    console.error("Failed to send amendment:", error);
  });
}

function clearAmendment() {
  localStorage.removeItem("herAmendment");
  document.getElementById("savedAmendment").innerText = "";
  document.getElementById("herAmendment").value = "";
}

// Add & Send Case Study
function addCase() {
  const newCase = document.getElementById('newCase').value.trim();
  if (!newCase) return;

  const li = document.createElement('li');
  li.textContent = newCase;
  document.getElementById('caseList').appendChild(li);
  document.getElementById('newCase').value = '';

  emailjs.send("service_ubo6ai9", "template_nw2f7kr", {
    from_name: "Kiwi (Case Study)",
    to_name: "Pupbeans",
    message: newCase,
    reply_email: "potatoxanxan@gmail.com"
  }).catch((error) => {
    console.error("Failed to send case study:", error);
  });
}

// Email Ratification
const ratifyForm = document.getElementById('ratifyForm');
ratifyForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const message = document.getElementById('herMessage').value.trim();
  if (!message) return;

  emailjs.sendForm('service_ubo6ai9', 'template_nw2f7kr', this)
    .then(() => {
      localStorage.setItem('ratifiedMessage', message);
      document.getElementById('ratifiedMessage').textContent = `"${message}"`;
      document.getElementById('herMessage').value = '';
    })
    .catch((error) => {
      console.error('Failed to send ratification message:', error);
    });
});
