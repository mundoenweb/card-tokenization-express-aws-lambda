# tokenizacion tarjeta de credito y debito

- Ejecutar el comando ( npm run install )

## Comandos de compilacion y Test 
- utilice el comandp ( npm run tsc ) para compilar en la carpeta build 
- utilice el comandp ( npm run test ) para ejecutar testing

## Ejecutar proyecto en Entorno local

- Ejecutar el comando ( npm run dev ) para correr el proyecto en modo local con serverless y express en el host http://localhost:3467

### EndPoints
- /card/token  (POST): debe pasar los datos de la tarjeta e email
- /card  (GET): debe pasar el token en la cabezera

## serverless deploy aws Lambda

- utilice el comando ( npm run test)
- consigure un usuario en aws para subir proyectos a Lambda
- descargar e instalar la cli de aws (https://aws.amazon.com/es/cli/)
- configurar sus credenciales de usuario en la cli
- ejecutar el comando ( sls deploy ) para subir a Lamda, al terminar la ejecucion, se le informara por la consola de comandos la url de la api

## api actual corriendo en un servidor aws Lambda

- api: https://b1t8yawzti.execute-api.us-east-1.amazonaws.com
- rutas: - /card/token   - /card



