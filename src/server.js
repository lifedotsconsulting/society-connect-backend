const app = require('./app');
const config = require('./config');

let server;

// Connect to DB (omitted for now since using mock/static data, eventually connect mongoose here)

// Start Server
server = app.listen(config.port, () => {
    console.log(`Server is running in ${config.env} mode on port ${config.port}`);
});

const exitHandler = () => {
    if (server) {
        server.close(() => {
            console.log('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    console.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
