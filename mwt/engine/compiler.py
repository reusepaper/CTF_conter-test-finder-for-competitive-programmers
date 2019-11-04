#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File              : compiler.py
# Author            : JCHRYS <jchrys@me.com>
# Date              : 01.11.2019
# Last Modified Date: 04.11.2019
# Last Modified By  : INMAK <jchrys@me.com>
import os
import subprocess 
from uuid import uuid4

from mwt import settings

class Default:
    compiler = "g++"
    flags = ["-O2"]
    versions = ["c++17", "c++14", "c++11"]
    source_ext = '.cpp'
    output_ext = '.out'

class InvalidVersionError(Exception):
    pass

# Utilities
def cleaned_data(string):
    string = string.replace('\r\n', '\n')
    string = string.replace('\r', '\n')
    return bytes(string, 'utf8')

# END Utilities

class DefaultConfig:
    flags = ['O2']


class GCCCompiler:
    def __init__(self, version, *args, **kwargs):
        if version not in Default.versions:
            raise InvalidVersionError("INVALID VERSION")

        self.flags = Default.flags
        self.flags.append("-std=" + version)

        for flag in args:
            self.flags += str(flag)

    def compile(self, source, filename=None):
        if filename == None:
            filename = uuid4().hex
        source_file = os.path.join(settings.SRC_DIR, filename + Default.source_ext)
        bin_file = os.path.join(settings.BIN_DIR, filename + Default.output_ext)

        source = cleaned_data(source)
        with open(source_file, 'wb') as f:
            f.write(source)

        status = subprocess.run([Default.compiler, source_file] + self.flags + ["-o"] + [bin_file], capture_output=True)
        return status, bin_file


if __name__=='__main__':
    print("======= start testing =========")
    gcc17 = GCCCompiler(version="c++17")
    source = \
            """#include <bits/stdc++.h>
using namespace std;

int main() {
    int t, a, b;
    cin >> t;
    while (t--) {
        cin >> a >> b;
        cout << a + b << endl;
    }
    return 0;
}"""
    gcc17.compile(source)
