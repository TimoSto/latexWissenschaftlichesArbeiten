echo "running go-tests..."
go test ./...

echo "running jest-tests..."
cd webclient
yarn run test:unit

echo "running e2e-tests..."
cd ../e2e-tests
yarn cypress run --browser chrome
