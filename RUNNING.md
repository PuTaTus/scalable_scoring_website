TODO: The RUNNING.md briefly outlines steps needed to run the application.

To start, go to the root folder and run:
docker compose --profile migrate -f docker-compose.prod.yml up

To run the playwright:
1. Run the docker compose: `docker compose --profile migrate -f docker-compose.prod.yml up`
2. `cd e2e-playwright`
3. Then run `npx playwright test`

k6: run normally
