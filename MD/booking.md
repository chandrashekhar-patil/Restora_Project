# Booking the Hotel

```
POST/insert_booking

```

## Request Headers

```
Content-Type : Application/Json

```

## Request Boby

```
"Hotel_ID" : "Integer"
"User_ID" : "Integer",
"noOfNights":"Integer",
"noOfPeople":"Integer",
"checkIN":"date",
"checkOut":"date",
"payment":"String"

```

## Response

```
200 - Success
Boby
{
"Sucess":"true"
}
400 - Bad Request - Incorrect/User/Password
403 - Forbidden
403 - Not Found
500 - Internal Server Error
304 - Not Modified


```
