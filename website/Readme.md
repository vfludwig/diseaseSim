#Running the app
The web application is a React app, which will require you to have Node.js installed on your computer.
The backend utilizes Flask, which means that Python will also be required. 
If this application were to be put into production, this would be run through the browser and require neither, but since
this is a student project it will need to be run locally for now.

###Starting the Flask backend
You will need to create a virtual environment in the disease-sim/api folder

On windows, you will need to run these commands in command line:

```bash
> cd projectlocation/diseaseSim/website/disease-sim/api
> python3 -m venv venv
> venv\Scripts\activate
```

Install Flask and Python addons within venv
```bash
(venv) > pip install flask flask-cors python-dotenv
(venv) > python -m pip install numpy scipy matplotlib ipython jupyter pandas sympy nose
```

Run flask:
```bash
(venv) > flask run
```

The console should now show something like this:
```bash
 * Serving Flask app "api.py" (lazy loading)
 * Environment: development
 * Debug mode: on
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 673-234-166
```

###Starting the React App
Much more simple to start, just navigate to the disease-sim folder and use `npm start`
```bash
> cd projectlocation/diseaseSim/website/disease-sim
> npm start
```

This should cause a new browser tab to open in your default browser with the web application (if not, just navigate to http://localhost:3000), which will work as shown in the presentation as long as you are running the flask backend.