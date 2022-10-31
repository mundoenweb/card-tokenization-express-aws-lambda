# Ejecutar proyecto de forma local

- Ejecutar el comando ( npm run install )
- Ejecutar el comando ( npm run dev ) para correr el proyecto en modo local

## serverless deploy aws Lambda

- consigure un usuario en aws para subir proyectos a Lambda
- descargar e instalar la cli de aws (https://aws.amazon.com/es/cli/)
- configurar sus credenciales de usuario en la cli
- ejecutar el comando ( sls deploy ) para subir a Lamda, al terminar la ejecucion, se le informara por la consola de comandos la url de la api

## api actual corriendo en un servidor aws Lambda

- api: https://b1t8yawzti.execute-api.us-east-1.amazonaws.com
- rutas: - /card/token   - /card

- /card/token  (POST): debe pasar los datos de la tarjeta e email
- /card  (GET): debe pasar el token en la cabezera

