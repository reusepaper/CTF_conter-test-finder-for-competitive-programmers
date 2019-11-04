#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File              : main.py
# Author            : INMAK <jchrys@me.com>
# Date              : 04.11.2019
# Last Modified Date: 04.11.2019
# Last Modified By  : INMAK <jchrys@me.com>

import sys
import os

import argparse
from mwt.engine.compiler import GCCCompiler as Compiler
from mwt.engine.pusher import Pusher
from mwt.engine.grader import Grader


if __name__ == '__main__':
    ## parser
    parser = argparse.ArgumentParser(description="Countertest finder")
    parser.add_argument('source',  nargs='+', type=str)
    args = parser.parse_args()
    ## end parser


    ### INITIALIZE
    compiler = Compiler('c++17')
    problem = 'sum'
    submission = """
#include <bits/stdc++.h>
using namespace std;

int main() {
    int a, b;
    int q;
    cin >> q;
    while (q--) {
        cin >> a >> b;
        cout << 0 << endl;
    }
    return 0;
}
    """
    submission = ' '.join(args.source)

    ## END INITIALIZE
    # compile and get path
    status, submission_filepath = compiler.compile(submission)
    # end compile and get path

    # push input data
    pusher = Pusher(problem, submission_filepath)
    submission_out = pusher.run() 
    #end push input data
    
    # begin grading
    grader = Grader(problem)
    ret = grader.run(submission_out)
    print(ret)
    # end grading


