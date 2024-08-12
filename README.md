# Restora_Project

Click this Frontend & Backend Connectivity : https://drive.google.com/file/d/1LU7Ved4oUVxVbpP0N70pcfJaL4vgdjTI/view?usp=sharing

Database Overview

The Restora database consists of the following tables:

    Customer
    Draft_Booking
    Hotel
    Hotel_Booking
    Visit

Table Details
1. Customer

Purpose: Stores information about the customers using the system.

    Columns:
        CustomerID (Primary Key): A unique identifier for each customer.
        FirstName: Customer's first name.
        LastName: Customer's last name.
        Email: Customer's email address.
        Phone: Customer's phone number.
        Address: Customer's mailing address.

2. Draft_Booking

Purpose: Stores temporary or draft booking information before confirmation.

    Columns:
        DraftBookingID (Primary Key): A unique identifier for each draft booking.
        CustomerID (Foreign Key): Links to the Customer table.
        HotelID (Foreign Key): Links to the Hotel table.
        CheckInDate: Desired check-in date.
        CheckOutDate: Desired check-out date.
        NumberOfGuests: Number of guests.

3. Hotel

Purpose: Contains information about the hotels available in the system.

    Columns:
        HotelID (Primary Key): A unique identifier for each hotel.
        HotelName: Name of the hotel.
        Location: Location of the hotel.
        Rating: Star rating of the hotel.
        Address: Address of the hotel.
        Phone: Contact phone number of the hotel.

4. Hotel_Booking

Purpose: Stores finalized booking information for hotels.

    Columns:
        HotelBookingID (Primary Key): A unique identifier for each hotel booking.
        CustomerID (Foreign Key): Links to the Customer table.
        HotelID (Foreign Key): Links to the Hotel table.
        CheckInDate: Actual check-in date.
        CheckOutDate: Actual check-out date.
        NumberOfGuests: Number of guests.

5. Visit

Purpose: Records the visits made by customers to the hotels.

    Columns:
        VisitID (Primary Key): A unique identifier for each visit.
        CustomerID (Foreign Key): Links to the Customer table.
        HotelID (Foreign Key): Links to the Hotel table.
        VisitDate: Date of the visit.
        Feedback: Customer feedback about their stay.

How to Use

    Connecting to the Database:
        Use your preferred database management tool to connect to the Restora database using the provided credentials.

    Viewing Data:
        Query the tables to view and analyze the data. For example, you can use SQL queries to retrieve customer details, booking information, or hotel ratings.

    Inserting/Updating Data:
        To insert or update data, use SQL INSERT, UPDATE, or DELETE statements, ensuring data integrity by referencing appropriate foreign keys.

    Generating Reports:
        Utilize SQL queries to generate reports on bookings, customer visits, or hotel occupancy.

     API Documentation

Welcome to the API documentation for the Restora project. This file provides a brief overview of the available API endpoints, their purpose, and how to use them.
List of APIs
1. booking.js

Purpose: Handles the creation of new bookings.

    Endpoint: POST /api/booking
    Description: Creates a new booking record in the system based on customer and hotel information.
    Request Parameters:
        CustomerID (Required)
        HotelID (Required)
        CheckInDate (Required)
        CheckOutDate (Required)
        NumberOfGuests (Required)
    Response: Booking ID and confirmation details.

2. completebooking.js

Purpose: Finalizes and confirms a booking.

    Endpoint: POST /api/completebooking
    Description: Marks a draft booking as confirmed and creates a finalized booking record.
    Request Parameters:
        DraftBookingID (Required)
        CustomerID (Required)
        HotelID (Required)
        CheckInDate (Required)
        CheckOutDate (Required)
    Response: Confirmation of the finalized booking and booking ID.

3. details.js

Purpose: Retrieves details of a specific booking or customer.

    Endpoint: GET /api/details
    Description: Fetches detailed information about a booking or customer.
    Request Parameters:
        BookingID (Optional)
        CustomerID (Optional)
    Response: Detailed information based on the provided ID.

4. forget.js

Purpose: Handles password reset or account recovery.

    Endpoint: POST /api/forget
    Description: Initiates the password recovery process for a user.
    Request Parameters:
        Request Parameters:
        Email (Required)
    Response: Instructions for resetting the password.

5. login.js

Purpose: Handles user login.

    Endpoint: POST /api/login
    Description: Authenticates a user and returns a session token.
    Request Parameters:
        Email (Required)
        Password (Required)
    Response: Authentication token and user details.

6. main.js

Purpose: Serves as the main entry point for various functionalities.

    Endpoint: GET /api/main
    Description: Provides general information or dashboard overview.
    Request Parameters: None
    Response: General system information or dashboard data.

7. register.js

Purpose: Handles user registration.

    Endpoint: POST /api/register
    Description: Creates a new user account.
    Request Parameters:
        FirstName (Required)
        LastName (Required)
        Email (Required)
        Password (Required)
        Phone (Optional)
    Response: Confirmation of registration and user ID.

8. search.js

Purpose: Allows searching for hotels or bookings.

    Endpoint: GET /api/search
    Description: Searches for hotels, bookings, or customers based on query parameters.
    Request Parameters:
        query (Optional)
    Response: Search results based on the query parameters.

9. visit.js

Purpose: Manages customer visits to hotels.

    Endpoint: POST /api/visit
    Description: Records a visit made by a customer to a hotel.
    Request Parameters:
        CustomerID (Required)
        HotelID (Required)
        VisitDate (Required)
        Feedback (Optional)
    Response: Confirmation of the visit record and visit ID.
    Project Pages Documentation

Welcome to the pages documentation for the Restora project. This file provides an overview of the different pages available in the application and their functionalities.
List of Pages
1. login

Purpose: Allows users to log into their accounts.

    URL: /login
    Description: The login page where users enter their email and password to authenticate and access their account.
    Features:
        User authentication
        Error handling for invalid credentials
        Link to the registration page

2. registration

Purpose: Allows new users to create an account.

    URL: /registration
    Description: The registration page where users provide their personal details to create a new account.
    Features:
        Form for entering personal details (e.g., name, email, password)
        Validation of input data
        Link to the login page

3. forget password

Purpose: Initiates the password recovery process.

    URL: /forget-password
    Description: The page where users can request a password reset by entering their email address.
    Features:
        Form for entering the email address
        Instructions for next steps (e.g., checking email for reset link)

4. home

Purpose: Provides the main landing page of the application.

    URL: /home
    Description: The home page that provides an overview of the application and access to various features and information.
    Features:
        Overview of services
        Navigation to other pages
        Featured content or announcements

5. contactus

Purpose: Allows users to contact support or provide feedback.

    URL: /contactus
    Description: The contact page where users can fill out a form to send inquiries or feedback to the support team.
    Features:
        Contact form with fields for name, email, subject, and message
        Contact details and support information

6. newpassword

Purpose: Allows users to set a new password after requesting a password reset.

    URL: /new-password
    Description: The page where users enter a new password after following a password reset link.
    Features:
        Form for entering and confirming the new password
        Validation of password strength

7. payment option

Purpose: Provides options for payment processing.

    URL: /payment-option
    Description: The page where users select their preferred payment method and enter payment details.
    Features:
        Payment method selection (e.g., credit card, PayPal)
        Payment details entry
        Summary of the transaction

8. sent link on mail

Purpose: Confirms that a password reset link has been sent to the user's email.

    URL: /sent-link-on-mail
    Description: The page displayed after a user requests a password reset, indicating that a link has been sent to their email.
    Features:
        Confirmation message
        Instructions to check email for the reset link

9. hotel details

Purpose: Provides detailed information about a specific hotel.

    URL: /hotel-details
    Description: The page displaying detailed information about a hotel, including amenities, location, and reviews.
    Features:
        Hotel information (e.g., name, description, amenities)
        Photos and reviews
        Option to book the hotel

10. hotelbooking

Purpose: Allows users to book a hotel.

    URL: /hotel-booking
    Description: The page where users can finalize their booking for a selected hotel.
    Features:
        Booking form with check-in and check-out dates
        Guest information
        Summary of booking details and confirmation

Navigation

    Login Page: Access the login page from the home page or other entry points.
    Registration Page: Accessible from the login page or directly via URL.
    Forget Password Page: Accessible from the login page for users who have forgotten their password.
    Home Page: The main entry point of the application.
    Contact Us Page: Reachable from the home page or other navigation menus.
    New Password Page: Accessed via a password reset link sent to the user’s email.
    Payment Option Page: Accessed during the booking or purchasing process.
    Sent Link on Mail Page: Shown after a user requests a password reset.
    Hotel Details Page: Accessed from search results or hotel listings.
    Hotel Booking Page: Accessed after selecting a hotel to book.
    Technologies Used

The Restora project utilizes a combination of front-end, back-end, and database technologies to deliver a robust and efficient application. Below is an overview of the technologies used in each aspect of the project.
Front-End Technologies

    HTML
        Description: The standard markup language used to create the structure of web pages.
        Purpose: Defines the layout and content of the pages, including elements like headings, paragraphs, and forms.

    CSS
        Description: A stylesheet language used to control the presentation of HTML elements.
        Purpose: Applies styles such as colors, fonts, and layouts to the web pages, enhancing visual appearance and user experience.

    Bootstrap
        Description: A popular front-end framework for developing responsive and mobile-first websites.
        Purpose: Provides pre-designed components and responsive grid system to speed up development and ensure consistency across different devices.

    JavaScript
        Description: A programming language used to create interactive and dynamic elements on web pages.
        Purpose: Adds interactivity to the web pages, handles user events, and manipulates the DOM to enhance user experience.

Back-End Technologies

    JavaScript
        Description: The same language used for client-side scripting is also used on the server side.
        Purpose: Handles server-side logic and application functionality, ensuring seamless integration with front-end and database.

    Node.js
        Description: A JavaScript runtime built on Chrome's V8 JavaScript engine.
        Purpose: Enables JavaScript to be used for server-side scripting, providing an environment to build scalable network applications.

    Express.js
        Description: A minimal and flexible Node.js web application framework.
        Purpose: Simplifies the creation of server-side routes and middleware, facilitating the development of robust APIs and server-side logic.

Database Technology

    MySQL
        Description: An open-source relational database management system (RDBMS).
        Purpose: Stores and manages data in a structured format using tables, supporting efficient data retrieval, manipulation, and relationships between entities.
