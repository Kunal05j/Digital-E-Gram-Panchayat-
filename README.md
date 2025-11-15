Digital E-Gram Panchayat
Overview
Digital E-Gram Panchayat is a web-based platform designed to digitalize village-level administrative services.
The application allows citizens to apply for various Gram Panchayat services online, while administrators and staff can manage, review, and update applications in real time.
The system focuses on transparency, accessibility, and improving the efficiency of public service delivery.
________________________________________
Features
User
•	Register and log in using Firebase Authentication
•	View available Panchayat services
•	Apply for services through online forms
•	Track application status
•	Manage basic profile details
Staff
•	Secure login for authorized staff members
•	View applications assigned to staff
•	Update the status of applications (Approved, Rejected, Pending)
Admin
•	Create, update, and delete services
•	View all services in the system
•	Manage citizen applications
•	View all registered users
•	Role-based access control for Admin and Staff
________________________________________
Technologies Used
Frontend
•	React.js
•	HTML5
•	CSS3
•	JavaScript
Backend / Database
•	Firebase Authentication
•	Firebase Firestore
•	Firebase Hosting
Tools
•	npm
•	Firebase CLI
•	Visual Studio Code
________________________________________
How It Works
1.	Users register and log in using email/password authentication.
2.	Admin adds services from the Admin Dashboard.
3.	Citizens choose a service and submit an application.
4.	Applications are stored in Firestore.
5.	Staff and Admin can view and update application statuses.
6.	Users can track their submitted applications through their dashboard.
________________________________________


Firebase Setup

1.	Create a project in Firebase Console
2.	Add a Web App and copy the Firebase configuration keys
3.	Paste the configuration into
4.	src/firebase/firebaseConfig.js
5.	Enable the following:
o	Authentication → Email/Password
o	Firestore Database → Test Mode (for development)
6.	Use Firebase Hosting if you want to deploy the project.

________________________________________
Future Enhancements
•	SMS/Email notifications
•	Automatic Aadhaar-based verification
•	Advanced analytics dashboard for administrators
•	Multilingual support

