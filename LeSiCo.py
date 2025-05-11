from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

DB_PATH = "base_datos.db"

def query_db(query, args=()):
    with sqlite3.connect(DB_PATH) as conn:
        conn.row_factory = sqlite3.Row
        cur = conn.execute(query, args)
        rows = cur.fetchall()
        return [dict(row) for row in rows]

@app.route('/data', methods=['GET'])
def get_data():
    data = query_db("SELECT * FROM Ocurrencias")  # change to your table
    return jsonify(data)

if __name__ == '__main__':
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)

