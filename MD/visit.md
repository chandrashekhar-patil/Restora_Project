# Visit

```
POST/visit

```

## Request Headers

```
Content-Type : Application/Json

```

## Request Boby

```
"product_session" : "String"

```

## Response

```
200 - Success
Boby
{
"User_id" : "Integer",
"email":"String"
}
400 - Bad Request - Incorrect/User/Password
403 - Forbidden
403 - Not Found
500 - Internal Server Error
304 - Not Modified


```
