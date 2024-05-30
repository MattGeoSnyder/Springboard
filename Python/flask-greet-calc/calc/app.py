# Put your app in here.
from operations import add, sub, mult, div
from flask import Flask, request

app = Flask(__name__)

math_ops = {
    'add': add,
    'sub': sub,
    'mult': mult,
    'div': div
}

@app.route('/math/<operation>')
def go_to_add(operation):
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))
    return f'{math_ops[operation](a,b)}'
    
    


