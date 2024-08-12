# Complete Booking

```
POST/complete

```

## Request Headers

```
Content-Type : Application/Json

```

## Request Boby

```
"Hotel_ID" : "Integer",
"Customer_ID" : "Integer",
"UPI_ID": "String"

```

## Response

```
200 - Success
Boby
{
"sucess" : "true"
}
400 - Bad Request - Incorrect/User/Password
403 - Forbidden
403 - Not Found
500 - Internal Server Error
304 - Not Modified


```
