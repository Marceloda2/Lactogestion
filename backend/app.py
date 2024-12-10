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
@app.route('/api/recepcion', methods=['GET', 'POST'])
def manage_recepcion():
    if request.method == 'POST':
        data = request.json
        codigo = data.get('codigo')
        nombre = data.get('nombre')
        volumen = data.get('volumen')
        tanque = data.get('tanque')
        densidad = data.get('densidad')
        alcohol_85 = data.get('alcohol_85')
        antibiotico = data.get('antibiotico')
        observaciones = data.get('observaciones')
        if codigo and nombre and volumen:
            execute_query(
                '''INSERT INTO recepcion 
                   (codigo, nombre, volumen, tanque, densidad, alcohol_85, antibiotico, observaciones) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)''',
                (codigo, nombre, volumen, tanque, densidad, alcohol_85, antibiotico, observaciones)
            )
            return jsonify({"message": "Recepción registrada"}), 201
        return jsonify({"error": "Datos incompletos"}), 400
    recepcion = fetch_query("SELECT * FROM recepcion")
    return jsonify(recepcion)

@app.route('/api/despacho', methods=['GET', 'POST'])
def manage_despacho():
    if request.method == 'POST':
        data = request.json
        fecha = data.get('fecha')
        hora_salida = data.get('hora_salida')
        tanque = data.get('tanque')
        volumen = data.get('volumen')
        temperatura_salida = data.get('temperatura_salida')
        destino = data.get('destino')
        responsable = data.get('responsable')
        firma = data.get('firma')
        observaciones = data.get('observaciones')
        if fecha and hora_salida and tanque:
            execute_query(
                '''INSERT INTO despacho 
                   (fecha, hora_salida, tanque, volumen, temperatura_salida, destino, responsable, firma, observaciones) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)''',
                (fecha, hora_salida, tanque, volumen, temperatura_salida, destino, responsable, firma, observaciones)
            )
            return jsonify({"message": "Despacho registrado"}), 201
        return jsonify({"error": "Datos incompletos"}), 400
    despacho = fetch_query("SELECT * FROM despacho")
    return jsonify(despacho)

if __name__ == '__main__':
    connect_db()
    app.run(debug=True)
