#!/usr/bin/python3
""" Starting flask application
Routes:

    /hbnb: display a HTML page like 8-index.html,
    done during the 0x01. AirBnB clone - Web static project
"""
from flask import Flask, render_template
from models.state import State
from models.amenity import Amenity
from models.place import Place
from models import storage
import uuid

app = Flask(__name__)


@app.route('/4-hbnb', strict_slashes=False)
def hbnb_filters():
    """ Displays main HBnB html page """
    states = storage.all(State).values()
    states = sorted(states, key=lambda k: k.name)
    list_states = []
    for state in states:
        list_states.append([state, sorted(state.cities, key=lambda k: k.name)])

    amenities = storage.all(Amenity).values()
    amenities = sorted(amenities, key=lambda k: k.name)

    places = storage.all(Place).values()
    places = sorted(places, key=lambda k: k.name)
    cache_id = uuid.uuid4()
    return render_template('4-hbnb.html',
                           states=list_states,
                           amenities=amenities,
                           places=places,
                           cache_id=cache_id)


@app.teardown_appcontext
def teardown(exception):
    """ Remove the current sqlalchemy session """
    storage.close()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
