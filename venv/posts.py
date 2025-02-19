from flask import jsonify
from db import *

def getposts():
    connect = dbconnection()
    cur = connect.cursor()
    cur.execute('SELECT * FROM posts')
    posts = cur.fetchall()
    cur.close()
    connect.close()
    return jsonify({"posts":posts}),200