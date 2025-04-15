fetch('https://api.example.com/federation/rankings')
  .then(response => response.json())
  .then(data => {
    const labels = data.map(item => item.name);
    const points = data.map(item => item.points);
    const ctx = document.getElementById('rankingChart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Punti Ranking',
          data: points,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  })
  .catch(error => {
    console.error('Errore nel recupero dei dati di ranking:', error);
  });

fetch('https://api.example.com/federation/startlist')
  .then(response => response.json())
  .then(data => {
    const tbody = document.querySelector('#csl-table tbody');
    const loadingRow = document.getElementById('csl-loading');
    if (loadingRow) {
      loadingRow.remove();
    }
    data.forEach(participant => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${participant.number}</td>
        <td>${participant.name}</td>
        <td>${participant.country}</td>
        <td>${participant.category}</td>
      `;
      tbody.appendChild(row);
    });
    $('#csl-table').DataTable();
  })
  .catch(error => {
    console.error('Errore nel recupero dei dati della start list:', error);
  });
