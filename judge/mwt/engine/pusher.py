#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File              : pusher.py
# Author            : INMAK <jchrys@me.com>
# Date              : 04.11.2019
# Last Modified Date: 04.11.2019
# Last Modified By  : INMAK <jchrys@me.com>
import os
import subprocess
from mwt import settings

def cleaned_data(string):
    string = string.replace('\r\n', '\n')
    string = string.replace('\r', '\n')
    return bytes(string, 'utf8')
class Pusher:
    def __init__(self, problem, sub_file):
        self.problem = problem
        self.sub_file = sub_file

    def run(self):
        input = os.path.join(settings.PRB_DIR, self.problem, 'ins', '0001')
        with open(input) as f:
            str = f.read()
            str = cleaned_data(str)
            process = subprocess.run([self.sub_file, ], input=str, capture_output = True) 
            ret = process.stdout
            return ret.strip()
            


if __name__ == '__main__':
    print(os.path.join(settings.BASE_DIR, 'problems', 'sum'))
    sub_file = os.path.join(settings.BIN_DIR, '44f86842e4e34a0bbd26108a99729ce1.out')
    problem = 'sum'
    push = Pusher(problem, sub_file)
    print(push.run())
