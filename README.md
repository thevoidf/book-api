## book api

create .env file for mongo connection string jwt secret
```
DB_URL=mongodb://localhost:27017/book-api
JWT_SECRET=secret
```

install dependencies and run
```
npm install
cd client && npm install && cd ..
./scripts/run.sh
```

optionally create sample records
```
node scripts/sample.js
```

or start back-end and front-end manually
```
npm start
cd client && npm start
```

