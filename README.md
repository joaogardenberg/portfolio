# Johnny's Portfolio

[Preview](https://johnny.tools)

## Running the project

### With NodeJS

```bash
./start
```

### With Docker Compose

```bash
docker-compose up
```

### With Docker

Build the image (only the first time)

```bash
docker build .
```

Run the image

```bash
docker run -it -e CHOKIDAR_USEPOLLING=true -v $(pwd):/app -p 3000:3000 portfolio
```

## Deploying the project

Just push to the `main` branch.
