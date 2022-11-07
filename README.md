# tokenizacion tarjeta de credito y debito

## Comandos de compilacion y Test 
- Ejecutar el comando ( npm run install )
- utilice el comando ( npm run tsc ) para compilar en la carpeta build 
- utilice el comando ( npm run test ) praa ejecutar testing

## Ejecutar proyecto en Entorno local

- Ejecutar el comando ( npm run dev ) para correr el proyecto en modo local con serverless y express en el host http://localhost:3467

### EndPoints
- /  (POST): debe pasar los datos de la tarjeta e email
```json
{
    "email": "rommer@hotmail.com",
    "cvv": "123",
    "expiration_month": "12",
    "expiration_year": "2027",
    "card_number": "4551038338995199"
}
```
- /  (GET): debe pasar el token en la cabezera
```json
{
    "authorization": "Bearer ClDTOYVIfhdz9mOK",
}
```

## serverless deploy aws Lambda

- consigure un usuario en aws para subir proyectos a Lambda
- descargar e instalar la cli de aws (https://aws.amazon.com/es/cli/)
- configurar sus credenciales de usuario en la cli
- ejecutar el comando ( sls deploy ) para subir a Lamda, al terminar la ejecucion, se le informara por la consola de comandos la url de la api

## api actual corriendo en un servidor aws Lambda

- api: https://8pux8afamh.execute-api.us-east-1.amazonaws.com

## Patron de diseño y arquitectura utilizados

- diseño: ninguno
- arquitectura: REST; Se escogio la arquitectura REST por su fiabilidad, escalabilidad, flexibilidad al momento de desarrollar la aplicacion

