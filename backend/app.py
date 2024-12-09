from flask import Flask, request, jsonify
from database import connect_db, execute_query, fetch_query

app = Flask(__name__)

# Configuración manual de CORS
@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response

@app.route('/api/productores', methods=['GET', 'POST'])
def manage_productores():
    if request.method == 'POST':
        data = request.json
        nombre = data.get('nombre')
        telefono = data.get('telefono')
        if nombre and telefono:
            execute_query("INSERT INTO productores (nombre, telefono) VALUES (?, ?)", (nombre, telefono))
            return jsonify({"message": "Productor agregado"}), 201
        return jsonify({"error": "Datos incompletos"}), 400
    productores = fetch_query("SELECT * FROM productores")
    return jsonify(productores)

@app.route('/api/inventario', methods=['GET', 'POST'])
def manage_inventario():
    if request.method == 'POST':
        data = request.json
        productor_id = data.get('productor_id')
        fecha = data.get('fecha')
        litros = data.get('litros')
        cliente = data.get('cliente')
        if productor_id and fecha and litros:
            execute_query(
                "INSERT INTO inventario (productor_id, fecha, litros, cliente) VALUES (?, ?, ?, ?)",
                (productor_id, fecha, litros, cliente)
            )
            return jsonify({"message": "Inventario actualizado"}), 201
        return jsonify({"error": "Datos incompletos"}), 400
    inventario = fetch_query("SELECT * FROM inventario")
    return jsonify(inventario)

if __name__ == '__main__':
    connect_db()
    app.run(debug=True)
