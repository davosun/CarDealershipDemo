# CarDealershipDemo
C#.NET Web API project w/ React

## About
This is a project demonstrating the implmentation of a single-page application with a backend API.  
The frontend is built using React and Bootstrap, and the backend is a .NET (Core) web API.  
Dependency injection and unit testing are also demonstrated in the code base. For simplicity purposes, a backend data repository is omitted.  

This project is influenced by the selections from [iTrellis](https://itrellisrecruiting.azurewebsites.net/).  
The following variables were chosen:
- Domain: **Car Dealership**
- Interface: **Web API**
- Platform: **.NET**
- Backend: **C#**
- Frontend: **React**

## Live Demo
A live demo of the codebase in this repository can be found [here](https://cardealershipdemo.azurewebsites.net/).

## Running Locally
Clone this [repo](https://github.com/davosun/CarDealershipDemo.git) to your local environment.  
If necessary, install the [.NET Runtime](https://dotnet.microsoft.com/download) (included in SDK) and [Node.js](https://nodejs.org/en/download/) (includes NPM).
Navigate to the `CarDealershipDemo.WebApi` project directory in the command line and run the commmand:
```powershell
dotnet run
```
Start a new command line session and navigate to the client directory `CarDealershipDemo.Client/app` and run the commands:
```powershell
npm install
npm start
```
Open a brower window and navigate to http://localhost:3000. You should now see a running version of this repo.
