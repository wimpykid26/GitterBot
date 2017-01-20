from flask import(
    Flask,
    request
)
from message_chunker import message_chunk



app = Flask(__name__)

@app.route('/message_parser')
def message_parser():
    command = request.args['query']
    return message_chunk(command)


def runner():
    try:
        app.run()
    except:
        print("Rerunning")
        runner()

if __name__ == "__main__":
    runner()
