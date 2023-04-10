import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify


# Database Setup
# Try with both paths in case you cannot read the data
engine = create_engine("sqlite:///C:/Users/sarai/Desktop/UTA/Projects/OPIOID/opioid_project_3/Resources/opioid_db.sqlite")

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
opioid = Base.classes.opioid_ems_calls

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/patient_gender<br/>"
        f"/api/v1.0/patient_ASU<br/>"
        f"/api/v1.0/patient_veteran<br/>"
        f"/api/v1.0/patient_homeless"      
    )

@app.route("/api/v1.0/patient_gender")
def patient_gender():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers
    results = session.query(opioid.Patient_Gender).all()

    session.close()

    # Convert list of tuples into normal list
    all_genders = list(np.ravel(results))

    return jsonify(all_genders)

@app.route("/api/v1.0/patient_ASU")
def patient_student():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers
    results = session.query(opioid.Patient_ASU).all()

    session.close()

    # Convert list of tuples into normal list
    all_students= list(np.ravel(results))

    return jsonify(all_students)

@app.route("/api/v1.0/patient_veteran")
def veteran():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers
    results = session.query(opioid.Patient_Veteran).all()

    session.close()

    # Convert list of tuples into normal list
    all_veterans= list(np.ravel(results))

    return jsonify(all_veterans)

@app.route("/api/v1.0/patient_homeless")
def homeless():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers
    results = session.query(opioid.Patient_Homeless).all()

    session.close()

    # Convert list of tuples into normal list
    all_homeless = list(np.ravel(results))

    return jsonify(all_homeless)

#*************************************
#PENDING - do not delete (yet)

# @app.route("/api/v1.0/passengers")
# def passengers():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     """Return a list of passenger data including the name, age, and sex of each passenger"""
#     # Query all passengers
#     results = session.query(Passenger.name, Passenger.age, Passenger.sex).all()

#     session.close()

#     # Create a dictionary from the row data and append to a list of all_passengers
#     all_passengers = []
#     for name, age, sex in results:
#         passenger_dict = {}
#         passenger_dict["name"] = name
#         passenger_dict["age"] = age
#         passenger_dict["sex"] = sex
#         all_passengers.append(passenger_dict)

#     return jsonify(all_passengers)

if __name__ == '__main__':
    app.run(debug=True)
