function buscarFotos() {
    const apiKey = "wlpGlBpwzi8GnwOCqONJIkf4tsXxQfyq5gvM9d5u";
    const sol = 1000; // Dia em Marte
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=${apiKey}`;

    const photosDiv = document.getElementById("photos");
    photosDiv.innerHTML = "<p>Carregando fotos...</p>";

    fetch(url)
      .then(response => response.json())
      .then(data => {
        photosDiv.innerHTML = ""; // Limpa mensagem de carregamento
        const photos = data.photos.slice(0, 12); // Limita a 12 fotos

        if (photos.length === 0) {
          photosDiv.innerHTML = "<p>Nenhuma foto disponível para esse dia marciano.</p>";
          return;
        }

        photos.forEach(photo => {
          const img = document.createElement("img");
          img.src = photo.img_src;
          img.alt = `Foto tirada em ${photo.earth_date}`;
          photosDiv.appendChild(img);
        });
      })
      .catch(error => {
        console.error("Erro ao buscar fotos:", error);
        photosDiv.innerHTML = "<p>Erro ao carregar fotos.</p>";
      });
  }