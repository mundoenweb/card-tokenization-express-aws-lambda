import { config as configDotenv } from 'dotenv'
configDotenv()

const config = {
  mongoDB: {
    host: process.env.HOST,
    cluster: process.env.CLUSTER,
    user: process.env.USER,
    password: process.env.DBPASSWORD
  },
  secretPassJWT: process.env.SECRET_PASSWORD_JWT
}

export default config
