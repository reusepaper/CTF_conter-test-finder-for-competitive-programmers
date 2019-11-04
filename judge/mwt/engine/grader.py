#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File              : grader.py
# Author            : INMAK <jchrys@me.com>
# Date              : 04.11.2019
# Last Modified Date: 04.11.2019
# Last Modified By  : INMAK <jchrys@me.com>

import os
import json
from mwt import settings
def cleaned_data(string):
    string = string.replace('\r\n', '\n')
    string = string.replace('\r', '\n')
    return bytes(string, 'utf8').strip()

class Grader:
    def __init__(self, problem):
        self.ans_file = os.path.join(settings.PRB_DIR, problem, 'outs', '0001')
        self.ins_file = os.path.join(settings.PRB_DIR, problem, 'ins', '0001')
    def run(self, subs):
        with open(self.ans_file) as ans:
            with open(self.ins_file) as ins:
                ans = ans.read()
                ans = cleaned_data(ans)
                ins = ins.read()
                ins = cleaned_data(ins)
                ans_lines = ans.splitlines() 
                ins_lines = ins.splitlines()
                subs_lines = subs.splitlines()
                ret_ans = [] 
                ret_subs = []
                for i in range(len(ans_lines)):
                    #print(ans_lines[i], subs_lines[i], ins_lines[i+1])
                    ret_ans.append(ans_lines[i].decode('utf-8'))
                    ret_subs.append(subs_lines[i].decode('utf-8'))
        return json.dumps({"ans": ret_ans, "subs": ret_subs})



if __name__ == '__main__':
    grader = Grader('sum') 
    grader.run('1')
