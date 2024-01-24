# Lens Configuration Manager

This project is a Vue 3 application designed for managing and visualizing lens configurations. It allows users to create, save, and view different lens parameters like radius of curvature, thickness, and lens title.

## Features

- **Create Lens Configurations**: Users can specify parameters such as front and back radius, thickness, and provide a unique title for each lens configuration.
- **Save Configurations**: Configurations can be saved to a backend service built with AWS technologies including Lambda, API Gateway, and DynamoDB.
- **Visualization**: Provides a visual representation of the lens based on the entered parameters.
- **List and Edit**: Users can view a list of saved configurations and select one to edit.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- [Node.js](https://nodejs.org/en/)
- [Vue CLI](https://cli.vuejs.org/)

### Installing

A step by step series of examples that tell you how to get a development environment running:

Clone the repository:

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
Install dependencies:

bash
Copy code
npm install
Run the development server:

bash
Copy code
npm run serve
The application will be running at http://localhost:8080/.

Deployment
For deploying this project, you can use platforms like Vercel or Netlify. Follow their respective guides for Vue.js application deployment.

Built With
Vue.js 3 - The Progressive JavaScript Framework
AWS Lambda and API Gateway - For backend serverless functions
DynamoDB - NoSQL database service
Vercel / Netlify - For deployment