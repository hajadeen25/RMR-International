// script.js
function showSection(sectionId) {
  document.querySelectorAll('.form-section').forEach(section => {
    section.classList.add('hidden');
  });
  document.getElementById(sectionId).classList.remove('hidden');
  if (sectionId === 'jobList') renderJobList();
  if (sectionId === 'adminPanel') renderAdminPanel();
}

function toggleCandidateType(type) {
  const experiencedFields = document.getElementById('experiencedFields');
  experiencedFields.classList.toggle('hidden', type !== 'experienced');
}

document.getElementById('employerFormEl').addEventListener('submit', e => {
  e.preventDefault();
  const form = e.target;
  const job = {
    sector: form.querySelector('select').value,
    company: form.querySelectorAll('input')[0].value,
    contact: form.querySelectorAll('input')[1].value,
    phone: form.querySelectorAll('input')[2].value,
    email: form.querySelectorAll('input')[3].value,
    vacancies: form.querySelectorAll('input')[4].value,
    title: form.querySelectorAll('input')[5].value
  };
  const jobs = JSON.parse(localStorage.getItem('jobPosts') || '[]');
  jobs.push(job);
  localStorage.setItem('jobPosts', JSON.stringify(jobs));
  alert('Job Posted Successfully!');
  form.reset();
});

document.getElementById('candidateFormEl').addEventListener('submit', e => {
  e.preventDefault();
  const form = e.target;
  const candidate = {
    name: form.querySelectorAll('input')[0].value,
    dob: form.querySelectorAll('input')[1].value,
    sex: form.querySelectorAll('select')[0].value,
    nationality: form.querySelectorAll('input')[2].value,
    passport: form.querySelectorAll('input')[3].value,
    expiry: form.querySelectorAll('input')[4].value,
    mobile: form.querySelectorAll('input')[5].value,
    whatsapp: form.querySelectorAll('input')[6].value,
    wpNo: form.querySelector('#experiencedFields input')?.value || '',
    fin: form.querySelectorAll('#experiencedFields input')[1]?.value || ''
  };
  const candidates = JSON.parse(localStorage.getItem('candidates') || '[]');
  candidates.push(candidate);
  localStorage.setItem('candidates', JSON.stringify(candidates));
  alert('Application Submitted!');
  form.reset();
});

function renderJobList() {
  const jobs = JSON.parse(localStorage.getItem('jobPosts') || '[]');
  const container = document.getElementById('jobListContainer');
  container.innerHTML = jobs.length ? jobs.map(j => `
    <div>
      <strong>${j.title}</strong> at ${j.company}<br/>
      Sector: ${j.sector} | Vacancies: ${j.vacancies}<br/>
      Contact: ${j.email}
    </div><hr/>
  `).join('') : '<p>No jobs available.</p>';
}

function renderAdminPanel() {
  const jobs = JSON.parse(localStorage.getItem('jobPosts') || '[]');
  const candidates = JSON.parse(localStorage.getItem('candidates') || '[]');
  document.getElementById('adminJobs').innerHTML = jobs.map(j => `
    <div><strong>${j.title}</strong> at ${j.company} (${j.sector})</div>
  `).join('') || 'No job posts.';
  document.getElementById('adminCandidates').innerHTML = candidates.map(c => `
    <div><strong>${c.name}</strong>, ${c.nationality} (${c.sex})</div>
  `).join('') || 'No candidates.';
}
