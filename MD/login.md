# Login

```
POST/v1/Login

```

## Request Headers

```
Content-Type : Application/Json

```

## Request Boby

```
"Email" : "String"
"Password" : "String"

```

## Response

```
200 - Success
Boby
{
"id" : "Integer",
"Email" : "String"
}
400 - Bad Request - Incorrect/User/Password
403 - Forbidden
403 - Not Found
500 - Internal Server Error
304 - Not Modified


```
