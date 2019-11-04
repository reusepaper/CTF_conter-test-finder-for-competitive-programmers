#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File              : compiler.py
# Author            : INMAK <jchrys@me.com>
# Date              : 31.10.2019
# Last Modified Date: 31.10.2019
# Last Modified By  : INMAK <jchrys@me.com>

import sys
import os

class BaseCompiler:
    def __init__(self, source):
        source = source.replace("\r\n, \n")
        source = source.replace("\r, \n")
