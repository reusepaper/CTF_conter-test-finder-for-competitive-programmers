#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File              : settings.py
# Author            : JCHRYS <jchrys@me.com>
# Date              : 01.11.2019
# Last Modified Date: 04.11.2019
# Last Modified By  : INMAK <jchrys@me.com>
import os

BASE_DIR = os.path.dirname(__file__)
PRB_DIR = os.path.join(BASE_DIR, "problems")
TEMP_DIR = os.path.join(BASE_DIR, "temp")
BIN_DIR = os.path.join(TEMP_DIR, "bin")
SRC_DIR = os.path.join(TEMP_DIR, "src")


if __name__ == '__main__':
    print("===DO NOT RUN THIS FILE===")
    print(PRB_DIR)
