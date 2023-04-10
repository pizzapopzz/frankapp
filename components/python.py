import sys
import json
import ast
data_to_pass_back = 'send this to process'

input = ast.literal_eval(sys.argv[1])
output = input
output['data returned'] = data_to_pass_back

sys.stdout.flus()