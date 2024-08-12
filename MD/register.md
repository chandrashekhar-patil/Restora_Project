# Registration

POST/register

## Request Holders

```
Content-Type : Application/Json

```

## Request Boby

```
"First Name" : "String",
"Last Name" : "String",
"Mobile No" : "Number",
"Email" : "String",
"Password" : "String",

```

## Response

```
200 - Success
Boby
{
    "Email" : "String",
    "UserID" : "integer"
}
400 - Bad Request - Incorrect/Username/Email
403 - Forbidden
404 - Not Found
500 - Internal Server Error
304 - Not Modified

```
