import psycopg2
import os

def dbconnection():
    conn = psycopg2.connect(
        dbname = os.getenv('DB_NAME'),
        user = os.getenv('DB_USER'),
        password = os.getenv('DB_PASSWORD'),
        host = os.getenv('DB_HOST'),
    )
    return conn

def create_users_table():
    create_table_query = '''
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    friends TEXT[],
    posts INTEGER[],
    FOREIGN KEY (posts) REFERENCES posts(id)
    )
'''
    connect = dbconnection()
    cur = connect.cursor()
    cur.execute(create_table_query)
    connect.commit()
    cur.close()
    connect.close()
    print('users Table created!')

def create_post_table():
    create_table_query = '''
    CREATE TABLE IF NOT EXISTS posts(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image BYTEA,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
    );
'''
    connect = dbconnection()
    cur = connect.cursor()
    cur.execute(create_table_query)
    connect.commit()
    cur.close()
    connect.close()
    print("posts Table created!")