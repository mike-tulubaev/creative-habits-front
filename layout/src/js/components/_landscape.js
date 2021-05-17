document.addEventListener('DOMContentLoaded', function () {
  const map = document.querySelector('.map');
  if(map) {
    const plants= document.querySelectorAll('.js-plant');
    plants.forEach(plant => {
      const plantName = [...plant.classList].find((className)=>className.indexOf('js-plant--name-')!=-1).replace('js-plant--name-', '');
      const layers = document.querySelectorAll(`.js-layer--${plantName}`);

      plant.addEventListener('mouseenter', ()=>{
        plant.classList.add('map__plant--selected');
        map.classList.add('map--plant-selected');
        layers.forEach((layer)=>{
          layer.classList.add('map__layer--active')
        });
      })

      plant.addEventListener('mouseleave', ()=>{
        plant.classList.remove('map__plant--selected');
        map.classList.remove('map--plant-selected');
        layers.forEach((layer)=>{
          layer.classList.remove('map__layer--active')
        });
      })
    });
  }
})
