# Hotel Details

```
POST/details

```

## Request Headers

```
Content-Type : Application/Json

```

## Request Boby

```
"Hotel_ID" : "Integer"

```

## Response

```
200 - Success
Boby
{
"id" : "Integer",
"city":"String",
"state":"String",
"rating":"Integer",
"discount":"Integer",
"address""String",
"photo_url" : "String"
}
400 - Bad Request - Incorrect/User/Password
403 - Forbidden
403 - Not Found
500 - Internal Server Error
304 - Not Modified


```
