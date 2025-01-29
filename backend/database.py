import sqlite3

def connect_db():
    conn = sqlite3.connect("lactogestion.db")
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS productores (
                        id INTEGER PRIMARY KEY,
                        nombre TEXT,
                        telefono TEXT,
                        codigo TEXT,
                        password TEXT)''')
    cursor.execute('''CREATE TABLE IF NOT EXISTS inventario (
                        id INTEGER PRIMARY KEY,
                        productor_id INTEGER,
                        fecha TEXT,
                        litros REAL,
                        cliente TEXT,
                        FOREIGN KEY (productor_id) REFERENCES productores(id))''')
      # Tabla de recepción
    cursor.execute('''CREATE TABLE IF NOT EXISTS recepcion (
                        id INTEGER PRIMARY KEY,
                        fecha TEXT,
                        hora_entrada TEXT,
                        nombre TEXT,
                        volumen REAL,
                        tanque TEXT,
                        densidad REAL,
                        alcohol_85 REAL,
                        antibiotico TEXT,
                        observaciones TEXT)''')

    # Tabla de despacho
    cursor.execute('''CREATE TABLE IF NOT EXISTS despacho (
                        id INTEGER PRIMARY KEY,
                        fecha TEXT,
                        hora_salida TEXT,
                        tanque TEXT,
                        volumen REAL,
                        temperatura_salida REAL,
                        destino TEXT,
                        responsable TEXT,
                        firma TEXT,
                        observaciones TEXT)''')
    
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
