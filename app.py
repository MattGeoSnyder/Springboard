from flask import Flask, request, render_template, redirect, flash
from flask_debugtoolbar import DebugToolbar
from forex import convert
import pdb

app = Flask(__name__)
app.config['SECRET_KEY'] = "$Boy07032018"

@app.route('/')
def get_root():
    return render_template('root.html')

@app.route('/convert')
def convert_currency():
    from_curr = request.args['from-currency']
    to_curr = request.args['to-currency']
    amount = request.args['amount']
    conversion = convert(from_curr, to_curr, amount)

    if conversion['status'] != 'okay':
        flash(conversion['status'], 'Error')
        return redirect('/')
    
    return render_template('convert.html', conversion=conversion)