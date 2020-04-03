import requests
import json
#from request.auth import HTTPBasicAuth

HEADERS = {'Content-type':'application/json', 'User-Agent':'Blockcert API'}
baseUrl = 'https://team.api.blockcerts.com/v1/'
username = 'Jaypersanchez.team'
password = 'P@ssw0rd'

## Identity Command Functions

def getSecuredToken(_username, _password):
    print('Getting Token')
    bodyPost = {}
    bodyPost['userName'] = _username
    bodyPost['password'] = _password
    endpoint = baseUrl + "identity/commands/token"
    jsonBody = json.dumps(bodyPost)
    response = requests.post(endpoint, data = jsonBody, headers=HEADERS)
    #print(response.text)
    #print (response.status_code)
    # parse and return token value
    jsonData = (json.loads(response.text))
    return jsonData['accessToken']
    #for x in jsonData:
    #    print( jsonData[x,'token'] )
    # print just the token element
    #print( jsonData['accessToken'] )

def generateSSO

token = getSecuredToken('Jaypersanchez.team','P@ssw0rd')
print(token)
