# Forget Password 

```
POST/forget

```

## Request Headers

```
Content-Type : Application/Json

```

## Request Boby

```
"Email" : "String",
"token" : "String",
"newPassword":"String"

```

## Response

```
200 - Success
Boby
{
"Sucess" : "String"
}
400 - Bad Request - Incorrect/User/Password
403 - Forbidden
403 - Not Found
500 - Internal Server Error
304 - Not Modified


```
