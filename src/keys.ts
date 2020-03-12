const keys = {
    db: process.env.MONGODB_URI || 'mongodb://localhost:27017/smbs',
    SECRET_TOKEN: process.env.SECRET_TOKEN || 'LocalsmbsPrueba2019*'
};

export default keys;