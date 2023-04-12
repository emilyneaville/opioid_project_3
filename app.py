import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask import Flask, jsonify
from flask_cors import CORS
from flask_cors import CORS


# Database Setup
# Using relative path to connect to the database
engine = create_engine("sqlite:///Resources/opioid_db.sqlite")

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
CORS(app)

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/all_patient_info<br/>"
        f"/api/v1.0/patient_ASU<br/>"
        f"/api/v1.0/patient_veteran<br/>"
        f"/api/v1.0/patient_homeless<br/>"
        f"/api/v1.0/patient_none"
    )

@app.route("/api/v1.0/all_patient_info")
def patient_info():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return all list of records for all patients (no filtering)"""
    # Query all patients
    results = session.query(opioid.Age, opioid.Weekday, opioid.Year, opioid.Patient_Gender, opioid.Spec_Pop).all()

    session.close()

    # Create list of dictionaries for each patient
    all_gender = []
    for age, weekday, year, gender, spec_pop in results:
        gender_dict = {
            'Age Bracket': age,
            'Weekday': weekday,
            'Year': year,
            'Gender': gender,
            'Spec_Pop': spec_pop
        }
        all_gender.append(gender_dict)

    return jsonify(all_gender)

@app.route("/api/v1.0/patient_ASU")
def patient_student():
    
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of records for all ASU students"""
    # Query to get all ASU students
    results = session.query(opioid.Age, opioid.Weekday, opioid.Year, opioid.Spec_Pop)\
        .filter_by(Spec_Pop = 'ASU Student').all()
    session.close()

    # Create list of dictionaries for each student
    all_students = []
    for age, weekday, year, spec_pop in results:
        student_dict = {
            'Age Bracket': age,
            'Weekday': weekday,
            'Year': year,
            'Spec_Pop': spec_pop
        }
        all_students.append(student_dict)

    return jsonify(all_students)

@app.route("/api/v1.0/patient_veteran")
def veteran():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of records for all Veterans"""
    # Query all veterans
    results = session.query(opioid.Age, opioid.Weekday, opioid.Year, opioid.Spec_Pop)\
        .filter_by(Spec_Pop = 'Veteran').all()

    session.close()

    # Create list of dictionaries for each veteran
    all_veterans = []
    for age, weekday, year, spec_pop in results:
        veteran_dict = {
            'Age Bracket': age,
            'Weekday': weekday,
            'Year': year,
            'Spec_Pop': spec_pop
        }
        all_veterans.append(veteran_dict)

    return jsonify(all_veterans)

@app.route("/api/v1.0/patient_homeless")
def homeless():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of records for all Homeless"""
    # Query all homeless
    results = session.query(opioid.Age, opioid.Weekday, opioid.Year, opioid.Spec_Pop)\
        .filter_by(Spec_Pop = 'Homeless').all()

    session.close()

    # Create list of records for each homeless
    all_homeless = []
    for age, weekday, year, spec_pop in results:
        homeless_dict = {
            'Age Bracket': age,
            'Weekday': weekday,
            'Year': year,
            'Spec_Pop': spec_pop
        }
        all_homeless.append(homeless_dict)

    return jsonify(all_homeless)

@app.route("/api/v1.0/patient_none")
def none_population():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of records for patients who are not part of a special population"""
    # Query all patients who are not part of a special population
    results = session.query(opioid.Age, opioid.Weekday, opioid.Year, opioid.Spec_Pop)\
        .filter_by(Spec_Pop = 'None').all()

    session.close()

    # Create list of records for each patient (no special population)
    all_none_pop = []
    for age, weekday, year, spec_pop in results:
        none_pop_dict = {
            'Age Bracket': age,
            'Weekday': weekday,
            'Year': year,
            'Spec_Pop': spec_pop
        }
        all_none_pop.append(none_pop_dict)

    return jsonify(all_none_pop)

if __name__ == '__main__':
    app.run(debug=True, port=8000)
