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
        codigo = data.get('codigo')
        password = data.get('password')
        if nombre and telefono and codigo and password:
            execute_query("INSERT INTO productores (nombre, telefono, codigo, password) VALUES (?, ?, ?, ?)", (nombre, telefono,codigo,password))
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
        fecha = data.get('fecha')
        hora_entrada = data.get('hora_entrada')
        nombre = data.get('nombre')
        volumen = data.get('volumen')
        tanque = data.get('tanque')
        densidad = data.get('densidad')
        alcohol_85 = data.get('alcohol_85')
        antibiotico = data.get('antibiotico')
        temperatura = data.get('temperatura')
        observaciones = data.get('observaciones')
        if fecha and hora_entrada and nombre and volumen:
            execute_query(
                '''INSERT INTO recepcion 
                   (fecha, hora_entrada, nombre, volumen, tanque, densidad, alcohol_85, antibiotico, temperatura, observaciones) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
                (fecha, hora_entrada, nombre, volumen, tanque, densidad, alcohol_85, antibiotico, temperatura, observaciones)
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

@app.route('/api/rechazos', methods=['GET', 'POST'])
def manage_rechazos():
    if request.method == 'POST':
        data = request.json
        fecha = data.get('fecha')
        hora = data.get('hora')
        motivo = data.get('motivo')
        observaciones = data.get('observaciones')
        reception_id = data.get('reception_id')
        if fecha and hora and motivo:
            execute_query(
                "INSERT INTO rechazos (fecha, hora, motivo, observaciones, reception_id) VALUES (?, ?, ?, ?, ?)",
                (fecha, hora, motivo, observaciones, reception_id)
            )
            execute_query("DELETE FROM recepcion WHERE id = ?", (reception_id,))
            return jsonify({"message": "Rechazo registrado y recepción eliminada"}), 201
        return jsonify({"error": "Datos incompletos"}), 400
    rechazos = fetch_query("SELECT * FROM rechazos")
    return jsonify(rechazos)


@app.route('/api/recepcion/<int:id>', methods=['PUT', 'DELETE'])
def modify_recepcion(id):
    if request.method == 'PUT':
        data = request.json
        query = '''UPDATE recepcion 
                   SET fecha = ?, hora_entrada = ?, nombre = ?, volumen = ?, 
                       tanque = ?, densidad = ?, alcohol_85 = ?, antibiotico = ?, temperatura = ?, observaciones = ? 
                   WHERE id = ?'''
        params = (
            data.get('fecha'), data.get('hora_entrada'), data.get('nombre'), data.get('volumen'),
            data.get('tanque'), data.get('densidad'), data.get('alcohol_85'), data.get('antibiotico'),
            data.get('temperatura'), data.get('observaciones'), id
        )
        execute_query(query, params)
        return jsonify({"message": "Recepción actualizada"}), 200
    elif request.method == 'DELETE':
        execute_query("DELETE FROM recepcion WHERE id = ?", (id,))
        return jsonify({"message": "Recepción eliminada"}), 200

@app.route('/api/despacho/<int:id>', methods=['PUT', 'DELETE'])
def modify_despacho(id):
    if request.method == 'PUT':
        data = request.json
        query = '''UPDATE despacho 
                   SET fecha = ?, hora_salida = ?, tanque = ?, volumen = ?, 
                       temperatura_salida = ?, destino = ?, responsable = ?, firma = ?, observaciones = ? 
                   WHERE id = ?'''
        params = (
            data.get('fecha'), data.get('hora_salida'), data.get('tanque'), data.get('volumen'),
            data.get('temperatura_salida'), data.get('destino'), data.get('responsable'),
            data.get('firma'), data.get('observaciones'), id
        )
        execute_query(query, params)
        return jsonify({"message": "Despacho actualizado"}), 200
    elif request.method == 'DELETE':
        execute_query("DELETE FROM despacho WHERE id = ?", (id,))
        return jsonify({"message": "Despacho eliminado"}), 200

@app.route('/api/recepcion/<int:id>', methods=['DELETE'])
def delete_recepcion(id):
    try:
        execute_query("DELETE FROM recepcion WHERE id = ?", (id,))
        return jsonify({"message": "Recepción eliminada"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    connect_db()
    app.run(debug=True)
