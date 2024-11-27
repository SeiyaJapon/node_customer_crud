# Project Overview

This repository implements a customer management API for an online motorbike shop using Node.js. It applies Domain-Driven Design (DDD) principles and Command Query Responsibility Segregation (CQRS) to ensure a clean and maintainable codebase.

## Project Structure

The project is divided into two bounded contexts, each containing the following layers:

- **Domain**: Includes entities, value objects, and domain services.
- **Application**: Manages use cases via commands and queries.
- **Infrastructure**: Contains HTTP controllers, repositories, and database configurations.

## Features

- RESTful API with CRUD operations for Customer management.
- Specific endpoint for adding available credit to customers.
- List and search customers sorted by credit.

## Key Principles

- **SOLID** principles ensure code maintainability.
- Comprehensive **Testing**, including unit and functional tests.
- **Serverless** configuration supports seamless deployment.

## Setup and Deployment

Includes instructions for setting up the project locally and deploying with the Serverless Framework.
