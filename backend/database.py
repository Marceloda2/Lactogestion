import sqlite3

def connect_db():
    conn = sqlite3.connect("lactogestion.db")
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS productores (
                        id INTEGER PRIMARY KEY,
                        nombre TEXT,
                        telefono TEXT)''')
    cursor.execute('''CREATE TABLE IF NOT EXISTS inventario (
                        id INTEGER PRIMARY KEY,
                        productor_id INTEGER,
                        fecha TEXT,
                        litros REAL,
                        cliente TEXT,
                        FOREIGN KEY (productor_id) REFERENCES productores(id))''')
    conn.commit()
    conn.close()

def execute_query(query, params=()):
    conn = sqlite3.connect("lactogestion.db")
    cursor = conn.cursor()
    cursor.execute(query, params)
    conn.commit()
    conn.close()

def fetch_query(query, params=()):
    conn = sqlite3.connect("lactogestion.db")
    cursor = conn.cursor()
    cursor.execute(query, params)
    result = cursor.fetchall()
    conn.close()
    return result
