const arrow = document.querySelector('.arrow');
    const speed = document.querySelector('.speed-value');

    navigator.geolocation.watchPosition((data)=>{
      console.log(data);
      speed.textContent = data.coords.speed;
      arrow.style.transform = `rotate(${data.coords.heading}deg)`;
    }, (err) => {
      console.err(err);
      alert('Hey! You need to allow this so it can work.')
    });