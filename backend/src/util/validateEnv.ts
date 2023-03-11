import {cleanEnv, num, port, str} from 'envalid'

export default cleanEnv(process.env, {
    MONGO_DB_CONNECTION_STRING: str(),
    PORT: port(),
    PWD_HASHING_ROUNDS: num(),
    SESSION_SECRET: str()
})