Digital E-Gram Panchayat
Overview

Digital E-Gram Panchayat is a web-based platform designed to digitalize village-level administrative services.
The application allows citizens to apply for various Gram Panchayat services online, while administrators and staff can manage, review, and update applications in real time.

The system focuses on transparency, accessibility, and improving the efficiency of public service delivery.

Features
User

Register and log in using Firebase Authentication

View available Panchayat services

Apply for services through online forms

Track application status

Manage basic profile details

Staff

Secure login for authorized staff members

View applications assigned to staff

Update the status of applications (Approved, Rejected, Pending)

Admin

Create, update, and delete services

View all services in the system

Manage citizen applications

View all registered users

Role-based access control for Admin and Staff

Technologies Used
Frontend

React.js

HTML5

CSS3

JavaScript

Backend / Database

Firebase Authentication

Firebase Firestore

Firebase Hosting

Tools

npm

Firebase CLI

Visual Studio Code

How It Works

Users register and log in using email/password authentication.

Admin adds services from the Admin Dashboard.

Citizens choose a service and submit an application.

Applications are stored in Firestore.

Staff and Admin can view and update application statuses.

Users can track their submitted applications through their dashboard.

Firebase Setup

Create a project in Firebase Console

Add a Web App and copy the Firebase configuration keys

Paste the configuration into

src/firebase/firebaseConfig.js


Enable the following:

Authentication → Email/Password

Firestore Database → Test Mode (for development)

Use Firebase Hosting if you want to deploy the project.

Future Enhancements

SMS/Email notifications

Automatic Aadhaar-based verification

Advanced analytics dashboard for administrators

Multilingual support
