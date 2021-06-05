# News Feed Avantio

### Steps to Run

1. Clone this repository

> git clone https://github.com/hermanu/news-feed-server

2. Navigate into the directory

> cd news-feed-server

3. Build up Docker Images and rund the stack

> docker compose up -d --build

Your app should be running on (if using native docker).:

http://localhost:8080

Be patient and wait for all for all of the NPM warnings to finish.

### Anotaciones

- Las noticas de El Mundo llegan con unos caracteres raros, he probado todo tipo de headers (incluidos los que envia la propia web) pero aun asi no me deshago de ellos.
- Las imagenes de el pais llegan en muy baja resolucion.
- El siguiente paso en cuanto a CI/CD seria implementar el despliegue del docker a traves de Github Actions.

- Personalmente esta prueba me ha gustado mucho, me ha recordado que en la programacion, nada es facil por muy facil que parezca y que no tengo futuro como disenyador/maquetador web.
