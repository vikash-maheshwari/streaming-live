from flask import Flask,jsonify,request
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId, json_util
from dotenv import load_dotenv
load_dotenv()
import os

app = Flask(__name__)

client = MongoClient(os.getenv("MONGO_URI"))
db = client['overlays']
collection = db['overlays']

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})



@app.route('/get',methods=['GET'])
def get():
    data = list(collection.find())
    data = json_util.dumps(data)
    return data , 200

@app.route('/post',methods=['POST'])
def post():
    overlay = request.json
    data = collection.insert_one(overlay)
    return jsonify({"message":"Successfully Created","id":str(data.inserted_id)}) , 201

@app.route('/update/<id>', methods=['PUT'])
def update(id):
    updated_record = request.json
    result = collection.update_one({'_id': ObjectId(id)}, {'$set': updated_record})
    return jsonify({"message": "Record updated successfully", "modified_count": result.modified_count}), 200

@app.route('/delete/<id>', methods=['DELETE'])
def delete(id):
    result = collection.delete_one({'_id': ObjectId(id)})
    return jsonify({"message": "Record deleted successfully", "deleted_count": result.deleted_count}), 200

@app.route('/text',methods=['GET'])
def text():
    data = list(collection.find({'type': 'text'}))
    data = json_util.dumps(data)
    return data , 200

@app.route('/image',methods=['GET'])
def image():
    data = list(collection.find({'type':'image'}))
    data = json_util.dumps(data)
    return data , 200

@app.route('/', methods=['GET'])
def root():
    return jsonify({"message": "Server is running"}), 200


if __name__ == '__main__':
    app.run(debug=False,host="0.0.0.0")